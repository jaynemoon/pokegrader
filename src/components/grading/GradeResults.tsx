import React from 'react';
import { Star, DollarSign, Bookmark, TrendingUp } from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';
import PriceChart from './PriceChart';
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
  saveCard,
  setCurrentView
}) => {
  const getGradeColor = (grade: number) => {
    if (grade >= 9) return 'text-green-600';
    if (grade >= 7) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getGradeBgColor = (grade: number) => {
    if (grade >= 9) return 'bg-green-50 border-green-200';
    if (grade >= 7) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  if (isAnalyzing) {
    return (
      <Card>
        <div className="text-center py-12">
          <div className="animate-pulse space-y-4">
            <div className="w-16 h-16 bg-slate-200 rounded-full mx-auto"></div>
            <div className="space-y-2">
              <div className="h-4 bg-slate-200 rounded w-3/4 mx-auto"></div>
              <div className="h-4 bg-slate-200 rounded w-1/2 mx-auto"></div>
            </div>
          </div>
          <p className="text-slate-600 mt-4">
            Analyzing your card's condition and estimating market value...
          </p>
        </div>
      </Card>
    );
  }

  if (!gradeResults) {
    return (
      <Card>
        <div className="text-center py-12 text-slate-500">
          <Star className="w-12 h-12 mx-auto mb-4 text-slate-300" />
          <p className="text-lg font-medium">No Analysis Yet</p>
          <p className="text-sm mt-2">Upload and analyze a card to see detailed results</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Overall Grade */}
      <Card>
        <div className="text-center">
          <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full text-3xl font-bold mb-4 ${getGradeBgColor(gradeResults.overallGrade)}`}>
            <span className={getGradeColor(gradeResults.overallGrade)}>
              {gradeResults.overallGrade}
            </span>
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-2">
            Overall Grade: {gradeResults.overallGrade}/10
          </h3>
          <p className="text-slate-600 mb-4">{gradeResults.cardName}</p>
          <div className="flex items-center justify-center text-sm text-slate-500 mb-4">
            <TrendingUp className="w-4 h-4 mr-1" />
            {gradeResults.confidence}% confidence
          </div>
        </div>
      </Card>

      {/* Breakdown Scores */}
      <Card>
        <h4 className="text-lg font-semibold text-slate-900 mb-4">Grade Breakdown</h4>
        <div className="space-y-4">
          {Object.entries(gradeResults.breakdown).map(([category, details]) => (
            <div key={category} className="flex items-center justify-between">
              <div>
                <div className="font-medium text-slate-900 capitalize">
                  {category}
                </div>
                <div className="text-sm text-slate-600">
                  {details.description}
                </div>
              </div>
              <div className={`text-lg font-bold ${getGradeColor(details.score)}`}>
                {details.score}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Estimated Value */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-semibold text-slate-900">Estimated Value</h4>
          <div className="flex items-center text-2xl font-bold text-green-600">
            <DollarSign className="w-6 h-6" />
            {gradeResults.estimatedValue.toLocaleString()}
          </div>
        </div>
        <p className="text-sm text-slate-600 mb-4">
          Based on recent sales of similar graded cards
        </p>
        <PriceChart data={gradeResults.priceHistory} />
      </Card>

      {/* Action Buttons */}
      <div className="flex space-x-3">
        <Button 
          onClick={saveCard}
          className="flex-1"
        >
          <Bookmark className="w-4 h-4 mr-2" />
          Save to Collection
        </Button>
        <Button 
          variant="outline"
          onClick={() => setCurrentView('collection')}
          className="flex-1"
        >
          View Collection
        </Button>
      </div>
    </div>
  );
};

export default GradeResults;