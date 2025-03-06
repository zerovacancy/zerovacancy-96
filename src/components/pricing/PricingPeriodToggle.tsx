
import React from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface PricingPeriodToggleProps {
  period: number;
  handleChangePeriod: (index: number) => void;
  animatePriceChange: boolean;
}

export const PricingPeriodToggle: React.FC<PricingPeriodToggleProps> = ({ 
  period, 
  handleChangePeriod, 
  animatePriceChange 
}) => {
  return (
    <div className="relative w-full z-10">
      <div className="rounded-full relative w-full bg-slate-100 p-1.5 flex items-center shadow-inner">
        <button
          className={cn(
            "font-medium font-inter rounded-full w-full p-2 z-20 touch-manipulation transition-colors",
            period === 0 ? "text-brand-purple-dark" : "text-slate-600"
          )}
          onClick={() => handleChangePeriod(0)}
        >
          Monthly
        </button>
        <button
          className={cn(
            "font-medium font-inter rounded-full w-full p-2 z-20 touch-manipulation transition-colors",
            period === 1 ? "text-brand-purple-dark" : "text-slate-600"
          )}
          onClick={() => handleChangePeriod(1)}
        >
          Yearly
        </button>
        <motion.div
          className="p-1.5 flex items-center justify-center absolute inset-0 w-1/2 z-10"
          initial={false}
          animate={{
            x: `${period * 100}%`,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30
          }}
        >
          <div className="bg-white shadow-sm rounded-full w-full h-full"></div>
        </motion.div>
      </div>
      
      {/* Yearly discount badge */}
      <AnimatePresence>
        {period === 1 && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-gradient-to-r from-brand-purple-medium to-brand-purple text-white text-xs font-medium font-inter px-3 py-1 rounded-full shadow-md"
          >
            Save up to 30% annually
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
