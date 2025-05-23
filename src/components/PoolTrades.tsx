import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowUpDown, TrendingUp, TrendingDown } from 'lucide-react';

interface Trade {
  block_timestamp: string;
  kind: string;
  volume_in_usd: string;
  price_from_in_usd: string;
  price_to_in_usd: string;
}

interface PoolTradesProps {
  network: string;
  poolAddress: string;
}

const GECKO_PROXY_URL = 'https://mkzswizhwsxfsefosnhs.supabase.co/functions/v1/0a7e8314-0c6d-4ad7-ab7b-091a23302f9e';

const PoolTrades: React.FC<PoolTradesProps> = ({ network, poolAddress }) => {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrades = async () => {
      if (!network || !poolAddress) return;
      
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(GECKO_PROXY_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            endpoint: `/networks/${network}/pools/${poolAddress}/trades` 
          })
        });
        
        if (!response.ok) {
          throw new Error(`Failed to fetch trades: ${response.status}`);
        }
        
        const data = await response.json();
        const tradesData = data.data?.map((trade: any) => trade.attributes) || [];
        setTrades(tradesData.slice(0, 20)); // Show last 20 trades
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch trades');
      } finally {
        setLoading(false);
      }
    };

    fetchTrades();
  }, [network, poolAddress]);

  const formatTime = (timestamp: string) => {
    if (!timestamp) return 'N/A';
    try {
      return new Date(timestamp).toLocaleTimeString();
    } catch {
      return 'N/A';
    }
  };

  const formatVolume = (volume: string) => {
    if (!volume) return '$0.00';
    try {
      const num = parseFloat(volume);
      if (isNaN(num)) return '$0.00';
      if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
      if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`;
      return `$${num.toFixed(2)}`;
    } catch {
      return '$0.00';
    }
  };

  if (loading) {
    return (
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <ArrowUpDown className="w-5 h-5" />
            Recent Trades
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="flex justify-between items-center">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-24" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Alert className="bg-red-900/20 border-red-800">
        <AlertDescription className="text-red-400">
          Failed to load trades: {error}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <ArrowUpDown className="w-5 h-5" />
          Recent Trades
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {trades.length === 0 ? (
            <p className="text-gray-400 text-center py-4">No recent trades found</p>
          ) : (
            trades.map((trade, index) => (
              <div key={index} className="flex justify-between items-center p-2 rounded bg-gray-700/50">
                <div className="flex items-center gap-2">
                  <Badge 
                    variant={trade.kind === 'buy' ? 'default' : 'destructive'}
                    className={trade.kind === 'buy' ? 'bg-green-600' : 'bg-red-600'}
                  >
                    {trade.kind === 'buy' ? (
                      <TrendingUp className="w-3 h-3 mr-1" />
                    ) : (
                      <TrendingDown className="w-3 h-3 mr-1" />
                    )}
                    {trade.kind?.toUpperCase() || 'UNKNOWN'}
                  </Badge>
                  <span className="text-sm text-gray-400">
                    {formatTime(trade.block_timestamp)}
                  </span>
                </div>
                
                <div className="text-right">
                  <div className="text-sm font-medium text-white">
                    {formatVolume(trade.volume_in_usd)}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PoolTrades;