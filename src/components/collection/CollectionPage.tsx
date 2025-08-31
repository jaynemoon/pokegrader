import React from 'react';
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
  setCurrentView: _setCurrentView,
  handleSignOut: _handleSignOut
}) => {
  return (
    <div>
      <h1>Collection Page</h1>
      <p>User: {user?.name}</p>
      <p>Cards: {savedCards.length}</p>
    </div>
  );
};

export default CollectionPage;