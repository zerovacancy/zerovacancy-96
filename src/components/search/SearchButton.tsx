
import React from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

export const SearchButton = () => {
  return (
    <div className="hidden sm:block w-auto relative">
      <button
        className={cn(
          "gradient-button",
          "h-12 px-6 sm:px-8 py-3 font-semibold text-white rounded-r-lg", 
          "transition-all duration-300",
          "hover:shadow-lg",
          "focus:outline-none focus:ring-2 focus:ring-indigo-500/30",
          "flex items-center justify-center text-sm"
        )}
        type="button"
        aria-label="Search creators"
      >
        <Search className="w-4 h-4 mr-2" aria-hidden="true" />
        <span>DISCOVER</span>
      </button>
    </div>
  );
};
