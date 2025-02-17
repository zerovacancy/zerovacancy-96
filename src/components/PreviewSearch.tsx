
import React, { useState } from 'react';
import { Search, MapPin, Calendar, ChevronDown, Star } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { FeaturesSectionWithHoverEffects } from './Features';
import { PricingSection } from './Pricing';
import { BackgroundGradient } from './ui/background-gradient';

const PreviewSearch = () => {
  const creators = [
    {
      name: "Sarah Johnson",
      services: ["Photography", "Drone"],
      price: 200,
      rating: 4.9,
      reviews: 124,
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&h=500"
    },
    {
      name: "Michael Chen",
      services: ["Videography", "Editing"],
      price: 250,
      rating: 4.8,
      reviews: 98,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&h=500"
    },
    {
      name: "Emily Rodriguez",
      services: ["3D Tours", "Photography"],
      price: 300,
      rating: 5.0,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=500&h=500"
    },
    {
      name: "David Kim",
      services: ["Photography", "Virtual Staging"],
      price: 180,
      rating: 4.7,
      reviews: 87,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&h=500"
    }
  ];

  return (
    <section className="relative section-padding py-[22px] bg-white">
      <div className="relative mx-auto max-w-7xl my-0 py-[28px]">
        <div className="mx-4 sm:mx-0 mb-12">
          <h2 className="text-3xl font-semibold text-center mb-3">Discover Local Creators</h2>
          <p className="text-muted-foreground text-center mb-8">
            Connect with professional photographers, videographers, and content creators in your area
          </p>

          <Card className="p-6 bg-white shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="flex items-center space-x-3 bg-secondary rounded-lg px-4 py-2">
                <MapPin className="w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  placeholder="Location"
                  className="flex-1 bg-transparent border-none outline-none focus:ring-0 text-sm"
                />
              </div>

              <div className="flex items-center space-x-3 bg-secondary rounded-lg px-4 py-2">
                <Search className="w-5 h-5 text-gray-500" />
                <select className="flex-1 bg-transparent border-none outline-none focus:ring-0 text-sm">
                  <option>Content Type</option>
                  <option>Photography</option>
                  <option>Videography</option>
                  <option>3D Tours</option>
                </select>
              </div>

              <div className="flex items-center space-x-3 bg-secondary rounded-lg px-4 py-2">
                <Calendar className="w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  placeholder="mm/dd/yyyy"
                  className="flex-1 bg-transparent border-none outline-none focus:ring-0 text-sm"
                />
              </div>

              <Button className="w-full h-10 bg-primary text-white hover:bg-primary/90">
                Find Creators
              </Button>
            </div>

            <div className="flex items-center justify-between mt-4 pt-4 border-t">
              <button className="text-sm text-muted-foreground hover:text-primary flex items-center gap-2">
                Advanced Filters
                <ChevronDown className="w-4 h-4" />
              </button>
              <span className="px-2 py-1 text-xs font-medium bg-accent text-accent-foreground rounded">PRO</span>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-4 sm:mx-0">
          {creators.map((creator, index) => (
            <Card key={index} className="group overflow-hidden">
              <div className="relative">
                <div className="absolute top-3 right-3 z-10">
                  <span className="px-3 py-1 text-sm font-medium bg-black/60 text-white rounded-full">
                    From ${creator.price}
                  </span>
                </div>
                <div className="relative aspect-[4/3]">
                  <img
                    src={creator.image}
                    alt={creator.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="font-semibold text-lg">{creator.name}</h3>
                    <p className="text-sm opacity-90">{creator.services.join(" • ")}</p>
                  </div>
                </div>
                <div className="p-4 space-y-4">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{creator.rating}</span>
                    <span className="text-sm text-muted-foreground">({creator.reviews} reviews)</span>
                  </div>
                  <Button variant="default" className="w-full bg-primary text-white hover:bg-primary/90">
                    View Profile
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <FeaturesSectionWithHoverEffects />
      <PricingSection />
    </section>
  );
};

export default PreviewSearch;
