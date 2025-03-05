
import { motion } from "framer-motion";

interface PricingHeaderProps {
  title: string;
  subtitle: string;
}

export const PricingHeader = ({ title, subtitle }: PricingHeaderProps) => {
  return (
    <motion.div 
      className="text-center mb-8 sm:mb-10 lg:mb-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight mb-3 sm:mb-4 text-brand-purple-dark font-jakarta">
        {title}
      </h2>
      <p className="text-sm sm:text-base text-brand-text-primary max-w-2xl mx-auto font-inter">
        {subtitle}
      </p>
    </motion.div>
  );
};

export default PricingHeader;
