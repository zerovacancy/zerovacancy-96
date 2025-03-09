
"use client";

import { cn } from "@/lib/utils";

export interface SquaresProps {
  direction?: "right" | "left" | "up" | "down" | "diagonal";
  speed?: number;
  borderColor?: string;
  squareSize?: number;
  hoverFillColor?: string;
  className?: string;
}

export function Squares({
  borderColor = "#333",
  className
}: SquaresProps) {
  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden">
      <div className={cn("border border-gray-200 rounded-lg", className)} />
    </div>
  );
}
