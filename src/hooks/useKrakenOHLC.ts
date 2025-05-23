import { useState, useEffect } from 'react';

export interface OHLCData {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

interface RequestParams {
  method?: string;
  path?: string;
  query?: Record<string, any>;
  body?: Record<string, any>;
  publicKey?: string;
  privateKey?: string;
  environment?: string;
}

function request({
  method = "GET",
  path = "",
  query = {},
  body = {},
  publicKey = "",
  privateKey = "",
  environment = ""
}: RequestParams): Promise<Response> {
  const proxyUrl = 'https://mkzswizhwsxfsefosnhs.supabase.co/functions/v1/6af8142d-5fc5-484c-ad20-ca7116f016ed';
  
  return fetch(proxyUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1renN3aXpod3N4ZnNlZm9zbmhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwMTc5MjgsImV4cCI6MjA2MzU5MzkyOH0.zc_DOBDwT9HSxKAn52Exi_m4lqnLNnSSgE9NkihyW-4'
    },
    body: JSON.stringify({ 
      method,
      path, 
      query, 
      body: Object.keys(body).length > 0 ? body : undefined,
      publicKey: publicKey || undefined,
      privateKey: privateKey || undefined,
      environment: environment || 'https://api.kraken.com'
    })
  });
}

export const useKrakenOHLC = (pair: string = 'XBTUSD', interval: number = 5) => {
  const [ohlcData, setOhlcData] = useState<OHLCData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const generateMockOHLCData = (symbol: string): OHLCData[] => {
    const basePrices: { [key: string]: number } = {
      'XBTUSD': 45000,
      'ETHUSD': 2800,
      'ADAUSD': 0.45,
      'SOLUSD': 95,
      'DOTUSD': 8.5,
      'LINKUSD': 15,
      'MATICUSD': 0.85,
      'AVAXUSD': 35,
      'XRPUSD': 0.62,
      'WEPEUSD': 0.0034
    };
    
    const basePrice = basePrices[symbol] || 45000;
    const data: OHLCData[] = [];
    const now = Date.now();
    
    for (let i = 50; i >= 0; i--) {
      const time = now - (i * interval * 60 * 1000);
      const volatilityFactor = basePrice * 0.02;
      const open = basePrice + (Math.random() - 0.5) * volatilityFactor;
      const volatility = Math.random() * volatilityFactor * 0.5;
      const high = Math.max(open + Math.random() * volatility, open);
      const low = Math.min(open - Math.random() * volatility, open);
      const close = low + Math.random() * (high - low);
      const volume = Math.random() * 100;
      
      data.push({ 
        time: time || now, 
        open: open || basePrice, 
        high: high || basePrice, 
        low: low || basePrice, 
        close: close || basePrice, 
        volume: volume || 0 
      });
    }
    
    return data;
  };

  const fetchOHLCData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await request({
        method: "GET",
        path: "/0/public/OHLC",
        query: {
          pair: pair,
          interval: interval,
        },
        environment: "https://api.kraken.com",
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.error && data.error.length > 0) {
        console.warn(`Kraken API error for ${pair}: ${data.error[0]}`);
        const mockData = generateMockOHLCData(pair);
        setOhlcData(mockData);
        return;
      }
      
      const result = data.result;
      if (!result) {
        console.warn(`No result data for ${pair}, using mock data`);
        const mockData = generateMockOHLCData(pair);
        setOhlcData(mockData);
        return;
      }
      
      const pairKey = Object.keys(result).find(key => key !== 'last');
      
      if (pairKey && result[pairKey]) {
        const ohlcArray = result[pairKey];
        const transformedData: OHLCData[] = ohlcArray.map((candle: any[]) => ({
          time: (candle[0] || 0) * 1000,
          open: parseFloat(candle[1]) || 0,
          high: parseFloat(candle[2]) || 0,
          low: parseFloat(candle[3]) || 0,
          close: parseFloat(candle[4]) || 0,
          volume: parseFloat(candle[6]) || 0
        }));
        
        transformedData.sort((a, b) => a.time - b.time);
        setOhlcData(transformedData);
      } else {
        console.warn(`Invalid data format for ${pair}, using mock data`);
        const mockData = generateMockOHLCData(pair);
        setOhlcData(mockData);
      }
      
    } catch (err) {
      console.error('OHLC fetch error:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch');
      
      const mockData = generateMockOHLCData(pair);
      setOhlcData(mockData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOHLCData();
    const intervalId = setInterval(fetchOHLCData, 30000);
    return () => clearInterval(intervalId);
  }, [pair, interval]);

  return { ohlcData, loading, error, refetch: fetchOHLCData };
};