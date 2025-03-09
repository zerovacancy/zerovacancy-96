
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

  // Optimize motion features for mobile
  const motionProps = isMobile 
    ? {
        initial: { opacity: 0.8, y: 10 },
        whileInView: { 
          opacity: 1, 
          y: 0,
          transition: {
            duration: 0.4,
            ease: "easeOut"
          }
        }
      }
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { 
          opacity: 1, 
          y: 0,
          transition: {
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1]
          }
        }
      };

  return (
    <motion.div 
      {...motionProps}
      viewport={{ once: true, margin: "-50px" }}
      className="relative rounded-lg sm:rounded-xl overflow-hidden shadow-lg sm:shadow-xl border border-zinc-200/70 bg-white/95 will-change-transform backdrop-blur-sm"
    >
      {/* Only render decorative elements on desktop */}
      {!isMobile && (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-lg sm:rounded-xl">
          <BorderBeam 
            colorFrom="#9370DB" 
            colorTo="#C19EF9" 
            duration={18}
            borderWidth={1.5}
          />
          <GlowingEffect 
            variant="default" 
            blur={8} 
            glow={true} 
            inactiveZone={0.55}
            spread={18}
            borderWidth={1.2}
            className="opacity-30"
          />
          <AnimatedGrid className="opacity-8" />
        </div>
      )}

      {/* Adding WavyBackground for subtle animation - only on desktop */}
      {!isMobile && (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-lg sm:rounded-xl">
          <WavyBackground 
            colors={["#9370DB10", "#C19EF908", "#8A2BE210"]}
            waveWidth={50}
            backgroundFill="transparent" 
            blur={8}
            speed="slow"
            waveOpacity={0.25}
            className="h-full w-full"
            containerClassName="h-full w-full absolute inset-0"
          />
        </div>
      )}

      <GradientBlobBackground 
        className="min-h-0 w-full" 
        baseColor="bg-white/95"
        pattern="none"
        blobColors={{
          first: "bg-purple-200",
          second: "bg-indigo-200",
          third: "bg-blue-200"
        }}
        blobOpacity={isMobile ? 0.1 : 0.3}
        withSpotlight={!isMobile}
        spotlightClassName="from-purple-500/15 via-indigo-500/15 to-blue-500/15"
      >
        {children}
      </GradientBlobBackground>
    </motion.div>
  );
};
