
import React from 'react';
import { Search, Users, FileCheck, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

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

  return (
    <section className="relative overflow-hidden py-4 sm:py-6 lg:py-12 px-3 sm:px-6 lg:px-8">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white/50 backdrop-blur-sm">
      </div>
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
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative bg-white p-4 sm:p-5 lg:p-6 rounded-xl shadow-sm hover:shadow-md transition-all group text-center border border-gray-100 active:scale-[0.98] touch-manipulation"
            >
              <div className="flex flex-col items-center">
                {/* Step Number */}
                <span className="absolute -top-3 -left-3 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium">
                  {step.number}
                </span>
                
                {/* Icon with hover effect */}
                <div className="mb-2 sm:mb-3 text-gray-900 transition-all duration-200 group-hover:scale-110 group-hover:text-primary">
                  {step.icon}
                </div>
                
                <h4 className="text-base sm:text-lg font-medium text-gray-900 mb-1.5 sm:mb-2 font-space">
                  {step.title}
                </h4>
                <p className="text-gray-600 text-sm max-w-[200px] mx-auto">
                  {step.description}
                </p>
              </div>
              
              {/* Visual connector line */}
              {index < steps.length - 1 && (
                <>
                  {/* Desktop connector */}
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-gray-200 group-hover:bg-primary transition-colors duration-200" />
                  
                  {/* Mobile/Tablet connector (vertical) */}
                  <div className="lg:hidden absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-px h-6 bg-gray-200 md:hidden" />
                </>
              )}
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center mt-6 sm:mt-8">
          <Button 
            variant="default"
            className="w-full sm:w-auto sm:min-w-[200px] px-8 py-2.5 text-sm sm:text-base"
          >
            Find Your Creator
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
