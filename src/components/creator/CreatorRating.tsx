
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
      isMobile ? "justify-between" : "justify-between",
      "gap-1 sm:gap-2"
    )}>
      {/* Rating and reviews - left aligned with improved mobile layout */}
      <div className="flex items-center flex-shrink-0">
        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" aria-hidden="true" />
        <span className="text-sm font-bold text-brand-text-primary">{formattedRating}</span>
        <span className={cn(
          "text-indigo-600 ml-1.5 font-medium",
          isMobile ? "text-xs" : "text-xs"
        )}>
          ({reviews} reviews)
        </span>
      </div>
      
      {/* Hourly rate - right aligned with improved mobile layout */}
      {hourlyRate && (
        <div className={cn(
          "text-xs font-medium text-brand-text-secondary flex items-center",
          "flex-shrink-0 whitespace-nowrap ml-auto"
        )}>
          <Clock className="w-3 h-3 mr-1 text-gray-500 flex-shrink-0" aria-hidden="true" />
          <span className="flex-shrink-0">Starting at <span className="text-brand-purple-medium font-bold">${hourlyRate}/hr</span></span>
        </div>
      )}
    </div>
  );
};
