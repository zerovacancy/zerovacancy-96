
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { PricingCard, PricingCardProps } from "./PricingCard";
import { ShineBorder } from "@/components/ui/shine-border";
import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PricingCardListProps {
  cards: Omit<PricingCardProps, 'subscription' | 'isLoading'>[];
  subscription: any;
  isLoading: boolean;
}

export const PricingCardList = ({ cards, subscription, isLoading }: PricingCardListProps) => {
  const isMobile = useIsMobile();
  const [activeIndex, setActiveIndex] = useState(1); // Default to Professional tier
  const containerRef = useRef<HTMLDivElement>(null);
  
  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'left' && activeIndex < cards.length - 1) {
      setActiveIndex(activeIndex + 1);
    } else if (direction === 'right' && activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  useEffect(() => {
    if (isMobile && containerRef.current) {
      const scrollAmount = activeIndex * containerRef.current.offsetWidth;
      containerRef.current.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  }, [activeIndex, isMobile]);
  
  // Handle touch events for swiping
  useEffect(() => {
    if (!isMobile || !containerRef.current) return;
    
    let startX: number;
    let currentX: number;
    
    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      currentX = e.touches[0].clientX;
    };
    
    const handleTouchEnd = () => {
      const diff = startX - currentX;
      // Threshold to determine swipe (40px)
      if (Math.abs(diff) > 40) {
        if (diff > 0) {
          // Swipe left
          handleSwipe('left');
        } else {
          // Swipe right
          handleSwipe('right');
        }
      }
    };
    
    const container = containerRef.current;
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: true });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isMobile, handleSwipe]);

  return (
    <div className="relative">
      {/* Enhanced mobile pagination indicators */}
      {isMobile && (
        <div className="flex justify-center items-center mb-4 space-x-2">
          {cards.map((card, index) => (
            <button
              key={`indicator-${card.title}`}
              className={cn(
                "transition-all duration-300",
                activeIndex === index ? 
                  "w-8 h-2 rounded-full" : 
                  "w-2 h-2 rounded-full bg-opacity-40",
                activeIndex === index ? 
                  index === 0 ? "bg-blue-500" : 
                  index === 1 ? "bg-violet-500" : 
                  "bg-emerald-500" : 
                "bg-gray-300"
              )}
              onClick={() => setActiveIndex(index)}
              aria-label={`View ${card.title} plan`}
            />
          ))}
        </div>
      )}

      {/* Improved mobile navigation arrows */}
      {isMobile && (
        <>
          {activeIndex > 0 && (
            <button 
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 rounded-full p-2 shadow-md"
              onClick={() => handleSwipe('right')}
              aria-label="Previous plan"
            >
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            </button>
          )}
          {activeIndex < cards.length - 1 && (
            <button 
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 rounded-full p-2 shadow-md"
              onClick={() => handleSwipe('left')}
              aria-label="Next plan"
            >
              <ChevronRight className="w-4 h-4 text-gray-600" />
            </button>
          )}
        </>
      )}

      {/* Pricing Cards Container */}
      <div 
        ref={containerRef}
        className={cn(
          isMobile 
            ? "flex overflow-x-hidden snap-x snap-mandatory scrollbar-hide scroll-container-optimized" 
            : "grid gap-6 md:gap-8 lg:grid-cols-3 sm:grid-cols-2"
        )}
        style={isMobile ? { scrollbarWidth: 'none', msOverflowStyle: 'none' } : undefined}
      >
        {cards.map((card, index) => (
          <div
            key={card.title}
            className={cn(
              isMobile 
                ? "min-w-full flex-shrink-0 snap-center px-1" 
                : "",
              card.highlighted && !isMobile ? "lg:scale-105 lg:-translate-y-2 z-10" : ""
            )}
          >
            <PricingCard 
              {...card}
              subscription={subscription}
              isLoading={isLoading}
              defaultExpanded={isMobile ? index === activeIndex : card.highlighted}
              mobileBorder={true}
            />
          </div>
        ))}
      </div>
      
      {/* Mobile swipe instruction - more prominent */}
      {isMobile && (
        <div className="text-center text-gray-500 mt-3 flex items-center justify-center bg-gray-50 rounded-full py-1.5 mx-auto w-auto px-4 shadow-sm text-xs">
          <ChevronLeft className="h-3 w-3 mr-1 opacity-70" />
          <span>Swipe to compare plans</span>
          <ChevronRight className="h-3 w-3 ml-1 opacity-70" />
        </div>
      )}
    </div>
  );
};
