import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { iconColors, featureIcons } from "./feature-colors";
import { ChevronRight, Sparkles } from "lucide-react";

interface FeatureItemProps {
  title: string;
  description: string;
  icon: string;
  index: number;
  isPopular?: boolean;
  isPartiallyVisible?: boolean;
}

export const FeatureItem = ({ 
  title, 
  description, 
  icon, 
  index, 
  isPopular = false,
  isPartiallyVisible = false
}: FeatureItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isMobile = useIsMobile();
  
  const handleClick = () => {
    setIsExpanded(!isExpanded);
    // Add haptic feedback if supported
    if (window.navigator.vibrate) {
      window.navigator.vibrate(30);
    }
  };
  
  // Get the color scheme for this icon
  const colorScheme = iconColors[icon as keyof typeof iconColors] || { bg: "bg-indigo-50", text: "text-indigo-600", gradient: "from-indigo-500 to-blue-500" };
  
  // Get the icon component
  const Icon = featureIcons[icon as keyof typeof featureIcons];
  
  // Set a consistent character limit for descriptions
  const shortDescLimit = isMobile ? 65 : 85;
  const isLongDesc = description.length > shortDescLimit;
  
  return (
    <motion.button
      className={cn(
        "relative w-full text-left group h-full flex flex-col",
        "rounded-xl sm:rounded-2xl transition-all duration-300",
        "bg-white hover:bg-white/95",
        // Enhanced border and shadow styling
        "border-2 border-slate-100/80",
        "shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.15)]",
        // Increased border radius
        "rounded-xl sm:rounded-xl",
        // Left border accent with animation
        "before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[3px] before:rounded-l-xl before:bg-gradient-to-b",
        colorScheme.gradient,
        "before:opacity-0 group-hover:before:opacity-100 before:transition-opacity",
        "p-4 sm:p-5 lg:p-6",
        "focus:outline-none focus:ring-2 focus:ring-brand-purple/20",
        // Enhanced hover transition
        isMobile ? "active:translate-y-0" : "hover:-translate-y-1 hover:border-transparent",
        "transition-all duration-300",
        // For partially visible card
        isPartiallyVisible && "opacity-90"
      )}
      onClick={handleClick}
      aria-expanded={isExpanded}
      whileHover={isMobile ? {} : { 
        scale: 1.01,
        transition: { duration: 0.2 }
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ 
        opacity: 1, 
        y: 0,
        transition: {
          duration: 0.4,
          delay: index * 0.05
        }
      }}
      viewport={{ once: true, margin: "-50px" }}
      style={{
        clipPath: isPartiallyVisible ? "polygon(0 0, 100% 0, 100% 65%, 0 65%)" : "none",
        pointerEvents: isPartiallyVisible ? "none" : "auto"
      }}
    >
      {isPopular && (
        <motion.div 
          className="absolute -top-2 -right-2 z-10"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Popular
            </span>
          </div>
        </motion.div>
      )}
      
      <div className="flex flex-col items-start gap-3 sm:gap-4 h-full">
        {/* Icon container with refined styling */}
        <motion.div 
          className={cn(
            "flex items-center justify-center",
            "w-12 h-12 sm:w-14 sm:h-14",
            "rounded-xl",
            "transition-all duration-300",
            "bg-gradient-to-br",
            colorScheme.gradient,
            "opacity-95 group-hover:opacity-100",
            "group-hover:shadow-md",
            "border border-opacity-20",
            `border-${colorScheme.text.split('-')[1]}-100`,
          )}
          whileHover={{ scale: 1.05, rotate: 5 }}
        >
          <Icon className={cn(
            "w-6 h-6 sm:w-7 sm:h-7",
            "text-white",
            "transition-all duration-300",
            "group-hover:scale-110",
            "group-hover:animate-subtle-bounce"
          )} />
        </motion.div>
        
        <div className="text-left w-full flex-grow flex flex-col">
          <h3 className={cn(
            "text-base sm:text-lg font-bold leading-tight font-space mb-2",
            "text-gray-900 group-hover:text-brand-purple",
            "transition-colors duration-300"
          )}>
            {title}
          </h3>
          
          <div className={cn(
            "w-10 h-0.5 mb-2 sm:mb-3 bg-gradient-to-r",
            colorScheme.gradient,
            "rounded-full transition-all duration-300 transform origin-left",
            "group-hover:w-16"
          )} />
          
          <p className="text-sm text-gray-600 font-anek leading-relaxed group-hover:text-gray-700">
            {isExpanded || !isLongDesc ? 
              description : 
              (<>
                {`${description.substring(0, shortDescLimit)}...`}
                <span className="text-brand-purple ml-1">read more</span>
              </>)
            }
          </p>
        </div>
      </div>
    </motion.button>
  );
};

export default FeatureItem;
