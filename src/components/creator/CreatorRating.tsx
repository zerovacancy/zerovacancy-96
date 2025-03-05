
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

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center">
        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1.5" />
        <span className="text-sm font-medium text-metrics">{rating}</span>
        <span className="text-xs text-caption ml-1">({reviews} reviews)</span>
      </div>
      {hourlyRate && (
        <div className="text-xs text-caption">
          Starting at <span className="text-price">${hourlyRate}/hr</span>
        </div>
      )}
    </div>
  );
};
