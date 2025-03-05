
import React from 'react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface SectionHeaderSimpleProps {
  title: string;
  subtitle: string;
}

const SectionHeaderSimple: React.FC<SectionHeaderSimpleProps> = ({ title, subtitle }) => {
  const isMobile = useIsMobile();
  
  return (
    <div className={cn(
      "text-center",
      "mb-6 sm:mb-8 lg:mb-10",
      "max-w-2xl mx-auto",
      "px-4"
    )}>
      <h2 className={cn(
        "font-bold tracking-tight",
        "mb-2 sm:mb-3 lg:mb-4",
        "text-brand-purple-dark",
        "text-xl sm:text-2xl lg:text-3xl",
        "leading-tight"
      )}>
        {title}
      </h2>
      <p className={cn(
        "text-brand-text-primary",
        "text-sm sm:text-base",
        "leading-relaxed"
      )}>
        {subtitle}
      </p>
    </div>
  );
};

export default SectionHeaderSimple;

// Also optimizing the FeatureHeader component for consistency
import { motion } from "framer-motion";

interface FeatureHeaderProps {
  title: string;
  description: string;
}

export const FeatureHeader = ({ title, description }: FeatureHeaderProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className={cn(
      "text-center",
      "mb-8 sm:mb-10 lg:mb-12",
      "max-w-2xl mx-auto",
      "px-4"
    )}>
      <motion.h2 
        className={cn(
          "font-bold tracking-tight font-jakarta",
          "mb-3 sm:mb-4",
          "text-brand-purple-dark",
          "text-xl sm:text-2xl lg:text-3xl",
          "leading-tight"
        )}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
      >
        {title}
      </motion.h2>
      <motion.p 
        className={cn(
          "text-brand-text-primary font-inter",
          "text-sm sm:text-base",
          "leading-relaxed"
        )}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
      >
        {description}
      </motion.p>
    </div>
  );
};

export default FeatureHeader;
