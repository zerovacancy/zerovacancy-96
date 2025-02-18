
import { cn } from "@/lib/utils";
import { IconCamera, IconDrone, IconVideo, IconBrandInstagram, IconCertificate, IconClock24, IconWallet, IconStars } from "@tabler/icons-react";
import { BorderTrail } from "./ui/border-trail";
import { GlowingEffect } from "./ui/glowing-effect";

export function FeaturesSectionWithHoverEffects() {
  const features = [
    {
      title: "Professional Photography",
      description: "High-quality property photos that capture every detail with precision and artistry",
      icon: <IconCamera className="w-8 h-8" />
    },
    {
      title: "Drone Photography",
      description: "Stunning aerial views that showcase properties and their surroundings from unique perspectives",
      icon: <IconDrone className="w-8 h-8" />
    },
    {
      title: "Video Production",
      description: "Cinematic property tours and promotional videos that tell your property's story",
      icon: <IconVideo className="w-8 h-8" />
    },
    {
      title: "Social Media Content",
      description: "Engaging content optimized for Instagram, Facebook, and other social platforms",
      icon: <IconBrandInstagram className="w-8 h-8" />
    },
    {
      title: "Certified Professionals",
      description: "Work with verified and experienced real estate content creators",
      icon: <IconCertificate className="w-8 h-8" />
    },
    {
      title: "Fast Turnaround",
      description: "Quick delivery times to meet your listing deadlines and marketing schedules",
      icon: <IconClock24 className="w-8 h-8" />
    },
    {
      title: "Competitive Pricing",
      description: "Transparent, market-competitive rates with no hidden fees",
      icon: <IconWallet className="w-8 h-8" />
    },
    {
      title: "Quality Guaranteed",
      description: "100% satisfaction guarantee on all deliverables with free revisions",
      icon: <IconStars className="w-8 h-8" />
    }
  ];

  return (
    <section className="py-16 sm:py-24 rounded-sm relative overflow-hidden">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white 
        [background-image:linear-gradient(to_right,rgba(176,108,234,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(176,108,234,0.2)_1px,transparent_1px)]
        [background-size:6rem_4rem]
        [mask-image:radial-gradient(ellipse_at_center,white,transparent)]
        before:absolute before:inset-0
        before:bg-[radial-gradient(circle_at_center,#4F46E5,transparent)]
        before:opacity-40
        after:absolute after:h-full after:w-full
        after:[background:linear-gradient(to_right,#4F46E5,#EC4899)]
        after:opacity-20 after:animate-aurora">
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
      <div className="mx-auto max-w-7xl px-6 lg:px-8 mb-12 relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="section-title">Professional Content Creation Services</h2>
          <p className="section-subtitle">
            Everything you need to showcase your properties with stunning visuals and engaging content
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 max-w-7xl mx-auto">
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
  return <div className={cn("flex flex-col lg:border-r border-primary/10 py-10 relative group/feature", (index === 0 || index === 4) && "lg:border-l", index < 4 && "lg:border-b")}>
      {index < 4 && <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-secondary to-transparent pointer-events-none" />}
      {index >= 4 && <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-secondary to-transparent pointer-events-none" />}
      <div className="mb-4 relative z-10 px-10 text-muted-foreground">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-primary/20 group-hover/feature:bg-primary transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-foreground">
          {title}
        </span>
      </div>
      <p className="text-sm text-muted-foreground max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>;
};

export default FeaturesSectionWithHoverEffects;
