
import { Check, Camera, Plane, Video, Users, Clock, Award } from 'lucide-react';
import { cn } from "@/lib/utils";
import { ColorVariant } from './PricingCardColors';

interface PricingFeaturesListProps {
  features: string[];
  colorAccent: string;
  tierColor?: ColorVariant;
}

export const PricingFeaturesList = ({ features, colorAccent, tierColor = "blue" }: PricingFeaturesListProps) => {
  // Map specific feature keywords to their respective icons
  const getIcon = (feature: string) => {
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
    <ul className="space-y-4 text-sm text-brand-text-primary">
      {features.map((feature, index) => (
        <li key={feature} className="flex items-start group">
          <span className={cn(
            "w-5 h-5 flex-shrink-0 mr-3 mt-0.5 transition-transform duration-300 group-hover:scale-110", 
            colorAccent
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
