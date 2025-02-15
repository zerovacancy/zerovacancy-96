
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, MapPin } from "lucide-react";

const FeaturedCreators = () => {
  const creators = [
    {
      name: "Sarah Johnson",
      services: ["Photography", "Drone"],
      location: "New York, NY",
      rating: 4.9,
      reviews: 124,
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
    },
    // ... more creators
  ];

  return (
    <section className="section-padding bg-background">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-3xl font-bold text-center mb-4">
          Top-Rated Creators in Your Area
        </h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Work with the most talented real estate content creators in your region
        </p>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {creators.map((creator, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <Card className="group hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-0">
                    <div className="relative aspect-square">
                      <img
                        src={creator.image}
                        alt={creator.name}
                        className="w-full h-full object-cover rounded-t-lg"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-t-lg" />
                      <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="font-semibold text-lg">{creator.name}</h3>
                        <p className="text-sm opacity-90">{creator.services.join(" | ")}</p>
                      </div>
                    </div>
                    <div className="p-4 space-y-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{creator.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 fill-primary text-primary" />
                        <span className="font-medium">{creator.rating}</span>
                        <span className="text-sm text-muted-foreground">({creator.reviews} reviews)</span>
                      </div>
                      <Button className="w-full">View Profile</Button>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};

export default FeaturedCreators;
