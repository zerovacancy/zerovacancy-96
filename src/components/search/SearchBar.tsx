
import React from 'react';
import { Search, MapPin } from 'lucide-react';
import { Button } from '../ui/button';

export const SearchBar = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-4 sm:gap-6 mb-8 sm:mb-12">
      <div className="search-group min-h-[52px]">
        <Search className="w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search creators..."
          className="search-input min-h-[44px] text-base sm:text-sm"
        />
      </div>
      <div className="search-group min-h-[52px]">
        <MapPin className="w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Location"
          className="search-input min-h-[44px] text-base sm:text-sm"
        />
      </div>
      <Button className="w-full md:w-auto h-[52px] text-base">
        Search
      </Button>
    </div>
  );
};
