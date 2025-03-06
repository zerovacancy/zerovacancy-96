
import React from "react";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import NumberFlow from '@number-flow/react';
import { PricingFeatures } from "./PricingFeatures";
import { PricingPlanProps } from "./types";

interface PricingTierProps {
  plan: PricingPlanProps;
  index: number;
  price: number;
  period: number;
  animatePriceChange: boolean;
  expandedFeatures: boolean;
  toggleFeatures: () => void;
  handleGetStarted: (planName: string) => void;
  calculateSavings?: (index: number) => number | null;
}

export const PricingTier: React.FC<PricingTierProps> = ({
  plan,
  index,
  price,
  period,
  animatePriceChange,
  expandedFeatures,
  toggleFeatures,
  handleGetStarted,
  calculateSavings
}) => {
  // Value propositions for each plan
  const VALUE_PROPOSITIONS = {
    0: "Great for trying things out",
    1: "Most popular for real estate agents",
    2: "Perfect for luxury properties"
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="w-full"
    >
      <motion.div
        className={cn(
          "w-full flex flex-col p-5 rounded-xl",
          "relative overflow-visible",
          "border-2 border-brand-purple bg-white shadow-md"
        )}
        whileTap={{ scale: 0.98 }}
        layout
      >
        {/* Popular tag positioned above title */}
        {plan.showPopular && (
          <div className="absolute top-0 left-0 right-0 mt-[-12px] flex justify-center z-10">
            <div className="py-1 px-2.5 flex items-center gap-1 rounded-lg bg-gradient-to-r from-brand-purple-medium to-brand-purple text-white text-sm shadow-md">
              <Sparkles className="h-3 w-3" />
              <span className="font-medium font-inter">Popular</span>
            </div>
          </div>
        )}
        
        <div className="flex justify-between items-start mt-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <p className="font-semibold text-xl flex items-center gap-2 text-gray-950 font-jakarta">
                {plan.title}
              </p>
            </div>
            
            {/* Value proposition text */}
            <p className="text-xs text-slate-600 mb-2 font-inter">
              {VALUE_PROPOSITIONS[index]}
            </p>
            
            <div className="text-slate-500 text-md font-inter">
              <div className="flex items-baseline gap-1">
                <span className={cn(
                  "text-brand-purple-dark font-bold text-2xl flex items-center font-jakarta",
                  animatePriceChange && "animate-pulse-subtle"
                )}>
                  ${" "}
                  <NumberFlow
                    className="text-brand-purple-dark font-bold text-2xl font-jakarta"
                    value={price}
                  />
                </span>
                <span className="text-sm text-gray-500 font-inter">
                  /{period === 0 ? "month" : "month, billed yearly"}
                </span>
              </div>
              
              {/* Removed savings calculation */}
            </div>
          </div>
        </div>
        
        {/* Features section */}
        <PricingFeatures 
          features={plan.features} 
          expandedFeatures={expandedFeatures} 
          toggleFeatures={toggleFeatures}
          planIndex={index}
        />
        
        {/* Get Started CTA button */}
        <motion.button 
          onClick={() => handleGetStarted(plan.title)}
          whileTap={{ scale: 0.98 }}
          className={cn(
            "w-full mt-4 rounded-xl font-medium text-sm py-2.5 transition-all duration-200",
            "touch-manipulation active:scale-95",
            index === 0 
              ? "bg-blue-50 text-blue-600 hover:bg-blue-100"
              : index === 1 
                ? "bg-gradient-to-r from-brand-purple-medium to-brand-purple text-white shadow-md hover:shadow-lg"
                : "bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-md hover:shadow-lg"
          )}
        >
          {index === 0 ? "Get Started for Free" : `Choose ${plan.title}`}
        </motion.button>
      </motion.div>
    </motion.div>
  );
};
