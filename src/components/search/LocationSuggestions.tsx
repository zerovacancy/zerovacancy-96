
import React from 'react';
import { MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LocationSuggestion } from '@/utils/locationData';

interface LocationSuggestionsProps {
  suggestions: LocationSuggestion[];
  activeIndex: number;
  onSelect: (suggestion: LocationSuggestion) => void;
  suggestionsRef: React.RefObject<HTMLDivElement>;
}

export const LocationSuggestions: React.FC<LocationSuggestionsProps> = ({
  suggestions,
  activeIndex,
  onSelect,
  suggestionsRef,
}) => {
  return (
    <div
      ref={suggestionsRef}
      id="location-suggestions"
      className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-[100]"
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
              onClick={() => onSelect(suggestion)}
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
  );
};
