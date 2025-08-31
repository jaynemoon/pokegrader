import React from 'react';
import Navigation from '../ui/Navigation';
import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import PricingSection from './PricingSection';
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
  cameraInputRef,
  handleFileUpload
}) => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation
        user={user}
        savedCards={savedCards}
        setCurrentView={setCurrentView}
        handleSignOut={handleSignOut}
      />
      
      <HeroSection
        fileInputRef={fileInputRef}
        cameraInputRef={cameraInputRef}
        handleFileUpload={handleFileUpload}
      />
      
      <FeaturesSection />
      <PricingSection />
      <Footer />
    </div>
  );
};

export default HomePage;