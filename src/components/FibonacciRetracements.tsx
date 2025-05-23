import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Target, Ruler } from "lucide-react";

const fibLevels = [
  { level: "0%", ratio: 0, description: "Start of move (swing high/low)", color: "bg-red-500" },
  { level: "23.6%", ratio: 0.236, description: "Shallow retracement", color: "bg-orange-500" },
  { level: "38.2%", ratio: 0.382, description: "Common retracement level", color: "bg-yellow-500" },
  { level: "50%", ratio: 0.5, description: "Psychological level (not Fibonacci)", color: "bg-blue-500" },
  { level: "61.8%", ratio: 0.618, description: "Golden ratio - key level", color: "bg-green-500" },
  { level: "78.6%", ratio: 0.786, description: "Deep retracement", color: "bg-purple-500" },
  { level: "100%", ratio: 1, description: "End of move (swing low/high)", color: "bg-gray-500" }
];

export const FibonacciRetracements = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-yellow-500">
              <Ruler className="h-4 w-4 text-white" />
            </div>
            <div>
              <CardTitle>Fibonacci Retracements</CardTitle>
              <CardDescription>Key support and resistance levels based on the golden ratio</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Fibonacci retracements help identify potential reversal levels during pullbacks in trending markets.
            Based on the mathematical sequence where each number is the sum of the two preceding ones.
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Key Fibonacci Levels
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {fibLevels.map((fib) => (
              <div key={fib.level} className="flex items-center justify-between p-2 rounded border">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${fib.color}`}></div>
                  <span className="font-medium">{fib.level}</span>
                </div>
                <span className="text-sm text-muted-foreground">{fib.description}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Trading Applications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Badge variant="outline">Support/Resistance</Badge>
              <p className="text-sm">Fib levels often act as dynamic support and resistance zones</p>
            </div>
            <div className="space-y-2">
              <Badge variant="outline">Entry Points</Badge>
              <p className="text-sm">Look for bounces at 38.2%, 50%, or 61.8% for trend continuation</p>
            </div>
            <div className="space-y-2">
              <Badge variant="outline">Stop Losses</Badge>
              <p className="text-sm">Place stops below/above key Fib levels for risk management</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};