
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SmallFeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

export const SmallFeatureCard: React.FC<SmallFeatureCardProps> = ({
  icon: Icon,
  title,
  description,
  className,
}) => {
  return (
    <div 
      className={cn(
        "relative p-5 transition-all duration-300 group",
        "bg-white border border-gray-100 rounded-xl shadow-sm",
        "flex flex-col h-full min-h-[140px]",
        "hover:shadow-md hover:border-gray-200",
        "touch-manipulation active:scale-[0.99]",
        className
      )}
    >
      <div className="flex items-center gap-3 mb-3">
        {/* Icon container */}
        <div className="rounded-lg p-2.5 bg-indigo-500 text-white">
          <Icon className="w-5 h-5" aria-hidden="true" />
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-gray-900">
          {title}
        </h3>
      </div>
      
      {/* Description */}
      <p className="text-sm leading-relaxed text-gray-600">
        {description}
      </p>
    </div>
  );
};

export default SmallFeatureCard;
