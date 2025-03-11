
"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight, Loader2 } from "lucide-react";

interface WaitlistButtonProps {
  isLoading: boolean;
}

export function WaitlistButton({ isLoading }: WaitlistButtonProps) {
  return (
    <Button 
      type="submit" 
      className={cn(
        "gradient-button",
        "flex items-center justify-center",
        "whitespace-nowrap",
        "shadow-lg hover:shadow-xl",
        "transition-all duration-300",
        "relative overflow-hidden",
        "group",
        "w-full sm:w-[210px]",
        "rounded-xl",
        "h-[50px] sm:h-[52px]",
        "text-white",
        "font-medium",
        "px-4 sm:px-5",
        "focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
        "after:absolute after:inset-0 after:bg-gradient-to-r after:from-white/10 after:to-white/10 after:opacity-0 after:animate-pulse after:pointer-events-none group-hover:after:opacity-100"
      )} 
      style={{
        gap: '6px'
      }}
      disabled={isLoading}
      aria-label="Join the waitlist"
    >
      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : (
        <>
          <span className={cn(
            "flex-shrink-0",
            "leading-none",
            "text-sm"
          )}>
            Join Waitlist Now
          </span>
          <ArrowRight className="h-4 w-4 flex-shrink-0 inline-block transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </>
      )}
    </Button>
  );
}
