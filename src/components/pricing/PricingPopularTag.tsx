
import { Sparkles } from 'lucide-react';
import { cn } from "@/lib/utils";

interface PricingPopularTagProps {
  colorClass: string;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  reducedWeight?: boolean;
}

export const PricingPopularTag = ({ 
  colorClass,
  position = 'top-right',
  reducedWeight = false
}: PricingPopularTagProps) => {
  // Map position values to specific CSS classes
  const positionClasses = {
    'top-right': 'absolute -top-3 right-5',
    'top-left': 'absolute -top-3 left-5',
    'bottom-right': 'absolute -bottom-3 right-5',
    'bottom-left': 'absolute -bottom-3 left-5',
  };

  return (
    <div className={positionClasses[position] + " z-10"}>
      <div className={cn(`
        px-4 py-1.5 
        rounded-full 
        text-xs font-semibold 
        flex items-center gap-1.5 
        bg-gradient-to-r ${colorClass} text-white 
        shadow-[0_4px_12px_rgba(0,0,0,0.15)] 
        relative
        `,
        reducedWeight ? 
          "px-3 py-1 text-[10px]" :
          ""
      )}>
        <Sparkles className={cn(
          "relative z-10", 
          reducedWeight ? "w-3 h-3" : "w-3.5 h-3.5"
        )} />
        <span className="relative z-10">Most Popular</span>
      </div>
    </div>
  );
};
