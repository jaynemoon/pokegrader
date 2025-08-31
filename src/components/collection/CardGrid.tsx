import React from 'react';
import { Star, DollarSign, TrendingUp } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import type { SavedCard } from '../../types';

interface CardGridProps {
  savedCards: SavedCard[];
  onCardClick?: (card: SavedCard) => void;
}

const CardGrid: React.FC<CardGridProps> = ({ savedCards, onCardClick }) => {
  const getGradeColor = (grade: number) => {
    if (grade >= 9) return 'text-green-600';
    if (grade >= 7) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getGradeBadgeColor = (grade: number) => {
    if (grade >= 9) return 'bg-green-100 text-green-800';
    if (grade >= 7) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  if (savedCards.length === 0) {
    return (
      <Card>
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto bg-slate-100 rounded-full flex items-center justify-center mb-4">
            <Star className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">No Cards Yet</h3>
          <p className="text-slate-600 mb-6">
            Start building your collection by analyzing and saving your Pokemon cards
          </p>
          <Button onClick={() => window.location.href = '/'}>
            Analyze Your First Card
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {savedCards.map((card) => (
        <Card 
          key={card.id} 
          className="cursor-pointer hover:shadow-lg transition-shadow duration-200"
          onClick={() => onCardClick?.(card)}
        >
          <div className="space-y-4">
            {/* Card Image */}
            <div className="aspect-[3/4] bg-slate-100 rounded-lg overflow-hidden">
              <img 
                src={card.image} 
                alt={card.cardName}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Card Info */}
            <div className="space-y-3">
              <div>
                <h3 className="font-semibold text-slate-900 truncate">
                  {card.cardName}
                </h3>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-sm text-slate-600">
                    Saved {card.dateSaved}
                  </span>
                  <div className="flex items-center text-sm text-slate-500">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {card.confidence}%
                  </div>
                </div>
              </div>

              {/* Grade and Value */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getGradeBadgeColor(card.overallGrade)}`}>
                    Grade {card.overallGrade}
                  </span>
                </div>
                <div className="flex items-center text-green-600 font-semibold">
                  <DollarSign className="w-4 h-4" />
                  {card.estimatedValue.toLocaleString()}
                </div>
              </div>

              {/* Grade Breakdown Preview */}
              <div className="grid grid-cols-4 gap-2 text-xs">
                {Object.entries(card.breakdown).map(([category, details]) => (
                  <div key={category} className="text-center">
                    <div className={`font-semibold ${getGradeColor(details.score)}`}>
                      {details.score}
                    </div>
                    <div className="text-slate-500 capitalize truncate">
                      {category}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default CardGrid;