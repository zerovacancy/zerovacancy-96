
import React, { useState, useEffect } from 'react';
import { Search, Mic, X } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { ContentTypeSelect } from './ContentTypeSelect';
import { LocationInput } from './LocationInput';
import { SearchButton } from './SearchButton';
import { SearchFilters } from './SearchFilters';
import { useIsMobile } from '@/hooks/use-mobile';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchBarProps {
  value?: string;
  onLocationSelect: (location: string) => void;
  showMobileOptions?: boolean;
  isVoiceActive?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
  value = '', 
  onLocationSelect,
  showMobileOptions = false,
  isVoiceActive = false
}) => {
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [searchStep, setSearchStep] = useState(0);
  const isMobile = useIsMobile();
  
  // Reset to step 0 if not mobile
  useEffect(() => {
    if (!isMobile) {
      setSearchStep(0);
    }
  }, [isMobile]);
  
  // Voice search feedback
  useEffect(() => {
    if (isVoiceActive) {
      // This would be connected to a real voice recognition API in production
      const timer = setTimeout(() => {
        onLocationSelect("New York, NY");
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [isVoiceActive, onLocationSelect]);
  
  // Mobile step-by-step UI
  const renderStepContent = () => {
    if (showMobileOptions && isMobile) {
      switch (searchStep) {
        case 1:
          return (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="py-2"
            >
              <LocationInput 
                value={value} 
                onLocationSelect={(loc) => {
                  onLocationSelect(loc);
                  setSearchStep(2);
                }} 
              />
            </motion.div>
          );
        case 2:
          return (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="py-2"
            >
              <ContentTypeSelect 
                onSelect={() => setSearchStep(3)}
              />
            </motion.div>
          );
        case 3:
          return (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="py-2"
            >
              <SearchFilters
                showMoreFilters={true}
                onToggleFilters={() => {}}
              />
              <div className="mt-4">
                <Button 
                  className="w-full bg-primary hover:bg-primary/90"
                  onClick={() => setSearchStep(0)}
                >
                  Apply Filters
                </Button>
              </div>
            </motion.div>
          );
        default:
          return null;
      }
    }
    return null;
  };

  // Voice feedback overlay
  const renderVoiceFeedback = () => {
    if (isVoiceActive) {
      return (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-50 bg-black/40 backdrop-blur-sm rounded-lg flex items-center justify-center"
        >
          <div className="bg-white rounded-lg p-6 text-center max-w-xs">
            <div className="relative mx-auto w-16 h-16 mb-4">
              <div className="absolute inset-0 bg-purple-200 rounded-full animate-ping opacity-75"></div>
              <div className="relative flex items-center justify-center w-16 h-16 bg-purple-500 rounded-full">
                <Mic className="h-8 w-8 text-white" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Listening...</h3>
            <p className="text-sm text-gray-600">Speak your location</p>
            <Button 
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={() => {}}
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          </div>
        </motion.div>
      );
    }
    return null;
  };

  return (
    <div className="w-full space-y-3 relative">
      <div className="flex flex-col gap-3">
        {/* Standard desktop search bar */}
        {(!showMobileOptions || !isMobile || searchStep === 0) && (
          <div className={cn(
            "relative flex flex-col sm:flex-row w-full rounded-lg sm:rounded-xl overflow-hidden",
            "sm:shadow-[0_3px_16px_rgba(0,0,0,0.08)]",
            "border border-gray-300 sm:border-gray-200",
            "bg-white divide-y sm:divide-y-0 sm:divide-x divide-gray-200",
            "transition-all duration-300",
            "hover:shadow-[0_5px_20px_rgba(0,0,0,0.1)]"
          )}>
            <ContentTypeSelect />
            <LocationInput value={value} onLocationSelect={onLocationSelect} />
            <SearchButton />
          </div>
        )}
        
        {/* Animated step content for mobile */}
        <AnimatePresence mode="wait">
          {renderStepContent()}
        </AnimatePresence>
        
        {/* Voice feedback overlay */}
        <AnimatePresence>
          {renderVoiceFeedback()}
        </AnimatePresence>

        {/* Mobile Search Button - Progressive steps */}
        {showMobileOptions && isMobile && searchStep === 0 && (
          <div className="sm:hidden">
            <Button 
              className={cn(
                "w-full h-11",
                "bg-primary hover:bg-primary/90 text-white",
                "shadow-sm hover:shadow-md transition-all duration-200",
                "text-sm rounded-lg",
                "flex items-center justify-center"
              )}
              onClick={() => setSearchStep(1)}
            >
              <Search className="w-5 h-5 mr-2" />
              Start Your Search
            </Button>
          </div>
        )}

        {/* Standard filters - only show on desktop or when not in step mode */}
        {(!showMobileOptions || !isMobile || searchStep === 0) && (
          <SearchFilters
            showMoreFilters={showMoreFilters}
            onToggleFilters={() => setShowMoreFilters(!showMoreFilters)}
          />
        )}
      </div>
    </div>
  );
};
