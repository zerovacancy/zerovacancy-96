
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
    <div className={cn("w-full max-w-2xl mx-auto", className)}>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <div className="relative flex-1">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={cn(
                "w-full h-12 sm:h-14",
                "px-4 py-3",
                "text-base sm:text-lg",
                "bg-gray-900/5 backdrop-blur-sm",
                "border border-gray-200/20",
                "rounded-xl",
                "text-gray-800 placeholder:text-gray-500",
                "transition-all duration-200",
                "focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/20",
                "disabled:opacity-50"
              )}
              disabled={isSubmitting}
              required
            />
            <div
              className="absolute inset-0 rounded-xl pointer-events-none"
              style={{
                background: "linear-gradient(45deg, rgba(59,130,246,0.05), rgba(139,92,246,0.05))",
              }}
              aria-hidden="true"
            />
          </div>

          <ShimmerButton
            type="submit"
            disabled={isSubmitting}
            className={cn(
              "h-12 sm:h-14",
              "px-6 sm:px-8",
              "text-base",
              "flex items-center justify-center gap-2",
              "flex-shrink-0",
              "w-full sm:w-auto min-w-[160px]",
              "rounded-xl"
            )}
          >
            <span>Get Early Access</span>
            <ArrowRight className="w-5 h-5 text-white/90" aria-hidden="true" />
          </ShimmerButton>
        </div>
      </form>

      <div className="flex justify-center items-center mt-4 text-sm text-gray-600">
        <p className="flex items-center gap-3">
          <span>2,165+ people joined</span>
          <span className="w-1 h-1 rounded-full bg-gray-400" aria-hidden="true" />
          <span>Queue: 1-2 days</span>
        </p>
      </div>
    </div>
  );
}
