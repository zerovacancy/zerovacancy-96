
import React from 'react';
import { Search, Users, FileCheck, Calendar } from 'lucide-react';
import { ShimmerButton } from './ui/shimmer-button';

const HowItWorksSection = () => {
  const steps = [{
    icon: <Search className="w-6 h-6" />,
    title: "Search & Filter",
    description: "Find your perfect creator match"
  }, {
    icon: <Users className="w-6 h-6" />,
    title: "Review & Compare",
    description: "Browse portfolios and reviews"
  }, {
    icon: <Calendar className="w-6 h-6" />,
    title: "Book & Pay",
    description: "Schedule securely through platform"
  }, {
    icon: <FileCheck className="w-6 h-6" />,
    title: "Get Content",
    description: "Receive and approve deliverables"
  }];

  return <section className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50 py-[76px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h3 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
            How It Works
          </h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your journey to amazing content in four simple steps
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, index) => <div key={index} className="relative group">
              <div className="h-full flex flex-col items-center p-8 rounded-2xl bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.03),0_2px_4px_rgba(0,0,0,0.05),0_12px_24px_rgba(0,0,0,0.05)] hover:shadow-[0_0_0_1px_rgba(0,0,0,0.03),0_2px_4px_rgba(0,0,0,0.05),0_12px_24px_rgba(0,0,0,0.09)] transform hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/5 mb-6 group-hover:scale-110 transition-transform duration-300">
                  <div className="text-primary">
                    {step.icon}
                  </div>
                </div>
                <h4 className="text-xl font-semibold mb-3 text-primary">{step.title}</h4>
                <p className="text-muted-foreground text-center">{step.description}</p>
              </div>
            </div>)}
        </div>

        <div className="flex justify-center mt-16">
          <ShimmerButton className="min-w-[200px] h-12 text-base font-medium">
            Find Your Creator
          </ShimmerButton>
        </div>
      </div>
    </section>;
};

export default HowItWorksSection;
