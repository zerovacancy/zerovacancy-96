
import React from 'react';
import { Search, Users, FileCheck, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const HowItWorksSection = () => {
  const steps = [{
    icon: <Search className="w-6 h-6" />,
    title: "Search & Filter",
    description: "Find your perfect creator match",
    number: "01"
  }, {
    icon: <Users className="w-6 h-6" />,
    title: "Review & Compare",
    description: "Browse portfolios and reviews",
    number: "02"
  }, {
    icon: <Calendar className="w-6 h-6" />,
    title: "Book & Pay",
    description: "Schedule securely through platform",
    number: "03"
  }, {
    icon: <FileCheck className="w-6 h-6" />,
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
        
        <div className="w-[75%] max-w-[260px] sm:max-w-none sm:w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-4 lg:gap-6 relative pl-8 sm:pl-0">
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
                "h-[120px] overflow-hidden",
                "p-4",
                "rounded-lg",
                "shadow-[0_2px_8px_rgba(0,0,0,0.1)]",
                "transition-all duration-200",
                "group",
                "border border-gray-100",
                "active:scale-[0.98]",
                "touch-manipulation"
              )}
            >
              <div className="flex flex-col items-center justify-start h-full relative">
                {/* Step Number with connecting line */}
                <div className="absolute -left-[2.75rem] top-0 h-full" aria-hidden="true">
                  <motion.span 
                    className={cn(
                      "absolute -top-2 left-0",
                      "w-6 h-6",
                      "bg-primary text-white rounded-full",
                      "flex items-center justify-center",
                      "text-xs font-medium",
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
                  
                  {/* Standardized vertical connecting line */}
                  {index < steps.length - 1 && (
                    <motion.div 
                      className="absolute top-5 left-[0.6875rem] w-[1px] h-[calc(100%+1.5rem)] bg-gray-200"
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
                
                {/* Icon with consistent positioning */}
                <motion.div 
                  className={cn(
                    "mb-2",
                    "text-gray-900",
                    "transition-all duration-300",
                  )}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {step.icon}
                </motion.div>
                
                <h4 className="text-sm font-semibold text-gray-900 mb-1 text-center line-clamp-1">
                  {step.title}
                </h4>
                <p className="text-[0.8125rem] text-gray-600 leading-relaxed text-center line-clamp-2">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
