import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";
import { PricingToggle } from "./PricingToggle";
import { PricingCard } from "./card/PricingCard";
import { PricingInteraction } from "./PricingInteraction";

export interface PricingContentProps {
  subscription: any;
  isLoading: boolean;
}

export const PricingContent: React.FC<PricingContentProps> = ({
  subscription,
  isLoading
}) => {
  const isMobile = useIsMobile();
  
  // Mock pricing plans data
  const plans = [
    {
      title: "Free",
      features: [
        "**Core Features**",
        "Up to 3 properties",
        "Basic listing details",
        "Standard support",
      ],
      showPopular: false,
    },
    {
      title: "Basic",
      features: [
        "**Core Features**",
        "Up to 10 properties",
        "Enhanced listing details",
        "Priority support",
        "**Marketing Tools**",
        "Social media sharing",
        "Basic analytics dashboard",
      ],
      showPopular: true,
    },
    {
      title: "Professional",
      features: [
        "**Core Features**",
        "Unlimited properties",
        "Premium listing details",
        "24/7 support",
        "**Marketing Tools**",
        "Advanced analytics dashboard",
        "SEO-Optimized descriptions",
        "**Content Creation**",
        "plus: 3 monthly content pieces",
      ],
      showPopular: false,
    },
  ];

  return (
    <div className="mt-12 lg:mt-16">
      {/* Pricing cards container */}
      {isMobile ? (
        <PricingInteraction
          starterMonth={49}
          starterAnnual={490}
          proMonth={99}
          proAnnual={990}
          plans={plans.slice(1, 3)}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <PricingCard
              key={plan.title}
              title={plan.title}
              price={index === 0 ? 0 : index === 1 ? 49 : 99}
              interval="month"
              description="Great for getting started"
              features={plan.features}
              cta={index === 0 ? "Get Started Free" : "Choose Plan"}
              highlighted={plan.showPopular}
              showPopularTag={plan.showPopular}
              valueProposition={
                index === 0
                  ? "Perfect for exploring"
                  : index === 1
                  ? "Ideal for growing teams"
                  : "Best for established businesses"
              }
              footerText={
                index === 2
                  ? "7-day money-back guarantee"
                  : undefined
              }
              subscription={subscription}
              isLoading={isLoading}
              isCurrentPlan={false}
            />
          ))}
        </div>
      )}
    </div>
  );
};
