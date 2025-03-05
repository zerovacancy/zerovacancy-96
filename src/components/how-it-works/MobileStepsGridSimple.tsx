
import React from 'react';
import MobileStepItemSimple from './MobileStepItemSimple';
import { steps } from './step-data';

interface MobileStepsGridSimpleProps {
  completedSteps: number[];
}

const MobileStepsGridSimple: React.FC<MobileStepsGridSimpleProps> = ({ completedSteps }) => {
  return (
    <div className="md:hidden w-full mb-6">
      <div className="grid grid-cols-2 gap-3">
        {steps.map((step, index) => (
          <MobileStepItemSimple
            key={index}
            step={step}
            index={index}
            isCompleted={completedSteps.includes(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default MobileStepsGridSimple;
