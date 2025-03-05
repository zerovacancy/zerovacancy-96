import { useState } from "react";
import { cn } from "@/lib/utils";
import { IconChevronDown } from "@tabler/icons-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { ArrowRight, Check, Sparkles } from 'lucide-react';
import { ShimmerButton } from "../ui/shimmer-button";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { PricingService } from "@/services/PricingService";

export const colorVariants = {
  blue: {
    highlight: "from-blue-500 to-cyan-500",
    muted: "from-blue-100 to-cyan-100",
    accent: "text-blue-600",
    bg: "bg-blue-50",
    shadow: "shadow-blue-200/50",
    border: "border-blue-100",
    button: "bg-blue-600 hover:bg-blue-700",
    icon: "text-blue-600",
  },
  purple: {
    highlight: "from-violet-500 to-fuchsia-500",
    muted: "from-violet-100 to-fuchsia-100",
    accent: "text-violet-600",
    bg: "bg-violet-50",
    shadow: "shadow-violet-200/50",
    border: "border-violet-100",
    button: "bg-violet-600 hover:bg-violet-700",
    icon: "text-violet-600",
  },
  emerald: {
    highlight: "from-emerald-500 to-teal-500",
    muted: "from-emerald-100 to-teal-100",
    accent: "text-emerald-600",
    bg: "bg-emerald-50",
    shadow: "shadow-emerald-200/50",
    border: "border-emerald-100",
    button: "bg-emerald-600 hover:bg-emerald-700",
    icon: "text-emerald-600",
  }
};

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
  color?: "blue" | "purple" | "emerald";
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
  const [isProcessing, setIsProcessing] = useState(false);
  const isMobile = useIsMobile();
  const { toast } = useToast();
  
  const planId = `price_${title.toLowerCase()}`;
  const isCurrentPlan = subscription?.plan_id === planId;
  const isSubscriptionActive = subscription?.status === 'active' || subscription?.status === 'trialing';
  
  const colorStyles = colorVariants[color];

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
        <div className="absolute -top-4 right-8">
          <div className={`px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1 bg-gradient-to-r ${colorStyles.highlight} text-white shadow-lg`}>
            <Sparkles className="w-3.5 h-3.5" />
            Most Popular
          </div>
        </div>
      )}
      
      <div className="flex items-center justify-between mb-6 relative z-10">
        <h3 className={`text-xl font-bold ${colorStyles.accent}`}>
          {title}
        </h3>
        {isCurrentPlan && isSubscriptionActive && (
          <span className="px-3 py-1 text-xs font-semibold text-white bg-gradient-to-r from-green-500 to-emerald-500 rounded-full shadow-sm">
            Current Plan
          </span>
        )}
      </div>
      
      <div className="flex items-baseline relative z-10 mb-1">
        <span className="text-5xl font-extrabold tracking-tight text-slate-900">${price}</span>
        <span className="ml-2 text-sm font-medium text-slate-500">/{interval}</span>
      </div>

      <p className="text-sm text-slate-600 mb-6 relative z-10">
        {description}
      </p>

      {/* CTA Button - Always visible */}
      {isLoading ? (
        <div className="flex justify-center mb-6">
          <div className="animate-pulse h-12 w-full bg-gray-200 rounded-lg"></div>
        </div>
      ) : isCurrentPlan && isSubscriptionActive ? (
        <button 
          className="w-full py-3 px-4 mb-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg text-sm font-medium shadow-sm" 
          disabled
        >
          Current Plan
        </button>
      ) : (
        <ShimmerButton 
          className={`w-full h-12 text-base mb-6 font-medium`}
          onClick={handleSubscription} 
          disabled={isProcessing}
        >
          <span>{isProcessing ? 'Processing...' : cta}</span>
          <ArrowRight className="w-5 h-5 ml-2 text-white/90" />
        </ShimmerButton>
      )}

      {/* Features toggle - only on mobile */}
      <button 
        className={cn(
          "text-sm font-medium flex items-center justify-center gap-1.5 group/btn transition-all duration-300 w-full py-2 rounded-lg mb-3",
          colorStyles.bg
        )}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span className={colorStyles.accent}>
          {isExpanded ? "Hide Features" : "View Features"}
        </span>
        <IconChevronDown 
          className={cn(
            "w-4 h-4 transition-transform duration-300", 
            colorStyles.accent,
            isExpanded ? "rotate-180" : "group-hover/btn:translate-y-0.5"
          )} 
        />
      </button>
      
      <div 
        className={cn(
          "overflow-hidden transition-all duration-300 relative z-10 mt-auto",
          isExpanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className={cn("h-px w-full mb-4", colorStyles.bg)} />
        
        <ul className="space-y-3 text-sm text-slate-700">
          {features.map((feature, index) => (
            <li key={feature} className="flex">
              <span className={cn("w-5 h-5 flex-shrink-0 mr-3", colorStyles.icon)}>
                <Check size={18} />
              </span>
              <span className={cn(
                feature.includes("plus:") ? 
                  `font-medium ${colorStyles.accent}` : 
                  ""
              )}>
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
