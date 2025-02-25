
import { useState } from "react";
import { cn } from "@/lib/utils";
import { IconChevronDown } from "@tabler/icons-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { ArrowRight } from 'lucide-react';
import { ShimmerButton } from "./ui/shimmer-button";
import { loadStripe } from "@stripe/stripe-js";
import { useToast } from "./ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

// Initialize Stripe
const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

export function Pricing() {
  return <section id="pricing" className="py-12 sm:py-16 lg:py-20 relative overflow-hidden">
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
          <PricingCard title="Basic" price={299} features={["Professional photography (up to 25 photos)", "Basic photo editing", "24-hour turnaround", "Digital delivery", "Limited revisions"]} description="Perfect for single-family homes and small properties" cta="Get Started" />
          <div className="relative group">
            <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-r from-purple-500 via-cyan-300 to-emerald-400 opacity-75 blur-lg transition-all group-hover:opacity-100 group-hover:blur-xl" />
            <PricingCard title="Professional" price={499} features={["Everything in Basic, plus:", "Up to 40 professional photos", "Drone aerial photography", "Virtual tour", "Advanced photo editing", "Social media optimized images", "Unlimited revisions"]} description="Ideal for luxury homes and medium-sized properties" cta="Go Professional" highlighted />
          </div>
          <PricingCard title="Premium" price={799} features={["Everything in Professional, plus:", "Unlimited professional photos", "4K video tour", "3D virtual walkthrough", "Premium photo editing", "Marketing materials", "Dedicated support", "Rush delivery available"]} description="Best for luxury estates and commercial properties" cta="Go Premium" />
        </div>
      </div>
    </section>;
}

const PricingCard = ({
  title,
  price,
  description,
  features,
  cta,
  highlighted = false
}: {
  title: string;
  price: number;
  description: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const isMobile = useIsMobile();
  const { toast } = useToast();

  const handlePayment = async (e: React.MouseEvent) => {
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
          description: "Please sign in to continue with your purchase",
          variant: "destructive",
        });
        return;
      }

      // Create payment intent
      const response = await supabase.functions.invoke('create-payment', {
        body: {
          amount: price * 100, // Convert to cents
          currency: 'usd',
          userId: user.id,
        },
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      const { clientSecret } = response.data;

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
        throw new Error(stripeError.message);
      }

    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Payment failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return <div className={cn("relative rounded-2xl p-6 shadow-xl ring-1 ring-slate-900/10 transition-all duration-300", "bg-white hover:scale-102", "cursor-pointer overflow-hidden")} onClick={isMobile ? toggleExpand : undefined} onMouseEnter={() => !isMobile && setIsExpanded(true)} onMouseLeave={() => !isMobile && setIsExpanded(false)}>
      <div className="flex items-center justify-between mb-4 relative z-10">
        <h3 className="text-lg font-semibold leading-tight text-slate-900">
          {title}
        </h3>
      </div>
      
      <div className="mt-3 flex items-baseline text-slate-900 relative z-10">
        <span className="text-4xl font-bold tracking-tight">${price}</span>
        <span className="ml-1 text-sm font-medium text-slate-600">/project</span>
      </div>

      <p className="mt-3 text-sm text-slate-600 relative z-10">
        {description}
      </p>

      <div className={cn("mt-4 overflow-hidden transition-all duration-300 relative z-10", isExpanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0")}>
        <ul className="mt-6 space-y-3 text-sm text-slate-600">
          {features.map(feature => <li key={feature} className="flex">
              <svg aria-hidden="true" className="h-5 w-5 flex-shrink-0 text-primary" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="ml-3">{feature}</span>
            </li>)}
        </ul>

        <ShimmerButton 
          className="mt-6"
          onClick={handlePayment}
          disabled={isProcessing}
        >
          <span>{isProcessing ? 'Processing...' : cta}</span>
          <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-white/90" />
        </ShimmerButton>
      </div>

      <div className="flex items-center justify-center pt-4 mt-4 border-t">
        <button className="text-sm text-slate-600 hover:text-primary flex items-center gap-1 group/btn transition-all duration-300" onClick={e => {
        e.stopPropagation();
        toggleExpand();
      }}>
          See Features
          <IconChevronDown className={cn("w-4 h-4 transition-transform duration-300", isExpanded ? "rotate-180" : "group-hover/btn:translate-y-0.5")} />
        </button>
      </div>
    </div>;
};

export default Pricing;
