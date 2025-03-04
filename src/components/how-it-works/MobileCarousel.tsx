
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Check, ChevronRight, ChevronLeft, Search } from 'lucide-react';
import { Step, stepColors } from './stepsData';
import { Button } from '../ui/button';
import { toast } from "sonner";

interface MobileCarouselProps {
  steps: Step[];
  completedSteps: number[];
  onSearchClick: () => void;
}

export const MobileCarousel: React.FC<MobileCarouselProps> = ({ 
  steps, 
  completedSteps,
  onSearchClick 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedStep, setExpandedStep] = useState<number | null>(null);
  const [direction, setDirection] = useState(0);
  const stepsRef = useRef<HTMLDivElement>(null);

  const detailedDescriptions = [
    "Search for creators based on location, service type, and price range. Filter results to find the perfect match for your project needs.",
    "Compare portfolios, ratings, and pricing. Read reviews from other clients to ensure quality. Save your favorites for later comparison.",
    "Schedule a session directly through our platform. Secure payments are processed only after you're satisfied with the delivered work.",
    "Download and review your content. Request revisions if needed. Approve final deliverables and leave feedback for your creator."
  ];

  const handleDragEnd = (e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x > 100) {
      // Swiped right
      handlePrev();
    } else if (info.offset.x < -100) {
      // Swiped left
      handleNext();
    }
  };

  const handleNext = () => {
    if (currentIndex < steps.length - 1) {
      setDirection(1);
      setCurrentIndex(prev => prev + 1);
      setExpandedStep(null);
      
      // Add haptic feedback if available
      if (navigator.vibrate) {
        navigator.vibrate(20);
      }
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(prev => prev - 1);
      setExpandedStep(null);
      
      // Add haptic feedback if available
      if (navigator.vibrate) {
        navigator.vibrate(20);
      }
    }
  };

  const toggleExpand = (index: number) => {
    setExpandedStep(expandedStep === index ? null : index);
    
    // Add haptic feedback if available
    if (navigator.vibrate) {
      navigator.vibrate(15);
    }
  };

  const jumpToStep = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    setExpandedStep(null);
  };

  const handleSearchClick = () => {
    toast.success("Taking you to creator search!");
    onSearchClick();
  };

  return (
    <div className="relative w-full py-4">
      {/* Progress bar */}
      <div className="w-full px-4 mb-4">
        <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-violet-500 via-blue-500 to-purple-600"
            initial={{ width: `${(currentIndex / (steps.length - 1)) * 100}%` }}
            animate={{ width: `${(currentIndex / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>
      
      {/* Skip to search button */}
      <div className="flex justify-end px-4 mb-2">
        <Button 
          variant="tertiary" 
          size="sm"
          className="flex items-center gap-1 text-xs font-medium"
          onClick={handleSearchClick}
        >
          <Search className="h-3 w-3" />
          Skip to Search
        </Button>
      </div>
      
      {/* Carousel */}
      <div 
        className="relative overflow-hidden w-full" 
        ref={stepsRef}
      >
        <div className="relative flex justify-center px-4">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={currentIndex}
              custom={direction}
              initial={{ 
                opacity: 0,
                x: direction > 0 ? 300 : -300
              }}
              animate={{ 
                opacity: 1,
                x: 0,
                transition: { duration: 0.4, type: "spring", damping: 30 }
              }}
              exit={{ 
                opacity: 0,
                x: direction < 0 ? 300 : -300,
                transition: { duration: 0.3 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.7}
              onDragEnd={handleDragEnd}
              className="w-full touch-manipulation will-change-transform"
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => toggleExpand(currentIndex)}
                className={cn(
                  "bg-white rounded-xl overflow-hidden shadow-lg border",
                  "w-full min-h-[180px] touch-manipulation",
                  stepColors[currentIndex].gradient,
                  "p-4 pb-12", // Extra padding at bottom for controls
                  "relative"
                )}
              >
                {/* Colored accent line */}
                <div className={cn(
                  "absolute top-0 left-0 w-full h-1",
                  "bg-gradient-to-r",
                  stepColors[currentIndex].numBg
                )} />
                
                {/* Step number badge */}
                <div className="absolute left-4 -top-3">
                  <div className={cn(
                    "flex items-center justify-center",
                    "w-8 h-8 rounded-full text-white font-bold text-sm",
                    stepColors[currentIndex].numBg,
                    "shadow-md ring-4 ring-white"
                  )}>
                    {currentIndex + 1}
                    
                    {/* Completed checkmark */}
                    {completedSteps.includes(currentIndex) && (
                      <div className="absolute -right-1 -top-1 bg-white rounded-full p-0.5 shadow-sm">
                        <Check className="w-3 h-3 text-green-500" />
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Content */}
                <div className="ml-2 mt-2">
                  {/* Title with icon */}
                  <div className="flex items-center gap-3 mb-3">
                    <motion.div 
                      className={cn(
                        "p-3 rounded-lg",
                        stepColors[currentIndex].iconBg,
                        stepColors[currentIndex].iconText,
                        "shadow-sm"
                      )}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring" }}
                    >
                      {steps[currentIndex].icon}
                    </motion.div>
                    
                    <h3 className="text-lg font-bold text-gray-900">
                      {steps[currentIndex].title}
                    </h3>
                  </div>
                  
                  {/* Description */}
                  <div className={cn(
                    "transition-all duration-300",
                    expandedStep === currentIndex ? "max-h-72" : "max-h-16 overflow-hidden"
                  )}>
                    <p className="text-gray-700 mb-2">
                      {steps[currentIndex].description}
                    </p>
                    
                    {/* Expanded content */}
                    {expandedStep === currentIndex && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-3 text-sm text-gray-600 border-t border-gray-200 pt-3"
                      >
                        <p>{detailedDescriptions[currentIndex]}</p>
                      </motion.div>
                    )}
                  </div>
                  
                  {/* Tap to expand hint */}
                  <motion.div 
                    className="mt-2 text-xs text-gray-500 flex items-center gap-1"
                    animate={{ 
                      opacity: [0.5, 1, 0.5],
                      y: [0, -2, 0] 
                    }}
                    transition={{ 
                      repeat: Infinity,
                      duration: 2
                    }}
                  >
                    {expandedStep === currentIndex ? "Tap to collapse" : "Tap for details"}
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Navigation buttons */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-between px-8 z-10">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center",
              "border border-gray-200 bg-white/90 backdrop-blur-sm shadow-sm",
              currentIndex === 0 ? "opacity-50" : "opacity-100"
            )}
          >
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          </button>
          
          <button
            onClick={handleNext}
            disabled={currentIndex === steps.length - 1}
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center",
              "border border-gray-200 bg-white/90 backdrop-blur-sm shadow-sm",
              currentIndex === steps.length - 1 ? "opacity-50" : "opacity-100"
            )}
          >
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>
      
      {/* Pagination dots */}
      <div className="flex justify-center gap-2 mt-4">
        {steps.map((_, index) => (
          <button
            key={index}
            onClick={() => jumpToStep(index)}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              currentIndex === index 
                ? cn("w-4", stepColors[index].numBg)
                : "bg-gray-300"
            )}
            aria-label={`Go to step ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Get Started button */}
      <motion.div 
        className="mt-6 px-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Button
          variant="primary"
          size="lg"
          className="w-full"
          onClick={handleSearchClick}
        >
          Find Creators Now
        </Button>
      </motion.div>
    </div>
  );
};
