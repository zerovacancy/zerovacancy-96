
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

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center">
        <Star className="w-4.5 h-4.5 fill-yellow-400 text-yellow-400 mr-1.5" />
        <span className="text-sm font-bold text-brand-text-primary">{formattedRating}</span>
        <span className="text-xs text-indigo-600 ml-1.5 font-medium">({reviews} reviews)</span>
      </div>
      {hourlyRate && (
        <div className="text-xs font-medium text-brand-text-secondary flex items-center">
          <Clock className="w-3.5 h-3.5 mr-1 text-gray-500" aria-hidden="true" />
          <span>Starting at <span className="text-brand-purple-medium font-bold">${hourlyRate}/hr</span></span>
        </div>
      )}
    </div>
  );
};
