import React, { useRef } from "react";
import { cn } from "@/lib/utils";
import { WaitlistCTA } from "../ui/waitlist/waitlist-cta";
import { TextRotate, TextRotateRef } from "../ui/text-rotate";

export function Hero() {
  const rotatingWords = ["CONVERTS", "ENGAGES", "CAPTIVATES", "DRIVES LEADS"];
  const textRotateRef = useRef<TextRotateRef>(null);
  
  // Function to manually trigger next word animation on mobile tap
  const handleHeadingTap = () => {
    textRotateRef.current?.next();
  };
  
  return <section className="flex flex-col items-center justify-center px-4 sm:px-6 py-12 sm:py-16 md:py-20 min-h-[40vh] relative z-10">
      <div className="max-w-5xl w-full mx-auto flex flex-col gap-8 sm:gap-10">
        <h1 className="text-center flex flex-col items-center gap-1 sm:gap-2">
          {/* Enhanced static heading with gradient and animation classes */}
          <span 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold font-inter tracking-tight leading-tight block bg-gradient-to-r from-[#4A2DD9] via-[#5A48E3] to-[#7B68EE] text-transparent bg-clip-text drop-shadow-sm px-0 mx-0 transform transition-all duration-500 hover:scale-105 animate-fadeIn"
          >
            PROPERTY CONTENT THAT
          </span>
          
          {/* Enhanced TextRotate with more dynamic styling and effects */}
          <div 
            className="relative h-16 sm:h-18 md:h-22 lg:h-24 xl:h-28 overflow-visible w-full flex justify-center items-center cursor-pointer"
            onClick={handleHeadingTap}
          >
            {/* Animated glow effect using CSS animations */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#341F9A]/20 to-[#7B68EE]/20 rounded-lg blur-xl animate-pulse opacity-70"></div>
            
            {/* Simple decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-[#4A2DD9]/40"></div>
              <div className="absolute top-3/4 left-1/3 w-2 h-2 rounded-full bg-[#4A2DD9]/40"></div>
              <div className="absolute top-1/3 right-1/4 w-2 h-2 rounded-full bg-[#4A2DD9]/40"></div>
              <div className="absolute bottom-1/4 right-1/3 w-2 h-2 rounded-full bg-[#4A2DD9]/40"></div>
            </div>
            
            <TextRotate 
              ref={textRotateRef}
              texts={rotatingWords}
              mainClassName="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold font-inter bg-gradient-to-r from-[#4A2DD9] via-[#5C4AE6] to-[#6F5CE8] text-transparent bg-clip-text drop-shadow-lg inline-block"
              rotationInterval={2800}
              transition={{ type: "spring", damping: 18, stiffness: 220 }}
              initial={{ y: "120%", opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: "-120%", opacity: 0, scale: 0.9 }}
              staggerDuration={0.04}
              staggerFrom="center"
              enhancedAnimation={true}
              elementLevelClassName="transform transition-all duration-300"
            />
          </div>
        </h1>

        <p className="text-sm sm:text-base md:text-lg text-center text-brand-text-primary max-w-2xl mx-auto px-2 font-inter">
          Connect with creators who see beyond square footage to capture the soul of your spaces. Our curated network transforms properties into visual narratives that intrigue, inspire, and ultimately convert.
        </p>
      </div>
      
      <div className="w-full max-w-xl mx-auto mt-10 sm:mt-12">
        <WaitlistCTA />
      </div>
    </section>;
}
export default Hero;
