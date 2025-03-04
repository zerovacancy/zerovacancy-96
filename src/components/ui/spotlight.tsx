
'use client';
import React, { useRef, useState, useCallback, useEffect, memo } from 'react';
import { motion, useSpring, useTransform, SpringOptions } from 'framer-motion';
import { cn } from '@/lib/utils';

type SpotlightProps = {
  className?: string;
  size?: number;
  springOptions?: SpringOptions;
};

// Memoize the component to prevent unnecessary re-renders
export const Spotlight = memo(({
  className,
  size = 200,
  springOptions = { bounce: 0 },
}: SpotlightProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [parentElement, setParentElement] = useState<HTMLElement | null>(null);

  // Use useSpring with optimized settings for better performance
  const mouseX = useSpring(0, { ...springOptions, stiffness: 150, damping: 25 });
  const mouseY = useSpring(0, { ...springOptions, stiffness: 150, damping: 25 });

  const spotlightLeft = useTransform(mouseX, (x) => `${x - size / 2}px`);
  const spotlightTop = useTransform(mouseY, (y) => `${y - size / 2}px`);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    
    const handleMotionPreferenceChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleMotionPreferenceChange);
    return () => {
      mediaQuery.removeEventListener('change', handleMotionPreferenceChange);
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const parent = containerRef.current.parentElement;
    if (parent) {
      parent.style.position = 'relative';
      parent.style.overflow = 'hidden';
      setParentElement(parent);
      
      // Check if element is visible in viewport with optimized observer
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            setIsVisible(entry.isIntersecting);
          });
        },
        { threshold: 0.1, rootMargin: '100px' }
      );
      
      observer.observe(parent);
      return () => observer.disconnect();
    }
  }, []);

  // Optimize mousemove handler with useCallback and throttling
  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (!parentElement || !isVisible || isReducedMotion) return;
      
      // Get cached values for better performance
      const { left, top } = parentElement.getBoundingClientRect();
      mouseX.set(event.clientX - left);
      mouseY.set(event.clientY - top);
    },
    [mouseX, mouseY, parentElement, isVisible, isReducedMotion]
  );

  useEffect(() => {
    if (!parentElement || !isVisible || isReducedMotion) return;

    // Use passive event listeners for better performance
    parentElement.addEventListener('mousemove', handleMouseMove, { passive: true });
    parentElement.addEventListener('mouseenter', () => setIsHovered(true), { passive: true });
    parentElement.addEventListener('mouseleave', () => setIsHovered(false), { passive: true });

    return () => {
      parentElement.removeEventListener('mousemove', handleMouseMove);
      parentElement.removeEventListener('mouseenter', () => setIsHovered(true));
      parentElement.removeEventListener('mouseleave', () => setIsHovered(false));
    };
  }, [parentElement, handleMouseMove, isVisible, isReducedMotion]);

  // Don't render anything if not visible in viewport or reduced motion is preferred
  if (!isVisible || isReducedMotion) return null;

  return (
    <motion.div
      ref={containerRef}
      className={cn(
        'pointer-events-none absolute rounded-full will-change-transform',
        'bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops),transparent_80%)] blur-xl transition-opacity duration-200',
        'from-zinc-50 via-zinc-100 to-zinc-200',
        isHovered ? 'opacity-100' : 'opacity-0',
        className
      )}
      style={{
        width: size,
        height: size,
        left: spotlightLeft,
        top: spotlightTop,
        transform: 'translateZ(0)', // Force GPU acceleration
      }}
    />
  );
});

Spotlight.displayName = 'Spotlight';
