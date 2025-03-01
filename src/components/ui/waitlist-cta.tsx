
"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ArrowRight, Loader2 } from "lucide-react";
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
      "w-full max-w-xl mx-auto", 
      isMobile ? "px-4" : "",
      className
    )}>
      <form onSubmit={handleSubmit} className={cn(
        "flex w-full",
        isMobile ? "flex-col space-y-2" : "flex-row items-center justify-center gap-2"
      )}>
        <div className={cn(
          "relative",
          isMobile ? "w-full" : "w-[300px]"
        )}>
          <Input
            ref={inputRef}
            type="email"
            placeholder="Enter your email"
            className={cn(
              "h-12 border border-gray-200 bg-[#F5F5F8]",
              "focus:ring-2 focus:ring-primary/50 focus:border-transparent",
              "px-4 py-3 text-base placeholder:text-gray-400",
              isMobile ? "rounded-full w-full" : "rounded-md w-full"
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
            "h-12 flex items-center justify-center whitespace-nowrap",
            isMobile 
              ? "w-full rounded-full bg-gradient-to-r from-purple-600 to-cyan-500" 
              : "rounded-md w-[180px] px-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700",
            "text-white font-medium shadow-sm"
          )}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
          ) : (
            <>
              Get Early Access
              <ArrowRight className={cn(
                "ml-2 h-4 w-4", 
                !isMobile && "group-hover:translate-x-1 transition-transform"
              )} />
            </>
          )}
        </Button>
      </form>
      
      <div className={cn(
        "flex items-center justify-center",
        isMobile ? "mt-3" : "mt-4"
      )}>
        <div className={cn(
          "flex -space-x-1.5 mr-2",
          isMobile && "items-center"
        )}>
          <div className={cn(
            isMobile ? "w-5 h-5" : "w-5 h-5",
            "rounded-full bg-gray-900 flex items-center justify-center text-[6px] text-white font-bold"
          )}>JT</div>
          <div className={cn(
            isMobile ? "w-5 h-5" : "w-5 h-5",
            "rounded-full bg-gray-900 flex items-center justify-center text-[6px] text-white font-bold"
          )}>MI</div>
          {!isMobile && (
            <div className="w-5 h-5 rounded-full bg-gray-900 flex items-center justify-center text-[6px] text-white font-bold">AS</div>
          )}
        </div>
        
        <div className={cn(
          "text-xs text-gray-500",
          isMobile && "flex items-center"
        )}>
          2,165+ people joined • Queue: {isMobile ? "1-2 days" : "2-3 weeks"}
        </div>
      </div>
    </div>
  );
}
