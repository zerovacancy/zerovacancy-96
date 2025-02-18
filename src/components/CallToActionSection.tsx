
import React from 'react';
import { ShimmerButton } from './ui/shimmer-button';

const CallToActionSection = () => {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 text-primary-foreground">
      <div className="absolute inset-0 -z-10 h-full w-full bg-primary 
        [background-image:linear-gradient(to_right,rgba(176,108,234,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(176,108,234,0.2)_1px,transparent_1px)]
        [background-size:6rem_4rem]
        [mask-image:radial-gradient(ellipse_at_center,white,transparent)]
        before:absolute before:inset-0
        before:bg-[radial-gradient(circle_at_center,#4F46E5,transparent)]
        before:opacity-40
        after:absolute after:h-full after:w-full
        after:[background:linear-gradient(to_right,#4F46E5,#EC4899)]
        after:opacity-20 after:animate-aurora">
      </div>
      <div className="mx-auto max-w-7xl text-center relative z-10">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-primary-foreground">
          Elevate Your Real Estate Marketing Today
        </h2>
        <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8 text-sm sm:text-base lg:text-lg">
          Join thousands of property managers and content creators who trust Luxe Content Connect for their marketing needs
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
          <ShimmerButton
            className="h-12 w-full sm:w-auto text-base font-medium text-primary px-6 py-3"
            background="white"
            shimmerColor="rgba(0,0,0,0.1)"
            shimmerSize="0.1em"
            shimmerDuration="2s"
          >
            Find a Creator
          </ShimmerButton>
          <ShimmerButton
            className="h-12 w-full sm:w-auto text-base font-medium text-white px-6 py-3"
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
