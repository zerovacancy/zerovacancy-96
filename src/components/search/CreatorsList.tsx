
import React, { useCallback, useEffect, useState, useRef } from 'react';
import { CreatorCard } from '../creator/CreatorCard';
import { SortMenu } from '../sorting/SortMenu';
import { useIsMobile } from '@/hooks/use-mobile';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, Heart, Share2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface Creator {
  name: string;
  services: string[];
  price: number;
  rating: number;
  reviews: number;
  location: string;
  image: string;
  workExamples: string[];
}

interface CreatorsListProps {
  creators: Creator[];
  sortBy: string;
  onSort: (value: string) => void;
  onImageLoad: (imageSrc: string) => void;
  loadedImages: Set<string>;
  imageRef: (node: HTMLImageElement | null) => void;
  viewMode?: 'card' | 'list';
  isMobile?: boolean;
}

// New List View Creator Card for Mobile
const CreatorListItem = ({ creator, onSave }) => {
  return (
    <motion.div 
      className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm mb-3 flex gap-3"
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
        <img 
          src={creator.image} 
          alt={creator.name} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-sm text-gray-900 truncate">{creator.name}</h3>
          <div className="flex items-center text-xs">
            <span className="flex items-center">
              <span className="text-yellow-500">★</span> 
              <span className="ml-1">{creator.rating}</span>
            </span>
            <span className="text-gray-400 ml-1">({creator.reviews})</span>
          </div>
        </div>
        <p className="text-gray-600 text-xs mt-0.5">{creator.location}</p>
        <div className="flex flex-wrap gap-1 mt-1">
          {creator.services.slice(0, 2).map((service, idx) => (
            <span 
              key={idx} 
              className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-sm"
            >
              {service}
            </span>
          ))}
          {creator.services.length > 2 && (
            <span className="text-[10px] text-gray-500">
              +{creator.services.length - 2}
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2 justify-between items-center">
        <button 
          className="text-gray-400 hover:text-red-500 transition-colors"
          onClick={() => onSave(creator)}
          aria-label="Save for later"
        >
          <Heart className="w-4 h-4" />
        </button>
        <button 
          className="text-gray-400 hover:text-blue-500 transition-colors"
          onClick={() => {}}
          aria-label="Share"
        >
          <Share2 className="w-4 h-4" />
        </button>
        <span className="text-xs font-medium text-gray-900 whitespace-nowrap">${creator.price}</span>
      </div>
    </motion.div>
  );
};

export const CreatorsList: React.FC<CreatorsListProps> = ({
  creators,
  sortBy,
  onSort,
  onImageLoad,
  loadedImages,
  imageRef,
  viewMode = 'card',
  isMobile: forceMobile
}) => {
  const isMobileHook = useIsMobile();
  const isMobile = typeof forceMobile !== 'undefined' ? forceMobile : isMobileHook;
  const [loadedImageUrls, setLoadedImageUrls] = useState<Set<string>>(new Set());
  const [savedCreators, setSavedCreators] = useState<string[]>([]);
  const [swipeHistory, setSwipeHistory] = useState<number[]>([]);
  const touchStartX = useRef<number | null>(null);
  
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    loop: false,
    dragFree: false,
    skipSnaps: true,
  });

  const [prevBtnEnabled, setPrevBtnEnabled] = React.useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = React.useState(true);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
    setSelectedIndex(emblaApi.selectedScrollSnap());
    
    // Add to swipe history for "Recently Viewed"
    const current = emblaApi.selectedScrollSnap();
    setSwipeHistory(prev => {
      if (prev.includes(current)) {
        return prev;
      }
      return [...prev, current];
    });
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    
    // Force a reInit after mount
    const timer = setTimeout(() => {
      emblaApi.reInit();
    }, 100);
    
    return () => {
      clearTimeout(timer);
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);
  
  const handleImageLoad = (imageSrc: string) => {
    setLoadedImageUrls(prev => {
      const updated = new Set(prev);
      updated.add(imageSrc);
      return updated;
    });
    if (onImageLoad) {
      onImageLoad(imageSrc);
    }
  };
  
  const handleSaveCreator = (creator: Creator) => {
    setSavedCreators(prev => {
      if (prev.includes(creator.name)) {
        return prev.filter(name => name !== creator.name);
      }
      return [...prev, creator.name];
    });
  };
  
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    
    // Detect swipe direction
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        scrollNext();
      } else {
        scrollPrev();
      }
    }
    
    touchStartX.current = null;
  };
  
  const sortOptions = [
    { label: 'Rating', value: 'rating' },
    { label: 'Price: Low to High', value: 'price_asc' },
    { label: 'Price: High to Low', value: 'price_desc' },
    { label: 'Distance', value: 'distance' }
  ];

  // Recently viewed section (mobile only)
  const renderRecentlyViewed = () => {
    if (!isMobile || swipeHistory.length <= 1) return null;
    
    return (
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Recently Viewed</h3>
        <div className="flex overflow-x-auto gap-2 pb-2 no-scrollbar">
          {swipeHistory.slice(-4).map((index) => (
            <div 
              key={index} 
              className="flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border border-gray-200"
              onClick={() => emblaApi?.scrollTo(index)}
            >
              <img 
                src={creators[index]?.image} 
                alt={creators[index]?.name} 
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full space-y-2 sm:space-y-6">
      {/* Sort menu div - showing on mobile now */}
      <div className={cn(
        "w-full",
        isMobile ? "flex justify-start" : "flex justify-end"
      )}>
        <SortMenu 
          options={sortOptions}
          onSort={onSort}
          defaultValue={sortBy}
        />
      </div>

      {/* Recently viewed section */}
      {renderRecentlyViewed()}

      {/* Mobile card view with swipe */}
      {isMobile && viewMode === 'card' ? (
        <div className="w-full relative" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
          <div className="w-full overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {creators.map((creator, index) => (
                <div 
                  key={creator.name} 
                  className="min-w-[90%] w-[90%] pl-2 pr-2"
                >
                  <CreatorCard
                    creator={creator}
                    onImageLoad={handleImageLoad}
                    loadedImages={loadedImageUrls}
                    imageRef={imageRef}
                    isSaved={savedCreators.includes(creator.name)}
                    onSave={() => handleSaveCreator(creator)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={scrollPrev}
            className={cn(
              "absolute left-2 top-1/2 -translate-y-1/2 z-10 rounded-full p-2 bg-black/30 text-white backdrop-blur-sm transition-opacity",
              !prevBtnEnabled && "opacity-0 pointer-events-none"
            )}
            aria-label="Previous creator"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={scrollNext}
            className={cn(
              "absolute right-2 top-1/2 -translate-y-1/2 z-10 rounded-full p-2 bg-black/30 text-white backdrop-blur-sm transition-opacity",
              !nextBtnEnabled && "opacity-0 pointer-events-none"
            )}
            aria-label="Next creator"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-1.5 mt-4">
            {creators.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "w-2 h-2 rounded-full transition-colors",
                  index === selectedIndex ? "bg-primary" : "bg-gray-300"
                )}
                onClick={() => emblaApi?.scrollTo(index)}
                aria-label={`Go to creator ${index + 1}`}
              />
            ))}
          </div>
        </div>
      ) : isMobile && viewMode === 'list' ? (
        /* Mobile list view */
        <div className="space-y-1">
          <AnimatePresence>
            {creators.map((creator) => (
              <CreatorListItem 
                key={creator.name}
                creator={creator}
                onSave={() => handleSaveCreator(creator)}
              />
            ))}
          </AnimatePresence>
        </div>
      ) : (
        /* Desktop standard grid view */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {creators.map((creator) => (
            <CreatorCard
              key={creator.name}
              creator={creator}
              onImageLoad={handleImageLoad}
              loadedImages={loadedImageUrls}
              imageRef={imageRef}
              isSaved={savedCreators.includes(creator.name)}
              onSave={() => handleSaveCreator(creator)}
            />
          ))}
        </div>
      )}
      
      {/* Pull to refresh indicator - would be wired up to real refresh in production */}
      {isMobile && (
        <div className="text-center text-xs text-gray-500 pt-2 pb-4">
          Pull down to refresh results
        </div>
      )}
    </div>
  );
};
