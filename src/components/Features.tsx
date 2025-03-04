import { useState } from "react";
import { cn } from "@/lib/utils";
import { Camera, Image, Video, Instagram, UserCheck, Clock, CreditCard, Award } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";

// Define a more vibrant color palette for icons
const iconColors = {
  Camera: { bg: "bg-indigo-100", text: "text-indigo-700" },
  Image: { bg: "bg-blue-100", text: "text-blue-700" },
  Video: { bg: "bg-violet-100", text: "text-violet-700" },
  Instagram: { bg: "bg-pink-100", text: "text-pink-700" },
  UserCheck: { bg: "bg-emerald-100", text: "text-emerald-700" },
  Clock: { bg: "bg-amber-100", text: "text-amber-700" },
  CreditCard: { bg: "bg-cyan-100", text: "text-cyan-700" },
  Award: { bg: "bg-rose-100", text: "text-rose-700" },
};

const features = [{
  title: "Professional Photography",
  description: "High-quality, professionally edited real estate photography that showcases properties at their best.",
  icon: Camera
}, {
  title: "Drone Aerial Coverage",
  description: "FAA-certified drone operators capturing stunning aerial views and property surroundings.",
  icon: Image
}, {
  title: "Video Production",
  description: "Cinematic property tours and promotional videos that tell your property's unique story.",
  icon: Video
}, {
  title: "Social Media Content",
  description: "Engaging content optimized for all major social platforms and marketing channels.",
  icon: Instagram
}, {
  title: "Verified Creators",
  description: "Every creator is thoroughly vetted and verified for quality and professionalism.",
  icon: UserCheck
}, {
  title: "24/7 Availability",
  description: "Book creators any time, with flexible scheduling to meet your deadlines.",
  icon: Clock
}, {
  title: "Transparent Pricing",
  description: "Clear, upfront pricing with no hidden fees. Pay only for what you need.",
  icon: CreditCard
}, {
  title: "Quality Guaranteed",
  description: "100% satisfaction guarantee on all content. Your property deserves the best.",
  icon: Award
}];

export function FeaturesSectionWithHoverEffects() {
  return (
    <section className="py-10 sm:py-14 lg:py-20 px-6 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <h2 className="section-title mb-4 sm:mb-5 font-space tracking-tight">
            Professional Content Creation Services
          </h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Everything you need to showcase your properties with stunning visuals and engaging content
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-5 lg:gap-6">
          {features.map((feature, index) => (
            <Feature
              key={index}
              title={feature.title}
              description={feature.description}
              Icon={feature.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface FeatureProps {
  title: string;
  description: string;
  Icon: React.ComponentType<{ className?: string }>;
}

const Feature = ({ title, description, Icon }: FeatureProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isMobile = useIsMobile();
  
  const handleClick = () => {
    if (isMobile) {
      setIsExpanded(!isExpanded);
    }
  };
  
  // Get the color scheme for this icon
  const iconName = Icon.name || Icon.displayName || "";
  const colorScheme = iconColors[iconName as keyof typeof iconColors] || { bg: "bg-indigo-100", text: "text-indigo-700" };
  
  return (
    <motion.button
      className={cn(
        "relative w-full text-left group h-full flex flex-col",
        "rounded-xl transition-all duration-300",
        "bg-white/90 hover:bg-white",
        "border border-gray-200/80 hover:border-gray-300",
        isMobile ? "p-6" : "p-5 sm:p-6", // Increased padding for mobile
        "focus:outline-none focus:ring-2 focus:ring-primary/20",
        !isMobile && "hover:shadow-lg hover:-translate-y-1",
        isMobile && isExpanded && "shadow-md"
      )}
      onClick={handleClick}
      aria-expanded={isMobile ? isExpanded : undefined}
      whileHover={!isMobile ? { scale: 1.02 } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="flex flex-col items-start gap-5 h-full">
        {/* Icon container with enhanced styling for mobile */}
        <motion.div 
          className={cn(
            "flex items-center justify-center",
            isMobile ? "w-16 h-16" : "w-14 h-14", // Larger icon container on mobile
            "rounded-xl", 
            "transition-all duration-300",
            colorScheme.bg,
            "group-hover:shadow-md",
            "border border-opacity-30",
            `border-${colorScheme.text.split('-')[1]}-200`,
          )}
          whileHover={{ scale: 1.1, rotate: 5 }}
          animate={isMobile && isExpanded ? { scale: 1.1 } : { scale: 1 }}
        >
          <Icon className={cn(
            isMobile ? "w-8 h-8" : "w-7 h-7", // Larger icon size on mobile
            colorScheme.text,
            "transition-all duration-300",
            "group-hover:scale-110",
            isMobile && isExpanded && "transform rotate-90"
          )} />
        </motion.div>
        
        <div className="text-left w-full flex-grow flex flex-col">
          <h3 className={cn(
            "font-bold leading-6 font-space mb-3", // Increased margin for better spacing
            isMobile ? "text-xl" : "text-lg", // Larger text on mobile
            "text-gray-900 group-hover:text-indigo-700",
            "transition-colors duration-300"
          )}>
            {title}
          </h3>
          
          {/* Description with improved mobile expansion animation */}
          <motion.div 
            className="flex-grow overflow-hidden"
            initial={false}
            animate={{ 
              height: isMobile && !isExpanded ? "0" : "auto",
              opacity: isMobile && !isExpanded ? 0 : 1
            }}
            transition={{ 
              duration: 0.3, 
              ease: "easeInOut"
            }}
          >
            <p className={cn(
              "text-gray-600 font-anek group-hover:text-gray-800",
              isMobile ? "text-base leading-relaxed" : "text-sm" // Larger text on mobile with better line height
            )}>
              {description}
            </p>
          </motion.div>
          
          {/* Visual indicator for expandable content on mobile */}
          {isMobile && (
            <motion.div 
              className="w-full flex justify-end mt-2"
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className={cn(
                "text-xs font-medium",
                "text-indigo-600",
                "transition-all duration-300"
              )}>
                {isExpanded ? "Show less" : "Read more"}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.button>
  );
};

export default FeaturesSectionWithHoverEffects;
