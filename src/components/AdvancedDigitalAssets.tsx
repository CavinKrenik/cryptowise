import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ChevronRight, ChevronLeft, Pickaxe, Users, AlertTriangle, Search, FileText, Cog, Layers, Scale, ArrowLeft } from 'lucide-react';

interface AdvancedDigitalAssetsProps {
  onBack: () => void;
}

const AdvancedDigitalAssets: React.FC<AdvancedDigitalAssetsProps> = ({ onBack }) => {
  const [currentLesson, setCurrentLesson] = useState(0);
  
  const lessons = [
    {
      title: "Introduction to Crypto Mining and Staking",
      icon: Pickaxe,
      content: "Mining is the process of validating transactions and adding new blocks to a blockchain, typically for Proof of Work (PoW) cryptocurrencies like Bitcoin. Staking involves locking up cryptocurrencies to support a network and earn rewards, common in Proof of Stake (PoS) systems.",
      keyPoints: [
        "Mining: Solves complex puzzles to validate transactions (PoW)",
        "Staking: Locks crypto to secure the network and earn rewards (PoS)",
        "Both contribute to network security and decentralization",
        "Different energy consumption and hardware requirements"
      ]
    },
    {
      title: "Common Crypto Scams and How to Avoid Them",
      icon: AlertTriangle,
      content: "The crypto space can attract bad actors. Common scams include phishing attacks, fake giveaways, Ponzi schemes, and imposter scams. Always verify sources and be skeptical of offers that seem too good to be true.",
      keyPoints: [
        "Phishing: Fake websites or emails to steal your login info/keys",
        "Giveaways/Airdrops: Often require sending crypto first; always a scam",
        "Impersonation: Scammers pretending to be known figures or projects",
        "Protect your private keys and seed phrase at all costs"
      ]
    },
    {
      title: "The Importance of Due Diligence (DYOR)",
      icon: Search,
      content: "'Do Your Own Research' (DYOR) is crucial in crypto. Before investing, thoroughly research a project's whitepaper, team, technology, community, and market trends. Don't rely solely on others' advice.",
      keyPoints: [
        "Read the whitepaper: Understand the project's goals and technology",
        "Research the team: Check their experience and reputation",
        "Analyze tokenomics: How is the crypto distributed and used?",
        "Assess community and development activity"
      ]
    },
    {
      title: "Introduction to Smart Contracts",
      icon: FileText,
      content: "Smart contracts are self-executing contracts with the terms of the agreement directly written into code. They run on a blockchain, automating processes and ensuring transparency without the need for intermediaries.",
      keyPoints: [
        "Self-executing code on a blockchain",
        "Automate agreements and transactions",
        "Immutable and transparent once deployed",
        "Enable DeFi, NFTs, and decentralized applications (DApps)"
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
          <h1 className="text-4xl font-bold text-white mb-2">Advanced Digital Assets</h1>
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

export default AdvancedDigitalAssets;