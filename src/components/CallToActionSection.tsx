
import React from 'react';
import { Button } from './ui/button';

const CallToActionSection = () => {
  return (
    <section className="section-padding bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl text-center px-4 sm:px-6">
        <h2 className="section-title text-primary-foreground">
          Elevate Your Real Estate Marketing Today
        </h2>
        <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8 text-base sm:text-lg">
          Join thousands of property managers and content creators who trust Luxe Content Connect for their marketing needs
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-white text-primary hover:bg-white/90 h-12 sm:h-auto w-full sm:w-auto"
            style={{ '--speed': '1.5s' } as React.CSSProperties}
          >
            Find a Creator
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white/10 h-12 sm:h-auto w-full sm:w-auto"
            style={{ '--speed': '1.5s' } as React.CSSProperties}
          >
            Join as a Creator
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;
