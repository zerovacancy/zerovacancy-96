
import React, { Suspense, lazy, useState, useEffect } from 'react';
import { SearchBar } from './search/SearchBar';
import { AuroraBackground } from './ui/aurora-background';

// Lazy load the CreatorsList component
const CreatorsList = lazy(() => import('./search/CreatorsList'));

// Placeholder loading component
const ListLoading = () => (
  <div className="w-full px-4 py-6 sm:px-8 sm:py-8">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
      {[1, 2, 3].map((i) => (
        <div key={i} className="rounded-xl bg-gray-200 h-[400px] animate-pulse" />
      ))}
    </div>
  </div>
);

const PreviewSearch = () => {
  const [mounted, setMounted] = useState(false);
  
  // Only mount component after initial render to improve first load performance
  useEffect(() => {
    setMounted(true);
  }, []);
  
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <div className="mx-auto">
        <div className="rounded-xl overflow-hidden shadow-lg border border-gray-100 bg-white">
          <AuroraBackground className="min-h-0 w-full" showRadialGradient={false}>
            {/* Title and subtitle */}
            <div className="text-center pt-8 pb-6 sm:pt-10 sm:pb-8 w-full">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-3 sm:mb-4">Discover Featured Creators</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto px-4">
                Find the perfect professional for your property content needs
              </p>
            </div>
            
            <div className="w-full px-4 py-4 sm:px-8 sm:py-6 border-b">
              <SearchBar onLocationSelect={() => {}} />
            </div>
          
            {/* Wrap CreatorsList in Suspense for better loading performance */}
            <Suspense fallback={<ListLoading />}>
              {mounted && (
                <CreatorsList 
                  creators={[
                    {
                      name: "Emily Johnson",
                      services: ["Photography", "Virtual Staging"],
                      price: 150,
                      rating: 4.9,
                      reviews: 127,
                      location: "New York, NY",
                      image: "/newemilyprofile.jpg",
                      workExamples: ["/1-d2e3f802.jpg"]
                    },
                    {
                      name: "Jane Cooper",
                      services: ["Video Tours", "Drone Footage"],
                      price: 200,
                      rating: 4.8,
                      reviews: 98,
                      location: "Los Angeles, CA",
                      image: "/janeprofile.png",
                      workExamples: ["/janesub.jpg", "/janesub2.png", "/janesub3.webp"]
                    },
                    {
                      name: "Michael Brown",
                      services: ["3D Tours", "Floor Plans"],
                      price: 175,
                      rating: 4.7,
                      reviews: 82,
                      location: "Chicago, IL",
                      image: "/emily profile.jpeg",
                      workExamples: ["/1-d2e3f802.jpg"]
                    }
                  ]}
                  sortBy="rating"
                  onSort={() => {}}
                  onImageLoad={() => {}}
                  loadedImages={new Set()}
                  imageRef={() => {}}
                />
              )}
            </Suspense>
          </AuroraBackground>
        </div>
      </div>
    </div>
  );
};

export default PreviewSearch;
