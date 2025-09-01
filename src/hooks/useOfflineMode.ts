import { useState, useEffect } from 'react';
import type { OfflineData, SavedCard, WishlistItem } from '../types';

const OFFLINE_STORAGE_KEY = 'pokegrader-offline-data';

export const useOfflineMode = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [offlineData, setOfflineData] = useState<OfflineData | null>(null);
  const [lastSync, setLastSync] = useState<string | null>(null);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Load offline data on mount
    loadOfflineData();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const loadOfflineData = () => {
    try {
      const stored = localStorage.getItem(OFFLINE_STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        setOfflineData(data);
        setLastSync(data.lastSync);
      }
    } catch (error) {
      console.error('Failed to load offline data:', error);
    }
  };

  const saveOfflineData = (savedCards: SavedCard[], wishlist: WishlistItem[]) => {
    try {
      const data: OfflineData = {
        savedCards,
        wishlist,
        lastSync: new Date().toISOString()
      };
      localStorage.setItem(OFFLINE_STORAGE_KEY, JSON.stringify(data));
      setOfflineData(data);
      setLastSync(data.lastSync);
    } catch (error) {
      console.error('Failed to save offline data:', error);
    }
  };

  const clearOfflineData = () => {
    localStorage.removeItem(OFFLINE_STORAGE_KEY);
    setOfflineData(null);
    setLastSync(null);
  };

  const syncData = async (
    savedCards: SavedCard[], 
    wishlist: WishlistItem[]
  ): Promise<{ success: boolean; message: string }> => {
    if (!isOnline) {
      return { success: false, message: 'Cannot sync while offline' };
    }

    try {
      // Simulate sync API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      saveOfflineData(savedCards, wishlist);
      
      return { success: true, message: 'Data synced successfully' };
    } catch (error) {
      return { success: false, message: 'Sync failed' };
    }
  };

  return {
    isOnline,
    offlineData,
    lastSync,
    saveOfflineData,
    clearOfflineData,
    syncData,
    loadOfflineData
  };
};