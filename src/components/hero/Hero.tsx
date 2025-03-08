
import React from "react";
import { cn } from "@/lib/utils";
import { WaitlistCTA } from "../ui/waitlist-cta";

export function Hero() {
  return (
    <section 
      className={cn(
        "flex flex-col items-center justify-center",
        "px-4 sm:px-6",
        "py-8 sm:py-12 md:py-16",
        "min-h-[30vh]",
        "relative z-10",
        "bg-gradient-to-b from-purple-50 via-indigo-50/60 to-blue-50/30"
      )}
    >
      <div className="max-w-5xl w-full mx-auto flex flex-col gap-6 sm:gap-8">
        <h1 className="text-center">
          <span 
            className={cn(
              "text-xl sm:text-2xl md:text-3xl lg:text-4xl",
              "font-bold font-jakarta",
              "tracking-tight leading-tight",
              "block",
              "bg-clip-text text-transparent",
              "bg-gradient-to-r from-[#4A2DD9] via-[#8A2BE2] to-[#4169E1]"
            )}
          >
            Property spaces deserve visionaries, not vendors.
          </span>
        </h1>

        <p className={cn(
          "text-xs sm:text-sm md:text-base",
          "text-center text-brand-text-primary",
          "max-w-lg mx-auto px-2"
        )}>
          Connect with creators who see beyond square footage to capture the soul of your spaces. Our curated network transforms properties into visual narratives that intrigue, inspire, and ultimately convert.
        </p>
      </div>
      
      <div className="w-full max-w-xl mx-auto mt-8">
        <WaitlistCTA />
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none">
        <div className="absolute bottom-0 left-0 right-0 h-full bg-gradient-to-t from-indigo-100/30 to-transparent" />
      </div>
    </section>
  );
}

export default Hero;
