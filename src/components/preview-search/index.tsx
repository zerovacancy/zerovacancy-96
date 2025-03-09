
import React, { useRef, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { PreviewCard } from './PreviewCard';
import { PreviewHeader } from './PreviewHeader';
import { PreviewContent } from './PreviewContent';
import { useIsMobile } from '@/hooks/use-mobile';
import type { AvailabilityStatus } from '../creator/types';

const PreviewSearch = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const isMobile = useIsMobile();
  
  const handleImageLoad = (imagePath: string) => {
    setLoadedImages(prev => new Set([...prev, imagePath]));
  };

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
  };

  const creatorData = [
    {
      name: "Emily Johnson",
      services: ["Photography", "Virtual Staging"],
      price: 150,
      rating: 4.9,
      reviews: 127,
      location: "New York, NY",
      image: "/newemilyprofile.jpg",
      workExamples: ["/1-d2e3f802.jpg"],
      availabilityStatus: 'available-now' as AvailabilityStatus
    }, 
    {
      name: "Jane Cooper",
      services: ["Video Tours", "Drone Footage"],
      price: 200,
      rating: 4.8,
      reviews: 98,
      location: "Los Angeles, CA",
      image: "/janeprofile.png",
      workExamples: ["/janesub.jpg", "/janesub2.png", "/janesub3.webp"],
      availabilityStatus: 'available-tomorrow' as AvailabilityStatus
    }, 
    {
      name: "Michael Brown",
      services: ["3D Tours", "Floor Plans"],
      price: 175,
      rating: 4.7,
      reviews: 82,
      location: "Chicago, IL",
      image: "/emily profile.jpeg",
      workExamples: ["/1-d2e3f802.jpg"],
      availabilityStatus: 'premium-only' as AvailabilityStatus
    }
  ];

  return (
    <div className="w-full px-4 py-8">
      <div className="mx-auto max-w-7xl">
        {isMobile ? (
          // Mobile version - simplified card
          <div className="bg-white rounded-xl p-4 shadow-md">
            <PreviewHeader 
              title="FIND YOUR CREATIVE COLLABORATOR"
              subtitle="Because extraordinary spaces deserve extraordinary storytellers"
            />
            <PreviewContent 
              isVisible={true}
              loadedImages={loadedImages}
              handleImageLoad={handleImageLoad}
              creatorData={creatorData}
              locationValue={selectedLocation}
              onLocationSelect={handleLocationSelect}
            />
          </div>
        ) : (
          // Desktop version - with effects
          <div className="relative group">
            <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-purple-800/25 via-indigo-700/30 to-purple-900/25 blur-sm opacity-80 group-hover:opacity-90 group-hover:blur-md"></div>
            <PreviewCard isVisible={true}>
              <PreviewHeader 
                title="FIND YOUR CREATIVE COLLABORATOR"
                subtitle="Because extraordinary spaces deserve extraordinary storytellers"
              />
              <PreviewContent 
                isVisible={true}
                loadedImages={loadedImages}
                handleImageLoad={handleImageLoad}
                creatorData={creatorData}
                locationValue={selectedLocation}
                onLocationSelect={handleLocationSelect}
              />
            </PreviewCard>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviewSearch;
