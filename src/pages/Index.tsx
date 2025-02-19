
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { Hero } from '../components/Hero';
import PreviewSearch from '../components/PreviewSearch';
import Testimonials from '../components/Testimonials';
import CallToActionSection from '../components/CallToActionSection';
import Footer from '../components/Footer';
import HowItWorksSection from '../components/HowItWorksSection';
import { BottomNav } from '../components/navigation/BottomNav';
import { Banner } from '@/components/ui/banner';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import { GlowDialog } from '@/components/ui/glow-dialog';
import { Spotlight } from '@/components/ui/spotlight';

const Index = () => {
  const [showBanner, setShowBanner] = useState(true);
  const [showGlowDialog, setShowGlowDialog] = useState(false);

  useEffect(() => {
    // Show dialog on first visit
    const hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited) {
      setShowGlowDialog(true);
      localStorage.setItem('hasVisited', 'true');
    }
  }, []);

  const handleTryNowClick = () => {
    setShowGlowDialog(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {showBanner && (
        <Banner
          variant="default"
          size="lg"
          className="animate-in fade-in slide-in-from-top duration-500 bg-primary text-primary-foreground"
          icon={<Star className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary-foreground flex-shrink-0" />}
          action={
            <Button
              variant="secondary"
              size="sm"
              className="flex text-xs sm:text-sm items-center whitespace-nowrap px-2.5 py-1.5 sm:px-3 sm:py-2 ml-2 sm:ml-3 flex-shrink-0"
              onClick={handleTryNowClick}
            >
              Join Waitlist
            </Button>
          }
          layout="complex"
          isClosable
          onClose={() => setShowBanner(false)}
        >
          <p className="text-xs sm:text-sm pr-2 text-left">
            <span className="font-medium">New:</span> We've launched our creator marketplace! 🎉
          </p>
        </Banner>
      )}
      <main className="flex-1 pb-16 sm:pb-20">
        <div className="relative">
          <Spotlight className="from-purple-500 via-violet-500 to-blue-500" />
          <Hero />
        </div>
        
        <div className="space-y-4 sm:space-y-6 lg:space-y-8">
          <div className="relative bg-gradient-to-b from-white via-gray-50 to-white py-8 sm:py-10 lg:py-12">
            <Spotlight className="from-blue-500 via-cyan-500 to-teal-500" />
            <HowItWorksSection />
          </div>
          
          <div className="relative py-4 sm:py-6 lg:py-8">
            <Spotlight className="from-emerald-500 via-teal-500 to-cyan-500" />
            <PreviewSearch />
          </div>
          
          <div className="relative bg-gradient-to-b from-white via-[#FEF9F6] to-white py-6 sm:py-8 lg:py-10">
            <Spotlight className="from-orange-500 via-amber-500 to-yellow-500" />
            <Testimonials />
          </div>
          
          <div className="relative pt-6 sm:pt-8 lg:pt-10">
            <Spotlight className="from-purple-500 via-pink-500 to-red-500" />
            <CallToActionSection />
          </div>
        </div>

        <Footer />
      </main>
      <BottomNav />
      <GlowDialog open={showGlowDialog} onOpenChange={setShowGlowDialog} />
    </div>
  );
};

export default Index;
