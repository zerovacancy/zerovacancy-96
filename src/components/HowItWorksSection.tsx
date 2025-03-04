
import React, { useState, useEffect } from 'react';
import { Search, Users, FileCheck, Calendar, Check, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { SectionHeader } from './how-it-works/SectionHeader';
import { StepsSection } from './how-it-works/StepsSection';
import { SearchConnection } from './how-it-works/SearchConnection';

const HowItWorksSection = () => {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  // Simulate completed steps (in a real app, this would come from user progress data)
  useEffect(() => {
    const savedProgress = localStorage.getItem('howItWorksProgress');
    if (savedProgress) {
      setCompletedSteps(JSON.parse(savedProgress));
    }
  }, []);
  
  return (
    <section className="relative overflow-hidden py-8 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gray-50/5">
      <div className="max-w-7xl mx-auto py-0 px-px">
        {/* Using SectionHeader component from the original codebase */}
        <SectionHeader 
          title="How It Works"
          description="Your journey to amazing content in four simple steps"
        />
        
        {/* Steps Section */}
        <StepsSection completedSteps={completedSteps} />
        
        {/* SearchConnection as a separate section */}
        <SearchConnection />
      </div>
    </section>
  );
};

export default HowItWorksSection;
