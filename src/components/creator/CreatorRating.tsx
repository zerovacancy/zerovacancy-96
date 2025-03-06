import React from 'react';
import { Star, Clock } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface CreatorRatingProps {
  rating: number;
  reviews: number;
  name?: string;
}

export const CreatorRating: React.FC<CreatorRatingProps> = ({ rating, reviews, name }) => {
  const getHourlyRate = (name?: string) => {
    switch (name) {
      case 'Emily Johnson':
        return 45;
      case 'Jane Cooper':
        return 75;
      case 'Michael Brown':
        return 80;
      default:
        return 50;
    }
  };

  const hourlyRate = getHourlyRate(name);
  
  // Format rating to always show one decimal place
  const formattedRating = rating.toFixed(1);
  const isMobile = useIsMobile();

  return (
    <div className={cn(
      "flex items-center w-full",
      isMobile ? "flex-wrap" : "justify-between", // Wrap on mobile
      "gap-1"
    )}>
      {/* Rating and reviews - more compact for mobile */}
      <div className="flex items-center flex-shrink-0">
        <Star className={cn(
          "fill-yellow-400 text-yellow-400 mr-1",
          isMobile ? "w-3.5 h-3.5" : "w-4 h-4" // Smaller icon on mobile
        )} aria-hidden="true" />
        <span className={cn(
          "font-bold text-brand-text-primary",
          isMobile ? "text-xs" : "text-sm" // Smaller text on mobile
        )}>
          {formattedRating}
        </span>
        <span className={cn(
          "text-indigo-600 ml-1 font-medium",
          isMobile ? "text-[10px]" : "text-xs" // Even smaller on mobile
        )}>
          ({reviews})
        </span>
      </div>
      
      {/* Hourly rate - with better layout for mobile */}
      {hourlyRate && (
        <div className={cn(
          "text-brand-text-secondary flex items-center",
          "flex-shrink-0",
          isMobile ? "ml-0 mt-1 text-[10px]" : "ml-auto text-xs", // Move to next line on mobile with smaller text
          isMobile ? "w-full" : "" // Full width on mobile
        )}>
          <Clock className={cn(
            "mr-1 text-gray-500 flex-shrink-0",
            isMobile ? "w-2.5 h-2.5" : "w-3 h-3" // Smaller icon on mobile
          )} aria-hidden="true" />
          <span className="flex-shrink-0">
            Starting at <span className="text-brand-purple-medium font-bold">${hourlyRate}/hr</span>
          </span>
        </div>
      )}
    </div>
  );
};
