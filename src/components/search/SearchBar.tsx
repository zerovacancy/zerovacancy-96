
import React, { useState } from 'react';
import { Search, MapPin, Camera, DollarSign, Star, ChevronDown } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

export const SearchBar = () => {
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [location, setLocation] = useState('');

  // Popular services would typically come from an API/props
  const popularServices = location ? [
    'Photography',
    'Virtual Tours',
    'Drone Video'
  ] : [];

  return (
    <div className="w-full space-y-6">
      {/* Main Search Bar */}
      <div className="relative flex flex-col sm:flex-row w-full rounded-lg overflow-hidden shadow-lg border border-gray-200 bg-white divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
        {/* Content Type Dropdown */}
        <div className="w-full sm:w-[40%] relative group order-1">
          <Camera className="w-4 sm:w-5 h-4 sm:h-5 text-gray-400 absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <ChevronDown className="w-4 sm:w-5 h-4 sm:h-5 text-gray-400 absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <select
            className={cn(
              "w-full h-12 sm:h-14 pl-10 sm:pl-12 pr-10 sm:pr-12 appearance-none",
              "bg-white text-sm sm:text-base text-gray-700",
              "transition-colors duration-200",
              "focus:outline-none focus:bg-blue-50/50 group-hover:bg-gray-50",
              "border-0"
            )}
          >
            <option value="">Select content type</option>
            <option value="professional-photography">Professional Photography</option>
            <option value="virtual-tours">Virtual Tours (360° POV)</option>
            <option value="drone-video">Drone Video Tours</option>
            <option value="property-highlight">Property Highlight Videos</option>
            <option value="social-media">Social Media Content Package</option>
            <option value="3d-virtual">3D Virtual Tours</option>
            <option value="architectural">Architectural Photography</option>
            <option value="twilight">Twilight Photography</option>
            <option value="amenity">Amenity Lifestyle Photos</option>
            <option value="property-video">Property Video Tour</option>
          </select>
        </div>

        {/* Location Input */}
        <div className="w-full sm:w-[40%] relative group order-2">
          <MapPin className="w-4 sm:w-5 h-4 sm:h-5 text-gray-400 absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Enter city or zip code"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className={cn(
              "w-full h-12 sm:h-14 pl-10 sm:pl-12 pr-4",
              "bg-white text-sm sm:text-base text-gray-700",
              "transition-colors duration-200",
              "focus:outline-none focus:bg-blue-50/50 group-hover:bg-gray-50",
              "border-0"
            )}
          />
        </div>

        {/* Search Button */}
        <div className="w-full sm:w-[20%] p-2 sm:p-0 order-3">
          <Button 
            className={cn(
              "w-full h-12 sm:h-14 px-6",
              "bg-primary hover:bg-primary/90 text-white font-medium",
              "shadow-sm hover:shadow-md transition-all duration-200",
              "text-sm sm:text-base rounded-md sm:rounded-none"
            )}
          >
            <Search className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            Search
          </Button>
        </div>
      </div>

      {/* Popular Services */}
      {popularServices.length > 0 && (
        <div className="flex flex-wrap gap-2 px-2 mt-4">
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

      {/* Filters Section */}
      <div className="relative mt-6">
        <div className={cn(
          "grid grid-cols-1 sm:grid-cols-2 gap-3 transition-all duration-300",
          showMoreFilters ? "opacity-100 h-auto" : "sm:opacity-100 sm:h-auto opacity-0 h-0 overflow-hidden"
        )}>
          {/* Budget Filter */}
          <div className="relative group">
            <DollarSign className="w-4 sm:w-5 h-4 sm:h-5 text-gray-400 absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <ChevronDown className="w-4 sm:w-5 h-4 sm:h-5 text-gray-400 absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <select
              className={cn(
                "w-full h-12 pl-10 pr-10 rounded-lg appearance-none",
                "border border-gray-200 bg-white",
                "text-sm sm:text-base text-gray-700",
                "transition-colors duration-200",
                "focus:outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100",
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
            <Star className="w-4 sm:w-5 h-4 sm:h-5 text-gray-400 absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <ChevronDown className="w-4 sm:w-5 h-4 sm:h-5 text-gray-400 absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <select
              className={cn(
                "w-full h-12 pl-10 pr-10 rounded-lg appearance-none",
                "border border-gray-200 bg-white",
                "text-sm sm:text-base text-gray-700",
                "transition-colors duration-200",
                "focus:outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100",
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

        {/* Mobile Filter Toggle */}
        <button
          onClick={() => setShowMoreFilters(!showMoreFilters)}
          className="w-full sm:hidden mt-4 px-4 py-2 text-sm text-gray-600 hover:text-gray-800 flex items-center justify-center gap-2 transition-colors duration-200"
        >
          <ChevronDown className={cn(
            "w-4 h-4 transition-transform duration-200",
            showMoreFilters ? "rotate-180" : ""
          )} />
          {showMoreFilters ? "Show Less" : "Show More Filters"}
        </button>
      </div>
    </div>
  );
};
