
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
    <div className={cn(
      "w-full",
      isMobile ? "space-y-4 max-w-[100vw] overflow-hidden" : "" // Better spacing between sections on mobile
    )}>
      {/* Hero Section - Always visible */}
      <section ref={addSectionRef(0)} className={cn(
        "w-full", 
        isMobile ? "section-spacing pt-0" : ""
      )}>
        <Hero />
      </section>
      
      {/* How It Works Section */}
      <BeamsBackground id="how-it-works" className="w-full overflow-hidden">
        <section 
          ref={addSectionRef(1)} 
          className={cn(
            "relative w-full",
            isMobile ? "mb-4 mt-2 max-w-[100vw] overflow-hidden" : "" // Better mobile spacing
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
        ref={addSectionRef(2)} 
        id="find-creators" 
        className={cn(
          "relative w-full",
          isMobile ? "mb-4 mt-2 max-w-[100vw] overflow-hidden" : "" // Better mobile spacing
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
        className="w-full overflow-hidden"
      >
        <section 
          ref={addSectionRef(3)}
          id="features"
          className={cn(
            "w-full",
            isMobile ? "mb-4 mt-2 max-w-[100vw] overflow-hidden" : "" // Better mobile spacing
          )}
        >
          <Suspense fallback={<SectionLoader />}>
            <FeaturesSectionWithHoverEffects />
          </Suspense>
        </section>
      </BackgroundEffects>

      {/* Pricing Section */}
      <section 
        ref={addSectionRef(4)}
        id="pricing"
        className={cn(
          "w-full",
          isMobile ? "mb-4 mt-2 max-w-[100vw] overflow-hidden" : "" // Better mobile spacing
        )}
      >
        <Suspense fallback={<SectionLoader />}>
          <Pricing />
        </Suspense>
      </section>

      {/* Final CTA Section */}
      <div 
        ref={addSectionRef(5)} 
        className={cn(
          "relative w-full",
          isMobile ? "pt-2 pb-8 max-w-[100vw] overflow-hidden" : "" // Adjust bottom spacing for mobile to avoid footer overlap
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
