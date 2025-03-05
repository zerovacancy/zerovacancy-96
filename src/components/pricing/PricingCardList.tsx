
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { PricingCard, PricingCardProps } from "./PricingCard";

interface PricingCardListProps {
  cards: Omit<PricingCardProps, 'subscription' | 'isLoading'>[];
  subscription: any;
  isLoading: boolean;
}

export const PricingCardList = ({ cards, subscription, isLoading }: PricingCardListProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-3 sm:grid-cols-2">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
          className={card.highlighted ? "lg:scale-105 lg:-translate-y-2 z-10" : ""}
        >
          {card.highlighted ? (
            <div className="relative group h-full">
              <div className="absolute -inset-[2px] rounded-3xl bg-gradient-to-r from-violet-500 via-cyan-500 to-emerald-500 opacity-70 blur-lg group-hover:opacity-100 group-hover:blur-xl transition-all duration-500" />
              <PricingCard 
                {...card}
                subscription={subscription}
                isLoading={isLoading}
                defaultExpanded={card.highlighted || (isMobile && card.defaultExpanded)}
              />
            </div>
          ) : (
            <PricingCard 
              {...card}
              subscription={subscription}
              isLoading={isLoading}
              defaultExpanded={!isMobile ? false : card.defaultExpanded}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
};
