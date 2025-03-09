
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { BorderBeam } from '../ui/border-beam';
import { GlowingEffect } from '../ui/glowing-effect';
import { AnimatedGrid } from '../ui/animated-grid';
import { GradientBlobBackground } from '@/components/ui/gradient-blob-background';
import { WavyBackground } from '@/components/ui/wavy-background';

interface PreviewCardProps {
  isVisible: boolean;
  children: React.ReactNode;
}

export const PreviewCard: React.FC<PreviewCardProps> = ({ isVisible, children }) => {
  const isMobile = useIsMobile();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ 
        opacity: 1, 
        y: 0,
        transition: {
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1]
        }
      }}
      viewport={{ once: true, margin: "-50px" }}
      className="relative rounded-lg sm:rounded-xl overflow-hidden shadow-lg sm:shadow-xl border border-zinc-200/70 bg-white/95 will-change-transform backdrop-blur-sm"
    >
      {children}
    </motion.div>
  );
};
