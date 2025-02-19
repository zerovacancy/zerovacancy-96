
"use client";

import React, { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface SpotlightProps {
  className?: string;
  size?: number;
}

export function Spotlight({
  className = "",
  size = 500
}: SpotlightProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const mouseMoveHandler = (event: MouseEvent) => {
    const div = divRef.current;
    if (!div) return;
    
    const rect = div.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    if (div) {
      div.style.setProperty("--x", `${x}px`);
      div.style.setProperty("--y", `${y}px`);
    }
  };

  useEffect(() => {
    const div = divRef.current;
    if (!div) return;

    div.addEventListener("mousemove", mouseMoveHandler);
    return () => {
      div.removeEventListener("mousemove", mouseMoveHandler);
    };
  }, []);

  return (
    <div
      ref={divRef}
      className={cn(
        "absolute inset-0 pointer-events-none",
        "opacity-0 transition-opacity duration-500 hover:opacity-100",
        "[--x:0px] [--y:0px]",
        "[background:radial-gradient(circle_at_var(--x)_var(--y),var(--spotlight-color,rgba(255,255,255,0.125))_0%,transparent_var(--spotlight-size,80%))]",
        className
      )}
      style={{
        '--spotlight-size': `${size}px`
      }}
    />
  );
}
