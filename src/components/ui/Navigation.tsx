import React from 'react';
import { Sparkles, History } from 'lucide-react';
import { User, SavedCard } from '../../types';

interface NavigationProps {
  user: User | null;
  savedCards: SavedCard[];
  setCurrentView: (view: string) => void;
  handleSignOut: () => void;
}

const Navigation: React.FC<NavigationProps> = ({
  user,
  savedCards,
  setCurrentView,
  handleSignOut
}) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              PokeGrade AI
            </span>
          </div>
          <div className="flex items-center gap-3">
            {user && savedCards.length > 0 && (
              <button
                onClick={() => setCurrentView('collection')}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors border border-slate-200 rounded-xl hover:border-slate-300"
              >
                <History className="w-4 h-4" />
                Collection ({savedCards.length})
              </button>
            )}
            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <img
                    src={user.avatar}
                    alt="Avatar"
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-sm font-medium text-slate-700">{user.name}</span>
                </div>
                <button
                  onClick={handleSignOut}
                  className="text-sm text-slate-600 hover:text-slate-800 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setCurrentView('home')}
                  className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors"
                >
                  Get Started
                </button>
                <button
                  onClick={() => setCurrentView('auth')}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 border border-slate-200 rounded-xl hover:border-slate-300 transition-colors"
                >
                  Sign In
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;