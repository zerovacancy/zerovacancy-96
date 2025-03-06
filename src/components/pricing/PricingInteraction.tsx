
import React, { useState, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { PricingPeriodToggle } from "./PricingPeriodToggle";
import { PricingTier } from "./PricingTier";
import { PricingPlanProps } from "./types";

export interface PricingInteractionProps {
  starterMonth: number;
  starterAnnual: number;
  proMonth: number;
  proAnnual: number;
  plans: PricingPlanProps[];
}

export function PricingInteraction({
  starterMonth,
  starterAnnual,
  proMonth,
  proAnnual,
  plans
}: PricingInteractionProps) {
  const [period, setPeriod] = useState(0);
  const [expandedFeatures, setExpandedFeatures] = useState<{[key: number]: boolean}>({});
  const [showSwipeHint, setShowSwipeHint] = useState(true);
  const [animatePriceChange, setAnimatePriceChange] = useState(false);
  const isMobile = useIsMobile();
  
  // Initialize price states based on the initial period
  const [starter, setStarter] = useState(period === 0 ? starterMonth : starterAnnual);
  const [pro, setPro] = useState(period === 0 ? proMonth : proAnnual);
  
  // Enhanced period change with animation
  const handleChangePeriod = useCallback((index: number) => {
    setPeriod(index);
    setAnimatePriceChange(true);
    
    // Set timeout to remove animation class
    setTimeout(() => setAnimatePriceChange(false), 1200);
    
    if (index === 0) {
      setStarter(starterMonth);
      setPro(proMonth);
    } else {
      setStarter(starterAnnual);
      setPro(proAnnual);
    }
  }, [starterMonth, starterAnnual, proMonth, proAnnual]);
  
  const toggleFeatures = useCallback((index: number) => {
    setExpandedFeatures(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  }, []);

  // Hide swipe hint after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSwipeHint(false);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);

  const planPrices = [0, starter, pro];
  
  // Calculate savings
  const calculateSavings = useCallback((index: number) => {
    if (period === 0 || index === 0) return null;
    
    const monthlyCost = index === 1 ? starterMonth : proMonth;
    const annualCost = index === 1 ? starterAnnual : proAnnual;
    
    return Math.round(12 * (monthlyCost - annualCost));
  }, [period, starterMonth, starterAnnual, proMonth, proAnnual]);

  // Handle checkout process
  const handleGetStarted = (planName: string) => {
    console.log(`Starting checkout process for ${planName} plan`);
    // Add checkout process logic here
  };

  return (
    <div className={cn(
      "border-2 rounded-[22px] p-4 shadow-lg w-full flex flex-col items-center gap-3 bg-white",
      "relative overflow-hidden",
      isMobile ? "max-w-[95%] mx-auto" : "max-w-sm"
    )}>
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-slate-50 pointer-events-none" />
      
      {/* Period toggle with enhanced styling */}
      <PricingPeriodToggle 
        period={period}
        handleChangePeriod={handleChangePeriod}
        animatePriceChange={animatePriceChange}
      />
      
      {/* Improved swipe instruction */}
      <AnimatePresence>
        {showSwipeHint && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="text-xs text-gray-500 flex items-center gap-1 mb-1 bg-slate-50 px-3 py-1.5 rounded-full shadow-sm animate-pulse-subtle font-inter"
          >
            <span>Compare pricing plans below</span>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Display all pricing tiers stacked vertically */}
      <div className="w-full flex flex-col gap-6 mt-4">
        {plans.map((plan, index) => (
          <PricingTier
            key={index}
            plan={plan}
            index={index}
            price={planPrices[index]}
            period={period}
            animatePriceChange={animatePriceChange}
            expandedFeatures={!!expandedFeatures[index]}
            toggleFeatures={() => toggleFeatures(index)}
            handleGetStarted={handleGetStarted}
            calculateSavings={calculateSavings}
          />
        ))}
      </div>
    </div>
  );
}
