
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { BadgeCheck } from 'lucide-react';

export interface StepColor {
  iconBg: string;
  iconText: string;
  numBg: string;
  numText: string;
  lineColor: string;
  borderColor: string;
  glowColor: string;
  tintBg: string;
}

export interface StepProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  number: string;
  index: number;
  stepColor: StepColor;
  isCompleted?: boolean;
}

export const StepItem: React.FC<StepProps> = ({
  icon,
  title,
  description,
  number,
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
          duration: 0.8,
          delay: index * 0.2
        }
      }}
      whileHover={{
        scale: 1.02,
        transition: {
          duration: 0.2
        }
      }}
      whileTap={{
        scale: 0.98
      }}
      viewport={{
        once: true,
        margin: "-50px"
      }}
      className={cn(
        "relative bg-white",
        "min-h-[180px] sm:min-h-[200px]",
        "px-6 py-8",
        "rounded-xl",
        "shadow-[0_4px_12px_rgba(0,0,0,0.08)]",
        "transition-all duration-200",
        "group",
        "border border-gray-100",
        "active:scale-[0.98]",
        "touch-manipulation",
        "hover:shadow-[0_6px_16px_rgba(0,0,0,0.12)]",
        "flex flex-col items-center"
      )}
    >
      <div className="flex flex-col items-center justify-start h-full relative w-full">
        {/* Step Number with connecting line */}
        <div className="absolute -left-[3.25rem] top-0 h-full hidden lg:block" aria-hidden="true">
          <motion.span 
            className={cn(
              "absolute -top-2 left-0",
              "w-8 h-8",
              stepColor.numBg,
              stepColor.numText,
              "rounded-full",
              "flex items-center justify-center",
              "text-sm font-medium",
              "ring-4 ring-white",
              "z-10"
            )} 
            initial={{
              scale: 0.8,
              opacity: 0
            }} 
            whileInView={{
              scale: 1,
              opacity: 1,
              transition: {
                type: "spring",
                delay: index * 0.2 + 0.3,
                duration: 0.5
              }
            }} 
            viewport={{
              once: true
            }}
          >
            {isCompleted ? (
              <BadgeCheck className="w-4 h-4" />
            ) : (
              number
            )}
          </motion.span>
          
          {/* Vertical connecting line for all steps with shorter length */}
          <motion.div 
            className={cn(
              "absolute top-7 left-[0.875rem] w-[2px]",
              `h-[calc(50%)] ${stepColor.lineColor} bg-gradient-to-b opacity-70`
            )}
            initial={{
              scaleY: 0
            }} 
            whileInView={{
              scaleY: 1,
              transition: {
                delay: index * 0.2 + 0.4,
                duration: 0.5
              }
            }} 
            viewport={{
              once: true
            }} 
          />
        </div>
        
        {/* Icon with enhanced colorful background */}
        <motion.div 
          className={cn(
            "mb-5",
            stepColor.iconBg,
            stepColor.iconText,
            "transition-all duration-300",
            "rounded-xl p-4",
            "group-hover:saturate-150",
            "relative",
            "overflow-hidden"
          )} 
          whileHover={{
            scale: 1.1
          }} 
          whileTap={{
            scale: 0.95
          }}
        >
          {/* Subtle background animation */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8)_0,transparent_100%)] opacity-0 group-hover:opacity-70 transition-opacity duration-700"></div>
          {React.cloneElement(icon as React.ReactElement, { className: "w-7 h-7 relative z-10" })}
        </motion.div>
        
        <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 text-center line-clamp-1">
          {title}
        </h4>
        <p className="text-sm text-gray-600 leading-relaxed text-center">
          {description}
        </p>
        
        {/* Subtle glow effect on hover - desktop only */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-700">
          <div className={`absolute inset-0 ${stepColor.glowColor} blur-xl opacity-30 scale-90 rounded-xl`}></div>
        </div>
      </div>
    </motion.div>
  );
};
