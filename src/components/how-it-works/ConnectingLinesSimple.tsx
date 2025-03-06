import React from 'react';
import { cn } from '@/lib/utils';
import { steps } from './step-data';

// Keeping the component but removing all visual elements
const ConnectingLinesSimple: React.FC = () => {
  return (
    <div className="hidden">
      {/* Lines and arrows have been removed */}
    </div>
  );
};

export default ConnectingLinesSimple;
