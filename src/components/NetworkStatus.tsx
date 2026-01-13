import { useState, useEffect } from 'react';
import { WifiOff } from 'lucide-react';

export const NetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline) {
    return null;
  }

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-slate-800/90 text-white px-4 py-2 rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 animate-in fade-in slide-in-from-top-4">
      <WifiOff className="w-4 h-4" />
      <span className="text-sm font-medium">離線模式 (Offline Mode)</span>
    </div>
  );
};
