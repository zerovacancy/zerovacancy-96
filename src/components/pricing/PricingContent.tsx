import { useState } from "react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { PricingInteraction } from "./PricingInteraction";
import { PricingCardList } from "./PricingCardList";
import { PricingToggle } from "./PricingToggle";
import { ColorVariant } from "./PricingCardColors";
import { PRICING, SAVINGS, FEATURES, VALUE_PROPOSITIONS, PLAN_DESCRIPTIONS, PLAN_CTAS } from "./pricingData";

interface PricingContentProps {
  subscription: any;
  isLoading: boolean;
}

export const PricingContent = ({ subscription, isLoading }: PricingContentProps) => {
  const [isYearly, setIsYearly] = useState(true);
  const isMobile = useIsMobile();

  // Plans data for the interaction component
  const pricingPlans = [
    {
      title: "Basic",
      price: 0,
      features: FEATURES.free
    },
    {
      title: "Professional",
      price: isYearly ? PRICING.starterAnnual : PRICING.starterMonthly,
      showPopular: true,
      features: FEATURES.starter
    },
    {
      title: "Premium",
      price: isYearly ? PRICING.proAnnual : PRICING.proMonthly,
      features: FEATURES.pro
    }
  ];

  // Pricing cards data with enhanced details for better conversion
  const pricingCards = [
    {
      title: "Basic",
      price: 0,
      interval: isYearly ? "mo" : "mo",
      description: "Perfect for individuals just getting started with property listings.",
      features: [
        "Basic photo editing",
        "Property website",
        "Digital delivery within 72 hours",
        "Up to 10 photos"
      ],
      cta: "Start for Free",
      color: "blue" as ColorVariant,
      valueProposition: VALUE_PROPOSITIONS.basic
    },
    {
      title: "Professional",
      price: isYearly ? PRICING.starterAnnual : PRICING.starterMonthly,
      interval: isYearly ? "mo" : "mo",
      description: "Our most popular plan for real estate agents and brokers.",
      features: [
        "Professional photography (up to 25 photos)",
        "Enhanced photo editing",
        "Custom property website",
        "Digital delivery within 48 hours",
        "1 photographer, 1 hour session",
        "High-resolution images for print",
        "Basic virtual staging",
        "Social media optimization"
      ],
      cta: "Choose Professional",
      highlighted: true,
      color: "purple" as ColorVariant,
      showPopularTag: true,
      valueProposition: VALUE_PROPOSITIONS.professional
    },
    {
      title: "Premium",
      price: isYearly ? PRICING.proAnnual : PRICING.proMonthly,
      interval: isYearly ? "mo" : "mo",
      description: "Complete solution for luxury properties and demanding clients.",
      features: [
        "plus:Everything in Professional, plus:",
        "Up to 40 professional photos",
        "Drone aerial photography",
        "3D virtual tour technology",
        "Advanced photo editing & retouching",
        "Social media optimized image pack",
        "Unlimited revisions",
        "Express 24-hour delivery",
        "2 photographer team",
        "7-day money-back guarantee"
      ],
      cta: "Upgrade to Premium",
      color: "emerald" as ColorVariant,
      valueProposition: VALUE_PROPOSITIONS.premium
    }
  ];

  return (
    <>
      {/* Pricing Toggle - Desktop Only */}
      {!isMobile && (
        <div className="flex justify-center mt-8 mb-10">
          <PricingToggle 
            isYearly={isYearly} 
            setIsYearly={setIsYearly}
          />
        </div>
      )}
      
      {/* Pricing Cards */}
      <div className="mt-6 sm:mt-8">
        {isMobile ? (
          <div className="flex justify-center">
            <PricingInteraction 
              starterMonth={PRICING.starterMonthly}
              starterAnnual={PRICING.starterAnnual}
              proMonth={PRICING.proMonthly}
              proAnnual={PRICING.proAnnual}
              plans={pricingPlans}
            />
          </div>
        ) : (
          <PricingCardList 
            cards={pricingCards.map(card => ({
              ...card,
              interval: isYearly ? "mo, billed annually" : "mo"
            }))} 
            subscription={subscription}
            isLoading={isLoading}
          />
        )}
      </div>
    </>
  );
};
