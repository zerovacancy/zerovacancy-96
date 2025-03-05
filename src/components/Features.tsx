
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Camera, Image, Video, Instagram, UserCheck, Clock, CreditCard, Award } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";

// Refined color palette for icons with more subtle backgrounds and consistent colors
const iconColors = {
  Camera: { bg: "bg-indigo-50", text: "text-indigo-600" },
  Image: { bg: "bg-blue-50", text: "text-blue-600" },
  Video: { bg: "bg-violet-50", text: "text-violet-600" },
  Instagram: { bg: "bg-pink-50", text: "text-pink-600" },
  UserCheck: { bg: "bg-emerald-50", text: "text-emerald-600" },
  Clock: { bg: "bg-amber-50", text: "text-amber-600" },
  CreditCard: { bg: "bg-cyan-50", text: "text-cyan-600" },
  Award: { bg: "bg-rose-50", text: "text-rose-600" },
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
    <section className="relative py-8 sm:py-12 lg:py-16 px-2 sm:px-4 lg:px-6 overflow-hidden">
      {/* Gradient background with decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/40 via-white to-purple-50/30 pointer-events-none">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-indigo-900" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        {/* Decorative blurred blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-100/30 rounded-full mix-blend-multiply blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-1/3 -left-10 w-72 h-72 bg-purple-100/30 rounded-full mix-blend-multiply blur-2xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-80 h-80 bg-blue-100/30 rounded-full mix-blend-multiply blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <motion.h2 
            className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 font-space tracking-tight text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            Professional Content Creation Services
          </motion.h2>
          <motion.p 
            className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            Everything you need to showcase your properties with stunning visuals and engaging content
          </motion.p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
          {features.map((feature, index) => (
            <Feature
              key={index}
              title={feature.title}
              description={feature.description}
              Icon={feature.icon}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* Additional accent elements */}
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-purple-50/20 to-transparent pointer-events-none"></div>
    </section>
  );
}

interface FeatureProps {
  title: string;
  description: string;
  Icon: React.ComponentType<{ className?: string }>;
  index: number;
}

const Feature = ({ title, description, Icon, index }: FeatureProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isMobile = useIsMobile();
  
  const handleClick = () => {
    if (isMobile) {
      setIsExpanded(!isExpanded);
    }
  };
  
  // Get the color scheme for this icon
  const iconName = Icon.name || Icon.displayName || "";
  const colorScheme = iconColors[iconName as keyof typeof iconColors] || { bg: "bg-indigo-50", text: "text-indigo-600" };
  
  return (
    <motion.button
      className={cn(
        "relative w-full text-left group h-full flex flex-col",
        "rounded-lg transition-all duration-300",
        "bg-white hover:bg-white",
        "border border-gray-200/60 hover:border-gray-300/80",
        "p-4 sm:p-5",
        "focus:outline-none focus:ring-2 focus:ring-primary/20",
        !isMobile && "hover:shadow-md hover:-translate-y-0.5"
      )}
      onClick={handleClick}
      aria-expanded={isMobile ? isExpanded : undefined}
      whileHover={!isMobile ? { scale: 1.01 } : undefined}
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
      <div className="flex flex-col items-start gap-3 h-full">
        {/* Icon container with refined styling */}
        <motion.div 
          className={cn(
            "flex items-center justify-center",
            "w-12 h-12",
            "rounded-lg",
            "transition-all duration-300",
            colorScheme.bg,
            "group-hover:shadow-sm",
            "border border-opacity-10",
            `border-${colorScheme.text.split('-')[1]}-100`,
          )}
          whileHover={{ scale: 1.05 }}
        >
          <Icon className={cn(
            "w-6 h-6",
            colorScheme.text,
            "transition-all duration-300",
            "group-hover:scale-105",
            isMobile && isExpanded && "transform rotate-90"
          )} />
        </motion.div>
        
        <div className="text-left w-full flex-grow flex flex-col">
          <h3 className={cn(
            "text-base font-semibold leading-tight font-space mb-2",
            "text-gray-900 group-hover:text-indigo-600",
            "transition-colors duration-300"
          )}>
            {title}
          </h3>
          <div className={cn(
            "overflow-hidden transition-[max-height,opacity] duration-300",
            isMobile && !isExpanded ? "max-h-0 opacity-0" : "max-h-40 opacity-100",
            "flex-grow"
          )}>
            <p className="text-xs sm:text-sm text-gray-600 font-anek group-hover:text-gray-700">
              {description}
            </p>
          </div>
        </div>
      </div>
    </motion.button>
  );
};

// Add this to your global.css or tailwind config
// .animate-blob {
//   animation: blob-bounce 7s infinite;
// }
// .animation-delay-2000 {
//   animation-delay: 2s;
// }
// .animation-delay-4000 {
//   animation-delay: 4s;
// }
// @keyframes blob-bounce {
//   0% {
//     transform: translate(0px, 0px) scale(1);
//   }
//   33% {
//     transform: translate(30px, -50px) scale(1.1);
//   }
//   66% {
//     transform: translate(-20px, 20px) scale(0.9);
//   }
//   100% {
//     transform: translate(0px, 0px) scale(1);
//   }
// }

export default FeaturesSectionWithHoverEffects;
