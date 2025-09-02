import React from 'react';
import Navigation from '../ui/Navigation';
import DottedBackground from '../ui/DottedBackground';
import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import PricingSection from './PricingSection';
import NewsletterSection from './NewsletterSection';
import Footer from './Footer';
import type { User, SavedCard, ViewType } from '../../types';

interface HomePageProps {
  user: User | null;
  savedCards: SavedCard[];
  setCurrentView: (view: ViewType) => void;
  handleSignOut: () => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  cameraInputRef: React.RefObject<HTMLInputElement | null>;
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const HomePage: React.FC<HomePageProps> = ({
  user,
  savedCards,
  setCurrentView,
  handleSignOut,
  fileInputRef,
  handleFileUpload
}) => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 relative transition-colors">
      <DottedBackground opacity={0.03} />
      
      <Navigation
        user={user}
        savedCards={savedCards}
        setCurrentView={setCurrentView}
        handleSignOut={handleSignOut}
      />
      
      <HeroSection
        fileInputRef={fileInputRef}
        handleFileUpload={handleFileUpload}
      />
      
      <FeaturesSection />
      <PricingSection onUpgradeClick={() => setCurrentView('upgrade')} />
      <NewsletterSection />
      <Footer setCurrentView={setCurrentView} />
    </div>
  );
};

export default HomePage;