
import React, { useState } from 'react';
import { Card } from '../ui/card';
import { ArrowRight, Heart } from 'lucide-react';
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
import { motion } from 'framer-motion';

interface EnhancedCreatorCardProps extends CreatorCardProps {
  isSaved?: boolean;
  onSave?: () => void;
}

export const CreatorCard: React.FC<EnhancedCreatorCardProps> = ({ 
  creator, 
  onImageLoad, 
  loadedImages, 
  imageRef,
  isSaved = false,
  onSave
}) => {
  const isMobile = useIsMobile();
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  
  const tags = creator.tags || getDefaultTags(creator.name, creator.services);
  
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
        {/* Price tag */}
        <div className="absolute top-2.5 sm:top-3.5 right-2.5 sm:right-3.5 z-20">
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
        
        {/* Save button - new */}
        <div className="absolute top-2.5 sm:top-3.5 left-2.5 sm:left-3.5 z-20">
          <motion.button 
            className={cn(
              "p-1.5 sm:p-2 rounded-full",
              "flex items-center justify-center",
              "bg-white shadow-sm border border-white/40",
              "transition-all duration-200",
              "group-hover:scale-105",
              "active:scale-95"
            )}
            whileTap={{ scale: 0.9 }}
            onClick={onSave}
            aria-label={isSaved ? "Remove from saved" : "Save for later"}
          >
            <Heart className={cn(
              "h-4 w-4 sm:h-5 sm:w-5",
              isSaved ? "fill-red-500 text-red-500" : "text-gray-400"
            )} />
          </motion.button>
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
          <div className="p-3.5 sm:p-4">
            {/* Tags section */}
            <div className="mb-3.5 overflow-x-auto scrollbar-hide">
              <CreatorTags tags={tags} />
            </div>
            
            {/* Rating section */}
            <div>
              <CreatorRating rating={creator.rating} reviews={creator.reviews} name={creator.name} />
            </div>
            
            {/* CTA button section */}
            <div className="mt-4">
              <ShimmerButton 
                onClick={() => setShowEmailDialog(true)}
                aria-label={`Join waitlist to work with ${creator.name}`}
                className="w-full h-10 sm:h-11 text-sm px-4 hover:scale-[1.03] active:scale-[0.98] transition-transform duration-200"
              >
                <span>Join Waitlist</span>
                <ArrowRight className="w-4 h-4 ml-1.5" aria-hidden="true" />
              </ShimmerButton>
            </div>
          </div>
        </div>
      </Card>
      <GlowDialog open={showEmailDialog} onOpenChange={setShowEmailDialog} />
    </article>
  );
};
