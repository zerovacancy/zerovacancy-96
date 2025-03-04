
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const SearchConnection: React.FC = () => {
  // Create a flowing animation for the connecting line
  const { scrollYProgress } = useScroll();
  const lineHeight = useTransform(scrollYProgress, [0.7, 0.9], [0, 40]);
  const lineOpacity = useTransform(scrollYProgress, [0.7, 0.9], [0, 1]);
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{
        opacity: 1,
        transition: {
          delay: 0.3,
          duration: 0.8
        }
      }}
      viewport={{ once: true }}
      className="mt-16 sm:mt-24 relative"
      aria-label="Search functionality transition"
    >
      {/* Enhanced connecting visual element from steps to search with animation */}
      <div className="absolute left-0 right-0 top-[-40px] flex justify-center">
        <motion.div 
          style={{
            height: lineHeight,
            opacity: lineOpacity
          }} 
          className="w-[3px] bg-gradient-to-b from-emerald-500 to-indigo-500/50 rounded-full" 
        />
      </div>
    </motion.div>
  );
};
