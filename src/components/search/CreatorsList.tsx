
import React, { useCallback, useEffect, useState, useRef, memo } from 'react';
import { CreatorCard } from '../creator/CreatorCard';
import { SortMenu } from '../sorting/SortMenu';
import { useIsMobile } from '@/hooks/use-mobile';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

// Memoize individual card to prevent unnecessary re-renders
const MemoizedCreatorCard = memo(CreatorCard);

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
}

export const CreatorsList: React.FC<CreatorsListProps> = ({
  creators,
  sortBy,
  onSort,
  onImageLoad,
  loadedImages,
  imageRef,
}) => {
  const isMobile = useIsMobile();
  const [loadedImageUrls, setLoadedImageUrls] = useState<Set<string>>(new Set());
  const listRef = useRef<HTMLDivElement>(null);
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  
  // Initialize embla carousel with better performance settings 
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    loop: false,
    dragFree: false,
    skipSnaps: true,
    // Improve touch device performance
    inViewThreshold: 0.7
  });

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  // Setup intersection observer for virtualization - only render items in view
  useEffect(() => {
    if (!listRef.current || isMobile) return;
    
    // Initialize with first few items visible
    setVisibleItems([0, 1, 2, 3, 4, 5]);
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = Number(entry.target.getAttribute('data-index'));
          
          if (entry.isIntersecting) {
            setVisibleItems(prev => {
              if (!prev.includes(id)) {
                return [...prev, id];
              }
              return prev;
            });
          }
        });
      },
      { rootMargin: '300px' }
    );
    
    // Observe placeholder elements for each creator
    listRef.current.querySelectorAll('.creator-placeholder').forEach(el => {
      observer.observe(el);
    });
    
    return () => {
      observer.disconnect();
    };
  }, [isMobile, creators.length]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    
    // Optimize reflows by adding short delay after mount
    const timer = setTimeout(() => {
      emblaApi.reInit();
    }, 100);
    
    return () => {
      clearTimeout(timer);
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);
  
  const handleImageLoad = useCallback((imageSrc: string) => {
    setLoadedImageUrls(prev => {
      const updated = new Set(prev);
      updated.add(imageSrc);
      return updated;
    });
    
    if (onImageLoad) {
      onImageLoad(imageSrc);
    }
  }, [onImageLoad]);
  
  const sortOptions = [
    { label: 'Rating', value: 'rating' },
    { label: 'Price: Low to High', value: 'price_asc' },
    { label: 'Price: High to Low', value: 'price_desc' },
    { label: 'Distance', value: 'distance' }
  ];

  return (
    <div className="w-full space-y-2 sm:space-y-6">
      {/* Sort menu div - completely removed for now */}
      {false && (
        <div className={cn(
          "w-full",
          isMobile ? "flex justify-start pl-4" : "flex justify-end"
        )}>
          <SortMenu 
            options={sortOptions}
            onSort={onSort}
            defaultValue={sortBy}
          />
        </div>
      )}

      {isMobile ? (
        <div className="w-full relative">
          <div className="w-full overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {creators.map((creator, index) => (
                <div 
                  key={creator.name} 
                  className="min-w-[90%] w-[90%] pl-2 pr-2"
                >
                  <MemoizedCreatorCard
                    creator={creator}
                    onImageLoad={handleImageLoad}
                    loadedImages={loadedImageUrls}
                    imageRef={imageRef}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows - only render when needed */}
          {prevBtnEnabled && (
            <button
              onClick={scrollPrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 rounded-full p-2 bg-black/30 text-white backdrop-blur-sm transition-opacity"
              aria-label="Previous creator"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
          {nextBtnEnabled && (
            <button
              onClick={scrollNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 rounded-full p-2 bg-black/30 text-white backdrop-blur-sm transition-opacity"
              aria-label="Next creator"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}

          {/* Dots Indicator - using transforms instead of opacity for better performance */}
          <div className="flex justify-center gap-1.5 mt-4">
            {creators.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "w-2 h-2 rounded-full transition-transform",
                  index === selectedIndex ? "bg-primary scale-125" : "bg-gray-300"
                )}
                onClick={() => emblaApi?.scrollTo(index)}
                aria-label={`Go to creator ${index + 1}`}
              />
            ))}
          </div>
        </div>
      ) : (
        <div ref={listRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {creators.map((creator, index) => (
            <div 
              key={creator.name}
              className="creator-placeholder"
              data-index={index}
            >
              {visibleItems.includes(index) && (
                <MemoizedCreatorCard
                  creator={creator}
                  onImageLoad={handleImageLoad}
                  loadedImages={loadedImageUrls}
                  imageRef={imageRef}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Use memo to prevent unnecessary re-renders of the entire list
export default memo(CreatorsList);
