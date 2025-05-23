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

const COINGECKO_IDS = {
  'BTC': 'bitcoin',
  'ETH': 'ethereum',
  'ADA': 'cardano',
  'SOL': 'solana'
};

export const useCoinGeckoData = () => {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCoinGeckoData = async () => {
    try {
      const ids = Object.values(COINGECKO_IDS).join(',');
      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true&include_24hr_vol=true&include_high_low_24h=true`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch from CoinGecko');
      }
      
      const data = await response.json();
      
      const transformedData: CryptoData[] = [];
      
      for (const [symbol, coinId] of Object.entries(COINGECKO_IDS)) {
        const coinData = data[coinId];
        if (coinData) {
          const price = coinData.usd || 0;
          const change = coinData.usd_24h_change || 0;
          
          transformedData.push({
            symbol,
            name: symbol === 'BTC' ? 'Bitcoin' : 
                  symbol === 'ETH' ? 'Ethereum' :
                  symbol === 'ADA' ? 'Cardano' : 'Solana',
            price,
            change,
            trend: change >= 0 ? 'up' : 'down',
            volume: coinData.usd_24h_vol || 0,
            high24h: coinData.usd_24h_high || price,
            low24h: coinData.usd_24h_low || price
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
    fetchCoinGeckoData();
    const interval = setInterval(fetchCoinGeckoData, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  return { cryptoData, loading, error, refetch: fetchCoinGeckoData };
};