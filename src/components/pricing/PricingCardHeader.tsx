
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
        isMobile ? "mb-3" : "mb-6"
      )}>
        <h3 className={`text-xl font-bold ${colorAccent}`}>
          {title}
        </h3>
        {isCurrentPlan && isSubscriptionActive && (
          <span className="px-3 py-1 text-xs font-semibold text-white bg-gradient-to-r from-green-500 to-emerald-500 rounded-full shadow-sm">
            Current Plan
          </span>
        )}
      </div>
      
      <div className={cn(
        "flex items-baseline relative z-10 mb-1", 
        isMobile ? "mb-0.5" : "mb-1"
      )}>
        <span className={cn(
          "font-medium text-slate-500 mr-1",
          isMobile ? "text-sm" : "text-sm"
        )}>$</span>
        <span className={cn(
          "font-extrabold tracking-tight text-slate-900",
          isMobile ? "text-4xl" : "text-5xl"
        )}>{price}</span>
        <span className={cn(
          "text-sm font-medium text-slate-500",
          isMobile ? "ml-1.5 text-xs" : "ml-2 text-sm"
        )}>/{interval}</span>
      </div>
      
      {/* Annual price option with savings - Made smaller and lighter */}
      <div className={cn(
        "text-slate-500 mb-2",
        isMobile ? "text-xs" : "text-xs" 
      )}>
        <span className="font-medium">${Math.round(price * 10)}</span>/year (save $
        {Math.round(price * 12 - price * 10)})
      </div>

      <p className={cn(
        "text-slate-600 relative z-10 leading-relaxed",
        isMobile ? "text-sm mb-2 line-clamp-2" : "text-sm mb-3"
      )}>
        {description}
      </p>
      
      {valueProposition && (
        <p className={cn(
          `font-medium ${colorAccent}`,
          isMobile ? "text-xs mb-3 line-clamp-1" : "text-sm mb-6"
        )}>
          <span className="inline-block mr-1">✦</span> {valueProposition}
        </p>
      )}
    </>
  );
};
