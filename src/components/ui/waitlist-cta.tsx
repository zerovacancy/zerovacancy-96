
"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ArrowRight, Loader2, Mail } from "lucide-react"; 
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";

export function WaitlistCTA({ className }: { className?: string }) {
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

  return (
    <div className={cn(
      "w-full max-w-xl mx-auto px-5 sm:px-0",
      className
    )}>
      <form onSubmit={handleSubmit} className={cn(
        "flex w-full",
        isMobile ? "flex-col space-y-4" : "flex-row items-center justify-center gap-4" // Increased gap to 16px (4 units)
      )}>
        <div className={cn(
          "relative",
          isMobile ? "w-full" : "w-[320px]"
        )}>
          {/* Added mail icon with gradient color */}
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            <Mail className="h-4 w-4" />
          </div>
          
          <Input
            ref={inputRef}
            type="email"
            placeholder="Enter your email"
            className={cn(
              "border",
              isMobile ? [
                "h-[46px]", // Reduced height
                "bg-white", 
                "border-gray-100",
                "pl-10 pr-4 py-3", // Added left padding for icon
                "text-base",
                "placeholder:text-gray-400",
                "rounded-xl", // Increased border radius to 12px
                "shadow-[inset_0_1px_2px_rgba(0,0,0,0.08)]" // Added subtle inner shadow
              ] : [
                "h-11 border-gray-200 bg-white",
                "focus:ring-2 focus:ring-primary/50 focus:border-transparent",
                "pl-10 pr-4 py-2", // Added left padding for icon
                "text-base placeholder:text-gray-400",
                "rounded-xl", // Increased border radius to 12px
                "shadow-[inset_0_1px_2px_rgba(0,0,0,0.08)]" // Added subtle inner shadow
              ]
            )}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-label="Email address"
            required
            disabled={isLoading}
          />
        </div>
        
        <Button 
          type="submit" 
          className={cn(
            "flex items-center justify-center",
            "whitespace-nowrap",
            "shadow-lg hover:shadow-xl", // Enhanced shadow for "pop" effect
            "transition-all duration-300",
            "relative overflow-hidden", // For pulsing animation
            "group", // For hover effects
            isMobile ? [
              "w-full", 
              "rounded-xl", // Increased border radius
              "h-[46px]", // Reduced height
              "bg-gradient-to-r from-[#6A3DE8] to-[#4361EE]", // Custom gradient
              "text-white",
              "font-medium",
              "px-6"
            ] : [
              "h-11",
              "rounded-xl w-[190px] px-5", // Increased border radius
              "bg-gradient-to-r from-[#6A3DE8] to-[#4361EE]", // Custom gradient
              "hover:from-[#5A2DD8] hover:to-[#3351DE]", // Darker gradient on hover
              "text-white font-medium",
              "after:absolute after:inset-0 after:bg-gradient-to-r after:from-purple-500/20 after:to-blue-500/20 after:opacity-0 after:animate-pulse after:pointer-events-none group-hover:after:opacity-100" // Subtle pulsing effect on hover
            ]
          )}
          style={{ gap: '8px' }} // Increased gap between text and icon
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <span className={cn(
                "flex-shrink-0",
                "leading-none",
                isMobile ? "text-base" : "text-sm"
              )}>
                Join Waitlist Now
              </span>
              <ArrowRight className="h-5 w-5 flex-shrink-0 inline-block transition-transform group-hover:translate-x-0.5" /> {/* Slightly larger icon */}
              
              {/* Limited spots badge - small pill - repositioned to not overlap text */}
              <span className="absolute -top-2 -right-2 text-[8px] bg-white text-purple-700 px-1.5 py-0.5 rounded-full font-bold border border-purple-200 shadow-sm hidden sm:inline-block">
                Limited spots
              </span>
            </>
          )}
        </Button>
      </form>
      
      <div className="flex items-center justify-center mt-6"> {/* Increased margin top to 24px (6 units) */}
        <div className="flex -space-x-1 mr-4 items-center"> {/* Increased spacing */}
          {/* Gradient background avatars with increased size */}
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 flex items-center justify-center text-[8px] text-white font-bold border-2 border-white shadow-sm">JT</div>
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 flex items-center justify-center text-[8px] text-white font-bold border-2 border-white shadow-sm">MI</div>
          {!isMobile && (
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 flex items-center justify-center text-[8px] text-white font-bold border-2 border-white shadow-sm">AS</div>
          )}
        </div>
        
        <div className="text-xs text-gray-600 flex items-center whitespace-nowrap">
          {/* Bolded the number of people who joined with increased weight */}
          <span><strong className="font-semibold text-gray-800">2,165+</strong> <span className="font-medium">people joined</span></span>
          <span className="mx-2.5">•</span> {/* Increased spacing */}
          <span className="text-gray-600">Queue: {isMobile ? "1-2 days" : "2-3 weeks"}</span>
        </div>
      </div>
    </div>
  );
}
