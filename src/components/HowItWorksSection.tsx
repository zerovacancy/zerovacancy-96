
import React from 'react';
import { Search, Users, FileCheck, Calendar } from 'lucide-react';
import { ShimmerButton } from './ui/shimmer-button';
import { GlowingEffect } from './ui/glowing-effect';
import { MovingBorder } from './ui/moving-border';
import { Tiles } from './ui/tiles';

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
    <section className="relative overflow-hidden py-[76px]">
      <div className="absolute inset-0 opacity-50">
        <Tiles 
          rows={8} 
          cols={8} 
          tileSize="lg" 
          className="absolute inset-0" 
          tileClassName="opacity-[0.15] dark:opacity-[0.15]" 
        />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h3 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
            How It Works
          </h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your journey to amazing content in four simple steps
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              <div className="relative p-[1px] rounded-3xl overflow-hidden">
                <GlowingEffect blur={20} spread={30} borderWidth={2} className="opacity-50" glow />
                <MovingBorder rx="30%" ry="30%" duration={3000}>
                  <div className="h-24 w-24 opacity-100 bg-[radial-gradient(#8B5CF6_40%,transparent_60%)]" />
                </MovingBorder>
                <div className="h-full flex flex-col items-center p-8 rounded-3xl bg-white/95 backdrop-blur-sm relative z-20">
                  <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/5 mb-6 group-hover:scale-110 transition-transform duration-300">
                    <div className="text-primary">
                      {step.icon}
                    </div>
                  </div>
                  <h4 className="text-xl font-semibold mb-3 text-primary">{step.title}</h4>
                  <p className="text-muted-foreground text-center">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-16">
          <ShimmerButton className="min-w-[200px] h-12 text-base font-medium">
            Find Your Creator
          </ShimmerButton>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
