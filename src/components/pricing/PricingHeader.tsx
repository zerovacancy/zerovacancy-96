import { motion } from "framer-motion";
interface PricingHeaderProps {
  title: string;
  subtitle: string;
}
export const PricingHeader = ({
  title,
  subtitle
}: PricingHeaderProps) => {
  return <motion.div className="text-center mb-8 sm:mb-10 lg:mb-12" initial={{
    opacity: 0,
    y: 20
  }} whileInView={{
    opacity: 1,
    y: 0
  }} viewport={{
    once: true
  }} transition={{
    duration: 0.5
  }}>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 font-jakarta tracking-tight">
        {title}
      </h2>
      <p className="text-sm sm:text-base text-brand-text-primary max-w-2xl mx-auto font-inter">
        {subtitle}
      </p>
    </motion.div>;
};
export default PricingHeader;