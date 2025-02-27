
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
import { Star, Sparkle } from 'lucide-react';
import { GlowDialog } from '@/components/ui/glow-dialog';
import { Spotlight } from '@/components/ui/spotlight';
import { AnimatedShinyText } from '@/components/ui/animated-shiny-text';
import { FeaturesSectionWithHoverEffects } from '@/components/Features';
import Pricing from '@/components/Pricing';
import { AuroraBackground } from '@/components/ui/aurora-background';

const Index = () => {
  const [showBanner, setShowBanner] = useState(true);
  const [showGlowDialog, setShowGlowDialog] = useState(false);
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
  return <div className="flex flex-col min-h-screen">
      <Header />
      {showBanner && <div className="sticky top-16 z-40">
          <Banner variant="purple" size="lg" action={<Button variant="secondary" size="sm" className="
                  flex text-xs sm:text-sm items-center 
                  whitespace-nowrap px-3 py-2 sm:px-5 sm:py-2.5
                  bg-amber-400 hover:bg-amber-300 text-gray-900 font-bold
                  border-2 border-amber-300
                  transition-all duration-200
                  min-h-[2.25rem] sm:min-h-[2.5rem]
                  min-w-[8rem] sm:min-w-[9rem]
                  touch-manipulation
                  shadow-[0_2px_10px_rgba(0,0,0,0.15)]
                " onClick={handleTryNowClick}>
                Get Early Access
              </Button>} layout="complex" isClosable onClose={() => setShowBanner(false)} className="animate-in fade-in slide-in-from-top duration-500 relative overflow-hidden min-h-[3.25rem] sm:min-h-[3.5rem] my-0 py-0">
            <div className="flex items-center justify-center gap-3 sm:gap-4 relative z-10">
              <Star className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-300 animate-pulse" />
              <AnimatedShinyText className="
                  text-sm sm:text-base font-bold inline-block
                  text-white relative z-10 rounded
                  px-1 tracking-wide
                " shimmerWidth={200}>
                Join the AI-powered revolution in property management!
              </AnimatedShinyText>
            </div>
          </Banner>
        </div>}

      <main className="flex-1 pb-16 sm:pb-0">
        <div className="relative overflow-hidden">
          <Spotlight className="from-purple-500/20 via-violet-500/20 to-blue-500/20" size={400} />
          <Hero />
        </div>

        <div className="space-y-3 sm:space-y-6 lg:space-y-8">
          {/* How It Works Section - Moved up to be right after Hero */}
          <div id="how-it-works" className="relative bg-gradient-to-b from-white via-gray-50 to-white py-4 sm:py-8 overflow-hidden lg:py-0">
            <Spotlight className="from-blue-500/20 via-cyan-500/20 to-teal-500/20" size={350} />
            <HowItWorksSection />
          </div>
          
          {/* Featured Creators Section */}
          <div className="bg-white py-4 sm:py-8 lg:py-10">
            <AuroraBackground className="min-h-0 py-8 rounded-xl" showRadialGradient={false}>
              <div id="search" className="relative overflow-hidden w-full">
                <PreviewSearch />
              </div>
            </AuroraBackground>
          </div>

          {/* Professional Content Creation Services */}
          <div className="relative py-4 sm:py-8 overflow-hidden lg:py-0">
            <Spotlight className="from-emerald-500/20 via-teal-500/20 to-cyan-500/20" size={350} />
            <FeaturesSectionWithHoverEffects />
          </div>

          {/* Pricing Section */}
          <div id="pricing" className="relative py-4 sm:py-8 overflow-hidden lg:py-0">
            <Spotlight className="from-indigo-500/20 via-purple-500/20 to-pink-500/20" size={350} />
            <Pricing />
          </div>

          {/* Final CTA Section */}
          <div className="relative py-4 sm:py-8 lg:py-10 overflow-hidden">
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
