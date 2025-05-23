import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ChevronRight, ChevronLeft, Code, AlertTriangle, TrendingUp, Target, Globe, ArrowLeft } from 'lucide-react';

interface InvestmentStrategiesProps {
  onBack: () => void;
}

const InvestmentStrategies: React.FC<InvestmentStrategiesProps> = ({ onBack }) => {
  const [currentLesson, setCurrentLesson] = useState(0);
  
  const lessons = [
    {
      title: "Token Standards (ERC-20, ERC-721, etc.)",
      icon: Code,
      content: "Token standards are technical specifications that define how tokens function on a particular blockchain. These standards ensure interoperability and compatibility, making it easier for developers to create and integrate tokens into various applications.",
      keyPoints: [
        "ERC-20: Standard for fungible tokens on Ethereum (e.g., stablecoins, utility tokens)",
        "ERC-721: Standard for non-fungible tokens (NFTs) on Ethereum",
        "ERC-1155: A multi-token standard supporting both fungible and non-fungible tokens",
        "Enable consistency and ease of development within blockchain ecosystems"
      ]
    },
    {
      title: "Risks Associated with Digital Assets",
      icon: AlertTriangle,
      content: "Investing in digital assets carries significant risks, including market volatility, regulatory uncertainty, technological vulnerabilities (e.g., smart contract bugs, hacks), and liquidity issues. Understanding and managing these risks is paramount.",
      keyPoints: [
        "High Volatility: Prices can fluctuate wildly and rapidly",
        "Regulatory Risk: Laws and regulations are still developing",
        "Security Risk: Vulnerability to hacks, scams, and loss of private keys",
        "Liquidity Risk: Some assets may be difficult to buy or sell quickly without affecting price"
      ]
    },
    {
      title: "Long-Term vs. Short-Term Investment Strategies",
      icon: TrendingUp,
      content: "Digital asset investment strategies range from long-term holding (HODLing) based on a project's fundamentals, to short-term trading based on technical analysis and market sentiment. Each approach has different risk profiles and requires distinct considerations.",
      keyPoints: [
        "HODL (Hold On for Dear Life): Long-term strategy, less active management, focus on fundamental value",
        "Day Trading/Swing Trading: Short-term strategies, rely on technical analysis and market timing",
        "Dollar-Cost Averaging (DCA): Investing a fixed amount regularly, reducing impact of volatility",
        "Consider your risk tolerance and financial goals"
      ]
    },
    {
      title: "The Future of Digital Assets",
      icon: Globe,
      content: "The digital asset space is rapidly evolving, with ongoing innovation in areas like Web3 (decentralized internet), metaverse applications, institutional adoption, and cross-chain interoperability. Expect continued technological advancements and broader integration into the global economy.",
      keyPoints: [
        "Web3: Decentralized internet, user-owned data and platforms",
        "Metaverse: Virtual worlds powered by blockchain and NFTs",
        "Institutional Adoption: Growing interest from traditional financial institutions",
        "Interoperability: Connecting different blockchains for seamless asset transfer",
        "Continuous innovation and evolving use cases"
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
          <h1 className="text-4xl font-bold text-white mb-2">Investment Strategies & Future</h1>
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

export default InvestmentStrategies;