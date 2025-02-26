
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
      case 'Jane Cooper':
        return 75;
      case 'Emily Johnson':
        return 45;
      default:
        return null;
    }
  };

  const hourlyRate = getHourlyRate(name);

  if (isMobile) {
    return (
      <div className="flex items-start justify-between">
        <div className="flex flex-col items-start gap-0.5">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{rating}</span>
          </div>
          <span className="text-sm text-muted-foreground">({reviews} reviews)</span>
        </div>
        {hourlyRate && (
          <div className="flex flex-col items-end gap-0.5">
            <span className="text-sm text-muted-foreground">Starting at</span>
            <span className="text-sm font-medium">${hourlyRate}/hr</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between gap-8">
      <div className="flex items-center gap-2">
        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
        <span className="text-sm font-medium">{rating}</span>
        <span className="text-sm text-muted-foreground">({reviews} reviews)</span>
      </div>
      {hourlyRate && (
        <div className="text-sm text-muted-foreground">
          Starting at ${hourlyRate}/hr
        </div>
      )}
    </div>
  );
};

