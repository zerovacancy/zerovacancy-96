
import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { StepColor } from './StepItem';

interface MobileStepItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
  stepColor: StepColor;
  isCompleted?: boolean;
}

export const MobileStepItem: React.FC<MobileStepItemProps> = ({
  icon,
  title,
  description,
  index,
  stepColor,
  isCompleted = false,
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
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
        transition: { duration: 0.2 }
      }}
      viewport={{ once: true, margin: "-30px" }}
      className={cn(
        "relative bg-white",
        "w-full max-w-[327px] min-h-[100px]", // Reduced height
        "p-4", // Reduced to 16px padding
        "rounded-lg",
        "shadow-[0_2px_4px_rgba(0,0,0,0.05),0_2px_2px_rgba(0,0,0,0.05)]",
        "border border-gray-100",
        stepColor.borderColor,
        "border-l-[3px]", // 3px left border
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
            "w-8 h-8", // Slightly smaller (32px)
            stepColor.numBg,
            stepColor.numText,
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
            {isCompleted && (
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
              {title}
            </h4>
            <div className={cn(
              "ml-2", // 8px spacing
              stepColor.iconText
            )}>
              {icon}
            </div>
          </div>
          
          {/* Description with reduced spacing */}
          <p className="text-[14px] text-gray-600 leading-[1.4] mt-1">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};
