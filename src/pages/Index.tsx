
import React, { useState } from 'react';
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

const Index = () => {
  const [showBanner, setShowBanner] = useState(true);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {showBanner && (
        <Banner
          variant="default"
          className="animate-in fade-in slide-in-from-top duration-500 bg-primary text-primary-foreground"
          icon={<Star className="h-4 w-4 text-primary-foreground" />}
          action={
            <Button variant="secondary" size="sm" className="hidden sm:flex">
              Join Waitlist
            </Button>
          }
          isClosable
          onClose={() => setShowBanner(false)}
        >
          <p className="text-sm">
            <span className="font-medium">New:</span> We've launched our creator marketplace! 🎉
          </p>
        </Banner>
      )}
      <main className="flex-1 pb-16 sm:pb-20">
        <Hero />
        
        <div className="space-y-4 sm:space-y-6 lg:space-y-8">
          <div className="bg-gradient-to-b from-white via-gray-50 to-white py-8 sm:py-10 lg:py-12">
            <HowItWorksSection />
          </div>
          
          <div className="py-4 sm:py-6 lg:py-8">
            <PreviewSearch />
          </div>
          
          <div className="bg-gradient-to-b from-white via-[#FEF9F6] to-white py-6 sm:py-8 lg:py-10">
            <Testimonials />
          </div>
          
          <div className="pt-6 sm:pt-8 lg:pt-10">
            <CallToActionSection />
          </div>
        </div>

        <Footer />
      </main>
      <BottomNav />
    </div>
  );
};

export default Index;
