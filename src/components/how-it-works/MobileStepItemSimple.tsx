
import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Step } from './types';

interface MobileStepItemSimpleProps {
  step: Step;
  index: number;
  isCompleted: boolean;
}

const MobileStepItemSimple: React.FC<MobileStepItemSimpleProps> = ({ 
  step, 
  index, 
  isCompleted 
}) => {
  return (
    <div 
      className={cn(
        "relative bg-white p-3 rounded-lg shadow-sm border border-gray-100",
        "flex flex-col h-full min-h-[140px] touch-manipulation transition-all",
        "duration-200 cursor-pointer animate-fade-in",
        `animation-delay-${index * 100}`
      )}
    >
      {/* Circle Number Badge */}
      <div className="absolute -top-2 -left-1">
        <div className={cn(
          "w-6 h-6 rounded-full flex items-center justify-center",
          "text-xs font-medium shadow-sm ring-1 ring-white",
          step.numberClass
        )}>
          {index + 1}
          
          {/* Completed checkmark */}
          {isCompleted && (
            <div className="absolute -right-1 -top-1 bg-white rounded-full p-0.5 shadow-sm">
              <Check className="w-2.5 h-2.5 text-green-500" />
            </div>
          )}
        </div>
      </div>
      
      {/* Icon and Title in row */}
      <div className="flex items-center justify-between mt-1 mb-2">
        <h4 className="text-xs sm:text-sm font-semibold text-gray-900 pr-1">
          {step.title}
        </h4>
        
        <div className={cn(
          "rounded-full p-1",
          step.iconClass
        )}>
          {React.cloneElement(step.icon as React.ReactElement, {
            className: "w-4 h-4"
          })}
        </div>
      </div>
      
      {/* Description */}
      <p className="text-xs leading-tight text-gray-600 mt-auto">
        {step.description}
      </p>
    </div>
  );
};

export default MobileStepItemSimple;
