
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
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);
  const [visibleSections, setVisibleSections] = useState<{[key: number]: boolean}>({
    0: true, // Hero section is visible by default
    1: true, 
    2: true,
    3: true,
    4: true,
    5: true
  });
  
  // Optimized Intersection Observer with useCallback to avoid recreating functions
  const observerCallback = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      const index = parseInt(entry.target.getAttribute('data-section-index') || '-1', 10);
      if (index >= 0) {
        setVisibleSections(prev => ({
          ...prev,
          [index]: entry.isIntersecting || prev[index] // Keep sections visible once they've been seen
        }));
      }
    });
  }, []);
  
  // Use Intersection Observer to optimize rendering of sections with safety timeout
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      observerCallback,
      { threshold: 0.1, rootMargin: '200px' }
    );
    
    sectionsRef.current.forEach((section, index) => {
      if (!section) return;
      
      section.setAttribute('data-section-index', index.toString());
      observer.observe(section);
    });

    // Safety timeout to make all sections visible if they aren't already
    const safetyTimeout = setTimeout(() => {
      setVisibleSections({
        0: true,
        1: true,
        2: true,
        3: true,
        4: true,
        5: true
      });
    }, 1000);
    
    return () => {
      observer.disconnect();
      clearTimeout(safetyTimeout);
    };
  }, [observerCallback]);
  
  // Helper function to add section refs
  const addSectionRef = (index: number) => (el: HTMLElement | null) => {
    sectionsRef.current[index] = el;
  };
  
  return (
    <div className="w-full overflow-visible">
      {/* Hero Component */}
      <Hero />
      
      {/* How It Works Section */}
      <Suspense fallback={<SectionLoader />}>
        <OptimizedHowItWorks ref={addSectionRef(1)} />
      </Suspense>
      
      {/* Search Section - Directly using BeamsBackground instead of a section wrapper */}
      <BeamsBackground
        ref={addSectionRef(2)}
        id="find-creators"
        className={cn(
          "py-4 sm:py-10 lg:py-16",
          isMobile ? "mb-0 mt-0" : ""
        )}
        intensity="subtle"
      >
        <div className="max-w-7xl mx-auto relative z-10">
          <Suspense fallback={<SectionLoader />}>
            <PreviewSearch />
          </Suspense>
        </div>
      </BeamsBackground>
      
      {/* Professional Content Creation Services - No additional section wrapper */}
      <BackgroundEffects
        ref={addSectionRef(3)}
        id="features"
        pattern="dots"
        blobOpacity={0.15}
        baseColor="bg-white/60"
        mobileFullWidth={true}
        className="w-full"
      >
        <Suspense fallback={<SectionLoader />}>
          <FeaturesSectionWithHoverEffects />
        </Suspense>
      </BackgroundEffects>

      {/* Pricing Section - Using BeamsBackground directly */}
      <BeamsBackground
        ref={addSectionRef(4)}
        id="pricing"
        className={cn(
          "py-4 sm:py-10 lg:py-16",
          isMobile ? "mb-0 mt-0" : ""
        )}
        intensity="subtle"
      >
        <div className="max-w-7xl mx-auto relative z-10">
          <Suspense fallback={<SectionLoader />}>
            <Pricing />
          </Suspense>
        </div>
      </BeamsBackground>

      {/* Final CTA Section - No section wrapper */}
      <BackgroundEffects
        ref={addSectionRef(5)}
        pattern="none"
        blobOpacity={0.08}
        className={cn(
          "w-full",
          isMobile ? "pt-2 pb-4" : "py-14 sm:py-20"
        )}
      >
        <div className="max-w-7xl mx-auto relative z-10">
          <CallToActionSection />
        </div>
      </BackgroundEffects>
    </div>
  );
};

export default LandingSections;
