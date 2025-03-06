
import { useState } from "react";
import { ArrowRight } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { ShimmerButton } from "../ui/shimmer-button";
import { PricingService } from "@/services/PricingService";
import { cn } from "@/lib/utils";
import { ColorVariant } from './PricingCardColors';

interface PricingActionButtonProps {
  isLoading: boolean;
  isCurrentPlan: boolean;
  isSubscriptionActive: boolean;
  title: string;
  cta: string;
  subscription?: any;
  isMobile?: boolean;
  colorTheme?: ColorVariant;
}

export const PricingActionButton = ({
  isLoading,
  isCurrentPlan,
  isSubscriptionActive,
  title,
  cta,
  subscription,
  isMobile = false,
  colorTheme = "blue"
}: PricingActionButtonProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  // Standardized button text for mobile
  const getButtonText = () => {
    if (isProcessing) return 'Processing...';
    
    if (isMobile) {
      if (title === "Basic") return "Start Basic";
      if (title === "Professional") return "Choose Pro";
      if (title === "Premium") return "Go Premium";
      return cta;
    }
    
    if (title === "Basic") return `Start with ${title}`;
    if (title === "Professional") return `Choose ${title}`;
    if (title === "Premium") return `Upgrade to ${title}`;
    return cta;
  };

  // Get color-specific classes for hover effect
  const getColorClasses = () => {
    if (colorTheme === "blue") return "hover:bg-blue-600/90 active:bg-blue-700";
    if (colorTheme === "purple") return "hover:bg-violet-600/90 active:bg-violet-700";
    return "hover:bg-emerald-600/90 active:bg-emerald-700";
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
      <div className={cn(
        "flex justify-center",
        isMobile ? "mb-4" : "mb-6"
      )}>
        <div className="animate-pulse h-12 w-full bg-gray-200 rounded-lg"></div>
      </div>
    );
  }

  if (isCurrentPlan && isSubscriptionActive) {
    return (
      <button 
        className={cn(
          "w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg text-sm font-medium shadow-sm",
          isMobile ? "mb-4" : "mb-6"
        )}
        disabled
      >
        Current Plan
      </button>
    );
  }

  return (
    <ShimmerButton 
      className={cn(
        "w-full font-medium group transition-all duration-300",
        "hover:scale-[1.02] active:scale-[0.98]",
        isMobile ? "h-11 text-sm mb-4" : "h-12 text-base mb-6",
        getColorClasses()
      )}
      onClick={handleSubscription} 
      disabled={isProcessing}
    >
      <span>{getButtonText()}</span>
      <ArrowRight className={cn(
        "text-white/90 group-hover:translate-x-1 transition-transform duration-300",
        isMobile ? "w-4 h-4 ml-1.5" : "w-5 h-5 ml-2"
      )} />
    </ShimmerButton>
  );
};
