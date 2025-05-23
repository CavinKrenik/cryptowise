import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ChevronRight, ChevronLeft, Coins, Shield, Link, Zap, TrendingUp, Users, AlertTriangle, Search, FileText, Cog, Layers, Scale, DollarSign, Globe, ArrowLeft } from 'lucide-react';

interface DigitalAssetsBasicsProps {
  onBack: () => void;
}

const DigitalAssetsBasics: React.FC<DigitalAssetsBasicsProps> = ({ onBack }) => {
  const [currentLesson, setCurrentLesson] = useState(0);
  
  const lessons = [
    {
      title: "What are Digital Assets?",
      icon: Coins,
      content: "Digital assets are blockchain-based assets that exist in digital form. They include cryptocurrencies like Bitcoin, tokens, NFTs, and other digitally native assets. Unlike traditional assets, they're secured by cryptography and recorded on distributed ledgers.",
      keyPoints: [
        "Exist only in digital form",
        "Secured by blockchain technology",
        "Include cryptocurrencies, tokens, and NFTs",
        "Decentralized and transparent"
      ]
    },
    {
      title: "Types of Cryptocurrencies",
      icon: Zap,
      content: "Cryptocurrencies come in various forms: Bitcoin (digital gold), Ethereum (smart contract platform), Stablecoins (price-stable), Altcoins (alternative cryptocurrencies), and Privacy coins (enhanced anonymity).",
      keyPoints: [
        "Bitcoin: Store of value and digital gold",
        "Ethereum: Smart contracts and DApps",
        "Stablecoins: Price stability (USDC, USDT)",
        "Altcoins: Alternative cryptocurrencies"
      ]
    },
    {
      title: "Wallets & Security",
      icon: Shield,
      content: "Crypto wallets store your private keys, not the actual coins. Hot wallets are connected to the internet (convenient but less secure), while cold wallets are offline (more secure for long-term storage).",
      keyPoints: [
        "Private keys = ownership of your crypto",
        "Hot wallets: Online, convenient for trading",
        "Cold wallets: Offline, secure for storage",
        "Never share your private keys or seed phrase"
      ]
    },
    {
      title: "Blockchain Technology",
      icon: Link,
      content: "Blockchain is a distributed ledger technology that records transactions across multiple computers. It's immutable, transparent, and doesn't require a central authority to validate transactions.",
      keyPoints: [
        "Distributed ledger across multiple nodes",
        "Immutable transaction records",
        "Consensus mechanisms (Proof of Work/Stake)",
        "Smart contracts automate agreements"
      ]
    }
  ];

  const progress = ((currentLesson + 1) / lessons.length) * 100;
  const currentLessonData = lessons[currentLesson];
  const Icon = currentLessonData.icon;

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Button 
            onClick={onBack}
            variant="outline" 
            className="mb-4 bg-gray-800 border-gray-600 text-white hover:bg-gray-700"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Main
          </Button>
          <h1 className="text-4xl font-bold text-white mb-2">Digital Assets 101</h1>
          <Progress value={progress} className="w-full h-2 bg-gray-800" />
          <p className="text-sm text-gray-400 mt-2">Lesson {currentLesson + 1} of {lessons.length}</p>
        </div>

        <Card className="course-card p-8 mb-8 bg-gray-800 border-gray-700">
          <div className="flex items-center mb-6">
            <Icon className="w-12 h-12 text-amber-500 mr-4" />
            <h2 className="text-3xl font-bold text-white">{currentLessonData.title}</h2>
          </div>
          
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            {currentLessonData.content}
          </p>
          
          <div className="bg-gray-700 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-amber-500 mb-4">Key Points:</h3>
            <ul className="space-y-2">
              {currentLessonData.keyPoints.map((point, index) => (
                <li key={index} className="flex items-start">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                  <span className="text-gray-300">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>

        <div className="flex justify-between">
          <Button 
            onClick={() => setCurrentLesson(Math.max(0, currentLesson - 1))}
            disabled={currentLesson === 0}
            className="bg-gray-800 text-gray-300 hover:bg-amber-500 hover:text-gray-900 disabled:bg-gray-700 disabled:text-gray-500"
          >
            <ChevronLeft className="w-4 h-4 mr-2" /> Previous
          </Button>
          
          <Button 
            onClick={() => setCurrentLesson(Math.min(lessons.length - 1, currentLesson + 1))}
            disabled={currentLesson === lessons.length - 1}
            className="get-started-btn bg-amber-500 text-gray-900 hover:bg-amber-600 disabled:bg-gray-700 disabled:text-gray-500"
          >
            Next <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DigitalAssetsBasics;