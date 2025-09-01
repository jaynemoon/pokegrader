import React, { useState } from 'react';
import Navigation from '../ui/Navigation';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import type { WishlistItem, User, SavedCard, ViewType } from '../../types';

interface WishlistPageProps {
  user: User | null;
  savedCards: SavedCard[];
  setCurrentView: (view: ViewType) => void;
  handleSignOut: () => void;
  wishlist: WishlistItem[];
  setWishlist: (wishlist: WishlistItem[]) => void;
}

const WishlistPage: React.FC<WishlistPageProps> = ({
  user,
  savedCards,
  setCurrentView,
  handleSignOut,
  wishlist,
  setWishlist
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState<Partial<WishlistItem>>({
    cardName: '',
    set: '',
    targetGrade: undefined,
    maxPrice: undefined,
    priority: 'medium'
  });

  const addToWishlist = () => {
    if (!newItem.cardName) return;

    const wishlistItem: WishlistItem = {
      id: Date.now(),
      cardName: newItem.cardName,
      set: newItem.set,
      targetGrade: newItem.targetGrade,
      maxPrice: newItem.maxPrice,
      priority: newItem.priority || 'medium',
      dateAdded: new Date().toISOString().split('T')[0]
    };

    setWishlist([...wishlist, wishlistItem]);
    setNewItem({
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

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation
        user={user}
        savedCards={savedCards}
        setCurrentView={setCurrentView}
        handleSignOut={handleSignOut}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Wishlist</h1>
            <p className="text-slate-600">Track Pokemon cards you want to acquire</p>
          </div>
          
          <Button
            onClick={() => setShowAddForm(true)}
            variant="primary"
          >
            Add to Wishlist
          </Button>
        </div>

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
                    value={newItem.cardName || ''}
                    onChange={(e) => setNewItem({ ...newItem, cardName: e.target.value })}
                    placeholder="e.g., Charizard Base Set"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Set
                  </label>
                  <Input
                    type="text"
                    value={newItem.set || ''}
                    onChange={(e) => setNewItem({ ...newItem, set: e.target.value })}
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
                    value={newItem.targetGrade || ''}
                    onChange={(e) => setNewItem({ ...newItem, targetGrade: Number(e.target.value) || undefined })}
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
                    value={newItem.maxPrice || ''}
                    onChange={(e) => setNewItem({ ...newItem, maxPrice: Number(e.target.value) || undefined })}
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
                  value={newItem.priority}
                  onChange={(e) => setNewItem({ ...newItem, priority: e.target.value as 'low' | 'medium' | 'high' })}
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
      </div>
    </div>
  );
};

export default WishlistPage;