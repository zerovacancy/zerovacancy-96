
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
        <div className="space-y-6 sm:space-y-8 lg:space-y-10 py-0 my-0">
          <HowItWorksSection />
          <PreviewSearch />
          <Testimonials />
          <CallToActionSection />
        </div>
        <Footer />
      </main>
      <BottomNav />
    </>
  );
};

export default Index;
