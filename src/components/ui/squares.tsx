
"use client";

import { cn } from "@/lib/utils";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { BorderBeam } from "@/components/ui/border-beam";
import { AnimatedGrid } from "@/components/ui/animated-grid";
import { useIsMobile } from "@/hooks/use-mobile";

export interface SquaresProps {
  direction?: "right" | "left" | "up" | "down" | "diagonal";
  speed?: number;
  borderColor?: string;
  squareSize?: number;
  hoverFillColor?: string;
  className?: string;
}

export function Squares({
  direction = "right",
  speed = 1,
  borderColor = "#333",
  squareSize = 32,
  hoverFillColor = "#222",
  className
}: SquaresProps) {
  const isMobile = useIsMobile();

  // On mobile, only render a minimal version for performance
  if (isMobile) {
    return (
      <div className="relative w-full h-full rounded-lg overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-white/80 rounded-lg" />
      </div>
    );
  }

  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden">
      <BorderBeam 
        size={300}
        duration={8}
        anchor={90}
        borderWidth={2}
        colorFrom="#ff40aa"
        colorTo="#40ffb3"
        delay={0}
      />
      <AnimatedGrid className={className} />
      <GlowingEffect
        blur={20}
        spread={30}
        glow={true}
        variant="default"
        disabled={false}
        movementDuration={2}
        borderWidth={2}
      />
    </div>
  );
}
