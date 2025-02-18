
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { IconChevronDown } from "@tabler/icons-react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

export function Pricing() {
  const isMobile = useIsMobile();
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const plans = [
    {
      title: "Basic",
      price: 299,
      features: [
        "Professional photography (up to 25 photos)",
        "Basic photo editing",
        "24-hour turnaround",
        "Digital delivery",
        "Limited revisions"
      ],
      description: "Perfect for single-family homes and small properties",
      cta: "Get Started",
      theme: "light"
    },
    {
      title: "Professional",
      price: 499,
      features: [
        "Everything in Basic, plus:",
        "Up to 40 professional photos",
        "Drone aerial photography",
        "Virtual tour",
        "Advanced photo editing",
        "Social media optimized images",
        "Unlimited revisions"
      ],
      description: "Ideal for luxury homes and medium-sized properties",
      cta: "Go Professional",
      theme: "blue"
    },
    {
      title: "Premium",
      price: 799,
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
      description: "Best for luxury estates and commercial properties",
      cta: "Go Premium",
      theme: "dark"
    }
  ];

  return (
    <section id="pricing" className="py-8 sm:py-12 lg:py-16 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl md:text-center mb-8 sm:mb-12">
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl tracking-tight text-slate-900 font-semibold">
            Simple, transparent pricing
          </h2>
          <p className="mt-3 text-lg tracking-tight text-slate-600">
            Choose the perfect plan for your property marketing needs
          </p>
        </div>

        {isMobile ? (
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {plans.map((plan, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 basis-[85%] sm:basis-[90%]">
                  <PricingCard {...plan} highlighted={index === 1} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-2 mt-4">
              <CarouselPrevious className="relative static translate-y-0 h-8 w-8" />
              <CarouselNext className="relative static translate-y-0 h-8 w-8" />
            </div>
          </Carousel>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {plans.map((plan, index) => (
              <div key={index} className={cn(
                "relative group transition-all duration-300",
                index === 1 && "lg:-mt-4"
              )}>
                {index === 1 && (
                  <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-purple-500 via-cyan-300 to-emerald-400 opacity-75 blur-lg transition-all group-hover:opacity-100 group-hover:blur-xl" />
                )}
                <PricingCard {...plan} highlighted={index === 1} />
              </div>
            ))}
          </div>
        )}
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
  theme = "light",
  highlighted = false,
}: {
  title: string;
  price: number;
  description: string;
  features: string[];
  cta: string;
  theme?: "light" | "blue" | "dark";
  highlighted?: boolean;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isMobile = useIsMobile();

  const getThemeStyles = () => {
    switch (theme) {
      case "light":
        return "bg-gray-50 hover:bg-gray-100";
      case "blue":
        return "bg-blue-50 hover:bg-blue-100";
      case "dark":
        return "bg-slate-900 text-white hover:bg-slate-800";
      default:
        return "bg-white";
    }
  };

  const getButtonStyles = () => {
    switch (theme) {
      case "light":
        return "bg-gray-900 text-white hover:bg-gray-800";
      case "blue":
        return "bg-blue-600 text-white hover:bg-blue-700";
      case "dark":
        return "bg-white text-slate-900 hover:bg-gray-100";
      default:
        return "bg-slate-900 text-white hover:bg-slate-800";
    }
  };

  return (
    <div
      className={cn(
        "relative rounded-2xl p-5 sm:p-6 transition-all duration-300",
        "shadow-lg ring-1 ring-slate-900/5",
        getThemeStyles(),
        highlighted && "scale-[1.02]"
      )}
      onClick={isMobile ? () => setIsExpanded(!isExpanded) : undefined}
      onMouseEnter={() => !isMobile && setIsExpanded(true)}
      onMouseLeave={() => !isMobile && setIsExpanded(false)}
    >
      {highlighted && (
        <div className="absolute -top-4 left-0 right-0 flex justify-center">
          <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
            Most Popular
          </span>
        </div>
      )}

      <div className="flex items-center justify-between mb-3">
        <h3 className={cn(
          "text-lg font-semibold leading-tight",
          theme === "dark" ? "text-white" : "text-slate-900"
        )}>
          {title}
        </h3>
      </div>
      
      <div className="mt-2 flex items-baseline">
        <span className={cn(
          "text-3xl font-bold tracking-tight",
          theme === "dark" ? "text-white" : "text-slate-900"
        )}>
          ${price}
        </span>
        <span className={cn(
          "ml-1 text-sm font-medium",
          theme === "dark" ? "text-gray-300" : "text-slate-600"
        )}>
          /project
        </span>
      </div>

      <p className={cn(
        "mt-3 text-sm",
        theme === "dark" ? "text-gray-300" : "text-slate-600"
      )}>
        {description}
      </p>

      <div 
        className={cn(
          "mt-4 overflow-hidden transition-all duration-300",
          isExpanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <ul className="mt-4 space-y-2.5 text-sm">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <svg
                className={cn(
                  "h-5 w-5 flex-shrink-0",
                  theme === "dark" ? "text-white" : "text-primary"
                )}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className={cn(
                "ml-3",
                theme === "dark" ? "text-gray-300" : "text-slate-600"
              )}>
                {feature}
              </span>
            </li>
          ))}
        </ul>

        <Button
          className={cn(
            "mt-6 w-full rounded-lg py-2.5 px-4 text-center text-sm font-semibold transition-colors",
            getButtonStyles()
          )}
        >
          {cta}
        </Button>
      </div>

      <div className="flex items-center justify-center pt-4 mt-4 border-t border-slate-200">
        <button 
          className={cn(
            "text-sm flex items-center gap-1 group/btn transition-all duration-300",
            theme === "dark" ? "text-gray-300 hover:text-white" : "text-slate-600 hover:text-primary"
          )}
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(!isExpanded);
          }}
        >
          See Features
          <IconChevronDown 
            className={cn(
              "w-4 h-4 transition-transform duration-300",
              isExpanded ? "rotate-180" : "group-hover/btn:translate-y-0.5"
            )}
          />
        </button>
      </div>
    </div>
  );
};

export default Pricing;
