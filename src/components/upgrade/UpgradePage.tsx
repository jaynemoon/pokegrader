import React, { useState } from 'react';
import { ArrowLeft, Crown, Star, Zap, Shield, Download, Headphones } from 'lucide-react';
import Navigation from '../ui/Navigation';
import DottedBackground from '../ui/DottedBackground';
import Button from '../ui/Button';
import Card from '../ui/Card';
import type { ViewType, User, SavedCard } from '../../types';

interface UpgradePageProps {
  user: User | null;
  savedCards: SavedCard[];
  setCurrentView: (view: ViewType) => void;
  handleSignOut: () => void;
  onUpgrade: () => void;
}

const UpgradePage: React.FC<UpgradePageProps> = ({
  user,
  savedCards,
  setCurrentView,
  handleSignOut,
  onUpgrade
}) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleUpgradeClick = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    onUpgrade();
    setIsProcessing(false);
    setCurrentView('home');
  };

  const freeFeatures = [
    { icon: Star, text: '5 free card grades per month' },
    { icon: Shield, text: 'Basic market pricing' },
    { icon: Download, text: 'Card collection storage' },
    { icon: Headphones, text: 'Standard support' }
  ];

  const proFeatures = [
    { icon: Zap, text: 'Unlimited card grades', highlight: true },
    { icon: Star, text: 'Advanced market analytics', highlight: true },
    { icon: Crown, text: 'Priority AI processing', highlight: true },
    { icon: Download, text: 'Export collection reports', highlight: true },
    { icon: Shield, text: 'Portfolio tracking & insights', highlight: true },
    { icon: Headphones, text: 'Premium support', highlight: true }
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navigation
          user={user}
          savedCards={savedCards}
          setCurrentView={setCurrentView}
          handleSignOut={handleSignOut}
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
          <Card>
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Sign In Required
              </h2>
              <p className="text-slate-600 mb-6">
                Please sign in to upgrade your account
              </p>
              <Button onClick={() => setCurrentView('auth')}>
                Sign In
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 relative">
      <DottedBackground opacity={0.02} />
      
      <Navigation
        user={user}
        savedCards={savedCards}
        setCurrentView={setCurrentView}
        handleSignOut={handleSignOut}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
        {/* Back button */}
        <button
          onClick={() => setCurrentView('home')}
          className="flex items-center text-slate-600 hover:text-slate-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </button>

        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mb-6">
            <Crown className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Upgrade to Pro
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Unlock unlimited card grading and advanced features to maximize your Pokemon card collection's potential
          </p>
        </div>

        {/* Current Status */}
        {!user.isPro && (
          <Card className="mb-8 border-yellow-200 bg-yellow-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                  <Star className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Free Plan</h3>
                  <p className="text-slate-600">
                    {user.freeAnalysesRemaining} free analyses remaining this month
                  </p>
                </div>
              </div>
              <Button onClick={handleUpgradeClick} loading={isProcessing}>
                Upgrade Now
              </Button>
            </div>
          </Card>
        )}

        {/* Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Free Plan */}
          <Card className="relative">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Free</h3>
              <div className="text-4xl font-bold text-slate-900 mb-2">$0</div>
              <p className="text-slate-600">Perfect for trying out PokeGrade AI</p>
            </div>
            
            <ul className="space-y-4">
              {freeFeatures.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <feature.icon className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-slate-700">{feature.text}</span>
                </li>
              ))}
            </ul>

            {!user.isPro && (
              <div className="mt-6 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800 font-medium">Current Plan</p>
              </div>
            )}
          </Card>

          {/* Pro Plan */}
          <Card className="relative border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                Most Popular
              </span>
            </div>
            
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Pro Collection</h3>
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                $20
              </div>
              <p className="text-slate-600">per month</p>
            </div>
            
            <ul className="space-y-4 mb-8">
              {proFeatures.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <feature.icon className="w-5 h-5 text-blue-500 flex-shrink-0" />
                  <span className={`text-slate-700 ${feature.highlight ? 'font-medium' : ''}`}>
                    {feature.text}
                  </span>
                </li>
              ))}
            </ul>

            {user.isPro ? (
              <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm text-green-800 font-medium">✓ Current Plan</p>
                {user.subscriptionExpiresAt && (
                  <p className="text-xs text-green-600 mt-1">
                    Expires: {new Date(user.subscriptionExpiresAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            ) : (
              <Button 
                onClick={handleUpgradeClick}
                loading={isProcessing}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                size="lg"
              >
                <Crown className="w-5 h-5 mr-2" />
                Upgrade to Pro - $20/month
              </Button>
            )}
          </Card>
        </div>

        {/* Benefits Section */}
        <Card>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Why Choose Pro?
            </h2>
            <p className="text-slate-600">
              Take your Pokemon card collecting to the next level
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Unlimited Grading</h3>
              <p className="text-sm text-slate-600">
                Grade as many cards as you want without monthly limits
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Advanced Analytics</h3>
              <p className="text-sm text-slate-600">
                Get detailed market insights and portfolio tracking
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Crown className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Priority Support</h3>
              <p className="text-sm text-slate-600">
                Get faster processing and premium customer support
              </p>
            </div>
          </div>
        </Card>

        {/* Security Note */}
        <div className="text-center mt-8">
          <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
            <Shield className="w-4 h-4" />
            <span>Secure payment processing • Cancel anytime • 30-day money-back guarantee</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpgradePage;