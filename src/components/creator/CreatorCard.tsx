
import React, { useState } from 'react';
import { Card } from '../ui/card';
import { ArrowRight, DollarSign } from 'lucide-react';
import { Dialog } from "../ui/dialog";
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { CreatorRating } from './CreatorRating';
import { GlowDialog } from '../ui/glow-dialog';
import { ShimmerButton } from '../ui/shimmer-button';
import { BorderBeam } from '../ui/border-beam';
import { CreatorInfo } from './CreatorInfo';
import { CreatorMedia } from './CreatorMedia';
import { CreatorTags, getDefaultTags } from './CreatorTags';
import type { CreatorCardProps } from './types';

export const CreatorCard: React.FC<CreatorCardProps> = ({ 
  creator, 
  onImageLoad, 
  loadedImages, 
  imageRef 
}) => {
  const isMobile = useIsMobile();
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  
  const tags = creator.tags || getDefaultTags(creator.name, creator.services);
  
  return (
    <article className="group select-text h-full">
      <div className="relative h-full">
        <div className="absolute -inset-0.5 sm:-inset-0.5 rounded-xl bg-gradient-to-r from-purple-800/30 via-indigo-700/30 to-purple-900/30 opacity-60 sm:opacity-75 blur-[2px] sm:blur-sm group-hover:opacity-100 transition duration-500"></div>
        <Card className={cn(
          "overflow-hidden h-full",
          "will-change-transform transition-all duration-300",
          "hover:translate-y-[-4px] hover:scale-[1.02]", // Enhanced hover effect
          "bg-white border border-gray-200/80",
          "shadow-[0_2px_8px_rgba(0,0,0,0.05)]",
          "hover:shadow-[0_12px_24px_rgba(0,0,0,0.12)]", // Increased shadow on hover
          "rounded-xl relative"
        )}>
          {/* Card content - Border beam and glowing effect */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-xl">
            <BorderBeam 
              colorFrom="#9370DB" 
              colorTo="#C19EF9" 
              duration={isMobile ? 30 : 20}
              borderWidth={isMobile ? 0.5 : 1}
            />
          </div>

          {/* Price tag with enhanced styling */}
          <div className="absolute top-2.5 sm:top-3.5 right-2.5 sm:right-3.5 z-20">
            <span className={cn(
              "px-2.5 sm:px-3 py-1.5",
              "text-xs sm:text-sm font-semibold", // More prominent
              "bg-white shadow-sm border border-white/40",
              "text-[#212121] rounded-full",
              "shadow-[0_2px_6px_rgba(0,0,0,0.1)]", // Added subtle shadow
              "transition-all duration-200",
              "group-hover:scale-105 group-hover:shadow-[0_3px_8px_rgba(0,0,0,0.15)]", // Enhanced hover effect
              "flex items-center gap-1" // Added gap for icon
            )}>
              <DollarSign className="w-3 h-3 text-indigo-600" aria-hidden="true" />
              <span>From ${creator.price}</span>
            </span>
          </div>

          <div className="relative">
            {/* Media and info overlay */}
            <div className="relative">
              <CreatorMedia 
                creator={creator}
                onImageLoad={onImageLoad}
                onVideoLoad={() => onImageLoad?.(creator.image)}
              />
              
              <CreatorInfo creator={creator} />
            </div>
            
            {/* Tags and rating section */}
            <div className="p-3.5 sm:p-4.5">
              {/* Tags section */}
              <div className="mb-3.5">
                <CreatorTags tags={tags} />
              </div>
              
              {/* Rating section */}
              <div>
                <CreatorRating rating={creator.rating} reviews={creator.reviews} name={creator.name} />
              </div>
              
              {/* CTA button section with pulse animation on hover */}
              <div className="mt-4.5">
                <ShimmerButton 
                  onClick={() => setShowEmailDialog(true)}
                  aria-label={`Join waitlist to work with ${creator.name}`}
                  className="w-full h-10 sm:h-11 text-sm px-4 hover:scale-[1.03] active:scale-[0.98] transition-transform duration-200 group-hover:animate-pulse-subtle"
                >
                  <span>Join Waitlist</span>
                  <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-0.5 transition-transform duration-200" aria-hidden="true" />
                </ShimmerButton>
              </div>
            </div>
          </div>
        </Card>
      </div>
      <GlowDialog open={showEmailDialog} onOpenChange={setShowEmailDialog} />
    </article>
  );
};
