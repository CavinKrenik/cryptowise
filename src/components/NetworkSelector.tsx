import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useGeckoNetworks } from '@/hooks/useGeckoTerminal';
import { Network } from 'lucide-react';

interface NetworkSelectorProps {
  selectedNetwork: string;
  onNetworkChange: (network: string) => void;
}

const NetworkSelector: React.FC<NetworkSelectorProps> = ({ 
  selectedNetwork, 
  onNetworkChange 
}) => {
  const { data: networks, loading, error } = useGeckoNetworks();

  if (loading) {
    return (
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Network className="w-5 h-5" />
            Select Network
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-10 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Alert className="bg-red-900/20 border-red-800">
        <AlertDescription className="text-red-400">
          Failed to load networks: {error}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Network className="w-5 h-5" />
          Select Network
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Select value={selectedNetwork} onValueChange={onNetworkChange}>
          <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
            <SelectValue placeholder="Choose a network" />
          </SelectTrigger>
          <SelectContent className="bg-gray-700 border-gray-600">
            {networks?.map((network) => {
              const attrs = network.attributes;
              return (
                <SelectItem 
                  key={network.id} 
                  value={attrs.identifier}
                  className="text-white hover:bg-gray-600"
                >
                  {attrs.name}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
        
        {selectedNetwork && (
          <div className="mt-3 p-3 bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-300">
              Selected: <span className="text-white font-medium">{selectedNetwork}</span>
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NetworkSelector;