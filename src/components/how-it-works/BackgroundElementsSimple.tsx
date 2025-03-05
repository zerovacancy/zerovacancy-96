
import React from 'react';

const BackgroundElementsSimple: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="smallGrid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-purple-900" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#smallGrid)" />
        </svg>
      </div>
      
      {/* Subtle gradient overlays */}
      <div className="absolute top-0 right-0 w-full h-96 bg-gradient-to-b from-purple-100/10 to-transparent transform -rotate-12 translate-x-1/4 translate-y-[-40%] rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-full h-96 bg-gradient-to-t from-blue-100/10 to-transparent transform rotate-12 translate-x-[-30%] translate-y-[30%] rounded-full blur-3xl"></div>
    </div>
  );
};

export default BackgroundElementsSimple;
