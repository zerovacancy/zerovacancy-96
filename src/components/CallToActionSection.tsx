
import React from 'react';
import { ShimmerButton } from './ui/shimmer-button';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

const CallToActionSection = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className={cn(
      "w-full mx-auto max-w-4xl text-center relative z-10",
      isMobile ? "px-3 py-8" : "px-4 sm:px-6 lg:px-8 py-14 sm:py-16 lg:py-20",
      "will-change-transform"
    )}>
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-purple-50/40 to-white -z-10 opacity-80"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM5MzNFRkYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaDF2NGgtMXYtNHptMi0yaDF2MWgtMXYtMXptLTIgMGgxdjFoLTF2LTF6bS03LTJoMXYxaC0xdi0xem0tMi0yaDF2MWgtMXYtMXptMi0yaDF2MWgtMXYtMXptMiAxMGgxdjFoLTF2LTF6Ii8+PC9nPjwvZz48L3N2Zz4=')] -z-10 opacity-40"></div>
      
      <div className="flex items-center justify-center mb-4 sm:mb-6">
        <TrendingUp className={cn(
          "text-brand-purple mr-2 animate-float-subtle",
          isMobile ? "w-5 h-5" : "w-6 h-6"
        )} />
        
        {isMobile ? (
          <h2 className={cn(
            "text-xl font-bold text-gray-900 font-jakarta tracking-tight",
            "leading-tight"
          )}>
            Elevate Your Real Estate Marketing <span className="bg-gradient-to-r from-brand-purple-dark to-brand-purple bg-clip-text text-transparent font-extrabold">Today</span>
          </h2>
        ) : (
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 font-jakarta tracking-tight inline-flex items-center">
            Elevate Your Real Estate Marketing <span className="bg-gradient-to-r from-brand-purple-dark to-brand-purple ml-2 bg-clip-text text-transparent font-extrabold">Today</span>
          </h2>
        )}
      </div>
      
      {/* Decorative element under the heading */}
      <div className="w-20 h-1.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mx-auto mb-6 animate-pulse-subtle" />
      
      <p className={cn(
        "max-w-2xl mx-auto text-gray-600 font-inter mb-8 sm:mb-9 leading-relaxed",
        isMobile ? "text-sm px-1" : "text-sm sm:text-base md:text-lg"
      )}>
        Join thousands of property managers and content creators who trust Luxe Content Connect for their marketing needs
      </p>
      
      <div className={cn(
        "flex gap-6 sm:gap-5 justify-center items-center mt-2",
        isMobile ? "flex-col" : "flex-col sm:flex-row"
      )}>
        <ShimmerButton 
          variant="primary" 
          className={cn(
            "gradient-button",
            "w-full sm:w-auto touch-manipulation transition-all duration-300 hover:scale-105 font-semibold",
            isMobile ? "text-sm h-[48px] min-w-[180px]" : "min-w-[200px] h-[52px] text-base"
          )}
        >
          <span>Join Waitlist</span>
          <ArrowRight className={cn(
            "text-white/90",
            isMobile ? "w-4 h-4" : "w-5 h-5 sm:w-6 sm:h-6"
          )} />
        </ShimmerButton>
        
        <ShimmerButton 
          variant="secondary" 
          className={cn(
            "w-full sm:w-auto bg-gray-50 text-gray-800 border border-gray-200 hover:bg-gray-100 transition-all duration-300 font-semibold",
            isMobile ? "text-sm h-[48px] min-w-[160px]" : "min-w-[180px] h-[52px] text-base"
          )}
        >
          <span>Learn More</span>
        </ShimmerButton>
      </div>
      
      {/* Added extra bottom padding on mobile */}
      <div className={`${isMobile ? 'h-8' : 'h-0'}`}></div>
    </div>
  );
};

export default CallToActionSection;
