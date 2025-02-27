
"use client";

import { useState } from "react";
import { ArrowRight, Users, Star } from "lucide-react";
import { ShimmerButton } from "./shimmer-button";
import { AvatarPlaceholder } from "./avatar-placeholder";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const isMobile = useIsMobile();
  
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
          "w-full h-[48px]", "inline-flex items-center",
          // Enhanced styling
          "bg-[#F5F5F8]", "border border-[#E5E7EB]", "rounded-lg",
          // Text styling
          "text-base text-gray-800", "placeholder:text-gray-500", "placeholder:text-[15px] md:placeholder:text-base",
          // Focus states
          "transition-all duration-200 ease-in-out", "focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/20", "disabled:opacity-50",
          // Spacing
          "px-4", "m-0")} disabled={isSubmitting} required />
          </div>

          <ShimmerButton type="submit" disabled={isSubmitting} className={cn("h-[48px] m-0", "px-6", "whitespace-nowrap", "text-base leading-none", "inline-flex items-center justify-center gap-3", "flex-shrink-0", "w-full md:w-[180px]", "rounded-lg", "bg-blue-600 hover:bg-blue-700", "transition-all duration-200 ease-in-out")}>
            <span className="flex-1 text-center whitespace-nowrap">Get Early Access</span>
            <ArrowRight className="w-5 h-5 text-white/90 flex-shrink-0" aria-hidden="true" />
          </ShimmerButton>
        </div>
      </form>

      {/* Enhanced Social Proof Section */}
      <div className={cn(
        "w-full flex mt-5 mb-2 justify-center items-center",
        "transition-all duration-300",
        "sm:mt-6",
        isMobile ? "flex-col gap-3" : "flex-row gap-5"
      )}>
        {/* User Count Card */}
        <div className={cn(
          "flex items-center justify-center gap-3 py-2.5 px-4",
          "bg-white rounded-xl shadow-sm",
          "border border-gray-100",
          isMobile ? "w-full" : "w-auto min-w-[200px]",
          "hover:shadow-md hover:border-gray-200 transition-all duration-200"
        )}>
          <div className="flex -space-x-2 mr-2">
            <AvatarPlaceholder initials="JT" className="ring-2 ring-white w-8 h-8" />
            <AvatarPlaceholder initials="MK" className="ring-2 ring-white w-8 h-8" />
            <AvatarPlaceholder initials="AS" className="ring-2 ring-white w-8 h-8" />
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-800 text-xs font-medium ring-2 ring-white">
              +9
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-gray-900">2,165+</span>
            <span className="text-xs text-gray-500">people joined</span>
          </div>
        </div>

        {/* Wait Time Card */}
        <div className={cn(
          "flex items-center justify-center gap-3 py-2.5 px-4",
          "bg-white rounded-xl shadow-sm",
          "border border-gray-100",
          isMobile ? "w-full" : "w-auto min-w-[180px]",
          "hover:shadow-md hover:border-gray-200 transition-all duration-200"
        )}>
          <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
            <Users className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-gray-900">1-2 Days</span>
            <span className="text-xs text-gray-500">avg. wait time</span>
          </div>
        </div>

        {/* Rating Card - Hidden on mobile */}
        {!isMobile && (
          <div className={cn(
            "hidden sm:flex items-center justify-center gap-3 py-2.5 px-4",
            "bg-white rounded-xl shadow-sm",
            "border border-gray-100",
            "w-auto min-w-[160px]",
            "hover:shadow-md hover:border-gray-200 transition-all duration-200"
          )}>
            <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-gray-900">4.9/5</span>
              <span className="text-xs text-gray-500">user rating</span>
            </div>
          </div>
        )}
      </div>
    </div>;
}
