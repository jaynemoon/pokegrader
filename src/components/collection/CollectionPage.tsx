import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import Navigation from '../ui/Navigation';
import DottedBackground from '../ui/DottedBackground';
import CollectionStats from './CollectionStats';
import CollectionAnalytics from './CollectionAnalytics';
import CollectionFilterComponent from './CollectionFilter';
import BulkImportExport from './BulkImportExport';
import CardGrid from './CardGrid';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Input from '../ui/Input';
import type { User, SavedCard, ViewType, CollectionFilter as FilterType, CollectionSort, CollectionStats as StatsType, WishlistItem } from '../../types';

interface CollectionPageProps {
  user: User | null;
  savedCards: SavedCard[];
  setSavedCards: (cards: SavedCard[]) => void;
  setCurrentView: (view: ViewType) => void;
  handleSignOut: () => void;
  wishlist: WishlistItem[];
  setWishlist: (wishlist: WishlistItem[]) => void;
}

const CollectionPage: React.FC<CollectionPageProps> = ({
  user,
  savedCards,
  setSavedCards,
  setCurrentView,
  handleSignOut,
  wishlist,
  setWishlist
}) => {
  const [activeView, setActiveView] = useState<'grid' | 'analytics' | 'wishlist'>('grid');
  const [filter, setFilter] = useState<FilterType>({});
  const [sort, setSort] = useState<CollectionSort>({ field: 'date', direction: 'desc' });
  const [showAddForm, setShowAddForm] = useState(false);
  const [newWishlistItem, setNewWishlistItem] = useState<Partial<WishlistItem>>({
    cardName: '',
    set: '',
    targetGrade: undefined,
    maxPrice: undefined,
    priority: 'medium'
  });

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

  // Wishlist functions
  const addToWishlist = () => {
    if (!newWishlistItem.cardName) return;

    const wishlistItem: WishlistItem = {
      id: Date.now(),
      cardName: newWishlistItem.cardName,
      set: newWishlistItem.set,
      targetGrade: newWishlistItem.targetGrade,
      maxPrice: newWishlistItem.maxPrice,
      priority: newWishlistItem.priority || 'medium',
      dateAdded: new Date().toISOString().split('T')[0]
    };

    setWishlist([...wishlist, wishlistItem]);
    setNewWishlistItem({
      cardName: '',
      set: '',
      targetGrade: undefined,
      maxPrice: undefined,
      priority: 'medium'
    });
    setShowAddForm(false);
  };

  const removeFromWishlist = (id: number) => {
    setWishlist(wishlist.filter(item => item.id !== id));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-slate-600 bg-slate-50 border-slate-200';
    }
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
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
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
    <div className="min-h-screen bg-slate-50 relative">
      <DottedBackground opacity={0.02} />
      
      <Navigation
        user={user}
        savedCards={savedCards}
        setCurrentView={setCurrentView}
        handleSignOut={handleSignOut}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">My Collection</h1>
            <p className="text-slate-600">
              Manage and track your graded Pokemon cards
            </p>
          </div>
          <div className="flex space-x-3">
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
          <button
            onClick={() => setActiveView('wishlist')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeView === 'wishlist'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Wishlist
          </button>
        </div>

        {activeView === 'analytics' ? (
          <CollectionAnalytics stats={collectionStats} />
        ) : activeView === 'wishlist' ? (
          <>
            {/* Wishlist Header */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Wishlist</h2>
                <p className="text-slate-600">Track Pokemon cards you want to acquire</p>
              </div>
              
              <Button
                onClick={() => setShowAddForm(true)}
                variant="primary"
              >
                Add to Wishlist
              </Button>
            </div>

            {/* Add Form */}
            {showAddForm && (
              <Card className="mb-6">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Add New Wishlist Item</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Card Name *
                      </label>
                      <Input
                        type="text"
                        value={newWishlistItem.cardName || ''}
                        onChange={(e) => setNewWishlistItem({ ...newWishlistItem, cardName: e.target.value })}
                        placeholder="e.g., Charizard Base Set"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Set
                      </label>
                      <Input
                        type="text"
                        value={newWishlistItem.set || ''}
                        onChange={(e) => setNewWishlistItem({ ...newWishlistItem, set: e.target.value })}
                        placeholder="e.g., Base Set"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Target Grade
                      </label>
                      <Input
                        type="number"
                        min="1"
                        max="10"
                        value={newWishlistItem.targetGrade || ''}
                        onChange={(e) => setNewWishlistItem({ ...newWishlistItem, targetGrade: Number(e.target.value) || undefined })}
                        placeholder="1-10"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Max Price ($)
                      </label>
                      <Input
                        type="number"
                        min="0"
                        value={newWishlistItem.maxPrice || ''}
                        onChange={(e) => setNewWishlistItem({ ...newWishlistItem, maxPrice: Number(e.target.value) || undefined })}
                        placeholder="Maximum price"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Priority
                    </label>
                    <select
                      className="px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={newWishlistItem.priority}
                      onChange={(e) => setNewWishlistItem({ ...newWishlistItem, priority: e.target.value as 'low' | 'medium' | 'high' })}
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>

                  <div className="flex gap-3">
                    <Button onClick={addToWishlist} variant="primary">
                      Add to Wishlist
                    </Button>
                    <Button
                      onClick={() => setShowAddForm(false)}
                      variant="secondary"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            {/* Wishlist Items */}
            {wishlist.length === 0 ? (
              <Card>
                <div className="p-8 text-center">
                  <p className="text-slate-600 mb-4">Your wishlist is empty</p>
                  <Button
                    onClick={() => setShowAddForm(true)}
                    variant="primary"
                  >
                    Add Your First Item
                  </Button>
                </div>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlist.map((item) => (
                  <Card key={item.id}>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-semibold text-slate-900">{item.cardName}</h3>
                        <span className={`px-2 py-1 rounded-md text-xs font-medium border ${getPriorityColor(item.priority)}`}>
                          {item.priority}
                        </span>
                      </div>

                      {item.set && (
                        <p className="text-slate-600 text-sm mb-2">Set: {item.set}</p>
                      )}

                      <div className="space-y-1 text-sm text-slate-600">
                        {item.targetGrade && (
                          <p>Target Grade: {item.targetGrade}</p>
                        )}
                        {item.maxPrice && (
                          <p>Max Price: ${item.maxPrice}</p>
                        )}
                        <p>Added: {item.dateAdded}</p>
                      </div>

                      <div className="flex gap-2 mt-4">
                        <Button
                          onClick={() => removeFromWishlist(item.id)}
                          variant="secondary"
                          size="sm"
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </>
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