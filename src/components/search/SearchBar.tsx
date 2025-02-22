
import React, { useState, ChangeEvent, useRef, useEffect } from 'react';
import { Search, MapPin, Camera, DollarSign, Star, ChevronDown, X } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { filterLocations, LocationSuggestion } from '@/utils/locationData';

interface SearchBarProps {
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onChange, value }) => {
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [location, setLocation] = useState('');
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const handleLocationChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocation(value);
    setActiveIndex(-1);

    if (value.length >= 3) {
      const filtered = filterLocations(value);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: LocationSuggestion) => {
    setLocation(`${suggestion.city}, ${suggestion.state}`);
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
    setLocation('');
    setSuggestions([]);
    setShowSuggestions(false);
  };

  // Close suggestions when clicking outside
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
      {/* Main Search Container */}
      <div className="flex flex-col gap-2.5">
        {/* Input Fields Container */}
        <div className="relative flex flex-col sm:flex-row w-full rounded-lg overflow-hidden shadow-sm border border-gray-300 bg-white divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
          {/* Content Type Dropdown */}
          <div className="w-full sm:w-[40%] relative group">
            <Camera className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <ChevronDown className="w-3.5 h-3.5 text-gray-300 absolute right-4 top-1/2 -translate-y-1/2" />
            <select
              className={cn(
                "w-full h-10 pl-11 pr-10 appearance-none",
                "bg-white text-sm text-gray-700",
                "transition-colors duration-200",
                "focus:outline-none focus:ring-2 focus:ring-primary/10 group-hover:bg-gray-50",
                "border-0"
              )}
            >
              <option value="">Select content type</option>
              <option value="professional-photography">Professional Photography</option>
              <option value="virtual-tours">Virtual Tours (360° POV)</option>
              <option value="drone-video">Drone Video Tours</option>
              <option value="property-highlight">Property Highlight Videos</option>
              <option value="social-media">Social Media Content Package</option>
            </select>
          </div>

          {/* Location Input */}
          <div className="w-full sm:w-[40%] relative group">
            <MapPin className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Enter city or zip code"
              value={location}
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
            {location && (
              <button
                onClick={clearLocation}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label="Clear location"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            {/* Suggestions Dropdown */}
            {showSuggestions && (
              <div
                ref={suggestionsRef}
                id="location-suggestions"
                className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
                role="listbox"
              >
                {suggestions.length > 0 ? (
                  <div className="py-1">
                    {suggestions.map((suggestion, index) => (
                      <button
                        key={`${suggestion.city}-${suggestion.state}`}
                        className={cn(
                          "w-full text-left px-4 py-2 text-sm",
                          "flex items-center gap-2",
                          "transition-colors duration-150",
                          activeIndex === index ? "bg-gray-100" : "hover:bg-gray-50",
                          "focus:outline-none focus:bg-gray-100"
                        )}
                        onClick={() => handleSuggestionClick(suggestion)}
                        role="option"
                        aria-selected={activeIndex === index}
                        id={`suggestion-${index}`}
                      >
                        <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span>{suggestion.city}, {suggestion.state}</span>
                        <span className="text-gray-400 text-xs ml-auto">{suggestion.zip}</span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="px-4 py-2 text-sm text-gray-500">
                    No matches found
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Search Button */}
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

        {/* Mobile Search Button */}
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

        {/* Advanced Filters Toggle */}
        <div className="flex items-center justify-between px-0.5">
          <button
            onClick={() => setShowMoreFilters(!showMoreFilters)}
            className="
              inline-flex items-center gap-1.5 
              px-2 py-1 -ml-2
              text-sm font-medium
              text-gray-700 hover:text-gray-900 
              hover:bg-gray-50 rounded-md
              transition-colors duration-200
            "
          >
            Advanced Filters
            <ChevronDown className={cn(
              "w-3.5 h-3.5 text-gray-500",
              showMoreFilters ? "rotate-180" : ""
            )} />
          </button>
        </div>

        {/* Filters Section */}
        <div className={cn(
          "grid grid-cols-1 sm:grid-cols-2 gap-3 transition-all duration-300",
          showMoreFilters ? "opacity-100 h-auto" : "opacity-0 h-0 overflow-hidden"
        )}>
          {/* Budget Filter */}
          <div className="relative group">
            <DollarSign className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <ChevronDown className="w-3.5 h-3.5 text-gray-300 absolute right-4 top-1/2 -translate-y-1/2" />
            <select
              className={cn(
                "w-full h-10 px-11 rounded-lg appearance-none",
                "border border-gray-200 bg-white",
                "text-sm text-gray-700",
                "transition-colors duration-200",
                "focus:outline-none focus:ring-2 focus:ring-primary/10",
                "group-hover:bg-gray-50"
              )}
            >
              <option value="">Select your budget range</option>
              <option value="0-100">$0 - $100</option>
              <option value="100-300">$100 - $300</option>
              <option value="300-500">$300 - $500</option>
              <option value="500+">$500+</option>
            </select>
          </div>

          {/* Rating Filter */}
          <div className="relative group">
            <Star className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <ChevronDown className="w-3.5 h-3.5 text-gray-300 absolute right-4 top-1/2 -translate-y-1/2" />
            <select
              className={cn(
                "w-full h-10 px-11 rounded-lg appearance-none",
                "border border-gray-200 bg-white",
                "text-sm text-gray-700",
                "transition-colors duration-200",
                "focus:outline-none focus:ring-2 focus:ring-primary/10",
                "group-hover:bg-gray-50"
              )}
            >
              <option value="">Minimum Rating</option>
              <option value="4.5">4.5+ Stars</option>
              <option value="4.0">4.0+ Stars</option>
              <option value="3.5">3.5+ Stars</option>
              <option value="3.0">3.0+ Stars</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
