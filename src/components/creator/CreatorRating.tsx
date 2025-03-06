
import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface CreatorRatingProps {
  rating: number;
  reviews?: number;
  name: string;
}

export const CreatorRating: React.FC<CreatorRatingProps> = ({ 
  rating, 
  reviews = 0,
  name 
}) => {
  const isMobile = useIsMobile();
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  
  return (
    <div className="flex justify-between items-center w-full">
      <div className="flex items-center">
        {/* Star rating */}
        <div className="flex mr-1.5">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={cn(
                "w-3.5 h-3.5 sm:w-4 sm:h-4",
                i < fullStars
                  ? "text-yellow-400 fill-yellow-400"
                  : i === fullStars && hasHalfStar
                  ? "text-yellow-400 fill-yellow-400/50"
                  : "text-gray-300 fill-gray-100"
              )}
            />
          ))}
        </div>
        
        {/* Rating text */}
        <span className={cn(
          "font-medium text-gray-800",
          isMobile ? "text-xs" : "text-sm"
        )}>
          {rating.toFixed(1)}
        </span>
        
        {/* Review count */}
        {reviews > 0 && (
          <span className={cn(
            "text-gray-500 ml-1.5",
            isMobile ? "text-xs" : "text-sm"
          )}>
            ({reviews})
          </span>
        )}
      </div>
    </div>
  );
};
