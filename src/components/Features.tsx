
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Camera, Plane, Video, Instagram, UserCheck, Clock, CreditCard, Award } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

// Define colorful backgrounds for each icon
const iconColors = {
  Camera: { bg: "bg-violet-100", text: "text-violet-600" },
  Plane: { bg: "bg-blue-100", text: "text-blue-500" },
  Video: { bg: "bg-indigo-100", text: "text-indigo-600" },
  Instagram: { bg: "bg-pink-100", text: "text-pink-600" },
  UserCheck: { bg: "bg-teal-100", text: "text-teal-600" },
  Clock: { bg: "bg-amber-100", text: "text-amber-600" },
  CreditCard: { bg: "bg-emerald-100", text: "text-emerald-600" },
  Award: { bg: "bg-rose-100", text: "text-rose-600" },
};

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
    <section className="py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="section-title mb-2 sm:mb-3 font-space tracking-tight">
            Professional Content Creation Services
          </h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Everything you need to showcase your properties with stunning visuals and engaging content
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
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
  
  // Get the color scheme for this icon
  const iconName = Icon.name || Icon.displayName || "";
  const colorScheme = iconColors[iconName as keyof typeof iconColors] || { bg: "bg-primary/5", text: "text-primary" };
  
  return (
    <button
      className={cn(
        "relative w-full text-left group",
        "rounded-xl transition-all duration-200",
        "bg-white/50 hover:bg-white",
        "border border-gray-200/50 hover:border-gray-300",
        "p-4 sm:p-5",
        "focus:outline-none focus:ring-2 focus:ring-primary/20",
        !isMobile && "hover:shadow-md hover:-translate-y-0.5"
      )}
      onClick={handleClick}
      aria-expanded={isMobile ? isExpanded : undefined}
    >
      <div className="flex flex-col items-start gap-3">
        <div className={cn(
          "w-10 h-10 rounded-lg",
          "flex items-center justify-center",
          colorScheme.bg, colorScheme.text,
          "group-hover:saturate-150",
          "transition-all duration-200"
        )}>
          <Icon className={cn(
            "w-5 h-5",
            "transition-transform duration-200",
            isMobile && isExpanded && "transform rotate-90"
          )} />
        </div>
        
        <div className="text-left w-full">
          <h3 className={cn(
            "text-base font-semibold leading-6 font-space mb-1.5",
            "text-gray-900 group-hover:text-primary",
            "transition-colors duration-200"
          )}>
            {title}
          </h3>
          <div className={cn(
            "overflow-hidden transition-[max-height,opacity] duration-200",
            isMobile && !isExpanded ? "max-h-0 opacity-0" : "max-h-32 opacity-100"
          )}>
            <p className="text-sm text-gray-600 font-anek group-hover:text-gray-700">
              {description}
            </p>
          </div>
        </div>
      </div>
    </button>
  );
};

export default FeaturesSectionWithHoverEffects;
