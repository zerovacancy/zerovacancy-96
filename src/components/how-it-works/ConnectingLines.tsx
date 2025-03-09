
import React from 'react';
import { ArrowRight } from 'lucide-react';

export const ConnectingLines: React.FC = () => {
  return (
    <div className="absolute top-16 left-0 w-full z-0 hidden lg:block pointer-events-none">
      {/* First connector line - violet to blue */}
      <div className="absolute top-8 left-[23%] w-[18%] h-0.5 bg-gradient-to-r from-violet-500 to-blue-500">
        <div className="absolute -right-3 -top-[7px] text-blue-500">
          <ArrowRight className="h-4 w-4" />
        </div>
      </div>
      
      {/* Second connector line - blue to amber */}
      <div className="absolute top-8 left-[48%] w-[18%] h-0.5 bg-gradient-to-r from-blue-500 to-amber-500">
        <div className="absolute -right-3 -top-[7px] text-amber-500">
          <ArrowRight className="h-4 w-4" />
        </div>
      </div>
      
      {/* Third connector line - amber to emerald */}
      <div className="absolute top-8 left-[73%] w-[18%] h-0.5 bg-gradient-to-r from-amber-500 to-emerald-500">
        <div className="absolute -right-3 -top-[7px] text-emerald-500">
          <ArrowRight className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
};
