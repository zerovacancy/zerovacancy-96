
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'tertiary';
}

export const ShimmerButton = React.forwardRef<HTMLButtonElement, ShimmerButtonProps>(({
  children,
  className,
  disabled,
  variant = 'primary',
  ...props
}, ref) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          base: [
            "bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600",
            "text-white",
            "shadow-[0_4px_12px_rgba(79,70,229,0.2)]",
            "hover:shadow-[0_6px_20px_rgba(79,70,229,0.3)]",
            "hover:from-purple-700 hover:via-blue-700 hover:to-cyan-700",
          ]
        };
      case 'secondary':
        return {
          base: [
            "bg-white",
            "text-gray-900",
            "border-2 border-gray-200",
            "hover:bg-gray-50 hover:border-gray-300",
            "shadow-sm hover:shadow"
          ]
        };
      case 'tertiary':
        return {
          base: [
            "bg-gray-50/50",
            "text-gray-700",
            "border border-gray-200",
            "hover:bg-gray-100/70 hover:text-gray-900"
          ]
        };
      default:
        return {
          base: []
        };
    }
  };

  const variantStyles = getVariantStyles();
  
  return (
    <button 
      ref={ref}
      className={cn(
        // Base styles
        "relative group/btn overflow-hidden",
        "h-12 px-6", // Increased height for better desktop presence
        "inline-flex items-center justify-center gap-2",
        "rounded-lg",
        "font-medium text-base",
        "transition-all duration-200",
        
        // Interactive States
        "hover:scale-[1.02] active:scale-[0.98]",
        "disabled:opacity-50 disabled:pointer-events-none",
        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500",
        
        // Variant styles
        ...variantStyles.base,
        
        className
      )} 
      disabled={disabled} 
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </button>
  );
});

ShimmerButton.displayName = "ShimmerButton";
