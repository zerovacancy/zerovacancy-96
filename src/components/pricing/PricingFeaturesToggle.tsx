
import { ChevronDown } from 'lucide-react';
import { cn } from "@/lib/utils";

interface PricingFeaturesToggleProps {
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => void;
  colorBg: string;
  colorAccent: string;
}

export const PricingFeaturesToggle = ({
  isExpanded,
  setIsExpanded,
  colorBg,
  colorAccent
}: PricingFeaturesToggleProps) => {
  return (
    <button 
      className={cn(
        "text-xs font-medium flex items-center justify-center gap-1.5 transition-all duration-300 w-full py-2 rounded-lg mb-2",
        colorBg,
        "hover:brightness-95 active:brightness-90"
      )}
      onClick={() => setIsExpanded(!isExpanded)}
      aria-expanded={isExpanded}
      aria-controls="features-list"
    >
      <span className={colorAccent}>
        {isExpanded ? "Hide Features" : "View All Features"}
      </span>
      <ChevronDown 
        className={cn(
          "w-3.5 h-3.5 transition-transform duration-300", 
          colorAccent,
          isExpanded ? "rotate-180" : ""
        )} 
      />
    </button>
  );
};
