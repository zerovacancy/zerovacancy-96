
import React from 'react';
import { motion } from 'framer-motion';
import PreviewSearch from '../PreviewSearch';

export const SearchConnection: React.FC = () => {
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
    >
      {/* Add connecting visual element from steps to search */}
      <div className="absolute left-0 right-0 top-[-40px] flex justify-center">
        <motion.div 
          initial={{ height: 0 }}
          whileInView={{ 
            height: 40,
            transition: { 
              delay: 0.2, 
              duration: 0.5 
            } 
          }}
          viewport={{ once: true }}
          className="w-[2px] bg-gradient-to-b from-emerald-500 to-indigo-500/50"
        />
      </div>
      <PreviewSearch />
    </motion.div>
  );
};
