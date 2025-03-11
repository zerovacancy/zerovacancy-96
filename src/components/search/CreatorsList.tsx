
import React, { useRef, useState } from 'react';
import { CreatorCard } from '../creator/CreatorCard';
import { ChevronDown, Filter, ChevronUp, ChevronRight, ChevronLeft } from 'lucide-react';
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
  const filterTagsRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Filter tags with improved styling
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
      {/* Filters section with horizontal scrolling on mobile */}
      <div className="mb-4 sm:mb-6">
        {/* Horizontally scrollable filter tags for mobile */}
        <div className="overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] relative" ref={filterTagsRef}>
          {/* Gradient fade indicators for horizontal scroll */}
          {isMobile && <>
              <div className="absolute left-0 top-0 h-full w-6 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
              <div className="absolute right-0 top-0 h-full w-6 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
            </>}
          
          <div className="flex space-x-2 pb-1 min-w-max" role="tablist">
            {filterTags.map((tag, index) => <button 
                key={index} 
                className={cn(
                  "transition-all whitespace-nowrap rounded-full border border-gray-200", 
                  "font-medium shadow-sm hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-800", 
                  index === 0 ? "bg-indigo-50 text-indigo-700 border-indigo-200" : "bg-white text-gray-700", 
                  isMobile ? "text-xs px-2.5 py-1" : "text-sm px-3 py-1.5",
                  "focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
                )}
                role="tab"
                aria-selected={index === 0}
                aria-label={`Filter by ${tag}`}
              >
                {index === 0 && <Filter className={cn("inline-block mr-1.5", isMobile ? "w-2.5 h-2.5" : "w-3 h-3")} aria-hidden="true" />}
                {tag}
              </button>)}
          </div>
        </div>
      </div>
      
      {/* MOBILE: Horizontal scrolling creator cards */}
      {isMobile ? (
        <div className="relative">
          {/* Navigation arrows for mobile */}
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
                    aria-label="Scroll left"
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
                    aria-label="Scroll right"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </motion.button>
                )}
              </AnimatePresence>
            </>
          )}
          
          {/* Horizontal scroll container for mobile - removing nested scroll functionality */}
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-4 pb-4 pt-1 snap-x snap-mandatory touch-pan-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
            onScroll={handleScroll}
            role="list"
            aria-label="Creators list"
          >
            {creators.map((creator, index) => (
              <div 
                key={creator.name}
                className="min-w-[85%] sm:min-w-[80%] snap-start"
                role="listitem"
              >
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.1 * index,
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
              </div>
            ))}
            
            {creators.length === 0 && (
              <div className="w-full text-center py-10">
                <div className="text-gray-500">No creators found</div>
                <p className="text-sm text-gray-400 mt-2">Try adjusting your filters</p>
              </div>
            )}
          </div>
          
          {/* Scrolling indicator dots */}
          {creators.length > 1 && (
            <div className="flex justify-center mt-3 gap-1.5">
              {creators.map((_, index) => (
                <button
                  key={index}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300",
                    scrollPosition / (scrollContainerRef.current?.clientWidth || 1) === index
                      ? "bg-indigo-600 scale-110"
                      : "bg-gray-300 scale-100"
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
                  aria-label={`View creator ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        // DESKTOP: Improved grid layout with optimized spacing & responsiveness
        <div 
          className="grid gap-3 xs:gap-4 sm:gap-5 md:gap-6 sm:grid-cols-2 lg:grid-cols-3 px-0 sm:px-0"
          role="list"
          aria-label="Creators list"
        >
          {creators.map((creator, index) => <motion.div 
              key={creator.name} 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{
                duration: 0.5,
                delay: 0.1 + index * 0.1,
                ease: [0.22, 1, 0.36, 1]
              }}
              role="listitem"
            >
              <CreatorCard 
                creator={creator} 
                onImageLoad={onImageLoad} 
                loadedImages={loadedImages} 
                imageRef={imageRef} 
              />
            </motion.div>)}
          
          {creators.length === 0 && <div className="col-span-full text-center py-10">
              <div className="text-gray-500">No creators found</div>
              <p className="text-sm text-gray-400 mt-2">Try adjusting your filters</p>
            </div>}
        </div>
      )}
      
      {/* Desktop "Show more" button - only visible on desktop */}
      {!isMobile && creators.length > 0 && (
        <div className="mt-6 text-center">
          <button 
            className={cn(
              "inline-flex items-center justify-center px-5 py-2.5 rounded-lg",
              "relative overflow-hidden group",
              "text-white font-semibold shadow-md shadow-indigo-200/50", 
              "hover:shadow-lg hover:shadow-indigo-300/50 hover:-translate-y-0.5", 
              "transform active:scale-[0.98] transition-all duration-200",
              "bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-700",
              "focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            )}
            aria-label="Show more creators"
          >
            <span className="relative z-10 flex items-center">
              Show more creators
              <ChevronDown className="ml-1.5 w-4 h-4" aria-hidden="true" />
            </span>
            
            {/* Adding the shimmer effect with enhanced border/glow to match other CTAs */}
            <span className="absolute inset-0 z-0 animate-shimmer-slide bg-gradient-to-r from-transparent via-white/20 to-transparent border border-white/10 shadow-[0_0_10px_rgba(255,255,255,0.15)]" aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
};
