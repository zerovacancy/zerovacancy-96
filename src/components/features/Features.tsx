
import { useState, useRef, useEffect } from "react";
import { features } from "./feature-data";
import { FeatureHeader } from "./FeatureHeader";
import { BackgroundEffects } from "./BackgroundEffects";
import { AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { FeaturesGrid } from "./FeaturesGrid";
import { MobileViewButton } from "./MobileViewButton";

export function FeaturesSectionWithHoverEffects() {
  const isMobile = useIsMobile();
  const [showAllCards, setShowAllCards] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  // Function to toggle showing all cards
  const toggleShowAllCards = () => {
    setShowAllCards(prev => !prev);
  };
  
  // On mobile, show only first 3 cards (including Video Production)
  const visibleFeatures = isMobile && !showAllCards 
    ? features.slice(0, 3) 
    : features;
  
  return (
    <section 
      ref={sectionRef}
      className="relative py-14 sm:py-18 lg:py-24 px-4 sm:px-6 lg:px-8"
      id="features"
    >
      <div className="absolute inset-0 z-0 opacity-[0.15] bg-gradient-to-b from-violet-50 to-white"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <FeatureHeader 
          title="THE CREATIVE ARSENAL"
          description="Visual weaponry to transform perception and drive desire"
        />
        
        <FeaturesGrid
          features={features}
          visibleFeatures={visibleFeatures}
          isMobile={isMobile}
          showAllCards={showAllCards}
          toggleShowAllCards={toggleShowAllCards}
        />
        
        {/* View all services button (desktop and mobile) - positioned differently on mobile */}
        <AnimatePresence>
          {(!isMobile || (isMobile && !showAllCards)) && (
            <MobileViewButton
              showAllCards={showAllCards}
              toggleShowAllCards={toggleShowAllCards}
              isMobile={isMobile}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

// Export both named and default export for backward compatibility
export default FeaturesSectionWithHoverEffects;
