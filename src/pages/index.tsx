
import React, { useState, useEffect, useRef, lazy, Suspense, useCallback } from 'react';
import Header from '../components/Header';
import { Hero } from '../components/hero/Hero';
import CallToActionSection from '../components/CallToActionSection';
import Footer from '../components/Footer';
import { BottomNav } from '../components/navigation/BottomNav';
import { Banner } from '@/components/ui/banner';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import { GlowDialog } from '@/components/ui/glow-dialog';
import { AnimatedShinyText } from '@/components/ui/animated-shiny-text';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { BackgroundEffects } from '@/components/features/BackgroundEffects';

// Lazy-loaded components
const OptimizedHowItWorks = lazy(() => import('../components/how-it-works/OptimizedHowItWorks'));
const FeaturesSectionWithHoverEffects = lazy(() => import('@/components/features/Features'));
const Pricing = lazy(() => import('@/components/Pricing'));
const PreviewSearch = lazy(() => import('@/components/preview-search'));

// Simple loading fallback
const SectionLoader = () => (
  <div className="w-full py-16 flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

/**
 * Main landing page component with performance optimizations
 */
const Index = () => {
  const [showBanner, setShowBanner] = useState(true);
  const [showGlowDialog, setShowGlowDialog] = useState(false);
  const isMobile = useIsMobile();
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);
  const [visibleSections, setVisibleSections] = useState<{[key: number]: boolean}>({});
  
  // Initialize local storage and dialog state
  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited');
    setShowGlowDialog(!hasVisited);
    if (!hasVisited) {
      localStorage.setItem('hasVisited', 'true');
    }
  }, []);
  
  // Optimized Intersection Observer with useCallback to avoid recreating functions
  const observerCallback = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      const index = parseInt(entry.target.getAttribute('data-section-index') || '-1', 10);
      if (index >= 0) {
        setVisibleSections(prev => ({
          ...prev,
          [index]: entry.isIntersecting
        }));
      }
    });
  }, []);
  
  // Use Intersection Observer to optimize rendering of sections
  useEffect(() => {
    const observer = new IntersectionObserver(
      observerCallback,
      { threshold: 0.1, rootMargin: '200px' }
    );
    
    sectionsRef.current.forEach((section, index) => {
      if (!section) return;
      
      section.setAttribute('data-section-index', index.toString());
      observer.observe(section);
    });
    
    return () => {
      observer.disconnect();
    };
  }, [observerCallback]);
  
  const handleTryNowClick = () => {
    setShowGlowDialog(true);
  };
  
  // Helper function to add section refs
  const addSectionRef = (index: number) => (el: HTMLElement | null) => {
    sectionsRef.current[index] = el;
  };
  
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Header />
      {showBanner && !isMobile && (
        <div className="relative">
          <Banner variant="purple" size="lg" action={
              <Button 
                variant="secondary" 
                size="sm" 
                className={cn(
                  "flex text-xs sm:text-sm items-center whitespace-nowrap", 
                  "px-3 py-2 sm:px-5 sm:py-2.5 min-w-[8rem] sm:min-w-[9rem] min-h-[2.25rem] sm:min-h-[2.5rem]", 
                  "bg-amber-400 hover:bg-amber-300 text-gray-900 font-bold", 
                  "border-2 border-amber-300", 
                  "transition-all duration-200", 
                  "touch-manipulation", 
                  "shadow-[0_2px_10px_rgba(0,0,0,0.15)]"
                )} 
                onClick={handleTryNowClick}
              >
                Get Early Access
              </Button>
            } 
            layout="complex" 
            isClosable 
            onClose={() => setShowBanner(false)} 
            className="animate-in fade-in slide-in-from-top duration-500 relative overflow-hidden min-h-[3.25rem] sm:min-h-[3.5rem] my-0 py-0"
          >
            <div className="flex items-center justify-left gap-3 sm:gap-4 relative z-10">
              <Star className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-300 animate-pulse" />
              <AnimatedShinyText 
                className={cn(
                  "text-sm sm:text-base font-bold inline-block", 
                  "text-white relative z-10 rounded", 
                  "px-1 tracking-wide"
                )} 
                shimmerWidth={200}
              >
                Join the AI-powered revolution in property management!
              </AnimatedShinyText>
            </div>
          </Banner>
        </div>
      )}

      <main className="flex-1 pb-16 sm:pb-0 w-full">
        <BackgroundEffects 
          blobColors={{
            first: "bg-purple-100",
            second: "bg-indigo-100",
            third: "bg-violet-100"
          }}
          blobOpacity={0.15}
          withSpotlight={true}
          spotlightClassName="from-purple-500/5 via-violet-500/5 to-blue-500/5"
          baseColor="bg-white/80" 
          pattern="none"
          className="py-0"
          animationSpeed="slow"
        >
          <div className="space-y-0 w-full">
            {/* Hero Section */}
            <section ref={addSectionRef(0)} className={cn("w-full", visibleSections[0] ? "content-visible" : "content-hidden")}>
              <Hero />
            </section>
            
            {/* How It Works Section */}
            <section 
              ref={addSectionRef(1)} 
              id="how-it-works" 
              className={cn("relative w-full", visibleSections[1] ? "content-visible" : "content-hidden")}
            >
              <div className="relative z-10">
                <Suspense fallback={<SectionLoader />}>
                  {visibleSections[1] && <OptimizedHowItWorks />}
                </Suspense>
              </div>
            </section>
            
            {/* Search Section */}
            <section 
              ref={addSectionRef(2)} 
              id="find-creators" 
              className={cn("relative w-full", visibleSections[2] ? "content-visible" : "content-hidden")}
            >
              <div className="max-w-7xl mx-auto relative z-10 py-10 sm:py-16 lg:py-20">
                <Suspense fallback={<SectionLoader />}>
                  {visibleSections[2] && <PreviewSearch />}
                </Suspense>
              </div>
            </section>
            
            {/* Professional Content Creation Services */}
            <section 
              ref={addSectionRef(3)} 
              className={cn("w-full", visibleSections[3] ? "content-visible" : "content-hidden")}
            >
              <Suspense fallback={<SectionLoader />}>
                {visibleSections[3] && <FeaturesSectionWithHoverEffects />}
              </Suspense>
            </section>

            {/* Pricing Section */}
            <section 
              ref={addSectionRef(4)} 
              className={cn("w-full", visibleSections[4] ? "content-visible" : "content-hidden")}
            >
              <Suspense fallback={<SectionLoader />}>
                {visibleSections[4] && <Pricing />}
              </Suspense>
            </section>

            {/* Final CTA Section */}
            <div 
              ref={addSectionRef(5)} 
              className={cn("relative w-full", visibleSections[5] ? "content-visible" : "content-hidden")}
            >
              <div className="relative z-10 max-w-7xl mx-auto py-14 sm:py-20 lg:py-24">
                <CallToActionSection />
              </div>
            </div>
          </div>
          
          <Footer />
        </BackgroundEffects>
      </main>
      <BottomNav />
      <GlowDialog open={showGlowDialog} onOpenChange={setShowGlowDialog} />
    </div>
  );
};

export default Index;
