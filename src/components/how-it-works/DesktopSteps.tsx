
import React from 'react';
import { StepItem } from './StepItem';
import { Step, stepColors } from './stepsData';

interface DesktopStepsProps {
  steps: Step[];
  completedSteps: number[];
}

export const DesktopSteps: React.FC<DesktopStepsProps> = ({ steps, completedSteps }) => {
  return (
    <div className="hidden md:grid w-full mx-auto grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10 relative">
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
  );
};
