import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import PricingHeader from "./pricing/PricingHeader";
import { useSubscription } from "@/hooks/use-subscription";
import { PricingInteraction, PricingPlanProps } from "./pricing/PricingInteraction";
import { cn } from "@/lib/utils";

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(true);
  const { subscription, isLoading } = useSubscription();
  const isMobile = useIsMobile();

  // Monthly and annual pricing values
  const starterMonthly = 139;
  const starterAnnual = 99;
  const proMonthly = 499;
  const proAnnual = 399;

  // Pricing plans data
  const pricingPlans: PricingPlanProps[] = [
    {
      title: "Free",
      price: 0,
      features: [
        { text: "Basic photo editing" },
        { text: "Property website" },
        { text: "Digital delivery within 72 hours" },
        { text: "Up to 10 photos" }
      ]
    },
    {
      title: "Starter",
      price: isYearly ? starterAnnual : starterMonthly,
      showPopular: true,
      features: [
        { text: "Professional photography (up to 25 photos)" },
        { text: "Basic photo editing" },
        { text: "Property website" },
        { text: "Digital delivery within 48 hours" },
        { text: "1 photographer, 1 hour session" },
        { text: "High-resolution images" },
        { text: "Basic virtual staging" }
      ]
    },
    {
      title: "Pro",
      price: isYearly ? proAnnual : proMonthly,
      features: [
        { text: "Everything in Starter, plus:" },
        { text: "Up to 40 professional photos" },
        { text: "Drone aerial photography" },
        { text: "Virtual tour" },
        { text: "Advanced photo editing" },
        { text: "Social media optimized images" },
        { text: "Unlimited revisions" },
        { text: "7-day money-back guarantee" }
      ]
    }
  ];

  return (
    <div className="w-full py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PricingHeader 
          title="Simple, Transparent Pricing" 
          subtitle="Choose the perfect plan for your real estate photography needs. No hidden fees."
        />
        
        <div className={cn(
          "flex justify-center",
          isMobile ? "mt-4" : "mt-8"
        )}>
          <PricingInteraction
            starterMonth={starterMonthly}
            starterAnnual={starterAnnual}
            proMonth={proMonthly}
            proAnnual={proAnnual}
            plans={pricingPlans}
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
