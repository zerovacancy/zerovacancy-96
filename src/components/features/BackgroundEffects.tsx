
import React from 'react';

interface BackgroundEffectsProps {
  className?: string;
  children?: React.ReactNode;
}

export const BackgroundEffects: React.FC<BackgroundEffectsProps> = ({ className, children }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default BackgroundEffects;
