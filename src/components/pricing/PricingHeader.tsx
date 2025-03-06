
import { motion } from "framer-motion";

interface PricingHeaderProps {
  title: string;
  subtitle: string;
}

export const PricingHeader = ({
  title,
  subtitle
}: PricingHeaderProps) => {
  return (
    <motion.div 
      className="text-center mb-12 sm:mb-14 lg:mb-16"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 font-jakarta tracking-tight">
        {title}
      </h2>
      
      {/* Decorative element under the heading */}
      <div className="w-20 h-1.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mx-auto mb-6 animate-pulse-subtle" />
      
      <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-gray-600 font-inter leading-relaxed">
        {subtitle}
      </p>
    </motion.div>
  );
};

export default PricingHeader;
