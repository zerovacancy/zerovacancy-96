
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ArrowRight, Loader2 } from "lucide-react";
import { AvatarPlaceholder } from "./avatar-placeholder";
import { toast } from "sonner";

export function WaitlistCTA({ className }: { className?: string }) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setEmail("");
      toast.success("Thanks for joining our waitlist!");
    }, 1000);
  };

  return (
    <div className={cn("w-full max-w-2xl mx-auto", className)}>
      <div className="flex flex-wrap gap-2 justify-center mb-4">
        <AvatarPlaceholder className="border-2 border-white" />
        <AvatarPlaceholder className="border-2 border-white" />
        <AvatarPlaceholder className="border-2 border-white" />
      </div>
      
      <div className="text-center text-sm mb-6 text-muted-foreground">
        Join 3,200+ professionals on our waitlist
      </div>
      
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full">
        <Input
          type="email"
          placeholder="Enter your email address"
          className="flex-1"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-label="Email address"
          required
        />
        <Button 
          type="submit" 
          className="group rounded-md px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium shadow-sm"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
          ) : (
            <>
              Join Waitlist
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
