
import React, { ReactNode } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import { BottomNav } from '../navigation/BottomNav';
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
  
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Header />
      
      <main className={cn(
        "flex-1 pb-0 w-full",
        isMobile ? "pt-0 max-w-[100vw] overflow-hidden" : ""
      )}>
        {/* Strip down background effects on mobile for better performance */}
        <div className={cn(
          "w-full",
          isMobile ? "bg-white/90" : ""
        )}>
          {children}
        </div>
        <Footer />
      </main>
      
      <BottomNav />
    </div>
  );
};

export default MainLayout;
