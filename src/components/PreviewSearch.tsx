
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

const PreviewSearch = () => {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  
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
    <div className="w-full px-1 sm:px-3 md:px-6 lg:px-8 content-visibility-auto" ref={containerRef}>
      <div className="mx-auto relative group">
        {/* Refined gradient background with adjusted opacity and blur */}
        <div className="absolute -inset-0.5 sm:-inset-0.5 rounded-lg sm:rounded-xl bg-gradient-to-r from-purple-800/30 via-indigo-700/30 to-purple-900/30 opacity-60 sm:opacity-75 blur-[2px] sm:blur-sm group-hover:opacity-100 transition duration-500"></div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ 
            opacity: 1, 
            y: 0,
            transition: {
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1]
            }
          }}
          viewport={{ once: true, margin: "-50px" }}
          className="relative rounded-lg sm:rounded-xl overflow-hidden shadow-[0_8px_25px_-10px_rgba(120,80,200,0.3)] sm:shadow-[0_15px_45px_-12px_rgba(120,80,200,0.35)] border border-zinc-200/70 bg-white/95 will-change-transform"
        >
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-lg sm:rounded-xl">
            <BorderBeam 
              colorFrom="#9370DB" 
              colorTo="#C19EF9" 
              duration={isMobile ? 30 : 20}
              borderWidth={isMobile ? 0.5 : 1.5}
            />
            <GlowingEffect 
              variant="default" 
              blur={isMobile ? 3 : 8} 
              glow={!isMobile} 
              inactiveZone={isMobile ? 0.7 : 0.6}
              spread={isMobile ? 8 : 15}
              borderWidth={isMobile ? 0.5 : 1}
              className={isMobile ? "opacity-15" : "opacity-25"}
            />
            <AnimatedGrid className={isMobile ? "opacity-3" : "opacity-7"} />
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
            blobOpacity={0.25}
            withSpotlight={!isMobile}
            spotlightClassName="from-purple-500/15 via-indigo-500/15 to-blue-500/15"
          >
            <div className="flex flex-col w-full relative z-10 scroll-container-optimized">
              {/* Header section with improved spacing for mobile */}
              <div className={cn(
                "text-left pb-1 sm:pb-6 px-4 sm:px-6 lg:px-8",
                isMobile ? "pt-4" : "pt-4 sm:pt-9"
              )}>
                <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-1.5 sm:mb-4 font-jakarta tracking-tight">
                  Find Your Perfect Creator
                </h2>
                {/* Better spacing around the underline */}
                <div className="w-16 h-1 bg-gradient-to-r from-violet-500 via-purple-500 to-blue-500 mb-1.5 sm:mb-3 rounded-full"></div>
                <p className="text-sm sm:text-base md:text-lg text-gray-600 font-inter max-w-xl mt-1">
                  Connect with professionals who showcase your property perfectly
                </p>
              </div>
            
              {/* SearchBar with improved spacing */}
              <div className={cn(
                "w-full px-3 sm:px-4 md:px-7",
                isMobile ? "py-1" : "py-1 sm:py-4 md:py-6" // Reduced padding for mobile
              )}>
                <SearchBar onLocationSelect={() => {}} />
              </div>
            
              {/* Completely removed separator on mobile */}
            
              {/* CreatorsList with reduced spacing between filters and results */}
              <div className={cn(
                "w-full px-3 sm:px-4 md:px-7 pb-6 sm:pb-7 bg-gradient-to-b from-transparent to-purple-50/30 sm:to-purple-50/40",
                isMobile ? "-mt-2" : "py-1 sm:py-5 md:py-7" // Added negative margin for mobile
              )}>
                <CreatorsList 
                  creators={[{
                    name: "Emily Johnson",
                    services: ["Photography", "Virtual Staging"],
                    price: 150,
                    rating: 4.9,
                    reviews: 127,
                    location: "New York, NY",
                    image: "/newemilyprofile.jpg",
                    workExamples: ["/1-d2e3f802.jpg"]
                  }, {
                    name: "Jane Cooper",
                    services: ["Video Tours", "Drone Footage"],
                    price: 200,
                    rating: 4.8,
                    reviews: 98,
                    location: "Los Angeles, CA",
                    image: "/janeprofile.png",
                    workExamples: ["/janesub.jpg", "/janesub2.png", "/janesub3.webp"]
                  }, {
                    name: "Michael Brown",
                    services: ["3D Tours", "Floor Plans"],
                    price: 175,
                    rating: 4.7,
                    reviews: 82,
                    location: "Chicago, IL",
                    image: "/emily profile.jpeg",
                    workExamples: ["/1-d2e3f802.jpg"]
                  }]} 
                  sortBy="rating" 
                  onSort={() => {}} 
                  onImageLoad={() => {}} 
                  loadedImages={new Set()}
                  imageRef={() => {}}
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
