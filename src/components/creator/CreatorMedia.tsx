
import React, { useState, useRef } from 'react';

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
  const [imageError, setImageError] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const media = getMedia(creator);
  
  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    setIsImageLoaded(true);
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
  
  // Use intersection observer to lazy-load images and videos
  React.useEffect(() => {
    if (!imageRef.current && !videoRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (imageRef.current && entry.target === imageRef.current) {
              // Load image when it comes into view
              imageRef.current.src = media.type === 'image' ? media.src : (media as any).fallback;
              observer.unobserve(entry.target);
            } else if (videoRef.current && entry.target === videoRef.current) {
              // Load video when it comes into view
              videoRef.current.src = media.src;
              observer.unobserve(entry.target);
            }
          }
        });
      },
      { rootMargin: '200px' } // Load when element is 200px from viewport
    );
    
    if (imageRef.current) observer.observe(imageRef.current);
    if (videoRef.current) observer.observe(videoRef.current);
    
    return () => {
      observer.disconnect();
    };
  }, [media]);
  
  return (
    <div className="relative aspect-[4/3]">
      {((media.type === 'image') || (media.type === 'video' && imageError)) ? (
        <>
          {!isImageLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse" aria-hidden="true" />
          )}
          <img 
            ref={imageRef}
            src="" // Empty initially, loaded by intersection observer
            data-src={media.type === 'image' ? media.src : (media as any).fallback}
            alt={`${creator.name} profile`}
            className="w-full h-full object-cover object-center"
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading="lazy"
          />
        </>
      ) : (
        <>
          {/* Video element with fallback in case it fails to load */}
          <video
            ref={videoRef}
            className="w-full h-full object-cover object-center"
            onError={() => setImageError(true)}
            onLoadedData={handleVideoLoad}
            autoPlay
            muted
            loop
            playsInline
            data-src={media.src}
          />
          {/* Fallback image that shows while video is loading */}
          {!isVideoLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse" aria-hidden="true" />
          )}
        </>
      )}
      <div 
        className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none" 
        aria-hidden="true"
      />
    </div>
  );
};
