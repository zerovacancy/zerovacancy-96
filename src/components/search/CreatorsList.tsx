
import React, { useCallback, useEffect } from 'react';
import { CreatorCard } from '../creator/CreatorCard';
import { SortMenu } from '../sorting/SortMenu';
import { useIsMobile } from '@/hooks/use-mobile';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

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
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: true,
    skipSnaps: false,
    startIndex: 0,
    slidesToScroll: 1,
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
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);
  
  const sortOptions = [
    { label: 'Rating', value: 'rating' },
    { label: 'Price: Low to High', value: 'price_asc' },
    { label: 'Price: High to Low', value: 'price_desc' },
    { label: 'Distance', value: 'distance' }
  ];

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="space-y-6">
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            Featured Creators
          </h2>
          <p className="text-gray-600">
            Browse our top-rated content creators specializing in real estate photography and videography
          </p>
        </div>

        {/* Sort Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center w-full gap-3 sm:gap-4">
          <div className="w-full sm:w-auto">
            <SortMenu 
              options={sortOptions}
              onSort={onSort}
              defaultValue={sortBy}
            />
          </div>
        </div>
      </div>

      {/* Visual Separator */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/80 to-transparent -z-10" />
        <div className="h-px bg-gray-200 w-full" role="separator" />
      </div>

      {/* Creators Grid/Carousel */}
      <div className="pt-4">
        {isMobile ? (
          <div className="relative pt-2 select-none touch-pan-y">
            {/* Carousel Container */}
            <div className="overflow-hidden -mx-4 px-4" ref={emblaRef}>
              <div className="flex transition-transform duration-300 ease-out backface-visible-hidden">
                {creators.map((creator, index) => (
                  <div 
                    key={creator.name} 
                    className="flex-[0_0_80%] min-w-0 pl-4 first:pl-0 transition-opacity duration-300"
                    style={{ opacity: selectedIndex === index ? 1 : 0.5 }}
                  >
                    <CreatorCard
                      creator={creator}
                      onImageLoad={onImageLoad}
                      loadedImages={loadedImages}
                      imageRef={imageRef}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={scrollPrev}
              className={cn(
                "absolute left-0 top-1/2 -translate-y-1/2 z-10",
                "h-12 w-12 flex items-center justify-center",
                "rounded-r-xl bg-gradient-to-r from-black/30 to-transparent",
                "text-white backdrop-blur-sm transition-all duration-200",
                "hover:from-black/40 hover:to-transparent/20",
                !prevBtnEnabled && "opacity-0 pointer-events-none"
              )}
              aria-label="Previous creator"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={scrollNext}
              className={cn(
                "absolute right-0 top-1/2 -translate-y-1/2 z-10",
                "h-12 w-12 flex items-center justify-center",
                "rounded-l-xl bg-gradient-to-l from-black/30 to-transparent",
                "text-white backdrop-blur-sm transition-all duration-200",
                "hover:from-black/40 hover:to-transparent/20",
                !nextBtnEnabled && "opacity-0 pointer-events-none"
              )}
              aria-label="Next creator"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-6 pb-2">
              {creators.map((_, index) => (
                <button
                  key={index}
                  className={cn(
                    "w-2.5 h-2.5 rounded-full transition-all duration-300",
                    "hover:bg-primary/80",
                    index === selectedIndex 
                      ? "bg-primary scale-110" 
                      : "bg-gray-300 hover:bg-gray-400"
                  )}
                  onClick={() => emblaApi?.scrollTo(index)}
                  aria-label={`Go to creator ${index + 1}`}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
            {creators.map((creator) => (
              <CreatorCard
                key={creator.name}
                creator={creator}
                onImageLoad={onImageLoad}
                loadedImages={loadedImages}
                imageRef={imageRef}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
