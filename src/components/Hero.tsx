
"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Building, UserPlus } from "lucide-react";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import AuroraBackground from "@/components/ui/aurora-background";

export function Hero() {
  const [titleNumber, setTitleNumber] = useState(0);
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
        <div className="flex gap-4 sm:gap-6 lg:gap-8 items-center justify-center flex-col py-8 sm:py-12 lg:py-16 px-4 sm:px-6">
          <div className="flex gap-3 sm:gap-4 flex-col max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tighter text-center font-medium">
              <span className="text-primary inline whitespace-nowrap">Property Content that</span>
              <span className="relative flex w-full justify-center h-[1.2em] overflow-hidden">
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-playfair"
                    initial={{ opacity: 0, y: 50 }}
                    animate={
                      titleNumber === index
                        ? { y: 0, opacity: 1 }
                        : { y: titleNumber > index ? -50 : 50, opacity: 0 }
                    }
                    transition={{ 
                      type: "spring", 
                      stiffness: 100,
                      damping: 15
                    }}
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-muted-foreground max-w-2xl text-center mx-auto px-4">
              Connect with top-tier creators for photography, videography, and marketing content that elevates your
              property portfolio.
            </p>
          </div>
          
          <div className="flex flex-col gap-3 sm:gap-4 w-full px-4 sm:px-6 max-w-md mx-auto mt-4">
            <ShimmerButton 
              className="w-full text-base font-medium gap-3 h-12 sm:h-14" 
              background="rgba(255, 255, 255, 0.1)"
            >
              I Need Content <Building className="w-5 h-5" />
            </ShimmerButton>
            <ShimmerButton 
              className="w-full text-base font-medium gap-3 h-12 sm:h-14"
            >
              I Create Content <UserPlus className="w-5 h-5" />
            </ShimmerButton>
          </div>
        </div>
      </AuroraBackground>
    </div>
  );
}

export default Hero;
