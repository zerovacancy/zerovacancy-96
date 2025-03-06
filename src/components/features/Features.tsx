
import { useState } from "react";
import { features } from "./feature-data";
import { FeatureItem } from "./FeatureItem";
import { FeatureHeader } from "./FeatureHeader";
import { BackgroundEffects } from "./BackgroundEffects";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

export function FeaturesSectionWithHoverEffects() {
  const isMobile = useIsMobile();
  const [showAllCards, setShowAllCards] = useState(false);
  
  // Function to toggle showing all cards
  const toggleShowAllCards = () => {
    setShowAllCards(prev => !prev);
  };
  
  // On mobile, initially show only first 2.5 cards
  const visibleFeatures = isMobile && !showAllCards 
    ? features.slice(0, 3) 
    : features;
  
  return (
    <section className="relative py-14 sm:py-18 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <FeatureHeader 
          title="Professional Content Creation Services"
          description="Everything you need to showcase your properties with stunning visuals and engaging content that attracts the right buyers."
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 lg:gap-8">
          {/* Regular Features */}
          {visibleFeatures.map((feature, index) => (
            <FeatureItem
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              index={index}
              isPopular={feature.isPopular}
              isPartiallyVisible={isMobile && !showAllCards && index === 2}
            />
          ))}
          
          {/* Partial card overlay with View More button (mobile only) */}
          {isMobile && !showAllCards && (
            <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-white via-white/95 to-transparent z-20 flex items-end justify-center pb-6">
              <motion.button
                onClick={toggleShowAllCards}
                className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-5 py-3 rounded-full flex items-center gap-2 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                View all services
                <ChevronDown className="w-4 h-4" />
              </motion.button>
            </div>
          )}
        </div>
        
        {/* View all services button (desktop and expanded mobile) */}
        <AnimatePresence>
          {((!isMobile) || (isMobile && showAllCards)) && (
            <motion.div 
              className="mt-10 sm:mt-12 flex justify-center md:hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              key="view-all-button"
            >
              {isMobile && showAllCards ? (
                <Button 
                  variant="outline" 
                  className="group border-indigo-200 hover:border-indigo-400 hover:bg-indigo-50/50 text-indigo-600"
                  onClick={toggleShowAllCards}
                >
                  Show less
                  <ChevronDown className="ml-2 h-4 w-4 rotate-180 transition-transform" />
                </Button>
              ) : (
                <Button 
                  variant="outline" 
                  className="group border-indigo-200 hover:border-indigo-400 hover:bg-indigo-50/50 text-indigo-600"
                >
                  View all services
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

// Export both named and default export for backward compatibility
export default FeaturesSectionWithHoverEffects;
