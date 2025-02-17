
import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef } from "react";

interface ShimmerButtonProps extends HTMLAttributes<HTMLDivElement> {
  background?: string;
  shimmerColor?: string;
  shimmerSize?: string;
  shimmerDuration?: string;
}

export const ShimmerButton = forwardRef<HTMLDivElement, ShimmerButtonProps>(
  ({ className, background, shimmerColor, shimmerSize, shimmerDuration, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative inline-flex items-center justify-center rounded-full p-px text-sm font-medium opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed",
          className
        )}
        {...props}
      >
        <div
          className="absolute inset-[-1000%] animate-[shimmer_2s_linear_infinite] bg-gradient-to-r from-[rgba(255,255,255,0)] via-[rgba(255,255,255,0.2)] to-[rgba(255,255,255,0)]"
          style={{
            background: background
              ? `linear-gradient(to right, ${background}00, ${background}40, ${background}00)`
              : undefined,
          }}
        />
        <div className="absolute inset-0 rounded-[inherit] bg-gray-950 hover:bg-gray-800 flex items-center justify-center" />
        <div className="relative flex items-center justify-center text-white px-6">
          {children}
        </div>
      </div>
    );
  }
);
ShimmerButton.displayName = "ShimmerButton";
