
import React from 'react';
import { GradientBlobBackground } from '@/components/ui/gradient-blob-background';

export const BackgroundEffects: React.FC<{ className?: string }> = ({ className, children }) => {
  return (
    <GradientBlobBackground
      className={className}
      blobColors={{
        first: 'bg-purple-200',
        second: 'bg-indigo-200',
        third: 'bg-blue-200'
      }}
      blobOpacity={0.3}
      pattern="dots"
    >
      {children}
    </GradientBlobBackground>
  );
};

export default BackgroundEffects;
