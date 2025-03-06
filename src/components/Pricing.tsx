
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import PricingHeader from "./pricing/PricingHeader";
import { useSubscription } from "@/hooks/use-subscription";
import { cn } from "@/lib/utils";
import { PricingCardList } from "./pricing/PricingCardList";
import { PricingToggle } from "./pricing/PricingToggle";
import { ColorVariant } from "./pricing/PricingCardColors";
import { PricingInteraction } from "./pricing/PricingInteraction";

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(true);
  const { subscription, isLoading } = useSubscription();
  const isMobile = useIsMobile();

  // Monthly and annual pricing values
  const starterMonthly = 139;
  const starterAnnual = 99;
  const proMonthly = 499;
  const proAnnual = 399;

  // Calculate savings
  const starterSavings = Math.round(starterMonthly * 12 - starterAnnual * 12);
  const proSavings = Math.round(proMonthly * 12 - proAnnual * 12);

  // Features for each plan
  const freePlanFeatures = [
    { text: "Basic photo editing" },
    { text: "Property website" },
    { text: "Digital delivery within 72 hours" },
    { text: "Up to 10 photos" }
  ];

  const starterPlanFeatures = [
    { text: "Professional photography (up to 25 photos)" },
    { text: "Basic photo editing" },
    { text: "Property website" },
    { text: "Digital delivery within 48 hours" },
    { text: "1 photographer, 1 hour session" },
    { text: "High-resolution images" },
    { text: "Basic virtual staging" },
    { text: "Social media optimization" }
  ];

  const proPlanFeatures = [
    { text: "Everything in Professional, plus:" },
    { text: "Up to 40 professional photos" },
    { text: "Drone aerial photography" },
    { text: "3D virtual tour" },
    { text: "Advanced photo editing" },
    { text: "Social media optimized images" },
    { text: "Unlimited revisions" },
    { text: "24-hour delivery" },
    { text: "2 photographer team" },
    { text: "7-day money-back guarantee" }
  ];

  // Plans data for the interaction component
  const pricingPlans = [
    {
      title: "Basic",
      price: 0,
      features: freePlanFeatures
    },
    {
      title: "Professional",
      price: isYearly ? starterAnnual : starterMonthly,
      showPopular: true,
      features: starterPlanFeatures
    },
    {
      title: "Premium",
      price: isYearly ? proAnnual : proMonthly,
      features: proPlanFeatures
    }
  ];

  // Pricing cards data with enhanced details for better conversion
  const pricingCards = [
    {
      title: "Basic",
      price: 0,
      interval: isYearly ? "mo" : "mo",
      description: "Perfect for individuals just getting started with property listings.",
      features: [
        "Basic photo editing",
        "Property website",
        "Digital delivery within 72 hours",
        "Up to 10 photos"
      ],
      cta: "Start for Free",
      color: "blue" as ColorVariant,
      valueProposition: "Start showcasing properties today"
    },
    {
      title: "Professional",
      price: isYearly ? starterAnnual : starterMonthly,
      interval: isYearly ? "mo" : "mo",
      description: "Our most popular plan for real estate agents and brokers.",
      features: [
        "Professional photography (up to 25 photos)",
        "Basic photo editing",
        "Property website",
        "Digital delivery within 48 hours",
        "1 photographer, 1 hour session",
        "High-resolution images",
        "Basic virtual staging",
        "Social media optimization"
      ],
      cta: "Choose Professional",
      highlighted: true,
      color: "purple" as ColorVariant,
      showPopularTag: true,
      valueProposition: `Save $${starterSavings}/year with annual billing`
    },
    {
      title: "Premium",
      price: isYearly ? proAnnual : proMonthly,
      interval: isYearly ? "mo" : "mo",
      description: "Complete solution for luxury properties and demanding clients.",
      features: [
        "plus:Everything in Professional, plus:",
        "Up to 40 professional photos",
        "Drone aerial photography",
        "3D virtual tour",
        "Advanced photo editing",
        "Social media optimized images",
        "Unlimited revisions",
        "24-hour delivery",
        "2 photographer team",
        "7-day money-back guarantee"
      ],
      cta: "Upgrade to Premium",
      color: "emerald" as ColorVariant,
      valueProposition: `Save $${proSavings}/year with annual billing`
    }
  ];

  return (
    <div className="relative w-full py-16 sm:py-20 lg:py-24 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-100/50 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-24 w-80 h-80 bg-blue-100/40 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 right-1/4 w-64 h-64 bg-emerald-100/30 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced header with animation */}
        <PricingHeader 
          title="Simple, Transparent Pricing" 
          subtitle="Choose the perfect plan for your real estate photography needs. No hidden fees."
        />
        
        {/* Pricing Toggle - Desktop Style */}
        <div className={cn(
          "flex justify-center",
          isMobile ? "mt-4" : "mt-8 mb-10"
        )}>
          <PricingToggle 
            isYearly={isYearly} 
            setIsYearly={setIsYearly}
            yearlyDiscount={isYearly ? "Save up to 30%" : ""}
          />
        </div>
        
        {/* Pricing Cards */}
        <div className="mt-6 sm:mt-8">
          {isMobile ? (
            <div className="flex justify-center">
              <PricingInteraction 
                starterMonth={starterMonthly}
                starterAnnual={starterAnnual}
                proMonth={proMonthly}
                proAnnual={proAnnual}
                plans={pricingPlans}
              />
            </div>
          ) : (
            <PricingCardList 
              cards={pricingCards.map(card => ({
                ...card,
                interval: isYearly ? "mo, billed annually" : "mo"
              }))} 
              subscription={subscription}
              isLoading={isLoading}
            />
          )}
        </div>
        
        {/* Enhanced notes section */}
        <div className="mt-10 lg:mt-16">
          <div className="bg-white/80 backdrop-blur-sm border border-slate-100 rounded-2xl p-6 max-w-3xl mx-auto shadow-sm">
            <h3 className="text-base font-semibold mb-3 text-slate-800">All plans include:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              <div className="flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-slate-700">High-resolution images</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-slate-700">Dedicated support</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-slate-700">Property website</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-slate-700">Mobile-optimized</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-slate-700">Digital downloads</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-slate-700">No watermarks</span>
              </div>
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-slate-500 mx-auto">
                Custom plans available for agencies and teams. 
                <button className="text-violet-600 hover:text-violet-700 font-medium ml-1 transition-colors">Contact us</button>
              </p>
            </div>
          </div>
        </div>

        {/* FAQ section (condensed for pricing page) */}
        <div className="mt-12 lg:mt-16 max-w-3xl mx-auto">
          <h3 className="text-center font-bold text-xl text-slate-800 mb-6">Frequently Asked Questions</h3>
          <div className="space-y-4">
            <div className="bg-white/80 backdrop-blur-sm border border-slate-100 rounded-xl p-4 shadow-sm">
              <h4 className="font-semibold text-slate-800 mb-1">Can I upgrade or downgrade my plan later?</h4>
              <p className="text-sm text-slate-600">Yes, you can change your plan at any time. Upgrades take effect immediately, while downgrades will apply at the end of your billing cycle.</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm border border-slate-100 rounded-xl p-4 shadow-sm">
              <h4 className="font-semibold text-slate-800 mb-1">Do you offer refunds?</h4>
              <p className="text-sm text-slate-600">We offer a 7-day money-back guarantee on all paid plans. If you're not satisfied, contact our support team within 7 days of purchase.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
