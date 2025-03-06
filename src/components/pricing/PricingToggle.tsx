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
        "relative p-1 bg-slate-100 rounded-full flex items-center",
        isMobile ? "w-full max-w-xs" : "w-80"
      )}>
        {/* Monthly option */}
        <button
          onClick={() => setIsYearly(false)}
          className={cn(
            "relative z-20 w-1/2 py-2 rounded-full text-sm font-medium transition-colors",
            "touch-manipulation focus:outline-none", 
            isYearly ? "text-slate-600" : "text-slate-900"
          )}
        >
          Monthly
        </button>
        
        {/* Annual option */}
        <button
          onClick={() => setIsYearly(true)}
          className={cn(
            "relative z-20 w-1/2 py-2 rounded-full text-sm font-medium transition-colors",
            "touch-manipulation focus:outline-none",
            isYearly ? "text-slate-900" : "text-slate-600"
          )}
        >
          Annual
        </button>
        
        {/* Active slider */}
        <motion.div
          className={cn(
            "absolute left-0 h-full top-0 rounded-full bg-white shadow-sm",
            animateChange && isYearly ? "ring-2 ring-violet-300 ring-offset-1" : ""
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
      
      {/* Discount badge */}
      {isYearly && yearlyDiscount && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          className={cn(
            "mt-2 py-1 px-3 bg-gradient-to-r from-violet-500 to-purple-500 text-white",
            "text-xs font-medium rounded-full shadow-sm",
            animateChange ? "animate-bounce-once" : ""
          )}
        >
          {yearlyDiscount}
        </motion.div>
      )}
    </div>
  );
};
