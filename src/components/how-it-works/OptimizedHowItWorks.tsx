
import React, { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import SectionHeaderSimple from './SectionHeaderSimple';
import MobileStepsGridSimple from './MobileStepsGridSimple';
import DesktopStepsGridSimple from './DesktopStepsGridSimple';
import BackgroundElementsSimple from './BackgroundElementsSimple';
import { cn } from '@/lib/utils';

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
    <section className="relative overflow-hidden py-10 sm:py-12 lg:py-16 px-3 sm:px-4 lg:px-6 bg-gradient-to-b from-gray-50 to-purple-50/20">
      {/* Background elements */}
      <BackgroundElementsSimple />
      
      <div className={cn(
        "max-w-6xl mx-auto relative z-10",
        "py-4 sm:py-6"
      )}>
        <SectionHeaderSimple 
          title="How It Works" 
          subtitle="Your journey to amazing content in four simple steps"
        />
        
        {/* Mobile 2x2 Grid Layout with improved spacing */}
        <div className="mt-6 sm:mt-8 lg:mt-10">
          <MobileStepsGridSimple completedSteps={completedSteps} />
          
          {/* Desktop grid layout with connecting lines */}
          <DesktopStepsGridSimple completedSteps={completedSteps} />
        </div>
      </div>
    </section>
  );
};

export default OptimizedHowItWorks;
