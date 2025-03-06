
import React, { useRef } from "react";
import { useInView } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { WaitlistCTA } from "../ui/waitlist-cta";
import { TextRotate } from "../ui/text-rotate";

const TITLES = ["Converts", "Captivates", "Drives Leads"];

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
        // Further reduced padding on desktop, kept mobile padding
        isMobile ? "py-[24px]" : "py-[16px]", // Reduced from py-[32px]
        // Adjusted margins for desktop
        isMobile ? "my-[16px]" : "my-[12px]", // Reduced from my-[24px]
        // Reduced min-height for desktop by ~20%
        "min-h-fit sm:min-h-[36vh]", // Reduced from 45vh
        "relative z-10", 
        // Reduced gap for tighter spacing
        isMobile ? "gap-3" : "gap-2", // Reduced from gap-4
        "touch-manipulation",
        "bg-gradient-to-b from-purple-50 via-indigo-50/60 to-blue-50/30",
        isInView ? "animate-fade-in" : "opacity-0"
      )} 
    >
      <div 
        className={cn(
          // Tightened gap for desktop content
          "flex flex-col max-w-6xl mx-auto w-full px-[3px]",
          isMobile ? "gap-3" : "gap-2", // Reduced from gap-4
          isInView ? "animate-fade-in delay-100" : "opacity-0"
        )}
      >
        <div className="relative">
          <h1 className={cn(
            "tracking-tight leading-[1.1] text-center font-bold font-jakarta",
            // Reduced bottom margin for desktop
            isMobile ? "mb-3" : "mb-2" // Reduced from mb-4
          )}>
            {isMobile ? (
              <span className="flex flex-col items-center">
                <span 
                  className={cn(
                    "text-primary inline-block font-medium",
                    "text-2xl sm:text-5xl lg:text-6xl",
                    "tracking-[-0.02em]", 
                    "text-brand-purple-dark mb-1"
                  )}
                >
                  Property Content that
                </span>
                <span 
                  className={cn(
                    "text-3xl sm:text-5xl lg:text-7xl",
                    "font-bold font-jakarta tracking-[-0.02em]",
                    "bg-clip-text text-transparent", 
                    "bg-gradient-to-r from-[#4A2DD9] via-[#8A2BE2] to-[#4169E1]"
                  )}
                >
                  Drives Leads
                </span>
              </span>
            ) : (
              <>
                <span 
                  className={cn(
                    "text-primary inline font-medium",
                    "text-3xl sm:text-5xl lg:text-6xl",
                    "tracking-[-0.02em]", 
                    "text-brand-purple-dark", 
                    "block sm:inline-block mb-1 sm:mb-0 font-jakarta" // Reduced from mb-2
                  )}
                >
                  Property Content that
                </span>
                
                <div 
                  role="text" 
                  aria-label="Property Content animation"
                  className="relative flex w-full justify-center h-[4.5em] sm:h-[3em] md:h-[2.5em] lg:h-[2.5em] overflow-visible mt-1 sm:mt-1" // Reduced heights and margins
                >
                  <TextRotate
                    texts={TITLES}
                    mainClassName="flex justify-center items-center overflow-visible"
                    staggerFrom="last"
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "-100%", opacity: 0 }}
                    staggerDuration={0.02}
                    splitLevelClassName="overflow-visible"
                    elementLevelClassName={cn(
                      "text-4xl sm:text-5xl lg:text-7xl",
                      "font-bold font-jakarta tracking-[-0.02em]",
                      "bg-clip-text text-transparent", 
                      "bg-gradient-to-r from-[#4A2DD9] via-[#8A2BE2] to-[#4169E1]",
                      "overflow-visible"
                    )}
                    transition={{ 
                      type: "spring", 
                      damping: 28, 
                      stiffness: 350
                    }}
                    rotationInterval={2200}
                  />
                </div>
              </>
            )}
          </h1>
          
          {isMobile && (
            <div className="absolute -inset-2 top-auto bg-gradient-to-b from-purple-50/30 to-transparent -z-10 rounded-xl blur-xl"></div>
          )}
        </div>

        <div 
          className={cn(
            isMobile ? "text-xs" : "text-base lg:text-lg", 
            isMobile ? "leading-[1.4]" : "leading-[1.5]", 
            "tracking-normal",
            "text-brand-text-primary", 
            "text-center", 
            "max-w-[500px]",
            "mx-auto", 
            "px-2 sm:px-4", 
            "[word-spacing:0.12em] sm:[word-spacing:0.16em]", 
            "relative z-10", 
            // Reduced top margin significantly for desktop
            isMobile ? "mt-2" : "mt-3", // Reduced from mt-8
            "mb-0", 
            "font-inter"
          )}
        >
          Connect with expert creators who deliver content that converts. Tailored to your needs and budget.
        </div>
      </div>
      
      <div 
        className={cn(
          "w-full", 
          // Reduced top margin for desktop
          isMobile ? "mt-2" : "mt-3", // Reduced from mt-6
          "px-3 sm:px-4",
          isInView ? "animate-fade-in delay-200" : "opacity-0" 
        )}
      >
        <WaitlistCTA className="mb-2 sm:mb-3" /> {/* Reduced bottom margin */}
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-[150px] sm:h-[140px] pointer-events-none opacity-50 overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-[100px] sm:h-[100px] bg-gradient-to-t from-indigo-100/60 via-purple-50/40 to-transparent" />
      </div>
    </section>
  );
}

export default Hero;
