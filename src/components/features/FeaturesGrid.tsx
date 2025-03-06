
import { FeatureItem } from "./FeatureItem";
import { MobilePartialOverlay } from "./MobilePartialOverlay";

interface FeaturesGridProps {
  features: Array<{
    title: string;
    description: string;
    icon: string;
    isPopular?: boolean;
  }>;
  visibleFeatures: Array<{
    title: string;
    description: string;
    icon: string;
    isPopular?: boolean;
  }>;
  isMobile: boolean;
  showAllCards: boolean;
  toggleShowAllCards: () => void;
}

export const FeaturesGrid = ({
  features,
  visibleFeatures,
  isMobile,
  showAllCards,
  toggleShowAllCards
}: FeaturesGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 lg:gap-8 relative">
      {/* Regular Features */}
      {visibleFeatures.map((feature, index) => (
        <FeatureItem
          key={index}
          title={feature.title}
          description={feature.description}
          icon={feature.icon}
          index={index}
          isPopular={feature.isPopular}
          isPartiallyVisible={isMobile && !showAllCards && index === 2}
        />
      ))}
      
      {/* Partial card overlay with View More button (mobile only) */}
      {isMobile && (
        <MobilePartialOverlay 
          showAllCards={showAllCards} 
          toggleShowAllCards={toggleShowAllCards} 
        />
      )}
    </div>
  );
};

export default FeaturesGrid;
