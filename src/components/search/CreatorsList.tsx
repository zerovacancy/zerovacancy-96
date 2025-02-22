
import React from 'react';
import { SortMenu } from '../sorting/SortMenu';
import { Creator } from '../../types/creator';
import { ButtonColorful } from '../ui/button-colorful';
import { MapPin, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

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

const getDefaultTags = (name: string, services: string[]) => {
  if (name === 'John Smith' && services.includes('Photography')) {
    return ['#RealEstate', '#Aerial', '#IndoorDroneTour'];
  }
  if (name === 'Jane Cooper') {
    return ['#Interior', '#Design', '#Staging'];
  }
  if (name === 'Emily Johnson') {
    return ['#POV', '#TikTok', '#ComeTourWithMe'];
  }
  return ['#Professional', '#Creative', '#Expert'];
};

const getTagStyle = (tag: string) => {
  if (['#RealEstate', '#Aerial', '#IndoorDroneTour', '#Interior', '#Design', '#Staging'].includes(tag)) {
    return "bg-[#E5DEFF] text-[#4F46E5] hover:bg-[#D6BCFA] hover:text-[#3730A3]";
  }
  if (['#POV', '#TikTok', '#ComeTourWithMe'].includes(tag)) {
    return "bg-[#F2FCE2] text-[#3B823E] hover:bg-[#DCF5DC] hover:text-[#2E6A31]";
  }
  return "bg-[#FDE1D3] text-[#C4704F] hover:bg-[#FECDA7] hover:text-[#9D5B3F]";
};

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
      {/* Creator Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {creators.map((creator, index) => (
          <div key={index} className="group select-text">
            <div className="relative rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px] bg-white">
              {/* Price Tag */}
              <div className="absolute top-4 right-4 z-10">
                <span className="
                  px-3 py-1.5 
                  text-sm font-medium 
                  bg-white/90 backdrop-blur-sm 
                  text-gray-900 
                  rounded-full 
                  shadow-sm 
                  border border-white/20
                  transition-all duration-200
                  group-hover:shadow-md
                ">
                  From ${creator.price}
                </span>
              </div>

              {/* Image Section */}
              <div className="relative aspect-[4/3]">
                <img
                  src={creator.image}
                  alt={creator.name}
                  className={cn(
                    "w-full h-full object-cover transition-opacity duration-300",
                    !loadedImages.has(creator.image) && "opacity-0"
                  )}
                  onLoad={() => onImageLoad(creator.image)}
                  ref={imageRef}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none" />
                
                {/* Creator Info Overlay */}
                <div className="absolute bottom-4 left-4 text-white select-text">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-xl">{creator.name}</h3>
                    <CheckCircle className="w-5 h-5 text-blue-400" />
                  </div>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <MapPin className="w-4 h-4 text-white/90" />
                    <span className="text-sm text-white/90">{creator.location}</span>
                  </div>
                  <p className="text-sm text-white/90 mt-1.5">
                    {creator.services.join(" • ")}
                  </p>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-5 space-y-5">
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {getDefaultTags(creator.name, creator.services).map((tag, idx) => (
                    <button
                      key={idx}
                      className={cn(
                        "text-xs px-2 py-1 rounded-full transition-colors duration-200 cursor-pointer",
                        getTagStyle(tag)
                      )}
                      onClick={(e) => e.preventDefault()}
                    >
                      {tag}
                    </button>
                  ))}
                </div>

                {/* Rating and Reviews */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-900">{creator.rating}</span>
                      <span className="text-sm text-gray-500 ml-1">({creator.reviews} reviews)</span>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="flex justify-center px-4">
                  <ButtonColorful 
                    className="w-auto px-6 py-2.5 min-w-[160px] max-w-[70%]"
                    label="Get Early Access"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
