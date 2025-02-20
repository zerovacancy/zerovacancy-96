
import { motion } from "framer-motion";
import React from "react";
import { cn } from "@/lib/utils";

interface AnimatedGridProps {
  className?: string;
  squares?: number;
  delay?: number;
}

export const AnimatedGrid: React.FC<AnimatedGridProps> = ({
  className,
  squares = 16,
  delay = 0,
}) => {
  const gridSize = Math.sqrt(squares);
  const squareArray = Array.from({ length: squares }, (_, i) => i);

  return (
    <div
      className={cn(
        "grid gap-0.5",
        className
      )}
      style={{
        gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
      }}
    >
      {squareArray.map((i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{
            duration: 2,
            delay: (i % gridSize) * 0.1 + Math.floor(i / gridSize) * 0.1 + delay,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="aspect-square w-full bg-white/10 rounded-sm"
        />
      ))}
    </div>
  );
};
