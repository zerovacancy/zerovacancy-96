
import React, { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import SectionHeaderSimple from './SectionHeaderSimple';
import MobileStepsGridSimple from './MobileStepsGridSimple';
import DesktopStepsGridSimple from './DesktopStepsGridSimple';

const OptimizedHowItWorks: React.FC = () => {
  const isMobile = useIsMobile();
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  // Load saved progress
  useEffect(() => {
    const savedProgress = localStorage.getItem('howItWorksProgress');
    if (savedProgress) {
      setCompletedSteps(JSON.parse(savedProgress));
    }
  }, []);

  return (
    <div className="py-8 sm:py-10 lg:py-14 px-2 sm:px-4 lg:px-6">
      <div className="max-w-6xl mx-auto py-0 px-px relative z-10">
        <SectionHeaderSimple 
          title="How It Works" 
          subtitle="Your journey to amazing content in four simple steps"
        />
        
        {/* Mobile 2x2 Grid Layout */}
        <MobileStepsGridSimple completedSteps={completedSteps} />
        
        {/* Desktop grid layout with connecting lines */}
        <DesktopStepsGridSimple completedSteps={completedSteps} />
      </div>
    </div>
  );
};

export default OptimizedHowItWorks;
