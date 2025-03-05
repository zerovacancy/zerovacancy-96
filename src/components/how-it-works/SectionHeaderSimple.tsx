
import React from 'react';

interface SectionHeaderSimpleProps {
  title: string;
  subtitle: string;
}

const SectionHeaderSimple: React.FC<SectionHeaderSimpleProps> = ({ title, subtitle }) => {
  return (
    <div className="text-center mb-6 sm:mb-10">
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight mb-2 sm:mb-3 text-brand-purple-dark">
        {title}
      </h2>
      <p className="text-sm sm:text-base text-brand-text-primary max-w-2xl mx-auto">
        {subtitle}
      </p>
    </div>
  );
};

export default SectionHeaderSimple;
