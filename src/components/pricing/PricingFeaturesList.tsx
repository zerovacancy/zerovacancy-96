
import { Check, Camera, Plane, Video, Users, Clock, Award } from 'lucide-react';
import { cn } from "@/lib/utils";
import { ColorVariant } from './PricingCardColors';

interface PricingFeaturesListProps {
  features: string[];
  colorAccent: string;
  tierColor?: ColorVariant;
  isMobile?: boolean;
}

export const PricingFeaturesList = ({ 
  features, 
  colorAccent, 
  tierColor = "blue",
  isMobile = false 
}: PricingFeaturesListProps) => {
  // On mobile, we use consistent check icons for all features
  const getIcon = (feature: string) => {
    if (isMobile) {
      return <Check size={18} />;
    }
    
    // On desktop, we can use varied icons
    const lowerFeature = feature.toLowerCase();
    if (lowerFeature.includes('photo')) return <Camera size={18} className="animate-subtle-bounce" />;
    if (lowerFeature.includes('drone') || lowerFeature.includes('aerial')) return <Plane size={18} />;
    if (lowerFeature.includes('video')) return <Video size={18} />;
    if (lowerFeature.includes('social')) return <Users size={18} />;
    if (lowerFeature.includes('turnaround') || lowerFeature.includes('delivery')) return <Clock size={18} />;
    if (lowerFeature.includes('premium') || lowerFeature.includes('advanced')) return <Award size={18} />;
    return <Check size={18} />;
  };

  return (
    <ul className={cn(
      "text-sm text-brand-text-primary",
      isMobile ? "space-y-2.5" : "space-y-4"
    )}>
      {features.map((feature, index) => (
        <li key={feature} className="flex items-start group">
          <span className={cn(
            "flex-shrink-0 mr-3 mt-0.5 transition-transform duration-300 group-hover:scale-110", 
            colorAccent,
            isMobile ? "w-4 h-4" : "w-5 h-5"
          )}>
            {getIcon(feature)}
          </span>
          <span className={cn(
            "transition-colors duration-300 group-hover:text-gray-800",
            feature.includes("plus:") ? 
              `font-medium ${colorAccent}` : 
              ""
          )}>
            {feature.replace("plus:", "")}
          </span>
        </li>
      ))}
    </ul>
  );
};
