
"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { ShimmerButton } from "./shimmer-button";
import { AvatarPlaceholder } from "./avatar-placeholder";
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
    <div className={cn(
      "w-full max-w-2xl mx-auto px-4 sm:px-6", 
      className
    )}>
      <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
        <div className="flex flex-col items-center gap-3 w-full max-w-[260px]">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={cn(
              // Input dimensions
              "w-full h-[48px]",
              "inline-flex items-center",
              "px-4",
              "text-base leading-none",
              // Enhanced mobile styling
              "bg-[#F0F0F5]",
              "border border-gray-200/20",
              "rounded-lg",
              // Text and placeholder styling
              "text-gray-800 placeholder:text-gray-500 placeholder:text-[15px] md:placeholder:text-base",
              // Focus and interaction states
              "transition-all duration-200 ease-in-out",
              "focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/20",
              "disabled:opacity-50",
              // Layout
              "flex-1",
              "m-0"
            )}
            style={{
              padding: "0 16px",
            }}
            disabled={isSubmitting}
            required
          />

          <ShimmerButton
            type="submit"
            disabled={isSubmitting}
            className={cn(
              "h-[48px] m-0",
              "px-6",
              "text-base leading-none",
              "inline-flex items-center justify-center gap-3",
              "flex-shrink-0",
              "w-full",
              "rounded-lg",
              "bg-blue-600 hover:bg-blue-700",
              "transition-all duration-200 ease-in-out"
            )}
          >
            <span className="flex-1 text-center">Get Early Access</span>
            <ArrowRight 
              className="w-5 h-5 text-white/90 flex-shrink-0" 
              aria-hidden="true"
            />
          </ShimmerButton>
        </div>
      </form>

      <div className="flex justify-center items-center mt-4 text-[14px] text-[#6B7280] font-normal">
        <p className="flex items-center flex-wrap justify-center gap-y-2">
          <span className="flex -space-x-1.5 mr-2.5" aria-hidden="true">
            <AvatarPlaceholder initials="JT" />
            <AvatarPlaceholder initials="MK" />
            <AvatarPlaceholder 
              initials="AS" 
              className="hidden sm:flex"
            />
          </span>
          <span className="whitespace-nowrap">2,165+ people joined</span>
          <span className="mx-3 sm:mx-4 w-1 h-1 rounded-full bg-gray-400 inline-block relative top-[0.5px]" aria-hidden="true" />
          <span className="whitespace-nowrap">Queue: 1-2 days</span>
        </p>
      </div>
    </div>
  );
}
