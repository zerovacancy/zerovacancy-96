import React from 'react';
import { Search, MapPin, Camera, DollarSign, Star, ChevronDown } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

export const SearchBar = () => {
  return (
    <div className="w-full space-y-3 sm:space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto] gap-2 sm:gap-4 w-full">
        <div className="relative">
          <Search className="w-4 sm:w-5 h-4 sm:h-5 text-gray-400 absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="What type of content do you need?"
            className={cn(
              "w-full h-10 sm:h-12 pl-10 sm:pl-12 pr-3 sm:pr-4 rounded-lg",
              "border border-[#E5E7EB] bg-white/80 backdrop-blur",
              "text-sm sm:text-base placeholder:text-gray-500",
              "transition-all duration-200",
              "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30",
              "hover:bg-white/90"
            )}
          />
        </div>
        <div className="relative">
          <MapPin className="w-4 sm:w-5 h-4 sm:h-5 text-gray-400 absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Enter city or zip code"
            className={cn(
              "w-full h-10 sm:h-12 pl-10 sm:pl-12 pr-3 sm:pr-4 rounded-lg",
              "border border-[#E5E7EB] bg-white/80 backdrop-blur",
              "text-sm sm:text-base placeholder:text-gray-500",
              "transition-all duration-200",
              "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30",
              "hover:bg-white/90"
            )}
          />
        </div>
        <Button 
          className={cn(
            "h-10 sm:h-12 w-full sm:w-[120px] px-3 sm:px-6",
            "bg-primary text-white font-medium rounded-lg",
            "transition-all duration-200",
            "hover:opacity-90 hover:shadow-md",
            "focus:ring-2 focus:ring-primary/20 focus:ring-offset-2",
            "text-sm sm:text-base"
          )}
        >
          Search
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
        <div className="relative">
          <Camera className="w-4 sm:w-5 h-4 sm:h-5 text-gray-400 absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <ChevronDown className="w-4 sm:w-5 h-4 sm:h-5 text-gray-400 absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <select
            className={cn(
              "w-full h-10 sm:h-12 pl-10 sm:pl-12 pr-10 sm:pr-12 rounded-lg appearance-none",
              "border border-[#E5E7EB] bg-white/80 backdrop-blur",
              "text-sm sm:text-base text-gray-500",
              "transition-all duration-200",
              "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30",
              "hover:bg-white/90"
            )}
          >
            <option value="">Select content type (Professional Photography, Virtual Tour, etc.)</option>
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

        <div className="relative">
          <DollarSign className="w-4 sm:w-5 h-4 sm:h-5 text-gray-400 absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <select
            className={cn(
              "w-full h-10 sm:h-12 pl-10 sm:pl-12 pr-3 sm:pr-4 rounded-lg appearance-none",
              "border border-[#E5E7EB] bg-white/80 backdrop-blur",
              "text-sm sm:text-base text-gray-500",
              "transition-all duration-200",
              "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30",
              "hover:bg-white/90"
            )}
          >
            <option value="">Price Range</option>
            <option value="0-100">$0 - $100</option>
            <option value="100-300">$100 - $300</option>
            <option value="300-500">$300 - $500</option>
            <option value="500+">$500+</option>
          </select>
        </div>

        <div className="relative">
          <Star className="w-4 sm:w-5 h-4 sm:h-5 text-gray-400 absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <select
            className={cn(
              "w-full h-10 sm:h-12 pl-10 sm:pl-12 pr-3 sm:pr-4 rounded-lg appearance-none",
              "border border-[#E5E7EB] bg-white/80 backdrop-blur",
              "text-sm sm:text-base text-gray-500",
              "transition-all duration-200",
              "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30",
              "hover:bg-white/90"
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
  );
};
