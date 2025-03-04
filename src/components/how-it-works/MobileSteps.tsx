
import React, { useRef, useState, TouchEvent } from 'react';
import { motion } from 'framer-motion';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Step, StepStyle } from './stepsUtils';

interface MobileStepsProps {
  steps: Step[];
  completedSteps: number[];
  activeStep: number | null;
  onStepClick: (index: number) => void;
}

export const MobileSteps: React.FC<MobileStepsProps> = ({ 
  steps, 
  completedSteps, 
  activeStep,
  onStepClick 
}) => {
  // For swipe gesture
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  
  // Required minimum swipe distance in pixels
  const minSwipeDistance = 50;
  
  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe && activeStep !== null && activeStep < steps.length - 1) {
      // Swiped left, go to next step
      onStepClick(activeStep + 1);
    } else if (isRightSwipe && activeStep !== null && activeStep > 0) {
      // Swiped right, go to previous step
      onStepClick(activeStep - 1);
    }
    
    // Reset values
    setTouchStart(null);
    setTouchEnd(null);
  };
  
  return (
    <div 
      className="md:hidden space-y-[14px] relative"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Navigation indicator when active step is selected */}
      {activeStep !== null && (
        <div className="flex justify-between items-center px-2 mb-2 text-gray-500 text-sm">
          <button 
            onClick={() => activeStep > 0 ? onStepClick(activeStep - 1) : null}
            className={cn(
              "flex items-center p-1 rounded-full",
              activeStep > 0 ? "text-violet-600 hover:bg-violet-50" : "text-gray-300 cursor-not-allowed"
            )}
            disabled={activeStep <= 0}
          >
            <ChevronLeft size={16} />
            <span className="sr-only">Previous</span>
          </button>
          
          <span className="text-xs">
            Step {activeStep + 1} of {steps.length}
          </span>
          
          <button 
            onClick={() => activeStep < steps.length - 1 ? onStepClick(activeStep + 1) : null}
            className={cn(
              "flex items-center p-1 rounded-full",
              activeStep < steps.length - 1 ? "text-violet-600 hover:bg-violet-50" : "text-gray-300 cursor-not-allowed"
            )}
            disabled={activeStep >= steps.length - 1}
          >
            <ChevronRight size={16} />
            <span className="sr-only">Next</span>
          </button>
        </div>
      )}
      
      {/* Connecting gradient line */}
      <div className="absolute left-[8px] top-0 bottom-0 w-[3px] bg-gradient-to-b from-violet-500 via-blue-500 via-amber-500 to-emerald-500 opacity-60"></div>
      
      {steps.map((step, index) => (
        <motion.div 
          key={index} 
          initial={{
            opacity: 0,
            y: 20
          }} 
          whileInView={{
            opacity: 1,
            y: 0,
            transition: {
              type: "spring",
              duration: 0.6,
              delay: index * 0.15
            }
          }} 
          animate={{
            scale: activeStep === index ? 1.03 : 1,
            boxShadow: activeStep === index 
              ? "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)" 
              : "0 2px 4px rgba(0,0,0,0.05), 0 2px 2px rgba(0,0,0,0.05)",
            borderColor: activeStep === index ? "rgb(124, 58, 237)" : "",
            transition: {
              type: "spring",
              stiffness: 300,
              damping: 20
            }
          }}
          whileTap={{
            scale: 1.02,
            transition: {
              duration: 0.2
            }
          }} 
          viewport={{
            once: true,
            margin: "-30px"
          }} 
          onClick={() => onStepClick(index)}
          className={cn(
            "relative bg-white", 
            "w-full max-w-[327px] min-h-[100px]",
            "p-4",
            "rounded-lg", 
            "shadow-[0_2px_4px_rgba(0,0,0,0.05),0_2px_2px_rgba(0,0,0,0.05)]", 
            "border border-gray-100", 
            (step.iconText ? "" : "border-l-[3px]"),
            "touch-manipulation", 
            "mx-auto", 
            "transition-transform duration-200", 
            activeStep === index ? "border-violet-500 bg-violet-50/20" : "",
            "cursor-pointer"
          )}
        >
          <div className="flex items-start">
            {/* Left side: Number circle with integrated icon */}
            <div className="relative mr-3">
              <div className={cn(
                "w-8 h-8",
                // Fixed styling: Use the correct color based on step index
                index === 0 ? "bg-violet-600" : 
                index === 1 ? "bg-blue-500" : 
                index === 2 ? "bg-amber-600" : 
                index === 3 ? "bg-emerald-600" : 
                "bg-gray-500", 
                "text-white", 
                "rounded-full", 
                "flex items-center justify-center", 
                "text-sm font-medium", 
                "shadow-sm", 
                "relative", 
                "mt-[2px]" // Align with first line of title
              )}>
                <span className="flex items-center justify-center w-full h-full">
                  {index + 1}
                </span>
                
                {/* Completed checkmark */}
                {completedSteps.includes(index) && (
                  <div className="absolute -right-1 -top-1 bg-white rounded-full p-0.5 shadow-sm">
                    <Check className="w-3 h-3 text-green-500" />
                  </div>
                )}
              </div>
            </div>
            
            {/* Content */}
            <div className="flex-1">
              {/* Title with icon next to it */}
              <div className="flex items-center">
                <h4 className="text-[16px] font-semibold text-gray-900">
                  {step.title}
                </h4>
                <div className={cn(
                  "ml-2",
                  step.iconText || "text-gray-500"
                )}>
                  {step.icon}
                </div>
              </div>
              
              {/* Description with reduced spacing */}
              <p className="text-[14px] text-gray-600 leading-[1.4] mt-1">
                {step.description}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
      
      {/* Swipe instruction overlay - only shown when a step is active */}
      {activeStep !== null && (
        <div className="text-center py-2 text-xs text-gray-500 flex items-center justify-center opacity-60">
          <span className="mr-1">Swipe</span>
          <ChevronLeft size={12} className="mx-1" />
          <span className="mx-1">or</span>
          <ChevronRight size={12} className="mx-1" />
          <span className="ml-1">to navigate steps</span>
        </div>
      )}
    </div>
  );
};
