
import React from 'react';
import { MobileStepItem } from './MobileStepItem';
import { Step, stepColors } from './stepsData';

interface MobileStepsProps {
  steps: Step[];
  completedSteps: number[];
}

export const MobileSteps: React.FC<MobileStepsProps> = ({ steps, completedSteps }) => {
  return (
    <div className="md:hidden space-y-[14px] relative">
      {/* Connecting gradient line */}
      <div className="absolute left-[8px] top-0 bottom-0 w-[3px] bg-gradient-to-b from-violet-500 via-blue-500 via-amber-500 to-emerald-500 opacity-60"></div>
      
      {steps.map((step, index) => (
        <MobileStepItem
          key={index}
          icon={step.icon}
          title={step.title}
          description={step.description}
          index={index}
          stepColor={stepColors[index]}
          isCompleted={completedSteps.includes(index)}
        />
      ))}
    </div>
  );
};
