import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { Hero } from '../components/Hero';
import PreviewSearch from '../components/PreviewSearch';
import CallToActionSection from '../components/CallToActionSection';
import Footer from '../components/Footer';
import HowItWorksSection from '../components/HowItWorksSection';
import { BottomNav } from '../components/navigation/BottomNav';
import { Banner } from '@/components/ui/banner';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import { GlowDialog } from '@/components/ui/glow-dialog';
import { Spotlight } from '@/components/ui/spotlight';
import { SparklesCore } from '@/components/ui/sparkles-core';
import { AnimatedShinyText } from '@/components/ui/animated-shiny-text';
import { FeaturesSectionWithHoverEffects } from '@/components/Features';
import Pricing from '@/components/Pricing';
const Index = () => {
  const [showBanner, setShowBanner] = useState(true);
  const [showGlowDialog, setShowGlowDialog] = useState(false);
  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited) {
      setShowGlowDialog(true);
      localStorage.setItem('hasVisited', 'true');
    }
  }, []);
  const handleTryNowClick = () => {
    setShowGlowDialog(true);
  };
  return <div className="flex flex-col min-h-screen">
      <Header />
      {showBanner && <div className="sticky top-16 z-40">
          <Banner variant="default" size="lg" className="animate-in fade-in slide-in-from-top duration-500 bg-black text-primary-foreground relative overflow-hidden min-h-[4rem]" icon={<Star className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary-foreground flex-shrink-0" />} action={<Button variant="secondary" size="sm" className="flex text-xs sm:text-sm items-center whitespace-nowrap px-2.5 py-1.5 sm:px-3 sm:py-2 ml-2 sm:ml-3 flex-shrink-0" onClick={handleTryNowClick}>
                Join Waitlist
              </Button>} layout="complex" isClosable onClose={() => setShowBanner(false)}>
            <div className="absolute inset-0 z-0">
              <SparklesCore background="transparent" particleColor="#ffffff" particleDensity={100} speed={2} className="w-full h-full" minSize={0.5} maxSize={1} />
            </div>
            <AnimatedShinyText className="text-xs sm:text-sm inline-block text-left text-white relative z-10 rounded px-2 py-1 ml-2" shimmerWidth={150}>
              Get priority access to our creator marketplace - Join the waitlist! ✨
            </AnimatedShinyText>
          </Banner>
        </div>}

      <main className="flex-1 pb-12 sm:pb-16">
        {/* Hero Section */}
        <div className="relative overflow-hidden pt-4 sm:pt-6">
          <Spotlight className="from-purple-500/20 via-violet-500/20 to-blue-500/20" size={400} />
          <Hero />
        </div>

        <div className="space-y-4 sm:space-y-6 lg:space-y-8">
          {/* Featured Creators Section */}
          <div className="relative py-6 sm:py-8 lg:py-10 overflow-hidden">
            <Spotlight className="from-emerald-500/20 via-teal-500/20 to-cyan-500/20" size={350} />
            <PreviewSearch />
          </div>

          {/* How It Works Section */}
          <div className="relative bg-gradient-to-b from-white via-gray-50 to-white py-6 sm:py-8 lg:py-10 overflow-hidden">
            <Spotlight className="from-blue-500/20 via-cyan-500/20 to-teal-500/20" size={350} />
            <HowItWorksSection />
          </div>

          {/* Professional Content Creation Services */}
          <div className="relative py-6 sm:py-8 overflow-hidden lg:py-0">
            <Spotlight className="from-emerald-500/20 via-teal-500/20 to-cyan-500/20" size={350} />
            <FeaturesSectionWithHoverEffects />
          </div>

          {/* Pricing Section */}
          <div className="relative py-6 sm:py-8 overflow-hidden lg:py-0">
            <Spotlight className="from-indigo-500/20 via-purple-500/20 to-pink-500/20" size={350} />
            <Pricing />
          </div>

          {/* Final CTA Section */}
          <div className="relative py-6 sm:py-8 lg:py-10 overflow-hidden">
            <Spotlight className="from-purple-500/20 via-pink-500/20 to-red-500/20" size={350} />
            <CallToActionSection />
          </div>
        </div>

        <Footer />
      </main>
      <BottomNav />
      <GlowDialog open={showGlowDialog} onOpenChange={setShowGlowDialog} />
    </div>;
};
export default Index;