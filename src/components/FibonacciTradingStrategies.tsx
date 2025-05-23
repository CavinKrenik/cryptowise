import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Target, Shield, TrendingUp, AlertTriangle } from "lucide-react";

const strategies = [
  {
    name: "Bounce Strategy",
    description: "Buy at Fib support levels in uptrends",
    entry: "Price bounces off 38.2%, 50%, or 61.8% levels",
    stop: "Below the next Fib level",
    target: "Previous high or next resistance",
    success: "70%",
    risk: "Medium"
  },
  {
    name: "Breakout Strategy",
    description: "Trade breaks below/above key Fib levels",
    entry: "Price breaks and closes beyond 61.8% level",
    stop: "Back inside the broken level",
    target: "Next Fib extension level",
    success: "65%",
    risk: "High"
  },
  {
    name: "Confluence Strategy",
    description: "Combine Fib with other indicators",
    entry: "Fib level + moving average + RSI oversold",
    stop: "Below multiple support confluence",
    target: "Multiple resistance confluence",
    success: "80%",
    risk: "Low"
  }
];

const commonMistakes = [
  {
    mistake: "Wrong Swing Points",
    description: "Using minor highs/lows instead of significant ones",
    solution: "Use higher timeframes to identify major swings"
  },
  {
    mistake: "Ignoring Market Context",
    description: "Drawing Fibs without considering overall trend",
    solution: "Always analyze the bigger picture first"
  },
  {
    mistake: "Over-reliance",
    description: "Using Fibonacci as the only trading signal",
    solution: "Combine with other technical analysis tools"
  },
  {
    mistake: "Poor Risk Management",
    description: "Not setting proper stop losses at Fib levels",
    solution: "Always define risk before entering trades"
  }
];

export const FibonacciTradingStrategies = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-green-500">
              <Target className="h-4 w-4 text-white" />
            </div>
            <div>
              <CardTitle>Fibonacci Trading Strategies</CardTitle>
              <CardDescription>Proven methods for trading with Fibonacci retracements</CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="strategies" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="strategies">Trading Strategies</TabsTrigger>
          <TabsTrigger value="mistakes">Common Mistakes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="strategies" className="space-y-4">
          <div className="grid gap-4">
            {strategies.map((strategy, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      {strategy.name}
                    </CardTitle>
                    <div className="flex gap-2">
                      <Badge variant={strategy.risk === 'Low' ? 'default' : strategy.risk === 'Medium' ? 'secondary' : 'destructive'}>
                        {strategy.risk} Risk
                      </Badge>
                      <Badge variant="outline">{strategy.success} Success</Badge>
                    </div>
                  </div>
                  <CardDescription>{strategy.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-green-500" />
                        <span className="font-medium text-sm">Entry</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{strategy.entry}</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-red-500" />
                        <span className="font-medium text-sm">Stop Loss</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{strategy.stop}</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-blue-500" />
                        <span className="font-medium text-sm">Target</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{strategy.target}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="mistakes" className="space-y-4">
          <div className="grid gap-4">
            {commonMistakes.map((item, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-orange-500" />
                    {item.mistake}
                  </CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-green-50 p-3 rounded border border-green-200">
                    <div className="flex items-start gap-2">
                      <Shield className="h-4 w-4 text-green-500 mt-0.5" />
                      <div>
                        <span className="font-medium text-sm text-green-700">Solution: </span>
                        <span className="text-sm text-green-600">{item.solution}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};