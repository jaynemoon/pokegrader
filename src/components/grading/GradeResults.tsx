import React from 'react';
import type { GradeResults as GradeResultsType, ViewType } from '../../types';

interface GradeResultsProps {
  gradeResults: GradeResultsType | null;
  isAnalyzing: boolean;
  saveCard: () => void;
  setCurrentView: (view: ViewType) => void;
}

const GradeResults: React.FC<GradeResultsProps> = ({
  gradeResults,
  isAnalyzing,
  saveCard: _saveCard,
  setCurrentView: _setCurrentView
}) => {
  return (
    <div>
      <h2>Grade Results</h2>
      {gradeResults && <p>Overall Grade: {gradeResults.overallGrade}</p>}
      {isAnalyzing && <p>Analyzing...</p>}
    </div>
  );
};

export default GradeResults;