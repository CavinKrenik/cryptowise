import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createHash, createHmac } from 'https://deno.land/std@0.168.0/node/crypto.ts'

interface RequestBody {
  method?: string
  path?: string
  query?: Record<string, any>
  body?: Record<string, any>
  publicKey?: string
  privateKey?: string
  environment?: string
}

function getNonce(): string {
  return Date.now().toString()
}

function getSignature(privateKey: string, data: string, nonce: string, path: string): string {
  const message = createHash('sha256')
  message.update(nonce + data)
  const hash = message.digest()
  
  const key = atob(privateKey)
  const hmacHash = createHmac('sha512', key)
  hmacHash.update(path + hash)
  return btoa(hmacHash.digest('binary'))
}

function mapToURLSearchParams(obj: Record<string, any>): URLSearchParams {
  const params = new URLSearchParams()
  for (const [key, value] of Object.entries(obj)) {
    if (Array.isArray(value)) {
      value.forEach(v => params.append(key, String(v)))
    } else {
      params.append(key, String(value))
    }
  }
  return params
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    })
  }

  try {
    const requestBody: RequestBody = await req.json()
    
    const {
      method = 'GET',
      path = '',
      query = {},
      body = {},
      publicKey = '',
      privateKey = '',
      environment = 'https://api.kraken.com'
    } = requestBody

    let url = environment + path
    let queryString = ''
    
    if (Object.keys(query).length > 0) {
      const queryParams = mapToURLSearchParams(query)
      queryString = queryParams.toString()
      url += '?' + queryString
    }

    let nonce = ''
    let bodyMap = { ...body }
    
    if (publicKey) {
      nonce = bodyMap.nonce || getNonce()
      bodyMap.nonce = nonce
    }

    const headers: Record<string, string> = {}
    let bodyContent: string | undefined
    
    if (Object.keys(bodyMap).length > 0) {
      bodyContent = JSON.stringify(bodyMap)
      headers['Content-Type'] = 'application/json'
    }

    if (publicKey && privateKey) {
      const dataForSignature = queryString + (bodyContent || '')
      const signature = getSignature(privateKey, dataForSignature, nonce, path)
      headers['API-Key'] = publicKey
      headers['API-Sign'] = signature
    }

    const response = await fetch(url, {
      method,
      headers,
      body: bodyContent
    })

    const data = await response.text()
    
    return new Response(data, {
      status: response.status,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    })
    
  } catch (error) {
    console.error('Proxy error:', error)
    return new Response(
      JSON.stringify({ error: 'Proxy request failed', details: error.message }),
      {
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      }
    )
  }
})