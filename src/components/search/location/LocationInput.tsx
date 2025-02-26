
import React, { useState, ChangeEvent, useRef, useEffect } from 'react';
import { MapPin, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { filterLocations } from '@/utils/locationData';
import { LocationSuggestions } from './LocationSuggestions';

interface LocationInputProps {
  value: string;
  onLocationSelect: (location: string) => void;
}

export const LocationInput: React.FC<LocationInputProps> = ({ value, onLocationSelect }) => {
  const [suggestions, setSuggestions] = useState({ cities: [], zipCodes: [] });
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [inputValue, setInputValue] = useState(value);
  const [isLoading, setIsLoading] = useState(false);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const searchDebounceRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleLocationChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setActiveIndex(-1);
    setIsLoading(true);

    if (searchDebounceRef.current) {
      clearTimeout(searchDebounceRef.current);
    }

    searchDebounceRef.current = setTimeout(() => {
      if (newValue.length >= 2) {
        const filtered = filterLocations(newValue);
        setSuggestions(filtered);
        setShowSuggestions(true);
      } else {
        setSuggestions({ cities: [], zipCodes: [] });
        setShowSuggestions(false);
      }
      setIsLoading(false);
    }, 300);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const totalSuggestions = [...suggestions.cities, ...suggestions.zipCodes];

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveIndex(prev => 
          prev < totalSuggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (activeIndex >= 0 && totalSuggestions[activeIndex]) {
          const suggestion = totalSuggestions[activeIndex];
          const newValue = `${suggestion.city}, ${suggestion.state}`;
          setInputValue(newValue);
          onLocationSelect(newValue);
          setShowSuggestions(false);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        break;
    }
  };

  const clearLocation = () => {
    setInputValue('');
    onLocationSelect('');
    setSuggestions({ cities: [], zipCodes: [] });
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

  useEffect(() => {
    return () => {
      if (searchDebounceRef.current) {
        clearTimeout(searchDebounceRef.current);
      }
    };
  }, []);

  return (
    <div className="w-full sm:w-[40%] relative group">
      <MapPin className="w-4 h-4 text-gray-400 absolute left-3 sm:left-4 top-1/2 -translate-y-1/2" />
      <input
        type="text"
        placeholder="Enter city or zip code"
        value={inputValue}
        onChange={handleLocationChange}
        onKeyDown={handleKeyDown}
        className={cn(
          "w-full h-11 pl-9 sm:pl-11 pr-8 sm:pr-10",
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
          searchTerm={inputValue}
          activeIndex={activeIndex}
          onSelect={(suggestion) => {
            const newValue = `${suggestion.city}, ${suggestion.state}`;
            setInputValue(newValue);
            onLocationSelect(newValue);
            setShowSuggestions(false);
          }}
          suggestionsRef={suggestionsRef}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};
