
import { useState } from "react";
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
  showPopularTag = false
}: PricingCardProps) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const isMobile = useIsMobile();
  
  const planId = `price_${title.toLowerCase()}`;
  const isCurrentPlan = subscription?.plan_id === planId;
  const isSubscriptionActive = subscription?.status === 'active' || subscription?.status === 'trialing';
  
  const colorStyles = colorVariants[color];

  return (
    <div 
      className={cn(
        "relative rounded-3xl p-6 sm:p-8 shadow-xl transition-all duration-300 h-full flex flex-col",
        "border bg-white/90 backdrop-blur-sm",
        colorStyles.border,
        highlighted ? 
          `shadow-2xl ${colorStyles.shadow} hover:scale-101 ring-1 ring-white/70` : 
          "shadow-lg hover:shadow-xl hover:scale-101",
      )}
      onMouseEnter={() => !isMobile && setIsExpanded(true)} 
      onMouseLeave={() => !isMobile && !defaultExpanded && setIsExpanded(false)}
    >
      {/* Popular tag for highlighted plans */}
      {showPopularTag && (
        <PricingPopularTag colorClass={`${colorStyles.highlight}`} />
      )}
      
      <PricingCardHeader 
        title={title}
        price={price}
        interval={interval}
        description={description}
        colorAccent={colorStyles.accent}
        isCurrentPlan={isCurrentPlan}
        isSubscriptionActive={isSubscriptionActive}
      />

      {/* CTA Button - Always visible */}
      <PricingActionButton 
        isLoading={isLoading}
        isCurrentPlan={isCurrentPlan}
        isSubscriptionActive={isSubscriptionActive}
        title={title}
        cta={cta}
        subscription={subscription}
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
        <div className={cn("h-px w-full mb-4", colorStyles.bg)} />
        
        <PricingFeaturesList 
          features={features}
          colorAccent={colorStyles.icon}
        />
      </div>
    </div>
  );
};
