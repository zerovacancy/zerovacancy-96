
import React, { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { SectionHeader } from './how-it-works/SectionHeader';
import { DesktopSteps } from './how-it-works/DesktopSteps';
import { MobileSteps } from './how-it-works/MobileSteps';
import { SearchConnection } from './how-it-works/SearchConnection';
import { stepsData } from './how-it-works/stepsData';

const HowItWorksSection = () => {
  const isMobile = useIsMobile();
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  // Simulate completed steps (in a real app, this would come from user progress data)
  useEffect(() => {
    const savedProgress = localStorage.getItem('howItWorksProgress');
    if (savedProgress) {
      setCompletedSteps(JSON.parse(savedProgress));
    }
  }, []);
  
  return (
    <div className="max-w-7xl mx-auto relative">
      <SectionHeader 
        title="How It Works"
        description="Your journey to amazing content in four simple steps"
      />
      
      {/* Mobile vertical layout */}
      <MobileSteps steps={stepsData} completedSteps={completedSteps} />
      
      {/* Desktop grid layout */}
      <DesktopSteps steps={stepsData} completedSteps={completedSteps} />
      
      {/* Creator Search section with improved styling and integration */}
      <SearchConnection />
    </div>
  );
};

export default HowItWorksSection;
