"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
const shimmer = {
  initial: {
    x: "-100%"
  },
  animate: {
    x: "100%"
  },
  transition: {
    repeat: Infinity,
    repeatType: "loop",
    duration: 2,
    ease: "linear"
  }
};
interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  shimmerColor?: string;
  shimmerSize?: string;
  shimmerDuration?: string;
  disabled?: boolean;
  variant?: 'primary' | 'ghost';
}
export const ShimmerButton = React.forwardRef<HTMLButtonElement, ShimmerButtonProps>(({
  children,
  className,
  shimmerColor = "rgba(255, 255, 255, 0.2)",
  shimmerSize = "60%",
  shimmerDuration = "2s",
  disabled,
  variant = 'primary',
  ...props
}, ref) => {
  const [isHovered, setIsHovered] = React.useState(false);
  return <button ref={ref} className={cn(
  // Base styles - Reduced height & width
  "relative group/btn overflow-hidden", "h-11 sm:h-12", "px-6 sm:px-8", "inline-flex min-w-[160px] max-w-[240px]", "items-center justify-center gap-1.5", "rounded-xl", "font-medium text-sm sm:text-base", "transition-all duration-200",
  // Variant styles
  variant === 'primary' && [
  // Primary button styles with new blue gradient
  "bg-gradient-to-r from-[#3182CE] to-[#2C5282]", "text-white", "shadow-[0_2px_8px_rgba(49,130,206,0.25)]", "hover:shadow-[0_4px_12px_rgba(49,130,206,0.35)]", "hover:from-[#2B6CB0] hover:to-[#2C5282]"], variant === 'ghost' && [
  // Ghost button styles
  "bg-transparent", "text-[#3182CE]", "border-2 border-[#3182CE]", "hover:bg-[#3182CE]/5"],
  // Interactive States
  "hover:scale-[1.02] active:scale-[0.98]", "disabled:opacity-50 disabled:pointer-events-none", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#3182CE]",
  // Spacing utilities
  "my-1.5 sm:my-2", className)} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} disabled={disabled} {...props}>
        <span className={cn("relative z-10 flex items-center gap-1.5", variant === 'primary' ? "text-white" : "text-[#3182CE]")}>
          {children}
          {/* Add glow effect to icon on hover */}
          {isHovered && variant === 'primary' && <div className="absolute inset-0 filter blur-sm opacity-50 bg-white" />}
        </span>
        
        {/* Shimmer effect - only for primary variant */}
        <AnimatePresence>
          {!disabled && variant === 'primary' && <motion.span className="absolute inset-0 z-0" style={{
        background: `linear-gradient(90deg, transparent 0%, ${shimmerColor} ${shimmerSize}, transparent 100%)`
      }} initial="initial" animate="animate" variants={shimmer} transition={{
        duration: parseInt(shimmerDuration),
        repeat: Infinity,
        repeatType: "loop",
        ease: "linear"
      }} />}
        </AnimatePresence>
        
        {/* Hover glow effect - adjusted for new blue colors */}
        <div className="" />
      </button>;
});
ShimmerButton.displayName = "ShimmerButton";