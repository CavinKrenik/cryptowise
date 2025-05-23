import { useState, useEffect } from 'react';

interface GeckoTerminalHookResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

const GECKO_PROXY_URL = 'https://mkzswizhwsxfsefosnhs.supabase.co/functions/v1/0a7e8314-0c6d-4ad7-ab7b-091a23302f9e';

const fetchGeckoData = async (endpoint: string) => {
  const response = await fetch(GECKO_PROXY_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ endpoint })
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.status}`);
  }

  return response.json();
};

export const useGeckoPool = (network: string, address: string): GeckoTerminalHookResult<any> => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    if (!network || !address) return;
    
    try {
      setLoading(true);
      setError(null);
      const result = await fetchGeckoData(`/networks/${network}/pools/${address}`);
      setData(result.data?.attributes || result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch pool data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [network, address]);

  return { data, loading, error, refetch: fetchData };
};

export const useGeckoNetworks = (): GeckoTerminalHookResult<any[]> => {
  const [data, setData] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchGeckoData('/networks');
      setData(result.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch networks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, refetch: fetchData };
};

export const useGeckoTrendingPools = (network: string): GeckoTerminalHookResult<any[]> => {
  const [data, setData] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    if (!network) return;
    
    try {
      setLoading(true);
      setError(null);
      const result = await fetchGeckoData(`/networks/${network}/trending_pools`);
      setData(result.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch trending pools');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [network]);

  return { data, loading, error, refetch: fetchData };
};
