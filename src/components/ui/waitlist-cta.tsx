
"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { ShimmerButton } from "./shimmer-button";
import { cn } from "@/lib/utils";

interface WaitlistCTAProps {
  className?: string;
  onSubmit?: (email: string) => void;
}

export function WaitlistCTA({ className, onSubmit }: WaitlistCTAProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    onSubmit?.(email);
    setIsSubmitting(false);
  };

  return (
    <div className={cn("w-full", className)}>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full max-w-lg mx-auto">
          <div className="relative flex-1">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={cn(
                "w-full min-h-[3rem] sm:min-h-[3.25rem]",
                "px-4 py-2 text-base sm:text-lg",
                "bg-white/5 backdrop-blur-sm",
                "border border-white/10",
                "rounded-xl",
                "text-gray-800 placeholder:text-gray-500",
                "transition-all duration-200",
                "focus:outline-none focus:ring-2 focus:ring-purple-500/20",
                "disabled:opacity-50",
                "shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
              )}
              disabled={isSubmitting}
              required
            />
            <div
              className="absolute inset-0 rounded-xl pointer-events-none"
              style={{
                background: "linear-gradient(45deg, rgba(139,92,246,0.1), rgba(59,130,246,0.1))",
              }}
              aria-hidden="true"
            />
          </div>

          <ShimmerButton
            type="submit"
            disabled={isSubmitting}
            className={cn(
              "min-h-[3rem] sm:min-h-[3.25rem]",
              "px-6 py-2",
              "text-base sm:text-lg",
              "whitespace-nowrap",
              "flex-shrink-0",
              "w-full sm:w-auto"
            )}
          >
            <span>Get Early Access</span>
            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-white/90" aria-hidden="true" />
          </ShimmerButton>
        </div>
      </form>

      <div className="flex justify-between items-center mt-3 px-1 max-w-lg mx-auto text-xs sm:text-sm text-gray-600">
        <p className="flex items-center gap-1.5">
          <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          2,165+ people joined
        </p>
        <p>Queue: 1-2 days</p>
      </div>
    </div>
  );
}
