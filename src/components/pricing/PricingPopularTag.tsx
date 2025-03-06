
import { Sparkles } from 'lucide-react';

interface PricingPopularTagProps {
  colorClass: string;
}

export const PricingPopularTag = ({ colorClass }: PricingPopularTagProps) => {
  return (
    <div className="absolute -top-4 right-8 z-10">
      <div className={`
        px-4 py-1.5 
        rounded-full 
        text-xs font-semibold 
        flex items-center gap-1.5 
        bg-gradient-to-r ${colorClass} text-white 
        shadow-[0_4px_12px_rgba(0,0,0,0.15)] 
        animate-pulse-subtle
        after:content-[''] after:absolute after:inset-0 
        after:bg-gradient-to-r after:from-white/0 after:via-white/20 after:to-white/0 
        after:rounded-full after:animate-shimmer-slide after:z-0
        overflow-hidden
        relative
      `}>
        <Sparkles className="w-3.5 h-3.5 relative z-10" />
        <span className="relative z-10">Most Popular</span>
      </div>
    </div>
  );
};
