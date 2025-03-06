
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface PricingToggleProps {
  isYearly: boolean;
  setIsYearly: (isYearly: boolean) => void;
}

export const PricingToggle = ({
  isYearly,
  setIsYearly
}: PricingToggleProps) => {
  const isMobile = useIsMobile();
  const [animateChange, setAnimateChange] = useState(false);
  
  // Animate highlight when changing billing period
  useEffect(() => {
    setAnimateChange(true);
    const timer = setTimeout(() => setAnimateChange(false), 2000);
    return () => clearTimeout(timer);
  }, [isYearly]);

  return (
    <div className="flex flex-col items-center">
      {/* Toggle container */}
      <div className={cn(
        "pricing-toggle-container",
        isMobile ? "max-w-xs" : "w-80"
      )}>
        {/* Monthly option */}
        <button
          onClick={() => setIsYearly(false)}
          className={cn(
            "pricing-toggle-button",
            "touch-manipulation focus:outline-none", 
            isYearly ? "text-slate-600" : "text-brand-purple-dark"
          )}
        >
          Monthly
        </button>
        
        {/* Annual option */}
        <button
          onClick={() => setIsYearly(true)}
          className={cn(
            "pricing-toggle-button",
            "touch-manipulation focus:outline-none",
            isYearly ? "text-brand-purple-dark" : "text-slate-600"
          )}
        >
          Annual
        </button>
        
        {/* Active slider */}
        <motion.div
          className={cn(
            "pricing-toggle-slider",
            isYearly ? "annual" : "monthly",
            animateChange && isYearly ? "ring-2 ring-brand-purple/30 ring-offset-1" : ""
          )}
          initial={false}
          animate={{
            x: isYearly ? "100%" : "0%"
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30
          }}
        />
      </div>
    </div>
  );
};
