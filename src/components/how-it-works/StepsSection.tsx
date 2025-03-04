
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { MobileSteps } from './MobileSteps';
import { DesktopSteps } from './DesktopSteps';
import { stepsData, stepColors } from './stepsUtils';

interface StepsSectionProps {
  completedSteps: number[];
}

export const StepsSection: React.FC<StepsSectionProps> = ({ completedSteps }) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="w-full">
      {/* Mobile vertical layout */}
      <MobileSteps steps={stepsData} completedSteps={completedSteps} />
      
      {/* Desktop grid layout */}
      <DesktopSteps steps={stepsData} completedSteps={completedSteps} stepColors={stepColors} />
    </div>
  );
};
