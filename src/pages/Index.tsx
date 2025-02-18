
import React from 'react';
import Header from '../components/Header';
import { Hero } from '../components/Hero';
import PreviewSearch from '../components/PreviewSearch';
import Testimonials from '../components/Testimonials';
import CallToActionSection from '../components/CallToActionSection';
import Footer from '../components/Footer';
import HowItWorksSection from '../components/HowItWorksSection';

const Index = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Hero />
        <div className="space-y-8 sm:space-y-10">
          <HowItWorksSection />
          <PreviewSearch />
          <Testimonials />
          <CallToActionSection />
        </div>
        <Footer />
      </main>
    </>
  );
};

export default Index;
