
import React, { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { MobileSteps } from './MobileSteps';
import { DesktopSteps } from './DesktopSteps';
import { stepsData, stepColors } from './stepsUtils';

interface StepsSectionProps {
  completedSteps: number[];
}

export const StepsSection: React.FC<StepsSectionProps> = ({ completedSteps }) => {
  const isMobile = useIsMobile();
  const [activeStep, setActiveStep] = useState<number | null>(null);
  
  const handleStepClick = (index: number) => {
    setActiveStep(prev => prev === index ? null : index);
  };
  
  return (
    <div className="w-full">
      {/* Mobile vertical layout */}
      <MobileSteps 
        steps={stepsData} 
        completedSteps={completedSteps} 
        activeStep={activeStep}
        onStepClick={handleStepClick}
      />
      
      {/* Desktop grid layout */}
      <DesktopSteps 
        steps={stepsData} 
        completedSteps={completedSteps} 
        stepColors={stepColors} 
        activeStep={activeStep}
        onStepClick={handleStepClick}
      />
    </div>
  );
};
