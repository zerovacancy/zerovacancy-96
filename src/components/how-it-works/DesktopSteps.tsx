
import React from 'react';
import { StepItem } from './StepItem';
import { Step, stepColors } from './stepsData';
import { motion } from 'framer-motion';

interface DesktopStepsProps {
  steps: Step[];
  completedSteps: number[];
}

export const DesktopSteps: React.FC<DesktopStepsProps> = ({ steps, completedSteps }) => {
  return (
    <div className="hidden md:block w-full mx-auto relative">
      {/* Connecting lines between steps - desktop only */}
      <div className="absolute top-[6.5rem] left-0 right-0 z-0 hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-4 gap-10">
            {[0, 1, 2].map((index) => (
              <div key={`connector-${index}`} className="col-span-1 flex justify-end">
                <motion.div 
                  initial={{ width: 0, opacity: 0 }}
                  whileInView={{ 
                    width: '100%', 
                    opacity: 1,
                    transition: { 
                      delay: 0.4 + (index * 0.2), 
                      duration: 0.6,
                      ease: "easeOut"
                    }
                  }}
                  viewport={{ once: true }}
                  className={`h-[2px] w-full bg-gradient-to-r ${stepColors[index].lineColor}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Grid of steps */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10 relative z-10">
        {steps.map((step, index) => (
          <StepItem
            key={index}
            icon={step.icon}
            title={step.title}
            description={step.description}
            number={step.number}
            index={index}
            stepColor={stepColors[index]}
            isCompleted={completedSteps.includes(index)}
          />
        ))}
      </div>
    </div>
  );
};
