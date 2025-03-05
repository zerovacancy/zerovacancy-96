
'use client';
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';

type OptimizedSpotlightProps = {
  className?: string;
  size?: number;
};

export function OptimizedSpotlight({
  className,
  size = 200,
}: OptimizedSpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [parentElement, setParentElement] = useState<HTMLElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const positionRef = useRef({ x: 0, y: 0 });

  // Performance optimization: Only set up intersection observer once on mount
  useEffect(() => {
    if (containerRef.current) {
      const parent = containerRef.current.parentElement;
      if (parent) {
        parent.style.position = 'relative';
        parent.style.overflow = 'hidden';
        setParentElement(parent);
        
        // Use IntersectionObserver for performance
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              setIsVisible(entry.isIntersecting);
            });
          },
          { 
            threshold: 0.1,
            rootMargin: '100px' // Preload just before visible
          }
        );
        
        observer.observe(parent);
        return () => {
          observer.disconnect();
          if (frameRef.current) {
            cancelAnimationFrame(frameRef.current);
          }
        };
      }
    }
  }, []);

  // Optimized mouse movement handler with throttling via requestAnimationFrame
  const handleMouseMove = useCallback((e: MouseEvent) => {
    positionRef.current = {
      x: e.clientX,
      y: e.clientY
    };
    
    // Only schedule animation frame if not already pending
    if (!frameRef.current && parentElement) {
      frameRef.current = requestAnimationFrame(() => {
        const { left, top } = parentElement.getBoundingClientRect();
        setPosition({
          x: positionRef.current.x - left - size / 2,
          y: positionRef.current.y - top - size / 2
        });
        frameRef.current = null;
      });
    }
  }, [parentElement, size]);

  // Only set up event listeners if the element is visible
  useEffect(() => {
    if (!parentElement || !isVisible) return;

    const handleEnter = () => setIsHovered(true);
    const handleLeave = () => setIsHovered(false);

    // Use passive event listeners for better performance
    parentElement.addEventListener('mousemove', handleMouseMove, { passive: true });
    parentElement.addEventListener('mouseenter', handleEnter, { passive: true });
    parentElement.addEventListener('mouseleave', handleLeave, { passive: true });

    return () => {
      parentElement.removeEventListener('mousemove', handleMouseMove);
      parentElement.removeEventListener('mouseenter', handleEnter);
      parentElement.removeEventListener('mouseleave', handleLeave);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
  }, [parentElement, isVisible, handleMouseMove]);

  // Don't render anything if not visible in viewport
  if (!isVisible) return null;

  return (
    <div
      ref={containerRef}
      className={cn(
        'pointer-events-none absolute rounded-full bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops),transparent_80%)] blur-xl transition-opacity duration-200',
        'from-zinc-50 via-zinc-100 to-zinc-200',
        isHovered ? 'opacity-100' : 'opacity-0',
        className
      )}
      style={{
        width: size,
        height: size,
        left: position.x,
        top: position.y,
        transform: 'translateZ(0)', // Force hardware acceleration
        willChange: 'transform, opacity', // Hint to the browser about what will animate
        backfaceVisibility: 'hidden',
        perspective: '1000px',
        WebkitFontSmoothing: 'antialiased',
        WebkitBackfaceVisibility: 'hidden',
      }}
    />
  );
}

export default OptimizedSpotlight;
