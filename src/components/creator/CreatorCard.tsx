
import React from 'react';
import { Card, CardHeader, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { MapPin, Star, Image, CheckCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { CreatorRating } from './CreatorRating';
import { GlowDialog } from '../ui/glow-dialog';

interface Creator {
  name: string;
  services: string[];
  price: number;
  rating: number;
  reviews: number;
  location: string;
  image: string;
  workExamples: string[];
  tags?: string[];
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
  const [showEmailDialog, setShowEmailDialog] = React.useState(false);
  
  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    if (onImageLoad) {
      onImageLoad(creator.image);
    }
  };

  console.log('Creator name:', creator.name); // Debug log

  const getDefaultTags = (name: string, services: string[]) => {
    if (name === 'John Smith' && services.includes('Photography')) {
      return ['#RealEstate', '#Aerial', '#Commercial'];
    }
    if (name === 'Jane Cooper') {
      return ['#Portrait', '#Wedding', '#Editorial'];
    }
    if (name === 'Emily') {
      return ['#Portrait', '#Fashion', '#Lifestyle'];
    }
    return ['#Professional', '#Creative', '#Expert'];
  };

  const getTagStyle = (tag: string) => {
    if (['#RealEstate', '#Aerial', '#Commercial', '#Portrait', '#Wedding', '#Editorial'].includes(tag)) {
      return "bg-[#E5DEFF] text-[#4F46E5] hover:bg-[#D6BCFA] hover:text-[#3730A3]";
    }
    if (['#Professional', '#Creative', '#Expert'].includes(tag)) {
      return "bg-[#F2FCE2] text-[#3B823E] hover:bg-[#DCF5DC] hover:text-[#2E6A31]";
    }
    return "bg-[#FDE1D3] text-[#C4704F] hover:bg-[#FECDA7] hover:text-[#9D5B3F]";
  };
  
  const tags = creator.tags || getDefaultTags(creator.name, creator.services);

  const getImageSource = () => {
    if (creator.name === 'Jane Cooper') return '/janeprofile.png';
    if (creator.name === 'Emily Johnson') return '/emily profile.jpeg';
    return creator.image;
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
              src={getImageSource()}
              alt={creator.name} 
              className={cn(
                "w-full h-full object-cover object-center transition-opacity duration-300",
                !loadedImages.has(creator.image) && "opacity-0"
              )}
              onLoad={handleImageLoad}
              loading="lazy"
              crossOrigin="anonymous"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none" />
            
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
          
          <div className="p-5">
            <div className="space-y-5">
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <button
                    key={index}
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
              
              <CreatorRating rating={creator.rating} reviews={creator.reviews} name={creator.name} />
              
              <Button 
                variant="default"
                size="default" 
                className="w-full text-sm px-4 py-2 h-10 bg-[#4F46E5] hover:bg-[#3730A3] text-white transition-colors"
                onClick={() => setShowEmailDialog(true)}
              >
                Get Early Access
              </Button>
            </div>
          </div>
        </div>
      </Card>
      <GlowDialog open={showEmailDialog} onOpenChange={setShowEmailDialog} />
    </div>
  );
};
