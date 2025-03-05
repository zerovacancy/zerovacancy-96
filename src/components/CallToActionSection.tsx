import React from 'react';
import { ShimmerButton } from './ui/shimmer-button';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
const CallToActionSection = () => {
  return <div className="mx-auto max-w-4xl text-center relative z-10 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 font-jakarta tracking-tight">
        Elevate Your Real Estate Marketing Today
      </h2>
      <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-gray-600 font-inter">
        Join thousands of property managers and content creators who trust Luxe Content Connect for their marketing needs
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <ShimmerButton variant="primary" className="w-full sm:w-auto min-w-[180px]">
          <span>Join Waitlist</span>
          <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-white/90" />
        </ShimmerButton>
        <ShimmerButton variant="tertiary" className="w-full sm:w-auto min-w-[160px]">
          <span>Learn More</span>
        </ShimmerButton>
      </div>
    </div>;
};
export default CallToActionSection;