
import React from 'react';
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
  const isMobile = useIsMobile();

  // Always render a simple container for mobile
  if (isMobile) {
    return (
      <div 
        id={id} 
        className={cn("relative w-full", className)}
      >
        <div className={cn("relative", baseColor)}>
          {children}
        </div>
      </div>
    );
  }

  // Desktop version with full effects
  return (
    <div 
      id={id} 
      className={cn("relative w-full", className)}
    >
      <GradientBlobBackground 
        blobColors={blobColors}
        blobOpacity={blobOpacity}
        withSpotlight={withSpotlight}
        spotlightClassName={spotlightClassName}
        pattern={pattern}
        baseColor={baseColor}
        animationSpeed={animationSpeed}
      >
        <div className="relative">
          {children}
        </div>
      </GradientBlobBackground>
    </div>
  );
};

export default BackgroundEffects;
