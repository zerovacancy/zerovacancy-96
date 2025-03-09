
import React from 'react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface BackgroundEffectsProps {
  className?: string;
  children?: React.ReactNode;
  baseColor?: string;
  id?: string;
  mobileFullWidth?: boolean;
}

export const BackgroundEffects: React.FC<BackgroundEffectsProps> = ({ 
  className, 
  children,
  baseColor = "bg-white/80",
  id,
  mobileFullWidth = false
}) => {
  const isMobile = useIsMobile();

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
};

export default BackgroundEffects;
