
import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Step } from './types';

interface MobileStepItemSimpleProps {
  step: Step;
  index: number;
  isCompleted: boolean;
  isActive: boolean;
  onClick: () => void;
}

const MobileStepItemSimple: React.FC<MobileStepItemSimpleProps> = ({ 
  step, 
  index, 
  isCompleted,
  isActive,
  onClick
}) => {
  // Get the border color by extracting from gradient (for non-active state)
  const getBorderColor = () => {
    // Extract the primary color from gradient for border
    const color = step.gradientFrom || '#8B5CF6';
    return color + '33'; // Add 33 for ~20% opacity
  };

  // Get the subtle background tint based on the step's theme color
  const getBackgroundTint = () => {
    // Extract the primary color and make it extremely subtle (5% opacity)
    const color = step.gradientFrom || '#8B5CF6';
    return color + '0D'; // Add 0D for ~5% opacity
  };

  return (
    <div 
      onClick={onClick}
      className={cn(
        "relative p-4 sm:p-5 transition-all",
        "flex flex-col h-full min-h-[140px] touch-manipulation",
        "duration-200 cursor-pointer animate-fade-in",
        `animation-delay-${index * 100}`,
        "active:scale-[0.98]"
      )}
      style={{
        // Dynamic styling for each card
        borderColor: isActive ? step.gradientFrom : getBorderColor(),
        borderWidth: isActive ? '2px' : '1px',
        borderLeftWidth: isActive ? '4px' : '2px',
        borderStyle: 'solid',
        borderRadius: '12px',
        backgroundColor: getBackgroundTint(),
        boxShadow: isActive 
          ? '0 4px 14px rgba(0,0,0,0.08)'
          : '0 2px 10px rgba(0,0,0,0.05)',
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.1)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.boxShadow = isActive 
          ? '0 4px 14px rgba(0,0,0,0.08)'
          : '0 2px 10px rgba(0,0,0,0.05)';
      }}
    >
      {/* Circle Number Badge with gradient */}
      <div className="absolute -top-3 -left-1">
        <div className={cn(
          "w-7 h-7 rounded-full flex items-center justify-center",
          "text-sm font-medium shadow-md ring-2 ring-white",
          step.gradientClass || step.numberClass
        )}>
          {index + 1}
          
          {/* Completed checkmark */}
          {isCompleted && (
            <div className="absolute -right-1 -top-1 bg-white rounded-full p-0.5 shadow-sm">
              <Check className="w-3 h-3 text-green-500" />
            </div>
          )}
        </div>
      </div>
      
      {/* Icon and Title in row with more spacing */}
      <div className="flex items-center justify-between mt-3 mb-3">
        <h4 className="text-base font-bold text-gray-900 pr-2 line-clamp-2">
          {step.title}
        </h4>
        
        <div className={cn(
          "rounded-full p-2 ml-2",
          step.gradientClass || step.iconClass
        )}>
          {React.cloneElement(step.icon as React.ReactElement, {
            className: "w-5 h-5"
          })}
        </div>
      </div>
      
      {/* Description with increased font size */}
      <p className="text-sm leading-relaxed text-gray-600 mt-2 mb-2">
        {step.description}
      </p>
      
      {/* Active indicator */}
      {isActive && (
        <div className="absolute bottom-3 right-3 w-2 h-2 rounded-full animate-pulse" style={{
          background: `linear-gradient(${step.gradientDirection || '45deg'}, ${step.gradientFrom || '#8B5CF6'}, ${step.gradientTo || '#6366F1'})`
        }}></div>
      )}
    </div>
  );
};

export default MobileStepItemSimple;
