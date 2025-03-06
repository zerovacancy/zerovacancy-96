
import React, { useState } from 'react';
import { SortMenu } from '../sorting/SortMenu';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { MobileCreatorCarousel } from './MobileCreatorCarousel';
import { DesktopCreatorGrid } from './DesktopCreatorGrid';
import type { Creator } from '../creator/types';

interface CreatorsListProps {
  creators: Creator[];
  sortBy: string;
  onSort: (value: string) => void;
  onImageLoad: (imageSrc: string) => void;
  loadedImages: Set<string>;
  imageRef: (node: HTMLImageElement | null) => void;
}

export const CreatorsList: React.FC<CreatorsListProps> = ({
  creators,
  sortBy,
  onSort,
  onImageLoad,
  loadedImages,
  imageRef,
}) => {
  const isMobile = useIsMobile();
  const [loadedImageUrls, setLoadedImageUrls] = useState<Set<string>>(new Set());
  
  const handleImageLoad = (imageSrc: string) => {
    setLoadedImageUrls(prev => {
      const updated = new Set(prev);
      updated.add(imageSrc);
      return updated;
    });
    if (onImageLoad) {
      onImageLoad(imageSrc);
    }
  };
  
  const sortOptions = [
    { label: 'Rating', value: 'rating' },
    { label: 'Price: Low to High', value: 'price_asc' },
    { label: 'Price: High to Low', value: 'price_desc' },
    { label: 'Distance', value: 'distance' }
  ];

  return (
    <div className="w-full space-y-2 sm:space-y-6"> {/* Reduced space on mobile */}
      {/* Sort menu div - completely removed for now */}
      {false && (
        <div className={cn(
          "w-full",
          isMobile ? "flex justify-start pl-4" : "flex justify-end"
        )}>
          <SortMenu 
            options={sortOptions}
            onSort={onSort}
            defaultValue={sortBy}
          />
        </div>
      )}

      {isMobile ? (
        <MobileCreatorCarousel
          creators={creators}
          onImageLoad={handleImageLoad}
          loadedImages={loadedImageUrls}
          imageRef={imageRef}
        />
      ) : (
        <DesktopCreatorGrid
          creators={creators}
          onImageLoad={handleImageLoad}
          loadedImages={loadedImageUrls}
          imageRef={imageRef}
        />
      )}
    </div>
  );
};
