import { motion } from "framer-motion";
interface FeatureHeaderProps {
  title: string;
  description: string;
}
export const FeatureHeader = ({
  title,
  description
}: FeatureHeaderProps) => {
  return <div className="text-center mb-8 sm:mb-10 lg:mb-12">
      <motion.h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 font-jakarta tracking-tight text-brand-purple-dark" initial={{
      opacity: 0,
      y: 20
    }} whileInView={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.5,
      ease: "easeOut"
    }} viewport={{
      once: true,
      margin: "-100px"
    }}>
        {title}
      </motion.h2>
      <motion.p initial={{
      opacity: 0,
      y: 20
    }} whileInView={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.5,
      delay: 0.1,
      ease: "easeOut"
    }} viewport={{
      once: true,
      margin: "-100px"
    }} className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-gray-600 font-inter">
        {description}
      </motion.p>
    </div>;
};
export default FeatureHeader;