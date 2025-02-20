
"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Building, UserPlus } from "lucide-react";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import AuroraBackground from "@/components/ui/aurora-background";
import { useIsMobile } from "@/hooks/use-mobile";

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
    <div className="w-full">
      <AuroraBackground className="w-full">
        <div className="flex gap-4 sm:gap-6 lg:gap-8 items-center justify-center flex-col px-4 sm:px-6 py-4 sm:py-6 lg:py-8 min-h-[calc(100vh-4.5rem)] sm:min-h-0">
          <div className="flex gap-3 sm:gap-4 flex-col max-w-4xl mx-auto w-full">
            <h1 className="text-[2rem] sm:text-5xl md:text-6xl tracking-wide leading-[1.15] sm:leading-normal text-center py-3 sm:py-4 my-4 sm:my-6 font-bold lg:text-7xl">
              <span className="text-primary inline whitespace-normal sm:whitespace-nowrap tracking-wide font-light">
                Property Content that
              </span>
              <span className="relative flex w-full justify-center h-[1.2em] overflow-hidden mt-2 sm:mt-0">
                {titles.map((title, index) => (
                  <motion.span 
                    key={index}
                    className="absolute font-playfair tracking-wide"
                    initial={{
                      opacity: 0,
                      y: isMobile ? 25 : 50
                    }}
                    animate={titleNumber === index ? {
                      y: 0,
                      opacity: 1
                    } : {
                      y: titleNumber > index ? (isMobile ? -25 : -50) : (isMobile ? 25 : 50),
                      opacity: 0
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

            <p className="text-sm sm:text-base lg:text-lg leading-relaxed tracking-wide text-muted-foreground max-w-2xl text-center mx-auto px-2 sm:px-4 [word-spacing:0.12em] sm:[word-spacing:0.16em]">
              Connect with top-tier creators for photography, videography, and marketing content that elevates your
              property portfolio.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 w-full px-3 sm:px-4 max-w-xl mx-auto mt-4 sm:mt-6">
            <ShimmerButton 
              className="flex-1 text-sm sm:text-base font-medium gap-2 items-center justify-center sm:gap-3 min-h-[2.75rem] sm:min-h-[3rem] touch-manipulation tracking-wide [word-spacing:0.16em] active:scale-[0.98] transition-transform" 
              background="rgba(255, 255, 255, 0.1)"
            >
              Find Creators <Building className="w-4 h-4 sm:w-5 sm:h-5" />
            </ShimmerButton>
            <ShimmerButton 
              className="flex-1 text-sm sm:text-base font-medium gap-2 items-center justify-center sm:gap-3 min-h-[2.75rem] sm:min-h-[3rem] touch-manipulation tracking-wide [word-spacing:0.16em] active:scale-[0.98] transition-transform"
            >
              Join as Creator <UserPlus className="w-4 h-4 sm:w-5 sm:h-5" />
            </ShimmerButton>
          </div>
        </div>
      </AuroraBackground>
    </div>
  );
}

export default Hero;
