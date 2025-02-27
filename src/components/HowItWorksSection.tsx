
import React from 'react';
import { Search, Users, FileCheck, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

// Define colorful backgrounds for each step
const stepColors = [{
  iconBg: "bg-violet-100",
  iconText: "text-violet-600",
  numBg: "bg-violet-600",
  numText: "text-white",
  lineColor: "from-violet-600/70 to-blue-500/50"
}, {
  iconBg: "bg-blue-100",
  iconText: "text-blue-500",
  numBg: "bg-blue-500",
  numText: "text-white",
  lineColor: "from-blue-500/70 to-amber-600/50"
}, {
  iconBg: "bg-amber-100",
  iconText: "text-amber-600",
  numBg: "bg-amber-600",
  numText: "text-white",
  lineColor: "from-amber-600/70 to-emerald-600/50"
}, {
  iconBg: "bg-emerald-100",
  iconText: "text-emerald-600",
  numBg: "bg-emerald-600",
  numText: "text-white",
  lineColor: "from-emerald-600/50 to-emerald-600/10"
}];

const HowItWorksSection = () => {
  const isMobile = useIsMobile();
  
  const steps = [{
    icon: <Search className="w-6 h-6" />,
    title: "Search & Filter",
    description: "Find your perfect creator match based on your specific needs and requirements",
    number: "01"
  }, {
    icon: <Users className="w-6 h-6" />,
    title: "Review & Compare",
    description: "Browse portfolios and reviews to find the perfect match for your project",
    number: "02"
  }, {
    icon: <Calendar className="w-6 h-6" />,
    title: "Book & Pay",
    description: "Schedule securely through our platform with protected payments",
    number: "03"
  }, {
    icon: <FileCheck className="w-6 h-6" />,
    title: "Get Content",
    description: "Receive and approve your deliverables through our streamlined process",
    number: "04"
  }];
  
  return <section className="relative overflow-hidden py-8 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white/80">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6 sm:mb-14">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight mb-3 sm:mb-4">
            How It Works
          </h3>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Your journey to amazing content in four simple steps
          </p>
        </div>
        
        {/* Mobile vertical layout */}
        <div className="md:hidden space-y-5 relative">
          {/* Vertical line connecting all steps */}
          <div className="absolute left-[36px] top-[52px] bottom-12 w-[2px] bg-gradient-to-b from-violet-500/70 via-blue-500/50 to-emerald-500/30"></div>
          
          {steps.map((step, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: {
                  type: "spring",
                  duration: 0.6,
                  delay: index * 0.15
                }
              }}
              viewport={{ once: true, margin: "-30px" }}
              className={cn(
                "relative bg-white",
                "w-full max-w-[327px] min-h-[120px]",
                "p-4",
                "rounded-lg",
                "shadow-[0_2px_8px_rgba(0,0,0,0.08)]",
                "border border-gray-100",
                "touch-manipulation",
                "mx-auto"
              )}
            >
              <div className="flex h-full">
                {/* Left column: Number and Icon */}
                <div className="flex flex-col items-center mr-4 relative z-10">
                  {/* Number circle */}
                  <div className={cn(
                    "w-6 h-6",
                    stepColors[index].numBg,
                    stepColors[index].numText,
                    "rounded-full",
                    "flex items-center justify-center",
                    "text-xs font-medium",
                    "ring-2 ring-white",
                    "mb-2"
                  )}>
                    {index + 1}
                  </div>
                  
                  {/* Icon with colorful background */}
                  <div className={cn(
                    "rounded-lg p-2",
                    stepColors[index].iconBg,
                    stepColors[index].iconText
                  )}>
                    {step.icon}
                  </div>
                </div>
                
                {/* Right column: Content */}
                <div className="flex-1 max-w-[240px]">
                  {/* Title */}
                  <h4 className="text-base font-semibold text-gray-900 mb-1">
                    {step.title}
                  </h4>
                  
                  {/* Description */}
                  <p className="text-sm text-gray-600 leading-tight">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Desktop grid layout */}
        <div className="hidden md:grid w-full mx-auto grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10 relative">
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
        }} className={cn("relative bg-white", "min-h-[180px] sm:min-h-[200px]", "px-6 py-8", "rounded-xl", "shadow-[0_4px_12px_rgba(0,0,0,0.08)]", "transition-all duration-200", "group", "border border-gray-100", "active:scale-[0.98]", "touch-manipulation", "hover:shadow-[0_6px_16px_rgba(0,0,0,0.12)]")}>
              <div className="flex flex-col items-center justify-start h-full relative">
                {/* Step Number with connecting line */}
                <div className="absolute -left-[3.25rem] top-0 h-full" aria-hidden="true">
                  <motion.span className={cn("absolute -top-2 left-0", "w-8 h-8", stepColors[index].numBg, stepColors[index].numText, "rounded-full", "flex items-center justify-center", "text-sm font-medium", "ring-4 ring-white", "z-10")} initial={{
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
                  
                  {/* Enhanced vertical connecting line with gradient matching the number colors */}
                  {index < steps.length - 1 && <motion.div className={cn("absolute top-7 left-[0.875rem] w-[2px] h-[calc(100%+2rem)]", stepColors[index].lineColor, "bg-gradient-to-b")} initial={{
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
                
                {/* Icon with enhanced colorful background */}
                <motion.div className={cn("mb-5", stepColors[index].iconBg, stepColors[index].iconText, "transition-all duration-300", "rounded-xl p-4", "group-hover:saturate-150")} whileHover={{
              scale: 1.1
            }} whileTap={{
              scale: 0.95
            }}>
                  {step.icon}
                </motion.div>
                
                <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 text-center line-clamp-1">
                  {step.title}
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed text-center">
                  {step.description}
                </p>
              </div>
            </motion.div>)}
        </div>
      </div>
    </section>;
};
export default HowItWorksSection;
