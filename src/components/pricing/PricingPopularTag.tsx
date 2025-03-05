
import { Sparkles } from 'lucide-react';

interface PricingPopularTagProps {
  colorClass: string;
}

export const PricingPopularTag = ({ colorClass }: PricingPopularTagProps) => {
  return (
    <div className="absolute -top-4 right-8">
      <div className={`px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 bg-gradient-to-r ${colorClass} text-white shadow-lg animate-pulse-subtle`}>
        <Sparkles className="w-3.5 h-3.5" />
        Most Popular
      </div>
    </div>
  );
};
