import React, { useState } from 'react';
import { Mail, TrendingUp, Users, CheckCircle, ArrowRight } from 'lucide-react';
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

  const stats = [
    { icon: Users, value: '12,500+', label: 'Subscribers' },
    { icon: TrendingUp, value: '94%', label: 'Open Rate' },
    { icon: Mail, value: 'Weekly', label: 'Updates' }
  ];

  const expertInsights = [
    "Market trend analysis from top TCG experts",
    "Price predictions for upcoming sets",
    "Investment opportunities and hot cards",
    "Exclusive grading tips and techniques"
  ];

  if (isSubscribed) {
    return (
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-3xl p-12 shadow-lg border border-blue-100">
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Welcome to the PokéGrader Community! 🎉
            </h3>
            <p className="text-slate-600 mb-6">
              You'll receive your first market insights newsletter within 24 hours. 
              Get ready for exclusive trends, expert analysis, and insider tips!
            </p>
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-medium">
              <Mail className="w-5 h-5 mr-2" />
              Subscription Confirmed
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-cyan-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-br from-blue-200/30 to-cyan-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-br from-purple-200/20 to-blue-200/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <Mail className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                Market Experts Newsletter
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
              Stay Ahead of the{' '}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Market Trends
              </span>
            </h2>

            <p className="text-xl text-slate-600 mb-8">
              Get weekly insights from TCG market experts, price predictions, and exclusive 
              analysis delivered straight to your inbox. Join thousands of collectors making 
              smarter investment decisions.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center mx-auto mb-2">
                    <stat.icon className="w-6 h-6 text-slate-600" />
                  </div>
                  <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                  <div className="text-sm text-slate-600">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* What you'll get */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 mb-8">
              <h3 className="font-semibold text-slate-900 mb-4">What you'll receive:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {expertInsights.map((insight, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700 text-sm">{insight}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right side - Newsletter form */}
          <div className="lg:pl-8">
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200/50">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Join 12,500+ Smart Collectors
                </h3>
                <p className="text-slate-600">
                  Free weekly market insights from expert traders
                </p>
              </div>

              <form onSubmit={handleSubscribe} className="space-y-4">
                <div>
                  <label htmlFor="newsletter-email" className="block text-sm font-medium text-slate-700 mb-2">
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
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-medium py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
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

              <div className="mt-6 pt-6 border-t border-slate-100">
                <div className="flex items-center justify-between text-sm text-slate-500">
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
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 border-2 border-white flex items-center justify-center text-white text-xs font-medium"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <span className="ml-3 text-sm text-slate-600">
                  +12,495 others already joined
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;