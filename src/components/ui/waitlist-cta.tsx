
"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ArrowRight, Loader2, Mail } from "lucide-react"; // Added Mail icon
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
        isMobile ? "flex-col space-y-4" : "flex-row items-center justify-center gap-3" // Increased gap
      )}>
        <div className={cn(
          "relative",
          isMobile ? "w-full" : "w-[320px]" // Slightly wider input field
        )}>
          {/* Added mail icon inside input */}
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <Mail className="h-4 w-4" />
          </div>
          
          <Input
            ref={inputRef}
            type="email"
            placeholder="Enter your email"
            className={cn(
              "border",
              isMobile ? [
                "h-[50px]", // Reduced height from 56px
                "bg-white", 
                "border-gray-100",
                "pl-10 pr-4 py-3", // Added left padding for icon
                "text-base",
                "placeholder:text-gray-400",
                "rounded-lg",
                "w-full",
                "shadow-sm" // Added subtle shadow
              ] : [
                "h-11 border-gray-200 bg-white", // Changed from gray bg to white
                "focus:ring-2 focus:ring-primary/50 focus:border-transparent",
                "pl-10 pr-4 py-2", // Added left padding for icon
                "text-base placeholder:text-gray-400",
                "rounded-lg",
                "shadow-sm" // Added subtle shadow
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
            "shadow-md hover:shadow-lg", // Enhanced shadow for "pop" effect
            "transition-all duration-300", // Smoother transition
            isMobile ? [
              "w-full", 
              "rounded-lg", 
              "h-[50px]", // Reduced height from 56px
              "bg-gradient-to-r from-purple-700 to-blue-600", // Brighter gradient
              "text-white",
              "font-medium",
              "px-6"
            ] : [
              "h-11", // Reduced height
              "rounded-lg w-[190px] px-5", // Slightly wider
              "bg-[#6033E0] hover:bg-[#5628D0]", // Brighter purple
              "text-white font-medium"
            ]
          )}
          style={{ gap: '6px' }}
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
                {/* Changed CTA text to be more action-oriented */}
                Join Waitlist Now
              </span>
              <ArrowRight className="h-4 w-4 flex-shrink-0 inline-block" />
            </>
          )}
        </Button>
      </form>
      
      <div className="flex items-center justify-center mt-5"> {/* Increased margin top */}
        <div className="flex -space-x-1 mr-3 items-center"> {/* Increased margin right */}
          {/* Increased size of avatar icons */}
          <div className="w-6 h-6 rounded-full bg-gray-900 flex items-center justify-center text-[7px] text-white font-bold border-2 border-[#7339E5]">JT</div>
          <div className="w-6 h-6 rounded-full bg-gray-900 flex items-center justify-center text-[7px] text-white font-bold border-2 border-[#7339E5]">MI</div>
          {!isMobile && (
            <div className="w-6 h-6 rounded-full bg-gray-900 flex items-center justify-center text-[7px] text-white font-bold border-2 border-[#7339E5]">AS</div>
          )}
        </div>
        
        <div className="text-xs text-gray-500 flex items-center whitespace-nowrap">
          {/* Bolded the number of people who joined */}
          <span><strong className="font-semibold text-gray-700">2,165+</strong> people joined</span>
          <span className="mx-2">•</span> {/* Increased spacing */}
          <span>Queue: {isMobile ? "1-2 days" : "2-3 weeks"}</span>
        </div>
      </div>
    </div>
  );
}
