import React from 'react';
import { Creator } from '../../types/creator';
import { ButtonColorful } from '../ui/button-colorful';
import { MapPin, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SortMenu } from '../sorting/SortMenu';

interface CreatorsListProps {
  creators: Creator[];
  sortBy: string;
  onSort: (value: string) => void;
  onImageLoad: (imageSrc: string) => void;
  loadedImages: Set<string>;
  imageRef: (el: HTMLImageElement | null) => void;
}

export const CreatorsList: React.FC<CreatorsListProps> = ({
  creators,
  sortBy,
  onSort,
  onImageLoad,
  loadedImages,
  imageRef,
}) => {
  return (
    <div className="space-y-6">
      {/* Controls Row - Advanced Filters and Sort */}
      <div className="flex items-center justify-end gap-4">
        <button
          onClick={() => {}} // Advanced filters toggle handler
          className="
            inline-flex items-center gap-1.5 
            px-2 py-1
            text-sm font-medium
            text-gray-700 hover:text-gray-900 
            hover:bg-gray-50 rounded-md
            transition-colors duration-200
          "
        >
          Advanced Filters
        </button>

        <SortMenu
          options={[
            { label: 'Highest Rated', value: 'rating' },
            { label: 'Price: Low to High', value: 'price_asc' },
            { label: 'Price: High to Low', value: 'price_desc' },
          ]}
          onSort={onSort}
          defaultValue={sortBy}
        />
      </div>

      {/* Creator Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {creators.map((creator, index) => (
          <div key={index} className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-300/50 to-blue-300/50 rounded-xl blur opacity-20"></div>
            <div className="relative rounded-xl overflow-hidden bg-white/90 backdrop-blur-sm border border-gray-200/80 shadow-md">
              <div className="aspect-w-16 aspect-h-9">
                <img
                  ref={imageRef}
                  className="object-cover w-full h-full transition-opacity duration-300 ease-in-out"
                  src={creator.image}
                  alt={`Service provider ${creator.name}`}
                  onLoad={() => onImageLoad(creator.image)}
                  style={{ opacity: loadedImages.has(creator.image) ? 1 : 0 }}
                />
              </div>

              <div className="p-4 space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">{creator.name}</h3>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{creator.location}</span>
                </div>
                <div className="flex space-x-2 text-sm">
                  {creator.services.map((service, i) => (
                    <ButtonColorful key={i} className="text-xs">
                      {service}
                    </ButtonColorful>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-800">${creator.price}</span>
                    <span className="text-gray-500">/project</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    <span>Verified</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-700">
                  <div className="flex items-center">
                    <span className="font-medium">{creator.rating}</span>
                    <span className="text-gray-500">
                      ({creator.reviews} reviews)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
