import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { PricingHeader } from "./pricing/PricingHeader";
import { PricingCardList } from "./pricing/PricingCardList";
import { PricingService } from "@/services/PricingService";
import { supabase } from "@/integrations/supabase/client";

export function Pricing() {
  const [subscription, setSubscription] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const { toast } = useToast();

  // Check authentication state
  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    
    checkUser();
    
    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const fetchSubscription = async () => {
      setIsLoading(true);
      
      // Only fetch subscription if user is logged in
      if (user) {
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
        }
      }
      
      setIsLoading(false);
    };
    
    fetchSubscription();
  }, [toast, user]);

  const pricingCards = [
    {
      title: "Basic",
      price: 299,
      interval: "month",
      description: "Perfect for single-family homes and small properties",
      features: [
        "Professional photography (up to 25 photos)",
        "Basic photo editing",
        "24-hour turnaround",
        "Digital delivery",
        "Limited revisions"
      ],
      cta: "Get Started",
      defaultExpanded: true,
      color: "blue" as const
    },
    {
      title: "Professional",
      price: 499,
      interval: "month",
      description: "Ideal for luxury homes and medium-sized properties",
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
      defaultExpanded: true,
      color: "purple" as const,
      showPopularTag: true
    },
    {
      title: "Premium",
      price: 799,
      interval: "month",
      description: "Best for luxury estates and commercial properties",
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
      defaultExpanded: true,
      color: "emerald" as const
    }
  ];

  return (
    <section id="pricing" className="py-12 sm:py-20 lg:py-24 relative overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <PricingHeader 
          title="Simple, transparent pricing"
          subtitle="Choose the perfect plan for your property marketing needs with no hidden fees"
        />
        
        <PricingCardList 
          cards={pricingCards}
          subscription={subscription}
          isLoading={isLoading}
        />
        
        <div className="mt-12 text-center">
          <p className="text-sm text-slate-500">
            All plans include a 7-day money-back guarantee. No questions asked.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Pricing;
