
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
export function WaitlistCTA({
  className,
  onSubmit
}: WaitlistCTAProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    onSubmit?.(email);
    setIsSubmitting(false);
  };
  return <div className={cn("flex flex-col items-center justify-center w-full max-w-2xl mx-auto px-4 sm:px-6 mt-8", className)}>
      <form onSubmit={handleSubmit} className="w-full flex justify-center">
        <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-3 w-full max-w-[480px] py-0 my-0">
          <div className="w-full md:w-[300px]">
            <input type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} className={cn(
          // Base dimensions
          "w-full h-12", "inline-flex items-center",
          // Enhanced styling
          "bg-white", "border border-gray-200", "rounded-lg",
          // Text styling
          "text-base text-gray-800", "placeholder:text-gray-500", "placeholder:text-[15px] md:placeholder:text-base",
          // Focus states
          "transition-all duration-200 ease-in-out", "focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/20", "disabled:opacity-50",
          // Spacing
          "px-4", "m-0",
          // Shadow
          "shadow-sm hover:shadow")} disabled={isSubmitting} required />
          </div>

          <ShimmerButton type="submit" disabled={isSubmitting} variant="primary" className="h-12 w-full md:w-[180px]">
            <span className="flex-1 text-center whitespace-nowrap">Get Early Access</span>
            <ArrowRight className="w-5 h-5 text-white/90 flex-shrink-0" aria-hidden="true" />
          </ShimmerButton>
        </div>
      </form>

      <div className="flex justify-center items-center mt-4 text-[14px] text-[#6B7280] font-normal">
        <div className="flex items-center flex-wrap justify-center gap-y-2">
          <span className="flex -space-x-1.5 mr-2.5" aria-hidden="true">
            <AvatarPlaceholder initials="JT" />
            <AvatarPlaceholder initials="MK" />
            <AvatarPlaceholder initials="AS" className="hidden sm:flex" />
          </span>
          <span className="whitespace-nowrap">2,165+ people joined</span>
          <span className="mx-3 sm:mx-4 w-1 h-1 rounded-full bg-gray-400 inline-block relative top-[0.5px]" aria-hidden="true" />
          <span className="whitespace-nowrap">Queue: 2-3 weeks</span>
        </div>
      </div>
    </div>;
}
