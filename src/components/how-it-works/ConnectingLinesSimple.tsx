
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { steps } from './step-data';

const ConnectingLinesSimple: React.FC = () => {
  return (
    <div className="absolute top-[50%] left-0 w-full z-0 hidden lg:block pointer-events-none transform -translate-y-1/2">
      {steps.slice(0, -1).map((_, index) => (
        <div key={index} className="relative">
          <div 
            className={cn(
              "absolute h-0.5",
              index === 0 ? "left-[23%] w-[18%] bg-gradient-to-r from-violet-500/60 to-blue-500/60 animate-grow-x" : 
              index === 1 ? "left-[48%] w-[18%] bg-gradient-to-r from-blue-500/60 to-amber-500/60 animate-grow-x animation-delay-300" :
              "left-[73%] w-[18%] bg-gradient-to-r from-amber-500/60 to-emerald-500/60 animate-grow-x animation-delay-600"
            )}
          >
            <div 
              className={cn(
                "absolute -right-3 -top-[7px]",
                index === 0 ? "text-blue-500 animate-fade-in animation-delay-900" : 
                index === 1 ? "text-amber-500 animate-fade-in animation-delay-1200" :
                "text-emerald-500 animate-fade-in animation-delay-1500"
              )}
            >
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ConnectingLinesSimple;
