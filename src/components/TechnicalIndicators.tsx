import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Activity, BarChart3, Ruler } from "lucide-react";
import { FibonacciLearning } from "./FibonacciLearning";

const indicators = [
  {
    name: "Moving Averages (MA)",
    category: "trend",
    icon: TrendingUp,
    description: "Smooth out price data to identify trends. SMA averages prices, EMA gives more weight to recent prices.",
    usage: "Golden cross (50 MA above 200 MA) = bullish signal",
    overbought: null,
    oversold: null
  },
  {
    name: "MACD",
    category: "trend",
    icon: Activity,
    description: "Measures relationship between two EMAs to identify momentum and trend reversals.",
    usage: "MACD line crossing above signal line = buy signal",
    overbought: null,
    oversold: null
  },
  {
    name: "RSI",
    category: "momentum",
    icon: BarChart3,
    description: "Measures speed and change of price movements to identify overbought/oversold conditions.",
    usage: "Range 0-100. Use for divergence analysis.",
    overbought: 70,
    oversold: 30
  },
  {
    name: "Stochastic",
    category: "momentum",
    icon: BarChart3,
    description: "Compares closing price to price range over given period to indicate momentum.",
    usage: "Often used with RSI for confirmation signals.",
    overbought: 80,
    oversold: 20
  },
  {
    name: "Bollinger Bands",
    category: "volatility",
    icon: Activity,
    description: "Middle band (SMA) with outer bands (standard deviations). Measures volatility.",
    usage: "Bands widen = high volatility, narrow = low volatility",
    overbought: null,
    oversold: null
  }
];

const getCategoryColor = (category: string) => {
  switch (category) {
    case "trend": return "bg-blue-500";
    case "momentum": return "bg-green-500";
    case "volatility": return "bg-purple-500";
    default: return "bg-gray-500";
  }
};

export const TechnicalIndicators = () => {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="indicators" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="indicators">Technical Indicators</TabsTrigger>
          <TabsTrigger value="fibonacci">Fibonacci Analysis</TabsTrigger>
        </TabsList>
        
        <TabsContent value="indicators" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {indicators.map((indicator) => {
              const Icon = indicator.icon;
              return (
                <Card key={indicator.name} className="h-full">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${getCategoryColor(indicator.category)}`}>
                        <Icon className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{indicator.name}</CardTitle>
                        <CardDescription className="capitalize">
                          {indicator.category} indicator
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      {indicator.description}
                    </p>
                    <div className="bg-muted p-3 rounded">
                      <p className="text-sm font-medium">
                        {indicator.usage}
                      </p>
                    </div>
                    {(indicator.overbought || indicator.oversold) && (
                      <div className="space-y-2">
                        <div className="text-sm font-medium">Signal Levels:</div>
                        {indicator.overbought && (
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Overbought</span>
                            <Badge variant="destructive">{indicator.overbought}+</Badge>
                          </div>
                        )}
                        {indicator.oversold && (
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Oversold</span>
                            <Badge variant="default">{indicator.oversold}-</Badge>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
        
        <TabsContent value="fibonacci">
          <FibonacciLearning />
        </TabsContent>
      </Tabs>
    </div>
  );
};