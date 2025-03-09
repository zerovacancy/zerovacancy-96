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

  return (
    <div 
      ref={containerRef} 
      id={id} 
      className={cn(
        "relative w-full",
        isMobile ? "max-w-[100vw] overflow-hidden" : "overflow-hidden",
        className
      )}
    >
      {isVisible ? (
        <GradientBlobBackground 
          className={cn(
            isMobile ? "max-w-[100vw] overflow-hidden" : "overflow-visible"
          )}
          blobColors={blobColors}
          blobOpacity={blobOpacity}
          withSpotlight={withSpotlight}
          spotlightClassName={spotlightClassName}
          pattern={pattern}
          baseColor={baseColor}
          blobSize="large"
          animationSpeed={animationSpeed}
        >
          <div className={cn(
            isMobile ? "px-3 py-2 mobile-z-fix" : "", 
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
