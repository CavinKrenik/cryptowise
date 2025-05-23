import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChartBasics } from "@/components/ChartBasics";
import { SupportResistance } from "@/components/SupportResistance";
import { CandlestickPatterns } from "@/components/CandlestickPatterns";
import { TechnicalIndicators } from "@/components/TechnicalIndicators";
import { BarChart3, TrendingUp, Activity, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TechnicalAnalysis = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Button 
            onClick={() => navigate('/')}
            variant="outline" 
            className="bg-gray-800 border-gray-600 text-white hover:bg-gray-700"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Main
          </Button>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Technical Analysis Learning</h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Master the art of reading crypto charts and making informed trading decisions. 
            Learn to interpret price movements, patterns, and indicators like a professional trader.
          </p>
        </div>

        {/* Overview Cards */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="pb-3">
              <BarChart3 className="h-8 w-8 text-blue-500 mb-2" />
              <CardTitle className="text-lg text-white">Chart Basics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-400">
                Understanding candlesticks, timeframes, and volume
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="pb-3">
              <TrendingUp className="h-8 w-8 text-green-500 mb-2" />
              <CardTitle className="text-lg text-white">Support & Resistance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-400">
                Key price levels and trend analysis
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="pb-3">
              <BarChart3 className="h-8 w-8 text-purple-500 mb-2" />
              <CardTitle className="text-lg text-white">Patterns</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-400">
                Reversal and continuation patterns
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="pb-3">
              <Activity className="h-8 w-8 text-orange-500 mb-2" />
              <CardTitle className="text-lg text-white">Indicators</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-400">
                RSI, MACD, Moving Averages
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="basics" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-gray-800">
            <TabsTrigger value="basics" className="text-white data-[state=active]:bg-amber-600">Chart Basics</TabsTrigger>
            <TabsTrigger value="levels" className="text-white data-[state=active]:bg-amber-600">Support & Resistance</TabsTrigger>
            <TabsTrigger value="patterns" className="text-white data-[state=active]:bg-amber-600">Candlestick Patterns</TabsTrigger>
            <TabsTrigger value="indicators" className="text-white data-[state=active]:bg-amber-600">Technical Indicators</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basics" className="mt-6">
            <ChartBasics />
          </TabsContent>
          
          <TabsContent value="levels" className="mt-6">
            <SupportResistance />
          </TabsContent>
          
          <TabsContent value="patterns" className="mt-6">
            <div className="space-y-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Essential Candlestick Patterns</CardTitle>
                  <CardDescription className="text-gray-400">
                    Visual cues about market sentiment and potential price movements
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CandlestickPatterns />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="indicators" className="mt-6">
            <div className="space-y-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Popular Technical Indicators</CardTitle>
                  <CardDescription className="text-gray-400">
                    Mathematical calculations based on price and volume data
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <TechnicalIndicators />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TechnicalAnalysis;