
"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import AuroraBackground from "@/components/ui/aurora-background";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { WaitlistCTA } from "./ui/waitlist-cta";

export function Hero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const isMobile = useIsMobile();
  const titles = useMemo(() => ["Converts", "Engages", "Drives Leads"], []);

  useEffect(() => {
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
          backgroundPosition: ["0% 0%", "100% 100%"]
        }} 
        transition={{
          duration: isMobile ? 15 : 20,
          repeat: Infinity,
          repeatType: "reverse"
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
        <motion.section 
          className={cn(
            "flex items-center justify-center flex-col",
            "px-4 sm:px-6",
            "py-[40px] sm:py-[64px]",
            "my-[32px] sm:my-[48px]",
            "min-h-fit sm:min-h-[70vh]",
            "relative z-10",
            "gap-6 sm:gap-8"
          )}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div 
            className="flex gap-6 sm:gap-8 flex-col max-w-5xl mx-auto w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <h1 className="tracking-tight leading-[1.1] text-center font-bold">
              <span className={cn(
                "text-primary inline font-light",
                "text-4xl sm:text-5xl lg:text-6xl",
                "tracking-[-0.02em]",
                "bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-black",
                "block sm:inline-block mb-2 sm:mb-0"
              )}>
                Property Content that
              </span>
              <span 
                role="text" 
                aria-label={`Property Content that ${titles[titleNumber]}`} 
                className="relative flex w-full justify-center h-[1.6em] sm:h-[1.8em] md:h-[1.6em] lg:h-[1.4em] overflow-hidden mt-2 sm:mt-3"
              >
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className={cn(
                      "absolute font-playfair tracking-[-0.02em] bg-clip-text text-transparent",
                      "bg-gradient-to-r from-purple-700 via-blue-700 to-cyan-700",
                      titleNumber === index && "text-5xl sm:text-6xl lg:text-7xl"
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
                      y: titleNumber > index ? isMobile ? -15 : -40 : isMobile ? 15 : 40,
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

            <motion.p 
              className={cn(
                "text-sm sm:text-lg lg:text-xl",
                "leading-[1.6]",
                "tracking-wide",
                "text-gray-700",
                "text-center",
                "max-w-[650px]",
                "mx-auto",
                "px-4 sm:px-6",
                "[word-spacing:0.12em] sm:[word-spacing:0.16em]",
                "relative z-10"
              )}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              Connect with expert content creators for your next project. Our AI-powered platform matches you with the perfect professional for your needs and budget.
            </motion.p>
          </motion.div>
          
          <motion.div 
            className={cn(
              "w-full",
              "mt-8 sm:mt-10",
              "px-4 sm:px-6"
            )}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <WaitlistCTA className="mb-10" />
          </motion.div>
        </motion.section>
      </AuroraBackground>
    </div>
  );
}

export default Hero;
