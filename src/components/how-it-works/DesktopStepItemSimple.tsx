
import React from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Step } from './types';

interface DesktopStepItemSimpleProps {
  step: Step;
  index: number;
  isCompleted: boolean;
}

const DesktopStepItemSimple: React.FC<DesktopStepItemSimpleProps> = ({ 
  step, 
  index, 
  isCompleted 
}) => {
  return (
    <div 
      className={cn(
        "relative h-full bg-white min-h-[200px] px-5 py-6 rounded-lg",
        "transition-all duration-300 group cursor-pointer",
        "border border-gray-100 active:scale-[0.98]",
        "touch-manipulation shadow-sm hover:shadow-md",
        "flex flex-col items-center justify-start animate-fade-in",
        `animation-delay-${index * 200}`
      )}
      aria-label={`Step ${index + 1}: ${step.title}`}
    >
      {/* Step Number badge */}
      <div className={cn("absolute -top-3 left-5", "z-10")}>
        <span 
          className={cn(
            "inline-flex items-center justify-center",
            "w-7 h-7 rounded-full text-xs font-medium",
            "ring-2 ring-white shadow-sm animate-scale-in",
            `animation-delay-${index * 200 + 300}`,
            step.numberClass
          )}
        >
          {step.number}
          
          {/* Completed checkmark */}
          {isCompleted && (
            <div className="absolute -right-1 -top-1 bg-white rounded-full p-0.5 shadow-sm">
              <Check className="w-2.5 h-2.5 text-green-500" />
            </div>
          )}
        </span>
      </div>
      
      {/* Icon with animated background */}
      <div 
        className={cn(
          "mb-4 rounded-lg p-3 transition-all duration-300",
          "group-hover:scale-105 group-hover:shadow-sm shadow-sm",
          step.iconClass
        )}
      >
        {React.cloneElement(step.icon as React.ReactElement, {
          className: "w-6 h-6"
        })}
      </div>
      
      {/* Title */}
      <h4 
        className={cn(
          "text-sm sm:text-base font-semibold text-gray-900 mb-2 text-center line-clamp-1",
          "animate-fade-in",
          `animation-delay-${index * 100 + 500}`
        )}
      >
        {step.title}
      </h4>
      
      {/* Description */}
      <p 
        className={cn(
          "text-xs sm:text-sm text-gray-600 leading-relaxed text-center",
          "animate-fade-in",
          `animation-delay-${index * 100 + 700}`
        )}
      >
        {step.description}
      </p>
      
      {/* Subtle visual indicator of clickability */}
      <div className={cn(
        "absolute bottom-3 right-3 w-5 h-5",
        "flex items-center justify-center rounded-full",
        "opacity-0 group-hover:opacity-70 transition-opacity duration-300",
        step.numberClass
      )}>
        <ArrowRight className="w-3 h-3 text-white" />
      </div>
    </div>
  );
};

export default DesktopStepItemSimple;
