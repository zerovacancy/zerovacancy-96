
import React from 'react';
import { Search, Users, FileCheck, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const HowItWorksSection = () => {
  const steps = [{
    icon: <Search className="w-8 h-8" />,
    title: "Search & Filter",
    description: "Find your perfect creator match"
  }, {
    icon: <Users className="w-8 h-8" />,
    title: "Review & Compare",
    description: "Browse portfolios and reviews"
  }, {
    icon: <Calendar className="w-8 h-8" />,
    title: "Book & Pay",
    description: "Schedule securely through platform"
  }, {
    icon: <FileCheck className="w-8 h-8" />,
    title: "Get Content",
    description: "Receive and approve deliverables"
  }];

  return (
    <section className="relative overflow-hidden py-8 sm:py-12 lg:py-16 px-3 sm:px-6 lg:px-8">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white/50 backdrop-blur-sm">
      </div>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-10">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight mb-3">
            How It Works
          </h3>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Your journey to amazing content in four simple steps
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 px-2 sm:px-4">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative bg-white p-5 sm:p-6 rounded-xl shadow-sm hover:shadow-md transition-all group pt-8 text-center border-2 border-gray-100"
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-white text-gray-900 rounded-full flex items-center justify-center text-sm font-medium border-2 border-gray-900 shadow-sm">
                {index + 1}
              </div>
              
              <div className="flex flex-col items-center">
                <div className="mb-3 text-gray-900 transition-transform group-hover:scale-110">
                  {step.icon}
                </div>
                
                <h4 className="text-lg font-medium text-gray-900 mb-2 font-space">
                  {step.title}
                </h4>
                <p className="text-gray-600 text-sm sm:text-base max-w-[200px] mx-auto">
                  {step.description}
                </p>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-px bg-gray-300" />
              )}
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center mt-8 sm:mt-10">
          <button className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all font-space text-sm sm:text-base">
            Find Your Creator
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
