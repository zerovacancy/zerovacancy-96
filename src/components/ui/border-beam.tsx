
"use client";

import { cn } from "@/lib/utils";
import { useRef, useEffect, useState, memo } from "react";

// Add CSS property definition for offsetDistance if not already present
const setupOffsetProperty = () => {
  // Only run once on client
  if (typeof document !== 'undefined' && !document.querySelector('#offset-distance-style')) {
    const style = document.createElement('style');
    style.id = 'offset-distance-style';
    style.textContent = `
      @property --offset-distance {
        syntax: '<percentage>';
        initial-value: 0%;
        inherits: false;
      }
    `;
    document.head.appendChild(style);
  }
};

export interface BorderBeamProps {
  className?: string
  size?: number
  duration?: number
  borderWidth?: number
  anchor?: number
  colorFrom?: string
  colorTo?: string
  delay?: number
}

// Memoize component to prevent unnecessary re-renders
export const BorderBeam = memo(({
  className,
  size = 200,
  duration = 15,
  anchor = 90,
  borderWidth = 1.5,
  colorFrom = "#ffaa40",
  colorTo = "#9c40ff",
  delay = 0,
}: BorderBeamProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  
  // Setup the offset property once
  useEffect(() => {
    setupOffsetProperty();
  }, []);
  
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
  
  // Use intersection observer to only animate when visible
  useEffect(() => {
    if (!ref.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.1, rootMargin: '100px' }
    );
    
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  
  // If reduced motion is preferred, return a static border
  if (isReducedMotion) {
    return (
      <div 
        className={cn(
          "pointer-events-none absolute inset-0 rounded-[inherit]",
          "[border:calc(var(--border-width)*1px)_solid_transparent]",
          className
        )}
        style={{
          "--border-width": borderWidth,
          borderImage: `linear-gradient(to right, ${colorFrom}, ${colorTo}) 1`,
        } as React.CSSProperties}
      />
    );
  }
  
  if (!isVisible) {
    return (
      <div 
        ref={ref}
        className={cn(
          "pointer-events-none absolute inset-0 rounded-[inherit] opacity-0",
          className
        )}
      />
    );
  }
  
  return (
    <div
      ref={ref}
      style={
        {
          "--size": size,
          "--duration": `${duration}s`,
          "--anchor": anchor,
          "--border-width": borderWidth,
          "--color-from": colorFrom,
          "--color-to": colorTo,
          "--delay": `-${delay}s`,
          // Force hardware acceleration for better performance
          transform: 'translateZ(0)',
        } as React.CSSProperties
      }
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit] [border:calc(var(--border-width)*1px)_solid_transparent]",
        "![mask-clip:padding-box,border-box] ![mask-composite:intersect] [mask:linear-gradient(transparent,transparent),linear-gradient(white,white)]",
        "after:absolute after:aspect-square after:w-[calc(var(--size)*1px)] after:animate-border-beam after:[animation-delay:var(--delay)] after:[background:linear-gradient(to_left,var(--color-from),var(--color-to),transparent)] after:[offset-anchor:calc(var(--anchor)*1%)_50%] after:[offset-path:rect(0_auto_auto_0_round_calc(var(--size)*1px))]",
        "will-change-transform",
        className,
      )}
    />
  );
});

BorderBeam.displayName = "BorderBeam";
