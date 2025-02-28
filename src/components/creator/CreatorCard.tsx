
import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { MapPin, Star, Image, CheckCircle, Sparkle, ArrowRight } from 'lucide-react';
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
  
  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
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
    return "bg-[#F3F4F6] text-gray-600 hover:bg-gray-200 hover:text-gray-800 border border-gray-200";
  };

  const tags = creator.tags || getDefaultTags(creator.name, creator.services);

  const getImageSource = () => {
    if (creator.name === 'Emily Johnson') {
      return '/newemilyprofile.jpg';
    }
    if (creator.name === 'Jane Cooper') return '/janeprofile.png';
    if (creator.name === 'Michael Brown') return '/emily profile.jpeg';
    return creator.image;
  };
  
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
          <div className="absolute top-2 sm:top-3 right-2 sm:right-3 z-10">
            <span className={cn(
              "px-2 sm:px-2.5 py-1",
              "text-xs sm:text-sm font-medium",
              "bg-white/95 backdrop-blur-sm",
              "text-gray-900 rounded-full",
              "shadow-sm border border-white/30",
              "transition-all duration-200",
              "group-hover:shadow-md",
              "group-hover:bg-white"
            )}>
              From ${creator.price}
            </span>
          </div>

          <div className="relative aspect-[4/3]">
            <img 
              ref={imageRef}
              src={getImageSource()}
              alt={`${creator.name} - ${creator.services.join(", ")} specialist in ${creator.location}`}
              className={cn(
                "w-full h-full object-cover object-center transition-opacity duration-300",
                !loadedImages.has(creator.image) && "opacity-0"
              )}
              onLoad={handleImageLoad}
              onError={handleImageError}
              loading="lazy"
            />
            <div 
              className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none" 
              aria-hidden="true"
            />
            
            <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 text-white select-text">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <h3 className="font-semibold text-base sm:text-xl">{creator.name}</h3>
                <CheckCircle 
                  className={cn(
                    "w-4 h-4 sm:w-5 sm:h-5 text-blue-400",
                    "transition-all duration-300",
                    "group-hover:text-blue-300",
                    "group-hover:drop-shadow-[0_0_3px_rgba(59,130,246,0.5)]"
                  )}
                  aria-label="Verified Creator"
                />
              </div>
              <div className="flex items-center gap-1.5 mt-0.5 sm:mt-1">
                <MapPin 
                  className="w-3.5 h-3.5 text-white/90" 
                  aria-hidden="true"
                />
                <span className="text-xs sm:text-sm text-white/90">{creator.location}</span>
              </div>
              <p className="text-xs sm:text-sm text-white/90 mt-0.5 sm:mt-1">
                {creator.services.join(" • ")}
              </p>
            </div>
          </div>
          
          <div className="p-3 sm:p-4 flex flex-col h-[180px]">
            <div className="flex flex-col h-full">
              {/* Tags section - fixed height */}
              <div className="mb-3">
                <div 
                  className="overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
                  role="list"
                  aria-label="Creator specialties"
                >
                  <div className="flex flex-nowrap gap-1.5 sm:gap-2">
                    {tags.map((tag, index) => (
                      <span
                        key={index}
                        className={cn(
                          "text-[10px] sm:text-xs px-2 py-1 rounded-full transition-colors duration-200 whitespace-nowrap",
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
              
              {/* Rating section - consistent height */}
              <div className="mb-auto">
                <CreatorRating rating={creator.rating} reviews={creator.reviews} name={creator.name} />
              </div>
              
              {/* Button section - fixed at bottom with consistent height */}
              <div className="flex justify-center mt-3">
                <ShimmerButton 
                  onClick={() => setShowEmailDialog(true)}
                  aria-label={`Join waitlist to work with ${creator.name}`}
                  className="w-[70%] h-9 sm:h-10 text-xs sm:text-sm px-3 sm:px-4"
                >
                  <span>Join Waitlist</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1" aria-hidden="true" />
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
