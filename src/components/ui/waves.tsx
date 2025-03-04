
'use client';

import React, { useRef, useEffect, useState, memo } from 'react';
import { cn } from '@/lib/utils';

type WavesProps = {
  className?: string;
  lineColor?: string;
  backgroundColor?: string;
  xGap?: number;
  yGap?: number;
  waveAmpX?: number;
  waveAmpY?: number;
  waveSpeedX?: number;
  waveSpeedY?: number;
};

// Memoize the component to prevent unnecessary re-renders
export const Waves = memo(({
  className,
  lineColor = 'rgba(0, 0, 0, 0.1)',
  backgroundColor = '#ffffff',
  xGap = 20,
  yGap = 30,
  waveAmpX = 20,
  waveAmpY = 15,
  waveSpeedX = 0.012,
  waveSpeedY = 0.01,
}: WavesProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const timeRef = useRef<number>(0);
  
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
  
  // Use optimized intersection observer
  useEffect(() => {
    if (!containerRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.1, rootMargin: '200px' }
    );
    
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);
  
  // Optimize canvas drawing with requestAnimationFrame
  useEffect(() => {
    if (!canvasRef.current || !isVisible || isReducedMotion) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: false }); // Optimize with alpha: false
    if (!ctx) return;
    
    // Resize handling with debounce for better performance
    let resizeTimeout: ReturnType<typeof setTimeout>;
    const resizeCanvas = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (!canvas.parentElement) return;
        // Use devicePixelRatio for better rendering on high-DPI displays
        const dpr = window.devicePixelRatio || 1;
        canvas.width = canvas.parentElement.offsetWidth * dpr;
        canvas.height = canvas.parentElement.offsetHeight * dpr;
        canvas.style.width = `${canvas.parentElement.offsetWidth}px`;
        canvas.style.height = `${canvas.parentElement.offsetHeight}px`;
        ctx.scale(dpr, dpr);
      }, 250);
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });
    
    // Optimized drawing function
    const drawWave = (timestamp: number) => {
      if (!ctx || !canvas || !isVisible) return;
      
      // Calculate delta time for smooth animation
      timeRef.current += 0.01;
      
      ctx.clearRect(0, 0, canvas.width / (window.devicePixelRatio || 1), canvas.height / (window.devicePixelRatio || 1));
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width / (window.devicePixelRatio || 1), canvas.height / (window.devicePixelRatio || 1));
      
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 1;
      
      // Draw horizontal waves with optimized calculation
      for (let y = yGap; y < canvas.height / (window.devicePixelRatio || 1); y += yGap) {
        ctx.beginPath();
        
        // Optimize by using fewer points on smaller screens
        const step = window.innerWidth > 768 ? 1 : 2;
        const width = canvas.width / (window.devicePixelRatio || 1);
        
        for (let x = 0; x < width; x += step) {
          const angle = (x * waveSpeedX) + timeRef.current;
          const yOffset = Math.sin(angle) * waveAmpY;
          
          if (x === 0) {
            ctx.moveTo(x, y + yOffset);
          } else {
            ctx.lineTo(x, y + yOffset);
          }
        }
        ctx.stroke();
      }
      
      // Draw vertical waves with optimized calculation
      for (let x = xGap; x < canvas.width / (window.devicePixelRatio || 1); x += xGap) {
        ctx.beginPath();
        
        // Optimize by using fewer points on smaller screens
        const step = window.innerWidth > 768 ? 1 : 2;
        const height = canvas.height / (window.devicePixelRatio || 1);
        
        for (let y = 0; y < height; y += step) {
          const angle = (y * waveSpeedY) + timeRef.current;
          const xOffset = Math.sin(angle) * waveAmpX;
          
          if (y === 0) {
            ctx.moveTo(x + xOffset, y);
          } else {
            ctx.lineTo(x + xOffset, y);
          }
        }
        ctx.stroke();
      }
      
      if (isVisible && !isReducedMotion) {
        animationRef.current = requestAnimationFrame(drawWave);
      }
    };
    
    animationRef.current = requestAnimationFrame(drawWave);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      clearTimeout(resizeTimeout);
    };
  }, [
    lineColor,
    backgroundColor,
    xGap,
    yGap,
    waveAmpX,
    waveAmpY,
    waveSpeedX,
    waveSpeedY,
    isVisible,
    isReducedMotion,
  ]);
  
  // If reduced motion is preferred, render a static version
  if (isReducedMotion) {
    return (
      <div ref={containerRef} className={cn('absolute inset-0 overflow-hidden', className)}>
        <div className="absolute inset-0" style={{ backgroundColor, opacity: 0.1 }} />
      </div>
    );
  }
  
  return (
    <div ref={containerRef} className={cn('absolute inset-0 overflow-hidden', className)}>
      {isVisible && (
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 w-full h-full"
          aria-hidden="true"
          style={{ transform: 'translateZ(0)' }} // Force GPU acceleration
        />
      )}
    </div>
  );
});

Waves.displayName = 'Waves';
