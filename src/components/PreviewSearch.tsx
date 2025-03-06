import React, { useRef, useEffect } from 'react';
import { SearchBar } from './search/SearchBar';
import { CreatorsList } from './search/CreatorsList';
import { BorderBeam } from './ui/border-beam';
import { GlowingEffect } from './ui/glowing-effect';
import { AnimatedGrid } from './ui/animated-grid';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { GradientBlobBackground } from '@/components/ui/gradient-blob-background';

// Sample creator card component optimized for mobile
const CreatorCard = ({ creator, isMobile }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Image section with overlay */}
      <div className="relative">
        <img 
          src={creator.image} 
          alt={creator.name}
          className="w-full h-48 object-cover"
        />
        
        {/* Price badge */}
        <div className="absolute top-4 right-4 bg-white text-black font-semibold px-3 py-1 rounded-full text-sm">
          $ From ${creator.price}
        </div>
        
        {/* Dark gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        
        {/* Creator name - OPTIMIZED SIZE FOR MOBILE */}
        <div className={cn(
          "absolute bottom-16 left-4 text-white font-bold",
          isMobile ? "text-xl" : "text-2xl" 
        )}>
          {creator.name}
        </div>
        
        {/* Location with proper spacing and size */}
        <div className={cn(
          "absolute bottom-10 left-4 flex items-center text-white",
          isMobile ? "text-xs" : "text-sm"
        )}>
          <svg className="w-3.5 h-3.5 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          {creator.location}
        </div>
        
        {/* Services/Skills - smaller on mobile */}
        <div className={cn(
          "absolute bottom-4 left-4 flex items-center text-white",
          isMobile ? "text-xs" : "text-sm"
        )}>
          <svg className="w-3.5 h-3.5 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4z" clipRule="evenodd" />
          </svg>
          {creator.services.join(' • ')}
        </div>
      </div>
      
      {/* Info section - showing only what's needed */}
      <div className="p-4">
        {/* Verification badge only - removed duplicate location/services since they're now in the overlay */}
        <div className="flex items-center">
          <h3 className="text-lg font-medium text-gray-700 mr-2">Verified Creator</h3>
          <svg className="w-5 h-5 text-indigo-500" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" fill="rgba(79, 70, 229, 0.2)" />
            <path d="M10 17l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor" />
          </svg>
        </div>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-3">
          <span className="bg-orange-100 text-orange-600 text-xs font-medium px-3 py-1 rounded-full">#POV</span>
          <span className="bg-orange-100 text-orange-600 text-xs font-medium px-3 py-1 rounded-full">#TikTok</span>
          <span className="bg-orange-100 text-orange-600 text-xs font-medium px-3 py-1 rounded-full">#Commercial</span>
        </div>
        
        {/* FIXED: Rating and price section */}
        <div className={cn(
          "flex items-center mt-3",
          isMobile ? "flex-col items-start space-y-1.5" : "justify-between"
        )}>
          {/* Rating */}
          <div className="flex items-center">
            <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="ml-1 font-bold text-gray-800">{creator.rating}</span>
            <span className="ml-1.5 text-indigo-500">({creator.reviews} reviews)</span>
          </div>
          
          {/* Starting price - now on its own line on mobile */}
          <div className="text-gray-600">
            <span className="flex items-center">
              <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              Starting at ${creator.price}/project
            </span>
          </div>
        </div>
        
        {/* Join waitlist button */}
        <button className="w-full mt-4 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium rounded-lg flex items-center justify-center">
          Join Waitlist
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </div>
  );
};

// Mock implementation of CreatorsList that uses our optimized CreatorCard
const OptimizedCreatorsList = ({ creators, sortBy, isMobile }) => {
  return (
    <div className="w-full">
      {/* Sorting controls */}
      <div className={cn(
        "flex items-center justify-between mb-3", 
        isMobile ? "text-sm" : ""
      )}>
        <div className="font-medium text-gray-700">
          {creators.length} creators available
        </div>
        <div className="flex items-center">
          <span className="mr-2 text-gray-600">Sort by:</span>
          <select className="border-none bg-transparent font-medium text-gray-900 focus:outline-none">
            <option>Top Rated</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>
      </div>
      
      {/* Creator cards */}
      <div className="grid grid-cols-1 gap-4">
        {creators.map((creator, index) => (
          <CreatorCard key={index} creator={creator} isMobile={isMobile} />
        ))}
      </div>
    </div>
  );
};

