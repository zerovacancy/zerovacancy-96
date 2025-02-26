
import React from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

export const SearchButton = () => {
  return (
    <div className="hidden sm:block sm:w-[20%]">
      <button 
        className={cn(
          "w-full h-11",
          "bg-primary hover:bg-primary/90 text-white",
          "shadow-sm hover:shadow-md transition-all duration-200",
          "text-sm rounded-none",
          "flex items-center justify-center gap-2"
        )}
      >
        <Search className="w-4 h-4" />
      </button>
    </div>
  );
};
