
import { features } from "./feature-data";
import { FeatureItem } from "./FeatureItem";
import { FeatureHeader } from "./FeatureHeader";
import { BackgroundEffects } from "./BackgroundEffects";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

export function FeaturesSectionWithHoverEffects() {
  const isMobile = useIsMobile();
  
  return (
    <section className="relative py-10 sm:py-14 lg:py-18 px-3 sm:px-5 lg:px-8 overflow-hidden">
      <BackgroundEffects />

      <div className="max-w-6xl mx-auto relative z-10">
        <FeatureHeader 
          title="Professional Content Creation Services"
          description="Everything you need to showcase your properties with stunning visuals and engaging content"
        />
        
        <div className={cn(
          "grid gap-3 sm:gap-4 lg:gap-5 mx-auto",
          isMobile 
            ? "grid-cols-2" 
            : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
          "max-w-xs sm:max-w-none",
          "sm:px-4 md:px-8 lg:px-0"
        )}>
          {features.map((feature, index) => (
            <FeatureItem
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSectionWithHoverEffects;
