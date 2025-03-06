
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
        // Reduced vertical padding on mobile by ~25%
        "py-[24px] sm:py-[48px]",
        // Reduced vertical margins on mobile by ~30%
        "my-[16px] sm:my-[32px]",
        "min-h-fit sm:min-h-[55vh]",
        "relative z-10", 
        // Reduced gap on mobile by ~30%
        "gap-3 sm:gap-6",
        "touch-manipulation",
        // Enhanced gradient background with softer purple to blue transition
        "bg-gradient-to-b from-purple-50 via-indigo-50/60 to-blue-50/30",
        isInView ? "animate-fade-in" : "opacity-0"
      )} 
    >
      <div 
        className={cn(
          // Reduced gap on mobile by ~30%
          "flex gap-3 sm:gap-6 flex-col max-w-6xl mx-auto w-full px-[3px]",
          isInView ? "animate-fade-in delay-100" : "opacity-0"
        )}
      >
        <div className="relative">
          {/* Mobile-optimized heading structure with combined headline */}
          <h1 className={cn(
            "tracking-tight leading-[1.1] text-center font-bold font-jakarta",
            // Reduced vertical spacing
            isMobile ? "mb-3" : "mb-6"
          )}>
            {isMobile ? (
              // Mobile: Combined headline with inline "Drives Leads" for space efficiency
              <span className="flex flex-col items-center">
                <span 
                  className={cn(
                    "text-primary inline-block font-medium",
                    // Smaller text on mobile
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
              // Desktop: Original implementation with TextRotate
              <>
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
                  className="relative flex w-full justify-center h-[3em] sm:h-[2em] md:h-[1.8em] lg:h-[1.8em] overflow-visible mt-2 sm:mt-3"
                >
                  <TextRotate
                    texts={TITLES}
                    mainClassName="flex justify-center items-center"
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
              </>
            )}
          </h1>
          
          {/* Added subtle text shadow for improved contrast without needing extra space */}
          {isMobile && (
            <div className="absolute -inset-2 top-auto bg-gradient-to-b from-purple-50/30 to-transparent -z-10 rounded-xl blur-xl"></div>
          )}
        </div>

        <div 
          className={cn(
            // Slightly smaller font on mobile
            "text-xs sm:text-base lg:text-lg", 
            // Tighter line height on mobile
            isMobile ? "leading-[1.4]" : "leading-[1.5]", 
            "tracking-normal",
            "text-brand-text-primary", 
            "text-center", 
            "max-w-[500px]",
            "mx-auto", 
            "px-2 sm:px-4", 
            "[word-spacing:0.12em] sm:[word-spacing:0.16em]", 
            "relative z-10", 
            // Significantly reduced top margin on mobile
            "mt-2 sm:mt-16 mb-0", 
            "font-inter"
          )}
        >
          Connect with expert creators who deliver content that converts. Tailored to your needs and budget.
        </div>
      </div>
      
      <div 
        className={cn(
          "w-full", 
          // Reduced top margin on mobile by 50%
          "mt-2 sm:mt-8",
          "px-3 sm:px-4",
          isInView ? "animate-fade-in delay-200" : "opacity-0" 
        )}
      >
        <WaitlistCTA className="mb-2 sm:mb-4" />
      </div>
      
      {/* Enhanced decorative element with more pronounced gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-[150px] sm:h-[180px] pointer-events-none opacity-50 overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-[100px] sm:h-[120px] bg-gradient-to-t from-indigo-100/60 via-purple-50/40 to-transparent" />
      </div>
    </section>
  );
}

export default Hero;
