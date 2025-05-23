import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BookOpen, TrendingUp, BookMarked, Search, ExternalLink, BarChart3, Shield, Target } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface NavigationProps {
  onSectionSelect: (section: string) => void;
  activeSection: string;
}

const Navigation: React.FC<NavigationProps> = ({ onSectionSelect, activeSection }) => {
  const [poolUrl, setPoolUrl] = useState('');
  const navigate = useNavigate();

  const handlePoolUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/pool-analyzer');
  };

  const sections = [
    {
      id: 'basics',
      title: 'Digital Assets Basics',
      description: 'Learn the fundamentals of cryptocurrencies, blockchain, DeFi, and NFTs',
      icon: BookOpen,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'advanced',
      title: 'Advanced Concepts',
      description: 'Mining, staking, smart contracts, scalability, and security best practices',
      icon: Shield,
      color: 'from-purple-500 to-indigo-500'
    },
    {
      id: 'strategies',
      title: 'Investment Strategies',
      description: 'Token standards, risk management, trading strategies, and future trends',
      icon: Target,
      color: 'from-pink-500 to-rose-500'
    },
    {
      id: 'charts',
      title: 'Chart Analysis',
      description: 'Master technical analysis and chart reading techniques',
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'technical',
      title: 'Technical Analysis Learning',
      description: 'Comprehensive guide to crypto chart tools and trading strategies',
      icon: BarChart3,
      color: 'from-indigo-500 to-purple-500',
      onClick: () => navigate('/technical-analysis')
    },
    {
      id: 'pool-analyzer',
      title: 'Pool Analyzer',
      description: 'Analyze GeckoTerminal pools and contract addresses',
      icon: Search,
      color: 'from-orange-500 to-red-500',
      onClick: () => navigate('/pool-analyzer')
    },
    {
      id: 'pairs',
      title: 'Trading Pairs',
      description: 'Explore different cryptocurrency trading pairs and their data',
      icon: Search,
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'glossary',
      title: 'Glossary',
      description: 'Reference guide for cryptocurrency and trading terminology',
      icon: BookMarked,
      color: 'from-amber-500 to-yellow-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
            Crypto Learning Hub
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Complete Digital Assets 101 course - 20 comprehensive lessons
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section) => {
            const IconComponent = section.icon;
            return (
              <Card 
                key={section.id}
                className={`group cursor-pointer transition-all duration-300 hover:scale-105 bg-gradient-to-br ${section.color} p-1 rounded-lg ${
                  activeSection === section.id ? 'ring-2 ring-amber-400' : ''
                }`}
                onClick={section.onClick || (() => onSectionSelect(section.id))}
              >
                <div className="bg-gray-900 rounded-md p-6 h-full">
                  <div className="flex items-center mb-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${section.color} mr-4`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white group-hover:text-amber-400 transition-colors">
                      {section.title}
                    </h3>
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    {section.description}
                  </p>
                  <div className="mt-4 flex items-center text-amber-400 group-hover:text-amber-300 transition-colors">
                    <span className="text-sm font-medium">Get Started</span>
                    <svg 
                      className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Navigation;