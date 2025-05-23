import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppLayout } from "@/components/AppLayout";
import { Search } from "lucide-react";

const PoolAnalyzer = () => {
  const [searchInput, setSearchInput] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = () => {
    if (!searchInput.trim()) return;
    
    setIsAnalyzing(true);
    // Simulate analysis
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 2000);
  };

  const extractContractAddress = (input: string) => {
    // Extract contract address from GeckoTerminal URL or return as-is if already an address
    const urlMatch = input.match(/\/pools\/(0x[a-fA-F0-9]{40})/);
    if (urlMatch) return urlMatch[1];
    
    // Check if it's already a contract address
    if (input.match(/^0x[a-fA-F0-9]{40}$/)) return input;
    
    return null;
  };

  const contractAddress = extractContractAddress(searchInput);

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-400">
                <Search className="h-6 w-6" />
                Analyze GeckoTerminal Pool
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex gap-4">
                <Input
                  placeholder="Paste GeckoTerminal pool URL or contract address..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="flex-1 bg-gray-700 border-gray-600 text-white"
                />
                <Button 
                  onClick={handleAnalyze}
                  disabled={!searchInput.trim() || isAnalyzing}
                  className="bg-orange-500 hover:bg-orange-600"
                >
                  {isAnalyzing ? "Analyzing..." : "Analyze"}
                </Button>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Example:</p>
                <p className="text-sm text-gray-300 font-mono break-all">
                  0xa3c2076eb97d573cc8842f1db1ecdf7b6f77ba27
                </p>
              </div>

              {contractAddress && (
                <div className="mt-6 p-4 bg-gray-700 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-2">Detected Contract Address:</h3>
                  <p className="font-mono text-orange-400 break-all">{contractAddress}</p>
                </div>
              )}

              {isAnalyzing && (
                <div className="mt-6 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                  <p className="text-blue-400">Analyzing pool data...</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default PoolAnalyzer;