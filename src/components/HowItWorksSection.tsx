
import React from 'react';
import { Search, Users, FileCheck, Calendar, Sparkle } from 'lucide-react';
import { motion } from 'framer-motion';
import { ShimmerButton } from '@/components/ui/shimmer-button';
import { cn } from '@/lib/utils';

const HowItWorksSection = () => {
  const steps = [{
    icon: <Search className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />,
    title: "Search & Filter",
    description: "Find your perfect creator match",
    number: "01"
  }, {
    icon: <Users className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />,
    title: "Review & Compare",
    description: "Browse portfolios and reviews",
    number: "02"
  }, {
    icon: <Calendar className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />,
    title: "Book & Pay",
    description: "Schedule securely through platform",
    number: "03"
  }, {
    icon: <FileCheck className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />,
    title: "Get Content",
    description: "Receive and approve deliverables",
    number: "04"
  }];

  return (
    <section className="relative overflow-hidden py-4 sm:py-6 lg:py-12 px-3 sm:px-6 lg:px-8">
      <div 
        className="absolute inset-0 -z-10 h-full w-full bg-gradient-to-b from-white/95 via-white/90 to-white/95 backdrop-blur-sm"
        aria-hidden="true"
      />
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-4 sm:mb-6 lg:mb-8">
          <h3 className="text-lg sm:text-2xl lg:text-4xl font-semibold tracking-tight mb-1.5 sm:mb-2">
            How It Works
          </h3>
          <p className="text-xs sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Your journey to amazing content in four simple steps
          </p>
        </div>
        
        <div className="w-[90%] sm:w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 lg:gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ 
                opacity: 1, 
                y: 0,
                transition: {
                  type: "spring",
                  duration: 0.8,
                  delay: index * 0.2
                }
              }}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.98 }}
              viewport={{ once: true, margin: "-50px" }}
              className={cn(
                "relative bg-white",
                "p-3 sm:p-4 lg:p-5",
                "rounded-xl",
                "shadow-sm hover:shadow-md",
                "transition-all duration-200",
                "group text-center",
                "border border-gray-100",
                "active:scale-[0.98]",
                "touch-manipulation"
              )}
            >
              <div className="flex flex-col items-center relative">
                {/* Step Number with connecting line */}
                <div className="absolute -left-4 top-0 h-full" aria-hidden="true">
                  <motion.span 
                    className={cn(
                      "absolute -top-2 -left-1",
                      "w-6 h-6 sm:w-7 sm:h-7",
                      "bg-primary text-white rounded-full",
                      "flex items-center justify-center",
                      "text-xs sm:text-sm font-medium",
                      "ring-4 ring-white",
                      "z-10"
                    )}
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ 
                      scale: 1, 
                      opacity: 1,
                      transition: {
                        type: "spring",
                        delay: index * 0.2 + 0.3,
                        duration: 0.5
                      }
                    }}
                    viewport={{ once: true }}
                  >
                    {step.number}
                  </motion.span>
                  
                  {/* Vertical connecting line */}
                  {index < steps.length - 1 && (
                    <motion.div 
                      className="absolute top-5 left-2 w-[1px] h-[calc(100%+0.625rem)] bg-gray-200"
                      initial={{ scaleY: 0 }}
                      whileInView={{
                        scaleY: 1,
                        transition: {
                          delay: index * 0.2 + 0.4,
                          duration: 0.5
                        }
                      }}
                      viewport={{ once: true }}
                    />
                  )}
                </div>
                
                {/* Icon with enhanced hover effect */}
                <motion.div 
                  className={cn(
                    "mb-2 sm:mb-3",
                    "text-gray-900",
                    "transition-all duration-300",
                    "relative"
                  )}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {step.icon}
                </motion.div>
                
                <h4 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 mb-1 sm:mb-1.5">
                  {step.title}
                </h4>
                <p className="text-xs sm:text-sm text-gray-600 max-w-[180px] mx-auto leading-relaxed">
                  {step.description}
                </p>
              </div>
              
              {/* Visual connector lines for larger screens */}
              {index < steps.length - 1 && (
                <>
                  {/* Desktop connector */}
                  <motion.div 
                    className="hidden lg:block absolute top-1/2 -right-3 w-6 h-[1px] bg-gray-200 origin-left"
                    initial={{ scaleX: 0 }}
                    whileInView={{ 
                      scaleX: 1,
                      transition: {
                        delay: index * 0.2 + 0.5,
                        duration: 0.5
                      }
                    }}
                    viewport={{ once: true }}
                  />
                  
                  {/* Tablet connector (horizontal) */}
                  <motion.div 
                    className="hidden md:block lg:hidden absolute -right-2 top-1/2 w-4 h-[1px] bg-gray-200"
                    initial={{ scaleX: 0 }}
                    whileInView={{ 
                      scaleX: 1,
                      transition: {
                        delay: index * 0.2 + 0.5,
                        duration: 0.5
                      }
                    }}
                    viewport={{ once: true }}
                  />
                </>
              )}
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center mt-6 sm:mt-8 w-[90%] sm:w-full mx-auto">
          <ShimmerButton 
            className={cn(
              "relative group/btn overflow-hidden",
              "w-full sm:w-auto min-w-[200px]",
              "h-11 sm:h-12",
              "text-sm sm:text-base font-medium",
              "px-6 sm:px-8",
              "flex items-center justify-center gap-2",
              "bg-gradient-to-r from-[#9b87f5] to-[#D946EF]",
              "hover:from-[#8e77f3] hover:to-[#D033ED]",
              "shadow-lg hover:shadow-xl",
              "transition-all duration-300",
              "hover:scale-[1.02] active:scale-[0.98]"
            )}
            shimmerColor="rgba(255, 255, 255, 0.2)"
            shimmerSize="60%"
            shimmerDuration="2s"
          >
            <span className="relative z-10">Join Waitlist</span>
            <Sparkle className="w-4 h-4 sm:w-5 sm:h-5 text-white/90" />
          </ShimmerButton>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
