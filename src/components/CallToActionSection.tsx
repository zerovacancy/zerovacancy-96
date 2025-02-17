
import React from 'react';
import { ShimmerButton } from './ui/shimmer-button';

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
          <ShimmerButton
            className="h-12 sm:h-auto w-full sm:w-auto text-base font-medium text-primary"
            background="white"
            shimmerColor="rgba(0,0,0,0.1)"
            shimmerSize="0.1em"
            shimmerDuration="2s"
          >
            Find a Creator
          </ShimmerButton>
          <ShimmerButton
            className="h-12 sm:h-auto w-full sm:w-auto text-base font-medium text-white"
            background="transparent"
            shimmerColor="rgba(255,255,255,0.1)"
            shimmerSize="0.1em"
            shimmerDuration="2s"
          >
            Join as a Creator
          </ShimmerButton>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;
