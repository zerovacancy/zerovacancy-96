
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
    if (feature.toLowerCase().includes('photo')) return <Camera size={18} />;
    if (feature.toLowerCase().includes('drone') || feature.toLowerCase().includes('aerial')) return <Plane size={18} />;
    if (feature.toLowerCase().includes('video')) return <Video size={18} />;
    if (feature.toLowerCase().includes('social')) return <Users size={18} />;
    if (feature.toLowerCase().includes('turnaround') || feature.toLowerCase().includes('delivery')) return <Clock size={18} />;
    if (feature.toLowerCase().includes('premium') || feature.toLowerCase().includes('advanced')) return <Award size={18} />;
    return <Check size={18} />;
  };

  return (
    <ul className="space-y-4 text-sm text-brand-text-primary">
      {features.map((feature, index) => (
        <li key={feature} className="flex items-start">
          <span className={cn(
            "w-5 h-5 flex-shrink-0 mr-3 mt-0.5", 
            colorAccent
          )}>
            {getIcon(feature)}
          </span>
          <span className={cn(
            feature.includes("plus:") ? 
              `font-medium ${colorAccent}` : 
              ""
          )}>
            {feature}
          </span>
        </li>
      ))}
    </ul>
  );
};
