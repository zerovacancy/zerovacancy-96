
import { ChevronDown } from 'lucide-react';
import { cn } from "@/lib/utils";

interface PricingFeaturesToggleProps {
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => void;
  colorBg: string;
  colorAccent: string;
  isMobile?: boolean;
}

export const PricingFeaturesToggle = ({
  isExpanded,
  setIsExpanded,
  colorBg,
  colorAccent,
  isMobile = false
}: PricingFeaturesToggleProps) => {
  return (
    <button 
      className={cn(
        "text-xs font-medium flex items-center justify-center gap-1.5 transition-all duration-300 w-full rounded-lg mb-2",
        colorBg,
        "hover:brightness-95 active:brightness-90",
        // Optimize for mobile touch target
        isMobile ? "py-1.5 text-[11px] touch-manipulation" : "py-2"
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
          "transition-transform duration-300", 
          colorAccent,
          isExpanded ? "rotate-180" : "",
          isMobile ? "w-3 h-3" : "w-3.5 h-3.5"
        )} 
      />
    </button>
  );
};
