
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { ContentTypeSelect } from './ContentTypeSelect';
import { LocationInput } from './LocationInput';
import { SearchButton } from './SearchButton';
import { SearchFilters } from './SearchFilters';

interface SearchBarProps {
  value?: string;
  onLocationSelect: (location: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value = '', onLocationSelect }) => {
  const [showMoreFilters, setShowMoreFilters] = useState(false);

  return (
    <div className="w-full space-y-3">
      <div className="flex flex-col gap-3">
        <div className="relative flex flex-col sm:flex-row w-full rounded-lg overflow-hidden shadow-sm border border-gray-300 bg-white divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
          <ContentTypeSelect />
          <LocationInput value={value} onLocationSelect={onLocationSelect} />
          <SearchButton />
        </div>

        {/* Mobile Search Button and Advanced Filters */}
        <div className="sm:hidden flex flex-col items-center gap-2">
          <Button 
            className={cn(
              "w-full h-11",
              "bg-primary hover:bg-primary/90 text-white",
              "shadow-sm hover:shadow-md transition-all duration-200",
              "text-sm rounded-lg",
              "flex items-center justify-center"
            )}
          >
            <Search className="w-5 h-5" />
          </Button>

          <button
            onClick={() => setShowMoreFilters(!showMoreFilters)}
            className={cn(
              "inline-flex items-center gap-1.5",
              "px-3 py-2",
              "text-sm font-medium",
              "text-gray-700 hover:text-gray-900",
              "hover:bg-gray-50 rounded-md",
              "transition-colors duration-200",
              "min-h-[2.75rem]"
            )}
          >
            Advanced Filters
          </button>
        </div>

        <SearchFilters
          showMoreFilters={showMoreFilters}
          onToggleFilters={() => setShowMoreFilters(!showMoreFilters)}
        />
      </div>
    </div>
  );
};
