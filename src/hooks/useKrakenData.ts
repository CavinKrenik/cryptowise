import { useState, useEffect } from 'react';

export interface CryptoData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  trend: 'up' | 'down';
  volume?: number;
  high24h?: number;
  low24h?: number;
}

const KRAKEN_PAIRS = {
  'BTC': 'XXBTZUSD',
  'ETH': 'XETHZUSD', 
  'ADA': 'ADAUSD',
  'SOL': 'SOLUSD'
};

const CRYPTO_NAMES = {
  'BTC': 'Bitcoin',
  'ETH': 'Ethereum',
  'ADA': 'Cardano', 
  'SOL': 'Solana'
};

export const useKrakenData = () => {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchKrakenData = async () => {
    try {
      const pairList = Object.values(KRAKEN_PAIRS).join(',');
      const response = await fetch(`https://api.kraken.com/0/public/Ticker?pair=${pairList}`);
      const data = await response.json();
      
      if (data.error && data.error.length > 0) {
        throw new Error(data.error[0]);
      }
      
      const transformedData: CryptoData[] = [];
      
      for (const [krakenPair, info] of Object.entries(data.result as any)) {
        const symbol = Object.keys(KRAKEN_PAIRS).find(key => 
          KRAKEN_PAIRS[key as keyof typeof KRAKEN_PAIRS] === krakenPair
        );
        
        if (symbol) {
          const price = parseFloat((info as any).c[0]);
          const change24h = parseFloat((info as any).p[1]);
          
          transformedData.push({
            symbol,
            name: CRYPTO_NAMES[symbol as keyof typeof CRYPTO_NAMES],
            price,
            change: change24h,
            trend: change24h >= 0 ? 'up' : 'down',
            volume: parseFloat((info as any).v[1]),
            high24h: parseFloat((info as any).h[1]),
            low24h: parseFloat((info as any).l[1])
          });
        }
      }
      
      setCryptoData(transformedData);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKrakenData();
    const interval = setInterval(fetchKrakenData, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  return { cryptoData, loading, error, refetch: fetchKrakenData };
};