
import React, { useState, useEffect } from 'react';
import { MainLayout } from '@/components/layouts/MainLayout';
import { PromotionalBanner } from '@/components/landing/PromotionalBanner';
import { LandingSections } from '@/components/landing/LandingSections';
import { GlowDialog } from '@/components/ui/glow-dialog';
import { useIsMobile } from '@/hooks/use-mobile';

/**
 * Main landing page component with performance optimizations
 */
const Index = () => {
  const [showBanner, setShowBanner] = useState(true);
  const [showGlowDialog, setShowGlowDialog] = useState(false);
  const isMobile = useIsMobile();
  
  // Initialize local storage and dialog state
  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited');
    const shouldShowDialog = !hasVisited && !isMobile; // Only show dialog on desktop
    setShowGlowDialog(shouldShowDialog);
    
    if (!hasVisited) {
      localStorage.setItem('hasVisited', 'true');
    }
  }, [isMobile]);
  
  const handleTryNowClick = () => {
    setShowGlowDialog(true);
  };
  
  return (
    <>
      <MainLayout withBackground={!isMobile}>
        {!isMobile && (
          <PromotionalBanner 
            showBanner={showBanner}
            onClose={() => setShowBanner(false)}
            onTryNowClick={handleTryNowClick}
          />
        )}
        <LandingSections />
      </MainLayout>
      {!isMobile && <GlowDialog open={showGlowDialog} onOpenChange={setShowGlowDialog} />}
    </>
  );
};

export default Index;
