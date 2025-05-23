import React from 'react';
import { Card } from '@/components/ui/card';
import { useMultiSourceOHLC } from '@/hooks/useMultiSourceOHLC';
import { Wifi, WifiOff } from 'lucide-react';

interface OHLCChartProps {
  pair: string;
  interval: number;
}

export const OHLCChart: React.FC<OHLCChartProps> = ({ pair, interval }) => {
  const { ohlcData, loading, error, dataSource } = useMultiSourceOHLC(pair, interval);

  if (loading) {
    return (
      <Card className="p-6 bg-gray-900 border-gray-700">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-700 rounded w-1/4 mb-4"></div>
          <div className="h-64 bg-gray-700 rounded"></div>
        </div>
      </Card>
    );
  }

  const latestCandle = ohlcData[ohlcData.length - 1];
  const isGreen = latestCandle && latestCandle.close >= latestCandle.open;
  
  const maxPrice = Math.max(...ohlcData.map(d => d.high || 0));
  const minPrice = Math.min(...ohlcData.map(d => d.low || 0));
  const priceRange = maxPrice - minPrice;
  
  const chartWidth = 800;
  const chartHeight = 300;
  const candleWidth = Math.max(2, chartWidth / ohlcData.length - 2);

  return (
    <Card className="p-6 bg-gray-900 border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">OHLC Chart - {pair}</h3>
        <div className="flex items-center space-x-2">
          {error ? (
            <WifiOff className="w-4 h-4 text-red-500" />
          ) : (
            <Wifi className="w-4 h-4 text-green-500" />
          )}
          <span className="text-sm text-gray-400">
            {dataSource === 'kraken' ? 'Kraken' : 'CoinGecko'}
          </span>
        </div>
      </div>
      
      {latestCandle && (
        <div className="grid grid-cols-4 gap-4 mb-4 text-sm">
          <div>
            <span className="text-gray-400">Open:</span>
            <div className="text-white font-mono">${latestCandle.open?.toFixed(2) || '0.00'}</div>
          </div>
          <div>
            <span className="text-gray-400">High:</span>
            <div className="text-green-400 font-mono">${latestCandle.high?.toFixed(2) || '0.00'}</div>
          </div>
          <div>
            <span className="text-gray-400">Low:</span>
            <div className="text-red-400 font-mono">${latestCandle.low?.toFixed(2) || '0.00'}</div>
          </div>
          <div>
            <span className="text-gray-400">Close:</span>
            <div className={`font-mono ${isGreen ? 'text-green-400' : 'text-red-400'}`}>
              ${latestCandle.close?.toFixed(2) || '0.00'}
            </div>
          </div>
        </div>
      )}
      
      <div className="bg-gray-800 rounded-lg p-4 overflow-x-auto">
        <svg width={chartWidth} height={chartHeight} className="min-w-full">
          {ohlcData.map((candle, index) => {
            const x = (index / (ohlcData.length - 1)) * (chartWidth - candleWidth) + candleWidth / 2;
            const openY = chartHeight - ((candle.open - minPrice) / priceRange) * chartHeight;
            const closeY = chartHeight - ((candle.close - minPrice) / priceRange) * chartHeight;
            const highY = chartHeight - ((candle.high - minPrice) / priceRange) * chartHeight;
            const lowY = chartHeight - ((candle.low - minPrice) / priceRange) * chartHeight;
            
            const candleIsGreen = candle.close >= candle.open;
            const bodyTop = Math.min(openY, closeY);
            const bodyHeight = Math.abs(closeY - openY);
            
            return (
              <g key={index}>
                {/* Wick */}
                <line
                  x1={x}
                  y1={highY}
                  x2={x}
                  y2={lowY}
                  stroke={candleIsGreen ? '#10B981' : '#EF4444'}
                  strokeWidth={1}
                />
                {/* Body */}
                <rect
                  x={x - candleWidth / 2}
                  y={bodyTop}
                  width={candleWidth}
                  height={Math.max(bodyHeight, 1)}
                  fill={candleIsGreen ? '#10B981' : '#EF4444'}
                  stroke={candleIsGreen ? '#10B981' : '#EF4444'}
                  strokeWidth={1}
                />
              </g>
            );
          })}
        </svg>
      </div>
      
      {error && (
        <div className="mt-4 p-3 bg-red-900/20 border border-red-500/20 rounded-lg">
          <p className="text-red-400 text-sm">⚠️ Using fallback data source due to API limitations</p>
        </div>
      )}
    </Card>
  );
};