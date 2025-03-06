
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { PricingCard, PricingCardProps } from "./PricingCard";
import { ShineBorder } from "@/components/ui/shine-border";

interface PricingCardListProps {
  cards: Omit<PricingCardProps, 'subscription' | 'isLoading'>[];
  subscription: any;
  isLoading: boolean;
}

export const PricingCardList = ({ cards, subscription, isLoading }: PricingCardListProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className={cn(
      "grid gap-6 md:gap-8",
      isMobile 
        ? "grid-cols-1 px-1.5" 
        : "lg:grid-cols-3 sm:grid-cols-2"
    )}>
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
          className={cn(
            isMobile ? "w-full mb-3" : "",
            card.highlighted && !isMobile ? "lg:scale-105 lg:-translate-y-2 z-10" : ""
          )}
        >
          {card.highlighted ? (
            <ShineBorder 
              borderRadius={24} 
              borderWidth={1.5} 
              duration={10} 
              color={["#9333ea", "#4f46e5", "#7e22ce"]} 
              className="w-full h-full min-w-0"
            >
              <PricingCard 
                {...card}
                subscription={subscription}
                isLoading={isLoading}
                defaultExpanded={isMobile ? false : card.highlighted}
              />
            </ShineBorder>
          ) : (
            <PricingCard 
              {...card}
              subscription={subscription}
              isLoading={isLoading}
              defaultExpanded={false}
              mobileBorder={true}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
};

import { cn } from "@/lib/utils";
