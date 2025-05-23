import { useState, useEffect } from 'react';
import { useKrakenData, CryptoData } from './useKrakenData';
import { useCoinGeckoData } from './useCoinGeckoData';

export const useMultiSourceData = () => {
  const [dataSource, setDataSource] = useState<'kraken' | 'coingecko'>('kraken');
  const krakenData = useKrakenData();
  const coinGeckoData = useCoinGeckoData();
  
  // Switch to CoinGecko if Kraken fails or has errors
  useEffect(() => {
    if (krakenData.error && !coinGeckoData.error) {
      setDataSource('coingecko');
    } else if (!krakenData.error && krakenData.cryptoData.length > 0) {
      setDataSource('kraken');
    }
  }, [krakenData.error, coinGeckoData.error, krakenData.cryptoData.length]);
  
  const activeData = dataSource === 'kraken' ? krakenData : coinGeckoData;
  
  return {
    ...activeData,
    dataSource,
    switchToKraken: () => setDataSource('kraken'),
    switchToCoinGecko: () => setDataSource('coingecko')
  };
};