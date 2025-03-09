
import React, { Suspense } from 'react';
import { Hero } from '../hero/Hero';
import CallToActionSection from '../CallToActionSection';
import { useIsMobile } from '@/hooks/use-mobile';
import { lazy } from 'react';
import { BackgroundEffects } from '@/components/features/BackgroundEffects';

// Lazy-loaded components
const OptimizedHowItWorks = lazy(() => import('../how-it-works/OptimizedHowItWorks'));
const FeaturesSectionWithHoverEffects = lazy(() => import('@/components/features/Features'));
const Pricing = lazy(() => import('@/components/Pricing'));
const PreviewSearch = lazy(() => import('@/components/preview-search'));

// Simple loading fallback
const SectionLoader = () => (
  <div className="w-full py-8 flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
  </div>
);

export const LandingSections: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="w-full">
        <Hero />
      </section>
      
      {/* How It Works Section */}
      <section id="how-it-works" className="w-full">
        <Suspense fallback={<SectionLoader />}>
          <OptimizedHowItWorks />
        </Suspense>
      </section>
      
      {/* Search Section - Simplified for mobile */}
      <section id="find-creators" className="w-full py-10">
        <div className="max-w-7xl mx-auto px-4">
          <Suspense fallback={<SectionLoader />}>
            <PreviewSearch />
          </Suspense>
        </div>
      </section>
      
      {/* Professional Content Creation Services */}
      <section id="features" className="w-full py-10">
        <div className="bg-white/60">
          <Suspense fallback={<SectionLoader />}>
            <FeaturesSectionWithHoverEffects />
          </Suspense>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="w-full py-10">
        <Suspense fallback={<SectionLoader />}>
          <Pricing />
        </Suspense>
      </section>

      {/* Final CTA Section */}
      <section className="w-full py-12">
        <div className="max-w-7xl mx-auto px-4">
          <CallToActionSection />
        </div>
      </section>
    </div>
  );
};

export default LandingSections;
