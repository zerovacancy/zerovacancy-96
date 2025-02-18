
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Camera, Plane, Video, Instagram, UserCheck, Clock, CreditCard, Award } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const features = [{
  title: "Professional Photography",
  description: "High-quality, professionally edited real estate photography that showcases properties at their best.",
  icon: Camera
}, {
  title: "Drone Aerial Coverage",
  description: "FAA-certified drone operators capturing stunning aerial views and property surroundings.",
  icon: Plane
}, {
  title: "Video Production",
  description: "Cinematic property tours and promotional videos that tell your property's unique story.",
  icon: Video
}, {
  title: "Social Media Content",
  description: "Engaging content optimized for all major social platforms and marketing channels.",
  icon: Instagram
}, {
  title: "Verified Creators",
  description: "Every creator is thoroughly vetted and verified for quality and professionalism.",
  icon: UserCheck
}, {
  title: "24/7 Availability",
  description: "Book creators any time, with flexible scheduling to meet your deadlines.",
  icon: Clock
}, {
  title: "Transparent Pricing",
  description: "Clear, upfront pricing with no hidden fees. Pay only for what you need.",
  icon: CreditCard
}, {
  title: "Quality Guaranteed",
  description: "100% satisfaction guarantee on all content. Your property deserves the best.",
  icon: Award
}];

export function FeaturesSectionWithHoverEffects() {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-space text-3xl sm:text-4xl font-semibold mb-4">
            Professional Content Creation Services
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Everything you need to showcase your properties with stunning visuals and engaging content
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {features.map((feature, index) => (
            <Feature
              key={index}
              title={feature.title}
              description={feature.description}
              Icon={feature.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface FeatureProps {
  title: string;
  description: string;
  Icon: React.ComponentType<{ className?: string }>;
}

const Feature = ({ title, description, Icon }: FeatureProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isMobile = useIsMobile();
  
  const handleClick = () => {
    if (isMobile) {
      setIsExpanded(!isExpanded);
    }
  };
  
  return (
    <button
      className={cn(
        "w-full text-left",
        "rounded-xl transition-all duration-200",
        "bg-white/50 hover:bg-white/80",
        "border border-gray-200/50",
        "p-6",
        "group focus:outline-none focus:ring-2 focus:ring-primary/20",
        !isMobile && "hover:shadow-lg"
      )}
      onClick={handleClick}
      aria-expanded={isMobile ? isExpanded : undefined}
    >
      <div className="flex items-start gap-4">
        <Icon className={cn(
          "w-6 h-6 text-gray-700 shrink-0",
          "transition-transform duration-200",
          isMobile && isExpanded && "transform rotate-90"
        )} />
        <div>
          <h3 className={cn(
            "text-lg font-medium leading-6",
            "text-gray-900"
          )}>
            {title}
          </h3>
          <div className={cn(
            "overflow-hidden transition-[max-height,opacity] duration-200",
            isMobile && !isExpanded ? "max-h-0 opacity-0" : "max-h-32 opacity-100 mt-2"
          )}>
            <p className="text-sm text-gray-600">
              {description}
            </p>
          </div>
        </div>
      </div>
    </button>
  );
};

export default FeaturesSectionWithHoverEffects;
