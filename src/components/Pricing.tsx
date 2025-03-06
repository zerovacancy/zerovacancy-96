
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import PricingHeader from "./pricing/PricingHeader";
import { PricingCardList } from "./pricing/PricingCardList";
import { PricingCardProps } from "./pricing/PricingCard";
import { useSubscription } from "@/hooks/use-subscription";

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(true);
  const { subscription, isLoading } = useSubscription();
  const isMobile = useIsMobile();

  // Pricing tiers data
  const pricingCards: Omit<PricingCardProps, 'subscription' | 'isLoading'>[] = [
    {
      title: "Basic",
      price: isYearly ? 139 : 159,
      interval: "month",
      description: "Perfect for single-family homes and small properties",
      features: [
        "Professional photography (up to 25 photos)",
        "Basic photo editing",
        "Property website",
        "Digital delivery within 48 hours",
        "1 photographer, 1 hour session",
        "High-resolution images",
        "Basic virtual staging"
      ],
      cta: "Start with Basic",
      color: "blue",
      valueProposition: "Recommended for residential listings"
    },
    {
      title: "Professional",
      price: isYearly ? 499 : 559,
      interval: "month",
      description: "Ideal for luxury homes and medium-sized properties",
      features: [
        "Everything in Basic,",
        "Up to 40 professional photos",
        "Drone aerial photography",
        "Virtual tour",
        "Advanced photo editing",
        "Social media optimized images",
        "Unlimited revisions",
        "7-day money-back guarantee"
      ],
      cta: "Choose Professional",
      highlighted: true,
      showPopularTag: true,
      color: "purple",
      valueProposition: "Best value for serious agents"
    },
    {
      title: "Premium",
      price: isYearly ? 799 : 899,
      interval: "month",
      description: "Best for luxury estates and commercial properties",
      features: [
        "Everything in Professional, plus:",
        "Unlimited professional photos",
        "Cinematic property video",
        "Twilight photography",
        "Premium brochures (digital & print)",
        "Priority 24-hour turnaround",
        "Multiple photographers",
        "Commercial licensing",
        "Premium virtual staging"
      ],
      cta: "Upgrade to Premium",
      color: "emerald",
      valueProposition: "Premium service for exclusive listings"
    }
  ];

  return (
    <div className="w-full py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PricingHeader 
          title="Simple, Transparent Pricing" 
          subtitle="Choose the perfect plan for your real estate photography needs. No hidden fees."
        />
        
        {/* Mobile-optimized pricing cards */}
        <div className={isMobile ? "mt-4" : "mt-8"}>
          <PricingCardList
            cards={pricingCards}
            subscription={subscription}
            isLoading={isLoading}
          />
        </div>
        
        {/* Additional notes for clients */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500 max-w-2xl mx-auto">
            All plans include high-resolution images, dedicated support, and a property website.
            Custom plans available for agencies and teams.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
