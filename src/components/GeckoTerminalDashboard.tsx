import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import NetworkSelector from './NetworkSelector';
import TrendingPools from './TrendingPools';
import GeckoTerminalPool from './GeckoTerminalPool';
import PoolTrades from './PoolTrades';
import { Search, TrendingUp, BarChart3, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const GeckoTerminalDashboard: React.FC = () => {
  const [selectedNetwork, setSelectedNetwork] = useState('ethereum');
  const [poolAddress, setPoolAddress] = useState('');
  const [searchedPool, setSearchedPool] = useState('');
  const navigate = useNavigate();

  const handlePoolSearch = () => {
    if (poolAddress.trim()) {
      setSearchedPool(poolAddress.trim());
    }
  };

  const handleUrlParse = (url: string) => {
    // Parse GeckoTerminal URLs like https://www.geckoterminal.com/eth/pools/0x...
    const match = url.match(/geckoterminal\.com\/(\w+)\/pools\/(0x[a-fA-F0-9]+)/);
    if (match) {
      const [, network, address] = match;
      setSelectedNetwork(network === 'eth' ? 'ethereum' : network);
      setPoolAddress(address);
      setSearchedPool(address);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
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

        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white">
            GeckoTerminal Analytics
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore trending pools, analyze trading data, and discover new opportunities across multiple blockchain networks.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <NetworkSelector 
              selectedNetwork={selectedNetwork}
              onNetworkChange={setSelectedNetwork}
            />
          </div>
          
          <div className="lg:col-span-2">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Search className="w-5 h-5" />
                  Pool Search
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter pool address or GeckoTerminal URL"
                    value={poolAddress}
                    onChange={(e) => {
                      const value = e.target.value;
                      setPoolAddress(value);
                      if (value.includes('geckoterminal.com')) {
                        handleUrlParse(value);
                      }
                    }}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                  <Button 
                    onClick={handlePoolSearch}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Search
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Tabs defaultValue="trending" className="space-y-6">
          <TabsList className="bg-gray-800 border-gray-700">
            <TabsTrigger value="trending" className="data-[state=active]:bg-gray-700">
              <TrendingUp className="w-4 h-4 mr-2" />
              Trending Pools
            </TabsTrigger>
            <TabsTrigger value="analysis" className="data-[state=active]:bg-gray-700">
              <BarChart3 className="w-4 h-4 mr-2" />
              Pool Analysis
            </TabsTrigger>
          </TabsList>

          <TabsContent value="trending">
            <TrendingPools network={selectedNetwork} />
          </TabsContent>

          <TabsContent value="analysis">
            {searchedPool ? (
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-2">
                  <GeckoTerminalPool 
                    poolAddress={searchedPool}
                    network={selectedNetwork}
                  />
                </div>
                <div className="xl:col-span-1">
                  <PoolTrades 
                    network={selectedNetwork}
                    poolAddress={searchedPool}
                  />
                </div>
              </div>
            ) : (
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-8 text-center">
                  <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">
                    No Pool Selected
                  </h3>
                  <p className="text-gray-400">
                    Enter a pool address or GeckoTerminal URL to start analyzing.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default GeckoTerminalDashboard;