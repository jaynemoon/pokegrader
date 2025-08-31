import React from 'react';
import Navigation from '../ui/Navigation';
import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import PricingSection from './PricingSection';
import Footer from './Footer';
import { HomePageProps } from '../../types';

interface HomePageProps {
  user: any;
  savedCards: any[];
  setCurrentView: (view: string) => void;
  handleSignOut: () => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  cameraInputRef: React.RefObject<HTMLInputElement>;
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