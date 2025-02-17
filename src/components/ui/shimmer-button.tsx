
import React, { CSSProperties } from "react";
import { cn } from "@/lib/utils";
export interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
  className?: string;
  children?: React.ReactNode;
}
const ShimmerButton = React.forwardRef<HTMLButtonElement, ShimmerButtonProps>(({
  shimmerColor = "rgba(255, 255, 255, 0.2)",
  shimmerSize = "0.05em",
  shimmerDuration = "3s",
  borderRadius = "0.5rem",
  background = "#1A1F2C",
  className,
  children,
  ...props
}, ref) => {
  return <button style={{
    "--shimmer-color": shimmerColor,
    "--radius": borderRadius,
    "--duration": shimmerDuration,
    "--size": shimmerSize,
    "--bg": background
  } as CSSProperties} className={cn("group relative flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap px-6 py-3", "text-white font-medium", "transform-gpu transition-transform duration-300 ease-in-out active:translate-y-px", "[background:var(--bg)] [border-radius:var(--radius)]", "hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2", className)} ref={ref} {...props}>
        <div className="absolute inset-0">
          <div className="absolute inset-0 animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-[var(--shimmer-color)] to-transparent" />
        </div>
        <div className="absolute inset-0 rounded-[inherit] bg-gray-950 hover:bg-gray-800" />
        <div className="relative z-[1] flex items-center justify-center gap-2">
          {children}
        </div>
      </button>;
});
ShimmerButton.displayName = "ShimmerButton";
export { ShimmerButton };
