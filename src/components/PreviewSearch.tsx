
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
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=500&h=500',
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
  const [imageElements, setImageElements] = useState<HTMLImageElement[]>([])

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
    if (!el) return;
    setImageElements(prev => [...prev, el])
  }

  return (
    <section id="search" className="container section-sm">
      <GlowingEffect className="bg-blue-600/20 absolute -left-24 top-1/2 -translate-y-1/2 blur-3xl opacity-50 w-[32rem] h-[32rem] md:block" />
      <div className="relative grid items-center gap-8">
        <div className="flex flex-col gap-3">
          <SearchHeader />
          <SearchBar onChange={handleSearchChange} value={searchQuery} />
        </div>
        <CreatorsList
          creators={sortedCreators}
          sortBy={sortBy}
          onSort={handleSort}
          onImageLoad={handleImageLoad}
          loadedImages={loadedImages}
          imageRef={setImageRef}
        />
      </div>
    </section>
  );
};

export default PreviewSearch;
