import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { MapPin, Star, Image, BadgeCheck, ArrowRight } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { CreatorRating } from './CreatorRating';
import { GlowDialog } from '../ui/glow-dialog';
import { ShimmerButton } from '../ui/shimmer-button';
import { BorderBeam } from '../ui/border-beam';

interface Creator {
  name: string;
  services: string[];
  price: number;
  rating: number;
  reviews: number;
  location: string;
  image: string;
  workExamples: string[];
  tags?: string[];
}

interface CreatorCardProps {
  creator: Creator;
  onImageLoad?: (imageSrc: string) => void;
  loadedImages: Set<string>;
  imageRef: (node: HTMLImageElement | null) => void;
}

export const CreatorCard: React.FC<CreatorCardProps> = ({ 
  creator, 
  onImageLoad, 
  loadedImages, 
  imageRef 
}) => {
  const isMobile = useIsMobile();
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  
  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    setIsImageLoaded(true);
    if (onImageLoad) {
      onImageLoad(creator.image);
    }
  };

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
    if (onImageLoad) {
      onImageLoad(creator.image);
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const getDefaultTags = (name: string, services: string[]) => {
    if (name === 'John Smith' && services.includes('Photography')) {
      return ['#RealEstate', '#Aerial', '#IndoorDroneTour'];
    }
    if (name === 'Jane Cooper') {
      return ['#Interior', '#Design', '#Staging'];
    }
    if (name === 'Emily Johnson') {
      return ['#POV', '#TikTok', '#ComeTourWithMe'];
    }
    if (name === 'Michael Brown') {
      return ['#3DTours', '#FloorPlans', '#Interactive'];
    }
    return ['#Professional', '#Creative', '#Expert'];
  };

  const getTagStyle = (tag: string) => {
    if (['#RealEstate', '#Aerial', '#IndoorDroneTour'].includes(tag)) {
      return "bg-[#E5DEFF] text-[#4F46E5] hover:bg-[#D6BCFA] hover:text-[#3730A3] border border-[#4F46E5]/10";
    }
    if (['#Interior', '#Design', '#Staging'].includes(tag)) {
      return "bg-[#F2FCE2] text-[#3B823E] hover:bg-[#DCF5DC] hover:text-[#2E6A31] border border-[#3B823E]/10";
    }
    if (['#POV', '#TikTok', '#ComeTourWithMe'].includes(tag)) {
      return "bg-[#FDE1D3] text-[#C4704F] hover:bg-[#FECDA7] hover:text-[#9D5B3F] border border-[#C4704F]/10";
    }
    if (['#3DTours', '#FloorPlans', '#Interactive'].includes(tag)) {
      return "bg-[#E0F2FE] text-[#0369A1] hover:bg-[#BAE6FD] hover:text-[#0284C7] border border-[#0EA5E9]/10";
    }
    return "bg-[#F3F4F6] text-gray-600 hover:bg-gray-200 hover:text-gray-800 border border-gray-200";
  };

  const tags = creator.tags || getDefaultTags(creator.name, creator.services);

  // Determine if we should use a video, image, or fallback for each creator
  const getMedia = () => {
    if (creator.name === 'Emily Johnson') {
      return { type: 'image', src: '/newemilyprofile.jpg' };
    }
    if (creator.name === 'Jane Cooper') {
      return { type: 'image', src: '/janeprofile.png' };
    }
    if (creator.name === 'Michael Brown') {
      // Provide fallback image in case video fails
      if (imageError) {
        return { type: 'image', src: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952' };
      }
      return { type: 'video', src: '/michaelprofile.mov' };
    }
    return { type: 'image', src: creator.image };
  };

  const media = getMedia();
  
  return (
    <article className="group select-text">
      <Card className={cn(
        "overflow-hidden h-full",
        "will-change-transform transition-all duration-300",
        "hover:translate-y-[-2px] hover:scale-[1.01]",
        "bg-white border border-gray-200/80",
        "shadow-[0_2px_8px_rgba(0,0,0,0.05)]",
        "hover:shadow-[0_8px_16px_rgba(0,0,0,0.08)]",
        "rounded-xl relative"
      )}>
        {/* Animated border around the entire card */}
        <BorderBeam 
          colorFrom="#9c40ff" 
          colorTo="#3182CE" 
          duration={20} 
          borderWidth={1.2} 
          size={500}
          className="rounded-xl"
        />
        
        <div className="relative">
          {/* Price tag - Modified to always have filled background */}
          <div className="absolute top-2.5 sm:top-3.5 right-2.5 sm:right-3.5 z-10">
            <span className={cn(
              "px-2.5 sm:px-3 py-1.5",
              "text-xs sm:text-sm font-medium",
              "bg-white shadow-sm border border-white/40",
              "text-gray-900 rounded-full",
              "transition-all duration-200",
              "group-hover:scale-105"
            )}>
              From ${creator.price}
            </span>
          </div>

          <div className="relative aspect-[4/3]">
            {media.type === 'image' ? (
              <img 
                src={media.src}
                alt={`${creator.name} - ${creator.services.join(", ")} specialist in ${creator.location}`}
                className="w-full h-full object-cover object-center"
                onLoad={handleImageLoad}
                onError={handleImageError}
                loading="lazy"
              />
            ) : (
              <>
                {/* Video element with fallback in case it fails to load */}
                <video
                  src={media.src}
                  className="w-full h-full object-cover object-center"
                  onError={() => setImageError(true)}
                  onLoadedData={handleVideoLoad}
                  autoPlay
                  muted
                  loop
                  playsInline
                />
                {/* Fallback image that shows while video is loading */}
                {!isVideoLoaded && (
                  <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
                )}
              </>
            )}
            <div 
              className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none" 
              aria-hidden="true"
            />
            
            {/* Improved name, location and services section */}
            <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 text-white select-text">
              <div className="flex items-center gap-2 sm:gap-2.5">
                <h3 className="font-semibold text-lg sm:text-xl">{creator.name}</h3>
                {/* Updated verification badge using BadgeCheck with solid background */}
                <span 
                  className="flex items-center justify-center rounded-full bg-[#4F46E5] p-0.5 sm:p-1"
                  aria-label="Verified Creator"
                >
                  <BadgeCheck 
                    className={cn(
                      "w-4 h-4 sm:w-4 sm:h-4 text-white",
                      "transition-all duration-300",
                      "group-hover:animate-[pulse_1.5s_ease-in-out_infinite]"
                    )}
                  />
                </span>
              </div>
              
              {/* Enhanced location display */}
              <div className="flex items-center gap-1.5 mt-1.5 sm:mt-2">
                <MapPin 
                  className="w-4 h-4 text-white/95 flex-shrink-0" 
                  aria-hidden="true"
                />
                <span className="text-xs sm:text-sm text-white/95">{creator.location}</span>
              </div>
              
              {/* Enhanced services display */}
              <div className="flex items-center gap-1.5 mt-1 sm:mt-1.5">
                <Image
                  className="w-3.5 h-3.5 text-white/90 flex-shrink-0"
                  aria-hidden="true"
                />
                <p className="text-xs sm:text-sm text-white/90">
                  {creator.services.join(" • ")}
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-3.5 sm:p-4.5 flex flex-col h-[180px]">
            <div className="flex flex-col h-full">
              {/* Enhanced tags section with hover effects */}
              <div className="mb-3.5">
                <div 
                  className="overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
                  role="list"
                  aria-label="Creator specialties"
                >
                  <div className="flex flex-nowrap gap-2 sm:gap-2.5">
                    {tags.map((tag, index) => (
                      <span
                        key={index}
                        className={cn(
                          "text-[10px] sm:text-xs px-2.5 py-1.5 rounded-full",
                          "transition-all duration-200 whitespace-nowrap",
                          "hover:scale-105 cursor-pointer",
                          getTagStyle(tag)
                        )}
                        role="listitem"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Enhanced rating section with separator */}
              <div className="mb-auto border-b border-gray-100 pb-3">
                <CreatorRating rating={creator.rating} reviews={creator.reviews} name={creator.name} />
              </div>
              
              {/* Enhanced CTA button section */}
              <div className="flex justify-center mt-4">
                <ShimmerButton 
                  onClick={() => setShowEmailDialog(true)}
                  aria-label={`Join waitlist to work with ${creator.name}`}
                  className="w-[80%] h-10 sm:h-11 text-xs sm:text-sm px-3 sm:px-4 hover:scale-[1.03] active:scale-[0.98] transition-transform duration-200"
                >
                  <span>Join Waitlist</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" aria-hidden="true" />
                </ShimmerButton>
              </div>
            </div>
          </div>
        </div>
      </Card>
      <GlowDialog open={showEmailDialog} onOpenChange={setShowEmailDialog} />
    </article>
  );
};
