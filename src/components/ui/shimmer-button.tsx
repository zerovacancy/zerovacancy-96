
"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

const shimmer = {
  initial: { x: "-100%" },
  animate: { x: "100%" },
  transition: {
    repeat: Infinity,
    repeatType: "loop",
    duration: 2,
    ease: "linear",
  },
}

interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  shimmerColor?: string;
  shimmerSize?: string;
  shimmerDuration?: string;
  disabled?: boolean;
}

export const ShimmerButton = React.forwardRef<HTMLButtonElement, ShimmerButtonProps>(
  ({ children, className, shimmerColor = "rgba(255, 255, 255, 0.2)", shimmerSize = "60%", shimmerDuration = "2s", disabled, ...props }, ref) => {
    const [isHovered, setIsHovered] = React.useState(false);

    return (
      <button
        ref={ref}
        className={cn(
          // Base styles
          "relative group/btn overflow-hidden",
          "h-14 sm:h-16", // Increased height by ~15%
          "px-8 sm:px-10", // Increased horizontal padding
          "inline-flex min-w-[200px] max-w-[300px]", // Consistent width constraints
          "items-center justify-center gap-2",
          "rounded-2xl", // More rounded corners
          "font-semibold text-base sm:text-lg", // Bolder font weight
          "transition-all duration-300",
          
          // Background & Shadow
          "bg-gradient-to-r from-[#8e77f3] to-[#D033ED]",
          "shadow-[0_4px_16px_rgba(142,119,243,0.25)]", // Soft drop shadow
          "hover:shadow-[0_6px_20px_rgba(142,119,243,0.35)]",
          "hover:from-[#7b61f1] hover:to-[#c422e3]",
          
          // Interactive States
          "hover:scale-[1.02] active:scale-[0.98]",
          "disabled:opacity-50 disabled:pointer-events-none",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#8e77f3]",
          
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        disabled={disabled}
        {...props}
      >
        <span className="relative z-10 flex items-center gap-2 text-white">
          {children}
        </span>
        
        {/* Shimmer effect */}
        <AnimatePresence>
          {!disabled && (
            <motion.span
              className="absolute inset-0 z-0"
              style={{
                background: `linear-gradient(90deg, transparent 0%, ${shimmerColor} ${shimmerSize}, transparent 100%)`,
              }}
              initial="initial"
              animate="animate"
              variants={shimmer}
              transition={{
                duration: parseInt(shimmerDuration),
                repeat: Infinity,
                repeatType: "loop",
                ease: "linear",
              }}
            />
          )}
        </AnimatePresence>
        
        {/* Hover glow effect */}
        <div className={cn(
          "absolute inset-0 transition-opacity duration-300",
          "bg-gradient-to-r from-[#8e77f3]/20 to-[#D033ED]/20 blur-xl",
          isHovered ? "opacity-100" : "opacity-0"
        )} />
      </button>
    );
  }
);

ShimmerButton.displayName = "ShimmerButton";
