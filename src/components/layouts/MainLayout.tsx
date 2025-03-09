
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
    <div className="min-h-screen w-full bg-white">
      <Header />
      
      <main className={cn(
        "flex-1 relative w-full",
        isMobile ? "pt-0" : ""
      )}>
        {children}
        <Footer />
      </main>
      
      <BottomNav />
    </div>
  );
};

export default MainLayout;
