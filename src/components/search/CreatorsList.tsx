import React from 'react';
import { SortMenu } from '../sorting/SortMenu';
import { Creator } from '@/types/creator';

interface CreatorsListProps {
  creators: Creator[];
  sortBy: string;
  onSort: (value: string) => void;
  onImageLoad: (imageSrc: string) => void;
  loadedImages: Set<string>;
  imageRef: (el: HTMLImageElement | null) => void;
}

const sortOptions = [
  { label: 'Highest Rated', value: 'rating' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
];

export const CreatorsList: React.FC<CreatorsListProps> = ({
  creators,
  sortBy,
  onSort,
  onImageLoad,
  loadedImages,
  imageRef,
}) => {
  return (
    <div>
      <div className="flex items-center gap-2">
        <SortMenu
          options={sortOptions}
          onSort={onSort}
          defaultValue={sortBy}
        />
      </div>

      {/* Creators Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {creators.map((creator, index) => (
          <div key={index} className="relative rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200">
            <div className="aspect-w-4 aspect-h-3">
              <img
                src={creator.image}
                alt={creator.name}
                className="object-cover w-full h-full transition-opacity duration-300"
                onLoad={() => onImageLoad(creator.image)}
                ref={imageRef}
                style={{ opacity: loadedImages.has(creator.image) ? 1 : 0 }}
              />
            </div>
            <div className="p-4 bg-white">
              <h3 className="text-lg font-semibold text-gray-900">{creator.name}</h3>
              <p className="mt-1 text-sm text-gray-500">{creator.services.join(', ')}</p>
              <div className="mt-2 flex items-center justify-between">
                <div>
                  <span className="text-base font-medium text-gray-900">${creator.price}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-gray-700 mr-1">{creator.rating}</span>
                  <span className="text-sm text-gray-500">({creator.reviews})</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
