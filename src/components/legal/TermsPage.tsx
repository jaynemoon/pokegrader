import React from 'react';
import { ArrowLeft, FileText, AlertCircle, Scale, Users } from 'lucide-react';
import Navigation from '../ui/Navigation';
import PatternBackground from '../ui/PatternBackgrounds';
import type { ViewType, User, SavedCard } from '../../types';

interface TermsPageProps {
  user: User | null;
  savedCards: SavedCard[];
  setCurrentView: (view: ViewType) => void;
  handleSignOut: () => void;
}

const TermsPage: React.FC<TermsPageProps> = ({
  user,
  savedCards,
  setCurrentView,
  handleSignOut
}) => {
  const keyPoints = [
    {
      icon: FileText,
      title: 'Service Agreement',
      description: 'By using PokéGrader AI, you agree to these terms and our privacy policy.'
    },
    {
      icon: AlertCircle,
      title: 'AI Accuracy Disclaimer',
      description: 'Our AI provides estimates. Final grading decisions should always be verified by professionals.'
    },
    {
      icon: Scale,
      title: 'Fair Use Policy',
      description: 'Free users are limited to 5 analyses per month. Pro users have unlimited access.'
    },
    {
      icon: Users,
      title: 'Account Responsibility',
      description: 'You are responsible for maintaining the confidentiality of your account credentials.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 relative">
      <PatternBackground pattern="diagonal" opacity={0.1} />
      <Navigation 
        user={user}
        savedCards={savedCards}
        setCurrentView={setCurrentView}
        handleSignOut={handleSignOut}
      />
      
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto relative z-10">
        {/* Back button */}
        <button
          onClick={() => setCurrentView('home')}
          className="flex items-center text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </button>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Terms of Service
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300">
            Please read these terms carefully before using PokéGrader AI
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            Last updated: January 2025
          </p>
        </div>

        {/* Key Points */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {keyPoints.map((item, index) => (
            <div key={index} className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-4">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  {item.title}
                </h3>
              </div>
              <p className="text-slate-600 dark:text-slate-300">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Detailed Terms */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-8 border border-slate-200 dark:border-slate-700 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              1. Acceptance of Terms
            </h2>
            <div className="space-y-4 text-slate-600 dark:text-slate-300">
              <p>
                By accessing and using PokéGrader AI ("Service"), you accept and agree to be bound by the terms and provision of this agreement.
                If you do not agree to abide by the above, please do not use this service.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              2. Service Description
            </h2>
            <div className="space-y-4 text-slate-600 dark:text-slate-300">
              <p>
                PokéGrader AI provides AI-powered analysis and grading estimates for Pokemon Trading Card Game cards. Our service:
              </p>
              <p>• Analyzes card condition using computer vision technology</p>
              <p>• Provides grading estimates based on industry standards</p>
              <p>• Offers collection management and tracking features</p>
              <p>• Delivers market pricing information and trends</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              3. AI Accuracy and Disclaimers
            </h2>
            <div className="space-y-4 text-slate-600 dark:text-slate-300">
              <p>
                <strong className="text-slate-900 dark:text-white">Important:</strong> Our AI provides estimates only and should not be considered 
                definitive professional grading. Actual professional grades may vary.
              </p>
              <p>• AI accuracy is approximately 95% compared to professional grades</p>
              <p>• Results may vary based on image quality and lighting conditions</p>
              <p>• We recommend professional grading for valuable cards</p>
              <p>• PokéGrader AI is not liable for any financial decisions based on our estimates</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              4. Usage Limits and Fair Use
            </h2>
            <div className="space-y-4 text-slate-600 dark:text-slate-300">
              <p>
                <strong className="text-slate-900 dark:text-white">Free Account:</strong> Limited to 5 card analyses per month
              </p>
              <p>
                <strong className="text-slate-900 dark:text-white">Pro Account:</strong> Unlimited analyses and premium features
              </p>
              <p>
                Users may not abuse the service through automated scripts, excessive requests, or attempts to circumvent usage limits.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              5. Account Responsibility
            </h2>
            <div className="space-y-4 text-slate-600 dark:text-slate-300">
              <p>• You are responsible for maintaining the confidentiality of your account</p>
              <p>• You agree to accept responsibility for all activities under your account</p>
              <p>• You must notify us immediately of any unauthorized use of your account</p>
              <p>• We reserve the right to terminate accounts that violate these terms</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              6. Intellectual Property
            </h2>
            <div className="space-y-4 text-slate-600 dark:text-slate-300">
              <p>
                The Service and its original content, features, and functionality are owned by PokéGrader AI and are protected 
                by international copyright, trademark, patent, trade secret, and other intellectual property laws.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              7. Limitation of Liability
            </h2>
            <div className="space-y-4 text-slate-600 dark:text-slate-300">
              <p>
                In no event shall PokéGrader AI be liable for any indirect, incidental, special, consequential, or punitive damages, 
                including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              8. Contact Information
            </h2>
            <div className="space-y-4 text-slate-600 dark:text-slate-300">
              <p>
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <p>Email: legal@pokegrader.ai</p>
              <p>Address: PokéGrader AI, Legal Department</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;