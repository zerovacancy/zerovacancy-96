
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
    <section className="relative overflow-hidden py-12 sm:py-16 lg:py-20 px-3 sm:px-6 lg:px-8">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white/50 backdrop-blur-sm
        [background:linear-gradient(to_bottom,white,#f9fafb)]">
      </div>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-12">
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold mb-3 sm:mb-4 text-gray-900">
            How It Works
          </h3>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Your journey to amazing content in four simple steps
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 px-2 sm:px-4">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all group"
            >
              <div className="absolute -top-3 -left-3 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-medium">
                {index + 1}
              </div>
              
              <div className="mb-4 text-gray-900 transition-transform group-hover:scale-110">
                {step.icon}
              </div>
              
              <h4 className="text-xl font-medium text-gray-900 mb-2">{step.title}</h4>
              <p className="text-gray-600">{step.description}</p>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-px bg-gray-300" />
              )}
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center mt-10 sm:mt-12">
          <button className="px-8 py-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all font-medium">
            Find Your Creator
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
