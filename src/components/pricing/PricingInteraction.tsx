
import NumberFlow from '@number-flow/react';
import React, { useState, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronLeft, ChevronRight, Check, Sparkles } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion, AnimatePresence } from "framer-motion";

export interface PricingFeature {
  text: string;
}

export interface PricingPlanProps {
  title: string;
  price: number;
  showPopular?: boolean;
  features: PricingFeature[];
}

// Value propositions for each plan to help users understand benefits
const VALUE_PROPOSITIONS = {
  0: "Great for trying things out",
  1: "Most popular for real estate agents",
  2: "Perfect for luxury properties"
};

export function PricingInteraction({
  starterMonth,
  starterAnnual,
  proMonth,
  proAnnual,
  plans
}: {
  starterMonth: number;
  starterAnnual: number;
  proMonth: number;
  proAnnual: number;
  plans: PricingPlanProps[];
}) {
  const [active, setActive] = useState(0);
  const [period, setPeriod] = useState(0);
  const [expandedFeatures, setExpandedFeatures] = useState<{[key: number]: boolean}>({});
  const [showSwipeHint, setShowSwipeHint] = useState(true);
  const [animatePriceChange, setAnimatePriceChange] = useState(false);
  const isMobile = useIsMobile();
  
  // Initialize price states based on the initial period
  const [starter, setStarter] = useState(period === 0 ? starterMonth : starterAnnual);
  const [pro, setPro] = useState(period === 0 ? proMonth : proAnnual);
  
  const handleChangePlan = useCallback((index: number) => {
    setActive(index);
  }, []);
  
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
  
  // Handle navigation between plans
  const goToPrevPlan = useCallback(() => {
    setActive(prev => (prev > 0 ? prev - 1 : prev));
  }, []);
  
  const goToNextPlan = useCallback(() => {
    setActive(prev => (prev < plans.length - 1 ? prev + 1 : prev));
  }, [plans.length]);

  // Calculate savings
  const calculateSavings = useCallback((index: number) => {
    if (period === 0 || index === 0) return null;
    
    const monthlyCost = index === 1 ? starterMonth : proMonth;
    const annualCost = index === 1 ? starterAnnual : proAnnual;
    
    return Math.round(12 * (monthlyCost - annualCost));
  }, [period, starterMonth, starterAnnual, proMonth, proAnnual]);

  return (
    <div className={cn(
      "border-2 rounded-[32px] p-4 shadow-lg w-full flex flex-col items-center gap-3 bg-white",
      "relative overflow-hidden",
      isMobile ? "max-w-[95%] mx-auto" : "max-w-sm"
    )}>
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-slate-50 pointer-events-none" />
      
      {/* Period toggle with enhanced styling */}
      <div className="relative w-full z-10">
        <div className="rounded-full relative w-full bg-slate-100 p-1.5 flex items-center shadow-inner">
          <button
            className={cn(
              "font-semibold rounded-full w-full p-2 text-slate-800 z-20 touch-manipulation transition-colors",
              period === 0 ? "text-slate-900" : "text-slate-600"
            )}
            onClick={() => handleChangePeriod(0)}
          >
            Monthly
          </button>
          <button
            className={cn(
              "font-semibold rounded-full w-full p-2 text-slate-800 z-20 touch-manipulation transition-colors",
              period === 1 ? "text-slate-900" : "text-slate-600"
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
              className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-gradient-to-r from-purple-500 to-violet-600 text-white text-xs font-medium px-3 py-1 rounded-full shadow-md"
            >
              Save up to 30% annually
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Improved swipe instruction */}
      <AnimatePresence>
        {showSwipeHint && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="text-xs text-gray-500 flex items-center gap-1 mb-1 bg-slate-50 px-3 py-1.5 rounded-full shadow-sm animate-pulse-subtle"
          >
            <ChevronLeft className="w-3 h-3" />
            <span>Swipe to compare plans</span>
            <ChevronRight className="w-3 h-3" />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Plans cards container */}
      <div className="w-full relative flex flex-col items-center justify-center gap-3 z-10">
        {/* Plan navigation buttons */}
        <div className={cn(
          "w-full flex justify-between px-1 absolute top-[44px] z-10",
          "pointer-events-none"
        )}>
          <motion.button
            onClick={goToPrevPlan}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "size-9 rounded-full bg-white shadow-md flex items-center justify-center border border-gray-100",
              "pointer-events-auto touch-manipulation transform transition-all duration-200",
              active === 0 ? "opacity-30" : "opacity-90 hover:shadow-lg"
            )}
            disabled={active === 0}
          >
            <ChevronLeft className="size-5 text-gray-700" />
          </motion.button>
          <motion.button
            onClick={goToNextPlan}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "size-9 rounded-full bg-white shadow-md flex items-center justify-center border border-gray-100",
              "pointer-events-auto touch-manipulation transform transition-all duration-200",
              active === plans.length - 1 ? "opacity-30" : "opacity-90 hover:shadow-lg"
            )}
            disabled={active === plans.length - 1}
          >
            <ChevronRight className="size-5 text-gray-700" />
          </motion.button>
        </div>
        
        {/* Plans cards */}
        {plans.map((plan, index) => (
          <div key={index} className="w-full">
            <motion.div
              className={cn(
                "w-full flex justify-between cursor-pointer p-5 rounded-2xl transition-all",
                active === index 
                  ? "border-2 border-black bg-white shadow-lg" 
                  : "border border-gray-300 bg-gray-50"
              )}
              onClick={() => handleChangePlan(index)}
              whileTap={{ scale: 0.98 }}
              layout
            >
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-semibold text-xl flex items-center gap-2 text-gray-950">
                    {plan.title}
                  </p>
                  
                  {/* Enhanced Popular tag */}
                  {plan.showPopular && (
                    <div className="py-1 px-2.5 flex items-center gap-1 rounded-lg bg-gradient-to-r from-violet-500 to-purple-600 text-white text-sm shadow-md">
                      <Sparkles className="h-3 w-3" />
                      <span className="font-medium">Popular</span>
                    </div>
                  )}
                </div>
                
                {/* Value proposition text */}
                <p className="text-xs text-slate-600 mb-2">
                  {VALUE_PROPOSITIONS[index]}
                </p>
                
                <div className="text-slate-500 text-md">
                  <div className="flex items-baseline gap-1">
                    <span className={cn(
                      "text-black font-bold text-2xl flex items-center",
                      animatePriceChange && "animate-pulse-subtle"
                    )}>
                      ${" "}
                      <NumberFlow
                        className="text-black font-bold text-2xl"
                        value={planPrices[index]}
                      />
                    </span>
                    <span className="text-sm text-gray-500">
                      /{period === 0 ? "month" : "month, billed yearly"}
                    </span>
                  </div>
                  
                  {/* Savings calculation with improved display */}
                  {period === 1 && index > 0 && (
                    <motion.p 
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs font-medium mt-1 py-0.5 px-2 bg-green-50 text-green-600 rounded-full inline-block"
                    >
                      Save ${calculateSavings(index)} per year
                    </motion.p>
                  )}
                </div>
              </div>
              <div
                className={cn(
                  "border-2 size-6 rounded-full mt-0.5 p-1 flex items-center justify-center transition-colors",
                  active === index 
                    ? "border-black bg-black" 
                    : "border-slate-300"
                )}
              >
                <div
                  className={cn(
                    "size-3 rounded-full transition-opacity",
                    active === index ? "bg-white opacity-100" : "opacity-0"
                  )}
                ></div>
              </div>
            </motion.div>
            
            {/* Features dropdown with animation */}
            <AnimatePresence>
              {expandedFeatures[index] && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="bg-slate-50 rounded-xl p-4 mt-2 border border-slate-100 shadow-inner">
                    <ul className="space-y-2.5">
                      {plan.features.map((feature, featureIndex) => (
                        <motion.li 
                          key={featureIndex}
                          initial={{ opacity: 0, x: -5 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: featureIndex * 0.05 }}
                          className={cn(
                            "text-sm flex items-start gap-2",
                            isMobile ? "text-xs" : "text-sm"
                          )}
                        >
                          <span className={cn(
                            "w-5 h-5 mt-0.5 flex-shrink-0 rounded-full flex items-center justify-center",
                            index === 0 ? "bg-blue-100" : 
                            index === 1 ? "bg-purple-100" : "bg-emerald-100"
                          )}>
                            <Check className={cn(
                              "w-3 h-3",
                              index === 0 ? "text-blue-600" : 
                              index === 1 ? "text-purple-600" : "text-emerald-600"
                            )} />
                          </span>
                          <span className="flex-1 text-gray-700">{feature.text}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Enhanced feature toggle button */}
            {plan.features.length > 0 && (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFeatures(index);
                }}
                className={cn(
                  "w-full flex items-center justify-center text-xs py-2 mt-1.5 transition-colors rounded-lg",
                  "touch-manipulation active:bg-slate-50",
                  expandedFeatures[index] 
                    ? "text-gray-700 bg-slate-100" 
                    : "text-gray-600 bg-white border border-slate-200"
                )}
              >
                {expandedFeatures[index] ? "Hide Details" : "See What's Included"}
                <ChevronDown 
                  className={cn(
                    "ml-1 w-3 h-3 transition-transform",
                    expandedFeatures[index] ? "rotate-180" : ""
                  )} 
                />
              </button>
            )}
          </div>
        ))}
        
        {/* Enhanced plan indicator dots */}
        <div className="flex gap-2 mt-3">
          {plans.map((_, index) => (
            <button
              key={index}
              onClick={() => handleChangePlan(index)}
              className={cn(
                "transition-all touch-manipulation",
                active === index 
                  ? "h-1.5 w-6 bg-black rounded-full" 
                  : "h-1.5 w-1.5 bg-gray-300 rounded-full"
              )}
              aria-label={`Go to plan ${index + 1}`}
            />
          ))}
        </div>
      </div>
      
      {/* Enhanced CTA Button */}
      <motion.button 
        whileTap={{ scale: 0.98 }}
        className={cn(
          "rounded-full bg-gradient-to-r from-violet-600 to-purple-700 text-lg text-white w-full p-3 mt-3",
          "active:scale-95 transition-all duration-300 touch-manipulation",
          "shadow-lg hover:shadow-xl"
        )}
      >
        Get Started with {plans[active]?.title || "Basic"}
      </motion.button>
      
      {/* Plan comparison summary */}
      <div className="w-full mt-2 pb-1">
        <p className="text-center text-xs text-gray-500">
          Not sure which plan? <span className="text-purple-600 font-medium">Compare all features</span>
        </p>
      </div>
    </div>
  );
}
