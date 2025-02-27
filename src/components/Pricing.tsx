
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { IconChevronDown } from "@tabler/icons-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { ArrowRight } from 'lucide-react';
import { ShimmerButton } from "./ui/shimmer-button";
import { loadStripe } from "@stripe/stripe-js";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

// Initialize Stripe
const stripePromise = loadStripe('pk_live_51QtulpAIAL4hcfkS0KfdqCUoUQtz3eDphv2xibo0oIyQGTmtFnSWgTMGghDsj4J5Ff6htMYmGi2iWZmKDDvgJQM700gD6Qtd7Z');

export function Pricing() {
  const [subscription, setSubscription] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchSubscription = async () => {
      setIsLoading(true);
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data: subs, error } = await supabase
            .from('customer_subscriptions')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false })
            .limit(1);
          
          if (error) throw error;
          
          if (subs && subs.length > 0) {
            setSubscription(subs[0]);
          }
        }
      } catch (error) {
        console.error('Error fetching subscription:', error);
        toast({
          title: "Error",
          description: "Failed to fetch subscription information",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubscription();
  }, [toast]);

  return (
    <section id="pricing" className="py-12 sm:py-16 lg:py-20 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 rounded-2xl bg-white/50 backdrop-blur-sm py-[48px] lg:px-[30px] my-0">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight mb-3">
            Simple, transparent pricing
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Choose the perfect plan for your property marketing needs
          </p>
        </div>
        
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <PricingCard
            title="Basic"
            price={299}
            interval="month"
            features={[
              "Professional photography (up to 25 photos)",
              "Basic photo editing",
              "24-hour turnaround",
              "Digital delivery",
              "Limited revisions"
            ]}
            description="Perfect for single-family homes and small properties"
            cta="Get Started"
            subscription={subscription}
            isLoading={isLoading}
          />
          <div className="relative group">
            <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-r from-purple-500 via-cyan-300 to-emerald-400 opacity-75 blur-lg transition-all group-hover:opacity-100 group-hover:blur-xl" />
            <PricingCard
              title="Professional"
              price={499}
              interval="month"
              features={[
                "Everything in Basic, plus:",
                "Up to 40 professional photos",
                "Drone aerial photography",
                "Virtual tour",
                "Advanced photo editing",
                "Social media optimized images",
                "Unlimited revisions"
              ]}
              description="Ideal for luxury homes and medium-sized properties"
              cta="Go Professional"
              highlighted
              subscription={subscription}
              isLoading={isLoading}
            />
          </div>
          <PricingCard
            title="Premium"
            price={799}
            interval="month"
            features={[
              "Everything in Professional, plus:",
              "Unlimited professional photos",
              "4K video tour",
              "3D virtual walkthrough",
              "Premium photo editing",
              "Marketing materials",
              "Dedicated support",
              "Rush delivery available"
            ]}
            description="Best for luxury estates and commercial properties"
            cta="Go Premium"
            subscription={subscription}
            isLoading={isLoading}
          />
        </div>
      </div>
    </section>
  );
}

