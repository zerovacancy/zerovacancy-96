
import React from 'react';
import { Star } from 'lucide-react';

interface CreatorRatingProps {
  rating: number;
  reviews: number;
  name?: string;
}

export const CreatorRating: React.FC<CreatorRatingProps> = ({ rating, reviews, name }) => {
  // Helper function to get hourly rate based on name
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
