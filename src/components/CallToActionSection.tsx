import React from 'react';
import { ShimmerButton } from './ui/shimmer-button';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

const CallToActionSection = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="w-full mx-auto max-w-4xl text-center relative z-10 px-4 sm:px-6 lg:px-8 py-14 sm:py-16 lg:py-20 will-change-transform">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-purple-50/40 to-white -z-10 opacity-80"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM5MzNFRkYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaDF2NGgtMXYtNHptMi0yaDF2MWgtMXYtMXptLTIgMGgxdjFoLTF2LTF6bS03LTJoMXYxaC0xdi0xem0tMi0yaDF2MWgtMXYtMXptMi0yaDF2MWgtMXYtMXptMiAxMGgxdjFoLTF2LTF6Ii8+PC9nPjwvZz48L3N2Zz4=')] -z-10 opacity-40"></div>
      
      <div className="flex items-center justify-center mb-4 sm:mb-6">
        <TrendingUp className="w-6 h-6 text-brand-purple mr-2 animate-float-subtle" />
        {isMobile ? (
          // Mobile-optimized headline as a single line with proper flow
          <h2 className="text-2xl font-bold text-gray-900 font-jakarta tracking-tight">
            Elevate Your Real Estate Marketing{' '}
            <span className="bg-gradient-to-r from-brand-purple-dark to-brand-purple bg-clip-text text-transparent font-extrabold">
              Today
            </span>
          </h2>
        ) : (
          // Desktop version remains unchanged
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 font-jakarta tracking-tight inline-flex items-center">
            Elevate Your Real Estate Marketing <span className="bg-gradient-to-r from-brand-purple-dark to-brand-purple ml-2 bg-clip-text text-transparent font-extrabold">Today</span>
          </h2>
        )}
      </div>
      
      {/* Decorative element under the heading */}
      <div className="w-20 h-1.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mx-auto mb-6 animate-pulse-subtle" />
      
      <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-gray-600 font-inter mb-7 sm:mb-9 leading-relaxed">
        Join thousands of property managers and content creators who trust Luxe Content Connect for their marketing needs
      </p>
      
      {/* Added increased spacing between paragraph and buttons on mobile */}
      <div className={cn(
        "flex flex-col sm:flex-row gap-5 justify-center items-center",
        isMobile ? "mt-10" : "mt-2" // Increased spacing on mobile
      )}>
        <ShimmerButton 
          variant="primary" 
          className={cn(
            "touch-manipulation transition-all duration-300 hover:scale-105 text-base font-semibold",
            isMobile ? "w-[90%] h-[56px]" : "w-full sm:w-auto min-w-[200px] h-[52px]" // Adjusted width and height for mobile
          )}
        >
          <span>Join Waitlist</span>
          <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-white/90" />
        </ShimmerButton>
        
        <ShimmerButton 
          variant="secondary" 
          className={cn(
            "touch-manipulation text-base font-semibold transition-all duration-300",
            "bg-gray-100/80 text-gray-800 border-gray-200 hover:bg-gray-200/70",
            isMobile ? "w-[85%] h-[52px] mt-2" : "w-full sm:w-auto min-w-[180px] h-[52px]" // Adjusted width for mobile and added margin-top
          )}
        >
          <span>Learn More</span>
        </ShimmerButton>
      </div>
      
      {/* Added extra bottom padding on mobile */}
      {isMobile && <div className="h-8"></div>}
    </div>
  );
};

export default CallToActionSection;
