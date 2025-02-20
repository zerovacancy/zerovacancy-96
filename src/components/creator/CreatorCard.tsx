
import React from 'react';
import { Card, CardHeader, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { MapPin, Star, Image, CheckCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { CreatorRating } from './CreatorRating';

interface Creator {
  name: string;
  services: string[];
  price: number;
  rating: number;
  reviews: number;
  location: string;
  image: string;
  workExamples: string[];
}

interface CreatorCardProps {
  creator: Creator;
  onImageLoad?: (imageSrc: string) => void;
  loadedImages: Set<string>;
  imageRef: (node: HTMLImageElement | null) => void;
}

export const CreatorCard: React.FC<CreatorCardProps> = ({ 
  creator, 
  onImageLoad, 
  loadedImages, 
  imageRef 
}) => {
  const isMobile = useIsMobile();
  
  const handleImageLoad = () => {
    if (onImageLoad) {
      onImageLoad(creator.image);
    }
  };
  
  return (
    <div className="group select-text">
      <Card className="overflow-hidden h-full will-change-transform transition-all duration-300 hover:translate-y-[-2px]">
        <div className="relative">
          <div className="absolute top-4 right-4 z-10">
            <span className="px-3 py-1.5 text-sm font-medium bg-black/70 text-white rounded-full backdrop-blur-sm">
              From ${creator.price}
            </span>
          </div>
          <div className="relative aspect-[4/3]">
            <img 
              ref={imageRef}
              src={creator.name === 'Jane Cooper' ? '/janeprofile.png' : creator.image}
              alt={creator.name} 
              className={cn(
                "w-full h-full object-cover object-center transition-opacity duration-300",
                !loadedImages.has(creator.image) && "opacity-0"
              )}
              onLoad={handleImageLoad}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 text-white select-text">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-xl">{creator.name}</h3>
                <CheckCircle className="w-5 h-5 text-blue-400" />
              </div>
              <div className="flex items-center gap-1.5 text-sm text-white/90">
                <MapPin className="w-4 h-4" />
                <span>{creator.location}</span>
              </div>
              <p className="text-sm text-white/90 mt-1">
                {creator.services.join(" • ")}
              </p>
            </div>
          </div>
          
          <div className="p-5 space-y-5">
            <CreatorRating rating={creator.rating} reviews={creator.reviews} />
            
            <Button 
              variant="outline" 
              size="default" 
              className="w-full text-sm px-4 py-2 h-10 hover:bg-primary hover:text-white transition-colors"
            >
              Contact
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
