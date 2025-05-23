import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Clock, TrendingUp, TrendingDown, BarChart3, Volume2 } from "lucide-react";

const timeframes = [
  { range: "1m-15m", type: "Short", use: "Scalping & Day Trading", color: "bg-red-500" },
  { range: "1h-4h", type: "Medium", use: "Swing Trading", color: "bg-yellow-500" },
  { range: "1d-1w", type: "Long", use: "Position Trading", color: "bg-green-500" }
];

const candlestickParts = [
  {
    name: "Body",
    description: "Rectangle showing opening and closing prices",
    bullish: "Green/White - Close > Open",
    bearish: "Red/Black - Close < Open"
  },
  {
    name: "Upper Wick",
    description: "Thin line above body",
    meaning: "Highest price reached during period"
  },
  {
    name: "Lower Wick",
    description: "Thin line below body",
    meaning: "Lowest price reached during period"
  }
];

export const ChartBasics = () => {
  return (
    <div className="space-y-6">
      {/* Why Technical Analysis Matters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Why Technical Analysis Matters in Crypto
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                <p className="text-sm">Crypto markets are highly volatile and driven by speculation and sentiment</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                <p className="text-sm">Helps interpret price behavior based on historical movements</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                <p className="text-sm">Aids in identifying potential entry and exit points</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                <p className="text-sm">Allows traders to filter out market noise with structured approach</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Candlestick Components */}
      <Card>
        <CardHeader>
          <CardTitle>Candlestick Components</CardTitle>
          <CardDescription>Understanding OHLC (Open, High, Low, Close) data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {candlestickParts.map((part) => (
              <div key={part.name} className="space-y-2">
                <h4 className="font-medium">{part.name}</h4>
                <p className="text-sm text-muted-foreground">{part.description}</p>
                {part.bullish && (
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-3 w-3 text-green-500" />
                      <span className="text-xs">{part.bullish}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingDown className="h-3 w-3 text-red-500" />
                      <span className="text-xs">{part.bearish}</span>
                    </div>
                  </div>
                )}
                {part.meaning && (
                  <p className="text-xs text-muted-foreground">{part.meaning}</p>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Timeframes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Trading Timeframes
          </CardTitle>
          <CardDescription>Choose timeframe based on your trading style</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {timeframes.map((tf) => (
              <div key={tf.type} className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${tf.color}`} />
                  <Badge variant="outline">{tf.type}-term</Badge>
                </div>
                <div>
                  <p className="font-medium">{tf.range}</p>
                  <p className="text-sm text-muted-foreground">{tf.use}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Volume */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Volume2 className="h-5 w-5" />
            Volume Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h4 className="font-medium text-green-600">High Volume</h4>
              <p className="text-sm text-muted-foreground">Indicates strong conviction behind a price move</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-yellow-600">Low Volume</h4>
              <p className="text-sm text-muted-foreground">Suggests indecision or weakness in trend</p>
            </div>
          </div>
          <Separator className="my-4" />
          <p className="text-sm font-medium">Key Insight:</p>
          <p className="text-sm text-muted-foreground">High volume on breakouts or trend continuations strengthens their validity</p>
        </CardContent>
      </Card>
    </div>
  );
};