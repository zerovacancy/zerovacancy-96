
import { useState } from "react";
import { ArrowRight } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { ShimmerButton } from "../ui/shimmer-button";
import { PricingService } from "@/services/PricingService";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const handleSubscription = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsProcessing(true);
    
    try {
      // Check if user is authenticated
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        // User is not authenticated, show a message and redirect to login
        toast({
          title: "Authentication Required",
          description: "Please sign in to subscribe to this plan.",
          variant: "default",
        });
        
        // Store the selected plan in localStorage so we can resume after login
        localStorage.setItem('selectedPricingPlan', title);
        
        // Redirect to login page
        navigate('/auth');
        setIsProcessing(false);
        return;
      }
      
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

        toast({
          title: "Processing Subscription Change",
          description: "Please complete the payment process...",
        });

        await PricingService.processPayment(clientSecret);
      } else {
        // Create new subscription
        const { clientSecret } = await PricingService.createOrUpdateSubscription(title);
        
        if (!clientSecret) {
          throw new Error('Failed to create subscription');
        }

        toast({
          title: "Processing Subscription",
          description: "Please complete the payment process...",
        });

        await PricingService.processPayment(clientSecret);
      }
    } catch (error) {
      console.error('Subscription error:', error);
      
      // Provide more specific error messages
      let errorMessage = "Something went wrong. Please try again.";
      
      if (error instanceof Error) {
        if (error.message.includes('Authentication required')) {
          errorMessage = "You need to be signed in to subscribe. Please sign in and try again.";
        } else {
          errorMessage = error.message;
        }
      }
      
      toast({
        title: "Subscription Failed",
        description: errorMessage,
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
      className="w-full h-12 text-base mb-6 font-medium"
      onClick={handleSubscription} 
      disabled={isProcessing}
    >
      <span>{isProcessing ? 'Processing...' : cta}</span>
      <ArrowRight className="w-5 h-5 ml-2 text-white/90" />
    </ShimmerButton>
  );
};
