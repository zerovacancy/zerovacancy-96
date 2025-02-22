import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { Sparkle } from 'lucide-react';
import { cn } from "@/lib/utils";
import { useIsMobile } from 'usehooks-ts';
import { EmailDialog } from './EmailDialog';

interface Creator {
  id: string;
  name: string;
  title: string;
  image: string;
  description: string;
}

interface CreatorCardProps {
  creator: Creator;
  onImageLoad: () => void;
  loadedImages: number;
  imageRef: React.RefObject<HTMLImageElement>;
}

export const CreatorCard: React.FC<CreatorCardProps> = ({ 
  creator, 
  onImageLoad, 
  loadedImages, 
  imageRef 
}) => {
  const isMobile = useIsMobile();
  const [showEmailDialog, setShowEmailDialog] = React.useState(false);
  const [imageError, setImageError] = React.useState(false);
  
  console.log('CreatorCard ShimmerButton props:', {
    className: cn(
      "relative group/btn overflow-hidden",
      "w-full",
      "h-12 sm:h-14",
      "text-base sm:text-lg font-medium",
      "px-8 sm:px-12",
      "flex items-center justify-center gap-2 sm:gap-3",
      "bg-gradient-to-r from-[#9b87f5] to-[#D946EF]",
      "hover:from-[#8e77f3] hover:to-[#D033ED]",
      "shadow-lg hover:shadow-xl",
      "transition-all duration-300",
      "hover:scale-[1.02] active:scale-[0.98]"
    ),
    shimmerColor: "rgba(255, 255, 255, 0.2)",
    shimmerSize: "60%",
    shimmerDuration: "2s"
  });

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">{creator.name}</CardTitle>
        </div>
        <CardDescription className="text-gray-500">{creator.title}</CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        <div className="relative w-full h-48 overflow-hidden rounded-md">
          {!imageError ? (
            <img
              ref={imageRef}
              src={creator.image}
              alt={`Creator ${creator.name}`}
              className="object-cover w-full h-full transition-opacity duration-500"
              style={{ opacity: loadedImages > 0 ? 1 : 0 }}
              onLoad={onImageLoad}
              onError={handleImageError}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-500">
              Image failed to load
            </div>
          )}
        </div>
        <p className="text-sm text-gray-700 mt-3">{creator.description}</p>
      </CardContent>
      <CardFooter className="flex justify-center p-4">
              <ShimmerButton 
                className={cn(
                  "relative group/btn overflow-hidden",
                  "w-full",
                  "h-12 sm:h-14",
                  "text-base sm:text-lg font-medium",
                  "px-8 sm:px-12",
                  "flex items-center justify-center gap-2 sm:gap-3",
                  "bg-gradient-to-r from-[#9b87f5] to-[#D946EF]",
                  "hover:from-[#8e77f3] hover:to-[#D033ED]",
                  "shadow-lg hover:shadow-xl",
                  "transition-all duration-300",
                  "hover:scale-[1.02] active:scale-[0.98]"
                )}
                shimmerColor="rgba(255, 255, 255, 0.2)"
                shimmerSize="60%"
                shimmerDuration="2s"
                onClick={(e) => {
                  console.log('ShimmerButton clicked, classes applied:', e.currentTarget.className);
                  setShowEmailDialog(true);
                }}
              >
                <span className="relative z-10">Join Waitlist</span>
                <Sparkle className="w-5 h-5 sm:w-6 sm:h-6 text-white/90" />
              </ShimmerButton>
      </CardFooter>
      <EmailDialog show={showEmailDialog} onClose={() => setShowEmailDialog(false)} creatorName={creator.name} />
    </Card>
  );
};
