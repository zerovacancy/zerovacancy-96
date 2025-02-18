
import React from 'react';
import Header from '../components/Header';
import { Hero } from '../components/Hero';
import PreviewSearch from '../components/PreviewSearch';
import Testimonials from '../components/Testimonials';
import CallToActionSection from '../components/CallToActionSection';
import Footer from '../components/Footer';
import HowItWorksSection from '../components/HowItWorksSection';
import { BottomNav } from '../components/navigation/BottomNav';

const Index = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen overflow-x-hidden pb-16 md:pb-0">
        <Hero />
        <div className="space-y-0">
          {/* HowItWorks with soft white/gray gradient */}
          <div className="bg-gradient-to-b from-white via-gray-50 to-white">
            <HowItWorksSection />
          </div>
          
          {/* Preview Search */}
          <PreviewSearch />
          
          {/* Testimonials with warm gradient */}
          <div className="bg-gradient-to-b from-white via-[#FEF9F6] to-white">
            <Testimonials />
          </div>
          
          {/* Call to Action with existing background */}
          <CallToActionSection />
        </div>
        <Footer />
      </main>
      <BottomNav />
    </>
  );
};

export default Index;

