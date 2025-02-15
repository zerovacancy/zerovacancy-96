
import React from 'react';
import { Button } from './ui/button';

const CallToActionSection = () => {
  return (
    <section className="section-padding bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Elevate Your Real Estate Marketing Today
        </h2>
        <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
          Join thousands of property managers and content creators who trust Luxe Content Connect for their marketing needs
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-white text-primary hover:bg-white/90"
          >
            Find a Creator
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white/10"
          >
            Join as a Creator
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;
