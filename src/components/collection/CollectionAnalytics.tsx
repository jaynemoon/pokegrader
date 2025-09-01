import React from 'react';
import type { CollectionStats } from '../../types';
import Card from '../ui/Card';

interface CollectionAnalyticsProps {
  stats: CollectionStats;
}

const CollectionAnalytics: React.FC<CollectionAnalyticsProps> = ({ stats }) => {
  const getGradeColor = (grade: number) => {
    if (grade >= 9) return 'text-green-600';
    if (grade >= 7) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <div className="p-4">
            <h3 className="text-sm font-medium text-slate-500">Total Cards</h3>
            <p className="text-2xl font-bold text-slate-900">{stats.totalCards}</p>
          </div>
        </Card>

        <Card>
          <div className="p-4">
            <h3 className="text-sm font-medium text-slate-500">Total Value</h3>
            <p className="text-2xl font-bold text-green-600">${stats.totalValue.toLocaleString()}</p>
          </div>
        </Card>

        <Card>
          <div className="p-4">
            <h3 className="text-sm font-medium text-slate-500">Average Grade</h3>
            <p className={`text-2xl font-bold ${getGradeColor(stats.averageGrade)}`}>
              {stats.averageGrade.toFixed(1)}
            </p>
          </div>
        </Card>
      </div>

      {/* Grade Distribution */}
      <Card>
        <div className="p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Grade Distribution</h3>
          <div className="space-y-3">
            {stats.gradeDistribution.map(({ grade, count }) => {
              const percentage = (count / stats.totalCards) * 100;
              return (
                <div key={grade} className="flex items-center">
                  <div className="w-16 text-sm font-medium text-slate-700">
                    Grade {grade}
                  </div>
                  <div className="flex-1 mx-3">
                    <div className="bg-slate-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${getGradeColor(grade).includes('green') ? 'bg-green-500' : 
                          getGradeColor(grade).includes('yellow') ? 'bg-yellow-500' : 'bg-red-500'}`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                  <div className="w-16 text-sm text-slate-600 text-right">
                    {count} cards
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Card>

      {/* Top Cards */}
      <Card>
        <div className="p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Most Valuable Cards</h3>
          <div className="space-y-3">
            {stats.topCards.slice(0, 5).map((card) => (
              <div key={card.id} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-b-0">
                <div className="flex items-center space-x-3">
                  <img
                    src={card.image}
                    alt={card.cardName}
                    className="w-12 h-16 object-cover rounded"
                  />
                  <div>
                    <p className="font-medium text-slate-900">{card.cardName}</p>
                    <p className={`text-sm ${getGradeColor(card.overallGrade)}`}>
                      Grade {card.overallGrade}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600">${card.estimatedValue}</p>
                  <p className="text-xs text-slate-500">{card.dateSaved}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CollectionAnalytics;