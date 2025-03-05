
import { Check } from 'lucide-react';
import { cn } from "@/lib/utils";

interface PricingFeaturesListProps {
  features: string[];
  colorAccent: string;
}

export const PricingFeaturesList = ({ features, colorAccent }: PricingFeaturesListProps) => {
  return (
    <ul className="space-y-3 text-sm text-[#45455A]">
      {features.map((feature, index) => (
        <li key={feature} className="flex">
          <span className={cn("w-5 h-5 flex-shrink-0 mr-3", colorAccent)}>
            <Check size={18} />
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
