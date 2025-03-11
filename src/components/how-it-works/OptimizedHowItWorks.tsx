
import React, { useState } from 'react';
import { Search, Users, Calendar, FileCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

const HowItWorksSection = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);

  const steps = [
    {
      icon: <Search className="w-5 h-5" />,
      title: "DISCOVER",
      description: "Explore our curated network of visionaries whose lenses and perspectives reshape how people experience spaces.",
      number: "01",
      gradientFrom: "#8B5CF6", 
      gradientTo: "#6D28D9",
      gradientDirection: "135deg"
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "CONNECT",
      description: "Immerse yourself in creative portfolios that reveal each creator's unique perspective on architectural storytelling.",
      number: "02",
      gradientFrom: "#2563EB", 
      gradientTo: "#4F46E5",
      gradientDirection: "135deg"
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      title: "COLLABORATE",
      description: "Lock in your vision with transparent investment structures. Your creative capital remains in escrow until your vision materializes.",
      number: "03",
      gradientFrom: "#F59E0B", 
      gradientTo: "#EA580C",
      gradientDirection: "135deg"
    },
    {
      icon: <FileCheck className="w-5 h-5" />,
      title: "TRANSFORM",
      description: "Receive visual assets that transcend traditional property marketing and create emotional connections with your ideal audience.",
      number: "04",
      gradientFrom: "#10B981", 
      gradientTo: "#059669",
      gradientDirection: "135deg"
    }
  ];

  // Handle step interaction
  const handleStepInteraction = (index) => {
    setActiveStep(index);
    if (!completedSteps.includes(index) && index > 0) {
      setCompletedSteps([...completedSteps, index - 1]);
    }
  };

  // Get the accent color by extracting from gradient
  const getAccentColor = (step) => {
    return step.gradientFrom || '#8B5CF6';
  };

  return (
    <div className="py-10 sm:py-16 lg:py-20 bg-gray-50">
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

        {/* Mobile Steps Navigation */}
        <div className="md:hidden w-full mb-4">
          {/* Navigation controls */}
          <div className="flex justify-between items-center mb-4">
            <button 
              onClick={() => activeStep > 0 && handleStepInteraction(activeStep - 1)}
              disabled={activeStep === 0}
              className={`flex items-center gap-1 text-sm ${activeStep === 0 ? 'text-gray-300' : 'text-indigo-600'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
              <span>Previous</span>
            </button>

            <div className="text-sm text-gray-500">
              {activeStep + 1} of {steps.length}
            </div>

            <button 
              onClick={() => activeStep < steps.length - 1 && handleStepInteraction(activeStep + 1)}
              disabled={activeStep === steps.length - 1}
              className={`flex items-center gap-1 text-sm ${activeStep === steps.length - 1 ? 'text-gray-300' : 'text-indigo-600'}`}
            >
              <span>Next</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>

          {/* Mobile Step Item */}
          <div className="px-1">
            {steps.map((step, index) => (
              <div 
                key={index}
                className={index !== activeStep ? "hidden" : ""}
              >
                <div 
                  onClick={() => handleStepInteraction(index)}
                  className={cn(
                    "relative p-5 transition-all duration-200 cursor-pointer",
                    "bg-white border border-gray-100 rounded-xl shadow-sm",
                    "flex flex-col h-full min-h-[140px] mb-4",
                    "border-l-4",
                    "active:scale-[0.99]"
                  )}
                  style={{
                    borderLeftColor: getAccentColor(step),
                  }}
                >
                  {/* Header with number and title */}
                  <div className="flex items-center gap-3 mb-3">
                    {/* Circle Number Badge */}
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-sm font-semibold shadow-sm text-white"
                      style={{
                        background: `linear-gradient(${step.gradientDirection}, ${step.gradientFrom}, ${step.gradientTo})`
                      }}>
                      {index + 1}

                      {/* Completed checkmark */}
                      {completedSteps.includes(index) && (
                        <div className="absolute -right-1 -top-1 bg-white rounded-full p-0.5 shadow-sm">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Title */}
                    <h4 className="text-base font-bold text-gray-900 flex-grow">
                      {step.title}
                    </h4>

                    {/* Icon */}
                    <div className="rounded-full p-2 flex-shrink-0 text-white"
                      style={{
                        background: `linear-gradient(${step.gradientDirection}, ${step.gradientFrom}, ${step.gradientTo})`
                      }}>
                      {React.cloneElement(step.icon, {
                        className: "w-4 h-4"
                      })}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm leading-relaxed text-gray-600">
                    {step.description}
                  </p>

                  {/* Active indicator dot */}
                  <div className="absolute bottom-3 right-3 w-2 h-2 rounded-full animate-pulse"
                    style={{
                      background: `linear-gradient(${step.gradientDirection}, ${step.gradientFrom}, ${step.gradientTo})`
                    }}>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Progress indicators */}
          <div className="flex justify-center gap-1.5 mt-2">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => handleStepInteraction(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === activeStep
                    ? 'bg-indigo-600 w-4'
                    : 'bg-gray-300'
                }`}
                aria-label={`Go to step ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Desktop Steps Grid */}
        <div className="hidden md:block w-full mx-auto relative pt-8">
          {/* Connecting Lines (Using absolute positioning) */}
          <div className="absolute top-16 left-0 w-full z-0 hidden lg:block pointer-events-none">
            {/* First connector line - violet to blue */}
            <div className="absolute top-8 left-[23%] w-[18%] h-0.5 bg-gradient-to-r from-violet-500 to-blue-500">
              <div className="absolute -right-3 -top-[7px] text-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </div>
            </div>
            
            {/* Second connector line - blue to amber */}
            <div className="absolute top-8 left-[48%] w-[18%] h-0.5 bg-gradient-to-r from-blue-500 to-amber-500">
              <div className="absolute -right-3 -top-[7px] text-amber-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </div>
            </div>
            
            {/* Third connector line - amber to emerald */}
            <div className="absolute top-8 left-[73%] w-[18%] h-0.5 bg-gradient-to-r from-amber-500 to-emerald-500">
              <div className="absolute -right-3 -top-[7px] text-emerald-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </div>
            </div>
          </div>

          {/* Grid container */}
          <div className="grid w-full grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-8 relative">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className={`relative z-10 transition-all duration-500 ${
                  index === activeStep ? 'scale-[1.02]' : 'scale-100'
                }`}
              >
                <div 
                  onClick={() => handleStepInteraction(index)}
                  className={cn(
                    "relative h-full min-h-[190px] px-6 py-7 rounded-xl",
                    "transition-all duration-300 group cursor-pointer",
                    "border hover:border-opacity-100 active:scale-[0.98]",
                    "touch-manipulation",
                    "shadow-sm hover:shadow-md",
                    "flex flex-col items-center justify-start",
                    activeStep === index && "ring-1 ring-offset-2"
                  )}
                  style={{
                    borderColor: activeStep === index ? getAccentColor(step) : getAccentColor(step) + '33',
                    borderWidth: activeStep === index ? '2px' : '1px',
                    borderLeftWidth: activeStep === index ? '3px' : '1px',
                    borderRadius: '12px',
                    backgroundColor: getAccentColor(step) + (activeStep === index ? '12' : '08'),
                    boxShadow: activeStep === index ? '0 4px 12px rgba(0,0,0,0.08)' : '0 2px 8px rgba(0,0,0,0.05)',
                    transform: activeStep === index ? 'translateY(-5px)' : 'translateY(0)',
                  }}
                >
                  {/* Step Number badge with gradient */}
                  <div className="absolute -top-3 left-5 z-10">
                    <span 
                      className="inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold ring-2 ring-white shadow-sm text-white"
                      style={{
                        background: `linear-gradient(${step.gradientDirection}, ${step.gradientFrom}, ${step.gradientTo})`
                      }}
                    >
                      {step.number}
                      
                      {/* Completed checkmark */}
                      {completedSteps.includes(index) && (
                        <div className="absolute -right-1 -top-1 bg-white rounded-full p-0.5 shadow-sm">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-2.5 h-2.5 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </div>
                      )}
                    </span>
                  </div>
                  
                  {/* Icon with gradient background */}
                  <div 
                    className="mb-5 rounded-lg p-4 transition-all duration-300 group-hover:scale-105 shadow-sm text-white"
                    style={{
                      background: `linear-gradient(${step.gradientDirection}, ${step.gradientFrom}, ${step.gradientTo})`
                    }}
                  >
                    {React.cloneElement(step.icon, {
                      className: "w-7 h-7"
                    })}
                  </div>
                  
                  {/* Title */}
                  <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-3 text-center">
                    {step.title}
                  </h4>
                  
                  {/* Description */}
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed text-center">
                    {step.description}
                  </p>
                  
                  {/* Learn More indicator */}
                  <div className="mt-auto pt-3 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-blue-600 flex items-center gap-1">
                    <span>Learn more</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </div>
                  
                  {/* Active indicator */}
                  {activeStep === index && (
                    <div 
                      className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-10 h-1 rounded-full animate-pulse"
                      style={{
                        background: `linear-gradient(${step.gradientDirection}, ${step.gradientFrom}, ${step.gradientTo})`
                      }}
                    ></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Add displayName to the component for better debugging
HowItWorksSection.displayName = "HowItWorksSection";

// Export the component
export default HowItWorksSection;
