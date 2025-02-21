
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Star, Sparkle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

const bannerVariants = cva(
  "relative w-full flex items-center justify-between gap-2 overflow-hidden px-3 py-2.5 sm:px-6 sm:py-3", 
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        success: "bg-green-500 text-white",
        warning: "bg-yellow-500 text-white",
        error: "bg-red-500 text-white"
      },
      size: {
        sm: "text-xs",
        default: "text-sm",
        lg: "text-base"
      },
      layout: {
        simple: "justify-center text-center",
        complex: "justify-between items-center"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      layout: "simple"
    }
  }
);

interface BannerProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof bannerVariants> {
  icon?: React.ReactNode;
  action?: React.ReactNode;
  isClosable?: boolean;
  onClose?: () => void;
}

export function Banner({
  className,
  variant,
  size,
  layout,
  icon,
  action,
  isClosable,
  onClose,
  children,
  ...props
}: BannerProps) {
  return (
    <div 
      className={cn(
        bannerVariants({ variant, size, layout }), 
        "min-h-[3.5rem] sm:min-h-[4rem]",
        className
      )} 
      {...props}
    >
      <div className="
        flex items-center justify-center gap-3 sm:gap-4 flex-1
        flex-wrap sm:flex-nowrap
        px-2 sm:px-4
      ">
        <div className="flex items-center gap-2 justify-center text-center whitespace-nowrap">
          {children}
        </div>

        {icon && (
          <span className="flex-shrink-0 animate-pulse">
            {icon}
          </span>
        )}

        {action && (
          <div className="flex-shrink-0">
            {action}
          </div>
        )}
      </div>

      {isClosable && (
        <button 
          onClick={onClose} 
          className="
            flex-shrink-0 ml-2 p-1.5
            hover:bg-white/10 
            rounded-full
            transition-colors duration-200
            focus:outline-none focus:ring-2 focus:ring-white/20
          " 
          aria-label="Close banner"
        >
          <svg 
            className="w-4 h-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M6 18L18 6M6 6l12 12" 
            />
          </svg>
        </button>
      )}
    </div>
  );
}
