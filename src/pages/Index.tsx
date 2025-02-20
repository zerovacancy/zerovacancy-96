
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
import { motion } from 'framer-motion';

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

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {showBanner && (
        <div className="sticky top-[4.5rem] z-40">
          <Banner 
            variant="default"
            size="lg"
            className="animate-in fade-in slide-in-from-top duration-500"
            icon={
              <div className="flex items-center gap-2">
                <Star className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white flex-shrink-0" />
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.3,
                    duration: 0.8,
                    ease: "easeInOut",
                  }}
                  className="text-xs sm:text-sm text-white"
                >
                  Get priority access to our creator marketplace - Join the waitlist! ✨
                </motion.span>
              </div>
            }
            action={
              <Button
                variant="secondary"
                size="sm"
                className="flex text-xs sm:text-sm items-center whitespace-nowrap px-2.5 py-1.5 sm:px-3 sm:py-2 ml-2 sm:ml-3"
                onClick={handleTryNowClick}
              >
                Join Waitlist
              </Button>
            }
            layout="complex"
            isClosable
            onClose={() => setShowBanner(false)}
          />
        </div>
      )}
      <main className="flex-1 pb-16 sm:pb-20">
        <div className="relative overflow-hidden">
          <Spotlight className="from-purple-500/20 via-violet-500/20 to-blue-500/20" size={400} />
          <Hero />
        </div>
        
        <div className="space-y-4 sm:space-y-6 lg:space-y-8">
          <div className="relative bg-gradient-to-b from-white via-gray-50 to-white py-8 sm:py-10 lg:py-12 overflow-hidden">
            <Spotlight className="from-blue-500/20 via-cyan-500/20 to-teal-500/20" size={350} />
            <HowItWorksSection />
          </div>
          
          <div className="relative py-4 sm:py-6 lg:py-8 overflow-hidden">
            <Spotlight className="from-emerald-500/20 via-teal-500/20 to-cyan-500/20" size={350} />
            <PreviewSearch />
          </div>
          
          <div className="relative pt-6 sm:pt-8 lg:pt-10 overflow-hidden">
            <Spotlight className="from-purple-500/20 via-pink-500/20 to-red-500/20" size={350} />
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
