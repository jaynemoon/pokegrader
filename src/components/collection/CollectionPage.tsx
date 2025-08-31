import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import Navigation from '../ui/Navigation';
import CollectionStats from './CollectionStats';
import CardGrid from './CardGrid';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';
import type { User, SavedCard, ViewType } from '../../types';

interface CollectionPageProps {
  user: User | null;
  savedCards: SavedCard[];
  setCurrentView: (view: ViewType) => void;
  handleSignOut: () => void;
}

const CollectionPage: React.FC<CollectionPageProps> = ({
  user,
  savedCards,
  setCurrentView,
  handleSignOut
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'grade' | 'value' | 'date'>('date');
  const [filterGrade, setFilterGrade] = useState<'all' | 'high' | 'medium' | 'low'>('all');

  // Filter and sort cards
  const filteredAndSortedCards = savedCards
    .filter(card => {
      const matchesSearch = card.cardName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = 
        filterGrade === 'all' ||
        (filterGrade === 'high' && card.overallGrade >= 9) ||
        (filterGrade === 'medium' && card.overallGrade >= 7 && card.overallGrade < 9) ||
        (filterGrade === 'low' && card.overallGrade < 7);
      
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.cardName.localeCompare(b.cardName);
        case 'grade':
          return b.overallGrade - a.overallGrade;
        case 'value':
          return b.estimatedValue - a.estimatedValue;
        case 'date':
        default:
          return new Date(b.dateSaved).getTime() - new Date(a.dateSaved).getTime();
      }
    });

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
          <Button onClick={() => setCurrentView('home')}>
            <Plus className="w-4 h-4 mr-2" />
            Add New Card
          </Button>
        </div>

        {/* Collection Stats */}
        <CollectionStats savedCards={savedCards} />

        {/* Filters and Search */}
        <Card className="mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <Input
                placeholder="Search your cards..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Sort */}
            <div className="md:w-48">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="date">Sort by Date</option>
                <option value="name">Sort by Name</option>
                <option value="grade">Sort by Grade</option>
                <option value="value">Sort by Value</option>
              </select>
            </div>

            {/* Filter */}
            <div className="md:w-48">
              <select
                value={filterGrade}
                onChange={(e) => setFilterGrade(e.target.value as typeof filterGrade)}
                className="block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="all">All Grades</option>
                <option value="high">High Grade (9+)</option>
                <option value="medium">Medium Grade (7-8)</option>
                <option value="low">Low Grade (&lt;7)</option>
              </select>
            </div>
          </div>
        </Card>

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
      </div>
    </div>
  );
};

export default CollectionPage;