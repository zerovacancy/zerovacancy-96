
import React, { useState, ChangeEvent, useRef, useEffect } from 'react';
import { Search, MapPin, X } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { filterLocations, LocationSuggestion } from '@/utils/locationData';
import { ContentTypeSelect } from './ContentTypeSelect';
import { LocationSuggestions } from './LocationSuggestions';
import { SearchFilters } from './SearchFilters';

interface SearchBarProps {
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onChange, value = '' }) => {
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [inputValue, setInputValue] = useState(value);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleLocationChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    
    if (onChange) {
      onChange(e);
    }

    setActiveIndex(-1);

    if (newValue.length >= 2) {
      const filtered = filterLocations(newValue);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: LocationSuggestion) => {
    const newValue = `${suggestion.city}, ${suggestion.state}`;
    setInputValue(newValue);
    
    const syntheticEvent = {
      target: { value: newValue }
    } as ChangeEvent<HTMLInputElement>;
    
    if (onChange) {
      onChange(syntheticEvent);
    }
    
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(prev => 
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(prev => prev > 0 ? prev - 1 : -1);
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault();
      const selected = suggestions[activeIndex];
      if (selected) {
        handleSuggestionClick(selected);
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const clearLocation = () => {
    setInputValue('');
    
    const syntheticEvent = {
      target: { value: '' }
    } as ChangeEvent<HTMLInputElement>;
    
    if (onChange) {
      onChange(syntheticEvent);
    }
    
    setSuggestions([]);
    setShowSuggestions(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="w-full space-y-2.5">
      <div className="flex flex-col gap-2.5">
        <div className="relative flex flex-col sm:flex-row w-full rounded-lg overflow-hidden shadow-sm border border-gray-300 bg-white divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
          <ContentTypeSelect />

          <div className="w-full sm:w-[40%] relative group">
            <MapPin className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Enter city or zip code"
              value={inputValue}
              onChange={handleLocationChange}
              onKeyDown={handleKeyDown}
              className={cn(
                "w-full h-10 pl-11 pr-10",
                "bg-white text-sm text-gray-700",
                "transition-colors duration-200",
                "focus:outline-none focus:ring-2 focus:ring-primary/10 group-hover:bg-gray-50",
                "border-0",
                "placeholder:text-gray-400"
              )}
              aria-label="Location search"
              aria-expanded={showSuggestions}
              role="combobox"
              aria-controls="location-suggestions"
              aria-activedescendant={activeIndex >= 0 ? `suggestion-${activeIndex}` : undefined}
            />
            {inputValue && (
              <button
                onClick={clearLocation}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label="Clear location"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            {showSuggestions && (
              <LocationSuggestions
                suggestions={suggestions}
                activeIndex={activeIndex}
                onSelect={handleSuggestionClick}
                suggestionsRef={suggestionsRef}
              />
            )}
          </div>

          <div className="hidden sm:block sm:w-[20%]">
            <Button 
              className={cn(
                "w-full h-10",
                "bg-primary hover:bg-primary/90 text-white",
                "shadow-sm hover:shadow-md transition-all duration-200",
                "text-sm rounded-none",
                "flex items-center justify-center gap-2"
              )}
            >
              <Search className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="sm:hidden">
          <Button 
            className={cn(
              "w-full h-10",
              "bg-primary hover:bg-primary/90 text-white",
              "shadow-sm hover:shadow-md transition-all duration-200",
              "text-sm rounded-lg",
              "flex items-center justify-center gap-2"
            )}
          >
            <Search className="w-4 h-4" />
            <span>Search</span>
          </Button>
        </div>

        <SearchFilters
          showMoreFilters={showMoreFilters}
          onToggleFilters={() => setShowMoreFilters(!showMoreFilters)}
        />
      </div>
    </div>
  );
};
