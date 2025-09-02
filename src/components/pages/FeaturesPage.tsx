import React from 'react';
import { ArrowLeft, Zap, Clock, Target, DollarSign, Shield, BarChart3, TrendingUp, Eye, Cpu, Database, CheckCircle } from 'lucide-react';
import Navigation from '../ui/Navigation';
import PatternBackground from '../ui/PatternBackgrounds';
import type { ViewType, User, SavedCard } from '../../types';

interface FeaturesPageProps {
  user: User | null;
  savedCards: SavedCard[];
  setCurrentView: (view: ViewType) => void;
  handleSignOut: () => void;
}

const FeaturesPage: React.FC<FeaturesPageProps> = ({
  user,
  savedCards,
  setCurrentView,
  handleSignOut
}) => {
  const mainFeatures = [
    {
      icon: Zap,
      title: 'Lightning Fast AI Analysis',
      description: 'Get professional-grade card assessments in under 5 seconds using advanced computer vision technology.',
      details: ['Real-time image processing', 'Multi-angle analysis', 'Instant grade estimation', 'No waiting periods']
    },
    {
      icon: Eye,
      title: 'Advanced Condition Assessment',
      description: 'Our AI examines every aspect of your card with microscopic precision to provide accurate grading.',
      details: ['Centering analysis', 'Corner condition evaluation', 'Edge wear detection', 'Surface scratch identification']
    },
    {
      icon: BarChart3,
      title: 'Market Value Tracking',
      description: 'Real-time pricing data and market trends to help you make informed collection decisions.',
      details: ['Live market prices', 'Historical trend analysis', 'Investment insights', 'Portfolio tracking']
    },
    {
      icon: Database,
      title: 'Collection Management',
      description: 'Organize and track your entire Pokemon card collection with powerful management tools.',
      details: ['Digital card catalog', 'Grade tracking', 'Value monitoring', 'Export capabilities']
    },
    {
      icon: Shield,
      title: 'Privacy & Security',
      description: 'Your card images are processed securely and deleted immediately after analysis.',
      details: ['Encrypted processing', 'No image storage', 'GDPR compliant', 'Secure authentication']
    },
    {
      icon: Cpu,
      title: 'Professional Accuracy',
      description: '95% accuracy rate compared to professional PSA grades with continuous AI improvements.',
      details: ['Trained on thousands of graded cards', 'Regular model updates', 'Industry-standard metrics', 'Confidence scoring']
    }
  ];

  const stats = [
    { icon: Clock, value: '< 5s', label: 'Lightning Fast Grading' },
    { icon: Target, value: '95%', label: 'Precision Accuracy' },
    { icon: DollarSign, value: 'FREE', label: 'No Grading Fees' },
    { icon: TrendingUp, value: '789K+', label: 'Cards Analyzed' }
  ];

  const comparisonFeatures = [
    { feature: 'Grading Speed', pokegrader: '< 5 seconds', psa: '3-6 months', beckett: '2-4 months' },
    { feature: 'Cost per Card', pokegrader: 'Free/Pro', psa: '$20-100+', beckett: '$20-150+' },
    { feature: 'Accuracy Rate', pokegrader: '95%', psa: '100%', beckett: '100%' },
    { feature: 'Collection Tracking', pokegrader: '✓', psa: '✗', beckett: '✗' },
    { feature: 'Market Analysis', pokegrader: '✓', psa: '✗', beckett: '✗' },
    { feature: 'Instant Results', pokegrader: '✓', psa: '✗', beckett: '✗' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 relative">
      <PatternBackground pattern="dots" opacity={0.1} />
      <Navigation 
        user={user}
        savedCards={savedCards}
        setCurrentView={setCurrentView}
        handleSignOut={handleSignOut}
      />
      
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative z-10">
        {/* Back button */}
        <button
          onClick={() => setCurrentView('home')}
          className="flex items-center text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </button>

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 dark:from-blue-400 dark:via-purple-400 dark:to-cyan-400 bg-clip-text text-transparent mb-6">
            Powerful Features
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Discover why thousands of Pokemon collectors trust PokéGrader AI for their card analysis and collection management needs
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white dark:bg-slate-800 rounded-xl p-6 text-center border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-200">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Main Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {mainFeatures.map((feature, index) => (
            <div key={index} className="bg-white dark:bg-slate-800 rounded-xl p-8 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mr-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                  {feature.title}
                </h3>
              </div>
              <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                {feature.description}
              </p>
              <ul className="space-y-2">
                {feature.details.map((detail, idx) => (
                  <li key={idx} className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-8 border border-slate-200 dark:border-slate-700 mb-16">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">
            How We Compare
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th className="text-left py-4 text-slate-900 dark:text-white font-semibold">Feature</th>
                  <th className="text-center py-4 text-blue-600 dark:text-blue-400 font-semibold">PokéGrader AI</th>
                  <th className="text-center py-4 text-slate-600 dark:text-slate-400 font-semibold">PSA</th>
                  <th className="text-center py-4 text-slate-600 dark:text-slate-400 font-semibold">Beckett</th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((row, index) => (
                  <tr key={index} className="border-b border-slate-100 dark:border-slate-700 last:border-b-0">
                    <td className="py-4 text-slate-900 dark:text-white font-medium">{row.feature}</td>
                    <td className="py-4 text-center">
                      <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold">
                        {row.pokegrader}
                      </span>
                    </td>
                    <td className="py-4 text-center text-slate-600 dark:text-slate-400">{row.psa}</td>
                    <td className="py-4 text-center text-slate-600 dark:text-slate-400">{row.beckett}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-8 text-center border border-blue-200 dark:border-blue-700">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Ready to Start Grading?
          </h3>
          <p className="text-slate-600 dark:text-slate-300 mb-6 max-w-2xl mx-auto">
            Join thousands of collectors who trust PokéGrader AI for fast, accurate card analysis
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setCurrentView('analysis')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Start Free Analysis
            </button>
            <button
              onClick={() => setCurrentView('pricing')}
              className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 px-8 py-3 rounded-xl font-semibold transition-colors"
            >
              View Pricing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;