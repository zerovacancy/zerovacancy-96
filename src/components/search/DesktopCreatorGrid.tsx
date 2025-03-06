
import React from 'react';
import { CreatorCard } from '../creator/CreatorCard';
import type { Creator } from '../creator/types';

interface DesktopCreatorGridProps {
  creators: Creator[];
  onImageLoad: (imageSrc: string) => void;
  loadedImages: Set<string>;
  imageRef: (node: HTMLImageElement | null) => void;
}

export const DesktopCreatorGrid: React.FC<DesktopCreatorGridProps> = ({
  creators,
  onImageLoad,
  loadedImages,
  imageRef,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
      {creators.map((creator) => (
        <div 
          key={creator.name} 
          className="h-full flex group"
        >
          <div className="w-full relative transform transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl rounded-xl overflow-hidden">
            <CreatorCard
              creator={creator}
              onImageLoad={onImageLoad}
              loadedImages={loadedImages}
              imageRef={imageRef}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
