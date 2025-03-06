
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
  
  // Handle swipe gesture for mobile
  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'left' && activeIndex < cards.length - 1) {
      setActiveIndex(activeIndex + 1);
    } else if (direction === 'right' && activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  // Scroll to active card when it changes on mobile
  useEffect(() => {
    if (isMobile && containerRef.current) {
      const cardWidth = containerRef.current.offsetWidth;
      containerRef.current.scrollTo({
        left: activeIndex * cardWidth,
        behavior: 'smooth'
      });
    }
  }, [activeIndex, isMobile]);

  return (
    <div className="relative">
      {/* Mobile pagination indicators */}
      {isMobile && (
        <div className="flex justify-center items-center mb-4 space-x-4">
          {cards.map((card, index) => (
            <button
              key={`indicator-${card.title}`}
              className={cn(
                "w-8 h-1.5 rounded-full transition-all",
                activeIndex === index ? 
                  index === 0 ? "bg-blue-500" : 
                  index === 1 ? "bg-violet-500" : 
                  "bg-emerald-500" : 
                "bg-gray-200"
              )}
              onClick={() => setActiveIndex(index)}
              aria-label={`View ${card.title} plan`}
            />
          ))}
        </div>
      )}

      {/* Mobile navigation arrows */}
      {isMobile && (
        <>
          {activeIndex > 0 && (
            <button 
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/80 rounded-full p-2 shadow-md transform -translate-x-1/2"
              onClick={() => handleSwipe('right')}
              aria-label="Previous plan"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
          )}
          {activeIndex < cards.length - 1 && (
            <button 
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/80 rounded-full p-2 shadow-md transform translate-x-1/2"
              onClick={() => handleSwipe('left')}
              aria-label="Next plan"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          )}
        </>
      )}

      {/* Pricing Cards Container */}
      <div 
        ref={containerRef}
        className={cn(
          isMobile 
            ? "flex overflow-x-auto snap-x snap-mandatory scrollbar-hide px-1 pb-1 -mx-1" 
            : "grid gap-6 md:gap-8 lg:grid-cols-3 sm:grid-cols-2"
        )}
        style={isMobile ? { scrollbarWidth: 'none', msOverflowStyle: 'none' } : undefined}
      >
        {cards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
            className={cn(
              isMobile 
                ? "min-w-full flex-shrink-0 snap-center" 
                : "",
              card.highlighted && !isMobile ? "lg:scale-105 lg:-translate-y-2 z-10" : ""
            )}
          >
            {card.highlighted ? (
              <ShineBorder 
                borderRadius={24} 
                borderWidth={1.5} 
                duration={10} 
                color={["#9333ea", "#4f46e5", "#7e22ce"]} 
                className="w-full h-full min-w-0"
              >
                <PricingCard 
                  {...card}
                  subscription={subscription}
                  isLoading={isLoading}
                  defaultExpanded={isMobile ? index === activeIndex : card.highlighted}
                  mobileBorder={true}
                />
              </ShineBorder>
            ) : (
              <PricingCard 
                {...card}
                subscription={subscription}
                isLoading={isLoading}
                defaultExpanded={isMobile ? index === activeIndex : false}
                mobileBorder={true}
              />
            )}
          </motion.div>
        ))}
      </div>
      
      {/* Mobile swipe instruction */}
      {isMobile && (
        <div className="text-center text-sm text-gray-500 mt-3 flex items-center justify-center">
          <ChevronLeft className="h-4 w-4 mr-1 opacity-70" />
          <span>Swipe to compare plans</span>
          <ChevronRight className="h-4 w-4 ml-1 opacity-70" />
        </div>
      )}
    </div>
  );
};

