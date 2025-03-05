
import { useState } from "react";
import { ArrowRight } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { ShimmerButton } from "../ui/shimmer-button";
import { PricingService } from "@/services/PricingService";
import { cn } from "@/lib/utils";

interface PricingActionButtonProps {
  isLoading: boolean;
  isCurrentPlan: boolean;
  isSubscriptionActive: boolean;
  title: string;
  cta: string;
  subscription?: any;
}

export const PricingActionButton = ({
  isLoading,
  isCurrentPlan,
  isSubscriptionActive,
  title,
  cta,
  subscription
}: PricingActionButtonProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const getButtonText = () => {
    if (isProcessing) return 'Processing...';
    if (title === "Basic") return `Start with ${title}`;
    if (title === "Professional") return `Choose ${title}`;
    if (title === "Premium") return `Upgrade to ${title}`;
    return cta;
  };

  const handleSubscription = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsProcessing(true);
    
    try {
      // If user already has an active subscription
      if (isSubscriptionActive && !isCurrentPlan) {
        // This is a plan change
        const { clientSecret } = await PricingService.createOrUpdateSubscription(
          title, 
          true, 
          subscription?.stripe_subscription_id
        );
        
        if (!clientSecret) {
          throw new Error('Failed to create subscription update');
        }

        await PricingService.processPayment(clientSecret);
      } else {
        // Create new subscription
        const { clientSecret } = await PricingService.createOrUpdateSubscription(title);
        
        if (!clientSecret) {
          throw new Error('Failed to create subscription');
        }

        await PricingService.processPayment(clientSecret);
      }
    } catch (error) {
      console.error('Subscription error:', error);
      toast({
        title: "Subscription failed",
        description: error instanceof Error ? error.message : "Something went wrong. Please try again.",
        variant: "destructive"
      });
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center mb-6">
        <div className="animate-pulse h-12 w-full bg-gray-200 rounded-lg"></div>
      </div>
    );
  }

  if (isCurrentPlan && isSubscriptionActive) {
    return (
      <button 
        className="w-full py-3 px-4 mb-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg text-sm font-medium shadow-sm" 
        disabled
      >
        Current Plan
      </button>
    );
  }

  return (
    <ShimmerButton 
      className={cn(
        "w-full h-12 text-base mb-6 font-medium group transition-all duration-300",
        "hover:scale-[1.02] active:scale-[0.98]"
      )}
      onClick={handleSubscription} 
      disabled={isProcessing}
    >
      <span>{getButtonText()}</span>
      <ArrowRight className="w-5 h-5 ml-2 text-white/90 group-hover:translate-x-1 transition-transform duration-300" />
    </ShimmerButton>
  );
};
