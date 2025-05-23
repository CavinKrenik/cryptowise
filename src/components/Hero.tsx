import React from 'react';
import { Button } from '@/components/ui/button';
import { useKrakenData } from '@/hooks/useKrakenData';

interface HeroProps {
  onGetStarted: () => void;
}

const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
  const { cryptoData, loading } = useKrakenData();

  return (
    <div className="hero-section min-h-screen text-white">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="page-title text-5xl md:text-7xl font-bold mb-6 text-white">
            CryptoWise
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300">
            Your Gateway to Digital Asset Mastery
          </p>
          <Button 
            onClick={onGetStarted}
            size="lg" 
            className="get-started-btn px-8 py-4 text-lg font-semibold rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            EXPLORE COURSES
          </Button>
        </div>

        {/* What You Can Learn Here */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">
            What You Can Learn Here
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto mb-8">
            Our comprehensive short courses are designed to take you from beginner to confident trader. 
            Learn essential technical analysis skills, understand market patterns, and master chart reading 
            through interactive lessons with real-time market data. Each course builds practical knowledge 
            you can apply immediately, covering everything from basic candlestick patterns to advanced 
            Fibonacci retracements and trading strategies.
          </p>
        </div>

        {/* Live Market Ticker */}
        <div className="mb-12">
          <div className="course-card rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-white">Live Market Data (Kraken)</h3>
              {loading && <span className="text-gray-300">Updating...</span>}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {cryptoData.slice(0, 4).map((crypto) => (
                <div key={crypto.symbol} className="text-center">
                  <div className="text-sm text-gray-300">{crypto.symbol}</div>
                  <div className="text-lg font-bold text-white">${crypto.price.toLocaleString()}</div>
                  <div className={`text-sm ${
                    crypto.change > 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {crypto.change > 0 ? '+' : ''}{crypto.change.toFixed(2)}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;