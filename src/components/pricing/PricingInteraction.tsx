
import NumberFlow from '@number-flow/react';
import React, { useState, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, Check, Sparkles } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion, AnimatePresence } from "framer-motion";

export interface PricingFeature {
  text: string;
  primary?: boolean;
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
      
      {/* Improved swipe instruction */}
      <AnimatePresence>
        {showSwipeHint && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="text-xs text-gray-500 flex items-center gap-1 mb-1 bg-slate-50 px-3 py-1.5 rounded-full shadow-sm animate-pulse-subtle font-inter"
          >
            <span>Swipe to compare plans</span>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Plans cards container */}
      <div className="w-full relative flex flex-col items-center justify-center gap-3 z-10">
        {/* Plans cards */}
        {plans.map((plan, index) => (
          <div key={index} className="w-full">
            <motion.div
              className={cn(
                "w-full flex flex-col cursor-pointer p-5 rounded-xl transition-all",
                "relative overflow-hidden", // Add overflow hidden to contain content
                active === index 
                  ? "border-2 border-brand-purple bg-white shadow-lg" 
                  : "border border-gray-200 bg-gray-50"
              )}
              onClick={() => handleChangePlan(index)}
              whileTap={{ scale: 0.98 }}
              layout
            >
              {/* Popular tag positioned above title and centered */}
              {plan.showPopular && (
                <div className="absolute top-0 left-0 right-0 -mt-3 flex justify-center">
                  <div className="py-1 px-2.5 flex items-center gap-1 rounded-lg bg-gradient-to-r from-brand-purple-medium to-brand-purple text-white text-sm shadow-md">
                    <Sparkles className="h-3 w-3" />
                    <span className="font-medium font-inter">Popular</span>
                  </div>
                </div>
              )}
              
              <div className="flex justify-between items-start mt-2">
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
                          value={planPrices[index]}
                        />
                      </span>
                      <span className="text-sm text-gray-500 font-inter">
                        /{period === 0 ? "month" : "month, billed yearly"}
                      </span>
                    </div>
                    
                    {/* Savings calculation with improved display */}
                    {period === 1 && index > 0 && (
                      <motion.p 
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs font-medium mt-1 py-0.5 px-2 bg-green-50 text-green-600 rounded-full inline-block font-inter"
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
                      ? "border-brand-purple bg-brand-purple" 
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
              </div>
              
              {/* Features section */}
              {active === index && (
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-sm font-medium text-slate-700 font-inter">
                      {expandedFeatures[index] ? "What's included:" : "Top features:"}
                    </h4>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFeatures(index);
                      }}
                      className="text-xs text-slate-500 flex items-center focus:outline-none font-inter hover:text-brand-purple transition-colors touch-manipulation"
                    >
                      {expandedFeatures[index] ? "Less" : "See all"}
                      <ChevronDown className={cn(
                        "ml-1 h-3 w-3 transition-transform",
                        expandedFeatures[index] && "rotate-180"
                      )} />
                    </button>
                  </div>
                  
                  <div className="space-y-2.5">
                    {(expandedFeatures[index] ? plan.features : plan.features.slice(0, 4)).map((feature, featureIndex) => (
                      <div 
                        key={featureIndex}
                        className={cn(
                          "flex items-start",
                          feature.primary && "font-medium"
                        )}
                      >
                        <span className={cn(
                          "mr-2 rounded-full p-0.5 flex-shrink-0 mt-0.5",
                          index === 0 ? "bg-blue-50" : 
                          index === 1 ? "bg-brand-purple/10" : "bg-emerald-50"
                        )}>
                          <Check className={cn(
                            "h-3 w-3",
                            index === 0 ? "text-blue-600" : 
                            index === 1 ? "text-brand-purple" : "text-emerald-600"
                          )} />
                        </span>
                        <span className="text-sm text-slate-700 font-inter">
                          {feature.text.replace("plus:", "")}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  {!expandedFeatures[index] && plan.features.length > 4 && (
                    <p className="text-xs text-slate-500 font-inter mt-2">
                      +{plan.features.length - 4} more features
                    </p>
                  )}
                </div>
              )}
              
              {/* Get Started CTA button */}
              <motion.button 
                onClick={(e) => {
                  e.stopPropagation();
                  handleGetStarted(plan.title);
                }}
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
                  ? "h-1.5 w-6 bg-brand-purple rounded-full" 
                  : "h-1.5 w-1.5 bg-gray-300 rounded-full"
              )}
              aria-label={`Go to plan ${index + 1}`}
            />
          ))}
        </div>
      </div>
      
      {/* Plan comparison summary */}
      <div className="w-full mt-2 pb-1">
        <p className="text-center text-xs text-gray-500 font-inter">
          Not sure which plan? <span className="text-brand-purple font-medium">Compare all features</span>
        </p>
      </div>
    </div>
  );
}
