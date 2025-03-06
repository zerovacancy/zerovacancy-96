
import React from 'react';
import DesktopStepItemSimple from './DesktopStepItemSimple';
import ConnectingLinesSimple from './ConnectingLinesSimple';
import { steps } from './step-data';
import { ArrowRight } from 'lucide-react';

interface DesktopStepsGridSimpleProps {
  completedSteps: number[];
  activeStep: number;
  onStepInteraction: (index: number) => void;
}

const DesktopStepsGridSimple: React.FC<DesktopStepsGridSimpleProps> = ({ 
  completedSteps,
  activeStep,
  onStepInteraction
}) => {
  return (
    <div className="hidden md:block w-full mx-auto relative pt-8">
      {/* Grid container */}
      <div className="grid w-full grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-7 relative">
        {steps.map((step, index) => (
          <div key={index} className="relative z-10">
            <DesktopStepItemSimple
              step={step}
              index={index}
              isCompleted={completedSteps.includes(index)}
              isActive={activeStep === index}
              onClick={() => onStepInteraction(index)}
            />
            
            {/* Flow arrows between steps - only show between items, not after the last one */}
            {index < steps.length - 1 && (index + 1) % 4 !== 0 && (
              <div className="absolute top-1/2 -right-4 transform -translate-y-1/2 hidden lg:block z-20">
                <div className={`p-1.5 rounded-full ${step.iconClass} opacity-70`}>
                  <ArrowRight className="w-3 h-3 text-white" />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Connecting lines positioned as a separate layer */}
      <div className="relative h-0">
        <ConnectingLinesSimple />
      </div>
    </div>
  );
};

export default DesktopStepsGridSimple;
