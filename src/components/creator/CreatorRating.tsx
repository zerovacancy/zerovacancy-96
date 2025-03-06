
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
  const isMobile = useIsMobile();
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

  return (
    <div className={cn(
      "flex w-full",
      // On mobile, stack vertically with proper spacing
      isMobile ? "flex-col items-start gap-3" : "flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-2 sm:gap-0"
    )}>
      <div className="flex items-center">
        <Star className={cn(
          "fill-yellow-400 text-yellow-400 mr-1.5",
          isMobile ? "w-5 h-5" : "w-4 h-4 sm:w-5 sm:h-5", // Responsive star size
          "flex-shrink-0" // Prevent from shrinking
        )} aria-hidden="true" />
        <span className={cn(
          "font-bold text-brand-text-primary",
          isMobile ? "text-base" : "text-sm" // Larger text on mobile
        )}>
          {formattedRating}
        </span>
        <span className={cn(
          "text-indigo-600 ml-2 font-medium",
          isMobile ? "text-sm" : "text-xs" // Larger text on mobile
        )}>
          ({reviews} reviews)
        </span>
      </div>
      
      {/* Divider - visible on mobile */}
      {isMobile && hourlyRate && (
        <div className="w-full h-px bg-gray-200 my-1"></div>
      )}
      
      {hourlyRate && (
        <div className={cn(
          "font-medium text-brand-text-secondary flex items-center",
          isMobile ? "text-sm" : "text-xs", // Larger text on mobile
          "py-1" // Added vertical padding for better spacing
        )}>
          <Clock className={cn(
            "mr-1.5 text-gray-500",
            isMobile ? "w-4 h-4" : "w-3.5 h-3.5", // Larger icon on mobile
            "flex-shrink-0" // Prevent from shrinking
          )} aria-hidden="true" />
          <span className="whitespace-nowrap">
            Starting at <span className="text-brand-purple-medium font-bold">${hourlyRate}/hr</span>
          </span>
        </div>
      )}
    </div>
  );
};
