
import React from 'react';
import { GradientBlobBackground } from '@/components/ui/gradient-blob-background';

interface BackgroundEffectsProps {
  className?: string;
  children?: React.ReactNode;
}

export const BackgroundEffects: React.FC<BackgroundEffectsProps> = ({ className, children }) => {
  return (
    <GradientBlobBackground
      className={className}
      blobColors={{
        first: 'bg-purple-200',
        second: 'bg-indigo-200',
        third: 'bg-blue-200'
      }}
      blobOpacity={0.3}
      pattern="none"
      baseColor="bg-white"
    >
      {children}
    </GradientBlobBackground>
  );
};

export default BackgroundEffects;
