
import { motion } from "framer-motion";

interface FeatureHeaderProps {
  title: string;
  description: string;
}

export const FeatureHeader = ({
  title,
  description
}: FeatureHeaderProps) => {
  return (
    <div className="text-center mb-10 sm:mb-12 lg:mb-14">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
        className="inline-block mb-3"
      >
        <div className="h-1.5 w-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mx-auto mb-6" />
      </motion.div>
      
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-5 font-jakarta tracking-tight"
      >
        {title}
      </motion.h2>
      
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-gray-600 font-inter leading-relaxed"
      >
        {description}
      </motion.p>
    </div>
  );
};

export default FeatureHeader;
