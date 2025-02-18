
import React, { useState } from 'react';
import { Search, MapPin, Calendar } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { FeaturesSectionWithHoverEffects } from './Features';
import { Pricing } from './Pricing';
import { BackgroundGradient } from './ui/background-gradient';
import { GlowingEffect } from './ui/glowing-effect';
import { cn } from '@/lib/utils';
import { CreatorCard } from './creator/CreatorCard';
import { SortMenu } from './sorting/SortMenu';

const creators = [
  {
    name: 'Jane Cooper',
    services: ['Photography', 'Videography'],
    price: 499,
    rating: 4.8,
    reviews: 120,
    location: 'New York, NY',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&h=500',
    workExamples: [
      'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=500&h=500',
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=500&h=500',
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=500&h=500',
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
  },
  {
    name: 'Michael Brown',
    services: ['Photography', 'Retouching'],
    price: 799,
    rating: 4.6,
    reviews: 80,
    location: 'Houston, TX',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&h=500',
    workExamples: [
      'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=500&h=500',
      'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=500&h=500',
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=500&h=500',
    ],
  },
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

  const sortOptions = [
    { label: 'Rating', value: 'rating' },
    { label: 'Price: Low to High', value: 'price_asc' },
    { label: 'Price: High to Low', value: 'price_desc' },
    { label: 'Distance', value: 'distance' }
  ];

  const handleSort = (value: string) => {
    setSortBy(value);
    // Add sorting logic here
  };

  return (
    <section className="relative section-padding overflow-hidden py-[21px] my-0">
      <div className="relative mx-auto max-w-7xl my-0 py-[28px]">
        <div className="mx-4 sm:mx-0 mb-8">
          <div className="relative">
            <Card className="p-6 sm:p-8 md:p-10 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Featured Creators</h2>
                <SortMenu 
                  options={sortOptions}
                  onSort={handleSort}
                  defaultValue={sortBy}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {creators.map((creator, index) => (
                  <CreatorCard
                    key={index}
                    creator={creator}
                    onImageLoad={onImageLoad}
                    loadedImages={loadedImages}
                    imageRef={imageRef}
                  />
                ))}
              </div>
            </Card>
            <GlowingEffect disabled={false} spread={30} borderWidth={2} />
          </div>
        </div>
      </div>

      <FeaturesSectionWithHoverEffects />
      <Pricing />
    </section>
  );
};

export default PreviewSearch;
