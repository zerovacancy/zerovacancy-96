"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ArrowRight, Loader2, Mail } from "lucide-react";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
export function WaitlistCTA({
  className
}: {
  className?: string;
}) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const isMobile = useIsMobile();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      inputRef.current?.focus();
      return;
    }
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setEmail("");
      toast.success("Thanks for joining our waitlist!");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return <div className={cn("w-full max-w-xl mx-auto px-5 sm:px-0", className)}>
      <form onSubmit={handleSubmit} className={cn("flex w-full", isMobile ? "flex-col space-y-3" : "flex-row items-center justify-center gap-4" // Reduced space-y for mobile
    )}>
        <div className={cn("relative", isMobile ? "w-full" : "w-[320px]")}>
          {/* Added mail icon with gradient color */}
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            <Mail className="h-4 w-4" />
          </div>
          
          <Input ref={inputRef} type="email" placeholder="Enter your email" className={cn("border", isMobile ? ["h-[42px]",
        // Reduced height further by ~10%
        "bg-white", "border-gray-100", "pl-10 pr-3 py-2",
        // Reduced horizontal padding
        "text-sm",
        // Smaller text
        "placeholder:text-gray-400", "rounded-xl",
        // Kept border radius
        "shadow-[inset_0_1px_2px_rgba(0,0,0,0.08)]" // Kept subtle inner shadow
        ] : ["h-11 border-gray-200 bg-white", "focus:ring-2 focus:ring-primary/50 focus:border-transparent", "pl-10 pr-4 py-2", "text-base placeholder:text-gray-400", "rounded-xl", "shadow-[inset_0_1px_2px_rgba(0,0,0,0.08)]"])} value={email} onChange={e => setEmail(e.target.value)} aria-label="Email address" required disabled={isLoading} />
        </div>
        
        <Button type="submit" className={cn("flex items-center justify-center", "whitespace-nowrap", "shadow-lg hover:shadow-xl",
      // Kept enhanced shadow for "pop" effect
      "transition-all duration-300", "relative overflow-hidden",
      // For pulsing animation
      "group",
      // For hover effects
      isMobile ? ["w-full", "rounded-xl",
      // Kept border radius
      "h-[42px]",
      // Reduced height to match input
      "bg-gradient-to-r from-[#6A3DE8] to-[#4361EE]",
      // Kept custom gradient
      "text-white", "font-medium", "px-4" // Reduced horizontal padding
      ] : ["h-11", "rounded-xl w-[190px] px-5", "bg-gradient-to-r from-[#6A3DE8] to-[#4361EE]", "hover:from-[#5A2DD8] hover:to-[#3351DE]", "text-white font-medium", "after:absolute after:inset-0 after:bg-gradient-to-r after:from-purple-500/20 after:to-blue-500/20 after:opacity-0 after:animate-pulse after:pointer-events-none group-hover:after:opacity-100"])} style={{
        gap: '6px'
      }} // Reduced gap between text and icon
      disabled={isLoading}>
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>
              <span className={cn("flex-shrink-0", "leading-none", isMobile ? "text-sm" : "text-sm" // Smaller text on mobile
          )}>
                Join Waitlist Now
              </span>
              <ArrowRight className="h-4 w-4 flex-shrink-0 inline-block transition-transform group-hover:translate-x-0.5" /> {/* Slightly smaller icon */}
            </>}
        </Button>
      </form>
      
      <div className="flex items-center justify-center mt-3 sm:mt-6"> {/* Reduced margin top on mobile */}
        <div className="flex -space-x-1 mr-3 sm:mr-4 items-center"> {/* Reduced spacing */}
          {/* Slightly smaller avatars on mobile */}
          <div className={cn("rounded-full bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 flex items-center justify-center text-[8px] text-white font-bold border-2 border-white shadow-sm", isMobile ? "w-6 h-6" : "w-7 h-7")}>JT</div>
          <div className={cn("rounded-full bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 flex items-center justify-center text-[8px] text-white font-bold border-2 border-white shadow-sm", isMobile ? "w-6 h-6" : "w-7 h-7")}>MI</div>
          {!isMobile && <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 flex items-center justify-center text-[8px] text-white font-bold border-2 border-white shadow-sm">AS</div>}
        </div>
        
        <div className={cn("text-gray-600 flex items-center whitespace-nowrap", isMobile ? "text-[10px]" : "text-xs" // Even smaller text on mobile
      )}>
          {/* Bolded the number of people who joined with increased weight */}
          <span className="font-bold text-zinc-950"><strong className="font-semibold text-gray-800">2,165+</strong> <span className="font-medium">people joined</span></span>
          <span className="mx-1.5 sm:mx-2.5">•</span> {/* Reduced spacing on mobile */}
          <span className="text-zinc-950 font-bold">Queue: {isMobile ? "1-2 days" : "2-3 weeks"}</span>
        </div>
      </div>
    </div>;
}