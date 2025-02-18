
import { useState } from "react";
import { cn } from "@/lib/utils";
import { IconCamera, IconDrone, IconVideo, IconBrandInstagram, IconCertificate, IconClock24, IconWallet, IconStars } from "@tabler/icons-react";
import { BorderTrail } from "./ui/border-trail";
import { GlowingEffect } from "./ui/glowing-effect";

export function FeaturesSectionWithHoverEffects() {
  const features = [
    {
      title: "Professional Photography",
      description: "High-quality property photos that capture every detail with precision and artistry",
      icon: <IconCamera className="w-6 h-6" />
    },
    {
      title: "Drone Photography",
      description: "Stunning aerial views that showcase properties and their surroundings from unique perspectives",
      icon: <IconDrone className="w-6 h-6" />
    },
    {
      title: "Video Production",
      description: "Cinematic property tours and promotional videos that tell your property's story",
      icon: <IconVideo className="w-6 h-6" />
    },
    {
      title: "Social Media Content",
      description: "Engaging content optimized for Instagram, Facebook, and other social platforms",
      icon: <IconBrandInstagram className="w-6 h-6" />
    },
    {
      title: "Certified Professionals",
      description: "Work with verified and experienced real estate content creators",
      icon: <IconCertificate className="w-6 h-6" />
    },
    {
      title: "Fast Turnaround",
      description: "Quick delivery times to meet your listing deadlines and marketing schedules",
      icon: <IconClock24 className="w-6 h-6" />
    },
    {
      title: "Competitive Pricing",
      description: "Transparent, market-competitive rates with no hidden fees",
      icon: <IconWallet className="w-6 h-6" />
    },
    {
      title: "Quality Guaranteed",
      description: "100% satisfaction guarantee on all deliverables with free revisions",
      icon: <IconStars className="w-6 h-6" />
    }
  ];

  return (
    <section className="py-8 sm:py-16 rounded-sm relative overflow-hidden bg-white/50 backdrop-blur-sm">
      <div className="absolute inset-0 -z-10 h-full w-full 
        [background-image:linear-gradient(to_right,rgba(176,108,234,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(176,108,234,0.1)_1px,transparent_1px)]
        [background-size:6rem_4rem]
        [mask-image:radial-gradient(ellipse_at_center,white,transparent)]
        before:absolute before:inset-0
        before:bg-[radial-gradient(circle_at_center,#4F46E5,transparent)]
        before:opacity-30
        after:absolute after:h-full after:w-full
        after:[background:linear-gradient(to_right,#4F46E5,#EC4899)]
        after:opacity-10 after:animate-aurora">
      </div>
      <BorderTrail 
        className="bg-primary/20" 
        size={80}
        transition={{
          repeat: Infinity,
          duration: 8,
          ease: "linear"
        }}
      />
      <GlowingEffect 
        blur={20}
        spread={30}
        borderWidth={2}
        className="opacity-50"
        glow
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12 relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="section-title text-xl sm:text-2xl lg:text-3xl mb-3 sm:mb-4 text-primary font-semibold">
            Professional Content Creation Services
          </h2>
          <p className="section-subtitle text-sm sm:text-base text-muted-foreground/90 max-w-xl mx-auto">
            Everything you need to showcase your properties with stunning visuals and engaging content
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {features.map((feature, index) => <Feature key={feature.title} {...feature} index={index} />)}
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

  return (
    <div 
      className={cn(
        "flex flex-col relative group/feature cursor-pointer transition-all duration-300",
        "bg-white/40 backdrop-blur-sm rounded-lg shadow-sm border border-primary/5",
        "hover:bg-white/60",
        isExpanded ? "p-4 sm:p-5" : "p-3"
      )}
      onClick={() => setIsExpanded(!isExpanded)}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className={cn(
        "mb-2 relative z-10 text-primary transition-transform duration-300",
        isExpanded ? "scale-110" : "scale-100"
      )}>
        {icon}
      </div>
      <div className={cn(
        "text-sm sm:text-base font-semibold mb-1.5 relative z-10 transition-all duration-300",
        isExpanded ? "translate-x-2" : ""
      )}>
        <div className={cn(
          "absolute left-0 inset-y-0 h-5 sm:h-6 w-0.5 rounded-tr-full rounded-br-full",
          "bg-primary/20 group-hover/feature:bg-primary transition-all duration-200 origin-center"
        )} />
        <span className="group-hover/feature:translate-x-2 transition duration-200 block text-primary/90 line-clamp-2 text-left">
          {title}
        </span>
      </div>
      <p className={cn(
        "text-xs sm:text-sm leading-relaxed text-muted-foreground/80 relative z-10 transition-all duration-300 text-left",
        isExpanded ? "opacity-100 max-h-32 line-clamp-none" : "opacity-0 max-h-0 overflow-hidden line-clamp-2"
      )}>
        {description}
      </p>
    </div>
  );
};

export default FeaturesSectionWithHoverEffects;