const PreviewSearch = () => {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Sample creator data
  const creators = [
    {
      name: "Emily Johnson",
      services: ["Photography", "Virtual Staging"],
      price: 150,
      rating: 4.9,
      reviews: 127,
      location: "New York, NY",
      image: "/newemilyprofile.jpg",
      workExamples: ["/1-d2e3f802.jpg"]
    },
    {
      name: "Jane Cooper",
      services: ["Video Tours", "Drone Footage"],
      price: 200,
      rating: 4.8,
      reviews: 98,
      location: "Los Angeles, CA",
      image: "/janeprofile.png",
      workExamples: ["/janesub.jpg", "/janesub2.png", "/janesub3.webp"]
    },
    {
      name: "Michael Brown",
      services: ["3D Tours", "Floor Plans"],
      price: 175,
      rating: 4.7,
      reviews: 82,
      location: "Chicago, IL",
      image: "/emily profile.jpeg",
      workExamples: ["/1-d2e3f802.jpg"]
    }
  ];
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.target === containerRef.current) {
            if (entry.isIntersecting) {
              entry.target.classList.add('content-visible');
            } else {
              entry.target.classList.remove('content-visible');
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: '100px' }
    );
    
    observer.observe(containerRef.current);
    
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div className="w-full px-3 sm:px-3 md:px-6 lg:px-8 content-visibility-auto" ref={containerRef}>
      <div className="mx-auto relative group">
        {/* Simplified gradient background for mobile */}
        <div className={cn(
          "absolute -inset-0.5 sm:-inset-0.5 rounded-lg sm:rounded-xl bg-gradient-to-r",
          isMobile 
            ? "from-purple-800/20 to-indigo-700/20 opacity-50 blur-[1px]" 
            : "from-purple-800/30 via-indigo-700/30 to-purple-900/30 opacity-60 sm:opacity-75 blur-[2px] sm:blur-sm group-hover:opacity-100"
        )}></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ 
            opacity: 1, 
            y: 0,
            transition: {
              duration: isMobile ? 0.5 : 0.7,  // Faster animation on mobile
              ease: [0.22, 1, 0.36, 1]
            }
          }}
          viewport={{ once: true, margin: "-50px" }}
          className={cn(
            "relative rounded-lg sm:rounded-xl overflow-hidden border bg-white/95 will-change-transform",
            isMobile 
              ? "shadow-md border-zinc-200/80" 
              : "shadow-[0_8px_25px_-10px_rgba(120,80,200,0.3)] sm:shadow-[0_15px_45px_-12px_rgba(120,80,200,0.35)] border-zinc-200/70"
          )}
        >
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-lg sm:rounded-xl">
            {/* Conditional rendering of heavy effects for mobile */}
            {!isMobile && (
              <BorderBeam 
                colorFrom="#9370DB" 
                colorTo="#C19EF9" 
                duration={20}
                borderWidth={1.5}
              />
            )}
            
            {/* Simplified glowing effect for mobile */}
            <GlowingEffect 
              variant="default" 
              blur={isMobile ? 2 : 8} 
              glow={!isMobile} 
              inactiveZone={isMobile ? 0.8 : 0.6}
              spread={isMobile ? 5 : 15}
              borderWidth={isMobile ? 0.5 : 1}
              className={isMobile ? "opacity-10" : "opacity-25"}
            />
            
            {/* Conditionally render AnimatedGrid based on device */}
            {!isMobile && <AnimatedGrid className="opacity-7" />}
          </div>
          
          <GradientBlobBackground 
            className="min-h-0 w-full" 
            baseColor="bg-white/95"
            pattern="none"
            blobColors={{
              first: "bg-purple-200",
              second: "bg-indigo-200",
              third: "bg-blue-200"
            }}
            blobOpacity={isMobile ? 0.15 : 0.25}
            withSpotlight={!isMobile}
            spotlightClassName="from-purple-500/15 via-indigo-500/15 to-blue-500/15"
          >
            <div className="flex flex-col w-full relative z-10 scroll-container-optimized">
              {/* Header section with optimized mobile spacing */}
              <div className={cn(
                "text-left px-4 sm:px-6 lg:px-8",
                isMobile ? "pt-5 pb-3" : "pt-4 sm:pt-9 pb-1 sm:pb-6"
              )}>
                <h2 className={cn(
                  "font-bold text-gray-900 font-jakarta tracking-tight",
                  isMobile ? "text-2xl mb-2" : "text-xl sm:text-3xl md:text-4xl mb-1.5 sm:mb-4"
                )}>
                  Find Your Perfect Creator
                </h2>
                
                {/* Better spacing around the underline */}
                <div className="w-12 sm:w-16 h-1 bg-gradient-to-r from-violet-500 via-purple-500 to-blue-500 rounded-full mb-2 sm:mb-3"></div>
                
                <p className={cn(
                  "text-gray-600 font-inter max-w-xl",
                  isMobile ? "text-sm leading-snug" : "text-sm sm:text-base md:text-lg mt-1"
                )}>
                  Connect with professionals who showcase your property perfectly
                </p>
              </div>
            
              {/* SearchBar with mobile-optimized spacing */}
              <div className={cn(
                "w-full px-3 sm:px-4 md:px-7",
                isMobile ? "py-2" : "py-1 sm:py-4 md:py-6"
              )}>
                <SearchBar onLocationSelect={() => {}} />
              </div>
            
              {/* CreatorsList with mobile optimizations */}
              <div className={cn(
                "w-full px-3 sm:px-4 md:px-7 bg-gradient-to-b from-transparent",
                isMobile 
                  ? "to-purple-50/20 py-3 pb-5" 
                  : "to-purple-50/30 sm:to-purple-50/40 py-1 sm:py-5 md:py-7 pb-6 sm:pb-7"
              )}>
                {/* Use our optimized creators list instead of the original component */}
                <OptimizedCreatorsList 
                  creators={creators}
                  sortBy="rating"
                  isMobile={isMobile}
                />
              </div>
            </div>
          </GradientBlobBackground>
        </motion.div>
      </div>
    </div>
  );
};

export default PreviewSearch;
