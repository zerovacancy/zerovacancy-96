
import React, { useState } from 'react';
import { Camera, Drone, Video, Instagram, UserCheck, Clock, CreditCard, Award } from 'lucide-react';
import { cn } from '@/lib/utils';

const ServiceCard = ({ 
  icon: Icon, 
  title, 
  description, 
  isExpanded, 
  onToggle 
}: { 
  icon: React.ElementType;
  title: string;
  description: string;
  isExpanded: boolean;
  onToggle: () => void;
}) => {
  return (
    <button 
      onClick={onToggle}
      className={cn(
        "w-full text-left p-6 rounded-xl transition-all duration-200",
        "relative backdrop-blur-sm border border-white/10",
        isExpanded ? 'bg-white/50 shadow-sm' : 'bg-white/30 hover:bg-white/40',
        "md:hover:shadow-md md:h-full"
      )}
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <Icon className="w-6 h-6 text-primary/80" />
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-lg text-primary">{title}</h3>
          <div className={cn(
            "mt-2 text-muted-foreground text-sm transition-all duration-200",
            "overflow-hidden",
            isExpanded ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0 md:max-h-48 md:opacity-100'
          )}>
            {description}
          </div>
        </div>
      </div>
    </button>
  );
};

const ServicesSection = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const services = [
    {
      id: 1,
      icon: Camera,
      title: 'Professional Photography',
      description: 'High-quality, professionally edited real estate photography that showcases properties at their best.'
    },
    {
      id: 2,
      icon: Drone,
      title: 'Drone Aerial Coverage',
      description: 'FAA-certified drone operators capturing stunning aerial views and property surroundings.'
    },
    {
      id: 3,
      icon: Video,
      title: 'Video Production',
      description: 'Cinematic property tours and promotional videos that tell your property's unique story.'
    },
    {
      id: 4,
      icon: Instagram,
      title: 'Social Media Content',
      description: 'Engaging content optimized for all major social platforms and marketing channels.'
    },
    {
      id: 5,
      icon: UserCheck,
      title: 'Verified Creators',
      description: 'Every creator is thoroughly vetted and verified for quality and professionalism.'
    },
    {
      id: 6,
      icon: Clock,
      title: '24/7 Availability',
      description: 'Book creators any time, with flexible scheduling to meet your deadlines.'
    },
    {
      id: 7,
      icon: CreditCard,
      title: 'Transparent Pricing',
      description: 'Clear, upfront pricing with no hidden fees. Pay only for what you need.'
    },
    {
      id: 8,
      icon: Award,
      title: 'Quality Guaranteed',
      description: '100% satisfaction guarantee on all content. Your property deserves the best.'
    }
  ];

  return (
    <section className="relative py-16 px-4 md:py-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 h-full w-full 
        [background-image:linear-gradient(to_right,rgba(176,108,234,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(176,108,234,0.1)_1px,transparent_1px)]
        [background-size:6rem_4rem]
        [mask-image:radial-gradient(ellipse_at_center,white,transparent)]
        before:absolute before:inset-0
        before:bg-[radial-gradient(circle_at_center,#4F46E5,transparent)]
        before:opacity-30
        after:absolute after:h-full after:w-full
        after:[background:linear-gradient(to_right,#4F46E5,#EC4899)]
        after:opacity-10 after:animate-aurora" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif text-primary mb-4">
            Professional Content Creation Services
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need to showcase your properties with stunning visuals and engaging content
          </p>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              {...service}
              isExpanded={true}
              onToggle={() => {}}
            />
          ))}
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden space-y-3">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              {...service}
              isExpanded={expandedId === service.id}
              onToggle={() => setExpandedId(expandedId === service.id ? null : service.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
