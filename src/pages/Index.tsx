
import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import PreviewSearch from '../components/PreviewSearch';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';
import CallToActionSection from '../components/CallToActionSection';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <HeroSection />
        <div className="space-y-16 md:space-y-24">
          <PreviewSearch />
          <HowItWorks />
          <Testimonials />
          <CallToActionSection />
        </div>
        <Footer />
      </main>
    </>
  );
};

export default Index;
