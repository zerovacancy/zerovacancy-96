
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MobileStepItem } from './MobileStepItem';
import { Step, stepColors } from './stepsData';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MobileStepsProps {
  steps: Step[];
  completedSteps: number[];
}

export const MobileSteps: React.FC<MobileStepsProps> = ({ steps, completedSteps }) => {
  const [expandedStep, setExpandedStep] = useState<number | null>(0); // First step expanded by default

  const toggleStep = (index: number) => {
    setExpandedStep(expandedStep === index ? null : index);
  };

  return (
    <div className="md:hidden space-y-[14px] relative" aria-label="How it works - mobile steps">
      {/* Connecting gradient line */}
      <div 
        className="absolute left-[8px] top-0 bottom-0 w-[3px] bg-gradient-to-b from-violet-500 via-blue-500 via-amber-500 to-emerald-500 opacity-60"
        aria-hidden="true"
      />
      
      {steps.map((step, index) => (
        <div key={index} className="flex flex-col">
          <MobileStepItem
            icon={step.icon}
            title={step.title}
            description={expandedStep === index ? step.description : ""}
            index={index}
            stepColor={stepColors[index]}
            isCompleted={completedSteps.includes(index)}
            isExpanded={expandedStep === index}
            onToggle={() => toggleStep(index)}
          />
          
          {/* Expansion indicator */}
          <motion.div 
            className={cn(
              "self-center mt-0.5 mb-0.5",
              "p-1.5 rounded-full",
              "bg-gray-100 border border-gray-200",
              "text-gray-500"
            )}
            animate={{ 
              rotate: expandedStep === index ? 180 : 0,
              backgroundColor: expandedStep === index ? stepColors[index].iconBg : 'rgb(243 244 246)',
              color: expandedStep === index ? stepColors[index].iconText : 'rgb(107 114 128)'
            }}
            transition={{ duration: 0.2 }}
            onClick={() => toggleStep(index)}
            aria-label={expandedStep === index ? "Collapse step" : "Expand step"}
          >
            {expandedStep === index ? 
              <ChevronUp className="h-4 w-4" /> : 
              <ChevronDown className="h-4 w-4" />
            }
          </motion.div>
        </div>
      ))}
      
      {/* View more button at the bottom - links to search functionality */}
      <motion.div 
        className="flex justify-center py-2 mt-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <motion.button
          className="px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm text-sm font-medium text-gray-600 flex items-center gap-2"
          whileTap={{ scale: 0.97 }}
          onClick={() => {
            const searchSection = document.querySelector('[aria-label="Search functionality"]');
            if (searchSection) {
              searchSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          See it in action
          <ChevronDown className="h-4 w-4" />
        </motion.button>
      </motion.div>
    </div>
  );
};
