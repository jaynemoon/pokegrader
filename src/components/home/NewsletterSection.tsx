import React, { useState } from 'react';
import { Mail, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';

const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubscribed(true);
    setIsLoading(false);
    setEmail('');
  };


  if (isSubscribed) {
    return (
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-blue-900/20 dark:via-slate-900 dark:to-cyan-900/20 transition-colors">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-12 shadow-lg border border-blue-100 dark:border-blue-800 transition-colors">
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Welcome to the PokéGrader Community! 🎉
            </h3>
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              You'll receive your first market insights newsletter within 24 hours. 
              Get ready for exclusive trends, expert analysis, and insider tips!
            </p>
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 dark:from-blue-400 dark:to-cyan-400 text-white rounded-xl font-medium">
              <Mail className="w-5 h-5 mr-2" />
              Subscription Confirmed
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-blue-900/20 dark:via-slate-900 dark:to-cyan-900/20 relative overflow-hidden transition-colors">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-br from-blue-200/30 to-cyan-200/30 dark:from-blue-800/20 dark:to-cyan-800/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-br from-purple-200/20 to-blue-200/20 dark:from-purple-800/10 dark:to-blue-800/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div>
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl border border-slate-200/50 dark:border-slate-700 transition-colors">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  Join 12,500+ Smart Collectors
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Free weekly market insights from expert traders
                </p>
              </div>

              <form onSubmit={handleSubscribe} className="space-y-4">
                <div>
                  <label htmlFor="newsletter-email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Email Address
                  </label>
                  <Input
                    id="newsletter-email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full"
                    required
                  />
                </div>
                
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-500 dark:to-cyan-500 hover:from-blue-700 hover:to-cyan-700 dark:hover:from-blue-600 dark:hover:to-cyan-600 text-white font-medium py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Subscribing...
                    </>
                  ) : (
                    <>
                      Get Market Insights
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-700">
                <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                  <span>✨ No spam, unsubscribe anytime</span>
                  <span>📊 Expert analysis weekly</span>
                </div>
              </div>

              {/* Social proof */}
              <div className="mt-6 flex items-center justify-center">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 dark:from-blue-500 dark:to-cyan-500 border-2 border-white dark:border-slate-800 flex items-center justify-center text-white text-xs font-medium"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <span className="ml-3 text-sm text-slate-600 dark:text-slate-400">
                  +12,495 others already joined
                </span>
              </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;