
import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import PreviewSearch from '../components/PreviewSearch';
import FeaturedCreators from '../components/FeaturedCreators';
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
        <PreviewSearch />
        <FeaturedCreators />
        <HowItWorks />
        <Testimonials />
        <CallToActionSection />
        <Footer />
      </main>
    </>
  );
};

export default Index;
