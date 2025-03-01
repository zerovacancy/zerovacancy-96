
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
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3 w-full">
        <Input
          ref={inputRef}
          type="email"
          placeholder="Enter your email address"
          className="flex-1 h-12 px-4 border border-gray-200 focus:ring-2 focus:ring-primary/50 shadow-sm"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-label="Email address"
          required
          disabled={isLoading}
        />
        <Button 
          type="submit" 
          className="group w-full sm:w-auto rounded-md h-12 px-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium shadow-sm touch-manipulation"
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
      <div className="text-center text-xs text-gray-500 mt-3">
        2,165+ people joined • Queue: 2-3 weeks
      </div>
    </div>
  );
}
