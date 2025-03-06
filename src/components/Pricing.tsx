
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { PricingHeader } from "./pricing/PricingHeader";
import { PricingCardList } from "./pricing/PricingCardList";
import { PricingService } from "@/services/PricingService";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

export function Pricing() {
  const [subscription, setSubscription] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  useEffect(() => {
    const fetchSubscription = async () => {
      setIsLoading(true);
      try {
        const subscription = await PricingService.fetchSubscription();
        if (subscription) {
          setSubscription(subscription);
        }
      } catch (error) {
        console.error('Error fetching subscription:', error);
        toast({
          title: "Error",
          description: "Failed to fetch subscription information",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSubscription();
  }, [toast]);

  const pricingCards = [
    {
      title: "Basic",
      price: 139,
      interval: "month",
      description: "Perfect for single-family homes and small properties",
      valueProposition: "Recommended for residential listings",
      features: [
        "Professional photography (up to 25 photos)",
        "Basic photo editing",
        "24-hour turnaround",
        "Digital delivery",
        "Limited revisions"
      ],
      cta: "Get Started",
      defaultExpanded: !isMobile,
      color: "blue" as const
    },
    {
      title: "Professional",
      price: 499,
      interval: "month",
      description: "Ideal for luxury homes and medium-sized properties",
      valueProposition: "Best value for serious agents",
      features: [
        "Everything in Basic, plus:",
        "Up to 40 professional photos",
        "Drone aerial photography",
        "Virtual tour",
        "Advanced photo editing",
        "Social media optimized images",
        "Unlimited revisions"
      ],
      cta: "Go Professional",
      highlighted: true,
      defaultExpanded: !isMobile,
      color: "purple" as const,
      showPopularTag: true
    },
    {
      title: "Premium",
      price: 799,
      interval: "month",
      description: "Best for luxury estates and commercial properties",
      valueProposition: "Premium service for exclusive listings",
      features: [
        "Everything in Professional, plus:",
        "Unlimited professional photos",
        "4K video tour",
        "3D virtual walkthrough",
        "Premium photo editing",
        "Marketing materials",
        "Dedicated support",
        "Rush delivery available"
      ],
      cta: "Go Premium",
      defaultExpanded: !isMobile,
      color: "emerald" as const
    }
  ];

  return (
    <div className={cn(
      "overflow-hidden",
      isMobile ? "py-8" : "py-12 sm:py-20 lg:py-24", 
      isMobile ? "bg-gray-50/70" : ""  // Add subtle background on mobile
    )}>
      <div className={cn(
        "mx-auto max-w-7xl relative z-10",
        isMobile ? "px-3" : "px-4 sm:px-6 lg:px-8"
      )}>
        <PricingHeader 
          title="Simple, transparent pricing"
          subtitle="Choose the perfect plan for your property marketing needs with no hidden fees"
        />
        
        <PricingCardList 
          cards={pricingCards}
          subscription={subscription}
          isLoading={isLoading}
        />
        
        <div className={cn(
          "text-center",
          isMobile ? "mt-8" : "mt-12"
        )}>
          <p className="text-sm text-slate-500 flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
            All plans include a 7-day money-back guarantee. No questions asked.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
