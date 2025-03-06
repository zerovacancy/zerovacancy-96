
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { colorVariants, ColorVariant } from "./PricingCardColors";
import { PricingPopularTag } from "./PricingPopularTag";
import { PricingCardHeader } from "./PricingCardHeader";
import { PricingActionButton } from "./PricingActionButton";
import { PricingFeaturesToggle } from "./PricingFeaturesToggle";
import { PricingFeaturesList } from "./PricingFeaturesList";

export interface PricingCardProps {
  title: string;
  price: number;
  interval: string;
  description: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
  subscription?: any;
  isLoading?: boolean;
  defaultExpanded?: boolean;
  color?: ColorVariant;
  showPopularTag?: boolean;
  valueProposition?: string;
  mobileBorder?: boolean;
}

export const PricingCard = ({
  title,
  price,
  interval,
  description,
  features,
  cta,
  highlighted = false,
  subscription,
  isLoading = false,
  defaultExpanded = false,
  color = "blue",
  showPopularTag = false,
  valueProposition,
  mobileBorder = false
}: PricingCardProps) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    setIsExpanded(defaultExpanded);
  }, [defaultExpanded]);
  
  const planId = `price_${title.toLowerCase()}`;
  const isCurrentPlan = subscription?.plan_id === planId;
  const isSubscriptionActive = subscription?.status === 'active' || subscription?.status === 'trialing';
  
  const colorStyles = colorVariants[color];
  
  const isProfessional = title === "Professional";
  const isBasic = title === "Basic";
  const isPremium = title === "Premium";

  return (
    <div 
      className={cn(
        "relative rounded-xl shadow-sm transition-all duration-300 h-full flex flex-col",
        "border bg-white/95 backdrop-blur-sm",
        isMobile ? "p-3 mx-0.5" : "p-6 sm:p-8", // Reduced padding on mobile, added slight horizontal margin
        colorStyles.border,
        isProfessional && highlighted ? 
          "border-2 border-violet-400" : "",
        highlighted ? 
          `shadow-lg ${colorStyles.shadow}` : 
          "shadow-md",
        // Add distinct background colors for each tier on mobile
        isMobile && isProfessional ? "bg-violet-50/90" : 
        isMobile && isBasic ? "bg-blue-50/90" : 
        isMobile && isPremium ? "bg-emerald-50/90" : "",
        // Optimized height for mobile
        isMobile ? "max-h-[480px]" : ""
      )}
    >
      {showPopularTag && (
        <PricingPopularTag 
          colorClass={`${colorStyles.highlight}`} 
          reducedWeight={isMobile}
          position={isMobile ? 'top-right' : 'top-right'}
        />
      )}
      
      <PricingCardHeader 
        title={title}
        price={price}
        interval={interval}
        description={description}
        colorAccent={colorStyles.accent}
        isCurrentPlan={isCurrentPlan}
        isSubscriptionActive={isSubscriptionActive}
        valueProposition={valueProposition}
        isMobile={isMobile}
      />

      {/* Preview of key features */}
      {!isExpanded && features.length > 0 && (
        <div className={cn("mb-2", isMobile ? "mt-1" : "")}>
          <div className={cn("h-px w-full mb-2", colorStyles.bg)} />
          <div className={isMobile ? "flex flex-wrap" : ""}>
            {features.slice(0, isMobile ? 3 : 2).map((feature, index) => (
              <div key={`preview-${feature}`} className={cn(
                "flex items-center text-brand-text-primary",
                isMobile ? "w-1/2 mb-1.5 pr-2 text-xs" : "mb-2"
              )}>
                <span className={cn("flex-shrink-0 mr-1.5", colorStyles.icon, isMobile ? "w-3 h-3" : "w-3.5 h-3.5")}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={isMobile ? "w-3 h-3" : "w-3.5 h-3.5"}>
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </span>
                <span className={cn("truncate", isMobile ? "text-[11px]" : "text-xs")}>{feature}</span>
              </div>
            ))}
          </div>
          {features.length > 3 && (
            <div className={cn("text-gray-400 italic mt-0.5", isMobile ? "text-[10px]" : "text-xs")}>
              +{features.length - 3} more features
            </div>
          )}
        </div>
      )}

      {/* CTA Button */}
      <PricingActionButton 
        isLoading={isLoading}
        isCurrentPlan={isCurrentPlan}
        isSubscriptionActive={isSubscriptionActive}
        title={title}
        cta={cta}
        subscription={subscription}
        isMobile={isMobile}
        colorTheme={color}
      />

      {/* Features toggle */}
      <PricingFeaturesToggle 
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
        colorBg={colorStyles.bg}
        colorAccent={colorStyles.accent}
        isMobile={isMobile}
      />
      
      {/* Features list (scrollable on mobile) */}
      <div 
        className={cn(
          "transition-all duration-300 relative z-10",
          isExpanded ? 
            "opacity-100" : 
            "max-h-0 opacity-0 overflow-hidden",
          // Make scrollable on mobile with optimized height
          isMobile && isExpanded ? "max-h-[220px] overflow-y-auto pr-1 touch-manipulation" : ""
        )}
      >
        <div className={cn("h-px w-full mb-2", colorStyles.bg)} />
        
        <PricingFeaturesList 
          features={features}
          colorAccent={colorStyles.icon}
          tierColor={color}
          isMobile={isMobile}
          useColumns={isMobile}
        />
        
        {/* Guarantee badge */}
        <div className={cn(
          "mt-2 pt-2 border-t border-slate-100 text-slate-500 flex items-center",
          isMobile ? "text-[9px]" : "text-[10px]"
        )}>
          <svg xmlns="http://www.w3.org/2000/svg" width={isMobile ? "10" : "11"} height={isMobile ? "10" : "11"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          </svg>
          7-day money-back guarantee
        </div>
      </div>
    </div>
  );
};
