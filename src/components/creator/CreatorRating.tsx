
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
  
  return (
    <div className="flex justify-between items-center w-full">
      <div className="flex items-center">
        {/* Single star rating */}
        <div className="flex mr-1.5">
          <Star
            className={cn(
              "w-4 h-4",
              "text-yellow-400 fill-yellow-400"
            )}
          />
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
