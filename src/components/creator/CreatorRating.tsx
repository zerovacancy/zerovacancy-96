import React from 'react';
import { Star } from 'lucide-react';
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
      case 'John Smith':
        return 85;
      case 'Jane Smith':
        return 80;
      case 'Jane Cooper':
        return 75;
      case 'Emily Johnson':
        return 45;
      case 'Michael Brown':
        return 60;
      default:
        // Provide a fallback rate for any other creators
        return 50;
    }
  };

  const hourlyRate = getHourlyRate(name);

  if (isMobile) {
    return (
      <div className="flex items-start justify-between w-full">
        <div className="flex flex-col items-start gap-1">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400 drop-shadow-sm" />
            <span className="text-sm font-semibold">{rating}</span>
          </div>
          <span className="text-xs text-muted-foreground">({reviews} reviews)</span>
        </div>
        {hourlyRate && (
          <div className="flex flex-col items-end gap-0.5">
            <span className="text-xs text-muted-foreground">Starting at</span>
            <span className="text-xs font-medium">${hourlyRate}/hr</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-2.5">
        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400 drop-shadow-sm" />
        <span className="text-sm font-semibold">{rating}</span>
        <span className="text-xs text-muted-foreground">({reviews} reviews)</span>
      </div>
      {hourlyRate && (
        <div className="text-xs text-muted-foreground">
          Starting at <span className="font-medium text-gray-900">${hourlyRate}/hr</span>
        </div>
      )}
    </div>
  );
};
