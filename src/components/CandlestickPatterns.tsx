import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";

const patterns = [
  {
    name: "Doji",
    type: "reversal",
    signal: "neutral",
    description: "Small or non-existent body, indicating indecision. Often signals potential reversal after prolonged trend.",
    visual: "═══"
  },
  {
    name: "Hammer",
    type: "reversal",
    signal: "bullish",
    description: "Small body at top with long lower wick. Appears after downtrend, suggesting buyers stepped in.",
    visual: "▄\n|\n|"
  },
  {
    name: "Shooting Star",
    type: "reversal",
    signal: "bearish",
    description: "Small body at bottom with long upper wick. Appears after uptrend, suggesting sellers pushed down.",
    visual: "|\n|\n▄"
  },
  {
    name: "Bullish Engulfing",
    type: "reversal",
    signal: "bullish",
    description: "Large green candle completely covers previous small red candle, indicating strong buying pressure.",
    visual: "█▄"
  },
  {
    name: "Bearish Engulfing",
    type: "reversal",
    signal: "bearish",
    description: "Large red candle completely covers previous small green candle, indicating strong selling pressure.",
    visual: "▄█"
  },
  {
    name: "Morning Star",
    type: "reversal",
    signal: "bullish",
    description: "Three-candle pattern: long bearish, small indecisive, long bullish. Signals bottom and potential uptrend.",
    visual: "█ ▄ █"
  }
];

export const CandlestickPatterns = () => {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {patterns.map((pattern) => (
          <Card key={pattern.name} className="h-full">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{pattern.name}</CardTitle>
                <div className="flex items-center gap-2">
                  {pattern.signal === "bullish" && <TrendingUp className="h-4 w-4 text-green-500" />}
                  {pattern.signal === "bearish" && <TrendingDown className="h-4 w-4 text-red-500" />}
                  <Badge variant={pattern.signal === "bullish" ? "default" : pattern.signal === "bearish" ? "destructive" : "secondary"}>
                    {pattern.signal}
                  </Badge>
                </div>
              </div>
              <CardDescription className="text-xs">
                {pattern.type} pattern
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="bg-muted p-3 rounded font-mono text-center text-sm">
                  {pattern.visual}
                </div>
                <p className="text-sm text-muted-foreground">
                  {pattern.description}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};