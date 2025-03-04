
import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Step, StepStyle } from './stepsUtils';

interface MobileStepsProps {
  steps: Step[];
  completedSteps: number[];
}

export const MobileSteps: React.FC<MobileStepsProps> = ({ steps, completedSteps }) => {
  return (
    <div className="md:hidden space-y-[14px] relative">
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
            "cursor-pointer"
          )}
        >
          <div className="flex items-start">
            {/* Left side: Number circle with integrated icon */}
            <div className="relative mr-3">
              <div className={cn(
                "w-8 h-8",
                // Safely use iconText if available, otherwise use a default
                step.iconText ? step.iconText.split('-')[1] ? `bg-${step.iconText.split('-')[1]}-500` : "bg-gray-500" : "bg-gray-500", 
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
    </div>
  );
};
