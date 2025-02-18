
import { motion } from "framer-motion"
import { Check, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface BenefitProps {
  text: string
  checked: boolean
}

const Benefit = ({ text, checked }: BenefitProps) => {
  return (
    <div className="flex items-center gap-3">
      {checked ? (
        <span className="grid size-4 place-content-center rounded-full bg-primary text-sm text-primary-foreground">
          <Check className="size-3" />
        </span>
      ) : (
        <span className="grid size-4 place-content-center rounded-full dark:bg-zinc-800 bg-zinc-200 text-sm dark:text-zinc-400 text-zinc-600">
          <X className="size-3" />
        </span>
      )}
      <span className="text-sm dark:text-zinc-300 text-zinc-600">{text}</span>
    </div>
  )
}

interface PricingCardProps {
  tier: string
  price: string
  bestFor: string
  CTA: string
  benefits: Array<{ text: string; checked: boolean }>
  className?: string
}

const PricingCard = ({
  tier,
  price,
  bestFor,
  CTA,
  benefits,
  className,
}: PricingCardProps) => {
  return (
    <motion.div
      initial={{ filter: "blur(2px)" }}
      whileInView={{ filter: "blur(0px)" }}
      transition={{ duration: 0.5, ease: "easeInOut", delay: 0.25 }}
    >
      <Card
        className={cn(
          "relative h-full w-full overflow-hidden border",
          "dark:border-zinc-700 dark:bg-gradient-to-br dark:from-zinc-950/50 dark:to-zinc-900/80",
          "border-zinc-200 bg-gradient-to-br from-zinc-50/50 to-zinc-100/80",
          "p-6",
          className,
        )}
      >
        <div className="flex flex-col items-center border-b pb-6 dark:border-zinc-700 border-zinc-200">
          <span className="mb-6 inline-block dark:text-zinc-50 text-zinc-900">
            {tier}
          </span>
          <span className="mb-3 inline-block text-4xl font-medium">
            {price}
          </span>
          <span className="dark:bg-gradient-to-br dark:from-zinc-200 dark:to-zinc-500 bg-gradient-to-br from-zinc-700 to-zinc-900 bg-clip-text text-center text-transparent">
            {bestFor}
          </span>
        </div>
        <div className="space-y-4 py-9">
          {benefits.map((benefit, index) => (
            <Benefit key={index} {...benefit} />
          ))}
        </div>
        <Button
          className="w-full"
          variant={tier === "Pro" ? "default" : "ghost"}
        >
          {CTA}
        </Button>
      </Card>
    </motion.div>
  )
}

export function PricingSection() {
  const pricingPlans = [
    {
      tier: "Basic",
      price: "$99",
      bestFor: "Perfect for single property listings",
      CTA: "Get Started",
      benefits: [
        { text: "Professional Photography (20 photos)", checked: true },
        { text: "Basic Photo Editing", checked: true },
        { text: "24-Hour Turnaround", checked: true },
        { text: "Digital Downloads", checked: true },
        { text: "Drone Photography", checked: false },
        { text: "Virtual Tour", checked: false },
      ],
    },
    {
      tier: "Pro",
      price: "$199",
      bestFor: "Ideal for premium properties",
      CTA: "Choose Pro",
      benefits: [
        { text: "Professional Photography (40 photos)", checked: true },
        { text: "Advanced Photo Editing", checked: true },
        { text: "Same-Day Turnaround", checked: true },
        { text: "Digital Downloads", checked: true },
        { text: "Drone Photography", checked: true },
        { text: "Virtual Tour", checked: true },
      ],
    },
    {
      tier: "Enterprise",
      price: "Custom",
      bestFor: "For real estate agencies & teams",
      CTA: "Contact Sales",
      benefits: [
        { text: "Unlimited Photography", checked: true },
        { text: "Premium Editing Suite", checked: true },
        { text: "Priority Turnaround", checked: true },
        { text: "Dedicated Account Manager", checked: true },
        { text: "Custom Branding", checked: true },
        { text: "API Access", checked: true },
      ],
    },
  ];

  return (
    <section className="bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="section-title">Simple, Transparent Pricing</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Choose the perfect plan for your real estate content needs. No hidden fees, no surprises.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <PricingCard key={plan.tier} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default PricingSection;
