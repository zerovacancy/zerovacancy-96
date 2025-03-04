
import React from 'react';
import { SearchBar } from './search/SearchBar';
import { CreatorsList } from './search/CreatorsList';
import { AuroraBackground } from './ui/aurora-background';
import { BorderBeam } from './ui/border-beam';
import { GlowingEffect } from './ui/glowing-effect';
import { AnimatedGrid } from './ui/animated-grid';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { CreatorSpecialties } from './search/CreatorSpecialties';

const PreviewSearch = () => {
  const isMobile = useIsMobile();

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <div className="mx-auto relative group">
        <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-purple-800/40 via-indigo-700/40 to-purple-900/40 opacity-75 blur-sm group-hover:opacity-100 transition duration-500"></div>
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
          className="relative rounded-xl overflow-hidden shadow-[0_10px_40px_-12px_rgba(120,80,200,0.25)] border border-zinc-200/60 bg-white"
        >
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-xl">
            <BorderBeam 
              colorFrom="#9370DB" 
              colorTo="#C19EF9" 
              duration={20}
              borderWidth={1.5}
            />
            <GlowingEffect 
              variant="default" 
              blur={8} 
              glow={true} 
              inactiveZone={0.6}
              spread={15}
              borderWidth={1}
              className="opacity-20"
            />
            <AnimatedGrid className="opacity-5" />
          </div>
          <AuroraBackground 
            className="min-h-0 w-full" 
            showRadialGradient={false}
          >
            <div className="flex flex-col w-full relative z-10">
              {/* Title and subtitle moved to inside the component */}
              <div className="text-center pt-6 pb-2 px-4">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2 sm:mb-3 text-gray-900">
                  Find Your Perfect Creator
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto mb-4 sm:mb-6 text-sm sm:text-base">
                  Connect with skilled professionals who can showcase your property in its best light
                </p>
              </div>
              
              {/* Creator specialties with iconography - now using the separate component */}
              <div className="w-full pt-2 pb-2 px-4">
                <CreatorSpecialties />
              </div>
              
              {/* Search bar section */}
              <div className="w-full px-4 py-4 sm:px-6 sm:py-5">
                <SearchBar onLocationSelect={() => {}} />
              </div>
            
              {/* Creators list section */}
              <div className="w-full px-4 py-5 sm:px-6 sm:py-6 bg-gradient-to-b from-transparent to-purple-50/30">
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
          </AuroraBackground>
        </motion.div>
      </div>
    </div>
  );
};

export default PreviewSearch;
