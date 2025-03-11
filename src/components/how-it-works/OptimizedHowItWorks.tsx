
import React, { forwardRef } from 'react';
import { Search, Users, Calendar, FileCheck } from 'lucide-react';
import { SmallFeatureCard } from "@/components/SmallFeatureCard";

const HowItWorksSection = forwardRef<HTMLDivElement, {}>((props, ref) => {
  const steps = [
    {
      icon: Search,
      title: "DISCOVER",
      description: "Explore our curated network of visionaries whose lenses and perspectives reshape how people experience spaces."
    },
    {
      icon: Users,
      title: "CONNECT",
      description: "Immerse yourself in creative portfolios that reveal each creator's unique perspective on architectural storytelling."
    },
    {
      icon: Calendar,
      title: "COLLABORATE",
      description: "Lock in your vision with transparent investment structures. Your creative capital remains in escrow until your vision materializes."
    },
    {
      icon: FileCheck,
      title: "TRANSFORM",
      description: "Receive visual assets that transcend traditional property marketing and create emotional connections with your ideal audience."
    }
  ];

  return (
    <div ref={ref} className="py-10 sm:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-6 tracking-tight text-center">
            THE EXPERIENCE
          </h2>
          
          {/* Decorative element under the heading */}
          <div className="w-20 h-1 bg-gradient-to-r from-violet-500 via-purple-500 to-blue-500 mx-auto mb-3 sm:mb-6 rounded-full"></div>
          
          <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed text-center">
            From concept to captivation in four moments:
          </p>
        </div>

        {/* Steps Grid - Responsive for both mobile and desktop */}
        <div className="w-full mx-auto relative pt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {steps.map((step, index) => (
              <SmallFeatureCard
                key={index}
                icon={step.icon}
                title={step.title}
                description={step.description}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

// Add displayName to the component for better debugging
HowItWorksSection.displayName = "HowItWorksSection";

// Export the component
export default HowItWorksSection;
