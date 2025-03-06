
import React from 'react';
import MobileStepItemSimple from './MobileStepItemSimple';
import { steps } from './step-data';
import { ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MobileStepsGridSimpleProps {
  completedSteps: number[];
  activeStep: number;
  onStepInteraction: (index: number) => void;
}

const MobileStepsGridSimple: React.FC<MobileStepsGridSimpleProps> = ({ 
  completedSteps, 
  activeStep,
  onStepInteraction 
}) => {
  return (
    <div className="md:hidden w-full mb-8">
      <div className="flex flex-col gap-6 px-4">
        {steps.map((step, index) => (
          <div key={index} className="w-full">
            <MobileStepItemSimple
              step={step}
              index={index}
              isCompleted={completedSteps.includes(index)}
              isActive={activeStep === index}
              onClick={() => onStepInteraction(index)}
            />
            
            {/* Add connecting arrow between steps (except after the last step) */}
            {index < steps.length - 1 && (
              <div className={cn(
                "flex justify-center my-1",
                "animate-pulse opacity-70"
              )}>
                <ArrowDown className="w-5 h-5 text-gray-400 mt-2" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileStepsGridSimple;
