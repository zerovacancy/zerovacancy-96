
import React from 'react';
import { Search, MapPin } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

export const SearchBar = () => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-[45%_45%_10%] gap-4 w-full">
        <div className="relative">
          <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search creators..."
            className={cn(
              "w-full h-12 pl-12 pr-4 rounded-lg",
              "border border-[#E5E7EB] bg-white",
              "text-base placeholder:text-gray-500",
              "transition-colors duration-200",
              "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30"
            )}
          />
        </div>
        <div className="relative">
          <MapPin className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Location"
            className={cn(
              "w-full h-12 pl-12 pr-4 rounded-lg",
              "border border-[#E5E7EB] bg-white",
              "text-base placeholder:text-gray-500",
              "transition-colors duration-200",
              "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30"
            )}
          />
        </div>
        <Button 
          className={cn(
            "h-12 w-full md:w-fit px-6",
            "bg-gray-900 text-white font-medium rounded-lg",
            "transition-opacity duration-200 hover:opacity-90"
          )}
        >
          Search
        </Button>
      </div>
    </div>
  );
};
