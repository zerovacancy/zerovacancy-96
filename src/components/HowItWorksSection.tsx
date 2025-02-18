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
  return <section className="bg-white py-[8px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-[107px] py-0 my-0 bg-white">
        <div className="text-center mb-8">
          <h3 className="font-semibold mb-2 text-5xl my-[19px]">How It Works</h3>
          <p className="text-muted-foreground">Your journey to amazing content in four simple steps</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => <div key={index} className="relative group">
              <div className="flex flex-col items-center p-6 rounded-lg bg-background/80 backdrop-blur-sm hover:bg-background/95 transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 text-primary">
                  {step.icon}
                </div>
                <h4 className="font-medium mb-2">{step.title}</h4>
                <p className="text-sm text-muted-foreground text-center">{step.description}</p>
              </div>
              {index < steps.length - 1 && <div className="hidden lg:block absolute top-1/2 right-0 w-full h-[2px] bg-primary/10 -mr-3 transform translate-x-1/2 -translate-y-1/2 z-0" />}
            </div>)}
        </div>

        <div className="flex justify-center mt-8 sm:mt-12 my-[23px]">
          <ShimmerButton className="min-w-[200px] h-12 text-base px-8" background="#1A1F2C">
            Find Your Creator
          </ShimmerButton>
        </div>
      </div>
    </section>;
};
export default HowItWorksSection;