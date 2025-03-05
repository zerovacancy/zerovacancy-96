import React from 'react';
interface SectionHeaderSimpleProps {
  title: string;
  subtitle: string;
}
const SectionHeaderSimple: React.FC<SectionHeaderSimpleProps> = ({
  title,
  subtitle
}) => {
  return <div className="centered-text-container section-spacing">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 font-jakarta tracking-tight">
        {title}
      </h2>
      <p className="paragraph-base">
        {subtitle}
      </p>
    </div>;
};
export default SectionHeaderSimple;