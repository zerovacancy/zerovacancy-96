
import React from 'react';
import { CreatorCard } from '../creator/CreatorCard';
import { SortMenu } from '../sorting/SortMenu';

interface Creator {
  id: string;
  name: string;
  title: string;
  image: string;
  description: string;
  services: string[];
  price: number;
  rating: number;
  reviews: number;
  location: string;
  workExamples: string[];
}

interface CreatorsListProps {
  creators: Creator[];
  sortBy: string;
  onSort: (value: string) => void;
  onImageLoad: () => void;
  loadedImages: number;
  imageRef: React.RefObject<HTMLImageElement>;
}

export const CreatorsList: React.FC<CreatorsListProps> = ({
  creators,
  sortBy,
  onSort,
  onImageLoad,
  loadedImages,
  imageRef,
}) => {
  const sortOptions = [
    { label: 'Rating', value: 'rating' },
    { label: 'Price: Low to High', value: 'price_asc' },
    { label: 'Price: High to Low', value: 'price_desc' },
    { label: 'Distance', value: 'distance' }
  ];

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6 w-full gap-4">
        <div className="w-full sm:w-auto">
          <SortMenu 
            options={sortOptions}
            onSort={onSort}
            defaultValue={sortBy}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {creators.map((creator) => (
          <CreatorCard
            key={creator.id}
            creator={creator}
            onImageLoad={onImageLoad}
            loadedImages={loadedImages}
            imageRef={imageRef}
          />
        ))}
      </div>
    </div>
  );
};
