
"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import AuroraBackground from "@/components/ui/aurora-background";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

export function Hero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const isMobile = useIsMobile();
  const titles = useMemo(() => ["Converts", "Engages", "Drives Leads"], []);

  useEffect(() => {
    // Adjust animation timing for mobile
    const timeout = isMobile ? 2500 : 2000;
    
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, timeout);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles.length, isMobile]);

  return (
    <div className="w-full relative">
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-purple-50/90 via-white to-blue-50/90"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: isMobile ? 15 : 20,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        aria-hidden="true"
      />

      <div 
        className="absolute top-20 right-10 w-48 sm:w-64 h-48 sm:h-64 bg-gradient-to-r from-purple-200/20 to-blue-200/20 rounded-full blur-3xl"
        aria-hidden="true"
      />
      <div 
        className="absolute bottom-20 left-10 w-32 sm:w-48 h-32 sm:h-48 bg-gradient-to-r from-blue-200/20 to-purple-200/20 rounded-full blur-3xl"
        aria-hidden="true"
      />

      <AuroraBackground className="w-full">
        <section className="flex gap-2 sm:gap-6 lg:gap-8 items-center justify-center flex-col px-3 sm:px-6 py-2 sm:py-8 lg:py-12 min-h-[calc(85vh-4.5rem)] sm:min-h-[60vh] relative z-10">
          <div className="flex gap-2 sm:gap-4 flex-col max-w-5xl mx-auto w-full mt-0 sm:mt-4">
            <h1 className="text-[2rem] sm:text-6xl md:text-7xl tracking-tight leading-[1.1] sm:leading-[1.1] text-center py-1 sm:py-4 my-0 sm:my-4 font-bold lg:text-8xl">
              <span className="text-primary inline whitespace-normal sm:whitespace-nowrap tracking-tight font-light bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-black">
                Property Content that
              </span>
              <span 
                className="relative flex w-full justify-center h-[1.6em] sm:h-[1.8em] md:h-[1.6em] lg:h-[1.4em] overflow-hidden mt-0.5 sm:mt-2"
                role="text"
                aria-label={`Property Content that ${titles[titleNumber]}`}
              >
                {titles.map((title, index) => (
                  <motion.span 
                    key={index}
                    className={cn(
                      "absolute font-playfair tracking-tight bg-clip-text text-transparent",
                      "bg-gradient-to-r from-purple-700 via-blue-700 to-cyan-700",
                      titleNumber === index && "text-[2.25rem] sm:text-7xl md:text-8xl lg:text-9xl"
                    )}
                    initial={{
                      opacity: 0,
                      y: isMobile ? 15 : 40,
                      scale: 0.95
                    }}
                    animate={titleNumber === index ? {
                      y: 0,
                      opacity: 1,
                      scale: 1
                    } : {
                      y: titleNumber > index ? (isMobile ? -15 : -40) : (isMobile ? 15 : 40),
                      opacity: 0,
                      scale: 0.95
                    }}
                    transition={{
                      type: "spring",
                      stiffness: isMobile ? 160 : 120,
                      damping: isMobile ? 22 : 17,
                      mass: isMobile ? 0.8 : 1
                    }}
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </h1>

            <p className="text-sm sm:text-lg lg:text-xl leading-relaxed tracking-wide text-gray-700 max-w-2xl text-center mx-auto px-2 sm:px-4 [word-spacing:0.12em] sm:[word-spacing:0.16em] relative z-10">
              Connect with expert content creators for your next project. Our AI-powered platform matches you with the perfect professional for your needs and budget.
            </p>
          </div>
          
          <div className="flex justify-center w-full px-3 sm:px-6 max-w-lg mx-auto mt-2 sm:mt-8">
            <ShimmerButton 
              onClick={() => {}}
              aria-label="Get early access to our platform"
              className="w-full sm:w-auto min-h-[3rem] sm:min-h-[3.25rem] px-4 sm:px-6 text-sm sm:text-base"
            >
              <span>Get Early Access</span>
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-white/90" aria-hidden="true" />
            </ShimmerButton>
          </div>
        </section>
      </AuroraBackground>
    </div>
  );
}

export default Hero;
