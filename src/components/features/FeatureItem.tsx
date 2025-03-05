
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { iconColors, featureIcons } from "./feature-colors";
import { ChevronRight } from "lucide-react";

interface FeatureItemProps {
  title: string;
  description: string;
  icon: string;
  index: number;
  isPopular?: boolean;
}

export const FeatureItem = ({ title, description, icon, index, isPopular = false }: FeatureItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isMobile = useIsMobile();
  
  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };
  
  // Get the color scheme for this icon
  const colorScheme = iconColors[icon as keyof typeof iconColors] || { bg: "bg-indigo-50", text: "text-indigo-600", gradient: "from-indigo-500 to-blue-500" };
  
  // Get the icon component
  const Icon = featureIcons[icon as keyof typeof featureIcons];
  
  return (
    <motion.button
      className={cn(
        "relative w-full text-left group h-full flex flex-col",
        "rounded-xl sm:rounded-2xl transition-all duration-300",
        "bg-white hover:bg-white/95",
        "border border-gray-100",  
        "p-5 sm:p-6",
        "focus:outline-none focus:ring-2 focus:ring-primary/20",
        "hover:shadow-[0_8px_30px_rgb(0,0,0,0.05)] hover:-translate-y-1"
      )}
      onClick={handleClick}
      aria-expanded={isExpanded}
      whileHover={{ scale: 1.01 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ 
        opacity: 1, 
        y: 0,
        transition: {
          duration: 0.4,
          delay: index * 0.05 + 0.1
        }
      }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {isPopular && (
        <span className="absolute -top-2 -right-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-2.5 py-0.5 rounded-full shadow-sm">
          Popular
        </span>
      )}
      
      <div className="flex flex-col items-start gap-4 h-full">
        {/* Icon container with refined styling */}
        <motion.div 
          className={cn(
            "flex items-center justify-center",
            "w-14 h-14",
            "rounded-xl",
            "transition-all duration-300",
            "bg-gradient-to-br",
            colorScheme.gradient,
            "opacity-95",
            "group-hover:shadow-sm",
            "border border-opacity-20",
            `border-${colorScheme.text.split('-')[1]}-100`,
          )}
          whileHover={{ scale: 1.05 }}
        >
          <Icon className={cn(
            "w-7 h-7",
            "text-white",
            "transition-all duration-300",
            "group-hover:scale-110",
          )} />
        </motion.div>
        
        <div className="text-left w-full flex-grow flex flex-col">
          <h3 className={cn(
            "text-base sm:text-lg font-bold leading-tight font-space mb-2",
            "text-gray-900 group-hover:text-indigo-600",
            "transition-colors duration-300"
          )}>
            {title}
          </h3>
          
          <div className={cn(
            "w-10 h-0.5 mb-3 bg-gradient-to-r",
            colorScheme.gradient,
            "rounded-full transition-all duration-300 transform origin-left",
            "group-hover:w-16"
          )} />
          
          <p className="text-xs sm:text-sm text-gray-600 font-anek line-height-[1.6] group-hover:text-gray-700">
            {isExpanded ? description : description.length > 85 ? `${description.substring(0, 85)}...` : description}
          </p>
          
          <div className={cn(
            "mt-3 text-xs font-medium flex items-center gap-1.5", 
            colorScheme.text,
            "opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          )}>
            Learn more <ChevronRight className="w-3 h-3" />
          </div>
        </div>
      </div>
    </motion.button>
  );
};

export default FeatureItem;
