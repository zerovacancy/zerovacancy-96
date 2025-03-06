
import React, { useRef, useState, useEffect } from "react";
import { useInView } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { WaitlistCTA } from "../ui/waitlist-cta";
import { TextRotate } from "../ui/text-rotate";
import { Squares } from "../ui/squares";

// Animation titles using the TextRotate component
const TITLES = ["Converts", "Engages", "Drives Leads"];

export function Hero() {
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const [count, setCount] = useState(2165);
  
  // Counter animation effect for social proof
  useEffect(() => {
    if (isInView) {
      const startCount = 2140;
      const endCount = 2165;
      const duration = 2000; // 2 seconds
      const frameDuration = 1000 / 60; // 60fps
      const totalFrames = Math.round(duration / frameDuration);
      let frame = 0;
      
      const counter = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        const currentCount = Math.round(startCount + progress * (endCount - startCount));
        
        if (frame === totalFrames) {
          clearInterval(counter);
        }
        
        setCount(currentCount);
      }, frameDuration);
      
      return () => clearInterval(counter);
    }
  }, [isInView]);
  
  return (
    <section 
      ref={sectionRef}
      className={cn(
        "flex items-center justify-center flex-col", 
        "px-4 sm:px-6", 
        "py-[32px] sm:py-[48px]",
        "my-[24px] sm:my-[32px]",
        "min-h-fit sm:min-h-[65vh]", // Increased min-height for more space
        "relative z-10", 
        "gap-4 sm:gap-6",
        "touch-manipulation",
        "overflow-hidden", // Added for the pattern elements
        isInView ? "animate-fade-in" : "opacity-0"
      )} 
    >
      {/* Abstract background patterns */}
      <div className="absolute inset-0 w-full h-full opacity-[0.15] pointer-events-none">
        <div className="absolute -right-[25%] top-[10%] w-[50%] h-[50%] rounded-full bg-purple-200 mix-blend-multiply filter blur-[80px] animate-float-subtle" />
        <div className="absolute left-[10%] -bottom-[25%] w-[45%] h-[45%] rounded-full bg-blue-200 mix-blend-multiply filter blur-[60px] animate-float-subtle" style={{ animationDelay: "1.5s" }} />
        <div className="absolute left-[5%] top-[15%] w-[25%] h-[25%] rounded-full bg-indigo-200 mix-blend-multiply filter blur-[50px] animate-float-subtle" style={{ animationDelay: "0.8s" }} />
      </div>
      
      {/* Small decorative floating elements */}
      <div className="absolute top-[20%] right-[15%] w-[120px] h-[120px] pointer-events-none opacity-50 sm:block hidden">
        <Squares 
          direction="diagonal" 
          speed={1.5} 
          className="w-full h-full opacity-30"
        />
      </div>
      <div className="absolute bottom-[15%] left-[10%] w-[80px] h-[80px] pointer-events-none opacity-40 rotate-12 sm:block hidden">
        <Squares 
          direction="up" 
          speed={1.2}
          className="w-full h-full opacity-30"
        />
      </div>
      
      <div 
        className={cn(
          "flex gap-5 sm:gap-6 flex-col max-w-6xl mx-auto w-full px-[3px]",
          "relative z-10", // Ensure content is above patterns
          isInView ? "animate-fade-in delay-100" : "opacity-0"
        )}
      >
        {/* Decorative icon near heading */}
        <div className="flex justify-center mb-2 sm:mb-4">
          <div className="w-14 h-1.5 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full"></div>
        </div>
        
        <h1 className="tracking-tight leading-[1.1] text-center font-bold font-jakarta">
          <span 
            className={cn(
              "text-primary inline font-medium",
              "text-3xl sm:text-5xl lg:text-6xl",
              "tracking-[-0.02em]", 
              "text-brand-purple-dark", 
              "block sm:inline-block mb-2 sm:mb-0 font-jakarta",
              "relative"
            )}
          >
            <span className="relative z-10">Property Content that</span>
            {/* Highlight box for depth - only on desktop */}
            <span className="absolute inset-0 -m-1 bg-indigo-50/70 rounded-lg transform rotate-1 hidden sm:block"></span>
          </span>
          
          <div 
            role="text" 
            aria-label="Property Content animation"
            className="relative flex w-full justify-center h-[3em] sm:h-[2em] md:h-[1.8em] lg:h-[1.8em] overflow-visible mt-3 sm:mt-4"
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
                // Enhanced gradient with more colors for impact
                "bg-gradient-to-r from-[#4A2DD9] via-[#8A2BE2] to-[#4169E1]",
                // Add shine animation effect
                "animate-shine bg-shine-size",
                // Add shadow for more striking appearance
                "drop-shadow-sm"
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
            "px-4 sm:px-6", // Increased padding
            "[word-spacing:0.12em] sm:[word-spacing:0.16em]", 
            "relative z-10", 
            "mt-8 sm:mt-14 mb-0", // Adjusted spacing
            "font-inter",
            // Added highlight effect with a subtle background
            "p-3 sm:p-4 rounded-lg bg-white/50 backdrop-blur-sm"
          )}
        >
          Connect with expert creators who deliver content that converts. Tailored to your needs and budget.
        </div>
      </div>
      
      <div 
        className={cn(
          "w-full", 
          "mt-5 sm:mt-8", // Adjusted spacing
          "px-4 sm:px-6", // Increased padding
          "relative z-10", // Ensure it's above the background
          isInView ? "animate-fade-in delay-200" : "opacity-0" 
        )}
      >
        {/* Small benefit statement above CTA */}
        <p className="text-xs sm:text-sm text-center text-brand-purple-medium/80 mb-3 font-medium">
          Launch your property marketing in minutes, not weeks
        </p>
        
        <WaitlistCTA className="mb-4 sm:px-0" />
        
        {/* Improved social proof section with background */}
        <div className="flex items-center justify-center mt-6 relative">
          {/* Subtle background */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-50/70 via-indigo-50/70 to-blue-50/70 rounded-full blur-sm"></div>
          
          <div className="flex -space-x-1.5 mr-4 items-center relative z-10"> 
            {/* Larger avatars with enhanced styling */}
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 flex items-center justify-center text-[10px] text-white font-bold border-2 border-white shadow-md">JT</div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 flex items-center justify-center text-[10px] text-white font-bold border-2 border-white shadow-md">MI</div>
            {!isMobile && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 flex items-center justify-center text-[10px] text-white font-bold border-2 border-white shadow-md">AS</div>
            )}
          </div>
          
          <div className="text-xs text-gray-600 flex items-center whitespace-nowrap relative z-10">
            {/* Animated counter for people joined */}
            <span><strong className="font-semibold text-gray-800">{count}+</strong> <span className="font-medium">people joined</span></span>
            <span className="mx-2.5">•</span>
            <span className="text-gray-600">Queue: {isMobile ? "1-2 days" : "2-3 weeks"}</span>
          </div>
        </div>
      </div>
      
      {/* Enhanced decorative element with more pronounced gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-[180px] pointer-events-none opacity-60 overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-[150px] bg-gradient-to-t from-indigo-100/60 via-purple-50/40 to-transparent"></div>
      </div>
    </section>
  );
}

export default Hero;
