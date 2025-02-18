import React, { useState } from 'react';
import { Search, MapPin, Calendar, ChevronDown, Star, Image } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { FeaturesSectionWithHoverEffects } from './Features';
import { Pricing } from './Pricing';
import { BackgroundGradient } from './ui/background-gradient';
import { GlowingEffect } from './ui/glowing-effect';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
const creators = [{
  name: "Sarah Johnson",
  services: ["Photography", "Drone"],
  price: 200,
  rating: 4.9,
  reviews: 124,
  location: "New York, NY",
  image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&h=500",
  workExamples: ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&h=600", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&h=600", "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&h=600"]
}, {
  name: "Michael Chen",
  services: ["Videography", "Editing"],
  price: 250,
  rating: 4.8,
  reviews: 98,
  location: "Los Angeles, CA",
  image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&h=500",
  workExamples: ["https://images.unsplash.com/photo-1600607687644-05f5f91428f9?auto=format&fit=crop&w=800&h=600", "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&h=600", "https://images.unsplash.com/photo-1600585154363-67eb9e684b16?auto=format&fit=crop&w=800&h=600"]
}, {
  name: "Emily Rodriguez",
  services: ["3D Tours", "Photography"],
  price: 300,
  rating: 5.0,
  reviews: 156,
  location: "Miami, FL",
  image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=500&h=500",
  workExamples: ["https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=800&h=600", "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=800&h=600", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&h=600"]
}];
const PreviewSearch = () => {
  const isMobile = useIsMobile();

  return (
    <section className="relative section-padding overflow-hidden py-[21px] my-0">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white 
        [background-image:linear-gradient(to_right,rgba(176,108,234,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(176,108,234,0.2)_1px,transparent_1px)]
        [background-size:6rem_4rem]
        [mask-image:radial-gradient(ellipse_at_center,white,transparent)]
        before:absolute before:inset-0
        before:bg-[radial-gradient(circle_at_center,#4F46E5,transparent)]
        before:opacity-40
        after:absolute after:h-full after:w-full
        after:[background:linear-gradient(to_right,#4F46E5,#EC4899)]
        after:opacity-20 after:animate-aurora">
      </div>

      <div className="relative mx-auto max-w-7xl my-0 py-[28px]">
        <div className="mx-4 sm:mx-0 mb-8">
          <div className="relative">
            <Card className="p-6 sm:p-8 md:p-10 bg-white shadow-md">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center mb-4 sm:mb-6">
                Discover Local Creators
              </h2>
              <p className="text-muted-foreground text-center text-base sm:text-lg mb-8 sm:mb-10 max-w-2xl mx-auto">
                Connect with professional photographers, videographers, and content creators in your area
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="flex items-center space-x-3 bg-secondary/80 hover:bg-secondary rounded-lg px-5 py-4 transition-colors duration-200">
                  <MapPin className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  <input 
                    type="text" 
                    placeholder="Location" 
                    className="flex-1 bg-transparent border-none outline-none focus:ring-0 text-base placeholder:text-muted-foreground/70" 
                  />
                </div>

                <div className="flex items-center space-x-3 bg-secondary/80 hover:bg-secondary rounded-lg px-5 py-4 transition-colors duration-200">
                  <Search className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  <select className="flex-1 bg-transparent border-none outline-none focus:ring-0 text-base appearance-none cursor-pointer">
                    <option value="">Content Type</option>
                    <option value="photography">Photography</option>
                    <option value="videography">Videography</option>
                    <option value="3d-tours">3D Tours</option>
                  </select>
                </div>

                <div className="flex items-center space-x-3 bg-secondary/80 hover:bg-secondary rounded-lg px-5 py-4 transition-colors duration-200">
                  <Calendar className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  <input 
                    type="text" 
                    placeholder="mm/dd/yyyy" 
                    className="flex-1 bg-transparent border-none outline-none focus:ring-0 text-base placeholder:text-muted-foreground/70" 
                  />
                </div>

                <Button className="w-full h-[52px] bg-primary text-white hover:bg-primary/90 text-base font-medium shadow-sm">
                  Find Creators
                </Button>
              </div>

              <div className="flex items-center justify-center pt-4 border-t">
                <button className="text-base text-muted-foreground hover:text-primary flex items-center gap-2 py-3 px-4 transition-colors duration-200">
                  Advanced Filters
                  <ChevronDown className="w-4 h-4" />
                </button>
                <span className="ml-2 px-2.5 py-1 text-sm font-medium bg-accent rounded-md">PRO</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                {creators.map((creator, index) => (
                  <div key={index} className="group">
                    <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px]">
                      <div className="relative">
                        <div className="absolute top-4 right-4 z-10">
                          <span className="px-3 py-1.5 text-sm font-medium bg-black/70 text-white rounded-full shadow-sm backdrop-blur-sm">
                            From ${creator.price}
                          </span>
                        </div>
                        <div className="relative aspect-[4/3]">
                          <img 
                            src={creator.image} 
                            alt={creator.name} 
                            className="w-full h-full object-cover object-center" 
                            loading="lazy" 
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                          <div className="absolute bottom-4 left-4 text-white">
                            <h3 className="font-semibold text-xl mb-1">{creator.name}</h3>
                            <div className="flex items-center gap-1.5 text-sm text-white/90">
                              <MapPin className="w-4 h-4" />
                              <span>{creator.location}</span>
                            </div>
                            <p className="text-sm text-white/90 mt-1">
                              {creator.services.join(" • ")}
                            </p>
                          </div>
                        </div>
                        
                        <div className="p-5 space-y-5">
                          <div className="flex items-center gap-2 justify-between">
                            <div className="flex items-center gap-2">
                              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                              <span className="text-base font-medium">{creator.rating}</span>
                              <span className="text-sm text-muted-foreground">
                                ({creator.reviews} reviews)
                              </span>
                            </div>
                            <Button 
                              variant="outline" 
                              size="default" 
                              className="text-sm px-4 py-2 h-10 hover:bg-primary hover:text-white transition-colors duration-200"
                            >
                              Contact
                            </Button>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-3">
                            {creator.workExamples.map((example, i) => (
                              <Dialog key={i}>
                                <DialogTrigger asChild>
                                  <button className="relative aspect-square w-full overflow-hidden rounded-lg hover:ring-2 hover:ring-primary/50 transition-all duration-300">
                                    <img 
                                      src={example} 
                                      alt={`${creator.name}'s work ${i + 1}`} 
                                      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105" 
                                      loading="lazy" 
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                      <Image className="w-5 h-5 text-white" />
                                    </div>
                                  </button>
                                </DialogTrigger>
                                <DialogContent className={cn("max-w-3xl w-[95vw] p-4", isMobile ? "h-[90vh]" : "")}>
                                  <div className={cn("w-full h-full", isMobile ? "flex items-center justify-center" : "aspect-[4/3]")}>
                                    <img 
                                      src={example} 
                                      alt={`${creator.name}'s work ${i + 1}`} 
                                      className="object-contain w-full h-full rounded-lg" 
                                    />
                                  </div>
                                </DialogContent>
                              </Dialog>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
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
