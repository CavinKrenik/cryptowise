import { useState, useEffect } from 'react';
import { useKrakenOHLC, OHLCData } from './useKrakenOHLC';
import { useCoinGeckoOHLC } from './useCoinGeckoOHLC';

export const useMultiSourceOHLC = (pair: string = 'XBTUSD', interval: number = 5) => {
  const [dataSource, setDataSource] = useState<'kraken' | 'coingecko'>('kraken');
  const krakenOHLC = useKrakenOHLC(pair, interval);
  const coinGeckoOHLC = useCoinGeckoOHLC(pair, interval);
  
  // Switch to CoinGecko if Kraken fails or has errors
  useEffect(() => {
    if (krakenOHLC.error && !coinGeckoOHLC.error) {
      setDataSource('coingecko');
    } else if (!krakenOHLC.error && krakenOHLC.ohlcData.length > 0) {
      setDataSource('kraken');
    }
  }, [krakenOHLC.error, coinGeckoOHLC.error, krakenOHLC.ohlcData.length]);
  
  const activeData = dataSource === 'kraken' ? krakenOHLC : coinGeckoOHLC;
  
  return {
    ...activeData,
    dataSource,
    switchToKraken: () => setDataSource('kraken'),
    switchToCoinGecko: () => setDataSource('coingecko')
  };
};