import React from 'react';
import Navigation from '../ui/Navigation';
import ImageUploader from './ImageUploader';
import GradeResults from './GradeResults';
import type { GradeResults as GradeResultsType, User, SavedCard, ViewType } from '../../types';

interface AnalysisPageProps {
  user: User | null;
  savedCards: SavedCard[];
  uploadedImage: string | null;
  gradeResults: GradeResultsType | null;
  isAnalyzing: boolean;
  setCurrentView: (view: ViewType) => void;
  handleSignOut: () => void;
  analyzeCard: () => Promise<void>;
  saveCard: () => void;
}

const AnalysisPage: React.FC<AnalysisPageProps> = ({
  user,
  savedCards,
  uploadedImage,
  gradeResults,
  isAnalyzing,
  setCurrentView,
  handleSignOut,
  analyzeCard,
  saveCard
}) => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation
        user={user}
        savedCards={savedCards}
        setCurrentView={setCurrentView}
        handleSignOut={handleSignOut}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Card Analysis</h1>
          <p className="text-slate-600">Upload your Pokemon card to get instant AI-powered grading</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <ImageUploader
            uploadedImage={uploadedImage}
            isAnalyzing={isAnalyzing}
            gradeResults={gradeResults}
            analyzeCard={analyzeCard}
            user={user}
          />
          
          <GradeResults
            gradeResults={gradeResults}
            isAnalyzing={isAnalyzing}
            saveCard={saveCard}
            setCurrentView={setCurrentView}
          />
        </div>
      </div>
    </div>
  );
};

export default AnalysisPage;