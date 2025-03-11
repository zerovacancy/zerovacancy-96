
import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface BeamsBackgroundProps {
  className?: string;
  children?: React.ReactNode;
  intensity?: 'subtle' | 'medium' | 'strong';
  beamOpacity?: number;
  pattern?: 'dots' | 'grid' | 'none';
  id?: string;
  baseColor?: string;
  gradientColor?: string;
}

export const BeamsBackground = forwardRef<HTMLDivElement, BeamsBackgroundProps>(({
  className = '',
  children,
  intensity = 'medium',
  beamOpacity,
  pattern = 'none',
  id,
  baseColor = 'bg-white/80',
  gradientColor = 'from-purple-100/30 via-blue-100/30 to-teal-100/20'
}, ref) => {
  // Determine opacity based on intensity
  const getOpacity = () => {
    if (beamOpacity !== undefined) return beamOpacity;
    
    switch (intensity) {
      case 'subtle': return 0.3;
      case 'medium': return 0.5;
      case 'strong': return 0.7;
      default: return 0.5;
    }
  };

  const opacity = getOpacity();

  return (
    <div 
      ref={ref}
      id={id}
      className={cn(
        `relative w-full overflow-visible ${baseColor}`,
        className
      )}
    >
      {/* Pattern background - ensuring they don't create scroll containers */}
      {pattern === 'dots' && (
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-30 overflow-visible"></div>
      )}
      
      {pattern === 'grid' && (
        <div className="absolute inset-0 opacity-20 overflow-visible">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-gray-300" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#smallGrid)" />
          </svg>
        </div>
      )}
      
      {/* Background beams - ensuring they don't create scroll containers */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br ${gradientColor} opacity-${opacity * 100} overflow-visible`}
        style={{ 
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          transform: 'translate3d(0, 0, 0)',
        }}
      ></div>
      
      {/* Content - ensuring it doesn't create scroll containers */}
      <div className="relative z-10 overflow-visible">
        {children}
      </div>
    </div>
  );
});

BeamsBackground.displayName = 'BeamsBackground';

export default BeamsBackground;
