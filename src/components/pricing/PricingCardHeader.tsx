
import { cn } from "@/lib/utils";

interface PricingCardHeaderProps {
  title: string;
  price: number;
  interval: string;
  description: string;
  colorAccent: string;
  isCurrentPlan: boolean;
  isSubscriptionActive: boolean;
  valueProposition?: string;
  isMobile?: boolean;
}

export const PricingCardHeader = ({ 
  title, 
  price, 
  interval, 
  description, 
  colorAccent,
  isCurrentPlan,
  isSubscriptionActive,
  valueProposition,
  isMobile = false
}: PricingCardHeaderProps) => {
  return (
    <>
      <div className={cn(
        "flex items-center justify-between relative z-10",
        isMobile ? "mb-1" : "mb-6"
      )}>
        <h3 className={cn(
          `font-bold ${colorAccent}`,
          isMobile ? "text-lg" : "text-xl"
        )}>
          {title}
        </h3>
        {isCurrentPlan && isSubscriptionActive && (
          <span className="px-2 py-0.5 text-xs font-semibold text-white bg-gradient-to-r from-green-500 to-emerald-500 rounded-full shadow-sm">
            Current Plan
          </span>
        )}
      </div>
      
      <div className={cn("flex items-baseline relative z-10 mb-1")}>
        <span className="text-sm font-medium text-slate-500 mr-1">$</span>
        <span className={cn(
          "font-extrabold tracking-tight text-slate-900",
          isMobile ? "text-3xl" : "text-5xl"
        )}>{price}</span>
        <span className={cn(
          "font-medium text-slate-500",
          isMobile ? "ml-1 text-xs" : "ml-2 text-sm"
        )}>/{interval}</span>
      </div>
      
      {/* Annual price with savings - more compact */}
      <div className={cn(
        "text-slate-500 mb-1.5", 
        isMobile ? "text-[10px]" : "text-xs"
      )}>
        ${Math.round(price * 10)}/year (save ${Math.round(price * 12 - price * 10)})
      </div>

      <p className={cn(
        "text-slate-600 relative z-10 leading-tight",
        isMobile ? "text-[11px] mb-1.5 line-clamp-2" : "text-sm mb-3"
      )}>
        {description}
      </p>
      
      {valueProposition && (
        <p className={cn(
          `font-medium ${colorAccent}`,
          isMobile ? "text-[10px] mb-1.5 line-clamp-1" : "text-sm mb-6"
        )}>
          <span className="inline-block mr-1">✦</span> {valueProposition}
        </p>
      )}
    </>
  );
};
