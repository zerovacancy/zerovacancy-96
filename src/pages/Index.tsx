
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
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 overflow-x-hidden">
        {/* Hero Section - Full height minus header */}
        <Hero />
        
        {/* Content Sections with optimized spacing */}
        <div className="space-y-12 sm:space-y-16 lg:space-y-20">
          {/* HowItWorks with soft gradient */}
          <div className="bg-gradient-to-b from-white via-gray-50 to-white py-8 sm:py-12 lg:py-16">
            <HowItWorksSection />
          </div>
          
          {/* Preview Search with reduced padding */}
          <div className="py-8 sm:py-12 lg:py-16">
            <PreviewSearch />
          </div>
          
          {/* Testimonials with warm gradient and optimized spacing */}
          <div className="bg-gradient-to-b from-white via-[#FEF9F6] to-white py-8 sm:py-12 lg:py-16">
            <Testimonials />
          </div>
          
          {/* Call to Action with aurora background */}
          <div className="py-8 sm:py-12 lg:py-16">
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
