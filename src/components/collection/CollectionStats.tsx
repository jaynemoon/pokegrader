import React from 'react';
import { DollarSign, Star, TrendingUp, Archive } from 'lucide-react';
import Card from '../ui/Card';
import type { SavedCard } from '../../types';

interface CollectionStatsProps {
  savedCards: SavedCard[];
}

const CollectionStats: React.FC<CollectionStatsProps> = ({ savedCards }) => {
  const totalValue = savedCards.reduce((sum, card) => sum + card.estimatedValue, 0);
  const averageGrade = savedCards.length > 0 
    ? savedCards.reduce((sum, card) => sum + card.overallGrade, 0) / savedCards.length 
    : 0;
  const totalCards = savedCards.length;
  const highGradeCards = savedCards.filter(card => card.overallGrade >= 9).length;

  const stats = [
    {
      label: 'Total Cards',
      value: totalCards.toString(),
      icon: Archive,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      label: 'Total Value',
      value: `$${totalValue.toLocaleString()}`,
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      label: 'Average Grade',
      value: averageGrade.toFixed(1),
      icon: Star,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      label: 'Mint Cards (9+)',
      value: highGradeCards.toString(),
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {stats.map((stat) => (
        <Card key={stat.label} padding="sm">
          <div className="flex items-center">
            <div className={`${stat.bgColor} p-3 rounded-lg mr-3`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
              <div className="text-sm text-slate-600">{stat.label}</div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default CollectionStats;