
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import PreviewSearch from '../PreviewSearch';

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
      aria-label="Search functionality"
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
      
      {/* Add a decorative element to enhance the visual connection */}
      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ 
          scale: 1,
          opacity: 1,
          transition: { 
            delay: 0.5, 
            duration: 0.5,
            type: "spring"
          } 
        }}
        viewport={{ once: true }}
        className="absolute left-1/2 top-[-8px] transform -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-r from-emerald-400 to-indigo-400 shadow-lg shadow-indigo-500/20 z-10"
      />
      
      <PreviewSearch />
    </motion.div>
  );
};
