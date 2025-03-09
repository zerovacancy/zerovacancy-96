
import React, { ReactNode } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import { BottomNav } from '../navigation/BottomNav';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { BackgroundEffects } from '@/components/features/BackgroundEffects';

interface MainLayoutProps {
  children: ReactNode;
  withBackground?: boolean;
  backgroundProps?: {
    baseColor?: string;
    className?: string;
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
        {withBackground ? (
          <BackgroundEffects {...(backgroundProps || {})}>
            {children}
          </BackgroundEffects>
        ) : (
          <>{children}</>
        )}
        <Footer />
      </main>
      
      <BottomNav />
    </div>
  );
};

export default MainLayout;
