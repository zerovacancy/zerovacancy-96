import React, { useRef, useEffect, useState } from 'react';
import { SearchBar } from './search/SearchBar';
import { CreatorsList } from './search/CreatorsList';
import { BorderBeam } from './ui/border-beam';
import { GlowingEffect } from './ui/glowing-effect';
import { AnimatedGrid } from './ui/animated-grid';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { GradientBlobBackground } from '@/components/ui/gradient-blob-background';

const PreviewSearch = () => {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.target === containerRef.current) {
            setIsVisible(entry.isIntersecting);
            if (entry.isIntersecting) {
              entry.target.classList.add('content-visible');
            } else {
              entry.target.classList.remove('content-visible');
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: '150px' }
    );
    
    observer.observe(containerRef.current);
    
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  const handleImageLoad = (imagePath: string) => {
    setLoadedImages(prev => new Set([...prev, imagePath]));
  };

  const creatorData = [
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

  return (
    <div 
      className="w-full px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10 content-visibility-auto py-3 sm:py-6 md:py-8" 
      ref={containerRef}
    >
      <div className="mx-auto relative group max-w-7xl">
        {/* Enhanced gradient background with more subtle effects */}
        <div className={cn(
          "absolute -inset-0.5 sm:-inset-1 rounded-xl sm:rounded-2xl bg-gradient-to-r from-purple-800/25 via-indigo-700/30 to-purple-900/25 blur-[2px] sm:blur-sm transition-all duration-500",
          isVisible ? "opacity-70 sm:opacity-80" : "opacity-0",
          "group-hover:opacity-90 group-hover:blur-md"
        )}></div>

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
          className="relative rounded-lg sm:rounded-xl overflow-hidden shadow-lg sm:shadow-xl border border-zinc-200/70 bg-white/95 will-change-transform backdrop-blur-sm"
        >
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-lg sm:rounded-xl">
            <BorderBeam 
              colorFrom="#9370DB" 
              colorTo="#C19EF9" 
              duration={isMobile ? 25 : 18}
              borderWidth={isMobile ? 0.8 : 1.5}
            />
            <GlowingEffect 
              variant="default" 
              blur={isMobile ? 4 : 8} 
              glow={!isMobile} 
              inactiveZone={isMobile ? 0.65 : 0.55}
              spread={isMobile ? 10 : 18}
              borderWidth={isMobile ? 0.6 : 1.2}
              className={isMobile ? "opacity-20" : "opacity-30"}
            />
            <AnimatedGrid className={isMobile ? "opacity-4" : "opacity-8"} />
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
            blobOpacity={isMobile ? 0.2 : 0.3}
            withSpotlight={!isMobile}
            spotlightClassName="from-purple-500/15 via-indigo-500/15 to-blue-500/15"
          >
            <div className="flex flex-col w-full relative z-10 scroll-container-optimized">
              {/* Header section - More compact for mobile */}
              <div className={cn(
                "text-left pb-2 sm:pb-6 px-4 sm:px-8 lg:px-10",
                isMobile ? "pt-4" : "pt-6 sm:pt-9 md:pt-10"
              )}>
                <motion.h2 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className={cn(
                    "font-bold text-gray-900 mb-2 sm:mb-4 font-jakarta tracking-tight",
                    isMobile ? "text-xl" : "text-2xl sm:text-3xl md:text-4xl" // Smaller on mobile
                  )}
                >
                  Find Your Perfect Creator
                </motion.h2>
                
                {/* Animated underline - Smaller on mobile */}
                <motion.div 
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: isMobile ? "2.5rem" : "4rem", opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className={cn(
                    "bg-gradient-to-r from-violet-500 via-purple-500 to-blue-500 rounded-full",
                    isMobile ? "h-0.5 mb-1.5" : "h-1 sm:h-1.5 mb-2 sm:mb-3" // Thinner on mobile
                  )}
                ></motion.div>
                
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className={cn(
                    "text-gray-600 font-inter max-w-xl mt-1.5 sm:mt-2",
                    isMobile ? "text-xs" : "text-sm sm:text-base md:text-lg" // Smaller on mobile
                  )}
                >
                  Connect with professionals who showcase your property perfectly
                </motion.p>
              </div>
            
              {/* SearchBar - More compact container for mobile */}
              <div className={cn(
                "w-full px-3 sm:px-6 md:px-8 lg:px-10",
                isMobile ? "py-1.5" : "py-3 sm:py-4 md:py-6"
              )}>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <SearchBar onLocationSelect={() => {}} />
                </motion.div>
              </div>
              
              {/* Subtle separator - Hidden on mobile */}
              {!isMobile && (
                <div className="h-px w-full bg-gradient-to-r from-transparent via-purple-200/50 to-transparent mx-auto max-w-[90%]"></div>
              )}
            
              {/* CreatorsList - More compact padding for mobile */}
              <div className={cn(
                "w-full px-3 sm:px-6 md:px-8 lg:px-10",
                "bg-gradient-to-b from-transparent via-purple-50/20 to-purple-50/40",
                isMobile ? "pb-4 pt-2" : "pb-6 sm:pb-8 md:pb-10 pt-4 sm:pt-6 md:pt-8"
              )}>
                <AnimatePresence>
                  {isVisible && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.7, delay: 0.7 }}
                    >
                      <CreatorsList 
                        creators={creatorData} 
                        sortBy="rating" 
                        onSort={() => {}} 
                        onImageLoad={handleImageLoad} 
                        loadedImages={loadedImages}
                        imageRef={(el) => el}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </GradientBlobBackground>
        </motion.div>
      </div>
    </div>
  );
};

export default PreviewSearch;
