
import React from 'react';
import { cn } from '@/lib/utils';
import { MapPin, Image, BadgeCheck } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface Creator {
  name: string;
  services: string[];
  location: string;
}

interface CreatorInfoProps {
  creator: Creator;
}

export const CreatorInfo: React.FC<CreatorInfoProps> = ({ creator }) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="absolute inset-0 flex flex-col justify-end p-3.5 sm:p-4.5 text-white select-text z-10">
      {/* Enhanced darker semi-transparent gradient overlay for better text visibility */}
      <div className={cn(
        "absolute inset-0 pointer-events-none",
        isMobile 
          ? "bg-gradient-to-t from-black/95 via-black/80 to-black/20" // Stronger, taller gradient for mobile
          : "bg-gradient-to-t from-black/90 via-black/60 to-transparent"
      )}></div>
      
      <div className={cn(
        "relative z-10",
        isMobile ? "px-4 py-3 pb-5" : "" // Extra padding on mobile for better readability
      )}>
        <div className="flex items-center gap-2 sm:gap-2.5">
          <h3 className={cn(
            "font-bold text-white drop-shadow-md", // Added drop shadow for better contrast
            isMobile ? "text-xl" : "text-lg sm:text-xl" // Larger text on mobile
          )}>
            {creator.name}
          </h3>
          {/* More visible verification badge */}
          <BadgeCheck 
            className={cn(
              isMobile ? "w-5 h-5" : "w-4.5 h-4.5 sm:w-5 sm:h-5",
              "text-white drop-shadow-sm", // Added drop shadow for better visibility
              "transition-all duration-300",
              isMobile 
                ? "bg-indigo-500/90 rounded-full p-0.5" // More visible on mobile
                : "bg-indigo-500/70 rounded-full p-0.5",
              "group-hover:bg-indigo-500/90" // Enhanced hover effect
            )}
            aria-label="Verified Creator"
          />
        </div>
        
        {/* Location display with improved spacing for mobile */}
        <div className={cn(
          "flex items-center gap-1.5",
          isMobile ? "mt-5 mb-1" : "mt-2.5 sm:mt-3" // Much more spacing on mobile
        )}>
          <MapPin 
            className={cn(
              "text-white/90 flex-shrink-0 drop-shadow-sm", // Added drop shadow
              isMobile ? "w-4 h-4" : "w-3.5 h-3.5" // Larger icon on mobile
            )}
            aria-hidden="true"
          />
          <span className={cn(
            "text-white/90 font-medium drop-shadow-sm", // Added drop shadow
            isMobile ? "text-sm" : "text-xs sm:text-sm" // Larger text on mobile
          )}>
            {creator.location}
          </span>
        </div>
        
        {/* Services display with improved spacing */}
        <div className={cn(
          "flex items-center gap-1.5",
          isMobile ? "mt-4" : "mt-3 sm:mt-2.5" // More spacing on mobile
        )}>
          <Image
            className={cn(
              "text-white/90 flex-shrink-0 drop-shadow-sm", // Added drop shadow
              isMobile ? "w-4 h-4" : "w-3.5 h-3.5" // Larger icon on mobile
            )}
            aria-hidden="true"
          />
          <p className={cn(
            "text-white/90 drop-shadow-sm", // Added drop shadow
            isMobile ? "text-sm" : "text-xs sm:text-sm" // Larger text on mobile
          )}>
            {creator.services.join(" • ")}
          </p>
        </div>
      </div>
    </div>
  );
};
