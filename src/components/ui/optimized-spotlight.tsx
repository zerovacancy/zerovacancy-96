
'use client';
import React, { useRef, useState, useEffect } from 'react';
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

  // Performance optimization: Only set up intersection observer once on mount
  useEffect(() => {
    if (containerRef.current) {
      const parent = containerRef.current.parentElement;
      if (parent) {
        parent.style.position = 'relative';
        parent.style.overflow = 'hidden';
        setParentElement(parent);
        
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              setIsVisible(entry.isIntersecting);
            });
          },
          { threshold: 0.1 }
        );
        
        observer.observe(parent);
        return () => observer.disconnect();
      }
    }
  }, []);

  // Only set up event listeners if the element is visible
  useEffect(() => {
    if (!parentElement || !isVisible) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Use requestAnimationFrame for smoother performance
      requestAnimationFrame(() => {
        const { left, top } = parentElement.getBoundingClientRect();
        setPosition({
          x: e.clientX - left - size / 2,
          y: e.clientY - top - size / 2
        });
      });
    };

    parentElement.addEventListener('mousemove', handleMouseMove);
    parentElement.addEventListener('mouseenter', () => setIsHovered(true));
    parentElement.addEventListener('mouseleave', () => setIsHovered(false));

    return () => {
      parentElement.removeEventListener('mousemove', handleMouseMove);
      parentElement.removeEventListener('mouseenter', () => setIsHovered(true));
      parentElement.removeEventListener('mouseleave', () => setIsHovered(false));
    };
  }, [parentElement, isVisible, size]);

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
        willChange: 'transform, opacity' // Hint to the browser about what will animate
      }}
    />
  );
}

export default OptimizedSpotlight;
