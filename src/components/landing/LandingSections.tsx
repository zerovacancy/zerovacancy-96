
import React, { useRef, useState, Suspense, useCallback } from 'react';
import { Hero } from '../hero/Hero';
import CallToActionSection from '../CallToActionSection';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { lazy } from 'react';
import { BackgroundEffects } from '@/components/features/BackgroundEffects';
import { BeamsBackground } from '@/components/ui/beams-background';

// Lazy-loaded components
const OptimizedHowItWorks = lazy(() => import('../how-it-works/OptimizedHowItWorks'));
const FeaturesSectionWithHoverEffects = lazy(() => import('@/components/features/Features'));
const Pricing = lazy(() => import('@/components/Pricing'));
const PreviewSearch = lazy(() => import('@/components/preview-search'));

// Simple loading fallback
const SectionLoader = () => (
  <div className="w-full py-8 sm:py-16 flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

export const LandingSections: React.FC = () => {
  const isMobile = useIsMobile();
  
  // Create a single array to store refs instead of using individual states
  // This avoids too many re-renders and state updates
  const [sectionsVisible, setSectionsVisible] = useState(true);
  
  return (
    <div className={cn(
      "w-full",
      isMobile ? "max-w-[100vw]" : "" 
    )}>
      {/* Hero Section */}
      <section className={cn(
        "w-full", 
        isMobile ? "section-spacing pt-0" : ""
      )}>
        <Hero />
      </section>
      
      {/* How It Works Section */}
      <BeamsBackground id="how-it-works" className="w-full">
        <section 
          className={cn(
            "relative w-full",
            isMobile ? "mb-4 mt-2" : "" 
          )}
        >
          <div className="relative z-10">
            <Suspense fallback={<SectionLoader />}>
              <OptimizedHowItWorks />
            </Suspense>
          </div>
        </section>
      </BeamsBackground>
      
      {/* Search Section */}
      <section 
        id="find-creators" 
        className={cn(
          "relative w-full",
          isMobile ? "mb-4 mt-2" : ""
        )}
      >
        <div className={cn(
          "max-w-7xl mx-auto relative z-10",
          isMobile ? "py-4" : "py-10 sm:py-16 lg:py-20"
        )}>
          <Suspense fallback={<SectionLoader />}>
            <PreviewSearch />
          </Suspense>
        </div>
      </section>
      
      {/* Professional Content Creation Services */}
      <BackgroundEffects
        pattern="dots"
        blobOpacity={0.15}
        baseColor="bg-white/60"
        mobileFullWidth={true}
        className="w-full"
      >
        <section 
          id="features"
          className={cn(
            "w-full",
            isMobile ? "mb-4 mt-2" : "" 
          )}
        >
          <Suspense fallback={<SectionLoader />}>
            <FeaturesSectionWithHoverEffects />
          </Suspense>
        </section>
      </BackgroundEffects>

      {/* Pricing Section */}
      <section 
        id="pricing"
        className={cn(
          "w-full",
          isMobile ? "mb-4 mt-2" : "" 
        )}
      >
        <Suspense fallback={<SectionLoader />}>
          <Pricing />
        </Suspense>
      </section>

      {/* Final CTA Section */}
      <div 
        className={cn(
          "relative w-full",
          isMobile ? "pt-2 pb-8" : "" 
        )}
      >
        <div className={cn(
          "relative z-10 max-w-7xl mx-auto",
          isMobile ? "py-4" : "py-14 sm:py-20 lg:py-24"
        )}>
          <CallToActionSection />
        </div>
      </div>
    </div>
  );
};

export default LandingSections;
