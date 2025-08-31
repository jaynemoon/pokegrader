import React from 'react';
import type { GradeResults } from '../../types';

interface ImageUploaderProps {
  uploadedImage: string | null;
  isAnalyzing: boolean;
  gradeResults: GradeResults | null;
  analyzeCard: () => Promise<void>;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  uploadedImage,
  isAnalyzing,
  gradeResults: _gradeResults,
  analyzeCard: _analyzeCard
}) => {
  return (
    <div>
      <h2>Image Uploader</h2>
      {uploadedImage && <p>Image uploaded</p>}
      {isAnalyzing && <p>Analyzing...</p>}
    </div>
  );
};

export default ImageUploader;