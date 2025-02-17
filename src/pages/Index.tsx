
import React from 'react';
import Header from '../components/Header';
import { Hero } from '../components/Hero';
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
        <Hero />
        <div className="space-y-10">
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
