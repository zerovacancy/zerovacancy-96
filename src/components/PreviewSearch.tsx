
import React, { useState, useRef } from 'react';
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
    image: '/janeprofile.png',
    workExamples: ['/janesub.jpg', '/janesub2.png', '/janesub3.webp'],
  },
  {
    name: 'John Smith',
    services: ['Photography', 'Drone'],
    price: 599,
    rating: 4.9,
    reviews: 150,
    location: 'Los Angeles, CA',
    image: '/1-d2e3f802.jpg',
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
    image: '/pov apt.jpg',
    workExamples: [
      'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=500&h=500',
      'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=500&h=500',
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=500&h=500',
    ],
  }
];

const PreviewSearch: React.FC = () => {
  const isMobile = useIsMobile();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [loadedImages, setLoadedImages] = useState(new Set<string>());
  const imageRefs = useRef<Map<string, HTMLImageElement>>(new Map());

  const handleImageLoad = (imageSrc: string) => {
    setLoadedImages(prev => new Set(prev).add(imageSrc));
  };

  const handleSort = (value: string) => {
    setSortBy(value);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredCreators = creators.filter(creator =>
    creator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    creator.services.some(service => service.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const sortedCreators = [...filteredCreators].sort((a, b) => {
    if (sortBy === 'rating') {
      return b.rating - a.rating;
    } else if (sortBy === 'price_asc') {
      return a.price - b.price;
    } else if (sortBy === 'price_desc') {
      return b.price - a.price;
    }
    return 0;
  });

  const setImageRef = (el: HTMLImageElement | null) => {
    if (el) {
      const key = el.src;
      if (!imageRefs.current.has(key)) {
        imageRefs.current.set(key, el);
      }
    }
  };

  return (
    <section id="search" className="container section-sm">
      <GlowingEffect className="bg-blue-600/20 absolute -left-24 top-1/2 -translate-y-1/2 blur-3xl opacity-50 w-[32rem] h-[32rem] md:block" />
      <div className="relative">
        <Card className="overflow-hidden bg-white/50 backdrop-blur-sm border border-gray-100/50 shadow-sm">
          <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
            <div className="flex flex-col gap-4">
              <SearchHeader />
              <SearchBar onChange={handleSearchChange} value={searchQuery} />
            </div>

            {/* Subtle separator */}
            <div className="h-px bg-gray-100/70 w-full my-2" />

            <CreatorsList
              creators={sortedCreators}
              sortBy={sortBy}
              onSort={handleSort}
              onImageLoad={handleImageLoad}
              loadedImages={loadedImages}
              imageRef={setImageRef}
            />
          </div>
        </Card>
      </div>
    </section>
  );
};

export default PreviewSearch;
