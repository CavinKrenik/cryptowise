import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Wifi, WifiOff } from 'lucide-react';
import { CryptoData } from '@/hooks/useKrakenData';
import { OHLCChart } from '@/components/OHLCChart';
import { useMultiSourceData } from '@/hooks/useMultiSourceData';

interface LiveChartProps {
  cryptoData?: CryptoData;
  krakenPair?: string;
}

const LiveChart: React.FC<LiveChartProps> = ({ cryptoData: propCryptoData, krakenPair }) => {
  const { cryptoData: multiSourceData, dataSource, loading, error } = useMultiSourceData();
  
  // Use prop data if provided, otherwise use multi-source data
  const cryptoData = propCryptoData || (multiSourceData.length > 0 ? multiSourceData[0] : null);
  
  const safePrice = cryptoData?.price || 0;
  const safeChange = cryptoData?.change || 0;
  const safeName = cryptoData?.name || 'Unknown';
  const safeSymbol = cryptoData?.symbol || 'N/A';

  const generatePricePoints = () => {
    const basePrice = safePrice;
    const points = [];
    
    for (let i = 0; i < 20; i++) {
      const variation = (Math.random() - 0.5) * 0.02;
      const price = basePrice * (1 + variation);
      points.push(price);
    }
    
    return points;
  };

  const pricePoints = generatePricePoints();
  const maxPrice = Math.max(...pricePoints);
  const minPrice = Math.min(...pricePoints);
  const priceRange = maxPrice - minPrice;

  const getKrakenPair = (symbol: string) => {
    const pairMap: { [key: string]: string } = {
      'BTC': 'XBTUSD',
      'ETH': 'ETHUSD',
      'XRP': 'XRPUSD',
      'WEPE': 'WEPEUSD'
    };
    return pairMap[symbol] || 'XBTUSD';
  };

  const pairToUse = krakenPair || getKrakenPair(safeSymbol);

  if (loading) {
    return (
      <Card className="p-6 bg-gray-900 border-gray-700">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-700 rounded w-1/4 mb-2"></div>
          <div className="h-8 bg-gray-700 rounded w-1/2 mb-4"></div>
          <div className="h-32 bg-gray-700 rounded"></div>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-gray-900 border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-xl font-semibold text-white">{safeName}</h3>
            <p className="text-sm text-gray-400">{safeSymbol}/USD</p>
            <div className="flex items-center mt-1">
              {error ? (
                <WifiOff className="w-3 h-3 text-red-500 mr-1" />
              ) : (
                <Wifi className="w-3 h-3 text-green-500 mr-1" />
              )}
              <span className="text-xs text-gray-500">
                {dataSource === 'kraken' ? 'Kraken API' : 'CoinGecko API'}
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-white">
              ${safePrice > 0 ? safePrice.toLocaleString() : '0'}
            </div>
            <Badge 
              className={`flex items-center ${
                safeChange > 0 
                  ? 'bg-green-500 text-black' 
                  : 'bg-red-500 text-white'
              }`}
            >
              {safeChange > 0 ? (
                <TrendingUp className="w-3 h-3 mr-1" />
              ) : (
                <TrendingDown className="w-3 h-3 mr-1" />
              )}
              {safeChange > 0 ? '+' : ''}{safeChange.toFixed(2)}%
            </Badge>
          </div>
        </div>
        
        <div className="h-32 bg-gray-800 rounded-lg p-4 relative overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 400 100">
            <defs>
              <linearGradient id="priceGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={safeChange > 0 ? '#F59E0B' : '#ef4444'} stopOpacity="0.3" />
                <stop offset="100%" stopColor={safeChange > 0 ? '#F59E0B' : '#ef4444'} stopOpacity="0.1" />
              </linearGradient>
            </defs>
            
            <polyline
              fill="none"
              stroke={safeChange > 0 ? '#F59E0B' : '#ef4444'}
              strokeWidth="2"
              points={pricePoints.map((price, index) => {
                const x = (index / (pricePoints.length - 1)) * 400;
                const y = 100 - ((price - minPrice) / priceRange) * 100;
                return `${x},${y}`;
              }).join(' ')}
            />
          </svg>
        </div>
      </Card>
      
      <Card className="p-4 bg-gray-900 border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-white">Live Candlestick Chart - {pairToUse}</h3>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-400">Live</span>
          </div>
        </div>
        <OHLCChart pair={pairToUse} interval={5} />
      </Card>
    </div>
  );
};

export default LiveChart;