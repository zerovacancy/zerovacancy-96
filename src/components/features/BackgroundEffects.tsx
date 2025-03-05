
import React from 'react';
import { GradientBlobBackground } from '@/components/ui/gradient-blob-background';
import { cn } from '@/lib/utils';

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
}

export const BackgroundEffects: React.FC<BackgroundEffectsProps> = ({ 
  className, 
  children,
  blobColors = {
    first: "bg-purple-100",
    second: "bg-indigo-100",
    third: "bg-violet-100"
  },
  blobOpacity = 0.12, // Even more subtle opacity
  withSpotlight = true,
  spotlightClassName = "from-purple-500/5 via-violet-500/5 to-blue-500/5", // Very subtle spotlight
  pattern = "none",
  baseColor = "bg-white/80", // Slightly transparent white to allow blobs to show through
  animationSpeed = 'slow'
}) => {
  return (
    <GradientBlobBackground 
      className={cn("overflow-visible", className)}
      blobColors={blobColors}
      blobOpacity={blobOpacity}
      withSpotlight={withSpotlight}
      spotlightClassName={spotlightClassName}
      pattern={pattern}
      baseColor={baseColor}
      blobSize="large" // Larger blobs create more subtle transitions
      animationSpeed={animationSpeed}
    >
      {children}
    </GradientBlobBackground>
  );
};

export default BackgroundEffects;
