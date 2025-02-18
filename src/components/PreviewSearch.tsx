
import React, { useState, useCallback, useRef } from 'react';
import { Search, MapPin, Calendar, ChevronDown, Star } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { FeaturesSectionWithHoverEffects } from './Features';
import { Pricing } from './Pricing';
import { BackgroundGradient } from './ui/background-gradient';
import { GlowingEffect } from './ui/glowing-effect';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

const creators = [
  {
    id: 1,
    name: 'John Doe',
    location: 'New York, USA',
    availability: 'Available Now',
    rating: 4.5,
    imageUrl: '/placeholder-image.webp',
    profileUrl: '/johndoe',
    services: ['Photography', 'Videography'],
  },
  {
    id: 2,
    name: 'Jane Smith',
    location: 'Los Angeles, USA',
    availability: 'Available Next Week',
    rating: 4.8,
    imageUrl: '/placeholder-image.webp',
    profileUrl: '/janesmith',
    services: ['Drone Photography', '3D Tours'],
  },
  {
    id: 3,
    name: 'Alice Johnson',
    location: 'London, UK',
    availability: 'Available in 2 Weeks',
    rating: 4.2,
    imageUrl: '/placeholder-image.webp',
    profileUrl: '/alicejohnson',
    services: ['Photography', 'Social Media Content'],
  },
  {
    id: 4,
    name: 'Bob Williams',
    location: 'Sydney, Australia',
    availability: 'Available Next Month',
    rating: 4.9,
    imageUrl: '/placeholder-image.webp',
    profileUrl: '/bobwilliams',
    services: ['Videography', 'Drone Photography'],
  },
];

const PreviewSearch = () => {
  const isMobile = useIsMobile();
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  const handleImageIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      const target = entry.target as HTMLImageElement;
      if (entry.isIntersecting && target.dataset.src) {
        setLoadedImages((prev) => new Set([...prev, target.dataset.src as string]));
      }
    });
  }, []);

  const imageObserver = useRef(
    typeof window !== 'undefined'
      ? new IntersectionObserver(handleImageIntersection, { rootMargin: '50px' })
      : null
  );

  const observeImage = useCallback((node: HTMLImageElement | null) => {
    const currentObserver = imageObserver.current;
    if (node && currentObserver) {
      currentObserver.observe(node);
      return () => {
        currentObserver.unobserve(node);
      };
    }
  }, []);

  React.useEffect(() => {
    return () => {
      imageObserver.current?.disconnect();
    };
  }, []);

  return (
    <section className="py-12 sm:py-16 lg:py-20 relative overflow-hidden">
      <BackgroundGradient
        containerClassName="absolute inset-0 -z-10"
        className="bg-[radial-gradient(circle_farthest-side_at_0_100%,#E6E9F0,transparent),radial-gradient(circle_farthest-side_at_100%_0,#ffffff,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#eef1f5,transparent),radial-gradient(circle_farthest-side_at_0_0,#d7d2cc,#304352)]"
      />
      <GlowingEffect
        className="opacity-40"
        glow
        blur={30}
        spread={40}
      />
      <div className="container relative z-10">
        <div className="flex flex-col gap-8 sm:gap-10 lg:gap-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 sm:gap-4">
              <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">
                Find Your Perfect Creator
              </h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="secondary" size="sm">
                    <Search className="w-4 h-4 mr-2" />
                    Advanced Search
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <div className="grid gap-4">
                    <div className="text-lg font-semibold">Advanced Search</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Button variant="outline">Location <MapPin className="w-4 h-4 ml-2" /></Button>
                      <Button variant="outline">Date <Calendar className="w-4 h-4 ml-2" /></Button>
                      <Button variant="outline">Service <ChevronDown className="w-4 h-4 ml-2" /></Button>
                      <Button variant="outline">Rating <Star className="w-4 h-4 ml-2" /></Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <p className="text-sm sm:text-base text-muted-foreground max-w-md text-center sm:text-right px-4 sm:px-0">
              Browse top-rated creators specializing in photography, videography, and more.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 px-4 sm:px-6 lg:px-8">
            {creators.map((creator) => (
              <Card key={creator.id} className="overflow-hidden">
                <div className="relative">
                  <img
                    src={creator.imageUrl}
                    alt={`Preview of ${creator.name}`}
                    className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    style={{
                      opacity: loadedImages.has(creator.imageUrl) ? 1 : 0,
                      transition: 'opacity 0.5s ease-in-out',
                    }}
                    data-src={creator.imageUrl}
                    ref={observeImage}
                  />
                  {!loadedImages.has(creator.imageUrl) && (
                    <div className="absolute inset-0 bg-muted-foreground/10 animate-pulse" />
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-md sm:text-lg font-semibold mb-1 line-clamp-1">{creator.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-1">{creator.location}</p>
                  <p className="text-sm text-muted-foreground mt-2">{creator.availability}</p>
                  <Button asChild variant="link" className="mt-3">
                    <a href={creator.profileUrl}>View Profile</a>
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          <div className="px-4 sm:px-6 lg:px-8">
            <FeaturesSectionWithHoverEffects />
          </div>

          <div className="px-4 sm:px-6 lg:px-8">
            <Pricing />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PreviewSearch;
