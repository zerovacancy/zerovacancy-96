
import React, { useRef } from "react";
import { useInView } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { WaitlistCTA } from "../ui/waitlist-cta";
import { TextRotate } from "../ui/text-rotate";

// Animation titles using the TextRotate component
const TITLES = ["Converts", "Engages", "Drives Leads"];

export function Hero() {
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  
  return (
    <section 
      ref={sectionRef}
      className={cn(
        "flex items-center justify-center flex-col", 
        "px-4 sm:px-6", 
        "py-[32px] sm:py-[48px]",
        "my-[24px] sm:my-[32px]",
        "min-h-fit sm:min-h-[55vh]",
        "relative z-10", 
        "gap-4 sm:gap-6",
        "touch-manipulation",
        // Added subtle gradient background
        "bg-gradient-to-b from-white via-purple-50/30 to-white",
        isInView ? "animate-fade-in" : "opacity-0"
      )} 
    >
      <div 
        className={cn(
          "flex gap-5 sm:gap-6 flex-col max-w-6xl mx-auto w-full px-[3px]",
          isInView ? "animate-fade-in delay-100" : "opacity-0"
        )}
      >
        <h1 className="tracking-tight leading-[1.1] text-center font-bold font-jakarta">
          <span 
            className={cn(
              "text-primary inline font-medium",
              "text-3xl sm:text-5xl lg:text-6xl",
              "tracking-[-0.02em]", 
              "text-brand-purple-dark", 
              "block sm:inline-block mb-2 sm:mb-0 font-jakarta"
            )}
          >
            Property Content that
          </span>
          
          <div 
            role="text" 
            aria-label="Property Content animation"
            className="relative flex w-full justify-center h-[2.5em] sm:h-[1.5em] md:h-[1.4em] lg:h-[1.3em] overflow-hidden mt-2 sm:mt-3"
          >
            <TextRotate
              texts={TITLES}
              mainClassName="flex justify-center items-center"
              staggerFrom="last"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              staggerDuration={0.02}
              splitLevelClassName="overflow-hidden"
              elementLevelClassName={cn(
                "text-4xl sm:text-5xl lg:text-7xl",
                "font-bold font-jakarta tracking-[-0.02em]",
                "bg-clip-text text-transparent", 
                "bg-gradient-to-r from-[#4A2DD9] via-[#8A2BE2] to-[#4169E1]"
              )}
              transition={{ 
                type: "spring", 
                damping: 28, 
                stiffness: 350
              }}
              rotationInterval={2200}
            />
          </div>
        </h1>

        <div 
          className={cn(
            "text-sm sm:text-base lg:text-lg", 
            "leading-[1.5]", 
            "tracking-normal",
            "text-brand-text-primary", 
            "text-center", 
            "max-w-[500px]",
            "mx-auto", 
            "px-2 sm:px-4", 
            "[word-spacing:0.12em] sm:[word-spacing:0.16em]", 
            "relative z-10", 
            "mt-3 mb-0",
            "font-inter"
          )}
        >
          Connect with expert creators who deliver content that converts. Tailored to your needs and budget.
        </div>
      </div>
      
      <div 
        className={cn(
          "w-full", 
          "mt-6 sm:mt-8",
          "px-3 sm:px-4",
          isInView ? "animate-fade-in delay-200" : "opacity-0" 
        )}
      >
        <WaitlistCTA className="mb-4" />
      </div>
      
      {/* Enhanced decorative element with gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-[150px] pointer-events-none opacity-40 overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-[80px] bg-gradient-to-t from-purple-100/40 via-indigo-50/20 to-transparent" />
      </div>
    </section>
  );
}

export default Hero;
