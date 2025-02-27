import React from 'react';
import { Search, Users, FileCheck, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
const HowItWorksSection = () => {
  const steps = [{
    icon: <Search className="w-6 h-6 sm:w-8 sm:h-8" />,
    title: "Search & Filter",
    description: "Find your perfect creator match based on your specific needs and requirements",
    number: "01"
  }, {
    icon: <Users className="w-6 h-6 sm:w-8 sm:h-8" />,
    title: "Review & Compare",
    description: "Browse portfolios and reviews to find the perfect match for your project",
    number: "02"
  }, {
    icon: <Calendar className="w-6 h-6 sm:w-8 sm:h-8" />,
    title: "Book & Pay",
    description: "Schedule securely through our platform with protected payments",
    number: "03"
  }, {
    icon: <FileCheck className="w-6 h-6 sm:w-8 sm:h-8" />,
    title: "Get Content",
    description: "Receive and approve your deliverables through our streamlined process",
    number: "04"
  }];
  return <section className="relative overflow-hidden py-8 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white lg:py-0 my-[8px]">
      <div className="absolute inset-0 -z-10 h-full w-full bg-gradient-to-b from-white/95 via-white/90 to-white/95 backdrop-blur-sm" aria-hidden="true" />
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6 sm:mb-16">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight mb-2 sm:mb-4">
            How It Works
          </h3>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Your journey to amazing content in four simple steps
          </p>
        </div>
        
        {/* Mobile horizontal scrollable container */}
        <div className="overflow-x-auto pb-4 -mx-4 px-4 md:hidden">
          <div className="flex gap-3 w-max min-w-full">
            {steps.map((step, index) => <motion.div key={index} initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0,
            transition: {
              type: "spring",
              duration: 0.6,
              delay: index * 0.1
            }
          }} viewport={{
            once: true,
            margin: "-30px"
          }} className={cn("relative flex-shrink-0 bg-white", "w-[180px] min-h-[120px]", "p-3", "rounded-lg", "shadow-[0_2px_8px_rgba(0,0,0,0.06)]", "border border-gray-100", "touch-manipulation")}>
                <div className="flex flex-col items-center justify-start h-full relative">
                  {/* Circle with number */}
                  <div className="absolute -left-1 -top-3 bg-primary text-white w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium">
                    {step.number}
                  </div>
                  
                  {/* Icon */}
                  <div className="mt-4 mb-2 text-primary bg-primary/5 rounded-lg p-2">
                    {step.icon}
                  </div>
                  
                  {/* Title */}
                  <h4 className="text-sm font-semibold text-gray-900 mb-1 text-center line-clamp-1">
                    {step.title}
                  </h4>
                  
                  {/* Description */}
                  <p className="text-xs text-gray-600 leading-tight text-center line-clamp-3">
                    {step.description}
                  </p>
                </div>
              </motion.div>)}
          </div>
        </div>
        
        {/* Desktop grid layout */}
        <div className="hidden md:grid w-full mx-auto grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 relative">
          {steps.map((step, index) => <motion.div key={index} initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0,
          transition: {
            type: "spring",
            duration: 0.8,
            delay: index * 0.2
          }
        }} whileHover={{
          scale: 1.02,
          transition: {
            duration: 0.2
          }
        }} whileTap={{
          scale: 0.98
        }} viewport={{
          once: true,
          margin: "-50px"
        }} className={cn("relative bg-white", "min-h-[150px]", "px-5 py-6", "rounded-xl", "shadow-[0_4px_12px_rgba(0,0,0,0.08)]", "transition-all duration-200", "group", "border border-gray-100", "active:scale-[0.98]", "touch-manipulation", "hover:shadow-[0_6px_16px_rgba(0,0,0,0.12)]")}>
              <div className="flex flex-col items-center justify-start h-full relative">
                {/* Step Number with connecting line */}
                <div className="absolute -left-[3.25rem] top-0 h-full" aria-hidden="true">
                  <motion.span className={cn("absolute -top-2 left-0", "w-8 h-8", "bg-primary text-white rounded-full", "flex items-center justify-center", "text-sm font-medium", "ring-4 ring-white", "z-10")} initial={{
                scale: 0.8,
                opacity: 0
              }} whileInView={{
                scale: 1,
                opacity: 1,
                transition: {
                  type: "spring",
                  delay: index * 0.2 + 0.3,
                  duration: 0.5
                }
              }} viewport={{
                once: true
              }}>
                    {step.number}
                  </motion.span>
                  
                  {/* Enhanced vertical connecting line */}
                  {index < steps.length - 1 && <motion.div className="absolute top-7 left-[0.875rem] w-[2px] h-[calc(100%+2rem)] bg-gradient-to-b from-primary/30 to-primary/10" initial={{
                scaleY: 0
              }} whileInView={{
                scaleY: 1,
                transition: {
                  delay: index * 0.2 + 0.4,
                  duration: 0.5
                }
              }} viewport={{
                once: true
              }} />}
                </div>
                
                {/* Icon with enhanced hover effect */}
                <motion.div className={cn("mb-4", "text-primary", "transition-all duration-300", "bg-primary/5 rounded-xl p-3", "group-hover:bg-primary/10")} whileHover={{
              scale: 1.1
            }} whileTap={{
              scale: 0.95
            }}>
                  {step.icon}
                </motion.div>
                
                <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 text-center line-clamp-1">
                  {step.title}
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed text-center line-clamp-3">
                  {step.description}
                </p>
              </div>
            </motion.div>)}
        </div>
      </div>
    </section>;
};
export default HowItWorksSection;