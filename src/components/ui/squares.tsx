
"use client";

import { cn } from "@/lib/utils";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { BorderBeam } from "@/components/ui/border-beam";
import { AnimatedGrid, type AnimatedGridProps } from "@/components/ui/animated-grid";

export interface SquaresProps extends AnimatedGridProps {}

export function Squares(props: SquaresProps) {
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
      <AnimatedGrid {...props} />
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
