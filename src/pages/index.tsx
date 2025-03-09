
import React, { useState, useEffect } from 'react';
import { MainLayout } from '@/components/layouts/MainLayout';
import { PromotionalBanner } from '@/components/landing/PromotionalBanner';
import { LandingSections } from '@/components/landing/LandingSections';
import { GlowDialog } from '@/components/ui/glow-dialog';
import { useIsMobile } from '@/hooks/use-mobile';
import { BackgroundEffects } from '@/components/features/BackgroundEffects';

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
    setShowGlowDialog(!hasVisited);
    if (!hasVisited) {
      localStorage.setItem('hasVisited', 'true');
    }
  }, []);
  
  const handleTryNowClick = () => {
    setShowGlowDialog(true);
  };
  
  return (
    <>
      <MainLayout>
        {!isMobile && (
          <PromotionalBanner 
            showBanner={showBanner}
            onClose={() => setShowBanner(false)}
            onTryNowClick={handleTryNowClick}
          />
        )}
        <LandingSections />
      </MainLayout>
      <GlowDialog open={showGlowDialog} onOpenChange={setShowGlowDialog} />
    </>
  );
};

export default Index;
