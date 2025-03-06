import React, { useState, useEffect, useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface Creator {
  name: string;
  image: string;
}

interface CreatorMediaProps {
  creator: Creator;
  onImageLoad?: (imageSrc: string) => void;
  onVideoLoad?: () => void;
}

export const getMedia = (creator: Creator) => {
  if (creator.name === 'Emily Johnson') {
    return { type: 'image', src: '/newemilyprofile.jpg' };
  }
  if (creator.name === 'Jane Cooper') {
    return { type: 'image', src: '/janeprofile.png' };
  }
  if (creator.name === 'Michael Brown') {
    return { 
      type: 'video', 
      src: '/michaelprofile.mov',
      fallback: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952'
    };
  }
  return { type: 'image', src: creator.image };
};

export const CreatorMedia: React.FC<CreatorMediaProps> = ({ 
  creator, 
  onImageLoad,
  onVideoLoad
}) => {
  const isMobile = useIsMobile();
  const [imageError, setImageError] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const mediaRef = useRef<HTMLDivElement>(null);
  
  const media = getMedia(creator);
  
  // Use Intersection Observer to load media only when visible
  useEffect(() => {
    if (!mediaRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          // Disconnect after detecting visibility
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '200px' }
    );
    
    observer.observe(mediaRef.current);
    
    return () => {
      observer.disconnect();
    };
  }, []);
  
  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    if (onImageLoad) {
      onImageLoad(creator.image);
    }
  };

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
    if (onVideoLoad) {
      onVideoLoad();
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };
  
  return (
    <div 
      className={cn(
        "relative will-change-transform", 
        "overflow-hidden",
        "flex items-center justify-center",
        "h-full w-full" // Fill container
      )} 
      ref={mediaRef}
    >
      {isVisible && ((media.type === 'image') || (media.type === 'video' && imageError)) ? (
        <img 
          src={media.type === 'image' ? media.src : (media as any).fallback}
          alt={`${creator.name} profile`}
          className="w-full h-full object-cover object-center transform-gpu"
          onLoad={handleImageLoad}
          onError={handleImageError}
          loading="lazy"
          decoding="async"
          fetchPriority="auto"
          style={{
            contentVisibility: 'auto',
            containIntrinsicSize: 'auto 300px',
          }}
        />
      ) : isVisible ? (
        <>
          {/* Video element with fallback in case it fails to load */}
          <video
            src={media.src}
            className="w-full h-full object-cover object-center transform-gpu"
            onError={() => setImageError(true)}
            onLoadedData={handleVideoLoad}
            autoPlay
            muted
            loop
            playsInline
            style={{
              willChange: 'transform',
              transform: 'translate3d(0,0,0)',
            }}
          />
          {/* Fallback image that shows while video is loading */}
          {!isVideoLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
          )}
        </>
      ) : (
        // Placeholder when not yet visible
        <div className="w-full h-full bg-gray-100"></div>
      )}
    </div>
  );
};
