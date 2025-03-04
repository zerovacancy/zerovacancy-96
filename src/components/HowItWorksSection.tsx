import React, { useState, useEffect, useRef } from 'react';
import { Search, Users, FileCheck, Calendar, Check, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, useAnimation } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

// Refined color scheme for steps - more subtle and consistent with the website
const stepColors = [{
  iconBg: "bg-violet-50",
  iconText: "text-violet-600",
  numBg: "bg-violet-600",
  numText: "text-white",
  lineColor: "from-violet-500/50 to-blue-500/30",
  borderColor: "border-violet-100",
  glowColor: "shadow-violet-500/10",
  tintBg: "bg-violet-50/5",
  gradient: "bg-gradient-to-br from-white to-violet-50/70"
}, {
  iconBg: "bg-blue-50",
  iconText: "text-blue-600",
  numBg: "bg-blue-600",
  numText: "text-white",
  lineColor: "from-blue-500/50 to-amber-500/30",
  borderColor: "border-blue-100",
  glowColor: "shadow-blue-500/10",
  tintBg: "bg-blue-50/5",
  gradient: "bg-gradient-to-br from-white to-blue-50/70"
}, {
  iconBg: "bg-amber-50",
  iconText: "text-amber-600",
  numBg: "bg-amber-600",
  numText: "text-white",
  lineColor: "from-amber-500/50 to-emerald-500/30",
  borderColor: "border-amber-100",
  glowColor: "shadow-amber-500/10",
  tintBg: "bg-amber-50/5",
  gradient: "bg-gradient-to-br from-white to-amber-50/70"
}, {
  iconBg: "bg-emerald-50",
  iconText: "text-emerald-600",
  numBg: "bg-emerald-600",
  numText: "text-white",
  lineColor: "from-emerald-500/30 to-emerald-500/10",
  borderColor: "border-emerald-100",
  glowColor: "shadow-emerald-500/10",
  tintBg: "bg-emerald-50/5",
  gradient: "bg-gradient-to-br from-white to-emerald-50/70"
}];

// Component for desktop connecting lines between steps
const ConnectingLines = () => {
  return (
    <div className="absolute top-16 left-0 w-full z-0 hidden lg:block pointer-events-none">
      {/* First connector line - violet to blue */}
      <motion.div 
        className="absolute top-8 left-[23%] w-[18%] h-0.5 bg-gradient-to-r from-violet-500/60 to-blue-500/60" 
        initial={{
          scaleX: 0,
          transformOrigin: "left"
        }} 
        whileInView={{
          scaleX: 1,
          transition: {
            duration: 0.8,
            delay: 0.3,
            ease: "easeOut"
          }
        }} 
        viewport={{
          once: true,
          margin: "-100px"
        }}
      >
        <motion.div 
          className="absolute -right-3 -top-[7px] text-blue-500" 
          initial={{
            opacity: 0
          }} 
          whileInView={{
            opacity: 1,
            transition: {
              delay: 1.1
            }
          }} 
          viewport={{
            once: true
          }}
        >
          <ArrowRight className="h-4 w-4" />
        </motion.div>
      </motion.div>
      
      {/* Second connector line - blue to amber */}
      <motion.div 
        className="absolute top-8 left-[48%] w-[18%] h-0.5 bg-gradient-to-r from-blue-500/60 to-amber-500/60" 
        initial={{
          scaleX: 0,
          transformOrigin: "left"
        }} 
        whileInView={{
          scaleX: 1,
          transition: {
            duration: 0.8,
            delay: 0.6,
            ease: "easeOut"
          }
        }} 
        viewport={{
          once: true,
          margin: "-100px"
        }}
      >
        <motion.div 
          className="absolute -right-3 -top-[7px] text-amber-500" 
          initial={{
            opacity: 0
          }} 
          whileInView={{
            opacity: 1,
            transition: {
              delay: 1.4
            }
          }} 
          viewport={{
            once: true
          }}
        >
          <ArrowRight className="h-4 w-4" />
        </motion.div>
      </motion.div>
      
      {/* Third connector line - amber to emerald */}
      <motion.div 
        className="absolute top-8 left-[73%] w-[18%] h-0.5 bg-gradient-to-r from-amber-500/60 to-emerald-500/60" 
        initial={{
          scaleX: 0,
          transformOrigin: "left"
        }} 
        whileInView={{
          scaleX: 1,
          transition: {
            duration: 0.8,
            delay: 0.9,
            ease: "easeOut"
          }
        }} 
        viewport={{
          once: true,
          margin: "-100px"
        }}
      >
        <motion.div 
          className="absolute -right-3 -top-[7px] text-emerald-500" 
          initial={{
            opacity: 0
          }} 
          whileInView={{
            opacity: 1,
            transition: {
              delay: 1.7
            }
          }} 
          viewport={{
            once: true
          }}
        >
          <ArrowRight className="h-4 w-4" />
        </motion.div>
      </motion.div>
    </div>
  );
};

