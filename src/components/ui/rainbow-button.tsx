
import React from "react";
import { cn } from "@/lib/utils";

interface RainbowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function RainbowButton({
  children,
  className,
  ...props
}: RainbowButtonProps) {
  return (
    <button
      className={cn(
        "group relative inline-flex h-11 cursor-pointer items-center justify-center rounded-xl border-0 bg-gray-900 px-8 py-2 font-medium text-white transition-colors disabled:pointer-events-none disabled:opacity-50",
        "shadow-md hover:shadow-lg",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
