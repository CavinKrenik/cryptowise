import React, { useState, useEffect } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { useLocation, useNavigate } from 'react-router-dom';
import Hero from './Hero';
import Navigation from './Navigation';
import DigitalAssetsBasics from './DigitalAssetsBasics';
import AdvancedDigitalAssets from './AdvancedDigitalAssets';
import InvestmentStrategies from './InvestmentStrategies';
import ChartAnalysis from './ChartAnalysis';
import Glossary from './Glossary';
import { PairSelector } from './PairSelector';
import LiveChart from './LiveChart';
import { useMultiSourceData } from '@/hooks/useMultiSourceData';

type AppState = 'hero' | 'navigation' | 'basics' | 'advanced' | 'strategies' | 'charts' | 'glossary' | 'pairs';

interface TradingPair {
  symbol: string;
  name: string;
  price: number;
  change: number;
  volume: string;
  krakenPair: string;
}

const AppLayout: React.FC = () => {
  const { sidebarOpen, toggleSidebar } = useAppContext();
  const isMobile = useIsMobile();
  const location = useLocation();
  const navigate = useNavigate();
  const [currentState, setCurrentState] = useState<AppState>('hero');
  const [selectedPair, setSelectedPair] = useState<TradingPair | null>(null);
  
  const { cryptoData, dataSource } = useMultiSourceData();
  const btcData = cryptoData.find(coin => coin.symbol === 'BTC') || cryptoData[0];

  // Reset to hero state when navigating back to home
  useEffect(() => {
    if (location.pathname === '/') {
      setCurrentState('hero');
      setSelectedPair(null);
    }
  }, [location.pathname]);

  const handleGetStarted = () => {
    setCurrentState('navigation');
  };

  const handleSectionSelect = (section: string) => {
    switch (section) {
      case 'basics':
        setCurrentState('basics');
        break;
      case 'advanced':
        setCurrentState('advanced');
        break;
      case 'strategies':
        setCurrentState('strategies');
        break;
      case 'charts':
        setCurrentState('charts');
        break;
      case 'glossary':
        setCurrentState('glossary');
        break;
      case 'pairs':
        setCurrentState('pairs');
        break;
      default:
        setCurrentState('navigation');
    }
  };

  const handleBack = () => {
    setCurrentState('hero');
  };

  const handlePairSelect = (pair: TradingPair) => {
    setSelectedPair(pair);
    setCurrentState('charts');
  };

  const renderCurrentView = () => {
    switch (currentState) {
      case 'hero':
        return <Hero onGetStarted={handleGetStarted} />;
      case 'navigation':
        return (
          <div>
            <Navigation onSectionSelect={handleSectionSelect} activeSection="" />
            <div className="bg-gray-900 px-8 pb-8">
              <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">Live Market Data</h2>
                  <div className="text-sm text-gray-400">
                    Data source: {dataSource === 'kraken' ? 'Kraken API' : 'CoinGecko API'}
                  </div>
                </div>
                <LiveChart cryptoData={btcData} />
              </div>
            </div>
          </div>
        );
      case 'basics':
        return <DigitalAssetsBasics onBack={handleBack} />;
      case 'advanced':
        return <AdvancedDigitalAssets onBack={handleBack} />;
      case 'strategies':
        return <InvestmentStrategies onBack={handleBack} />;
      case 'charts':
        if (selectedPair) {
          const pairCryptoData = {
            symbol: selectedPair.symbol,
            name: selectedPair.name,
            price: selectedPair.price,
            change: selectedPair.change,
            trend: selectedPair.change >= 0 ? 'up' as const : 'down' as const,
            high24h: selectedPair.price * 1.05,
            low24h: selectedPair.price * 0.95,
            volume: parseInt(selectedPair.volume.replace(/[^0-9]/g, ''))
          };
          return (
            <div className="min-h-screen bg-gray-900 text-white">
              <div className="container mx-auto px-4 py-8">
                <button 
                  onClick={handleBack}
                  className="mb-4 text-amber-500 hover:text-amber-400 transition-colors"
                >
                  ← Back to Main
                </button>
                <LiveChart cryptoData={pairCryptoData} krakenPair={selectedPair.krakenPair} />
              </div>
            </div>
          );
        }
        return <ChartAnalysis onBack={handleBack} />;
      case 'glossary':
        return <Glossary onBack={handleBack} />;
      case 'pairs':
        return (
          <div className="min-h-screen bg-gray-900 text-white">
            <div className="container mx-auto px-4 py-8">
              <button 
                onClick={handleBack}
                className="mb-4 text-amber-500 hover:text-amber-400 transition-colors"
              >
                ← Back to Main
              </button>
              <h1 className="page-title text-3xl font-bold mb-6 text-white">Trading Pairs</h1>
              <PairSelector 
                onPairSelect={handlePairSelect} 
                selectedPair={selectedPair?.symbol}
              />
            </div>
          </div>
        );
      default:
        return <Hero onGetStarted={handleGetStarted} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {renderCurrentView()}
    </div>
  );
};

export { AppLayout };
export default AppLayout;