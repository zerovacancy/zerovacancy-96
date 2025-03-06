
import { useState } from "react";
import { features } from "./feature-data";
import { FeatureItem } from "./FeatureItem";
import { FeatureHeader } from "./FeatureHeader";
import { BackgroundEffects } from "./BackgroundEffects";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

export function FeaturesSectionWithHoverEffects() {
  const isMobile = useIsMobile();
  const [showAllCards, setShowAllCards] = useState(false);
  
  const toggleShowAllCards = () => {
    setShowAllCards(prev => !prev);
    // Add haptic feedback if supported
    if (window.navigator.vibrate) {
      window.navigator.vibrate(50);
    }
  };
  
  // On mobile, initially show only first 2.5 cards
  const visibleFeatures = isMobile && !showAllCards 
    ? features.slice(0, 3) 
    : features;
  
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className="relative py-14 sm:py-18 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        <FeatureHeader 
          title="Professional Content Creation Services"
          description="Everything you need to showcase your properties with stunning visuals and engaging content that attracts the right buyers."
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 lg:gap-8">
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
          
          {/* Enhanced mobile gradient overlay with animations */}
          {isMobile && !showAllCards && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute bottom-0 left-0 right-0 h-48 z-20 flex flex-col items-center justify-end pb-6"
              style={{
                background: "linear-gradient(to top, white 20%, rgba(255,255,255,0.95) 60%, rgba(255,255,255,0) 100%)"
              }}
            >
              {/* Enhanced CTA button with animations */}
              <motion.button
                onClick={toggleShowAllCards}
                className="group bg-gradient-to-r from-brand-purple to-brand-purple-medium text-white px-6 py-3.5 rounded-full flex items-center gap-2 shadow-lg hover:shadow-xl active:shadow-md transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <span className="font-medium">View all services</span>
                <ChevronDown className="w-5 h-5 transition-transform group-hover:translate-y-0.5" />
              </motion.button>
              
              {/* Subtle bounce indicator */}
              <motion.div 
                className="mt-3 flex flex-col items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Sparkles className="w-4 h-4 text-brand-purple-medium opacity-60" />
                <p className="text-xs text-slate-500 mt-1">Scroll to explore more</p>
              </motion.div>
            </motion.div>
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
                  className="group border-brand-purple hover:border-brand-purple-medium hover:bg-brand-purple/5 text-brand-purple"
                  onClick={toggleShowAllCards}
                >
                  Show less
                  <ChevronDown className="ml-2 h-4 w-4 rotate-180 transition-transform" />
                </Button>
              ) : (
                <Button 
                  variant="outline" 
                  className="group border-brand-purple hover:border-brand-purple-medium hover:bg-brand-purple/5 text-brand-purple"
                >
                  View all services
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}

export default FeaturesSectionWithHoverEffects;
