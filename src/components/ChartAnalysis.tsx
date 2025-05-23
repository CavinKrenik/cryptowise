import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronLeft, BarChart3, TrendingUp, Activity, Target } from 'lucide-react';
import { useKrakenData } from '@/hooks/useKrakenData';
import LiveChart from '@/components/LiveChart';

interface ChartAnalysisProps {
  onBack: () => void;
}

const ChartAnalysis: React.FC<ChartAnalysisProps> = ({ onBack }) => {
  const [currentModule, setCurrentModule] = useState(0);
  const cryptoData = useKrakenData('BTC');
  
  const modules = [
    {
      title: "Chart Types & Basics",
      icon: BarChart3,
      content: "Learn to read candlestick charts, the most popular chart type in crypto trading. Each candle shows opening price, closing price, highest price, and lowest price for a specific time period.",
      concepts: [
        "Green/White candles: Price closed higher than it opened (bullish)",
        "Red/Black candles: Price closed lower than it opened (bearish)",
        "Wicks/Shadows: Show the highest and lowest prices reached",
        "Body: Shows the difference between open and close prices"
      ]
    },
    {
      title: "Technical Indicators",
      icon: Activity,
      content: "Technical indicators help identify trends and potential trading opportunities. Moving Averages smooth out price data, RSI measures momentum, and MACD shows trend changes.",
      concepts: [
        "Moving Averages: Identify trend direction (50MA, 200MA)",
        "RSI (0-100): Overbought (>70) and Oversold (<30) levels",
        "MACD: Shows momentum and trend reversals",
        "Bollinger Bands: Measure volatility and potential breakouts"
      ]
    },
    {
      title: "Chart Patterns",
      icon: TrendingUp,
      content: "Chart patterns are formations that suggest future price movements. Triangles, flags, and head & shoulders are common patterns that traders use to predict market direction.",
      concepts: [
        "Triangles: Consolidation before breakout (ascending, descending)",
        "Head & Shoulders: Reversal pattern (bearish)",
        "Flags: Continuation patterns after strong moves",
        "Double Top/Bottom: Reversal patterns at key levels"
      ]
    },
    {
      title: "Support & Resistance",
      icon: Target,
      content: "Support and resistance levels are key price points where buying or selling pressure tends to emerge. These levels help traders identify entry and exit points.",
      concepts: [
        "Support: Price level where buying interest emerges",
        "Resistance: Price level where selling pressure increases",
        "Breakouts: When price moves beyond support/resistance",
        "Role Reversal: Support becomes resistance and vice versa"
      ]
    }
  ];

  const progress = ((currentModule + 1) / modules.length) * 100;
  const currentModuleData = modules[currentModule];
  const Icon = currentModuleData.icon;

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Button onClick={onBack} className="mb-4 border-gray-700 text-gray-300 hover:bg-gray-800">
            <ChevronLeft className="w-4 h-4 mr-2" /> Back to Menu
          </Button>
          <h1 className="text-4xl font-bold text-white mb-2">Chart Analysis Mastery</h1>
          <Progress value={progress} className="w-full h-2 bg-gray-800" />
          <p className="text-sm text-gray-400 mt-2">Module {currentModule + 1} of {modules.length}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs value={currentModule.toString()} className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 bg-gray-800">
                {modules.map((module, index) => {
                  const ModuleIcon = module.icon;
                  return (
                    <TabsTrigger 
                      key={index} 
                      value={index.toString()}
                      onClick={() => setCurrentModule(index)}
                      className="flex flex-col items-center p-4 text-gray-300 data-[state=active]:bg-amber-500 data-[state=active]:text-gray-900"
                    >
                      <ModuleIcon className="w-6 h-6 mb-1" />
                      <span className="text-xs">{module.title}</span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>

              <TabsContent value={currentModule.toString()}>
                <Card className="course-card p-8 bg-gray-800 border-gray-700">
                  <div className="flex items-center mb-6">
                    <Icon className="w-12 h-12 text-amber-500 mr-4" />
                    <h2 className="text-3xl font-bold text-white">{currentModuleData.title}</h2>
                  </div>
                  
                  <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                    {currentModuleData.content}
                  </p>
                  
                  <div className="bg-gray-700 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-amber-500 mb-4">Key Concepts:</h3>
                    <div className="grid gap-3">
                      {currentModuleData.concepts.map((concept, index) => (
                        <div key={index} className="flex items-start">
                          <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                          <span className="text-gray-300">{concept}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white">Live Market Data</h3>
            <LiveChart cryptoData={cryptoData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartAnalysis;