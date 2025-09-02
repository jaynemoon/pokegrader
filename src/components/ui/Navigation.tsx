import React, { useState } from 'react';
import { Crown, Scan, Menu, X, DollarSign } from 'lucide-react';
import masterballIcon from '../../assets/masterball.svg';
import packIcon from '../../assets/pack.png';
import ThemeToggle from './ThemeToggle';
import type { User, SavedCard, ViewType } from '../../types';

interface NavigationProps {
  user: User | null;
  savedCards: SavedCard[];
  setCurrentView: (view: ViewType) => void;
  handleSignOut: () => void;
  setShowBarcodeScanner?: (show: boolean) => void;
}

const Navigation: React.FC<NavigationProps> = ({
  user,
  savedCards,
  setCurrentView,
  handleSignOut,
  setShowBarcodeScanner
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <button 
            onClick={() => setCurrentView('home')}
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 hover:border-purple-800 hover:shadow-xlg rounded-lg border-radius-lg flex items-center justify-center">
              <img
                src={masterballIcon}
                alt="PokéGrader-icon"
                className="w-8 h-8"
              />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
              PokéGrader
            </span>
          </button>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-3">
            {user && (
              <>
                <button
                  onClick={() => setCurrentView('collection')}
                  className="inline-flex items-center gap-0.5 px-3 p-1 m-1 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 transition-colors border border-slate-200 dark:border-slate-700 rounded-xl hover:border-slate-300 dark:hover:border-slate-600"
                >
                  <img src={packIcon} alt="Collection" className="w-8 h-8" />
                  Collection ({savedCards.length})
                </button>
                
                <button
                  onClick={() => setCurrentView('market')}
                  className="inline-flex items-center gap-1.5 px-3 p-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 transition-colors border border-slate-200 dark:border-slate-700 rounded-xl hover:border-slate-300 dark:hover:border-slate-600"
                >
                  <DollarSign className="w-4 h-4" />
                  Marketplace
                </button>
                
                {setShowBarcodeScanner && (
                  <button
                    onClick={() => setShowBarcodeScanner(true)}
                    className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 transition-colors border border-slate-200 dark:border-slate-700 rounded-xl hover:border-slate-300 dark:hover:border-slate-600"
                  >
                    <Scan className="w-4 h-4" />
                    Scan
                  </button>
                )}
              </>
            )}
            
            {user && !user.isPro && (
              <button
                onClick={() => setCurrentView('auth')}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Crown className="w-4 h-4" />
                Upgrade to Pro
              </button>
            )}
            
            {!user && (
              <>
                <button
                  onClick={() => setCurrentView('features')}
                  className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 transition-colors border border-slate-200 dark:border-slate-700 rounded-xl hover:border-slate-300 dark:hover:border-slate-600"
                >
                  Features
                </button>
                <button
                  onClick={() => setCurrentView('pricing')}
                  className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 transition-colors border border-slate-200 dark:border-slate-700 rounded-xl hover:border-slate-300 dark:hover:border-slate-600"
                >
                  Pricing
                </button>
              </>
            )}
            
            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <img
                    src={user.avatar}
                    alt="Avatar"
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{user.name}</span>
                      {user.isPro && (
                        <Crown className="w-3 h-3 text-yellow-500" />
                      )}
                    </div>
                    {!user.isPro && (
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {user.freeAnalysesRemaining} free analyses left
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={handleSignOut}
                  className="inline-flex items-center gap-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 border border-slate-200 dark:border-slate-700"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => setCurrentView('auth')}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                Sign In
              </button>
            )}
             <ThemeToggle />
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 ml-2"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {user ? (
                <>
                  <button
                    onClick={() => { setCurrentView('collection'); setIsMobileMenuOpen(false); }}
                    className="flex items-center gap-2 w-full px-3 py-2 text-md font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg"
                  >
                    <img src={packIcon} alt="Collection" className="w-10 h-10" />
                    Collection ({savedCards.length})
                  </button>
                  
                  <button
                    onClick={() => { setCurrentView('market'); setIsMobileMenuOpen(false); }}
                    className="flex items-center gap-6 w-full px-5 py-4 text-md font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg"
                  >
                    <DollarSign className="w-5 h-5" />
                    Market
                  </button>
                  
                  {setShowBarcodeScanner && (
                    <button
                      onClick={() => { setShowBarcodeScanner(true); setIsMobileMenuOpen(false); }}
                      className="flex items-center gap-2 w-full px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg"
                    >
                      <Scan className="w-4 h-4" />
                      Barcode Scanner
                    </button>
                  )}
                  
                  {!user.isPro && (
                    <button
                      onClick={() => { setCurrentView('auth'); setIsMobileMenuOpen(false); }}
                      className="flex items-center gap-2 w-full px-3 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg"
                    >
                      <Crown className="w-4 h-4" />
                      Upgrade to Pro
                    </button>
                  )}
                </>
              ) : (
                <>
                  <button
                    onClick={() => { setCurrentView('features'); setIsMobileMenuOpen(false); }}
                    className="flex items-center gap-2 w-full px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg"
                  >
                    Features
                  </button>
                  <button
                    onClick={() => { setCurrentView('pricing'); setIsMobileMenuOpen(false); }}
                    className="flex items-center gap-2 w-full px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg"
                  >
                    Pricing
                  </button>
                  <button
                    onClick={() => { setCurrentView('auth'); setIsMobileMenuOpen(false); }}
                    className="flex items-center gap-2 w-full px-3 py-2 text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow-md"
                  >
                    Sign In
                  </button>
                </>
              )}

            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;