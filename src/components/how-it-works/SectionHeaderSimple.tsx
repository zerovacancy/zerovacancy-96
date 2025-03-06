
import React from 'react';

interface SectionHeaderSimpleProps {
  title: string;
  subtitle: string;
}

const SectionHeaderSimple: React.FC<SectionHeaderSimpleProps> = ({
  title,
  subtitle
}) => {
  return (
    <div className="text-center w-full">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 font-jakarta tracking-tight text-center">
        {title}
      </h2>
      
      {/* Decorative element under the heading */}
      <div className="w-20 h-1.5 bg-gradient-to-r from-violet-500 via-purple-500 to-blue-500 mx-auto mb-5 sm:mb-6 rounded-full"></div>
      
      <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-gray-600 font-inter leading-relaxed text-center mb-8">
        {subtitle}
      </p>
    </div>
  );
};

export default SectionHeaderSimple;
