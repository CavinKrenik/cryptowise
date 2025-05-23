import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { TrendingUp, TrendingDown, DollarSign, BarChart3 } from 'lucide-react';
import { useGeckoPool } from '@/hooks/useGeckoTerminal';

interface GeckoTerminalPoolProps {
  poolAddress: string;
  network?: string;
}

const GeckoTerminalPool: React.FC<GeckoTerminalPoolProps> = ({ 
  poolAddress, 
  network = 'eth' 
}) => {
  const { data: poolData, loading, error } = useGeckoPool(network, poolAddress);

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-64" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="bg-gray-800 border-gray-700">
              <CardContent className="p-4">
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-6 w-32" />
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
          {error}
        </AlertDescription>
      </Alert>
    );
  }

  if (!poolData) {
    return (
      <Alert className="bg-yellow-900/20 border-yellow-800">
        <AlertDescription className="text-yellow-400">
          No pool data available
        </AlertDescription>
      </Alert>
    );
  }

  const safeToLocaleString = (value: any, options?: any) => {
    try {
      if (value === null || value === undefined || isNaN(Number(value))) {
        return '0';
      }
      const num = Number(value);
      return num.toLocaleString(undefined, options);
    } catch {
      return '0';
    }
  };

  const formatPrice = (price: any) => {
    if (!price && price !== 0) return '$0.00';
    try {
      const num = Number(price);
      if (isNaN(num)) return '$0.00';
      if (num < 0.01) return `$${num.toFixed(6)}`;
      if (num < 1) return `$${num.toFixed(4)}`;
      return `$${safeToLocaleString(num, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    } catch {
      return '$0.00';
    }
  };

  const formatVolume = (volume: any) => {
    if (!volume && volume !== 0) return '$0.00';
    try {
      const num = Number(volume);
      if (isNaN(num)) return '$0.00';
      if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
      if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
      if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`;
      return `$${num.toFixed(2)}`;
    } catch {
      return '$0.00';
    }
  };

  const formatPercentage = (percentage: any) => {
    if (!percentage && percentage !== 0) return <span className="text-gray-400">0.00%</span>;
    try {
      const num = Number(percentage);
      if (isNaN(num)) return <span className="text-gray-400">0.00%</span>;
      const isPositive = num >= 0;
      return (
        <span className={`flex items-center gap-1 ${
          isPositive ? 'text-green-400' : 'text-red-400'
        }`}>
          {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          {Math.abs(num).toFixed(2)}%
        </span>
      );
    } catch {
      return <span className="text-gray-400">0.00%</span>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">{poolData?.name || 'Pool Data'}</h2>
        <Badge variant="outline" className="text-amber-400 border-amber-400">
          {network.toUpperCase()} Pool
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-400 flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Base Token Price
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-white">
              {formatPrice(poolData?.base_token_price_usd)}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-400">
              24h Change
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">
              {formatPercentage(poolData?.price_change_percentage?.h24)}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-400 flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              24h Volume
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-white">
              {formatVolume(poolData?.volume_usd?.h24)}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GeckoTerminalPool;