
'use client';
import React from 'react';
import { cn } from '@/lib/utils';

type OptimizedSpotlightProps = {
  className?: string;
  size?: number;
};

export function OptimizedSpotlight({
  className,
  size = 200,
}: OptimizedSpotlightProps) {
  // Completely static version - no event listeners or animations
  return (
    <div
      className={cn(
        'pointer-events-none absolute rounded-full bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops),transparent_80%)]',
        'from-zinc-50 via-zinc-100 to-zinc-200 opacity-0',
        className
      )}
      style={{
        width: size,
        height: size,
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    />
  );
}

export default OptimizedSpotlight;
