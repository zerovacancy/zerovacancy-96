import React from 'react';
import CallToAction from './CallToAction';
const HeroSection = () => {
  return <div className="mx-auto max-w-7xl section-padding px-0 rounded-none bg-gray-300 hover:bg-gray-200 py-[41px] my-0">
        <div className="text-center">
          <h1 className="fade-up text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            <span className="block">Premium Content for</span>
            <span className="block mt-2">Real Estate Excellence</span>
          </h1>
          <p className="fade-up mt-6 text-lg leading-8 text-muted-foreground">
            Connect with top-tier creators for photography, videography, and marketing content
            that elevates your property portfolio.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row items-center justify-center">
            <CallToAction type="primary" text="I Need Content" href="/property-manager" />
            <CallToAction type="primary" text="I Create Content" href="/creator" />
            <CallToAction type="secondary" text="Search Creators" href="/search" />
          </div>
        </div>
      </div>;
};
export default HeroSection;