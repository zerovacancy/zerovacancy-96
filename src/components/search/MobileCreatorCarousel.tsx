
import React, { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Grip } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import { cn } from '@/lib/utils';
import { CreatorCard } from '../creator/CreatorCard';
import type { Creator } from '../creator/types';

interface MobileCreatorCarouselProps {
  creators: Creator[];
  onImageLoad: (imageSrc: string) => void;
  loadedImages: Set<string>;
  imageRef: (node: HTMLImageElement | null) => void;
}

export const MobileCreatorCarousel: React.FC<MobileCreatorCarouselProps> = ({
  creators,
  onImageLoad,
  loadedImages,
  imageRef,
}) => {
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  
  // Optimized carousel settings for mobile
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'keepSnaps',
    loop: false,
    dragFree: true,
    skipSnaps: false
  });

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);
  
  const scrollNext = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    
    // Force a reInit after mount with increased delay for more reliable rendering
    const timer = setTimeout(() => {
      emblaApi.reInit();
      
      // Hide first-time swipe hint after 5 seconds
      setTimeout(() => {
        setIsFirstVisit(false);
      }, 5000);
    }, 500); // Increased delay for more reliable initialization
    
    return () => {
      clearTimeout(timer);
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);
  
  return (
    <div className="w-full relative">
      {/* Swipe instruction for first-time users */}
      {isFirstVisit && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 bg-black/70 text-white px-4 py-2 rounded-full text-sm flex items-center gap-2 backdrop-blur-sm animate-pulse-subtle shadow-md">
          <Grip className="w-4 h-4" />
          <span>Swipe to explore</span>
        </div>
      )}
    
      {/* Enhanced top and bottom padding for better spacing */}
      <div className="w-full overflow-hidden pt-8 pb-14" ref={emblaRef}>
        <div className="flex gap-6"> {/* Increased gap between slides */}
          {creators.map((creator, index) => (
            <div 
              key={creator.name} 
              className="min-w-[85%] w-[85%] pl-4 pr-5 h-full" // Improved horizontal padding
            >
              <div className="h-[calc(100%+30px)]"> {/* Consistent card height */}
                <CreatorCard
                  creator={creator}
                  onImageLoad={onImageLoad}
                  loadedImages={loadedImages}
                  imageRef={imageRef}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows repositioned with improved styling */}
      <button
        onClick={scrollPrev}
        className={cn(
          "absolute left-1 top-[45%] -translate-y-1/2 z-10 rounded-full p-3 bg-black/60 text-white backdrop-blur-sm transition-all", // Larger button with better contrast
          "hover:bg-black/80 active:scale-95 duration-200 touch-manipulation",
          "shadow-lg", // Enhanced shadow
          !prevBtnEnabled && "opacity-0 pointer-events-none"
        )}
        aria-label="Previous creator"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={scrollNext}
        className={cn(
          "absolute right-1 top-[45%] -translate-y-1/2 z-10 rounded-full p-3 bg-black/60 text-white backdrop-blur-sm transition-all", // Larger button with better contrast
          "hover:bg-black/80 active:scale-95 duration-200 touch-manipulation",
          "shadow-lg", // Enhanced shadow
          !nextBtnEnabled && "opacity-0 pointer-events-none"
        )}
        aria-label="Next creator"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Enhanced Dots Indicator - larger and more visible */}
      <div className="flex justify-center gap-2 absolute bottom-0 left-0 right-0 mb-2">
        {creators.map((_, index) => (
          <button
            key={index}
            className={cn(
              "transition-all duration-200 touch-manipulation rounded-full shadow-sm",
              index === selectedIndex 
                ? "bg-indigo-600 w-4 h-4" // Larger active dot
                : "bg-gray-300 hover:bg-gray-400 w-3 h-3" // Larger inactive dot
            )}
            onClick={() => emblaApi?.scrollTo(index)}
            aria-label={`Go to creator ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
