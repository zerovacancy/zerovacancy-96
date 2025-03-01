
"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";

export function WaitlistCTA({ className }: { className?: string }) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

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
      className
    )}>
      <form onSubmit={handleSubmit} className="flex w-full">
        <div className="flex-1 relative">
          <Input
            ref={inputRef}
            type="email"
            placeholder="Enter your email"
            className="flex-1 h-[52px] rounded-l-md border border-r-0 border-gray-200 focus:ring-2 focus:ring-primary/50 px-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-label="Email address"
            required
            disabled={isLoading}
          />
        </div>
        <Button 
          type="submit" 
          className="group h-[52px] rounded-l-none rounded-r-md min-w-[160px] px-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium shadow-sm flex items-center justify-center"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
          ) : (
            <>
              Get Early Access
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </Button>
      </form>
      <div className="flex items-center justify-center gap-2 mt-3">
        <div className="flex -space-x-1">
          <div className="w-5 h-5 rounded-full bg-gray-900 flex items-center justify-center text-[6px] text-white font-bold">JT</div>
          <div className="w-5 h-5 rounded-full bg-gray-900 flex items-center justify-center text-[6px] text-white font-bold">MI</div>
          <div className="w-5 h-5 rounded-full bg-gray-900 flex items-center justify-center text-[6px] text-white font-bold">AS</div>
        </div>
        <div className="text-xs text-gray-500">
          2,165+ people joined • Queue: 2-3 weeks
        </div>
      </div>
    </div>
  );
}
