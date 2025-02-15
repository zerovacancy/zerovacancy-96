
import { cn } from "@/lib/utils";
import {
  IconCamera,
  IconDrone,
  IconVideo,
  IconBrandInstagram,
  IconCertificate,
  IconClockHour24,
  IconWallet,
  IconStars,
} from "@tabler/icons-react";

export function FeaturesSectionWithHoverEffects() {
  const features = [
    {
      title: "Professional Photography",
      description:
        "High-quality, professionally edited real estate photography that showcases properties at their best.",
      icon: <IconCamera />,
    },
    {
      title: "Drone Aerial Coverage",
      description:
        "FAA-certified drone operators capturing stunning aerial views and property surroundings.",
      icon: <IconDrone />,
    },
    {
      title: "Video Production",
      description:
        "Cinematic property tours and promotional videos that tell your property's unique story.",
      icon: <IconVideo />,
    },
    {
      title: "Social Media Content",
      description: "Engaging content optimized for all major social platforms and marketing channels.",
      icon: <IconBrandInstagram />,
    },
    {
      title: "Verified Creators",
      description: "Every creator is thoroughly vetted and verified for quality and professionalism.",
      icon: <IconCertificate />,
    },
    {
      title: "24/7 Availability",
      description:
        "Book creators any time, with flexible scheduling to meet your deadlines.",
      icon: <IconClockHour24 />,
    },
    {
      title: "Transparent Pricing",
      description:
        "Clear, upfront pricing with no hidden fees. Pay only for what you need.",
      icon: <IconWallet />,
    },
    {
      title: "Quality Guaranteed",
      description: "100% satisfaction guarantee on all content. Your property deserves the best.",
      icon: <IconStars />,
    },
  ];
  return (
    <section className="bg-secondary/50 py-16 sm:py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 max-w-7xl mx-auto">
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
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r border-primary/10 py-10 relative group/feature",
        (index === 0 || index === 4) && "lg:border-l",
        index < 4 && "lg:border-b"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-secondary to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-secondary to-transparent pointer-events-none" />
      )}
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
    </div>
  );
};

export default FeaturesSectionWithHoverEffects;
