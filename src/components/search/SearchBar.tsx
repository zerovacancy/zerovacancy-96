
import React from 'react';
import { Search, MapPin, Camera, DollarSign, Star } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

export const SearchBar = () => {
  return (
    <div className="w-full space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-4 w-full">
        <div className="relative">
          <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search creators..."
            className={cn(
              "w-full h-12 pl-12 pr-4 rounded-lg",
              "border border-[#E5E7EB] bg-white/80 backdrop-blur",
              "text-base placeholder:text-gray-500",
              "transition-all duration-200",
              "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30",
              "hover:bg-white/90"
            )}
          />
        </div>
        <div className="relative">
          <MapPin className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Location"
            className={cn(
              "w-full h-12 pl-12 pr-4 rounded-lg",
              "border border-[#E5E7EB] bg-white/80 backdrop-blur",
              "text-base placeholder:text-gray-500",
              "transition-all duration-200",
              "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30",
              "hover:bg-white/90"
            )}
          />
        </div>
        <Button 
          className={cn(
            "h-12 w-full md:w-[120px] px-6",
            "bg-primary text-white font-medium rounded-lg",
            "transition-all duration-200",
            "hover:opacity-90 hover:shadow-md",
            "focus:ring-2 focus:ring-primary/20 focus:ring-offset-2"
          )}
        >
          Search
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="relative">
          <Camera className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <select
            className={cn(
              "w-full h-12 pl-12 pr-4 rounded-lg appearance-none",
              "border border-[#E5E7EB] bg-white/80 backdrop-blur",
              "text-base text-gray-500",
              "transition-all duration-200",
              "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30",
              "hover:bg-white/90"
            )}
          >
            <option value="">Service Type</option>
            <option value="photography">Photography</option>
            <option value="videography">Videography</option>
            <option value="drone">Drone Services</option>
            <option value="editing">Photo Editing</option>
          </select>
        </div>

        <div className="relative">
          <DollarSign className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <select
            className={cn(
              "w-full h-12 pl-12 pr-4 rounded-lg appearance-none",
              "border border-[#E5E7EB] bg-white/80 backdrop-blur",
              "text-base text-gray-500",
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
          <Star className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <select
            className={cn(
              "w-full h-12 pl-12 pr-4 rounded-lg appearance-none",
              "border border-[#E5E7EB] bg-white/80 backdrop-blur",
              "text-base text-gray-500",
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
