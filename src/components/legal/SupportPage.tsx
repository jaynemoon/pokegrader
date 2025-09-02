import React from 'react';
import { ArrowLeft, Mail, MessageCircle, Book, HelpCircle } from 'lucide-react';
import Navigation from '../ui/Navigation';
import PatternBackground from '../ui/PatternBackgrounds';
import type { ViewType, User, SavedCard } from '../../types';

interface SupportPageProps {
  user: User | null;
  savedCards: SavedCard[];
  setCurrentView: (view: ViewType) => void;
  handleSignOut: () => void;
}

const SupportPage: React.FC<SupportPageProps> = ({
  user,
  savedCards,
  setCurrentView,
  handleSignOut
}) => {
  const supportOptions = [
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Get instant help from our support team during business hours.',
      action: 'Start Chat',
      available: true
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Send us a detailed message and we\'ll respond within 24 hours.',
      action: 'Send Email',
      available: true
    },
    {
      icon: Book,
      title: 'Knowledge Base',
      description: 'Browse our comprehensive guides and tutorials.',
      action: 'Browse Guides',
      available: true
    },
    {
      icon: HelpCircle,
      title: 'FAQ',
      description: 'Find answers to the most commonly asked questions.',
      action: 'View FAQ',
      available: true
    }
  ];

  const faqs = [
    {
      question: 'How accurate are the AI grades?',
      answer: 'Our AI achieves 95% accuracy compared to professional PSA grades. The system analyzes card condition using advanced computer vision trained on thousands of professionally graded cards.'
    },
    {
      question: 'What card formats are supported?',
      answer: 'We support all Pokemon TCG cards from Base Set to current releases. This includes regular cards, holos, GX, EX, VMAX, and special promotional cards.'
    },
    {
      question: 'Is my card data secure?',
      answer: 'Yes, we take privacy seriously. All uploaded images are encrypted and automatically deleted after analysis. We never store your card images or personal data without explicit consent.'
    },
    {
      question: 'Can I export my collection data?',
      answer: 'Pro users can export their collection data in multiple formats including CSV, PDF reports, and JSON for integration with other collection management tools.'
    },
    {
      question: 'How does the pricing work?',
      answer: 'We offer 5 free card analyses per month. Pro subscription ($20/month) includes unlimited analyses, advanced features, priority support, and collection export capabilities.'
    }
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
            How can we help you?
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300">
            Get support for PokéGrader AI and all your Pokemon card grading needs
          </p>
        </div>

        {/* Support Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {supportOptions.map((option, index) => (
            <div key={index} className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mr-4">
                  <option.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                  {option.title}
                </h3>
              </div>
              <p className="text-slate-600 dark:text-slate-300 mb-4">
                {option.description}
              </p>
              <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                {option.action}
              </button>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-8 border border-slate-200 dark:border-slate-700">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-slate-200 dark:border-slate-700 pb-6 last:border-b-0">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  {faq.question}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-700">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
              Still need help?
            </h3>
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              Our support team is here Monday-Friday, 9 AM - 6 PM EST
            </p>
            <a 
              href="mailto:support@pokegrader.ai"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              <Mail className="w-4 h-4" />
              support@pokegrader.ai
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;