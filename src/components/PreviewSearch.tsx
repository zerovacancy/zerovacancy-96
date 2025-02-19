
import React, { useState } from 'react';
import { Card } from './ui/card';
import { useIsMobile } from '@/hooks/use-mobile';
import { FeaturesSectionWithHoverEffects } from './Features';
import { Pricing } from './Pricing';
import { GlowingEffect } from './ui/glowing-effect';
import { SearchHeader } from './search/SearchHeader';
import { SearchBar } from './search/SearchBar';
import { CreatorsList } from './search/CreatorsList';

const creators = [
  {
    name: 'Jane Cooper',
    services: ['Photography', 'Videography'],
    price: 499,
    rating: 4.8,
    reviews: 120,
    location: 'New York, NY',
    image: 'https://aerialsoutheast.com/wp-content/uploads/2023/07/1201Demon120816_038-950x533-1-950x500.jpg',
    workExamples: [
      '/janesub.jpg',
      '/janesub2.png',
      '/janesub3.webp',
    ],
  },
  {
    name: 'John Smith',
    services: ['Photography', 'Drone'],
    price: 599,
    rating: 4.9,
    reviews: 150,
    location: 'Los Angeles, CA',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&h=500',
    workExamples: [
      'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=500&h=500',
      'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=500&h=500',
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=500&h=500',
    ],
  },
  {
    name: 'Emily Johnson',
    services: ['Videography', 'Editing'],
    price: 699,
    rating: 4.7,
    reviews: 100,
    location: 'Chicago, IL',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=500&h=500',
    workExamples: [
      'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=500&h=500',
      'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=500&h=500',
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=500&h=500',
    ],
  }
];

const PreviewSearch = () => {
  const isMobile = useIsMobile();
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [sortBy, setSortBy] = useState('rating');

  const imageObserver = React.useRef<IntersectionObserver | null>(null);

  React.useEffect(() => {
    imageObserver.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            const src = img.dataset.src;
            if (src && !loadedImages.has(src)) {
              img.src = src;
              onImageLoad(src);
            }
            imageObserver.current?.unobserve(img);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );

    return () => {
      imageObserver.current?.disconnect();
    };
  }, [loadedImages]);

  const imageRef = (node: HTMLImageElement | null) => {
    if (node) {
      imageObserver.current?.observe(node);
    }
  };

  const onImageLoad = (imageSrc: string) => {
    setLoadedImages((prev) => new Set(prev.add(imageSrc)));
  };

  const handleSort = (value: string) => {
    setSortBy(value);
  };

  return (
    <>
      <section className="relative section-padding overflow-hidden py-4 sm:py-8 my-0">
        <div className="relative mx-auto max-w-7xl my-0 py-4 sm:py-8">
          <div className="mx-2 sm:mx-6 md:mx-0 mb-8">
            <div className="relative">
              <Card className="p-3 sm:p-6 md:p-8 lg:p-10 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/75 shadow-lg border border-white/20 rounded-xl">
                <SearchHeader />
                <div className="my-4 sm:my-6 md:my-8">
                  <SearchBar />
                </div>
                <div className="mt-4 sm:mt-6 md:mt-8">
                  <CreatorsList 
                    creators={creators}
                    sortBy={sortBy}
                    onSort={handleSort}
                    onImageLoad={onImageLoad}
                    loadedImages={loadedImages}
                    imageRef={imageRef}
                  />
                </div>
              </Card>
              <GlowingEffect disabled={false} spread={30} borderWidth={2} />
            </div>
          </div>
        </div>
      </section>

      <FeaturesSectionWithHoverEffects />
      <Pricing />
    </>
  );
};

export default PreviewSearch;
