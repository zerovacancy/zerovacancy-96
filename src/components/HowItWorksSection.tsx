import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import { Search, Users, FileCheck, Calendar, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StepsSectionProps {
  completedSteps: number[];
}

type StepInfo = {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
};

export const StepsSection: React.FC<StepsSectionProps> = ({ completedSteps }) => {
  const isMobile = useIsMobile();
  const [activeStep, setActiveStep] = useState(0);
  const [showLeftNav, setShowLeftNav] = useState(false);
  const [showRightNav, setShowRightNav] = useState(true);
  const [layoutType, setLayoutType] = useState<'scroll' | 'grid'>('scroll');
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const steps: StepInfo[] = [
    {
      id: 1,
      title: "Define Your Needs",
      description: "Tell us what type of content you need and your target audience.",
      icon: <Search className="h-5 w-5" />,
      color: "bg-blue-500",
    },
    {
      id: 2,
      title: "Match with Creators",
      description: "Get matched with content creators that specialize in your niche.",
      icon: <Users className="h-5 w-5" />,
      color: "bg-purple-500",
    },
    {
      id: 3,
      title: "Review Deliverables",
      description: "Review and provide feedback on the content created for you.",
      icon: <FileCheck className="h-5 w-5" />,
      color: "bg-green-500",
    },
    {
      id: 4,
      title: "Schedule Publishing",
      description: "Plan your content calendar and schedule posting times.",
      icon: <Calendar className="h-5 w-5" />,
      color: "bg-orange-500",
    }
  ];

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    
    // Show/hide navigation buttons based on scroll position
    setShowLeftNav(scrollLeft > 20);
    setShowRightNav(scrollLeft < scrollWidth - clientWidth - 20);
    
    // Determine which card is active based on scroll position
    const cardWidth = 240 + 16; // card width + gap
    const newActiveStep = Math.round(scrollLeft / cardWidth);
    setActiveStep(newActiveStep);
  };

  const scrollToStep = (index: number) => {
    if (!scrollContainerRef.current) return;
    
    const cardWidth = 240 + 16; // card width + gap
    scrollContainerRef.current.scrollTo({
      left: index * cardWidth,
      behavior: 'smooth'
    });
  };

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      scrollToStep(activeStep + 1);
    }
  };

  const handlePrev = () => {
    if (activeStep > 0) {
      scrollToStep(activeStep - 1);
    }
  };

  // Add RTL support
  const isRTL = document.dir === 'rtl';

  // Update scroll indicators on window resize
  useEffect(() => {
    window.addEventListener('resize', handleScroll);
    return () => window.removeEventListener('resize', handleScroll);
  }, []);

  if (!isMobile) {
    // Return the original desktop implementation
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
        {steps.map((step) => (
          <div 
            key={step.id}
            className="bg-white rounded-lg shadow-sm p-6 relative"
          >
            <div className={`absolute top-0 left-6 transform -translate-y-1/2 w-10 h-10 rounded-full ${step.color} flex items-center justify-center text-white`}>
              {completedSteps.includes(step.id) ? (
                <Check className="h-5 w-5" />
              ) : (
                <span>{step.id}</span>
              )}
            </div>
            <div className="mt-4">
              <div className="flex items-center mb-3">
                {step.icon}
                <h3 className="ml-2 font-medium text-lg">{step.title}</h3>
              </div>
              <p className="text-gray-600">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="mt-8 relative">
      {/* Layout Toggle */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setLayoutType(layoutType === 'scroll' ? 'grid' : 'scroll')}
          className="text-sm bg-gray-100 px-3 py-1 rounded-md"
        >
          {layoutType === 'scroll' ? 'Grid View' : 'Scroll View'}
        </button>
      </div>

      {layoutType === 'grid' ? (
        /* 2x2 Grid Layout */
        <div className="grid grid-cols-2 gap-3">
          {steps.map((step) => (
            <div 
              key={step.id}
              className={cn(
                "bg-white rounded-lg shadow-sm p-3 relative border-l-4",
                step.color.replace('bg-', 'border-'),
                activeStep === step.id - 1 ? "ring-2 ring-blue-300" : ""
              )}
            >
              <div className="flex items-center mb-1">
                <div className={`w-6 h-6 rounded-full ${step.color} flex items-center justify-center text-white text-xs mr-1`}>
                  {completedSteps.includes(step.id) ? <Check className="h-3 w-3" /> : step.id}
                </div>
                <h3 className="font-medium text-sm truncate">{step.title}</h3>
              </div>
              <p className="text-gray-600 text-xs line-clamp-3">{step.description}</p>
            </div>
          ))}
        </div>
      ) : (
        /* Horizontally Scrollable Cards */
        <>
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto pb-6 pt-1 px-1 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            onScroll={handleScroll}
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                className={cn(
                  "flex-shrink-0 w-60 h-32 bg-white rounded-lg shadow-sm p-4 mx-2 snap-center",
                  "border-t-4 transition-all duration-300",
                  step.color.replace('bg-', 'border-'),
                  activeStep === index ? "ring-2 ring-blue-300 shadow-md" : ""
                )}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center mb-2">
                  <div className={`w-6 h-6 rounded-full ${step.color} flex items-center justify-center text-white text-xs`}>
                    {completedSteps.includes(step.id) ? <Check className="h-3 w-3" /> : step.id}
                  </div>
                  <h3 className="ml-2 font-medium text-sm">{step.title}</h3>
                  {step.icon && <div className="ml-auto">{step.icon}</div>}
                </div>
                <p className="text-gray-600 text-xs line-clamp-3">{step.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <motion.button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-r-lg p-1 shadow-md"
            onClick={handlePrev}
            initial={{ opacity: 0 }}
            animate={{ opacity: showLeftNav ? 1 : 0 }}
            whileTap={{ scale: 0.9 }}
            disabled={!showLeftNav}
            aria-label="Previous step"
          >
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </motion.button>

          <motion.button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-l-lg p-1 shadow-md"
            onClick={handleNext}
            initial={{ opacity: 0 }}
            animate={{ opacity: showRightNav ? 1 : 0 }}
            whileTap={{ scale: 0.9 }}
            disabled={!showRightNav}
            aria-label="Next step"
          >
            <ChevronRight className="h-5 w-5 text-gray-600" />
          </motion.button>

          {/* Step Indicators */}
          <div className="flex justify-center mt-2 space-x-1">
            {steps.map((step, index) => (
              <button
                key={step.id}
                className={cn(
                  "w-2 h-2 rounded-full transition-all",
                  activeStep === index ? step.color : "bg-gray-300"
                )}
                onClick={() => scrollToStep(index)}
                aria-label={`Go to step ${step.id}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
