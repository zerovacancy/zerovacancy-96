
import React from 'react';
import DesktopStepItemSimple from './DesktopStepItemSimple';
import ConnectingLinesSimple from './ConnectingLinesSimple';
import { steps } from './step-data';

interface DesktopStepsGridSimpleProps {
  completedSteps: number[];
}

const DesktopStepsGridSimple: React.FC<DesktopStepsGridSimpleProps> = ({ completedSteps }) => {
  return (
    <div className="hidden md:block w-full mx-auto relative">
      {/* Connecting lines between steps */}
      <ConnectingLinesSimple />
      
      {/* Grid container */}
      <div className="grid w-full grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 relative">
        {steps.map((step, index) => (
          <DesktopStepItemSimple
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

export default DesktopStepsGridSimple;
