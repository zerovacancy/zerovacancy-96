
import React from 'react';
import { Banner } from '@/components/ui/banner';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import { AnimatedShinyText } from '@/components/ui/animated-shiny-text';
import { cn } from '@/lib/utils';

interface PromotionalBannerProps {
  onClose: () => void;
  onTryNowClick: () => void;
  showBanner: boolean;
}

export const PromotionalBanner: React.FC<PromotionalBannerProps> = ({
  onClose,
  onTryNowClick,
  showBanner
}) => {
  if (!showBanner) return null;
  
  return (
    <div className="relative">
      <Banner 
        variant="purple" 
        size="lg" 
        action={
          <Button 
            onClick={onTryNowClick}
            className={cn(
              "gradient-button",
              "flex text-xs sm:text-sm items-center whitespace-nowrap", 
              "px-3 py-2 sm:px-5 sm:py-2.5 min-w-[8rem] sm:min-w-[9rem] min-h-[2.25rem] sm:min-h-[2.5rem]", 
              "font-bold", 
              "border border-white/10", 
              "transition-all duration-200", 
              "touch-manipulation", 
              "shadow-[0_2px_10px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]",
              "focus:outline-none focus:ring-2 focus:ring-white/40 focus:ring-offset-2",
              "before:absolute before:inset-0 before:z-0 before:h-[100%] before:w-[20%]",
              "before:animate-shimmer-slide before:bg-gradient-to-r",
              "before:from-transparent before:via-white/20 before:to-transparent",
              "relative overflow-hidden"
            )}
            aria-label="Get early access to our platform"
          >
            <span className="relative z-10">Get Early Access</span>
          </Button>
        } 
        layout="complex" 
        isClosable 
        onClose={onClose} 
        className="animate-in fade-in slide-in-from-top duration-500 relative overflow-hidden min-h-[3.25rem] sm:min-h-[3.5rem] my-0 py-0"
      >
        <div className="flex items-center justify-left gap-3 sm:gap-4 relative z-10">
          <Star className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-300 animate-pulse" />
          <AnimatedShinyText 
            className={cn(
              "text-sm sm:text-base font-bold inline-block", 
              "text-white relative z-10 rounded", 
              "px-1 tracking-wide"
            )} 
            shimmerWidth={200}
          >
            Join the AI-powered revolution in property management!
          </AnimatedShinyText>
        </div>
      </Banner>
    </div>
  );
};

export default PromotionalBanner;
