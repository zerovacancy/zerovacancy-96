
import { IconChevronDown } from "@tabler/icons-react";
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
        "text-sm font-medium flex items-center justify-center gap-1.5 group/btn transition-all duration-300 w-full py-2.5 rounded-lg mb-3",
        colorBg,
        "hover:brightness-95"
      )}
      onClick={() => setIsExpanded(!isExpanded)}
      aria-expanded={isExpanded}
      aria-controls="features-list"
    >
      <span className={colorAccent}>
        {isExpanded ? "Hide Features" : "View All Features"}
      </span>
      <IconChevronDown 
        className={cn(
          "w-4 h-4 transition-transform duration-300", 
          colorAccent,
          isExpanded ? "rotate-180" : "animate-bounce-subtle"
        )} 
      />
    </button>
  );
};
