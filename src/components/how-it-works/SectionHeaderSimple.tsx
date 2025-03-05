
import React from 'react';

interface SectionHeaderSimpleProps {
  title: string;
  subtitle: string;
}

const SectionHeaderSimple: React.FC<SectionHeaderSimpleProps> = ({ title, subtitle }) => {
  return (
    <div className="centered-text-container section-spacing">
      <h2 className="heading-2">
        {title}
      </h2>
      <p className="paragraph-base">
        {subtitle}
      </p>
    </div>
  );
};

export default SectionHeaderSimple;
