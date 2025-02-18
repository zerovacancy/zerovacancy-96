
import { useState } from "react";
import { cn } from "@/lib/utils";
import { IconChevronDown } from "@tabler/icons-react";
import { useIsMobile } from "@/hooks/use-mobile";

export function Pricing() {
  return (
    <section id="pricing" className="py-12 sm:py-16 lg:py-20 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl md:text-center">
          <h2 className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-lg tracking-tight text-slate-600">
            Choose the perfect plan for your property marketing needs
          </p>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <PricingCard
            title="Basic"
            price={299}
            features={[
              "Professional photography (up to 25 photos)",
              "Basic photo editing",
              "24-hour turnaround",
              "Digital delivery",
              "Limited revisions"
            ]}
            description="Perfect for single-family homes and small properties"
            cta="Get Started"
          />
          <PricingCard
            title="Professional"
            price={499}
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
          />
          <PricingCard
            title="Premium"
            price={799}
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
          />
        </div>
      </div>
    </section>
  );
}

const PricingCard = ({
  title,
  price,
  description,
  features,
  cta,
  highlighted = false,
}: {
  title: string;
  price: number;
  description: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isMobile = useIsMobile();

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={cn(
        "relative rounded-2xl p-6 shadow-xl ring-1 ring-slate-900/10 transition-all duration-300",
        highlighted ? "bg-primary/5 scale-105" : "bg-white hover:scale-102",
        "cursor-pointer"
      )}
      onClick={isMobile ? toggleExpand : undefined}
      onMouseEnter={() => !isMobile && setIsExpanded(true)}
      onMouseLeave={() => !isMobile && setIsExpanded(false)}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold leading-tight text-slate-900">
          {title}
        </h3>
        <IconChevronDown 
          className={cn(
            "w-5 h-5 transition-transform duration-300",
            isExpanded ? "rotate-180" : "rotate-0",
            "text-slate-500"
          )}
        />
      </div>
      
      <div className="mt-3 flex items-baseline text-slate-900">
        <span className="text-4xl font-bold tracking-tight">${price}</span>
        <span className="ml-1 text-sm font-medium text-slate-600">/project</span>
      </div>

      <p className="mt-3 text-sm text-slate-600">
        {description}
      </p>

      <div 
        className={cn(
          "mt-4 overflow-hidden transition-all duration-300",
          isExpanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <ul className="mt-6 space-y-3 text-sm text-slate-600">
          {features.map((feature) => (
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

        <button
          className={cn(
            "mt-6 block w-full rounded-lg py-3 px-6 text-center text-sm font-semibold leading-5",
            highlighted
              ? "bg-primary text-white hover:bg-primary/90"
              : "bg-slate-800 text-white hover:bg-slate-900"
          )}
        >
          {cta}
        </button>
      </div>
    </div>
  );
};

export default Pricing;
