import React from 'react';
import { ArrowLeft, Shield, Eye, Database, Lock } from 'lucide-react';
import Navigation from '../ui/Navigation';
import PatternBackground from '../ui/PatternBackgrounds';
import type { ViewType, User, SavedCard } from '../../types';

interface PrivacyPageProps {
  user: User | null;
  savedCards: SavedCard[];
  setCurrentView: (view: ViewType) => void;
  handleSignOut: () => void;
}

const PrivacyPage: React.FC<PrivacyPageProps> = ({
  user,
  savedCards,
  setCurrentView,
  handleSignOut
}) => {
  const privacyHighlights = [
    {
      icon: Eye,
      title: 'No Image Storage',
      description: 'We delete all uploaded card images immediately after analysis. Your cards remain private.'
    },
    {
      icon: Database,
      title: 'Minimal Data Collection',
      description: 'We only collect essential information needed to provide our grading service.'
    },
    {
      icon: Lock,
      title: 'Secure Processing',
      description: 'All data is encrypted in transit and processed using industry-standard security.'
    },
    {
      icon: Shield,
      title: 'No Third-Party Sharing',
      description: 'Your personal information is never sold, shared, or disclosed to third parties.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 relative">
      <PatternBackground pattern="grid" opacity={0.1} />
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
            Privacy Policy
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300">
            Your privacy is our priority. Here's how we protect your data.
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            Last updated: January 2025
          </p>
        </div>

        {/* Privacy Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {privacyHighlights.map((item, index) => (
            <div key={index} className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mr-4">
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

        {/* Detailed Policy */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-8 border border-slate-200 dark:border-slate-700 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Information We Collect
            </h2>
            <div className="space-y-4 text-slate-600 dark:text-slate-300">
              <p>
                <strong className="text-slate-900 dark:text-white">Account Information:</strong> When you create an account, we collect your email address, name, and password (securely hashed).
              </p>
              <p>
                <strong className="text-slate-900 dark:text-white">Card Images:</strong> Images you upload for grading are processed immediately and deleted from our servers within minutes of analysis completion.
              </p>
              <p>
                <strong className="text-slate-900 dark:text-white">Usage Data:</strong> We collect basic analytics on app usage to improve our service, including feature usage and error logs.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              How We Use Your Information
            </h2>
            <div className="space-y-4 text-slate-600 dark:text-slate-300">
              <p>• Provide AI-powered card grading analysis</p>
              <p>• Maintain and improve our service quality</p>
              <p>• Communicate with you about your account and service updates</p>
              <p>• Provide customer support when requested</p>
              <p>• Ensure security and prevent fraud</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Data Security
            </h2>
            <div className="space-y-4 text-slate-600 dark:text-slate-300">
              <p>
                We implement industry-standard security measures to protect your personal information:
              </p>
              <p>• All data transmission is encrypted using TLS 1.3</p>
              <p>• Passwords are hashed using bcrypt with salt</p>
              <p>• Regular security audits and penetration testing</p>
              <p>• Access controls limit employee access to user data</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Your Rights
            </h2>
            <div className="space-y-4 text-slate-600 dark:text-slate-300">
              <p>You have the right to:</p>
              <p>• Access your personal data we hold</p>
              <p>• Request correction of inaccurate data</p>
              <p>• Request deletion of your account and data</p>
              <p>• Export your collection data (Pro users)</p>
              <p>• Opt out of marketing communications</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Contact Us
            </h2>
            <div className="space-y-4 text-slate-600 dark:text-slate-300">
              <p>
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <p>Email: privacy@pokegrader.ai</p>
              <p>Address: PokéGrader AI, Privacy Department</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;