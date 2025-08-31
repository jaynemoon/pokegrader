import React from 'react';
import { Camera, Upload, RotateCcw } from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';
import type { GradeResults } from '../../types';

interface ImageUploaderProps {
  uploadedImage: string | null;
  isAnalyzing: boolean;
  gradeResults: GradeResults | null;
  analyzeCard: () => Promise<void>;
  user?: { isPro: boolean; freeAnalysesRemaining: number } | null;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  uploadedImage,
  isAnalyzing,
  gradeResults,
  analyzeCard,
  user
}) => {
  const handleRetakePhoto = () => {
    window.location.reload(); // Simple way to reset the analysis
  };

  return (
    <Card className="h-fit">
      <div className="text-center">
        {!uploadedImage ? (
          <div className="space-y-4">
            <div className="w-24 h-24 mx-auto bg-slate-100 rounded-full flex items-center justify-center">
              <Camera className="w-8 h-8 text-slate-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Upload Your Pokemon Card
              </h3>
              <p className="text-slate-600 mb-6">
                Take a photo or upload an image of your Pokemon card for instant AI-powered grading
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="aspect-[3/4] max-w-sm mx-auto bg-slate-100 rounded-lg overflow-hidden">
              <img 
                src={uploadedImage} 
                alt="Uploaded Pokemon card" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {!gradeResults && !isAnalyzing && (
              <div className="space-y-3">
                <Button 
                  onClick={analyzeCard}
                  size="lg"
                  className="w-full"
                  disabled={!!(user && !user.isPro && user.freeAnalysesRemaining <= 0)}
                >
                  <Upload className="w-5 h-5 mr-2" />
                  Analyze Card
                  {user && !user.isPro && ` (${user.freeAnalysesRemaining} left)`}
                </Button>
                
                {user && !user.isPro && user.freeAnalysesRemaining <= 0 && (
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-800 font-medium mb-1">
                      Free analyses limit reached
                    </p>
                    <p className="text-xs text-blue-600">
                      Upgrade to Pro for unlimited card analyses
                    </p>
                  </div>
                )}
                <Button 
                  variant="outline"
                  onClick={handleRetakePhoto}
                  className="w-full"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Retake Photo
                </Button>
              </div>
            )}

            {isAnalyzing && (
              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                  <span className="text-slate-600 font-medium">Analyzing your card...</span>
                </div>
                <p className="text-sm text-slate-500">
                  This may take a few seconds while our AI examines your card
                </p>
              </div>
            )}

            {gradeResults && (
              <div className="space-y-3">
                <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-green-800 font-medium">Analysis Complete!</p>
                  <p className="text-sm text-green-600 mt-1">
                    Your card has been successfully graded
                  </p>
                </div>
                <Button 
                  variant="outline"
                  onClick={handleRetakePhoto}
                  className="w-full"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Analyze New Card
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};

export default ImageUploader;