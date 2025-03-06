
"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ArrowRight, CheckCircle, Loader2, Mail, Users } from "lucide-react";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";

export function WaitlistCTA({
  className
}: {
  className?: string;
}) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const isMobile = useIsMobile();
  
  // Validate email as user types
  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValid(email.length > 0 && emailRegex.test(email));
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
      setIsValid(false);
      toast.success("Thanks for joining our waitlist!");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  return <div className={cn("w-full max-w-xl mx-auto px-5 sm:px-0", className)}>
      <form onSubmit={handleSubmit} className={cn("flex w-full", isMobile ? "flex-col space-y-3" : "flex-row items-center justify-center gap-4")}>
        <div className={cn(
          "relative transition-all duration-300", 
          isMobile ? "w-full" : "w-[380px]", // Increased width by ~20%
          isFocused && "scale-[1.02] transform"
        )}>
          {/* Input field with mail icon */}
          <div className={cn(
            "absolute left-3 top-1/2 transform -translate-y-1/2",
            "text-transparent bg-clip-text",
            isFocused || isValid 
              ? "bg-gradient-to-r from-indigo-600 to-purple-600" 
              : "text-gray-400"
          )}>
            <Mail className="h-5 w-5" />
          </div>
          
          {/* Check mark for valid email */}
          {isValid && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 animate-fade-in">
              <CheckCircle className="h-5 w-5" />
            </div>
          )}
          
          <Input 
            ref={inputRef} 
            type="email" 
            placeholder="Enter your email" 
            className={cn(
              "border transition-all duration-300",
              "focus:scale-100", // Prevent default scale to use our custom one
              isMobile 
                ? [
                    "h-[50px]", // Increased height by ~20%
                    "bg-white", 
                    isFocused ? "border-indigo-400 ring-2 ring-indigo-200" : "border-gray-100",
                    "pl-10 pr-3 py-2",
                    "text-sm",
                    "placeholder:text-gray-400", 
                    "rounded-xl",
                    "shadow-[inset_0_1px_2px_rgba(0,0,0,0.08)]"
                  ] 
                : [
                    "h-[52px]", // Increased height by ~20%
                    "border-gray-200 bg-white", 
                    "focus:ring-2 focus:ring-primary/50 focus:border-transparent", 
                    "pl-10 pr-4 py-2", 
                    "text-base placeholder:text-gray-400", 
                    "rounded-xl",
                    isFocused ? "border-indigo-400 ring-2 ring-indigo-200 shadow-[0_0_10px_rgba(99,102,241,0.2)]" : "",
                    "shadow-[inset_0_1px_2px_rgba(0,0,0,0.08)]",
                    "hover:border-indigo-300 hover:shadow-[0_0_8px_rgba(99,102,241,0.15)]"
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
                  "h-[50px]", // Increased height to match input
                  "bg-gradient-to-r from-[#6A3DE8] to-[#4361EE]",
                  "hover:from-[#5A2DD8] hover:to-[#3351DE]", 
                  "hover:scale-[1.02]", // Subtle scale on hover
                  "text-white",
                  "font-medium",
                  "px-4"
                ] 
              : [
                  "h-[52px]", // Increased height to match input
                  "rounded-xl w-[210px] px-5", // Increased width by ~10%
                  "bg-gradient-to-r from-[#6A3DE8] to-[#4361EE]",
                  "hover:from-[#5A2DD8] hover:to-[#3351DE]",
                  "hover:scale-[1.05]", // Subtle scale on hover
                  "text-white font-medium",
                  "after:absolute after:inset-0 after:bg-gradient-to-r after:from-purple-500/20 after:to-blue-500/20 after:opacity-0 after:animate-pulse after:pointer-events-none group-hover:after:opacity-100"
                ]
          )} 
          style={{
            gap: '6px'
          }}
          disabled={isLoading}
        >
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : (
            <>
              <span className={cn(
                "flex-shrink-0",
                "leading-none",
                isMobile ? "text-sm" : "text-sm"
              )}>
                Join Waitlist Now
              </span>
              <ArrowRight className="h-4 w-4 flex-shrink-0 inline-block transition-transform group-hover:translate-x-1" />
            </>
          )}
        </Button>
      </form>
      
      {/* Enhanced Social Proof Section */}
      <div className="flex items-center justify-center mt-4 sm:mt-6">
        {/* Social proof pill */}
        <div className={cn(
          "flex items-center gap-2 sm:gap-3 px-4 py-2",
          "bg-gradient-to-r from-indigo-50 to-purple-50",
          "border border-indigo-100/80",
          "rounded-full shadow-sm",
          "animate-fade-in"
        )}>
          <div className="flex -space-x-1 items-center">
            <div className={cn(
              "rounded-full bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600",
              "flex items-center justify-center text-[8px] text-white font-bold",
              "border-2 border-white shadow-sm",
              isMobile ? "w-6 h-6" : "w-7 h-7"
            )}>JT</div>
            <div className={cn(
              "rounded-full bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600",
              "flex items-center justify-center text-[8px] text-white font-bold",
              "border-2 border-white shadow-sm",
              isMobile ? "w-6 h-6" : "w-7 h-7"
            )}>MI</div>
            <div className={cn(
              "rounded-full bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600",
              "flex items-center justify-center text-[8px] text-white font-bold",
              "border-2 border-white shadow-sm",
              isMobile ? "w-6 h-6" : "w-7 h-7"
            )}>AS</div>
          </div>
          
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Users className="h-4 w-4 text-indigo-600" />
            <div className={cn(
              "text-gray-800", 
              isMobile ? "text-xs" : "text-sm font-medium"
            )}>
              <span className="font-bold text-indigo-700">2,165+</span> people joined
            </div>
            <span className="text-gray-400 mx-1.5">•</span>
            <span className="text-gray-800 font-medium">
              Queue: <span className="text-indigo-700 font-bold">{isMobile ? "1-2 days" : "2-3 weeks"}</span>
            </span>
          </div>
        </div>
      </div>
    </div>;
}
