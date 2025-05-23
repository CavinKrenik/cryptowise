import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import GeckoTerminalPool from '@/components/GeckoTerminalPool';
import { Button } from '@/components/ui/button';

const PoolView: React.FC = () => {
  const { network, address } = useParams<{ network: string; address: string }>();
  const navigate = useNavigate();

  if (!network || !address) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Invalid Pool URL</h1>
          <p className="text-gray-400 mb-6">The pool network or address is missing.</p>
          <Button 
            onClick={() => navigate('/')}
            variant="outline" 
            className="bg-gray-800 border-gray-600 text-white hover:bg-gray-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Main
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button 
            onClick={() => navigate('/')}
            variant="outline" 
            className="bg-gray-800 border-gray-600 text-white hover:bg-gray-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Main
          </Button>
        </div>
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Pool Analysis</h1>
          <p className="text-gray-400">
            Network: <span className="text-amber-400">{network.toUpperCase()}</span> | 
            Address: <span className="text-amber-400 font-mono text-sm">{address}</span>
          </p>
        </div>

        <GeckoTerminalPool poolAddress={address} network={network} />
      </div>
    </div>
  );
};

export default PoolView;