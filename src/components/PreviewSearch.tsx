
import React, { useState } from 'react';
import { Search, MapPin, Calendar, ChevronDown, Star } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { FeaturesSectionWithHoverEffects } from './Features';
import { PricingSection } from './Pricing';
import { BackgroundGradient } from './ui/background-gradient';
import { GlowingEffect } from './ui/glowing-effect';
import { AuroraBackground } from './ui/aurora-background';

const PreviewSearch = () => {
  const creators = [/* ... keep existing code (creators array) */];

  return (
    <AuroraBackground className="min-h-screen py-[22px]">
      <div className="relative mx-auto max-w-7xl my-0 py-[28px]">
        <div className="mx-4 sm:mx-0 mb-12">
          <div className="relative">
            <Card className="p-6 bg-white shadow-md">
              <h2 className="text-3xl font-semibold text-center mb-3">Discover Local Creators</h2>
              <p className="text-muted-foreground text-center mb-8">
                Connect with professional photographers, videographers, and content creators in your area
              </p>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="flex items-center space-x-3 bg-secondary rounded-lg px-4 py-2">
                  <MapPin className="w-5 h-5 text-gray-500" />
                  <input type="text" placeholder="Location" className="flex-1 bg-transparent border-none outline-none focus:ring-0 text-sm" />
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
                  <input type="text" placeholder="mm/dd/yyyy" className="flex-1 bg-transparent border-none outline-none focus:ring-0 text-sm" />
                </div>

                <Button className="w-full h-10 bg-primary text-white hover:bg-primary/90">
                  Find Creators
                </Button>
              </div>

              <div className="flex items-center justify-center mt-4 pt-4 border-t">
                <div className="flex items-center gap-2">
                  <button className="text-sm text-muted-foreground hover:text-primary flex items-center gap-2">
                    Advanced Filters
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <span className="px-2 py-0.5 text-xs font-medium bg-accent text-accent-foreground rounded">PRO</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                {creators.map((creator, index) => <Card key={index} className="group overflow-hidden">
                    <div className="relative">
                      <div className="absolute top-3 right-3 z-10">
                        <span className="px-3 py-1 text-sm font-medium bg-black/60 text-white rounded-full">
                          From ${creator.price}
                        </span>
                      </div>
                      <div className="relative aspect-[4/3]">
                        <img src={creator.image} alt={creator.name} className="w-full h-full object-cover" />
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
                  </Card>)}
              </div>
            </Card>
            <GlowingEffect disabled={false} spread={30} borderWidth={2} />
          </div>
        </div>
      </div>

      <FeaturesSectionWithHoverEffects />
      <PricingSection />
    </AuroraBackground>
  );
};

export default PreviewSearch;
