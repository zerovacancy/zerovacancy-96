
import React, { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import SectionHeaderSimple from './SectionHeaderSimple';
import MobileStepsGridSimple from './MobileStepsGridSimple';
import DesktopStepsGridSimple from './DesktopStepsGridSimple';

const OptimizedHowItWorks: React.FC = () => {
  const isMobile = useIsMobile();
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [activeStep, setActiveStep] = useState<number>(0);

  // Load saved progress
  useEffect(() => {
    const savedProgress = localStorage.getItem('howItWorksProgress');
    if (savedProgress) {
      setCompletedSteps(JSON.parse(savedProgress));
    }
  }, []);

  // Handle step interaction
  const handleStepInteraction = (index: number) => {
    setActiveStep(index);
  };

  return (
    <div className="py-10 sm:py-12 lg:py-16 px-3 sm:px-5 lg:px-8 bg-gradient-to-b from-white via-purple-50/10 to-white">
      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeaderSimple 
          title="How It Works" 
          subtitle="Your journey to amazing content in four simple steps"
        />
        
        {/* Mobile 2x2 Grid Layout */}
        <MobileStepsGridSimple 
          completedSteps={completedSteps} 
          activeStep={activeStep}
          onStepInteraction={handleStepInteraction}
        />
        
        {/* Desktop grid layout with connecting lines */}
        <DesktopStepsGridSimple 
          completedSteps={completedSteps} 
          activeStep={activeStep}
          onStepInteraction={handleStepInteraction}
        />
      </div>
    </div>
  );
};

export default OptimizedHowItWorks;
