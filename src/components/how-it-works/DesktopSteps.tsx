
import React, { useEffect, useRef } from 'react';
import { StepItem } from './StepItem';
import { Step, stepColors } from './stepsData';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { Spotlight } from '../ui/spotlight';

interface DesktopStepsProps {
  steps: Step[];
  completedSteps: number[];
}

export const DesktopSteps: React.FC<DesktopStepsProps> = ({ steps, completedSteps }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Create sequential animations for connecting lines
  const lineProgress1 = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
  const lineProgress2 = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
  const lineProgress3 = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);

  return (
    <div className="hidden md:block w-full mx-auto relative py-8" ref={containerRef} aria-label="How it works process steps">
      {/* Floating background particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-10 right-10 text-violet-200/30 animate-pulse">
          <Sparkles size={30} />
        </div>
        <div className="absolute top-20 left-20 text-blue-200/20 animate-pulse" style={{ animationDelay: "1.5s" }}>
          <Sparkles size={24} />
        </div>
        <div className="absolute bottom-10 right-40 text-amber-200/30 animate-pulse" style={{ animationDelay: "0.8s" }}>
          <Sparkles size={20} />
        </div>
      </div>

      {/* Interactive spotlight effect that follows cursor */}
      <Spotlight className="hidden lg:block" />

      {/* Connecting lines between steps - desktop only */}
      <div className="absolute top-[6.5rem] left-0 right-0 z-0 hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-4 gap-10">
            {[0, 1, 2].map((index) => (
              <div key={`connector-${index}`} className="col-span-1 flex justify-end items-center relative">
                <motion.div 
                  style={{ 
                    width: index === 0 ? lineProgress1 : index === 1 ? lineProgress2 : lineProgress3,
                    opacity: index === 0 ? lineProgress1 : index === 1 ? lineProgress2 : lineProgress3
                  }}
                  className={`h-[3px] w-full ${stepColors[index].lineColor} rounded-full absolute z-10`}
                />
                <div className={`h-[3px] w-full bg-gray-100/30 rounded-full`} />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Grid of steps */}
      <div 
        className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10 relative z-10"
        role="list"
        aria-label="Process steps"
      >
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ 
              duration: 0.5, 
              delay: index * 0.15,
              type: "spring", 
              stiffness: 50 
            }}
          >
            <StepItem
              icon={step.icon}
              title={step.title}
              description={step.description}
              number={step.number}
              index={index}
              stepColor={stepColors[index]}
              isCompleted={completedSteps.includes(index)}
              aria-label={`Step ${step.number}: ${step.title}`}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};
