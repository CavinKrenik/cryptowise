import React, { useState, useMemo } from 'react';
import { Search, TrendingUp, TrendingDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface TradingPair {
  symbol: string;
  name: string;
  price: number;
  change: number;
  volume: string;
  krakenPair: string;
}

interface PairSelectorProps {
  onPairSelect: (pair: TradingPair) => void;
  selectedPair?: string;
}

const TRADING_PAIRS: TradingPair[] = [
  { symbol: 'BTC', name: 'Bitcoin', price: 67234, change: 2.45, volume: '1.2B', krakenPair: 'XBTUSD' },
  { symbol: 'ETH', name: 'Ethereum', price: 3456, change: -1.23, volume: '890M', krakenPair: 'ETHUSD' },
  { symbol: 'XRP', name: 'Ripple', price: 0.62, change: 3.87, volume: '567M', krakenPair: 'XRPUSD' },
  { symbol: 'ADA', name: 'Cardano', price: 0.45, change: 5.67, volume: '234M', krakenPair: 'ADAUSD' },
  { symbol: 'SOL', name: 'Solana', price: 178, change: -0.89, volume: '456M', krakenPair: 'SOLUSD' },
  { symbol: 'DOT', name: 'Polkadot', price: 6.78, change: 3.21, volume: '123M', krakenPair: 'DOTUSD' },
  { symbol: 'LINK', name: 'Chainlink', price: 14.56, change: -2.34, volume: '89M', krakenPair: 'LINKUSD' },
  { symbol: 'MATIC', name: 'Polygon', price: 0.89, change: 4.56, volume: '67M', krakenPair: 'MATICUSD' },
  { symbol: 'AVAX', name: 'Avalanche', price: 34.12, change: 1.78, volume: '45M', krakenPair: 'AVAXUSD' }
];

export const PairSelector: React.FC<PairSelectorProps> = ({ onPairSelect, selectedPair }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredPairs = useMemo(() => {
    return TRADING_PAIRS.filter(pair => 
      pair.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pair.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search trading pairs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {filteredPairs.map((pair) => (
            <Button
              key={pair.symbol}
              variant={selectedPair === pair.symbol ? "default" : "ghost"}
              className="w-full justify-between h-auto p-3"
              onClick={() => onPairSelect(pair)}
            >
              <div className="flex items-center space-x-3">
                <div className="text-left">
                  <div className="font-semibold">{pair.symbol}/USD</div>
                  <div className="text-sm text-gray-500">{pair.name}</div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="font-semibold">${pair.price.toLocaleString()}</div>
                <div className="flex items-center space-x-1">
                  <Badge variant={pair.change > 0 ? 'default' : 'destructive'} className="text-xs">
                    {pair.change > 0 ? (
                      <TrendingUp className="w-3 h-3 mr-1" />
                    ) : (
                      <TrendingDown className="w-3 h-3 mr-1" />
                    )}
                    {pair.change > 0 ? '+' : ''}{pair.change.toFixed(2)}%
                  </Badge>
                </div>
              </div>
            </Button>
          ))}
        </div>
        
        {filteredPairs.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No trading pairs found
          </div>
        )}
      </div>
    </Card>
  );
};