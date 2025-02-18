
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
      <main className="flex-1 pb-20">
        <Hero />
        
        <div className="space-y-6 sm:space-y-8 lg:space-y-12">
          <div className="bg-gradient-to-b from-white via-gray-50 to-white py-10 sm:py-12 lg:py-14">
            <HowItWorksSection />
          </div>
          
          <div className="py-6 sm:py-8 lg:py-10">
            <PreviewSearch />
          </div>
          
          <div className="bg-gradient-to-b from-white via-[#FEF9F6] to-white py-8 sm:py-10 lg:py-12">
            <Testimonials />
          </div>
          
          <div className="pt-8 sm:pt-10 lg:pt-12">
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
