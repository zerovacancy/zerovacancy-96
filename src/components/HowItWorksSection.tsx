
import React from 'react';
import { Search, Users, FileCheck, Calendar } from 'lucide-react';
import { ShimmerButton } from './ui/shimmer-button';
import { GlowingEffect } from './ui/glowing-effect';
import { MovingBorder } from './ui/moving-border';
import { motion } from 'framer-motion';

const HowItWorksSection = () => {
  const steps = [{
    icon: <Search className="w-7 h-7" />,
    title: "Search & Filter",
    description: "Find your perfect creator match"
  }, {
    icon: <Users className="w-7 h-7" />,
    title: "Review & Compare",
    description: "Browse portfolios and reviews"
  }, {
    icon: <Calendar className="w-7 h-7" />,
    title: "Book & Pay",
    description: "Schedule securely through platform"
  }, {
    icon: <FileCheck className="w-7 h-7" />,
    title: "Get Content",
    description: "Receive and approve deliverables"
  }];

  return (
    <section className="relative overflow-hidden py-12 sm:py-16 lg:py-20 px-3 sm:px-6 lg:px-8">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white/50 backdrop-blur-sm
        [background-image:linear-gradient(to_right,rgba(176,108,234,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(176,108,234,0.1)_1px,transparent_1px)]
        [background-size:6rem_4rem]
        [mask-image:radial-gradient(ellipse_at_center,white,transparent)]
        before:absolute before:inset-0
        before:bg-[radial-gradient(circle_at_center,#4F46E5,transparent)]
        before:opacity-30
        after:absolute after:h-full after:w-full
        after:[background:linear-gradient(to_right,#4F46E5,#EC4899)]
        after:opacity-10 after:animate-aurora">
      </div>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-12">
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
            How It Works
          </h3>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Your journey to amazing content in four simple steps
          </p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 px-2 sm:px-4">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group h-full"
            >
              <div className="relative p-[1px] rounded-2xl overflow-hidden h-full">
                <GlowingEffect blur={20} spread={30} borderWidth={1} className="opacity-40" glow />
                <MovingBorder rx="16px" ry="16px" duration={3000}>
                  <div className="h-20 w-20 opacity-100 bg-[radial-gradient(#8B5CF6_40%,transparent_60%)]" />
                </MovingBorder>
                <div className="h-full flex flex-col items-center p-6 rounded-2xl bg-white/95 backdrop-blur-sm relative z-20">
                  <div className="relative">
                    <div className="absolute -top-3 -left-3 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-primary/5 mb-4 group-hover:scale-110 transition-transform duration-300 shrink-0">
                      <div className="text-primary">
                        {step.icon}
                      </div>
                    </div>
                  </div>
                  <h4 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-primary">{step.title}</h4>
                  <p className="text-sm sm:text-base text-muted-foreground text-center">{step.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center mt-8 sm:mt-10">
          <ShimmerButton className="h-14 text-base sm:text-lg font-semibold px-8 sm:px-10 rounded-xl bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
            Find Your Creator
          </ShimmerButton>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
