import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronLeft, Search, BookOpen } from 'lucide-react';

interface GlossaryProps {
  onBack: () => void;
}

const Glossary: React.FC<GlossaryProps> = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const terms = [
    {
      term: "Altcoin",
      definition: "Any cryptocurrency other than Bitcoin, often developed to improve upon or offer different functionalities than Bitcoin. Examples include Ethereum, Cardano, and Solana."
    },
    {
      term: "Blockchain",
      definition: "A decentralized, distributed ledger technology that securely records transactions across a network of computers, creating an immutable and transparent chain of data blocks."
    },
    {
      term: "Candlestick Chart",
      definition: "A financial chart that visually represents price movements of an asset over time, displaying the open, high, low, and close prices for a specific period within each 'candlestick.'"
    },
    {
      term: "DeFi",
      definition: "Decentralized Finance – An umbrella term for financial applications and services built on blockchain technology, aiming to replace traditional financial intermediaries with peer-to-peer, transparent, and accessible protocols."
    },
    {
      term: "HODL",
      definition: "A popular crypto slang term, originated from a misspelling of 'hold,' meaning to hold onto a cryptocurrency for a long period, typically through market volatility, rather than selling."
    },
    {
      term: "Market Cap",
      definition: "(Market Capitalization) The total value of a cryptocurrency, calculated by multiplying its current price per coin by the total number of coins in circulation. It indicates a cryptocurrency's relative size and value."
    },
    {
      term: "Private Key",
      definition: "A secret, alphanumeric code that provides cryptographic proof of ownership of your cryptocurrency and allows you to authorize transactions. It is crucial to keep your private key secure and never share it."
    },
    {
      term: "RSI",
      definition: "(Relative Strength Index) A momentum oscillator used in technical analysis that measures the speed and change of price movements. It ranges from 0 to 100 and indicates overbought or oversold conditions."
    },
    {
      term: "Smart Contract",
      definition: "Self-executing agreements with the terms of the agreement directly written into lines of code, stored and run on a blockchain. They automatically enforce and execute predefined actions when conditions are met, without the need for intermediaries."
    },
    {
      term: "Stablecoin",
      definition: "A type of cryptocurrency designed to minimize price volatility by pegging its value to a more stable asset, such as fiat currency (e.g., USD), commodities, or other cryptocurrencies."
    },
    {
      term: "Support",
      definition: "In technical analysis, a price level where a cryptocurrency's downward trend is expected to pause or reverse due to increased buying interest, acting as a 'floor.'"
    },
    {
      term: "Resistance",
      definition: "In technical analysis, a price level where a cryptocurrency's upward trend is expected to pause or reverse due to increased selling pressure, acting as a 'ceiling.'"
    },
    {
      term: "Volatility",
      definition: "The degree of price fluctuation of a cryptocurrency over a period of time. High volatility indicates large and rapid price changes, while low volatility suggests more stable prices."
    },
    {
      term: "Wallet",
      definition: "A digital tool or software application that allows users to securely store, send, and receive cryptocurrencies by managing their private and public keys."
    },
    {
      term: "Whale",
      definition: "An individual or entity holding a significantly large amount of a particular cryptocurrency, whose buying or selling activities can potentially influence market prices due to their substantial holdings."
    }
  ];

  const filteredTerms = terms.filter(item =>
    item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.definition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Button onClick={onBack} className="mb-4 border-gray-700 text-gray-300 hover:bg-gray-800">
            <ChevronLeft className="w-4 h-4 mr-2" /> Back to Menu
          </Button>
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center">
            <BookOpen className="w-10 h-10 mr-3 text-amber-500" />
            Crypto Glossary
          </h1>
          <p className="text-gray-400">Essential terms and definitions for crypto education</p>
        </div>

        <Card className="course-card p-6 mb-8 bg-gray-800 border-gray-700">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search terms or definitions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 text-lg bg-gray-700 border-gray-600 text-white placeholder-gray-400"
            />
          </div>
        </Card>

        <div className="space-y-4">
          {filteredTerms.map((item, index) => (
            <Card key={index} className="course-card p-6 bg-gray-800 border-gray-700 hover:border-amber-500/50 transition-all">
              <h3 className="text-xl font-bold text-amber-500 mb-3">{item.term}</h3>
              <p className="text-gray-300 leading-relaxed">{item.definition}</p>
            </Card>
          ))}
          
          {filteredTerms.length === 0 && (
            <Card className="course-card p-8 text-center bg-gray-800 border-gray-700">
              <p className="text-gray-400 text-lg">No terms found matching your search.</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Glossary;