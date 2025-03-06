
"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ArrowRight, Loader2, Mail, Users, CheckCircle, Star } from "lucide-react";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";

export function WaitlistCTA({
  className
}: {
  className?: string;
}) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const isMobile = useIsMobile();
  
  // Check for valid email pattern
  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailRegex.test(email));
  }, [email]);

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
      <form onSubmit={handleSubmit} className={cn(
        "flex w-full", 
        isMobile 
          ? "flex-col space-y-3" 
          : "flex-row items-center justify-center gap-4"
      )}>
        <div className={cn(
          "relative", 
          isMobile 
            ? "w-full" 
            // Increased width for desktop by ~20%
            : "w-[380px]" 
        )}>
          {/* Enhanced mail icon with animation */}
          <div className={cn(
            "absolute left-3 top-1/2 transform -translate-y-1/2 text-transparent",
            "bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600",
            isFocused && "animate-pulse transition-all duration-300"
          )}>
            <Mail className="h-5 w-5" />
          </div>
          
          {/* Check mark icon for valid email */}
          {isValidEmail && email.length > 0 && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 animate-fade-in">
              <CheckCircle className="h-5 w-5" />
            </div>
          )}
          
          <Input 
            ref={inputRef} 
            type="email" 
            placeholder="Enter your email" 
            className={cn(
              "border", 
              // Common states
              "transition-all duration-300",
              "focus:ring-4 focus:ring-offset-0",
              
              isFocused && "scale-[1.02] shadow-lg",
              
              isMobile 
                ? [
                    // Mobile styling
                    "h-[48px]", // Increased height by 20%
                    "bg-white", 
                    "border-gray-100",
                    "pl-10 pr-3 py-2",
                    "text-sm",
                    "placeholder:text-gray-400", 
                    "rounded-xl",
                    "shadow-[inset_0_1px_2px_rgba(0,0,0,0.08)]",
                    "focus:ring-primary/40"
                  ] 
                : [
                    // Desktop styling
                    "h-[52px]", // Increased height by 20%
                    "border-gray-200 bg-white", 
                    "focus:ring-primary/40 focus:border-transparent", 
                    "pl-10 pr-10 py-3",  // Increased padding
                    "text-base placeholder:text-gray-400", 
                    "rounded-xl", 
                    "shadow-[inset_0_1px_2px_rgba(0,0,0,0.08)]",
                    "hover:shadow-md hover:border-purple-300" // Added hover effect
                  ]
            )} 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
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
            "shadow-lg hover:shadow-xl",
            "transition-all duration-300", 
            "relative overflow-hidden",
            "group",
            
            isMobile 
              ? [
                  "w-full", 
                  "rounded-xl",
                  "h-[48px]", // Increased height by 20%
                  "bg-gradient-to-r from-[#6A3DE8] to-[#4361EE]",
                  "text-white", 
                  "font-medium", 
                  "px-4",
                  "hover:scale-[1.02]" // Added hover scale effect
                ] 
              : [
                  "h-[52px]", // Increased height by 20%
                  "rounded-xl w-[220px] px-5", // Increased width by 20%
                  "bg-gradient-to-r from-[#6A3DE8] to-[#4361EE]",
                  "hover:from-[#5A2DD8] hover:to-[#3351DE]",
                  "hover:scale-[1.05]", // Added hover scale effect
                  "text-white font-medium",
                  "after:absolute after:inset-0 after:bg-gradient-to-r after:from-purple-500/20 after:to-blue-500/20 after:opacity-0 after:animate-pulse after:pointer-events-none group-hover:after:opacity-100"
                ]
          )} 
          style={{
            gap: '8px'
          }}
          disabled={isLoading}
        >
          {isLoading 
            ? <Loader2 className="h-5 w-5 animate-spin" /> 
            : <>
                <span className={cn(
                  "flex-shrink-0", 
                  "leading-none", 
                  isMobile ? "text-sm" : "text-base" // Slightly larger text
                )}>
                  Join Waitlist Now
                </span>
                <ArrowRight className="h-5 w-5 flex-shrink-0 inline-block transition-transform group-hover:translate-x-1" />
              </>
          }
        </Button>
      </form>
      
      {/* Enhanced Social Proof Section */}
      <div className={cn(
        "mt-5 sm:mt-7 p-3 sm:p-4",
        "bg-gradient-to-r from-purple-50 via-indigo-50 to-blue-50",
        "rounded-2xl shadow-sm",
        "border border-purple-100/50",
        "flex flex-col sm:flex-row items-center justify-center sm:justify-between",
        "animate-fade-in"
      )}>
        <div className="flex items-center mb-3 sm:mb-0">
          <div className="bg-purple-100 rounded-full p-2 mr-3">
            <Users className="h-5 w-5 text-purple-700" />
          </div>
          <span className={cn(
            "text-gray-900 font-semibold",
            isMobile ? "text-base" : "text-lg" // Increased size
          )}>
            2.9K+ people joined
          </span>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <Star className="h-5 w-5 text-amber-400 mr-1.5" fill="#FBBF24" />
            <span className={cn(
              "text-gray-900 font-semibold",
              isMobile ? "text-base" : "text-lg" // Increased size
            )}>
              4.8/5 rating
            </span>
          </div>
          
          <div className={cn(
            "px-3 py-1.5 rounded-full",
            "bg-green-100 text-green-700",
            "text-sm font-medium"
          )}>
            24h response
          </div>
        </div>
      </div>
    </div>;
}
