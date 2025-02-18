
import React from 'react';
import { Card } from "@/components/ui/card";
import { IconCamera, IconDrone, IconCheck } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Particles } from "@/components/ui/particles";

const HowItWorksSection = () => {
  return (
    <section className="relative overflow-hidden py-[76px]">
      <div className="absolute inset-0 -z-10 bg-[#060606]">
        <Particles
          className="h-full"
          quantity={50}
          staticity={30}
          ease={30}
          color="#ffffff"
        />
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">
            Get professional real estate visuals in three simple steps
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          <Card className="bg-secondary">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-accent text-primary mb-4 mx-auto">
              <IconCamera size={32} />
            </div>
            <h3 className="text-xl font-semibold text-center mb-2">
              1. Book a Photoshoot
            </h3>
            <p className="text-muted-foreground text-center">
              Schedule a convenient time for our photographers to capture your
              property.
            </p>
          </Card>
          <Card className="bg-secondary">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-accent text-primary mb-4 mx-auto">
              <IconDrone size={32} />
            </div>
            <h3 className="text-xl font-semibold text-center mb-2">
              2. Capture Stunning Visuals
            </h3>
            <p className="text-muted-foreground text-center">
              Our skilled team uses the latest equipment to create high-quality
              photos and videos.
            </p>
          </Card>
          <Card className="bg-secondary">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-accent text-primary mb-4 mx-auto">
              <IconCheck size={32} />
            </div>
            <h3 className="text-xl font-semibold text-center mb-2">
              3. Receive Your Media
            </h3>
            <p className="text-muted-foreground text-center">
              Receive your professionally edited photos and videos ready to
              showcase your property.
            </p>
          </Card>
        </div>
        <div className="mt-12 text-center">
          <Button size="lg">Get Started Today</Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