const HowItWorksSection = () => {
  const isMobile = useIsMobile();
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const controls = useAnimation();

  // Simulate completed steps (in a real app, this would come from user progress data)
  useEffect(() => {
    const savedProgress = localStorage.getItem('howItWorksProgress');
    if (savedProgress) {
      setCompletedSteps(JSON.parse(savedProgress));
    }
  }, []);

  useEffect(() => {
    // Animate elements when they come into view
    controls.start("visible");
  }, [controls]);

  const steps = [{
    icon: <Search className="w-5 h-5" />,
    title: "Search & Filter",
    description: "Find your perfect creator match based on your specific needs and requirements",
    number: "01"
  }, {
    icon: <Users className="w-5 h-5" />,
    title: "Review & Compare",
    description: "Browse portfolios and reviews to find the perfect match for your project",
    number: "02"
  }, {
    icon: <Calendar className="w-5 h-5" />,
    title: "Book & Pay",
    description: "Schedule securely through our platform with protected payments",
    number: "03"
  }, {
    icon: <FileCheck className="w-5 h-5" />,
    title: "Get Content",
    description: "Receive and approve your deliverables through our streamlined process",
    number: "04"
  }];

  return (
    <section className="relative overflow-hidden py-8 sm:py-10 lg:py-14 px-2 sm:px-4 lg:px-6 bg-white">
      <div className="max-w-6xl mx-auto py-0 px-px bg-white">
        <div className="text-center mb-6 sm:mb-10">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight mb-2 sm:mb-3 text-gray-900">
            How It Works
          </h3>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            Your journey to amazing content in four simple steps
          </p>
        </div>
        
        {/* Mobile 2x2 Grid Layout */}
        <div className="md:hidden w-full mb-6">
          <div className="grid grid-cols-2 gap-3">
            {steps.map((step, index) => (
              <motion.div 
                key={index} 
                initial={{
                  opacity: 0,
                  y: 15
                }} 
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    type: "spring",
                    duration: 0.5,
                    delay: index * 0.1
                  }
                }} 
                whileTap={{
                  scale: 0.98
                }} 
                viewport={{
                  once: true,
                  margin: "-10px"
                }} 
                className={cn(
                  "relative",
                  stepColors[index].gradient,
                  "p-3",
                  "rounded-lg",
                  "shadow-sm",
                  "border border-gray-100",
                  "flex flex-col",
                  "h-full",
                  "min-h-[140px]",
                  "touch-manipulation",
                  "transition-transform duration-200",
                  "cursor-pointer"
                )}
              >
                {/* Circle Number Badge */}
                <div className="absolute -top-2 -left-1">
                  <div className={cn(
                    "w-6 h-6",
                    stepColors[index].numBg,
                    stepColors[index].numText,
                    "rounded-full",
                    "flex items-center justify-center",
                    "text-xs font-medium",
                    "shadow-sm",
                    "ring-1 ring-white"
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
                    stepColors[index].iconText,
                    stepColors[index].iconBg,
                    "rounded-full p-1"
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
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Desktop grid layout with enhanced connecting lines */}
        <div className="hidden md:block w-full mx-auto relative">
          {/* Connecting lines between steps */}
          <ConnectingLines />
          
          {/* Grid container */}
          <div className="grid w-full grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 relative">
            {steps.map((step, index) => (
              <motion.div 
                key={index} 
                initial={{
                  opacity: 0,
                  y: 20
                }} 
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    type: "spring",
                    duration: 1.0,
                    delay: index * 0.2,
                    stiffness: 50
                  }
                }} 
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 8px 20px -5px rgba(0, 0, 0, 0.08), 0 6px 8px -5px rgba(0, 0, 0, 0.03)",
                  transition: {
                    duration: 0.3
                  }
                }} 
                whileTap={{
                  scale: 0.98
                }} 
                viewport={{
                  once: true,
                  margin: "-50px"
                }} 
                className={cn(
                  "relative h-full", 
                  stepColors[index].gradient, 
                  "min-h-[200px]",
                  "px-5 py-6", 
                  "rounded-lg", 
                  "transition-all duration-300", 
                  "group cursor-pointer", 
                  "border border-gray-100", 
                  "active:scale-[0.98]", 
                  "touch-manipulation", 
                  "shadow-sm hover:shadow-md", 
                  "flex flex-col items-center justify-start"
                )} 
                aria-label={`Step ${index + 1}: ${step.title}`}
              >
                {/* Step Number badge */}
                <div className={cn("absolute -top-3 left-5", "z-10")}>
                  <motion.span 
                    className={cn(
                      "inline-flex items-center justify-center", 
                      "w-7 h-7", 
                      stepColors[index].numBg, 
                      stepColors[index].numText, 
                      "rounded-full", 
                      "text-xs font-medium", 
                      "ring-2 ring-white", 
                      "shadow-sm"
                    )} 
                    initial={{
                      scale: 0.8,
                      opacity: 0
                    }} 
                    whileInView={{
                      scale: 1,
                      opacity: 1,
                      transition: {
                        type: "spring",
                        delay: index * 0.2 + 0.3,
                        duration: 0.5
                      }
                    }} 
                    viewport={{
                      once: true
                    }}
                  >
                    {step.number}
                    
                    {/* Completed checkmark */}
                    {completedSteps.includes(index) && (
                      <div className="absolute -right-1 -top-1 bg-white rounded-full p-0.5 shadow-sm">
                        <Check className="w-2.5 h-2.5 text-green-500" />
                      </div>
                    )}
                  </motion.span>
                </div>
                
                {/* Icon with enhanced colorful background and animations */}
                <motion.div 
                  className={cn(
                    "mb-4", 
                    stepColors[index].iconBg, 
                    stepColors[index].iconText, 
                    "transition-all duration-300", 
                    "rounded-lg p-3", 
                    "group-hover:saturate-110", 
                    "group-hover:scale-105", 
                    "shadow-sm group-hover:shadow-sm"
                  )} 
                  initial={{
                    rotateY: 0
                  }} 
                  whileHover={{
                    rotateY: 180,
                    transition: {
                      duration: 0.6
                    }
                  }}
                >
                  {React.cloneElement(step.icon, {
                    className: "w-6 h-6"
                  })}
                </motion.div>
                
                {/* Title with motion */}
                <motion.h4 
                  className="text-sm sm:text-base font-semibold text-gray-900 mb-2 text-center line-clamp-1" 
                  initial={{
                    opacity: 0.8
                  }} 
                  whileInView={{
                    opacity: 1,
                    transition: {
                      delay: index * 0.1 + 0.5
                    }
                  }} 
                  viewport={{
                    once: true
                  }}
                >
                  {step.title}
                </motion.h4>
                
                {/* Description with staggered animation */}
                <motion.p 
                  className="text-xs sm:text-sm text-gray-600 leading-relaxed text-center" 
                  initial={{
                    opacity: 0.6
                  }} 
                  whileInView={{
                    opacity: 1,
                    transition: {
                      delay: index * 0.1 + 0.7
                    }
                  }} 
                  viewport={{
                    once: true
                  }}
                >
                  {step.description}
                </motion.p>
                
                {/* Subtle visual indicator of clickability */}
                <div className={cn(
                  "absolute bottom-3 right-3 w-5 h-5", 
                  "flex items-center justify-center", 
                  "rounded-full", 
                  "opacity-0 group-hover:opacity-70", 
                  "transition-opacity duration-300", 
                  stepColors[index].numBg
                )}>
                  <ArrowRight className="w-3 h-3 text-white" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
