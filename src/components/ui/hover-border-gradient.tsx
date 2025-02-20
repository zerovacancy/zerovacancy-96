
import { cn } from "@/lib/utils";
import React from "react";

interface HoverBorderGradientProps {
  className?: string;
  children: React.ReactNode;
}

export const HoverBorderGradient: React.FC<HoverBorderGradientProps> = ({
  className,
  children,
}) => {
  return (
    <div
      className={cn(
        "group relative rounded-lg p-px",
        "before:absolute before:inset-0",
        "before:rounded-lg before:bg-gradient-to-r",
        "before:from-rose-500 before:via-cyan-500 before:to-indigo-500",
        "before:opacity-0 before:transition-opacity",
        "before:hover:opacity-100",
        className
      )}
    >
      {children}
    </div>
  );
};
