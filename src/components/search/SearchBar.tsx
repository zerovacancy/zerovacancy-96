
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { ContentTypeSelect } from './ContentTypeSelect';
import { LocationInput } from './LocationInput';
import { SearchButton } from './SearchButton';
import { SearchFilters } from './SearchFilters';
import { useIsMobile } from '@/hooks/use-mobile';

interface SearchBarProps {
  value?: string;
  onLocationSelect: (location: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value = '', onLocationSelect }) => {
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const isMobile = useIsMobile();

  return (
    <div className="w-full space-y-3 sm:space-y-3"> {/* Reduced spacing between sections */}
      <div className="flex flex-col gap-2 sm:gap-3"> {/* Reduced gap for mobile */}
        <div className={cn(
          "relative flex flex-col sm:flex-row w-full rounded-lg sm:rounded-xl overflow-hidden",
          "sm:shadow-[0_3px_16px_rgba(0,0,0,0.08)]",
          "border border-gray-300 sm:border-gray-200",
          "bg-white divide-y sm:divide-y-0 sm:divide-x divide-gray-200",
          "transition-all duration-300",
          "hover:shadow-[0_5px_20px_rgba(0,0,0,0.1)]"
        )}>
          {/* Content type select with improved padding */}
          <ContentTypeSelect />
          
          {/* Add a more visible divider on mobile */}
          {isMobile && (
            <div className="h-px w-full bg-gray-200"></div>
          )}
          
          {/* Location input with improved spacing */}
          <LocationInput value={value} onLocationSelect={onLocationSelect} />
          
          {/* Desktop search button */}
          <SearchButton />
        </div>

        {/* Mobile Search Button - Full width with proper padding */}
        <div className="sm:hidden mt-1 mb-1"> {/* Reduced margins */}
          <Button 
            className={cn(
              "w-full h-12", // Increased height 
              "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white",
              "shadow-sm hover:shadow-md transition-all duration-200",
              "text-sm rounded-lg font-medium",
              "flex items-center justify-center gap-2"
            )}
          >
            <Search className="w-5 h-5" />
            <span>Search Creators</span>
          </Button>
        </div>

        {/* Advanced filter section with improved spacing */}
        <div className="pt-0"> {/* Removed padding top */}
          <SearchFilters
            showMoreFilters={showMoreFilters}
            onToggleFilters={() => setShowMoreFilters(!showMoreFilters)}
          />
        </div>
      </div>
    </div>
  );
};
