
import { cn } from "@/lib/utils";
import React from "react";

interface GlowingEffectProps {
  className?: string;
  blur?: number;
  spread?: number;
  glow?: boolean;
  variant?: "default" | "primary" | "secondary";
  disabled?: boolean;
  movementDuration?: number;
  borderWidth?: number;
}

export const GlowingEffect: React.FC<GlowingEffectProps> = ({
  className,
  blur = 15,
  spread = 25,
  glow = true,
  variant = "default",
  disabled = false,
  movementDuration = 3,
  borderWidth = 2,
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "primary":
        return "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500";
      case "secondary":
        return "bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500";
      default:
        return "bg-gradient-to-r from-rose-500 via-fuchsia-500 to-indigo-500";
    }
  };

  return (
    <div className={cn("absolute inset-0", className)}>
      <div
        className={cn(
          "absolute inset-px rounded-lg",
          getVariantClasses(),
          !disabled && "animate-border-gradient",
          { "opacity-50": disabled }
        )}
        style={{
          filter: glow ? `blur(${blur}px)` : "none",
          transform: `scale(${1 + spread / 100})`,
          animationDuration: `${movementDuration}s`,
        }}
      />
      <div className="absolute inset-0 rounded-lg bg-black/50 backdrop-blur-xl" />
    </div>
  );
};
