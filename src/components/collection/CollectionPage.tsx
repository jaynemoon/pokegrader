import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import Navigation from '../ui/Navigation';
import CollectionStats from './CollectionStats';
import CollectionAnalytics from './CollectionAnalytics';
import CollectionFilterComponent from './CollectionFilter';
import BulkImportExport from './BulkImportExport';
import CardGrid from './CardGrid';
import Button from '../ui/Button';
import Card from '../ui/Card';
import type { User, SavedCard, ViewType, CollectionFilter as FilterType, CollectionSort, CollectionStats as StatsType } from '../../types';

interface CollectionPageProps {
  user: User | null;
  savedCards: SavedCard[];
  setSavedCards: (cards: SavedCard[]) => void;
  setCurrentView: (view: ViewType) => void;
  handleSignOut: () => void;
}

const CollectionPage: React.FC<CollectionPageProps> = ({
  user,
  savedCards,
  setSavedCards,
  setCurrentView,
  handleSignOut
}) => {
  const [activeView, setActiveView] = useState<'grid' | 'analytics'>('grid');
  const [filter, setFilter] = useState<FilterType>({});
  const [sort, setSort] = useState<CollectionSort>({ field: 'date', direction: 'desc' });

  // Filter and sort cards
  const filteredAndSortedCards = savedCards
    .filter(card => {
      if (filter.cardName && !card.cardName.toLowerCase().includes(filter.cardName.toLowerCase())) return false;
      if (filter.minGrade && card.overallGrade < filter.minGrade) return false;
      if (filter.maxGrade && card.overallGrade > filter.maxGrade) return false;
      if (filter.minValue && card.estimatedValue < filter.minValue) return false;
      if (filter.maxValue && card.estimatedValue > filter.maxValue) return false;
      return true;
    })
    .sort((a, b) => {
      const multiplier = sort.direction === 'asc' ? 1 : -1;
      switch (sort.field) {
        case 'name':
          return a.cardName.localeCompare(b.cardName) * multiplier;
        case 'grade':
          return (a.overallGrade - b.overallGrade) * multiplier;
        case 'value':
          return (a.estimatedValue - b.estimatedValue) * multiplier;
        case 'date':
        default:
          const dateA = new Date(a.dateSaved).getTime();
          const dateB = new Date(b.dateSaved).getTime();
          return (dateA - dateB) * multiplier;
      }
    });

  // Calculate collection stats
  const collectionStats: StatsType = {
    totalCards: savedCards.length,
    totalValue: savedCards.reduce((sum, card) => sum + card.estimatedValue, 0),
    averageGrade: savedCards.reduce((sum, card) => sum + card.overallGrade, 0) / (savedCards.length || 1),
    gradeDistribution: Array.from({ length: 10 }, (_, i) => ({
      grade: i + 1,
      count: savedCards.filter(card => card.overallGrade === i + 1).length
    })).filter(item => item.count > 0),
    topCards: [...savedCards].sort((a, b) => b.estimatedValue - a.estimatedValue).slice(0, 5)
  };

  const handleImport = (importedCards: Partial<SavedCard>[]) => {
    const newCards = importedCards.map((card, index) => ({
      ...card,
      id: Date.now() + index,
      userId: user?.id || 1,
      dateSaved: new Date().toLocaleDateString(),
      image: card.image || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="280" fill="%23E5E7EB"%3E%3Crect width="200" height="280" rx="12" fill="%23F3F4F6"/%3E%3Ctext x="100" y="140" text-anchor="middle" fill="%23374151" font-size="12"%3EImported Card%3C/text%3E%3C/svg%3E'
    })) as SavedCard[];
    setSavedCards([...savedCards, ...newCards]);
  };

  const resetFilters = () => {
    setFilter({});
    setSort({ field: 'date', direction: 'desc' });
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navigation
          user={user}
          savedCards={savedCards}
          setCurrentView={setCurrentView}
          handleSignOut={handleSignOut}
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card>
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Sign In Required
              </h2>
              <p className="text-slate-600 mb-6">
                Please sign in to view your card collection
              </p>
              <Button onClick={() => setCurrentView('auth')}>
                Sign In
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation
        user={user}
        savedCards={savedCards}
        setCurrentView={setCurrentView}
        handleSignOut={handleSignOut}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">My Collection</h1>
            <p className="text-slate-600">
              Manage and track your graded Pokemon cards
            </p>
          </div>
          <div className="flex space-x-3">
            <Button onClick={() => setCurrentView('wishlist')} variant="secondary">
              Wishlist
            </Button>
            <Button onClick={() => setCurrentView('home')}>
              <Plus className="w-4 h-4 mr-2" />
              Add New Card
            </Button>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex space-x-1 mb-6 bg-slate-200 p-1 rounded-lg w-fit">
          <button
            onClick={() => setActiveView('grid')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeView === 'grid'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Collection
          </button>
          <button
            onClick={() => setActiveView('analytics')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeView === 'analytics'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Analytics
          </button>
        </div>

        {activeView === 'analytics' ? (
          <CollectionAnalytics stats={collectionStats} />
        ) : (
          <>
            {/* Collection Stats */}
            <CollectionStats savedCards={savedCards} />

            {/* Bulk Import/Export */}
            <BulkImportExport 
              savedCards={savedCards} 
              onImport={handleImport}
            />

            {/* Filters */}
            <CollectionFilterComponent
              filter={filter}
              sort={sort}
              onFilterChange={setFilter}
              onSortChange={setSort}
              onReset={resetFilters}
            />


            {/* Results Count */}
            {filteredAndSortedCards.length !== savedCards.length && (
              <div className="mb-4">
                <p className="text-slate-600">
                  Showing {filteredAndSortedCards.length} of {savedCards.length} cards
                </p>
              </div>
            )}

            {/* Card Grid */}
            <CardGrid 
              savedCards={filteredAndSortedCards}
              onCardClick={(card) => {
                // Could implement card detail modal here
                console.log('Card clicked:', card);
              }}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default CollectionPage;