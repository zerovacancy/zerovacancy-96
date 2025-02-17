
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
        <HowItWorksSection />
        <div className="space-y-10">
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
