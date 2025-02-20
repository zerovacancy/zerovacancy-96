
"use client";

import { cn } from "@/lib/utils";
import { BorderBeam } from "@/components/ui/border-beam";

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
    </div>
  );
}
