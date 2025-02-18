
"use client";
import React, { useEffect } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

export const MovingBorder = ({
  children,
  duration = 2000,
  rx = "30%",
  ry = "30%",
  className,
  ...otherProps
}: {
  children: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
  className?: string;
  [key: string]: any;
}) => {
  const pathRef = useRef<SVGPathElement>(null);
  const progress = useMotionValue<number>(0);
  const [isPathReady, setIsPathReady] = React.useState(false);

  useEffect(() => {
    if (pathRef.current) {
      // Ensure the path is valid before starting animations
      const length = pathRef.current.getTotalLength();
      if (length > 0) {
        setIsPathReady(true);
      }
    }
  }, []);

  useAnimationFrame((time) => {
    if (!pathRef.current || !isPathReady) return;
    const length = pathRef.current.getTotalLength();
    if (length) {
      const pxPerMillisecond = length / duration;
      progress.set((time * pxPerMillisecond) % length);
    }
  });

  const x = useTransform(progress, (val) => {
    if (!pathRef.current || !isPathReady) return 0;
    const point = pathRef.current.getPointAtLength(val);
    return point ? point.x : 0;
  });

  const y = useTransform(progress, (val) => {
    if (!pathRef.current || !isPathReady) return 0;
    const point = pathRef.current.getPointAtLength(val);
    return point ? point.y : 0;
  });

  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  // Ensure rx and ry have valid values
  const safeRx = rx || "30%";
  const safeRy = ry || "30%";

  return (
    <div className={cn("absolute inset-0", className)} {...otherProps}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute h-full w-full"
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
      >
        <path
          ref={pathRef}
          d={`
            M ${safeRx},0
            H calc(100% - ${safeRx})
            C 100%,0 100%,0 100%,${safeRy}
            V calc(100% - ${safeRy})
            C 100%,100% 100%,100% calc(100% - ${safeRx}),100%
            H ${safeRx}
            C 0,100% 0,100% 0,calc(100% - ${safeRy})
            V ${safeRy}
            C 0,0 0,0 ${safeRx},0
          `}
          fill="none"
          stroke="transparent"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "inline-block",
          transform,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};
