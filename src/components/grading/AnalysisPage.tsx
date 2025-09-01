import React, { useState } from 'react';
import Navigation from '../ui/Navigation';
import DottedBackground from '../ui/DottedBackground';
import ImageUploader from './ImageUploader';
import GradeResults from './GradeResults';
import ARPreview from '../mobile/ARPreview';
import type { GradeResults as GradeResultsType, User, SavedCard, ViewType, AROverlay } from '../../types';

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
  onAnalyzeWithAR?: () => void;
  arOverlay?: AROverlay;
  setAROverlay?: (overlay: AROverlay) => void;
  setShowBarcodeScanner?: (show: boolean) => void;
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
  saveCard,
  onAnalyzeWithAR,
  arOverlay = { isActive: false },
  setAROverlay = () => {},
  setShowBarcodeScanner
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'ar'>('upload');
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 relative transition-colors">
      <DottedBackground opacity={0.02} />
      
      <Navigation
        user={user}
        savedCards={savedCards}
        setCurrentView={setCurrentView}
        handleSignOut={handleSignOut}
        setShowBarcodeScanner={setShowBarcodeScanner}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Card Analysis</h1>
          <p className="text-slate-600">Upload your Pokemon card to get instant AI-powered grading</p>
        </div>

        {/* Analysis Mode Tabs */}
        <div className="flex space-x-1 mb-6 bg-slate-200 p-1 rounded-lg w-fit">
          <button
            onClick={() => setActiveTab('upload')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'upload'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Upload Image
          </button>
          <button
            onClick={() => setActiveTab('ar')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'ar'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            AR Preview
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {activeTab === 'upload' ? (
            <ImageUploader
              uploadedImage={uploadedImage}
              isAnalyzing={isAnalyzing}
              gradeResults={gradeResults}
              analyzeCard={analyzeCard}
              user={user}
            />
          ) : (
            <ARPreview
              onAnalyzeWithAR={onAnalyzeWithAR || analyzeCard}
              arOverlay={arOverlay}
              setAROverlay={setAROverlay}
            />
          )}
          
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