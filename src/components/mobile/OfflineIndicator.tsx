import React from 'react';
import Button from '../ui/Button';

interface OfflineIndicatorProps {
  isOnline: boolean;
  lastSync: string | null;
  onSync: () => void;
  isLoading?: boolean;
}

const OfflineIndicator: React.FC<OfflineIndicatorProps> = ({
  isOnline,
  lastSync,
  onSync,
  isLoading = false
}) => {
  const formatSyncTime = (syncTime: string) => {
    const date = new Date(syncTime);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hr ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className={`fixed top-16 right-4 z-40 p-3 rounded-lg shadow-lg transition-all duration-300 ${
      isOnline 
        ? 'bg-green-50 border border-green-200' 
        : 'bg-orange-50 border border-orange-200'
    }`}>
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${
            isOnline ? 'bg-green-500' : 'bg-orange-500'
          }`} />
          <span className={`text-sm font-medium ${
            isOnline ? 'text-green-700' : 'text-orange-700'
          }`}>
            {isOnline ? 'Online' : 'Offline'}
          </span>
        </div>

        {lastSync && (
          <div className="text-xs text-slate-600">
            Last sync: {formatSyncTime(lastSync)}
          </div>
        )}

        {isOnline && (
          <Button
            onClick={onSync}
            variant="secondary"
            size="sm"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 border border-slate-400 border-t-transparent rounded-full animate-spin" />
                <span>Syncing...</span>
              </div>
            ) : (
              'Sync'
            )}
          </Button>
        )}
      </div>

      {!isOnline && (
        <div className="mt-2 text-xs text-orange-600">
          Working offline - changes will sync when connected
        </div>
      )}
    </div>
  );
};

export default OfflineIndicator;