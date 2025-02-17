"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Building, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
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
  return <div className="w-full">
      <div className="container mx-auto py-0">
        <div className="flex gap-8 items-center justify-center flex-col lg:py-[52px] py-[124px] px-0 mx-0">
          <div className="flex gap-4 flex-col">
            <h1 className="text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-regular">
              <span className="text-primary">Property Content that</span>
              <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
                &nbsp;
                {titles.map((title, index) => <motion.span key={index} className="absolute font-semibold" initial={{
                opacity: 0,
                y: "-100"
              }} transition={{
                type: "spring",
                stiffness: 50
              }} animate={titleNumber === index ? {
                y: 0,
                opacity: 1
              } : {
                y: titleNumber > index ? -150 : 150,
                opacity: 0
              }}>
                    {title}
                  </motion.span>)}
              </span>
            </h1>

            <p className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center">
              Connect with top-tier creators for photography, videography, and marketing content that elevates your
              property portfolio.
            </p>
          </div>
          <div className="flex flex-row gap-3">
            <Button size="lg" className="gap-4" variant="outline">
              I Need Content <Building className="w-4 h-4" />
            </Button>
            <Button size="lg" className="gap-4">
              I Create Content <UserPlus className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>;
}
export default Hero;