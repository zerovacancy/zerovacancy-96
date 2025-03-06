import React, { useRef } from 'react';
import { CreatorCard } from '../creator/CreatorCard';
import { ChevronDown, Filter, ArrowUpDown } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { motion } from 'framer-motion';
import { Creator } from '../creator/types';

interface CreatorsListProps {
  creators: Creator[];
  sortBy: string;
  onSort: (value: string) => void;
  onImageLoad: (imageSrc: string) => void;
  loadedImages: Set<string>;
  imageRef: (el: HTMLImageElement | null) => void;
}

export const CreatorsList: React.FC<CreatorsListProps> = ({
  creators,
  sortBy,
  onSort,
  onImageLoad,
  loadedImages,
  imageRef
}) => {
  const isMobile = useIsMobile();
  const filterTagsRef = useRef<HTMLDivElement>(null);

  // Filter tags with improved styling
  const filterTags = [
    "All Services", 
    "Photography", 
    "Video Tours", 
    "Drone Footage", 
    "3D Tours", 
    "Floor Plans", 
    "Virtual Staging"
  ];
  
  return (
    <div className="relative">
      {/* Filters section with horizontal scrolling on mobile */}
      <div className="mb-4 sm:mb-6">
        <h3 className={cn(
          "font-bold text-gray-900 bg-gradient-to-r from-indigo-700 to-purple-600 bg-clip-text text-transparent mb-3 sm:mb-4",
          isMobile ? "text-base" : "text-lg"
        )}>
          Top creators in your area
        </h3>
        
        {/* More elegant sort dropdown */}
        <Select value={sortBy} onValueChange={onSort}>
          <SelectTrigger className={cn(
            "border-gray-200 hover:border-indigo-300 text-gray-700 hover:text-indigo-700 transition-colors",
            "bg-white hover:bg-indigo-50/50 shadow-sm",
            isMobile ? "h-8 text-xs pl-2 pr-2 w-[120px]" : "h-9 text-sm w-[140px]"
          )}>
            <div className="flex items-center justify-center gap-1">
              <ArrowUpDown className={cn(
                "flex-shrink-0 text-indigo-500",
                isMobile ? "w-3 h-3" : "w-3.5 h-3.5"
              )} />
              <SelectValue placeholder="Sort by" className="inline-flex items-center" />
            </div>
          </SelectTrigger>
          <SelectContent className="border-indigo-100">
            <SelectItem value="rating" className="hover:text-indigo-700 hover:bg-indigo-50/50">Highest Rated</SelectItem>
            <SelectItem value="price-low" className="hover:text-indigo-700 hover:bg-indigo-50/50">Price: Low to High</SelectItem>
            <SelectItem value="price-high" className="hover:text-indigo-700 hover:bg-indigo-50/50">Price: High to Low</SelectItem>
            <SelectItem value="reviews" className="hover:text-indigo-700 hover:bg-indigo-50/50">Most Reviews</SelectItem>
          </SelectContent>
        </Select>
        
        {/* Horizontally scrollable filter tags for mobile */}
        <div 
          className="overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] relative mt-3"
          ref={filterTagsRef}
        >
          {/* Gradient fade indicators for horizontal scroll */}
          {isMobile && (
            <>
              <div className="absolute left-0 top-0 h-full w-6 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
              <div className="absolute right-0 top-0 h-full w-6 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
            </>
          )}
          
          <div className="flex space-x-2 pb-1 min-w-max">
            {filterTags.map((tag, index) => (
              <button
                key={index}
                className={cn(
                  "transition-all whitespace-nowrap rounded-full border border-gray-200",
                  "font-medium shadow-sm hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-800",
                  index === 0 ? "bg-indigo-50 text-indigo-700 border-indigo-200" : "bg-white text-gray-700",
                  isMobile ? "text-xs px-2.5 py-1" : "text-sm px-3 py-1.5" // Smaller on mobile
                )}
              >
                {index === 0 && (
                  <Filter className={cn(
                    "inline-block mr-1.5",
                    isMobile ? "w-2.5 h-2.5" : "w-3 h-3"
                  )} />
                )}
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Creators grid with single column on mobile, multi-column on larger screens */}
      <div className={cn(
        "grid gap-4 sm:gap-5 md:gap-6",
        isMobile ? "grid-cols-1" : "sm:grid-cols-2 lg:grid-cols-3" // Single column on mobile
      )}>
        {creators.map((creator, index) => (
          <motion.div
            key={creator.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: isMobile ? 0.1 * index : 0.1 + (index * 0.1),
              ease: [0.22, 1, 0.36, 1]
            }}
          >
            <CreatorCard 
              creator={creator}
              onImageLoad={onImageLoad}
              loadedImages={loadedImages}
              imageRef={imageRef}
            />
          </motion.div>
        ))}
        
        {creators.length === 0 && (
          <div className="col-span-full text-center py-10">
            <div className="text-gray-500">No creators found</div>
            <p className="text-sm text-gray-400 mt-2">Try adjusting your filters</p>
          </div>
        )}
      </div>
      
      {/* Show more button - only visible if there are results */}
      {creators.length > 0 && (
        <div className="mt-6 text-center">
          <button 
            className={cn(
              "inline-flex items-center justify-center px-4 py-2 rounded-full",
              "bg-white text-indigo-600 font-medium border border-indigo-200",
              "shadow-sm hover:bg-indigo-50 transition-colors",
              isMobile ? "text-xs" : "text-sm"
            )}
          >
            Show more creators
            <ChevronDown className={cn(
              "ml-1",
              isMobile ? "w-3.5 h-3.5" : "w-4 h-4"
            )} />
          </button>
        </div>
      )}
    </div>
  );
};
