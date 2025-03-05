import React, { useState, useEffect } from 'react';
import { Search, Users, FileCheck, Calendar, Check, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

// Define step data to avoid repetition
const steps = [
  {
    icon: <Search className="w-5 h-5" />,
    title: "Search & Filter",
    description: "Find your perfect creator match based on your specific needs and requirements",
    number: "01",
    iconClass: "text-violet-600 bg-violet-50",
    numberClass: "bg-violet-600 text-white",
    borderClass: "border-violet-100"
  },
  {
    icon: <Users className="w-5 h-5" />,
    title: "Review & Compare",
    description: "Browse portfolios and reviews to find the perfect match for your project",
    number: "02",
    iconClass: "text-blue-600 bg-blue-50",
    numberClass: "bg-blue-600 text-white",
    borderClass: "border-blue-100"
  },
  {
    icon: <Calendar className="w-5 h-5" />,
    title: "Book & Pay",
    description: "Schedule securely through our platform with protected payments",
    number: "03",
    iconClass: "text-amber-600 bg-amber-50",
    numberClass: "bg-amber-600 text-white",
    borderClass: "border-amber-100"
  },
  {
    icon: <FileCheck className="w-5 h-5" />,
    title: "Get Content",
    description: "Receive and approve your deliverables through our streamlined process",
    number: "04",
    iconClass: "text-emerald-600 bg-emerald-50",
    numberClass: "bg-emerald-600 text-white",
    borderClass: "border-emerald-100"
  }
];

// Simpler connecting lines component using CSS animations instead of Framer Motion
const ConnectingLines = () => {
  return (
    <div className="absolute top-16 left-0 w-full z-0 hidden lg:block pointer-events-none">
      {steps.slice(0, -1).map((_, index) => (
        <div key={index} className="relative">
          <div 
            className={cn(
              "absolute top-8 h-0.5",
              index === 0 ? "left-[23%] w-[18%] bg-gradient-to-r from-violet-500/60 to-blue-500/60 animate-grow-x" : 
              index === 1 ? "left-[48%] w-[18%] bg-gradient-to-r from-blue-500/60 to-amber-500/60 animate-grow-x animation-delay-300" :
              "left-[73%] w-[18%] bg-gradient-to-r from-amber-500/60 to-emerald-500/60 animate-grow-x animation-delay-600"
            )}
          >
            <div 
              className={cn(
                "absolute -right-3 -top-[7px]",
                index === 0 ? "text-blue-500 animate-fade-in animation-delay-900" : 
                index === 1 ? "text-amber-500 animate-fade-in animation-delay-1200" :
                "text-emerald-500 animate-fade-in animation-delay-1500"
              )}
            >
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const OptimizedHowItWorks = () => {
  const isMobile = useIsMobile();
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  // Load saved progress
  useEffect(() => {
    const savedProgress = localStorage.getItem('howItWorksProgress');
    if (savedProgress) {
      setCompletedSteps(JSON.parse(savedProgress));
    }
  }, []);

  return (
    <section className="relative overflow-hidden py-8 sm:py-10 lg:py-14 px-2 sm:px-4 lg:px-6 bg-gradient-to-b from-gray-50 to-purple-50/20">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="smallGrid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-purple-900" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#smallGrid)" />
          </svg>
        </div>
        
        {/* Subtle gradient overlays */}
        <div className="absolute top-0 right-0 w-full h-96 bg-gradient-to-b from-purple-100/10 to-transparent transform -rotate-12 translate-x-1/4 translate-y-[-40%] rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-full h-96 bg-gradient-to-t from-blue-100/10 to-transparent transform rotate-12 translate-x-[-30%] translate-y-[30%] rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-6xl mx-auto py-0 px-px relative z-10">
        <div className="text-center mb-6 sm:mb-10">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight mb-2 sm:mb-3 text-brand-purple-dark">
            How It Works
          </h2>
          <p className="text-sm sm:text-base text-brand-text-primary max-w-2xl mx-auto">
            Your journey to amazing content in four simple steps
          </p>
        </div>
        
        {/* Mobile 2x2 Grid Layout */}
        <div className="md:hidden w-full mb-6">
          <div className="grid grid-cols-2 gap-3">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className={cn(
                  "relative bg-white p-3 rounded-lg shadow-sm border border-gray-100",
                  "flex flex-col h-full min-h-[140px] touch-manipulation transition-all",
                  "duration-200 cursor-pointer animate-fade-in",
                  `animation-delay-${index * 100}`
                )}
              >
                {/* Circle Number Badge */}
                <div className="absolute -top-2 -left-1">
                  <div className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center",
                    "text-xs font-medium shadow-sm ring-1 ring-white",
                    step.numberClass
                  )}>
                    {index + 1}
                    
                    {/* Completed checkmark */}
                    {completedSteps.includes(index) && (
                      <div className="absolute -right-1 -top-1 bg-white rounded-full p-0.5 shadow-sm">
                        <Check className="w-2.5 h-2.5 text-green-500" />
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Icon and Title in row */}
                <div className="flex items-center justify-between mt-1 mb-2">
                  <h4 className="text-xs sm:text-sm font-semibold text-gray-900 pr-1">
                    {step.title}
                  </h4>
                  
                  <div className={cn(
                    "rounded-full p-1",
                    step.iconClass
                  )}>
                    {React.cloneElement(step.icon, {
                      className: "w-4 h-4"
                    })}
                  </div>
                </div>
                
                {/* Description */}
                <p className="text-xs leading-tight text-gray-600 mt-auto">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Desktop grid layout with connecting lines */}
        <div className="hidden md:block w-full mx-auto relative">
          {/* Connecting lines between steps */}
          <ConnectingLines />
          
          {/* Grid container */}
          <div className="grid w-full grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 relative">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className={cn(
                  "relative h-full bg-white min-h-[200px] px-5 py-6 rounded-lg",
                  "transition-all duration-300 group cursor-pointer",
                  "border border-gray-100 active:scale-[0.98]",
                  "touch-manipulation shadow-sm hover:shadow-md",
                  "flex flex-col items-center justify-start animate-fade-in",
                  `animation-delay-${index * 200}`
                )}
                aria-label={`Step ${index + 1}: ${step.title}`}
              >
                {/* Step Number badge */}
                <div className={cn("absolute -top-3 left-5", "z-10")}>
                  <span 
                    className={cn(
                      "inline-flex items-center justify-center",
                      "w-7 h-7 rounded-full text-xs font-medium",
                      "ring-2 ring-white shadow-sm animate-scale-in",
                      `animation-delay-${index * 200 + 300}`,
                      step.numberClass
                    )}
                  >
                    {step.number}
                    
                    {/* Completed checkmark */}
                    {completedSteps.includes(index) && (
                      <div className="absolute -right-1 -top-1 bg-white rounded-full p-0.5 shadow-sm">
                        <Check className="w-2.5 h-2.5 text-green-500" />
                      </div>
                    )}
                  </span>
                </div>
                
                {/* Icon with animated background */}
                <div 
                  className={cn(
                    "mb-4 rounded-lg p-3 transition-all duration-300",
                    "group-hover:scale-105 group-hover:shadow-sm shadow-sm",
                    step.iconClass
                  )}
                >
                  {React.cloneElement(step.icon, {
                    className: "w-6 h-6"
                  })}
                </div>
                
                {/* Title */}
                <h4 
                  className={cn(
                    "text-sm sm:text-base font-semibold text-gray-900 mb-2 text-center line-clamp-1",
                    "animate-fade-in",
                    `animation-delay-${index * 100 + 500}`
                  )}
                >
                  {step.title}
                </h4>
                
                {/* Description */}
                <p 
                  className={cn(
                    "text-xs sm:text-sm text-gray-600 leading-relaxed text-center",
                    "animate-fade-in",
                    `animation-delay-${index * 100 + 700}`
                  )}
                >
                  {step.description}
                </p>
                
                {/* Subtle visual indicator of clickability */}
                <div className={cn(
                  "absolute bottom-3 right-3 w-5 h-5",
                  "flex items-center justify-center rounded-full",
                  "opacity-0 group-hover:opacity-70 transition-opacity duration-300",
                  step.numberClass
                )}>
                  <ArrowRight className="w-3 h-3 text-white" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OptimizedHowItWorks;
