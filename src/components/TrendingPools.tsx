import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { TrendingUp, TrendingDown, DollarSign, BarChart3 } from 'lucide-react';
import { useGeckoTrendingPools } from '@/hooks/useGeckoTerminal';

interface TrendingPoolsProps {
  network: string;
}

const TrendingPools: React.FC<TrendingPoolsProps> = ({ network }) => {
  const { data: pools, loading, error } = useGeckoTrendingPools(network);

  const formatVolume = (volume: string) => {
    const num = parseFloat(volume);
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`;
    return `$${num.toFixed(2)}`;
  };

  const formatPercentage = (percentage: string) => {
    const num = parseFloat(percentage);
    const isPositive = num >= 0;
    return (
      <span className={`flex items-center gap-1 ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
        {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
        {Math.abs(num).toFixed(2)}%
      </span>
    );
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Trending Pools</h3>
        <div className="grid gap-4">
          {[...Array(5)].map((_, i) => (
            <Card key={i} className="bg-gray-800 border-gray-700">
              <CardContent className="p-4">
                <Skeleton className="h-4 w-32 mb-2" />
                <Skeleton className="h-6 w-24" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert className="bg-red-900/20 border-red-800">
        <AlertDescription className="text-red-400">
          Failed to load trending pools: {error}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-green-400" />
        Trending Pools on {network.toUpperCase()}
      </h3>
      
      <div className="grid gap-4">
        {pools?.slice(0, 10).map((pool) => {
          const attrs = pool.attributes;
          return (
            <Card key={pool.id} className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold text-white">{attrs.name}</h4>
                    <p className="text-sm text-gray-400">{attrs.address}</p>
                  </div>
                  <Badge variant="outline" className="text-amber-400 border-amber-400">
                    {network.toUpperCase()}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
                  <div>
                    <p className="text-xs text-gray-400">Price</p>
                    <p className="text-sm font-medium text-white">
                      ${parseFloat(attrs.base_token_price_usd).toFixed(4)}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-400">24h Change</p>
                    <div className="text-sm font-medium">
                      {formatPercentage(attrs.price_change_percentage?.h24 || '0')}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-400">24h Volume</p>
                    <p className="text-sm font-medium text-white">
                      {formatVolume(attrs.volume_usd?.h24 || '0')}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-400">Liquidity</p>
                    <p className="text-sm font-medium text-white">
                      {formatVolume(attrs.reserve_in_usd || '0')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default TrendingPools;