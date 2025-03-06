
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface PricingToggleProps {
  isYearly: boolean;
  setIsYearly: (isYearly: boolean) => void;
  yearlyDiscount?: string;
}

export const PricingToggle = ({
  isYearly,
  setIsYearly,
  yearlyDiscount
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
      <div className={cn(
        "relative p-1 bg-white/70 backdrop-blur-sm rounded-full flex items-center shadow-sm border border-slate-100/50",
        isMobile ? "w-full max-w-xs" : "w-80"
      )}>
        {/* Monthly option */}
        <button
          onClick={() => setIsYearly(false)}
          className={cn(
            "relative z-20 w-1/2 py-2 rounded-full text-sm font-medium font-inter transition-colors",
            "touch-manipulation focus:outline-none active:scale-95", 
            isYearly ? "text-slate-600" : "text-brand-purple-dark"
          )}
        >
          Monthly
        </button>
        
        {/* Annual option */}
        <button
          onClick={() => setIsYearly(true)}
          className={cn(
            "relative z-20 w-1/2 py-2 rounded-full text-sm font-medium font-inter transition-colors",
            "touch-manipulation focus:outline-none active:scale-95",
            isYearly ? "text-brand-purple-dark" : "text-slate-600"
          )}
        >
          Annual
        </button>
        
        {/* Active slider with improved animation */}
        <motion.div
          className={cn(
            "absolute left-0 h-full top-0 rounded-full bg-white shadow-[0_2px_6px_rgba(0,0,0,0.08)]",
            animateChange && isYearly ? "ring-2 ring-brand-purple/30 ring-offset-1" : ""
          )}
          initial={false}
          animate={{
            x: isYearly ? "50%" : "0%"
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30
          }}
          style={{ width: "50%" }}
        />
      </div>
    </div>
  );
};
