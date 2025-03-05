
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
}

export const BackgroundEffects: React.FC<BackgroundEffectsProps> = ({ 
  className, 
  children,
  blobColors = {
    first: "bg-purple-200",
    second: "bg-indigo-200",
    third: "bg-violet-200"
  },
  blobOpacity = 0.3,
  withSpotlight = true,
  spotlightClassName = "from-purple-500/20 via-violet-500/20 to-blue-500/20",
  pattern = "none",
  baseColor = "bg-white"
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
    >
      {children}
    </GradientBlobBackground>
  );
};

export default BackgroundEffects;
