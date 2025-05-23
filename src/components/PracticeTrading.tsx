import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, TrendingUp, TrendingDown, DollarSign, Target, RefreshCw } from 'lucide-react';
import { useKrakenData } from '@/hooks/useKrakenData';
import { OHLCChart } from '@/components/OHLCChart';

interface PracticeTradingProps {
  onBack: () => void;
}

const PracticeTrading: React.FC<PracticeTradingProps> = ({ onBack }) => {
  const cryptoData = useKrakenData('BTC');
  const [portfolio, setPortfolio] = useState(10000);
  const [selectedCrypto, setSelectedCrypto] = useState('BTC');
  const [position, setPosition] = useState<'long' | 'short' | null>(null);
  const [entryPrice, setEntryPrice] = useState<number | null>(null);
  
  const getKrakenPair = (symbol: string) => {
    const pairMap: { [key: string]: string } = {
      'BTC': 'XBTUSD',
      'ETH': 'ETHUSD',
      'ADA': 'ADAUSD',
      'SOL': 'SOLUSD'
    };
    return pairMap[symbol] || 'XBTUSD';
  };
  
  const openPosition = (type: 'long' | 'short') => {
    if (cryptoData && !position) {
      setPosition(type);
      setEntryPrice(cryptoData.price);
    }
  };
  
  const closePosition = () => {
    if (position && entryPrice && cryptoData) {
      const priceDiff = cryptoData.price - entryPrice;
      const profit = position === 'long' ? priceDiff : -priceDiff;
      const profitPercent = (profit / entryPrice) * 100;
      const dollarProfit = (portfolio * 0.1) * (profitPercent / 100);
      
      setPortfolio(prev => prev + dollarProfit);
      setPosition(null);
      setEntryPrice(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Button onClick={onBack} className="mb-4 border-gray-700 text-gray-300 hover:bg-gray-800">
            <ChevronLeft className="w-4 h-4 mr-2" /> Back to Menu
          </Button>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Practice Trading</h1>
              <p className="text-gray-400">Risk-free environment with live Kraken OHLC data</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <Card className="course-card p-6 bg-gray-800 border-gray-700">
            <h3 className="text-xl font-semibold mb-4 flex items-center text-white">
              <DollarSign className="w-6 h-6 mr-2 text-amber-500" />
              Portfolio
            </h3>
            <div className="text-3xl font-bold text-amber-500 mb-2">
              ${portfolio.toLocaleString()}
            </div>
            <p className="text-sm text-gray-400">Virtual Balance</p>
            
            {position && (
              <div className="mt-4 p-4 bg-gray-700 rounded-lg">
                <h4 className="font-semibold text-amber-500">Active Position</h4>
                <p className="text-sm text-gray-300">
                  {position.toUpperCase()} {selectedCrypto} @ ${entryPrice?.toLocaleString()}
                </p>
                <Button onClick={closePosition} size="sm" className="mt-2 w-full get-started-btn bg-amber-500 text-gray-900 hover:bg-amber-600">
                  Close Position
                </Button>
              </div>
            )}
          </Card>

          <Card className="course-card p-6 lg:col-span-2 bg-gray-800 border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-white">Live Market Data (Kraken)</h3>
            </div>
            <div className="p-4 rounded-lg border-2 border-amber-500 bg-gray-700">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-semibold text-white">{cryptoData.name}</h4>
                  <p className="text-sm text-gray-400">{cryptoData.symbol}</p>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-white">${cryptoData.price.toLocaleString()}</div>
                  <Badge 
                    className={`flex items-center ${
                      cryptoData.change > 0 
                        ? 'bg-green-500 text-black' 
                        : 'bg-red-500 text-white'
                    }`}
                  >
                    {cryptoData.change > 0 ? (
                      <TrendingUp className="w-3 h-3 mr-1" />
                    ) : (
                      <TrendingDown className="w-3 h-3 mr-1" />
                    )}
                    {cryptoData.change > 0 ? '+' : ''}{cryptoData.change.toFixed(2)}%
                  </Badge>
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-400">
                24h Vol: {cryptoData.volume?.toLocaleString() || 'N/A'}
              </div>
            </div>
          </Card>
        </div>

        <div className="mt-8">
          <OHLCChart pair={getKrakenPair(selectedCrypto)} interval={5} />
        </div>

        <Card className="course-card p-6 mt-8 bg-gray-800 border-gray-700">
          <h3 className="text-xl font-semibold mb-4 flex items-center text-white">
            <Target className="w-6 h-6 mr-2 text-amber-500" />
            Trading Actions
          </h3>
          
          <div className="text-center">
            <p className="mb-4 text-gray-300">
              Selected: <span className="font-semibold text-white">{cryptoData.name}</span> @ 
              <span className="font-bold text-lg text-amber-500">${cryptoData.price.toLocaleString()}</span>
            </p>
            
            {!position ? (
              <div className="flex gap-4 justify-center">
                <Button 
                  onClick={() => openPosition('long')}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Buy (Long)
                </Button>
                <Button 
                  onClick={() => openPosition('short')}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  <TrendingDown className="w-4 h-4 mr-2" />
                  Sell (Short)
                </Button>
              </div>
            ) : (
              <p className="text-amber-500 font-semibold">
                You have an active {position} position. Close it to open a new one.
              </p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PracticeTrading;