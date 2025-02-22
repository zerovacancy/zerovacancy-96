
"use client";

import React from 'react';
import { ShimmerButton } from './ui/shimmer-button';
import { AuroraBackground } from './ui/aurora-background';
import { Sparkle } from 'lucide-react';
import { cn } from '@/lib/utils';

const CallToActionSection = () => {
  return (
    <AuroraBackground showRadialGradient={false} className="py-10 sm:py-12 lg:py-14">
      <div className="mx-auto max-w-7xl text-center relative z-10 px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-slate-950 dark:text-white">
          Elevate Your Real Estate Marketing Today
        </h2>
        <p className="text-slate-700 dark:text-slate-300 max-w-2xl mx-auto mb-6 sm:mb-8 text-sm sm:text-base lg:text-lg">
          Join thousands of property managers and content creators who trust Luxe Content Connect for their marketing needs
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-lg mx-auto">
          <ShimmerButton
            className={cn(
              "relative group/btn overflow-hidden",
              "w-full sm:w-auto min-w-[200px]",
              "h-12 sm:h-14",
              "text-base sm:text-lg font-medium",
              "px-8 sm:px-12",
              "flex items-center justify-center gap-2 sm:gap-3",
              "bg-gradient-to-r from-[#9b87f5] to-[#D946EF]",
              "hover:from-[#8e77f3] hover:to-[#D033ED]",
              "shadow-lg hover:shadow-xl",
              "transition-all duration-300",
              "hover:scale-[1.02] active:scale-[0.98]"
            )}
            shimmerColor="rgba(255, 255, 255, 0.2)"
            shimmerSize="60%"
            shimmerDuration="2s"
          >
            <span className="relative z-10">Join Waitlist</span>
            <Sparkle className="w-5 h-5 sm:w-6 sm:h-6 text-white/90" />
          </ShimmerButton>
        </div>
      </div>
    </AuroraBackground>
  );
};

export default CallToActionSection;
