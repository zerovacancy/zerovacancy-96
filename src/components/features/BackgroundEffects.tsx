
import React, { useRef, useEffect, useState } from 'react';
import { GradientBlobBackground } from '@/components/ui/gradient-blob-background';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface BackgroundEffectsProps {
  className?: string;
  children?: React.ReactNode;
  blobColors?: {
    first?: string;
    second?: string;
    third?: string;
  };
  blobOpacity?: number;
  withSpotlight?: boolean;
  spotlightClassName?: string;
  pattern?: 'dots' | 'grid' | 'none';
  baseColor?: string;
  animationSpeed?: 'slow' | 'medium' | 'fast';
  id?: string;
  mobileFullWidth?: boolean;
}

export const BackgroundEffects: React.FC<BackgroundEffectsProps> = ({ 
  className, 
  children,
  blobColors = {
    first: "bg-purple-100",
    second: "bg-indigo-100",
    third: "bg-violet-100"
  },
  blobOpacity = 0.12,
  withSpotlight = true,
  spotlightClassName = "from-purple-500/5 via-violet-500/5 to-blue-500/5",
  pattern = "none",
  baseColor = "bg-white/80",
  animationSpeed = 'slow',
  id,
  mobileFullWidth = false
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const isMobile = useIsMobile();

  // Only render heavy effects when the component is in view
  useEffect(() => {
    if (!containerRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          // Keep content visible but disable expensive effects when far away
          if (Math.abs(entry.boundingClientRect.top) > window.innerHeight * 2) {
            // We now always keep content visible
            // setIsVisible(false);
          }
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '200px' 
      }
    );
    
    observer.observe(containerRef.current);
    
    // Safety timeout to ensure visibility
    const safetyTimeout = setTimeout(() => {
      setIsVisible(true);
    }, 500);
    
    return () => {
      observer.disconnect();
      clearTimeout(safetyTimeout);
    };
  }, []);

  // On mobile, use much simpler backgrounds with minimal effects
  const mobileProps = {
    blobOpacity: 0.05,
    pattern: 'none' as const,
    withSpotlight: false,
    animationSpeed: 'slow' as const,
    blobSize: 'small' as const
  };

  return (
    <div 
      ref={containerRef} 
      id={id} 
      className={cn(
        "relative w-full overflow-hidden",
        isMobile && "max-w-full",
        className
      )}
    >
      {isVisible ? (
        <GradientBlobBackground 
          className={cn(
            isMobile ? "overflow-hidden" : "overflow-visible"
          )}
          blobColors={blobColors}
          blobOpacity={isMobile ? mobileProps.blobOpacity : blobOpacity}
          withSpotlight={isMobile ? mobileProps.withSpotlight : withSpotlight}
          spotlightClassName={spotlightClassName}
          pattern={isMobile ? mobileProps.pattern : pattern}
          baseColor={baseColor}
          blobSize={isMobile ? mobileProps.blobSize : "large"}
          animationSpeed={isMobile ? mobileProps.animationSpeed : animationSpeed}
        >
          <div className={cn(
            isMobile ? "mobile-z-fix" : "", 
            "relative"
          )}>
            {children}
          </div>
        </GradientBlobBackground>
      ) : (
        // Fallback to ensure content is visible even if effects are disabled
        <div className={cn("relative w-full", baseColor)}>
          <div className={cn(isMobile ? "px-3 py-2" : "")}>
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default BackgroundEffects;
