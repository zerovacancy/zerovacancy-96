
import React, { ReactNode } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import { BottomNav } from '../navigation/BottomNav';
import { BackgroundEffects } from '@/components/features/BackgroundEffects';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface MainLayoutProps {
  children: ReactNode;
  withBackground?: boolean;
  backgroundProps?: {
    blobColors?: {
      first?: string;
      second?: string;
      third?: string;
    };
    blobOpacity?: number;
    withSpotlight?: boolean;
    spotlightClassName?: string;
    baseColor?: string;
    pattern?: 'dots' | 'grid' | 'none';
    className?: string;
    animationSpeed?: 'slow' | 'medium' | 'fast';
    mobileFullWidth?: boolean;
  };
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  withBackground = true,
  backgroundProps
}) => {
  const isMobile = useIsMobile();
  
  const defaultBackgroundProps = {
    blobColors: {
      first: "bg-purple-200",
      second: "bg-indigo-200",
      third: "bg-violet-200"
    },
    blobOpacity: 0.35,
    withSpotlight: true,
    spotlightClassName: "from-purple-500/10 via-violet-500/10 to-blue-500/10",
    baseColor: "bg-white/60",
    pattern: "dots" as const,
    className: "pt-0",
    animationSpeed: "slow" as const,
    mobileFullWidth: isMobile
  };
  
  const mergedBackgroundProps = {
    ...defaultBackgroundProps,
    ...backgroundProps
  };

  return (
    <div className="flex flex-col min-h-screen w-full">
      <Header />
      
      <main className={cn(
        "flex-1 pb-16 sm:pb-0 w-full",
        isMobile ? "pt-0" : ""
      )}>
        {withBackground ? (
          <BackgroundEffects 
            blobColors={mergedBackgroundProps.blobColors}
            blobOpacity={mergedBackgroundProps.blobOpacity}
            withSpotlight={mergedBackgroundProps.withSpotlight}
            spotlightClassName={mergedBackgroundProps.spotlightClassName}
            baseColor={mergedBackgroundProps.baseColor}
            pattern={mergedBackgroundProps.pattern}
            className={mergedBackgroundProps.className}
            animationSpeed={mergedBackgroundProps.animationSpeed}
            mobileFullWidth={mergedBackgroundProps.mobileFullWidth}
          >
            {children}
            <Footer />
          </BackgroundEffects>
        ) : (
          <>
            {children}
            <Footer />
          </>
        )}
      </main>
      
      <BottomNav />
    </div>
  );
};

export default MainLayout;
