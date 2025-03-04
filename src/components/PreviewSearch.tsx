
import React, { useState } from 'react';
import { SearchBar } from './search/SearchBar';
import { CreatorsList } from './search/CreatorsList';
import { AuroraBackground } from './ui/aurora-background';
import { Camera, Video, Tv2, Share2, Grid3x3, Map, Filter, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

const specialtyIcons = [
  { name: 'Photography', icon: <Camera className="h-6 w-6 text-indigo-500/80" /> },
  { name: '3D Tours', icon: <Grid3x3 className="h-6 w-6 text-violet-500/80" /> },
  { name: 'Video Tours', icon: <Video className="h-6 w-6 text-blue-500/80" /> },
  { name: 'Aerial Footage', icon: <Share2 className="h-6 w-6 text-amber-500/80" /> },
  { name: 'Social Media', icon: <Share2 className="h-6 w-6 text-pink-500/80" /> },
];

const PreviewSearch = () => {
  const [activeFilterIndex, setActiveFilterIndex] = useState(0);
  const [showMapView, setShowMapView] = useState(false);
  const isMobile = useIsMobile();
  
  // Animation variants for staggered children
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };
  
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 relative overflow-visible z-10">
      <div className="mx-auto">
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
          className={cn(
            "rounded-xl overflow-hidden",
            "shadow-[0_8px_30px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.06)]",
            "border border-gray-100 bg-white",
            "transform-gpu",
            "relative"
          )}
        >
          {/* Light animated gradient background with subtle wave effect */}
          <div className="absolute inset-0 overflow-hidden opacity-80">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50">
              <div 
                className="absolute inset-0 opacity-70"
                style={{
                  backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10zm10 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm40 40c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
                }}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-50/30 via-purple-50/30 to-blue-50/30 animate-[pulse_15s_ease-in-out_infinite]" />
          </div>

          <div className="w-full relative z-10">
            {/* Title and subtitle - renamed to "Find Your Perfect Creator" */}
            <div className="text-center pt-10 pb-6 sm:pt-12 sm:pb-8 w-full px-4">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-3 sm:mb-4 bg-gradient-to-r from-indigo-700 via-purple-700 to-indigo-700 bg-clip-text text-transparent">
                Find Your Perfect Creator
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Find the perfect professional for your property content needs
              </p>
            </div>
            
            {/* View toggle - Map/List (desktop only) */}
            <div className="hidden md:flex justify-end px-8 mb-2">
              <div className="bg-gray-100 rounded-lg p-1 flex items-center">
                <button 
                  onClick={() => setShowMapView(false)}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                    !showMapView ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
                  )}
                >
                  <Filter className="w-3.5 h-3.5" />
                  <span>List View</span>
                </button>
                <button 
                  onClick={() => setShowMapView(true)}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                    showMapView ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
                  )}
                >
                  <Map className="w-3.5 h-3.5" />
                  <span>Map View</span>
                </button>
              </div>
            </div>
            
            {/* Specialty icons row */}
            <motion.div 
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="flex justify-center gap-6 sm:gap-12 pb-6 px-4 flex-wrap"
            >
              {specialtyIcons.map((specialty, index) => (
                <motion.div
                  key={specialty.name}
                  variants={item}
                  className="flex flex-col items-center gap-2 group cursor-pointer"
                  onClick={() => setActiveFilterIndex(index)}
                >
                  <div className={cn(
                    "p-3 rounded-full bg-white shadow-sm border border-gray-100",
                    "group-hover:shadow-md group-hover:border-indigo-100 transition-all duration-300",
                    "group-hover:scale-110",
                    index === activeFilterIndex ? "ring-2 ring-indigo-200 border-indigo-300" : ""
                  )}>
                    {specialty.icon}
                  </div>
                  <span className={cn(
                    "text-xs font-medium",
                    index === activeFilterIndex ? "text-gray-900" : "text-gray-600 group-hover:text-gray-900"
                  )}>{specialty.name}</span>
                </motion.div>
              ))}
            </motion.div>
            
            {/* Search bar - part of the unified section */}
            <div className="w-full px-4 py-4 sm:px-8 sm:py-6 border-t border-gray-100 bg-white/70 backdrop-blur-sm">
              <SearchBar onLocationSelect={() => {}} />
            </div>
          
            {/* Creators list - part of the unified section */}
            <div className="w-full px-4 py-6 sm:px-8 sm:py-8 bg-white">
              <div className="hidden sm:flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-700">20+ professionals available</span>
                  <div className="h-4 w-[1px] bg-gray-300"></div>
                  <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full flex items-center gap-1">
                    <Shield className="w-3 h-3" /> Verified
                  </span>
                </div>
                <div className="text-sm text-gray-700">
                  <span className="font-medium">Pro Tip:</span> Compare multiple creators to find your perfect match
                </div>
              </div>
              <CreatorsList 
                creators={[
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
                ]}
                sortBy="rating"
                onSort={() => {}}
                onImageLoad={() => {}}
                loadedImages={new Set()}
                imageRef={() => {}}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PreviewSearch;
