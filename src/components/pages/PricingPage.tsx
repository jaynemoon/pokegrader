import React from 'react';
import { ArrowLeft, Check, Zap, Crown, Sparkles } from 'lucide-react';
import Navigation from '../ui/Navigation';
import PatternBackground from '../ui/PatternBackgrounds';
import type { ViewType, User, SavedCard } from '../../types';

interface PricingPageProps {
  user: User | null;
  savedCards: SavedCard[];
  setCurrentView: (view: ViewType) => void;
  handleSignOut: () => void;
  onUpgrade: () => void;
}

const PricingPage: React.FC<PricingPageProps> = ({
  user,
  savedCards,
  setCurrentView,
  handleSignOut,
  onUpgrade
}) => {
  const starterFeatures = [
    '8 credit grades per month',
    'Basic market pricing',
    'Pay-as-you-go booster credits',
    'Customer support',
    'New members only'
  ];

  const proFeatures = [
    'Unlimited card analyses',
    'Advanced grading insights',
    'Detailed condition reports',
    'Historical price tracking',
    'Unlimited card storage',
    'Collection analytics',
    'Price alerts & notifications',
    'Export capabilities',
    'Priority support',
    'Early access to new features'
  ];


  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 relative">
      <PatternBackground pattern="lines" opacity={0.1} />
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
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Start for free and upgrade when you need more power. No hidden fees, no long-term contracts.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {/* Starter Plan */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mr-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Starter</h3>
                <p className="text-slate-600 dark:text-slate-400">Perfect for getting started</p>
              </div>
            </div>
            
            <div className="mb-6">
              <div className="flex items-baseline">
                <span className="text-4xl font-bold text-slate-900 dark:text-white">$3</span>
                <span className="text-slate-600 dark:text-slate-400 ml-2">/month</span>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">+ 2 free credits (10 total)</p>
            </div>

            <ul className="space-y-4 mb-8">
              {starterFeatures.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => setCurrentView('auth')}
              className="w-full bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-600 hover:bg-slate-200 dark:hover:bg-slate-600 px-6 py-3 rounded-xl font-semibold transition-colors"
            >
              Get Started
            </button>
          </div>

          {/* Pro Plan */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-3xl p-8 border-2 border-purple-200 dark:border-purple-700 relative hover:shadow-xl transition-all duration-300">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center">
                <Crown className="w-4 h-4 mr-1" />
                Most Popular
              </div>
            </div>

            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-4">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Pro Collection</h3>
                <p className="text-slate-600 dark:text-slate-400">For serious collectors</p>
              </div>
            </div>
            
            <div className="mb-6">
              <div className="flex items-baseline">
                <span className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">$20</span>
                <span className="text-slate-600 dark:text-slate-400 ml-2">/month</span>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Cancel anytime</p>
            </div>

            <ul className="space-y-4 mb-8">
              {proFeatures.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <Check className="w-5 h-5 text-purple-500 mr-3 flex-shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => setCurrentView('auth')}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Upgrade to Pro
            </button>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-8">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
                How accurate is the AI grading?
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Our AI achieves 95% accuracy compared to PSA grades, trained on thousands of professionally graded cards. We continuously improve our models with new data.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
                Can I cancel my Pro subscription anytime?
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Yes! You can cancel your Pro subscription at any time. You'll continue to have access to Pro features until the end of your billing period.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
                What happens to my saved cards if I downgrade?
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Your cards remain safe! Free users can access their 10 most recent cards. Upgrade anytime to access your full collection history.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
                Do you store my card images?
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                No, we prioritize your privacy. Card images are processed securely and deleted immediately after analysis. Only the grading results are saved to your collection.
              </p>
            </div>
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
              onClick={() => setCurrentView('features')}
              className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 px-8 py-3 rounded-xl font-semibold transition-colors"
            >
              View Features
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;