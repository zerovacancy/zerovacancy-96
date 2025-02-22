import React from 'react';
import { Search, Users, FileCheck, Calendar, Sparkle } from 'lucide-react';
import { motion } from 'framer-motion';
import { ShimmerButton } from '@/components/ui/shimmer-button';
import { cn } from '@/lib/utils';

const HowItWorksSection = () => {
  const steps = [{
    icon: <Search className="w-7 h-7 sm:w-8 sm:h-8" />,
    title: "Search & Filter",
    description: "Find your perfect creator match",
    number: "01"
  }, {
    icon: <Users className="w-7 h-7 sm:w-8 sm:h-8" />,
    title: "Review & Compare",
    description: "Browse portfolios and reviews",
    number: "02"
  }, {
    icon: <Calendar className="w-7 h-7 sm:w-8 sm:h-8" />,
    title: "Book & Pay",
    description: "Schedule securely through platform",
    number: "03"
  }, {
    icon: <FileCheck className="w-7 h-7 sm:w-8 sm:h-8" />,
    title: "Get Content",
    description: "Receive and approve deliverables",
    number: "04"
  }];

  React.useEffect(() => {
    console.log('HowItWorksSection ShimmerButton mounted with styles:', {
      className: cn(
        "relative group/btn overflow-hidden",
        "w-full sm:w-auto min-w-[200px]",
        "h-12 sm:h-14",
        "text-base sm:text-lg font-medium",
        "px-8 sm:px-12",
        "flex items-center justify-center gap-2 sm:gap-3",
        "bg-gradient-to-r from-[#9b87f5] to-[#D946EF]",
        "hover:from-[#8e77f3] hover:to-[#D033ED]",
        "shadow-lg hover:shadow-xl",
        "transition-all duration-300",
        "hover:scale-[1.02] active:scale-[0.98]"
      )
    });
  }, []);

  return (
    <section className="relative overflow-hidden py-4 sm:py-6 lg:py-12 px-3 sm:px-6 lg:px-8">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white/50 backdrop-blur-sm" />
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <h3 className="text-xl sm:text-2xl lg:text-4xl font-semibold tracking-tight mb-2 sm:mb-3">
            How It Works
          </h3>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Your journey to amazing content in four simple steps
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 px-2 sm:px-4">
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
              viewport={{ once: true, margin: "-50px" }}
              className="relative bg-white p-4 sm:p-5 lg:p-6 rounded-xl shadow-sm hover:shadow-md transition-all group text-center border border-gray-100 active:scale-[0.98] touch-manipulation"
            >
              <div className="flex flex-col items-center">
                {/* Step Number with adjusted positioning */}
                <motion.span 
                  className={cn(
                    "absolute -top-2.5 -left-2.5 w-7 h-7",
                    "bg-primary text-white rounded-full",
                    "flex items-center justify-center text-sm font-medium",
                    "ring-4 ring-white"
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
                
                {/* Icon with enhanced hover effect */}
                <motion.div 
                  className="mb-2 sm:mb-3 text-gray-900 transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {step.icon}
                </motion.div>
                
                <h4 className="text-base sm:text-lg font-medium text-gray-900 mb-1.5 sm:mb-2">
                  {step.title}
                </h4>
                <p className="text-gray-600 text-sm max-w-[200px] mx-auto">
                  {step.description}
                </p>
              </div>
              
              {/* Visual connector lines with micro-animations */}
              {index < steps.length - 1 && (
                <>
                  {/* Desktop connector */}
                  <motion.div 
                    className="hidden lg:block absolute top-1/2 -right-3 w-6 h-[1px] bg-gray-100 origin-left"
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
                  
                  {/* Mobile/Tablet connector (vertical) */}
                  <motion.div 
                    className="lg:hidden absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-[1px] h-6 bg-gray-100 origin-top md:hidden"
                    initial={{ scaleY: 0 }}
                    whileInView={{ 
                      scaleY: 1,
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

        <div className="flex justify-center mt-6 sm:mt-8">
          <ShimmerButton 
            className={cn(
              "relative group/btn overflow-hidden",
              "w-full sm:w-auto min-w-[200px]",
              "h-12 sm:h-14",
              "text-base sm:text-lg font-medium",
              "px-8 sm:px-12",
              "flex items-center justify-center gap-2 sm:gap-3",
              "bg-gradient-to-r from-[#9b87f5] to-[#D946EF]",
              "hover:from-[#8e77f3] hover:to-[#D033ED]",
              "shadow-lg hover:shadow-xl",
              "transition-all duration-300",
              "hover:scale-[1.02] active:scale-[0.98]"
            )}
            shimmerColor="rgba(255, 255, 255, 0.2)"
            shimmerSize="60%"
            shimmerDuration="2s"
            onClick={(e) => {
              console.log('HowItWorksSection ShimmerButton clicked, applied classes:', e.currentTarget.className);
            }}
          >
            <span className="relative z-10">Join Waitlist</span>
            <Sparkle className="w-5 h-5 sm:w-6 sm:h-6 text-white/90" />
          </ShimmerButton>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
