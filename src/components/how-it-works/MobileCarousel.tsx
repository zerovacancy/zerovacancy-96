
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Check, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import { Step, stepColors } from './stepsData';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface MobileCarouselProps {
  steps: Step[];
  completedSteps: number[];
  onSkipToSearch: () => void;
}

export const MobileCarousel: React.FC<MobileCarouselProps> = ({ 
  steps, 
  completedSteps,
  onSkipToSearch
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedStep, setExpandedStep] = useState<number | null>(null);
  const [carouselHeight, setCarouselHeight] = useState('auto');
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Handle swipe gestures
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const swipeThreshold = 50; // minimum distance to be considered a swipe

  const updateCarouselHeight = useCallback(() => {
    if (cardRefs.current[activeIndex]) {
      const height = cardRefs.current[activeIndex]?.offsetHeight;
      if (height) {
        setCarouselHeight(`${height}px`);
      }
    }
  }, [activeIndex]);

  useEffect(() => {
    updateCarouselHeight();
    // Add resize listener to update height on window resize
    window.addEventListener('resize', updateCarouselHeight);
    return () => window.removeEventListener('resize', updateCarouselHeight);
  }, [activeIndex, expandedStep, updateCarouselHeight]);

  const handleNext = useCallback(() => {
    setActiveIndex(prev => (prev < steps.length - 1 ? prev + 1 : prev));
    setExpandedStep(null);
    // Add haptic feedback if browser supports it
    if ('vibrate' in navigator) {
      navigator.vibrate(20);
    }
  }, [steps.length]);

  const handlePrev = useCallback(() => {
    setActiveIndex(prev => (prev > 0 ? prev - 1 : prev));
    setExpandedStep(null);
    // Add haptic feedback if browser supports it
    if ('vibrate' in navigator) {
      navigator.vibrate(20);
    }
  }, []);

  // Handle touch events for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > swipeThreshold) {
      // Swipe left, go to next
      handleNext();
    } else if (touchEnd - touchStart > swipeThreshold) {
      // Swipe right, go to prev
      handlePrev();
    }
  };

  const toggleExpand = (index: number) => {
    setExpandedStep(expandedStep === index ? null : index);
    // Add haptic feedback if browser supports it
    if ('vibrate' in navigator) {
      navigator.vibrate(10);
    }
  };

  // Calculate progress percentage for the progress bar
  const progressPercentage = ((activeIndex + 1) / steps.length) * 100;

  return (
    <div className="relative w-full mt-6 mb-12" ref={containerRef}>
      {/* Skip button */}
      <div className="absolute -top-8 right-0 z-10">
        <button 
          onClick={onSkipToSearch}
          className="text-sm font-medium text-violet-600 flex items-center gap-1 px-2 py-1 rounded-full hover:bg-violet-50"
        >
          Skip to Search <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* Progress bar */}
      <div className="h-1 w-full bg-gray-100 rounded-full mb-4">
        <motion.div 
          className="h-full bg-gradient-to-r from-violet-500 to-blue-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Main carousel */}
      <div 
        className="relative overflow-hidden rounded-xl shadow-md"
        style={{ height: carouselHeight }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="absolute inset-0 bg-gray-50/80 backdrop-blur-sm" />
        
        <AnimatePresence mode="wait">
          {steps.map((step, idx) => (
            <motion.div
              key={`step-${idx}`}
              ref={el => (cardRefs.current[idx] = el)}
              className={cn(
                "absolute inset-0 p-4 pb-12",
                "flex flex-col",
                "touch-manipulation",
                "rounded-xl"
              )}
              initial={{ opacity: 0, x: idx > activeIndex ? 300 : -300 }}
              animate={{ 
                opacity: idx === activeIndex ? 1 : 0,
                x: idx === activeIndex ? 0 : (idx > activeIndex ? 300 : -300),
                transition: { duration: 0.3, ease: "easeInOut" }
              }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              style={{ pointerEvents: idx === activeIndex ? 'auto' : 'none' }}
            >
              {/* Card Background with Gradient */}
              <div 
                className={cn(
                  "absolute inset-0 rounded-xl",
                  stepColors[idx].gradient,
                  "opacity-95"
                )}
              />
              
              {/* Card Content */}
              <div className="relative z-10 flex flex-col h-full">
                {/* Number and title row */}
                <div className="flex items-center mb-4">
                  <div className={cn(
                    "w-10 h-10",
                    "rounded-full",
                    "flex items-center justify-center",
                    "text-lg font-bold",
                    "shadow-lg",
                    "border-2 border-white",
                    stepColors[idx].numBg,
                    stepColors[idx].numText,
                    "mr-3"
                  )}>
                    {step.number}
                    
                    {/* Completion checkmark */}
                    {completedSteps.includes(idx) && (
                      <div className="absolute -right-1 -top-1 bg-white rounded-full p-0.5 shadow-sm">
                        <Check className="w-4 h-4 text-green-500" />
                      </div>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-bold text-white">
                    {step.title}
                  </h3>
                </div>
                
                {/* Icon */}
                <motion.div 
                  className={cn(
                    "w-16 h-16 mx-auto mb-4",
                    "rounded-full",
                    "bg-white/90",
                    "flex items-center justify-center",
                    "shadow-lg"
                  )}
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    initial={{ scale: 1 }}
                    animate={{ scale: [1, 1.1, 1], rotate: [0, -5, 0, 5, 0] }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                      repeatDelay: 2
                    }}
                    className={cn(
                      "w-10 h-10",
                      "flex items-center justify-center",
                      stepColors[idx].iconText
                    )}
                  >
                    {React.cloneElement(step.icon as React.ReactElement, {
                      className: "w-8 h-8"
                    })}
                  </motion.div>
                </motion.div>
                
                {/* Description */}
                <div className="text-center mb-4">
                  <p className="text-white/90 text-base font-medium">
                    {step.shortDescription}
                  </p>
                </div>
                
                {/* Expandable detailed content */}
                <div className="mt-auto">
                  <motion.button
                    className={cn(
                      "w-full flex items-center justify-center gap-1",
                      "text-white/90 text-sm font-medium",
                      "py-2 px-4 rounded-lg",
                      "bg-white/20 hover:bg-white/30",
                      "transition-colors"
                    )}
                    onClick={() => toggleExpand(idx)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {expandedStep === idx ? (
                      <>Show Less <ChevronUp className="w-4 h-4" /></>
                    ) : (
                      <>Learn More <ChevronDown className="w-4 h-4" /></>
                    )}
                  </motion.button>
                  
                  <AnimatePresence>
                    {expandedStep === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ 
                          height: "auto", 
                          opacity: 1,
                          transition: { duration: 0.3 } 
                        }}
                        exit={{ 
                          height: 0, 
                          opacity: 0,
                          transition: { duration: 0.2 } 
                        }}
                        className="mt-3 overflow-hidden"
                      >
                        <div className="bg-white/20 rounded-lg p-4 text-white text-sm">
                          {step.detailedDescription}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {/* Navigation controls */}
        <div className="absolute bottom-2 left-0 right-0 flex justify-between px-4 z-20">
          <button
            onClick={handlePrev}
            disabled={activeIndex === 0}
            className={cn(
              "w-10 h-10 rounded-full",
              "flex items-center justify-center",
              "bg-white/80 shadow-md",
              activeIndex === 0 ? "opacity-50 cursor-not-allowed" : "opacity-100"
            )}
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          
          <button
            onClick={handleNext}
            disabled={activeIndex === steps.length - 1}
            className={cn(
              "w-10 h-10 rounded-full",
              "flex items-center justify-center",
              "bg-white/80 shadow-md",
              activeIndex === steps.length - 1 ? "opacity-50 cursor-not-allowed" : "opacity-100"
            )}
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>
      
      {/* Pagination dots */}
      <div className="flex justify-center gap-2 mt-4">
        {steps.map((_, idx) => (
          <button
            key={`dot-${idx}`}
            onClick={() => {
              setActiveIndex(idx);
              setExpandedStep(null);
            }}
            className={cn(
              "w-2.5 h-2.5 rounded-full",
              "transition-all duration-300",
              idx === activeIndex 
                ? cn("bg-violet-600", "w-6") 
                : completedSteps.includes(idx) 
                  ? "bg-green-500" 
                  : "bg-gray-300"
            )}
            aria-label={`Go to step ${idx + 1}`}
          />
        ))}
      </div>
      
      {/* Get Started sticky button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white/95 to-white/60 backdrop-blur-sm z-30">
        <Button 
          variant="primary" 
          size="lg" 
          className="w-full rounded-xl h-14 text-base font-bold"
          onClick={onSkipToSearch}
        >
          Get Started Now
        </Button>
      </div>
    </div>
  );
};