const PricingCard = ({
  title,
  price,
  interval,
  description,
  features,
  cta,
  highlighted = false,
  subscription,
  isLoading
}: {
  title: string;
  price: number;
  interval: string;
  description: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
  subscription?: any;
  isLoading?: boolean;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const isMobile = useIsMobile();
  const { toast } = useToast();

  const planId = `price_${title.toLowerCase()}`;
  const isCurrentPlan = subscription?.plan_id === planId;
  const isSubscriptionActive = subscription?.status === 'active' || subscription?.status === 'trialing';

  const handleSubscription = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsProcessing(true);

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        toast({
          title: "Authentication required",
          description: "Please sign in to continue with your subscription",
          variant: "destructive",
        });
        setIsProcessing(false);
        return;
      }

      // If user already has an active subscription
      if (isSubscriptionActive && !isCurrentPlan) {
        // This is a plan change
        const response = await supabase.functions.invoke('create-subscription', {
          body: {
            packageName: title,
            userId: user.id,
            isUpgrade: true,
            currentSubscriptionId: subscription?.stripe_subscription_id
          },
        });

        if (response.error) {
          throw new Error(response.error.message || 'Failed to update subscription');
        }

        const { clientSecret, subscriptionId } = response.data;

        if (!clientSecret) {
          throw new Error('Failed to create subscription update');
        }

        // Load Stripe
        const stripe = await stripePromise;
        if (!stripe) throw new Error('Stripe failed to initialize');

        // Confirm payment with setup intent for subscription update
        const { error: stripeError } = await stripe.confirmPayment({
          elements: undefined,
          clientSecret,
          confirmParams: {
            return_url: `${window.location.origin}/payment-confirmation`,
          },
        });

        if (stripeError) {
          throw new Error(stripeError.message || 'Payment confirmation failed');
        }
      } else {
        // Create new subscription
        const response = await supabase.functions.invoke('create-subscription', {
          body: {
            packageName: title,
            userId: user.id,
          },
        });

        if (response.error) {
          throw new Error(response.error.message || 'Failed to create subscription');
        }

        const { clientSecret } = response.data;

        if (!clientSecret) {
          throw new Error('Failed to create subscription');
        }

        // Load Stripe
        const stripe = await stripePromise;
        if (!stripe) throw new Error('Stripe failed to initialize');

        // Confirm payment
        const { error: stripeError } = await stripe.confirmPayment({
          elements: undefined,
          clientSecret,
          confirmParams: {
            return_url: `${window.location.origin}/payment-confirmation`,
          },
        });

        if (stripeError) {
          throw new Error(stripeError.message || 'Payment confirmation failed');
        }
      }

    } catch (error) {
      console.error('Subscription error:', error);
      toast({
        title: "Subscription failed",
        description: error instanceof Error ? error.message : "Something went wrong. Please try again.",
        variant: "destructive",
      });
      setIsProcessing(false);
    }
  };

  return (
    <div 
      className={cn(
        "relative rounded-2xl p-6 shadow-xl ring-1 ring-slate-900/10 transition-all duration-300",
        "bg-white hover:scale-102",
        "cursor-pointer overflow-hidden"
      )}
      onMouseEnter={() => !isMobile && setIsExpanded(true)}
      onMouseLeave={() => !isMobile && setIsExpanded(false)}
    >
      <div className="flex items-center justify-between mb-4 relative z-10">
        <h3 className="text-lg font-semibold leading-tight text-slate-900">
          {title}
        </h3>
        {isCurrentPlan && isSubscriptionActive && (
          <span className="px-2 py-1 text-xs font-medium text-white bg-green-500 rounded-full">
            Current Plan
          </span>
        )}
      </div>
      
      <div className="mt-3 flex items-baseline text-slate-900 relative z-10">
        <span className="text-4xl font-bold tracking-tight">${price}</span>
        <span className="ml-1 text-sm font-medium text-slate-600">/{interval}</span>
      </div>

      <p className="mt-3 text-sm text-slate-600 relative z-10">
        {description}
      </p>

      <div className="flex items-center justify-center pt-4 mt-4 border-t">
        <button
          className="text-sm text-slate-600 hover:text-primary flex items-center gap-1 group/btn transition-all duration-300 h-11"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          See Features
          <IconChevronDown className={cn(
            "w-4 h-4 transition-transform duration-300",
            isExpanded ? "rotate-180" : "group-hover/btn:translate-y-0.5"
          )} />
        </button>
      </div>

      <div className={cn(
        "mt-4 overflow-hidden transition-all duration-300 relative z-10",
        isExpanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
      )}>
        <ul className="mt-6 space-y-3 text-sm text-slate-600">
          {features.map(feature => (
            <li key={feature} className="flex">
              <svg
                aria-hidden="true"
                className="h-5 w-5 flex-shrink-0 text-primary"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="ml-3">{feature}</span>
            </li>
          ))}
        </ul>

        {isLoading ? (
          <div className="mt-6 flex justify-center">
            <div className="animate-pulse h-11 w-full bg-gray-200 rounded-md"></div>
          </div>
        ) : isCurrentPlan && isSubscriptionActive ? (
          <button
            className="mt-6 w-full py-2 px-3 bg-gray-100 text-gray-700 rounded-md text-sm font-medium"
            disabled
          >
            Current Plan
          </button>
        ) : (
          <ShimmerButton 
            className="mt-6 w-full h-11 sm:h-12 text-sm sm:text-base"
            onClick={handleSubscription}
            disabled={isProcessing}
          >
            <span>{isProcessing ? 'Processing...' : cta}</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-white/90" />
          </ShimmerButton>
        )}
      </div>
    </div>
  );
};

export default Pricing;
