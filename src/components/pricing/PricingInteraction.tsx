
import NumberFlow from '@number-flow/react';
import React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
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
  const [active, setActive] = React.useState(0);
  const [period, setPeriod] = React.useState(0);
  const [expandedFeatures, setExpandedFeatures] = React.useState<{[key: number]: boolean}>({});
  const isMobile = useIsMobile();

  const handleChangePlan = (index: number) => {
    setActive(index);
  };
  
  const handleChangePeriod = (index: number) => {
    setPeriod(index);
    if (index === 0) {
      setStarter(starterMonth);
      setPro(proMonth);
    } else {
      setStarter(starterAnnual);
      setPro(proAnnual);
    }
  };
  
  const toggleFeatures = (index: number) => {
    setExpandedFeatures(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };
  
  const [starter, setStarter] = React.useState(starterMonth);
  const [pro, setPro] = React.useState(proMonth);

  const planPrices = [0, starter, pro];

  return (
    <div className={cn(
      "border-2 rounded-[32px] p-3 shadow-md w-full flex flex-col items-center gap-3 bg-white",
      isMobile ? "max-w-[95%] mx-auto" : "max-w-sm"
    )}>
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
      
      <div className="w-full relative flex flex-col items-center justify-center gap-3">
        {plans.map((plan, index) => (
          <div key={index} className="w-full">
            <div
              className="w-full flex justify-between cursor-pointer border-2 border-gray-400 p-4 rounded-2xl"
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
                <p className="text-slate-500 text-md flex">
                  <span className="text-black font-medium flex items-center">
                    ${" "}
                    <NumberFlow
                      className="text-black font-medium"
                      value={planPrices[index]}
                    />
                  </span>
                  /month
                </p>
              </div>
              <div
                className="border-2 border-slate-500 size-6 rounded-full mt-0.5 p-1 flex items-center justify-center"
                style={{
                  borderColor: `${active === index ? "#000" : "#64748b"}`,
                  transition: "border-color 0.3s",
                }}
              >
                <div
                  className="size-3 bg-black rounded-full"
                  style={{
                    opacity: `${active === index ? 1 : 0}`,
                    transition: "opacity 0.3s",
                  }}
                ></div>
              </div>
            </div>
            
            {/* Features dropdown */}
            {plan.features.length > 0 && (
              <div className={cn(
                "mt-1 overflow-hidden transition-all duration-300",
                expandedFeatures[index] ? "max-h-96" : "max-h-0"
              )}>
                <div className="bg-gray-50 rounded-xl p-3 mt-1">
                  <ul className="space-y-2">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className={cn(
                        "text-sm flex items-center gap-2",
                        isMobile ? "text-xs" : "text-sm"
                      )}>
                        <span className="w-4 h-4 flex-shrink-0 rounded-full bg-green-100 flex items-center justify-center">
                          <span className="w-2 h-2 rounded-full bg-green-500"></span>
                        </span>
                        {feature.text}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            
            {/* View more features button */}
            {plan.features.length > 0 && (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFeatures(index);
                }}
                className={cn(
                  "w-full flex items-center justify-center text-xs py-1 mt-1 text-gray-600 hover:text-gray-800 transition-colors",
                  "touch-manipulation"
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
        
        <div
          className={`w-full h-[88px] absolute top-0 border-[3px] border-black rounded-2xl pointer-events-none`}
          style={{
            transform: `translateY(${active * (isMobile ? 90 : 88) + 12 * active}px)`,
            transition: "transform 0.3s",
          }}
        ></div>
      </div>
      
      <button className="rounded-full bg-black text-lg text-white w-full p-3 active:scale-95 transition-transform duration-300 touch-manipulation mt-2">
        Get Started
      </button>
    </div>
  );
}
