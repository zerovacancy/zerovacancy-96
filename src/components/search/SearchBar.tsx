
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
    <div className="w-full space-y-2 sm:space-y-3">
      <div className="flex flex-col gap-1.5 sm:gap-3">
        <div className={cn(
          "relative flex flex-col sm:flex-row w-full rounded-lg sm:rounded-xl overflow-hidden",
          "sm:shadow-[0_3px_16px_rgba(0,0,0,0.08)]",
          "border border-gray-300 sm:border-gray-200",
          "bg-white divide-y sm:divide-y-0 sm:divide-x divide-gray-200",
          "transition-all duration-300",
          "hover:shadow-[0_5px_20px_rgba(0,0,0,0.1)]"
        )}>
          {/* Content type select */}
          <ContentTypeSelect />
          
          {/* Add a more visible divider on mobile */}
          {isMobile && (
            <div className="h-px w-full bg-gray-200"></div>
          )}
          
          {/* Location input */}
          <LocationInput value={value} onLocationSelect={onLocationSelect} />
          
          {/* Desktop search button */}
          <SearchButton />
        </div>

        {/* Mobile Search Button with fixed alignment of icon and text */}
        <div className="sm:hidden mt-1 mb-1">
          <Button 
            className={cn(
              "w-full h-12",
              "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white",
              "shadow-sm hover:shadow-md transition-all duration-200",
              "text-sm rounded-lg font-medium"
            )}
          >
            <div className="flex items-center justify-center">
              <Search className="w-5 h-5 mr-2" />
              <span>Search Creators</span>
            </div>
          </Button>
        </div>

        {/* Advanced filter section with reduced top spacing */}
        <div className="pt-0 mt-0">
          <SearchFilters
            showMoreFilters={showMoreFilters}
            onToggleFilters={() => setShowMoreFilters(!showMoreFilters)}
          />
        </div>
      </div>
    </div>
  );
};
