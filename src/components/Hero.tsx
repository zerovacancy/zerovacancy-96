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
  return <div className="w-full relative">
      <motion.div className="absolute inset-0 bg-gradient-to-br from-purple-50/90 via-white to-blue-50/90" animate={{
      backgroundPosition: ["0% 0%", "100% 100%"]
    }} transition={{
      duration: isMobile ? 15 : 20,
      repeat: Infinity,
      repeatType: "reverse"
    }} aria-hidden="true" />

      <div className="absolute top-20 right-10 w-48 sm:w-64 h-48 sm:h-64 bg-gradient-to-r from-purple-200/20 to-blue-200/20 rounded-full blur-3xl" aria-hidden="true" />
      <div className="absolute bottom-20 left-10 w-32 sm:w-48 h-32 sm:h-48 bg-gradient-to-r from-blue-200/20 to-purple-200/20 rounded-full blur-3xl" aria-hidden="true" />

      <AuroraBackground className="w-full">
        <section className="flex gap-6 sm:gap-8 lg:gap-10 items-center justify-center flex-col px-4 sm:px-6 pt-0 pb-4 sm:py-12 min-h-fit sm:min-h-[60vh] relative z-10 py-[62px] my-[42px]">
          <div className="flex gap-4 sm:gap-6 flex-col max-w-5xl mx-auto w-full mt-0 sm:mt-4 my-[12px] py-0">
            <h1 className="text-[2rem] sm:text-6xl md:text-7xl tracking-tight leading-[1.1] sm:leading-[1.1] text-center sm:py-4 sm:my-4 font-bold lg:text-8xl py-0 my-0">
              <span className="text-primary inline whitespace-normal sm:whitespace-nowrap tracking-tight font-light bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-black">
                Property Content that
              </span>
              <span role="text" aria-label={`Property Content that ${titles[titleNumber]}`} className="relative flex w-full justify-center h-[1.6em] sm:h-[1.8em] md:h-[1.6em] lg:h-[1.4em] overflow-hidden mt-0.5 sm:mt-2 my-0">
                {titles.map((title, index) => <motion.span key={index} className={cn("absolute font-playfair tracking-tight bg-clip-text text-transparent", "bg-gradient-to-r from-purple-700 via-blue-700 to-cyan-700", titleNumber === index && "text-[2.25rem] sm:text-7xl md:text-8xl lg:text-9xl")} initial={{
                opacity: 0,
                y: isMobile ? 15 : 40,
                scale: 0.95
              }} animate={titleNumber === index ? {
                y: 0,
                opacity: 1,
                scale: 1
              } : {
                y: titleNumber > index ? isMobile ? -15 : -40 : isMobile ? 15 : 40,
                opacity: 0,
                scale: 0.95
              }} transition={{
                type: "spring",
                stiffness: isMobile ? 160 : 120,
                damping: isMobile ? 22 : 17,
                mass: isMobile ? 0.8 : 1
              }}>
                    {title}
                  </motion.span>)}
              </span>
            </h1>

            <p className="text-sm sm:text-lg lg:text-xl leading-relaxed tracking-wide text-gray-700 max-w-2xl text-center mx-auto px-2 sm:px-4 [word-spacing:0.12em] sm:[word-spacing:0.16em] relative z-10">
              Connect with expert content creators for your next project. Our AI-powered platform matches you with the perfect professional for your needs and budget.
            </p>
          </div>
          
          <div className="w-full sm:px-6 mt-4 sm:mt-8 mb-8 sm:mb-16 py-0 px-[27px] my-0">
            <WaitlistCTA />
          </div>
        </section>
      </AuroraBackground>
    </div>;
}
export default Hero;