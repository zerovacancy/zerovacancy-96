
import React, { useRef, useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { WaitlistCTA } from "../ui/waitlist-cta";

export function Hero() {
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);
  
  useEffect(() => {
    if (!sectionRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '100px' }
    );
    
    observer.observe(sectionRef.current);
    
    return () => {
      observer.disconnect();
    };
  }, []);
  
  return (
    <section 
      ref={sectionRef}
      className={cn(
        "flex items-center justify-center flex-col", 
        "px-4 sm:px-6", 
        "py-12 sm:py-16 md:py-20",
        "min-h-[30vh] sm:min-h-[36vh]",
        "relative z-10",
        "gap-6 sm:gap-8",
        "bg-gradient-to-b from-purple-50 via-indigo-50/60 to-blue-50/30",
        isInView ? "opacity-100 transition-opacity duration-700" : "opacity-0"
      )} 
    >
      <div 
        className={cn(
          "flex flex-col max-w-6xl mx-auto w-full",
          "gap-4 sm:gap-6"
        )}
      >
        <div className="relative">
          <h1 className="text-center">
            <span 
              className={cn(
                "text-2xl sm:text-3xl md:text-4xl lg:text-5xl",
                "font-bold font-jakarta tracking-tight leading-tight",
                "bg-clip-text text-transparent", 
                "bg-gradient-to-r from-[#4A2DD9] via-[#8A2BE2] to-[#4169E1]",
                "block px-2"
              )}
            >
              Property spaces deserve visionaries, not vendors.
            </span>
          </h1>
          
          {isMobile && (
            <div className="absolute -inset-2 top-auto bg-gradient-to-b from-purple-50/30 to-transparent -z-10 rounded-xl blur-xl"></div>
          )}
        </div>

        <div 
          className={cn(
            "text-xs sm:text-sm md:text-base lg:text-lg", 
            "leading-relaxed sm:leading-relaxed", 
            "text-brand-text-primary text-center", 
            "max-w-[500px] mx-auto px-2 sm:px-4", 
            "font-inter"
          )}
        >
          Connect with creators who see beyond square footage to capture the soul of your spaces. Our curated network transforms properties into visual narratives that intrigue, inspire, and ultimately convert.
        </div>
      </div>
      
      <WaitlistCTA className="w-full max-w-xl" />
      
      <div className="absolute bottom-0 left-0 right-0 h-[100px] pointer-events-none opacity-40">
        <div className="absolute bottom-0 left-0 right-0 h-[100px] bg-gradient-to-t from-indigo-100/60 via-purple-50/40 to-transparent" />
      </div>
    </section>
  );
}

export default Hero;
