
import React, { useRef, useState } from 'react';
import { CreatorCard } from '../creator/CreatorCard';
import { ChevronDown, Filter, ChevronRight, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { motion, AnimatePresence } from 'framer-motion';
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
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  
  // Filter tags
  const filterTags = ["All Services", "Photography", "Video Tours", "Drone Footage", "3D Tours", "Floor Plans", "Virtual Staging"];
  
  // Function to handle horizontal scroll on mobile
  const scrollHorizontally = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const scrollAmount = container.clientWidth * 0.8;
    
    const newPosition = direction === 'left' 
      ? Math.max(scrollPosition - scrollAmount, 0)
      : Math.min(scrollPosition + scrollAmount, container.scrollWidth - container.clientWidth);
    
    container.scrollTo({
      left: newPosition,
      behavior: 'smooth'
    });
    
    setScrollPosition(newPosition);
  };
  
  // Check if scroll buttons should be visible
  const canScrollLeft = scrollPosition > 0;
  const canScrollRight = scrollContainerRef.current
    ? scrollPosition < scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth - 10
    : false;
  
  // Update scroll position when container scrolls
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      setScrollPosition(scrollContainerRef.current.scrollLeft);
    }
  };

  return (
    <div className="relative">
      {/* Filters section */}
      <div className="mb-4 sm:mb-6">
        <div className="overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
          <div className="flex space-x-2 pb-1 min-w-max">
            {filterTags.map((tag, index) => (
              <button 
                key={index} 
                className={cn(
                  "transition-all whitespace-nowrap rounded-full border", 
                  "font-medium shadow-sm", 
                  index === 0 ? "bg-indigo-50 text-indigo-700 border-indigo-200" : "bg-white text-gray-700 border-gray-200", 
                  isMobile ? "text-xs px-2.5 py-1" : "text-sm px-3 py-1.5"
                )}
              >
                {index === 0 && <Filter className={cn("inline-block mr-1.5", isMobile ? "w-2.5 h-2.5" : "w-3 h-3")} />}
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Mobile: Horizontal scrolling creator cards */}
      {isMobile ? (
        <div className="relative">
          {/* Navigation arrows */}
          {creators.length > 1 && (
            <>
              <AnimatePresence>
                {canScrollLeft && (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.9 }}
                    exit={{ opacity: 0 }}
                    className="absolute left-0 top-1/2 z-20 -translate-y-1/2 -ml-1 h-8 w-8 rounded-full bg-white/90 shadow-md flex items-center justify-center border border-gray-100 text-indigo-600"
                    onClick={() => scrollHorizontally('left')}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </motion.button>
                )}
              </AnimatePresence>
              
              <AnimatePresence>
                {canScrollRight && (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.9 }}
                    exit={{ opacity: 0 }}
                    className="absolute right-0 top-1/2 z-20 -translate-y-1/2 -mr-1 h-8 w-8 rounded-full bg-white/90 shadow-md flex items-center justify-center border border-gray-100 text-indigo-600"
                    onClick={() => scrollHorizontally('right')}
                  >
                    <ChevronRight className="h-5 w-5" />
                  </motion.button>
                )}
              </AnimatePresence>
            </>
          )}
          
          {/* Horizontal scroll container */}
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-4 pb-4 pt-1 snap-x snap-mandatory touch-pan-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
            onScroll={handleScroll}
          >
            {creators.map((creator, index) => (
              <div 
                key={creator.name}
                className="min-w-[85%] sm:min-w-[80%] snap-start"
              >
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.1 * index
                  }}
                >
                  <CreatorCard 
                    creator={creator} 
                    onImageLoad={onImageLoad} 
                    loadedImages={loadedImages} 
                    imageRef={imageRef} 
                  />
                </motion.div>
              </div>
            ))}
            
            {creators.length === 0 && (
              <div className="w-full text-center py-10">
                <div className="text-gray-500">No creators found</div>
                <p className="text-sm text-gray-400 mt-2">Try adjusting your filters</p>
              </div>
            )}
          </div>
          
          {/* Indicator dots */}
          {creators.length > 1 && (
            <div className="flex justify-center mt-3 gap-1.5">
              {creators.map((_, index) => (
                <button
                  key={index}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all",
                    scrollPosition / (scrollContainerRef.current?.clientWidth || 1) === index
                      ? "bg-indigo-600"
                      : "bg-gray-300"
                  )}
                  onClick={() => {
                    if (scrollContainerRef.current) {
                      const newPosition = index * scrollContainerRef.current.clientWidth;
                      scrollContainerRef.current.scrollTo({
                        left: newPosition,
                        behavior: 'smooth'
                      });
                      setScrollPosition(newPosition);
                    }
                  }}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        // Desktop: Grid layout
        <div className="grid gap-3 xs:gap-4 sm:gap-5 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {creators.map((creator, index) => (
            <motion.div 
              key={creator.name} 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{
                duration: 0.5,
                delay: 0.1 + index * 0.1
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
      )}
      
      {/* "Show more" button */}
      {!isMobile && creators.length > 0 && (
        <div className="mt-6 text-center">
          <button className="inline-flex items-center px-5 py-2.5 rounded-lg bg-indigo-600 text-white font-semibold shadow-md hover:bg-indigo-700 transition-all">
            Show more creators
            <ChevronDown className="ml-1.5 w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
