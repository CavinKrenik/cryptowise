import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FibonacciRetracements } from "./FibonacciRetracements";
import { FibonacciDrawingGuide } from "./FibonacciDrawingGuide";
import { FibonacciTradingStrategies } from "./FibonacciTradingStrategies";

export const FibonacciLearning = () => {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Fibonacci Retracements Guide</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Master the art of Fibonacci analysis with comprehensive tutorials, drawing techniques, and proven trading strategies.
        </p>
      </div>

      <Tabs defaultValue="basics" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="basics">Fibonacci Basics</TabsTrigger>
          <TabsTrigger value="drawing">Drawing Guide</TabsTrigger>
          <TabsTrigger value="strategies">Trading Strategies</TabsTrigger>
        </TabsList>
        
        <TabsContent value="basics" className="mt-6">
          <FibonacciRetracements />
        </TabsContent>
        
        <TabsContent value="drawing" className="mt-6">
          <FibonacciDrawingGuide />
        </TabsContent>
        
        <TabsContent value="strategies" className="mt-6">
          <FibonacciTradingStrategies />
        </TabsContent>
      </Tabs>
    </div>
  );
};