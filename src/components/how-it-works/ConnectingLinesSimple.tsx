
import React from 'react';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import { steps } from './step-data';

const ConnectingLinesSimple: React.FC = () => {
  return (
    <div className="absolute top-1/2 left-0 w-full z-0 hidden lg:block pointer-events-none transform -translate-y-1/2">
      {steps.slice(0, -1).map((step, index) => (
        <div key={index} className="relative">
          {/* Connecting line with gradient */}
          <div 
            className={cn(
              "absolute h-[2px]",
              index === 0 ? "left-[23%] w-[18%] bg-gradient-to-r from-violet-500/60 to-blue-500/60 animate-grow-x" : 
              index === 1 ? "left-[48%] w-[18%] bg-gradient-to-r from-blue-500/60 to-amber-500/60 animate-grow-x animation-delay-300" :
              "left-[73%] w-[18%] bg-gradient-to-r from-blue-500/60 to-emerald-500/60 animate-grow-x animation-delay-600"
            )}
            style={{ top: '48px' }}
          />
          
          {/* Arrow in the middle of the line */}
          <div 
            className={cn(
              "absolute flex items-center justify-center",
              "bg-white rounded-full shadow-sm p-1 z-10",
              index === 0 ? "left-[32%] text-violet-500 animate-fade-in animation-delay-200" : 
              index === 1 ? "left-[57%] text-blue-500 animate-fade-in animation-delay-500" :
              "left-[82%] text-emerald-500 animate-fade-in animation-delay-800"
            )}
            style={{ top: '40px' }}
          >
            <ArrowRight className="w-3 h-3" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ConnectingLinesSimple;
