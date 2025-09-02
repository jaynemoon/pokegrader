import React from 'react';
import { CheckCircle, Shield } from 'lucide-react';
import PatternBackground from '../ui/PatternBackgrounds';

interface PricingSectionProps {
  onUpgradeClick?: () => void;
}

const PricingSection: React.FC<PricingSectionProps> = ({ onUpgradeClick }) => {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 transition-colors relative">
      <PatternBackground pattern="dots" opacity={0.1} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Choose your plan
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300">
             Get 2 free credits when you get a start plan of 8 credits(total 10 for first month), for new members only. You can add credits and pay-as-you-go, or unlock unlimited grading with the pro collection plan
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Plan */}
          <div className="bg-slate-50 dark:bg-slate-800 rounded-3xl p-8 border-2 border-slate-200 dark:border-slate-700 transition-colors">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Starter</h3>
              <div className="text-5xl font-bold text-slate-900 dark:text-white mb-2">$3</div>
              <p className="text-slate-600 dark:text-slate-400">+ 2 free credits(10 credits total) per month</p>
            </div>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-slate-700 dark:text-slate-300">8 credit grades per month</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-slate-700 dark:text-slate-300">Basic market pricing</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-slate-700 dark:text-slate-300">Pay-as-you-go booster credits</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-slate-700 dark:text-slate-300">Customer support</span>
              </li>
            </ul>

            <button className="w-full bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 px-6 py-3 rounded-2xl font-semibold transition-all duration-200">
              Get Started
            </button>
          </div>

          {/* Pro Plan */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-3xl p-8 border-2 border-purple-200 dark:border-purple-700 relative transition-colors">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-500 dark:to-pink-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                Most Popular
              </span>
            </div>
            
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Pro Collection</h3>
              <div className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-2">
                $20
              </div>
              <p className="text-slate-600 dark:text-slate-400">per month</p>
            </div>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-purple-500 flex-shrink-0" />
                <span className="text-slate-700 dark:text-slate-300 font-medium">Unlimited card grades</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-purple-500 flex-shrink-0" />
                <span className="text-slate-700 dark:text-slate-300">Advanced market analytics</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-purple-500 flex-shrink-0" />
                <span className="text-slate-700 dark:text-slate-300">Priority AI processing</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-purple-500 flex-shrink-0" />
                <span className="text-slate-700 dark:text-slate-300">Export collection reports</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-purple-500 flex-shrink-0" />
                <span className="text-slate-700 dark:text-slate-300">Premium support</span>
              </li>
            </ul>

            <button 
              onClick={onUpgradeClick}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-500 dark:to-pink-500 hover:from-purple-700 hover:to-pink-700 dark:hover:from-purple-600 dark:hover:to-pink-600 text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Upgrade to Pro
            </button>
            
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-slate-600 dark:text-slate-400">
              <Shield className="w-4 h-4" />
              Secure payment powered by Stripe
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-slate-600 dark:text-slate-400 text-sm">
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;