
import React, { useState, useEffect, useRef } from 'react';
import { SearchBar } from './search/SearchBar';
import { CreatorsList } from './search/CreatorsList';
import { AuroraBackground } from './ui/aurora-background';
import { BorderBeam } from './ui/border-beam';
import { GlowingEffect } from './ui/glowing-effect';
import { Camera, Compass, Video, Laptop, Grid3x3, Share2, Mic, MapPin, Maximize2, List } from 'lucide-react';
import { AnimatedGrid } from './ui/animated-grid';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

// Create a component for displaying creator specialties with iconography
const CreatorSpecialties = () => {
  const specialties = [
    { icon: <Camera className="h-5 w-5" />, label: "Photography" },
    { icon: <Grid3x3 className="h-5 w-5" />, label: "3D Tours" },
    { icon: <Share2 className="h-5 w-5" />, label: "Drone Footage" },
    { icon: <Video className="h-5 w-5" />, label: "Video Tours" },
    { icon: <Laptop className="h-5 w-5" />, label: "Virtual Staging" },
    { icon: <Compass className="h-5 w-5" />, label: "Floor Plans" },
  ];
  
  const isMobile = useIsMobile();
  const [visibleSpecialties, setVisibleSpecialties] = useState(specialties);
  
  useEffect(() => {
    if (isMobile) {
      // On mobile, only show 4 specialties initially
      setVisibleSpecialties(specialties.slice(0, 4));
    } else {
      setVisibleSpecialties(specialties);
    }
  }, [isMobile]);
  
  return (
    <div className="w-full flex flex-wrap justify-center gap-3 sm:gap-4 py-2 sm:py-4 px-2 relative">
      {visibleSpecialties.map((specialty, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.3 }}
          whileTap={{ scale: 0.95 }}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 bg-white/80 backdrop-blur-sm rounded-full shadow-sm",
            "border border-purple-100 text-xs sm:text-sm text-gray-700 font-medium",
            "hover:bg-purple-50/90 hover:border-purple-200 transition-all duration-200",
            "touch-manipulation"
          )}
        >
          <span className="text-purple-500">{specialty.icon}</span>
          <span>{specialty.label}</span>
        </motion.div>
      ))}
      
      {/* See more/less button for mobile */}
      {isMobile && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xs text-purple-600 underline underline-offset-2 mt-1"
          onClick={() => {
            if (visibleSpecialties.length === specialties.length) {
              setVisibleSpecialties(specialties.slice(0, 4));
            } else {
              setVisibleSpecialties(specialties);
            }
          }}
        >
          {visibleSpecialties.length === specialties.length ? 'Show less' : 'Show more'}
        </motion.button>
      )}
    </div>
  );
};

// New component for voice search capability
const VoiceSearchButton = ({ onActivate }) => {
  const [isRecording, setIsRecording] = useState(false);

  const handleVoiceSearch = () => {
    setIsRecording(!isRecording);
    onActivate(!isRecording);
  };

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={handleVoiceSearch}
      className={cn(
        "rounded-full p-3",
        "flex items-center justify-center",
        "shadow-md",
        isRecording 
          ? "bg-red-500 text-white animate-pulse" 
          : "bg-white text-purple-600 border border-purple-100"
      )}
      aria-label={isRecording ? "Stop voice search" : "Start voice search"}
    >
      <Mic className="h-5 w-5" />
    </motion.button>
  );
};

// New component for location detection
const LocationDetectButton = ({ onDetect }) => {
  const [isDetecting, setIsDetecting] = useState(false);

  const handleLocationDetect = () => {
    setIsDetecting(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, we would use a reverse geocoding service
          // to convert coordinates to a city/address
          onDetect("Your current location");
          setIsDetecting(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setIsDetecting(false);
        },
        { timeout: 10000 }
      );
    } else {
      console.error("Geolocation not supported");
      setIsDetecting(false);
    }
  };

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={handleLocationDetect}
      className={cn(
        "rounded-full p-3",
        "flex items-center justify-center",
        "shadow-md",
        "bg-white text-purple-600 border border-purple-100",
        isDetecting && "animate-pulse"
      )}
      aria-label="Detect current location"
      disabled={isDetecting}
    >
      <MapPin className="h-5 w-5" />
    </motion.button>
  );
};

// New component for view toggle (Card/List)
const ViewToggle = ({ view, onToggle }) => {
  return (
    <div className="flex rounded-lg overflow-hidden border border-gray-200 bg-white">
      <button
        onClick={() => onToggle('card')}
        className={cn(
          "p-2 flex items-center justify-center",
          view === 'card' ? "bg-purple-100 text-purple-700" : "bg-white text-gray-600"
        )}
        aria-label="Card view"
        aria-pressed={view === 'card'}
      >
        <Maximize2 className="h-4 w-4" />
      </button>
      <button
        onClick={() => onToggle('list')}
        className={cn(
          "p-2 flex items-center justify-center",
          view === 'list' ? "bg-purple-100 text-purple-700" : "bg-white text-gray-600"
        )}
        aria-label="List view"
        aria-pressed={view === 'list'}
      >
        <List className="h-4 w-4" />
      </button>
    </div>
  );
};

const PreviewSearch = () => {
  const isMobile = useIsMobile();
  const [viewMode, setViewMode] = useState('card');
  const [location, setLocation] = useState('');
  const [isVoiceSearchActive, setIsVoiceSearchActive] = useState(false);
  const [isHeaderSticky, setIsHeaderSticky] = useState(false);
  const headerRef = useRef(null);

  // Sticky header on scroll
  useEffect(() => {
    if (!isMobile || !headerRef.current) return;

    const handleScroll = () => {
      const position = headerRef.current.getBoundingClientRect();
      setIsHeaderSticky(position.top <= 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

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
              {/* Sticky header for mobile */}
              <div 
                ref={headerRef}
                className={cn(
                  "transition-all duration-300 bg-white z-20",
                  isMobile && isHeaderSticky ? "sticky top-0 shadow-md" : ""
                )}
              >
                {/* Title and subtitle */}
                <div className="text-center pt-6 pb-2 px-4">
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2 sm:mb-3 text-gray-900">
                    Find Your Perfect Creator
                  </h2>
                  <p className="text-gray-600 max-w-2xl mx-auto mb-4 sm:mb-6 text-sm sm:text-base">
                    Connect with skilled professionals who can showcase your property in its best light
                  </p>
                </div>
              </div>
              
              {/* Creator specialties with iconography */}
              <div className="w-full pt-2 pb-2 px-4">
                <CreatorSpecialties />
              </div>
              
              {/* Mobile search header with voice and location */}
              {isMobile && (
                <div className="flex items-center justify-between px-4 mb-4">
                  <VoiceSearchButton 
                    onActivate={setIsVoiceSearchActive} 
                  />
                  <LocationDetectButton 
                    onDetect={setLocation}
                  />
                  <ViewToggle 
                    view={viewMode} 
                    onToggle={setViewMode} 
                  />
                </div>
              )}
              
              {/* Search bar section */}
              <div className="w-full px-4 py-4 sm:px-6 sm:py-5">
                <SearchBar 
                  onLocationSelect={setLocation}
                  value={location}
                  showMobileOptions={isMobile}
                  isVoiceActive={isVoiceSearchActive}
                />
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
                  viewMode={viewMode}
                  isMobile={isMobile}
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
