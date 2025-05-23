import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowUp, ArrowDown, TrendingUp, Volume2 } from "lucide-react";

const concepts = [
  {
    name: "Support",
    icon: ArrowUp,
    color: "text-green-500",
    description: "Price level where downtrend expected to pause or reverse due to strong buying interest",
    analogy: "Acts like a 'floor' for price movement",
    action: "Buyers step in at this level"
  },
  {
    name: "Resistance",
    icon: ArrowDown,
    color: "text-red-500",
    description: "Price level where uptrend expected to pause or reverse due to strong selling pressure",
    analogy: "Acts like a 'ceiling' for price movement",
    action: "Sellers step in at this level"
  }
];

const identificationMethods = [
  {
    method: "Historical Price Levels",
    description: "Look for points where price consistently stopped, reversed, or paused",
    tip: "More touches = stronger level"
  },
  {
    method: "Trend Lines",
    description: "Dynamic support/resistance that moves with price",
    tip: "Connect swing highs or lows"
  },
  {
    method: "Psychological Levels",
    description: "Round numbers like $10, $100, $1,000",
    tip: "Human psychology creates these barriers"
  },
  {
    method: "Volume Confirmation",
    description: "High volume at S/R levels strengthens significance",
    tip: "Volume validates the level's importance"
  }
];

export const SupportResistance = () => {
  return (
    <div className="space-y-6">
      {/* Core Concepts */}
      <div className="grid gap-4 md:grid-cols-2">
        {concepts.map((concept) => {
          const Icon = concept.icon;
          return (
            <Card key={concept.name}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon className={`h-5 w-5 ${concept.color}`} />
                  {concept.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  {concept.description}
                </p>
                <div className="bg-muted p-3 rounded">
                  <p className="text-sm font-medium">{concept.analogy}</p>
                </div>
                <Badge variant="outline" className="w-fit">
                  {concept.action}
                </Badge>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Identification Methods */}
      <Card>
        <CardHeader>
          <CardTitle>How to Identify Support & Resistance</CardTitle>
          <CardDescription>Key methods for finding significant price levels</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {identificationMethods.map((method, index) => (
              <div key={index} className="space-y-2">
                <h4 className="font-medium flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  {method.method}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {method.description}
                </p>
                <Badge variant="secondary" className="text-xs">
                  💡 {method.tip}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Role Reversal */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Role Reversal Concept
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <h4 className="font-medium text-green-600">Resistance → Support</h4>
                <p className="text-sm text-muted-foreground">
                  When price breaks above resistance, that level often becomes new support
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-red-600">Support → Resistance</h4>
                <p className="text-sm text-muted-foreground">
                  When price breaks below support, that level often becomes new resistance
                </p>
              </div>
            </div>
            <Separator />
            <div className="bg-muted p-4 rounded">
              <p className="text-sm font-medium mb-2">Key Trading Insight:</p>
              <p className="text-sm text-muted-foreground">
                Previous resistance levels that are broken often provide strong support on retests, 
                and vice versa. This creates high-probability trading opportunities.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Volume Confirmation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Volume2 className="h-5 w-5" />
            Volume Confirmation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Volume adds weight to support and resistance levels:
            </p>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="bg-green-50 dark:bg-green-950 p-3 rounded border border-green-200 dark:border-green-800">
                <p className="text-sm font-medium text-green-700 dark:text-green-300">
                  High Volume at S/R
                </p>
                <p className="text-xs text-green-600 dark:text-green-400">
                  Strengthens the level's significance
                </p>
              </div>
              <div className="bg-yellow-50 dark:bg-yellow-950 p-3 rounded border border-yellow-200 dark:border-yellow-800">
                <p className="text-sm font-medium text-yellow-700 dark:text-yellow-300">
                  Low Volume at S/R
                </p>
                <p className="text-xs text-yellow-600 dark:text-yellow-400">
                  Level may be less reliable
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};