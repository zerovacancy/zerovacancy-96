
import NumberFlow from '@number-flow/react';
import React, { useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export interface PricingFeature {
  text: string;
}

export interface PricingPlanProps {
  title: string;
  price: number;
  showPopular?: boolean;
  features: PricingFeature[];
}

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
  const isMobile = useIsMobile();

  // Initialize price states based on the initial period
  const [starter, setStarter] = useState(period === 0 ? starterMonth : starterAnnual);
  const [pro, setPro] = useState(period === 0 ? proMonth : proAnnual);
  
  const handleChangePlan = useCallback((index: number) => {
    setActive(index);
  }, []);
  
  const handleChangePeriod = useCallback((index: number) => {
    setPeriod(index);
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

  const planPrices = [0, starter, pro];
  
  // Handle navigation between plans
  const goToPrevPlan = useCallback(() => {
    setActive(prev => (prev > 0 ? prev - 1 : prev));
  }, []);
  
  const goToNextPlan = useCallback(() => {
    setActive(prev => (prev < plans.length - 1 ? prev + 1 : prev));
  }, [plans.length]);

  return (
    <div className={cn(
      "border-2 rounded-[32px] p-3 shadow-md w-full flex flex-col items-center gap-3 bg-white",
      isMobile ? "max-w-[95%] mx-auto" : "max-w-sm"
    )}>
      {/* Period toggle */}
      <div className="rounded-full relative w-full bg-slate-100 p-1.5 flex items-center">
        <button
          className="font-semibold rounded-full w-full p-1.5 text-slate-800 z-20 touch-manipulation"
          onClick={() => handleChangePeriod(0)}
        >
          Monthly
        </button>
        <button
          className="font-semibold rounded-full w-full p-1.5 text-slate-800 z-20 touch-manipulation"
          onClick={() => handleChangePeriod(1)}
        >
          Yearly
        </button>
        <div
          className="p-1.5 flex items-center justify-center absolute inset-0 w-1/2 z-10"
          style={{
            transform: `translateX(${period * 100}%)`,
            transition: "transform 0.3s",
          }}
        >
          <div className="bg-white shadow-sm rounded-full w-full h-full"></div>
        </div>
      </div>
      
      {/* Swipe instruction text */}
      <div className="text-xs text-gray-500 flex items-center gap-1 mb-1">
        <ChevronLeft className="w-3 h-3" />
        <span>Swipe to compare plans</span>
        <ChevronRight className="w-3 h-3" />
      </div>
      
      {/* Plans cards container */}
      <div className="w-full relative flex flex-col items-center justify-center gap-3">
        {/* Plan navigation buttons */}
        <div className={cn(
          "w-full flex justify-between px-1 absolute top-[44px] z-10",
          "pointer-events-none"
        )}>
          <button
            onClick={goToPrevPlan}
            className={cn(
              "size-8 rounded-full bg-white shadow-md flex items-center justify-center border border-gray-100",
              "pointer-events-auto touch-manipulation transform transition-all duration-200",
              active === 0 ? "opacity-30" : "opacity-80"
            )}
            disabled={active === 0}
          >
            <ChevronLeft className="size-4 text-gray-700" />
          </button>
          <button
            onClick={goToNextPlan}
            className={cn(
              "size-8 rounded-full bg-white shadow-md flex items-center justify-center border border-gray-100",
              "pointer-events-auto touch-manipulation transform transition-all duration-200",
              active === plans.length - 1 ? "opacity-30" : "opacity-80"
            )}
            disabled={active === plans.length - 1}
          >
            <ChevronRight className="size-4 text-gray-700" />
          </button>
        </div>
        
        {/* Plans cards */}
        {plans.map((plan, index) => (
          <div key={index} className="w-full">
            <div
              className={cn(
                "w-full flex justify-between cursor-pointer p-4 rounded-2xl transition-all",
                active === index 
                  ? "border-2 border-black bg-white" 
                  : "border-2 border-gray-300 bg-gray-50"
              )}
              onClick={() => handleChangePlan(index)}
            >
              <div className="flex flex-col items-start">
                <p className="font-semibold text-xl flex items-center gap-2 text-gray-950">
                  {plan.title}
                  {plan.showPopular && (
                    <span className="py-1 px-2 block rounded-lg bg-yellow-100 text-yellow-950 text-sm">
                      Popular
                    </span>
                  )}
                </p>
                <div className="text-slate-500 text-md">
                  <div className="flex items-baseline gap-1">
                    <span className="text-black font-bold text-2xl flex items-center">
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
                  {period === 1 && index > 0 && (
                    <p className="text-xs text-emerald-600 font-medium mt-1">
                      Save ${index === 1 ? 
                        Math.round(12 * (starterMonth - starterAnnual)) : 
                        Math.round(12 * (proMonth - proAnnual))} per year
                    </p>
                  )}
                </div>
              </div>
              <div
                className={cn(
                  "border-2 size-6 rounded-full mt-0.5 p-1 flex items-center justify-center transition-colors",
                  active === index ? "border-black" : "border-slate-400"
                )}
              >
                <div
                  className={cn(
                    "size-3 rounded-full transition-opacity",
                    active === index ? "bg-black opacity-100" : "opacity-0"
                  )}
                ></div>
              </div>
            </div>
            
            {/* Features dropdown */}
            {plan.features.length > 0 && (
              <div className={cn(
                "mt-1 overflow-hidden transition-all duration-300",
                expandedFeatures[index] ? "max-h-[400px]" : "max-h-0"
              )}>
                <div className="bg-gray-50 rounded-xl p-3 mt-1">
                  <ul className="space-y-2">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className={cn(
                        "text-sm flex items-start gap-2",
                        isMobile ? "text-xs" : "text-sm"
                      )}>
                        <span className="w-4 h-4 mt-0.5 flex-shrink-0 rounded-full bg-green-100 flex items-center justify-center">
                          <span className="w-2 h-2 rounded-full bg-green-500"></span>
                        </span>
                        <span className="flex-1">{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            
            {/* View features button */}
            {plan.features.length > 0 && (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFeatures(index);
                }}
                className={cn(
                  "w-full flex items-center justify-center text-xs py-1 mt-1 transition-colors",
                  "touch-manipulation hover:text-gray-800",
                  expandedFeatures[index] ? "text-gray-800" : "text-gray-600"
                )}
              >
                {expandedFeatures[index] ? "Hide Features" : "View Features"}
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
        
        {/* Indicator dots */}
        <div className="flex gap-2 mt-2">
          {plans.map((_, index) => (
            <button
              key={index}
              onClick={() => handleChangePlan(index)}
              className={cn(
                "size-2 rounded-full transition-all touch-manipulation",
                active === index ? "bg-black" : "bg-gray-300"
              )}
              aria-label={`Go to plan ${index + 1}`}
            />
          ))}
        </div>
      </div>
      
      {/* CTA Button */}
      <button className={cn(
        "rounded-full bg-black text-lg text-white w-full p-3 mt-2",
        "active:scale-95 transition-all duration-300 touch-manipulation",
        "shadow-lg hover:shadow-xl hover:bg-gray-900"
      )}>
        Get Started
      </button>
    </div>
  );
}
