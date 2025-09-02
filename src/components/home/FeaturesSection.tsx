import React, { useState, useEffect } from 'react';
import { Shield, DollarSign, BarChart3, CheckCircle, TrendingUp } from 'lucide-react';
import electricNrgIcon from '../../assets/electric-nrg.png';
import psyNrgIcon from '../../assets/psy-nrg.png';
import grassNrgIcon from '../../assets/grass-nrg.png';

const FeaturesSection: React.FC = () => {
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationStep(prev => (prev + 1) % 4);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Pokemon TCG specific data
  const pokemonCards = [
    { name: 'Charizard Base Set', grade: 10, value: 3200, set: 'Base Set 1st Ed' },
    { name: 'Pikachu Illustrator', grade: 9, value: 2100, set: 'Promo' },
    { name: 'Blastoise Base Set', grade: 9.5, value: 1850, set: 'Base Set' },
    { name: 'Venusaur Base Set', grade: 8.5, value: 720, set: 'Base Set' }
  ];

  const pokemonSets = [
    { name: 'Base Set', volume: 28.4, color: 'from-red-400 to-red-300' },
    { name: 'Neo Genesis', volume: 15.2, color: 'from-blue-400 to-blue-300' },
    { name: 'Jungle', volume: 12.8, color: 'from-green-400 to-green-300' },
    { name: 'Fossil', volume: 9.6, color: 'from-purple-400 to-purple-300' },
    { name: 'Team Rocket', volume: 8.1, color: 'from-gray-400 to-gray-300' }
  ];

  const rarityDistribution = [
    { type: 'Shadowless', percentage: 35, color: 'bg-yellow-400' },
    { type: '1st Edition', percentage: 28, color: 'bg-red-400' },
    { type: 'Unlimited', percentage: 22, color: 'bg-blue-400' },
    { type: 'Promo', percentage: 15, color: 'bg-purple-400' }
  ];

  const features = [
    {
      icon: Shield,
      title: "Advanced AI Grading",
      description: "Professional PSA-style grading specifically trained on Pokemon TCG cards, analyzing centering, corners, edges, and surface condition with 99.2% accuracy.",
      badge: "Trained on 800K+ Pokemon cards",
      color: "from-blue-500 to-cyan-500",
      badgeColor: "text-yellow-600 dark:text-yellow-400",
      visualization: () => {
        const currentCard = pokemonCards[animationStep % pokemonCards.length];
        return (
          <div className="relative h-48 bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 dark:from-blue-900/20 dark:via-cyan-900/20 dark:to-blue-900/30 rounded-xl p-4 mb-6 overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-2 left-2 w-16 h-16 border-2 border-blue-300 rounded-lg rotate-12" />
              <div className="absolute bottom-2 right-2 w-12 h-12 border-2 border-cyan-300 rounded-lg -rotate-12" />
            </div>
            
            {/* Card mockup */}
            <div className="relative bg-white dark:bg-slate-800 rounded-lg p-3 mb-4 shadow-lg transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-bold text-slate-800 dark:text-white">{currentCard.name}</div>
                <div className="px-2 py-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs rounded-full font-bold">
                  PSA {currentCard.grade}
                </div>
              </div>
              
              {/* Scanning animation */}
              <div className="relative h-16 bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 rounded-md mb-2 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-200/50 to-transparent w-full animate-pulse" />
                <div className="absolute top-2 left-2 text-xs text-slate-500 dark:text-slate-400">Analyzing...</div>
                <div className={`absolute bottom-1 right-1 w-2 h-2 rounded-full transition-colors duration-1000 ${animationStep % 2 === 0 ? 'bg-green-400' : 'bg-blue-400'}`} />
              </div>
              
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600 dark:text-slate-400">{currentCard.set}</span>
                <span className="font-bold text-emerald-600">${currentCard.value.toLocaleString()}</span>
              </div>
            </div>
            
            {/* Grading breakdown with radial progress */}
            <div className="grid grid-cols-4 gap-1">
              {['Centering', 'Corners', 'Edges', 'Surface'].map((aspect, idx) => {
                const scores = [9.5, 8.5, 9.0, 8.0];
                const score = scores[idx];
                const isActive = animationStep === idx;
                const circumference = 2 * Math.PI * 12;
                const strokeDasharray = circumference;
                const strokeDashoffset = circumference - (score / 10) * circumference;
                
                return (
                  <div key={aspect} className={`relative bg-white/80 backdrop-blur-sm rounded-lg p-2 text-center transition-all duration-500 ${isActive ? 'ring-2 ring-blue-400 shadow-lg scale-110' : ''}`}>
                    <div className="relative w-8 h-8 mx-auto mb-1">
                      <svg className="w-8 h-8 transform -rotate-90" viewBox="0 0 32 32">
                        <circle cx="16" cy="16" r="12" stroke="#e2e8f0" strokeWidth="3" fill="none" />
                        <circle 
                          cx="16" cy="16" r="12" 
                          stroke={score >= 9 ? "#22c55e" : score >= 8 ? "#eab308" : "#ef4444"}
                          strokeWidth="3" 
                          fill="none"
                          strokeDasharray={strokeDasharray}
                          strokeDashoffset={strokeDashoffset}
                          className="transition-all duration-1000 ease-out"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs font-bold text-slate-700">{score}</span>
                      </div>
                    </div>
                    <div className="text-xs font-medium text-slate-600">{aspect.slice(0, 4)}</div>
                  </div>
                );
              })}
            </div>
            
            {/* Confidence meter */}
            <div className="mt-3 bg-white/60 backdrop-blur-sm rounded-lg p-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-slate-700">AI Confidence</span>
                <span className="text-xs font-bold text-blue-600">99.2%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-1.5">
                <div className="h-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-2000" style={{ width: '99.2%' }} />
              </div>
            </div>
          </div>
        );
      }
    },
        {
      icon: BarChart3,
      title: "Data & Analytics",
      description: "Comprehensive market insights across all Pokemon TCG sets with rarity analysis, grade distribution, and investment tracking for collectors.",
      badge: "Complete Pokemon TCG database",
      color: "from-purple-500 to-violet-500",
      badgeColor: "text-purple-600 dark:text-purple-400",
      visualization: () => {
        const totalVolume = pokemonSets.reduce((sum, set) => sum + set.volume, 0);
        
        return (
          <div className="relative h-48 bg-gradient-to-br from-purple-50 via-violet-50 to-indigo-100 dark:from-purple-900/20 dark:via-violet-900/20 dark:to-indigo-900/30 rounded-xl p-4 mb-6 overflow-hidden">
            {/* Background decorations */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-2 left-2 text-5xl">📊</div>
              <div className="absolute bottom-2 right-2 text-3xl">🎯</div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-7xl">⚡</div>
            </div>
            
            {/* Header with animated counter */}
            <div className="relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-lg p-3 mb-4 shadow-md">
              <div className="flex items-center justify-between">
                <div className="text-sm font-bold text-slate-800 dark:text-white">Pokemon Set Analytics</div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-xs text-slate-600 dark:text-slate-400">Live Data</span>
                </div>
              </div>
              
              <div className="flex items-baseline space-x-2 mt-1">
                <div className="text-xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
                  {totalVolume.toFixed(1)}K
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400">Total Cards Tracked</div>
              </div>
            </div>
            
            {/* Enhanced set distribution */}
            <div className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-lg p-3 mb-3">
              <div className="text-xs font-medium text-slate-700 dark:text-slate-300 mb-2">Top Sets Distribution</div>
              <div className="space-y-2">
                {pokemonSets.slice(0, 3).map((set, idx) => {
                  const percentage = (set.volume / totalVolume) * 100;
                  const isActive = animationStep === idx;
                  
                  return (
                    <div key={set.name} className={`transition-all duration-300 ${isActive ? 'scale-105' : ''}`}>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center space-x-2">
                          <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${set.color} ${isActive ? 'shadow-lg scale-125' : ''} transition-all duration-300`} />
                          <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{set.name}</span>
                        </div>
                        <span className="text-xs font-bold text-slate-800 dark:text-white">{percentage.toFixed(1)}%</span>
                      </div>
                      <div className="relative w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 overflow-hidden">
                        <div 
                          className={`h-1.5 rounded-full transition-all duration-1000 ease-out bg-gradient-to-r ${set.color}`}
                          style={{ 
                            width: `${percentage}%`,
                            animationDelay: `${idx * 300}ms`
                          }}
                        />
                        {isActive && (
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Rarity breakdown with pie chart effect */}
            <div className="relative bg-white/70 backdrop-blur-sm rounded-lg p-2">
              <div className="text-xs font-medium text-slate-700 mb-2 text-center">Rarity Distribution</div>
              <div className="grid grid-cols-4 gap-1">
                {rarityDistribution.map((rarity, idx) => {
                  const isActive = animationStep === idx;
                  return (
                    <div key={rarity.type} className={`bg-white/90 rounded-lg p-2 text-center transition-all duration-300 ${isActive ? 'ring-2 ring-purple-400 shadow-lg scale-110' : ''}`}>
                      <div className="relative w-6 h-6 mx-auto mb-1">
                        <svg className="w-6 h-6 transform -rotate-90" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="8" stroke="#e2e8f0" strokeWidth="2" fill="none" />
                          <circle 
                            cx="12" cy="12" r="8"
                            stroke={rarity.color.includes('yellow') ? '#facc15' : 
                                   rarity.color.includes('red') ? '#f87171' :
                                   rarity.color.includes('blue') ? '#60a5fa' : '#a855f7'}
                            strokeWidth="2"
                            fill="none"
                            strokeDasharray={`${(rarity.percentage / 100) * 50.26} 50.26`}
                            className="transition-all duration-1000"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-xs font-bold text-slate-700">{rarity.percentage}</span>
                        </div>
                      </div>
                      <div className="text-xs font-medium text-slate-600">{rarity.type.slice(0, 4)}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      }
    },
    {
      icon: DollarSign,
      title: "Market Pricing",
      description: "Real-time pricing data from major Pokemon card marketplaces including eBay, PWCC, and Heritage Auctions with set-specific analytics.",
      badge: "Live Pokemon market data",
      color: "from-emerald-500 to-teal-500",
      badgeColor: "text-emerald-600 dark:text-emerald-400",
      visualization: () => {
        const priceData = [2800, 3200, 2900, 3400, 3600, 3800, 3847];
        const maxPrice = Math.max(...priceData);
        const minPrice = Math.min(...priceData);
        
        return (
          <div className="relative h-48 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-100 rounded-xl p-4 mb-6 overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-4 right-4 text-6xl">💰</div>
              <div className="absolute bottom-2 left-2 text-4xl">📈</div>
            </div>
            
            {/* Price header */}
            <div className="relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-lg p-3 mb-4 shadow-md">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-bold dark:text-slate-800">Charizard Base Set PSA 10</div>
                <div className="flex items-center bg-gradient-to-r from-emerald-500 to-green-500 text-white px-2 py-1 rounded-full">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  <span className="text-xs font-bold">+24.3%</span>
                </div>
              </div>
              
              <div className="flex items-baseline space-x-2">
                <div className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                  $3,847
                </div>
                <div className="text-sm text-slate-500 line-through">$3,100</div>
                <div className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full font-medium">
                  Live
                </div>
              </div>
            </div>
            
            {/* Market stats cards */}
            <div className="grid grid-cols-3 gap-2 mb-3">
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-2 text-center">
                <div className="text-lg font-bold text-emerald-600">147</div>
                <div className="text-xs text-slate-600">30d Sales</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-2 text-center">
                <div className="text-lg font-bold text-blue-600">$3.2K</div>
                <div className="text-xs text-slate-600">Avg Sale</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-2 text-center">
                <div className="text-lg font-bold text-purple-600">92%</div>
                <div className="text-xs text-slate-600">Accuracy</div>
              </div>
            </div>
            
            {/* Enhanced price chart */}
            <div className="relative bg-white/60 backdrop-blur-sm rounded-lg p-3">
              <div className="text-xs font-medium text-slate-700 mb-2">30-Day Price Trend</div>
              <div className="relative h-12 flex items-end justify-between">
                {priceData.map((price, idx) => {
                  const height = ((price - minPrice) / (maxPrice - minPrice)) * 100;
                  const isHighest = price === maxPrice;
                  return (
                    <div key={idx} className="flex flex-col items-center space-y-1">
                      <div 
                        className={`w-4 rounded-t-sm transition-all duration-1000 ease-out ${
                          isHighest 
                            ? 'bg-gradient-to-t from-emerald-500 to-green-400 shadow-lg' 
                            : 'bg-gradient-to-t from-emerald-400 to-emerald-300'
                        }`}
                        style={{ 
                          height: `${Math.max(height, 10)}%`,
                          animationDelay: `${idx * 200}ms`
                        }}
                      />
                      {isHighest && (
                        <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                          ${(price/1000).toFixed(1)}K
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              
              <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-1">
                <span>30d</span>
                <span>Today</span>
              </div>
            </div>
          </div>
        );
      }
    },
  ];

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Features
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300">
            The world's most advanced Pokemon card grading system, trained on 800K+ cards with real-time TCG market data
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
          <div className="group rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg text-center">
            <div className="flex justify-center items-center mb-3 h-20">
              <img 
                src={electricNrgIcon} 
                alt="Electric Energy" 
                className="w-16 h-16 object-contain"
              />
            </div>
            <div className="text-3xl font-bold text-yellow-500 dark:text-yellow mb-1">
              &lt; 5s
            </div>
            <div className="text-lg font-bold text-yellow-500 dark:text-yellow-500">Lightning Fast Grading</div>
          </div>
          
          <div className="group rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg text-center">
            <div className="flex justify-center items-center mb-3 h-20">
              <img 
                src={psyNrgIcon} 
                alt="Psychic Energy" 
                className="w-16 h-16 object-contain"
              />
            </div>
            <div className="text-3xl font-bold text-purple-500 dark:text-purple mb-1">
              95%
            </div>
            <div className="text-lg font-bold text-purple-600 dark:text-purple-600">Precision Accuracy</div>
          </div>
          
          <div className="group rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg text-center">
            <div className="flex justify-center items-center mb-3 h-20">
              <img 
                src={grassNrgIcon} 
                alt="Fire Energy" 
                className="w-16 h-16 object-contain"
              />
            </div>
            <div className="text-3xl font-bold text-green-500 dark:text-green-500 mb-1">
              #1
            </div>
            <div className="text-lg font-bold text-green-600 dark:text-green-400">Best Trade Prices</div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm hover:shadow-lg hover:shadow-slate-900/5 dark:hover:shadow-slate-100/5 transition-all duration-300 hover:-translate-y-1 overflow-hidden border-2 border-slate-200 dark:border-slate-700"
            >
              {/* Visualization */}
              <feature.visualization />
              
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{feature.title}</h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                {feature.description}
              </p>
              <div className={`flex items-center gap-2 text-sm ${feature.badgeColor} font-medium`}>
                <CheckCircle className="w-4 h-4" />
                {feature.badge}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;