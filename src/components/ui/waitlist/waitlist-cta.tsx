
"use client";

import { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import { EmailInput } from "./email-input";
import { WaitlistButton } from "./waitlist-button";
import { SocialProof } from "./social-proof";

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
  
  return (
    <div className={cn("w-full max-w-xl mx-auto px-5 sm:px-0", className)}>
      <form onSubmit={handleSubmit} className={cn("flex w-full", isMobile ? "flex-col space-y-3" : "flex-row items-center justify-center gap-4")}>
        <EmailInput 
          email={email}
          setEmail={setEmail}
          isLoading={isLoading}
          inputRef={inputRef}
        />
        <WaitlistButton isLoading={isLoading} />
      </form>
      
      {/* Enhanced Social Proof Section */}
      <SocialProof />
    </div>
  );
}
