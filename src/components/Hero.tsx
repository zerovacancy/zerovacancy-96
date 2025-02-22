
"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Sparkle } from "lucide-react";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import AuroraBackground from "@/components/ui/aurora-background";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

export function Hero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const isMobile = useIsMobile();
  const titles = useMemo(() => ["engages", "converts", "impresses", "stands out", "educates"], []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles.length]);

  return (
    <div className="w-full relative">
      {/* Animated gradient background */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-purple-50/90 via-white to-blue-50/90"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-gradient-to-r from-purple-200/20 to-blue-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-48 h-48 bg-gradient-to-r from-blue-200/20 to-purple-200/20 rounded-full blur-3xl" />

      <AuroraBackground className="w-full">
        <div className="flex gap-6 sm:gap-8 lg:gap-10 items-center justify-center flex-col px-4 sm:px-6 py-8 sm:py-12 lg:py-16 min-h-[calc(100vh-4.5rem)] sm:min-h-0 relative z-10">
          <div className="flex gap-3 sm:gap-4 flex-col max-w-5xl mx-auto w-full">
            <h1 className="text-[2.5rem] sm:text-6xl md:text-7xl tracking-tight leading-[1.1] sm:leading-[1.1] text-center py-2 sm:py-4 my-2 sm:my-4 font-bold lg:text-8xl">
              <span className="text-primary inline whitespace-normal sm:whitespace-nowrap tracking-tight font-light bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-black">
                Property Content that
              </span>
              <span className="relative flex w-full justify-center h-[2em] sm:h-[1.8em] md:h-[1.6em] lg:h-[1.4em] overflow-hidden mt-1 sm:mt-2">
                {titles.map((title, index) => (
                  <motion.span 
                    key={index}
                    className={cn(
                      "absolute font-playfair tracking-tight bg-clip-text text-transparent",
                      "bg-gradient-to-r from-purple-700 via-blue-700 to-cyan-700",
                      titleNumber === index && "text-[3rem] sm:text-7xl md:text-8xl lg:text-9xl"
                    )}
                    initial={{
                      opacity: 0,
                      y: isMobile ? 25 : 50,
                      scale: 0.9
                    }}
                    animate={titleNumber === index ? {
                      y: 0,
                      opacity: 1,
                      scale: 1
                    } : {
                      y: titleNumber > index ? (isMobile ? -25 : -50) : (isMobile ? 25 : 50),
                      opacity: 0,
                      scale: 0.9
                    }}
                    transition={{
                      type: "spring",
                      stiffness: isMobile ? 120 : 100,
                      damping: isMobile ? 18 : 15
                    }}
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl leading-relaxed tracking-wide text-gray-700 max-w-2xl text-center mx-auto px-2 sm:px-4 [word-spacing:0.12em] sm:[word-spacing:0.16em] relative z-10">
              Connect with top-tier creators for photography, videography, and marketing content that elevates your
              property portfolio.
            </p>
          </div>
          
          <div className="flex justify-center w-full px-4 sm:px-6 max-w-lg mx-auto mt-6 sm:mt-8">
            <ShimmerButton 
              className={cn(
                "relative group/btn overflow-hidden",
                "w-full sm:w-auto min-w-[200px]",
                "h-12 sm:h-14",
                "text-base sm:text-lg font-medium",
                "px-8 sm:px-12",
                "flex items-center justify-center gap-2 sm:gap-3",
                "bg-gradient-to-r from-[#9b87f5] to-[#D946EF]",
                "hover:from-[#8e77f3] hover:to-[#D033ED]",
                "shadow-lg hover:shadow-xl",
                "transition-all duration-300",
                "hover:scale-[1.02] active:scale-[0.98]"
              )}
              shimmerColor="rgba(255, 255, 255, 0.2)"
              shimmerSize="60%"
              shimmerDuration="2s"
              onClick={() => {}}
            >
              <span className="relative z-10">Join Waitlist</span>
              <Sparkle className="w-5 h-5 sm:w-6 sm:h-6 text-white/90" />
            </ShimmerButton>
          </div>
        </div>
      </AuroraBackground>
    </div>
  );
}

export default Hero;
