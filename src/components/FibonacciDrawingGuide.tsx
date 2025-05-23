import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MousePointer, TrendingUp, TrendingDown, AlertCircle } from "lucide-react";

const drawingSteps = [
  {
    step: 1,
    title: "Identify the Trend",
    description: "Look for a clear uptrend or downtrend with distinct swing highs and lows",
    tip: "Wait for at least 3 touches to confirm trend validity"
  },
  {
    step: 2,
    title: "Find Swing Points",
    description: "Locate the most recent significant high and low points",
    tip: "Use higher timeframes for more reliable swing points"
  },
  {
    step: 3,
    title: "Draw the Tool",
    description: "Click and drag from swing high to swing low (or vice versa)",
    tip: "Most platforms auto-calculate and display the retracement levels"
  },
  {
    step: 4,
    title: "Analyze Levels",
    description: "Watch how price reacts at each Fibonacci level",
    tip: "Look for confluence with other technical indicators"
  }
];

export const FibonacciDrawingGuide = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500">
              <MousePointer className="h-4 w-4 text-white" />
            </div>
            <div>
              <CardTitle>How to Draw Fibonacci Retracements</CardTitle>
              <CardDescription>Step-by-step guide for applying Fib tools on charts</CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="uptrend" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="uptrend">Uptrend Example</TabsTrigger>
          <TabsTrigger value="downtrend">Downtrend Example</TabsTrigger>
        </TabsList>
        
        <TabsContent value="uptrend" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                Drawing in an Uptrend
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-medium mb-2">Example: BTC/USD Uptrend</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Bitcoin moves from $30,000 (swing low) to $45,000 (swing high)
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>100% - $30,000 (Swing Low)</span>
                    <Badge variant="outline">Start Point</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>78.6% - $31,790</span>
                    <Badge variant="secondary">Deep Support</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>61.8% - $33,730</span>
                    <Badge variant="default">Golden Ratio</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>50% - $37,500</span>
                    <Badge variant="outline">Psychological</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>38.2% - $39,270</span>
                    <Badge variant="secondary">Shallow Support</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>0% - $45,000 (Swing High)</span>
                    <Badge variant="outline">End Point</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="downtrend" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingDown className="h-4 w-4 text-red-500" />
                Drawing in a Downtrend
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <h4 className="font-medium mb-2">Example: ETH/USD Downtrend</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Ethereum drops from $2,000 (swing high) to $1,200 (swing low)
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>0% - $2,000 (Swing High)</span>
                    <Badge variant="outline">Start Point</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>23.6% - $1,811</span>
                    <Badge variant="secondary">Shallow Resistance</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>38.2% - $1,694</span>
                    <Badge variant="secondary">Common Resistance</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>50% - $1,600</span>
                    <Badge variant="outline">Psychological</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>61.8% - $1,506</span>
                    <Badge variant="default">Golden Ratio</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>100% - $1,200 (Swing Low)</span>
                    <Badge variant="outline">End Point</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid gap-4 md:grid-cols-2">
        {drawingSteps.map((step) => (
          <Card key={step.step}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                  {step.step}
                </div>
                {step.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">{step.description}</p>
              <div className="bg-blue-50 p-3 rounded border border-blue-200">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-blue-500 mt-0.5" />
                  <p className="text-sm text-blue-700">{step.tip}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};