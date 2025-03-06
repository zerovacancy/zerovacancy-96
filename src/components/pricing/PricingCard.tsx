
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
  
  // Update expanded state if defaultExpanded prop changes
  useEffect(() => {
    setIsExpanded(defaultExpanded);
  }, [defaultExpanded]);
  
  const planId = `price_${title.toLowerCase()}`;
  const isCurrentPlan = subscription?.plan_id === planId;
  const isSubscriptionActive = subscription?.status === 'active' || subscription?.status === 'trialing';
  
  const colorStyles = colorVariants[color];
  
  // Determine card background pattern based on tier
  const cardPattern = title === "Basic" 
    ? "bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNDB2NDBoLTQweiIvPjxwYXRoIGQ9Ik0wIDBoMXYxaC0xeiIgZmlsbD0icmdiYSgwLDAsMCwwLjAyKSIgZmlsbC1vcGFjaXR5PSIuMiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTkgMTkpIi8+PC9nPjwvc3ZnPg==')]"
    : title === "Professional" 
      ? "bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNDB2NDBoLTQweiIvPjxwYXRoIGQ9Ik0yMCAwTDAgMjBoMjB6TTIwIDQwTDQwIDIwSDIweiIgZmlsbD0icmdiYSgxMDAsIDUwLCAyNTUsIDAuMDIpIiBmaWxsLW9wYWNpdHk9Ii4yIi8+PC9nPjwvc3ZnPg==')]"
      : "bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTIiIGhlaWdodD0iNTIiIHZpZXdCb3g9IjAgMCA1MiA1MiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNTJ2NTJoLTUyeiIvPjxwYXRoIGQ9Ik0yNiAwdjI2aDI2djI2aC01MnYtNTJ6IiBmaWxsPSJyZ2JhKDAsIDEwMCwgMTAwLCAwLjAyKSIgZmlsbC1vcGFjaXR5PSIuMiIvPjwvZz48L3N2Zz4=')]";

  // Enhanced styling for professional pricing plan
  const isProfessional = title === "Professional";
  const isBasic = title === "Basic";

  return (
    <div 
      className={cn(
        "relative rounded-2xl shadow-lg transition-all duration-300 h-full flex flex-col",
        "border bg-white/90 backdrop-blur-sm",
        isMobile ? "p-4" : "p-6 sm:p-8", // Reduced padding on mobile
        colorStyles.border,
        cardPattern,
        isProfessional && highlighted ? 
          "border-2 border-violet-400 ring-2 ring-violet-300/50" : "",
        highlighted ? 
          `shadow-xl ${colorStyles.shadow} hover:scale-[1.01] ring-1 ring-white/70 transform duration-300` : 
          "shadow-md hover:shadow-lg hover:translate-y-[-2px] transform duration-300",
        // Add a thin border to Basic tier on mobile
        isMobile && isBasic && mobileBorder ? "border border-blue-100" : "",
        // Add subtle background colors for each tier on mobile
        isMobile && isProfessional ? "bg-violet-50/80" : 
        isMobile && isBasic ? "bg-blue-50/80" : 
        isMobile ? "bg-emerald-50/80" : "",
      )}
    >
      {/* Professional card decorated edge */}
      {isProfessional && highlighted && (
        <div className="absolute inset-0 rounded-2xl pointer-events-none border-2 border-violet-400/70 opacity-70 bg-gradient-to-br from-violet-100/10 to-violet-300/10"></div>
      )}
      
      {/* Popular tag for highlighted plans - Reduced visual weight */}
      {showPopularTag && (
        <PricingPopularTag 
          colorClass={`${colorStyles.highlight}`} 
          reducedWeight={isMobile}
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

      {/* Show 2-3 key features even when collapsed */}
      {!isExpanded && features.length > 0 && (
        <div className={cn("mb-4", isMobile ? "mb-2" : "mb-6")}>
          <div className={cn("h-px w-full mb-3", isMobile ? "mb-2" : "mb-4", colorStyles.bg)} />
          <ul className="space-y-2">
            {features.slice(0, 2).map((feature, index) => (
              <li key={`preview-${feature}`} className="flex items-center text-brand-text-primary">
                <span className={cn("w-4 h-4 flex-shrink-0 mr-2.5", colorStyles.icon)}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </span>
                <span className="text-xs">{feature}</span>
              </li>
            ))}
            {features.length > 2 && (
              <li className="text-xs text-gray-400 italic pl-7">
                +{features.length - 2} more features
              </li>
            )}
          </ul>
        </div>
      )}

      {/* CTA Button - Always visible with standardized sizing */}
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

      {/* Features toggle - only on mobile */}
      <PricingFeaturesToggle 
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
        colorBg={colorStyles.bg}
        colorAccent={colorStyles.accent}
      />
      
      <div 
        className={cn(
          "overflow-hidden transition-all duration-300 relative z-10 mt-auto",
          isExpanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className={cn("h-px w-full mb-2.5", isMobile ? "mb-2" : "mb-4", colorStyles.bg)} />
        
        <PricingFeaturesList 
          features={features}
          colorAccent={colorStyles.icon}
          tierColor={color}
          isMobile={isMobile}
        />
        
        {/* Money-back guarantee badge */}
        <div className="mt-3 pt-2 border-t border-slate-100 text-[10px] text-slate-500 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1.5">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          </svg>
          7-day money-back guarantee
        </div>
      </div>
    </div>
  );
};
