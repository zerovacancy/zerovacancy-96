
import React, { useState, ChangeEvent } from 'react';
import { Search, MapPin, Camera, DollarSign, Star, ChevronDown } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onChange, value }) => {
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [location, setLocation] = useState('');

  const popularServices = location ? [
    'Photography',
    'Virtual Tours',
    'Drone Video'
  ] : [];

  return (
    <div className="w-full space-y-3">
      {/* Main Search Container */}
      <div className="flex flex-col gap-3">
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
              onChange={(e) => setLocation(e.target.value)}
              className={cn(
                "w-full h-10 pl-11 pr-4",
                "bg-white text-sm text-gray-700",
                "transition-colors duration-200",
                "focus:outline-none focus:ring-2 focus:ring-primary/10 group-hover:bg-gray-50",
                "border-0",
                "placeholder:text-gray-400"
              )}
            />
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
        <div className="flex items-center justify-between">
          <button
            onClick={() => setShowMoreFilters(!showMoreFilters)}
            className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200"
          >
            Advanced Filters
            <ChevronDown className={cn(
              "w-3.5 h-3.5 transition-transform duration-200",
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

      {/* Popular Services */}
      {popularServices.length > 0 && (
        <div className="flex flex-wrap gap-2 px-2">
          {popularServices.map((service) => (
            <span 
              key={service}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors duration-200 cursor-pointer"
            >
              Popular in {location}: {service}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
