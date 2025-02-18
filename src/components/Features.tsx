
import { useState } from "react";
import { cn } from "@/lib/utils";
import { IconCamera, IconDrone, IconVideo, IconBrandInstagram, IconCertificate, IconClock24, IconWallet, IconStars } from "@tabler/icons-react";
import { useIsMobile } from "@/hooks/use-mobile";

export function FeaturesSectionWithHoverEffects() {
  const features = [
    {
      title: "Professional Photography",
      description: "High-end property photos with precision and artistry",
      icon: <IconCamera className="w-6 h-6 sm:w-7 sm:h-7" />
    },
    {
      title: "Drone Photography",
      description: "Stunning aerial views that showcase unique perspectives",
      icon: <IconDrone className="w-6 h-6 sm:w-7 sm:h-7" />
    },
    {
      title: "Video Production",
      description: "Cinematic property tours that tell your story",
      icon: <IconVideo className="w-6 h-6 sm:w-7 sm:h-7" />
    },
    {
      title: "Social Media Content",
      description: "Engaging content optimized for all platforms",
      icon: <IconBrandInstagram className="w-6 h-6 sm:w-7 sm:h-7" />
    },
    {
      title: "Certified Professionals",
      description: "Verified experts in real estate content creation",
      icon: <IconCertificate className="w-6 h-6 sm:w-7 sm:h-7" />
    },
    {
      title: "Fast Turnaround",
      description: "Quick delivery to meet your marketing deadlines",
      icon: <IconClock24 className="w-6 h-6 sm:w-7 sm:h-7" />
    },
    {
      title: "Competitive Pricing",
      description: "Transparent rates with no hidden fees",
      icon: <IconWallet className="w-6 h-6 sm:w-7 sm:h-7" />
    },
    {
      title: "Quality Guaranteed",
      description: "100% satisfaction with free revisions",
      icon: <IconStars className="w-6 h-6 sm:w-7 sm:h-7" />
    }
  ];

  return (
    <section className="py-8 sm:py-14 lg:py-20 rounded-sm relative overflow-hidden bg-white/50 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-8 sm:mb-10 lg:mb-12 relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-xl sm:text-2xl lg:text-3xl mb-3 sm:mb-4 text-primary font-semibold">
            Professional Content Services
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground/90 max-w-xl mx-auto">
            Everything you need to showcase your properties with stunning visuals
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {features.map((feature, index) => (
          <Feature key={feature.title} {...feature} index={index} />
        ))}
      </div>
    </section>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isMobile = useIsMobile();

  return (
    <div 
      className={cn(
        "flex flex-col relative group/feature transition-all duration-300",
        "bg-white/40 backdrop-blur-sm rounded-lg shadow-sm border border-primary/5",
        "hover:bg-white/60 active:bg-white/70",
        isExpanded ? "p-4 sm:p-5" : "p-3 sm:p-4",
        isMobile && "cursor-default"
      )}
      onClick={() => isMobile && setIsExpanded(!isExpanded)}
      onMouseEnter={() => !isMobile && setIsExpanded(true)}
      onMouseLeave={() => !isMobile && setIsExpanded(false)}
    >
      <div className={cn(
        "flex items-start gap-3 relative z-10",
        isExpanded ? "mb-3" : "mb-0"
      )}>
        <div className={cn(
          "text-primary transition-transform duration-300 shrink-0 mt-0.5",
          isExpanded ? "scale-110" : "scale-100"
        )}>
          {icon}
        </div>
        <h3 className={cn(
          "text-sm font-semibold text-primary/90 transition-all duration-300 flex-1 leading-tight",
          "sm:text-base",
          isExpanded ? "opacity-100" : "opacity-90"
        )}>
          {title}
        </h3>
      </div>
      <div className={cn(
        "overflow-hidden transition-all duration-300 pl-9",
        isExpanded ? "max-h-20 sm:max-h-24" : "max-h-0"
      )}>
        <p className={cn(
          "text-sm leading-relaxed text-muted-foreground/80 relative z-10",
          "transition-opacity duration-200",
          isExpanded ? "opacity-100" : "opacity-0"
        )}>
          {description}
        </p>
      </div>
    </div>
  );
};

export default FeaturesSectionWithHoverEffects;
