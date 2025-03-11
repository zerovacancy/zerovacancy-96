
import React from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

export const MobileSearchButton = () => {
  const isMobile = useIsMobile();
  
  // Only display on mobile devices
  if (!isMobile) return null;
  
  return (
    <button
      className={cn(
        "gradient-button",
        "w-full h-12 px-6 py-3 font-semibold text-white rounded-lg",
        "transition-all duration-300",
        "hover:shadow-lg",
        "focus:outline-none focus:ring-2 focus:ring-indigo-500/30",
        "flex items-center justify-center text-sm",
        "mt-3 touch-manipulation" // Added touch-manipulation class
      )}
      type="button"
      aria-label="Search creators"
    >
      <Search className="w-4 h-4 mr-2" aria-hidden="true" />
      <span>DISCOVER</span>
    </button>
  );
};
