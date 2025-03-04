
import React from 'react';

interface SectionHeaderProps {
  title: string;
  description: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, description }) => {
  return (
    <div className="text-center mb-6 sm:mb-14">
      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight mb-3 sm:mb-4">
        {title}
      </h3>
      <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
        {description}
      </p>
    </div>
  );
};
