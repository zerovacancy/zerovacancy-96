
import React from 'react';
import { Search, Users, FileCheck, Calendar } from 'lucide-react';
import { ShimmerButton } from './ui/shimmer-button';
import { GlowingEffect } from './ui/glowing-effect';
import { MovingBorder } from './ui/moving-border';

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

  return (
    <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white 
        [background-image:linear-gradient(to_right,rgba(176,108,234,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(176,108,234,0.2)_1px,transparent_1px)]
        [background-size:6rem_4rem]
        [mask-image:radial-gradient(ellipse_at_center,white,transparent)]
        before:absolute before:inset-0
        before:bg-[radial-gradient(circle_at_center,#4F46E5,transparent)]
        before:opacity-40
        after:absolute after:h-full after:w-full
        after:[background:linear-gradient(to_right,#4F46E5,#EC4899)]
        after:opacity-20 after:animate-aurora">
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
            How It Works
          </h3>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Your journey to amazing content in four simple steps
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              <div className="relative p-[1px] rounded-3xl overflow-hidden">
                <GlowingEffect blur={20} spread={30} borderWidth={2} className="opacity-50" glow />
                <MovingBorder rx="30%" ry="30%" duration={3000}>
                  <div className="h-24 w-24 opacity-100 bg-[radial-gradient(#8B5CF6_40%,transparent_60%)]" />
                </MovingBorder>
                <div className="h-full flex flex-col items-center p-6 sm:p-8 rounded-3xl bg-white/95 backdrop-blur-sm relative z-20">
                  <div className="flex items-center justify-center w-14 sm:w-16 h-14 sm:h-16 rounded-2xl bg-primary/5 mb-6 group-hover:scale-110 transition-transform duration-300">
                    <div className="text-primary">
                      {step.icon}
                    </div>
                  </div>
                  <h4 className="text-lg sm:text-xl font-semibold mb-3 text-primary">{step.title}</h4>
                  <p className="text-sm sm:text-base text-muted-foreground text-center">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-12 sm:mt-16">
          <ShimmerButton className="min-w-[200px] h-12 text-base font-medium">
            Find Your Creator
          </ShimmerButton>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
