
import React, { useState } from 'react';
import { Search, MapPin, Calendar, DollarSign, Sliders, Grid, List, Star, ChevronDown, Crown } from 'lucide-react';
import { Card } from './ui/card';
import { ShimmerButton } from './ui/shimmer-button';
import { Slider } from './ui/slider';
import { useIsMobile } from '@/hooks/use-mobile';
import { FeaturesSectionWithHoverEffects } from './Features';
import { PricingSection } from './Pricing';
import { BackgroundGradient } from './ui/background-gradient';
import FeaturedCreators from './FeaturedCreators';

const PreviewSearch = () => {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [radius, setRadius] = useState([25]);
  const isMobile = useIsMobile();

  return (
    <section className="relative section-padding py-[22px] bg-white hover:bg-background">
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-transparent pointer-events-none" />
      
      <div className="relative mx-auto max-w-7xl my-0 py-[28px]">
        <BackgroundGradient containerClassName="mx-4 sm:mx-0">
          <Card className="p-4 sm:p-6 mb-6 sm:mb-8 backdrop-blur-sm bg-[#F1F0FB]/95 border-[#E5DEFF] shadow-lg">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2 sm:mb-0">Find Your Perfect Creator</h2>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md hover:bg-gray-100 transition-colors ${viewMode === 'grid' ? 'bg-gray-200' : ''}`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md hover:bg-gray-100 transition-colors ${viewMode === 'list' ? 'bg-gray-200' : ''}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 sm:mb-6">
              <div className="flex items-center space-x-3 bg-white rounded-md shadow-sm px-4 py-2">
                <Search className="w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search creators..."
                  className="flex-1 border-none outline-none focus:ring-0 text-sm text-gray-700"
                />
              </div>

              <div className="flex items-center space-x-3 bg-white rounded-md shadow-sm px-4 py-2">
                <MapPin className="w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  placeholder="Enter location..."
                  className="flex-1 border-none outline-none focus:ring-0 text-sm text-gray-700"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4 sm:mb-6">
              <div className="flex items-center space-x-3 bg-white rounded-md shadow-sm px-4 py-2">
                <Calendar className="w-5 h-5 text-gray-500" />
                <input
                  type="date"
                  placeholder="Select date"
                  className="flex-1 border-none outline-none focus:ring-0 text-sm text-gray-700"
                />
              </div>

              <div className="flex items-center space-x-3 bg-white rounded-md shadow-sm px-4 py-2">
                <DollarSign className="w-5 h-5 text-gray-500" />
                <select className="flex-1 border-none outline-none focus:ring-0 text-sm text-gray-700">
                  <option>Budget</option>
                  <option>Under $500</option>
                  <option>$500 - $1000</option>
                  <option>$1000+</option>
                </select>
              </div>

              <div className="relative">
                <button
                  onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
                  className="flex items-center w-full space-x-2 bg-white rounded-md shadow-sm px-4 py-2"
                >
                  <Sliders className="w-5 h-5 text-gray-500" />
                  <span className="text-sm text-gray-700">Advanced Filters</span>
                  <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isAdvancedOpen ? 'rotate-180' : ''}`} />
                </button>

                {isAdvancedOpen && (
                  <div className="absolute left-0 right-0 mt-2 p-4 bg-white rounded-md shadow-lg z-10">
                    <h4 className="text-lg font-semibold mb-3">Advanced Filters</h4>

                    <div className="mb-3">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Radius:</label>
                      <div className="flex items-center space-x-2">
                        <Slider
                          defaultValue={radius}
                          max={100}
                          step={1}
                          onValueChange={(value) => setRadius(value)}
                        />
                        <span className="text-sm text-gray-500">{radius[0]} km</span>
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Rating:</label>
                      <div className="flex items-center space-x-2">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <button key={rating} className="text-yellow-500 hover:text-yellow-600 focus:outline-none">
                            <Star className="w-5 h-5" />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Top Creators:</label>
                      <div className="flex items-center space-x-2">
                        <button className="flex items-center space-x-1 bg-yellow-500 text-white rounded-full px-3 py-1 text-sm">
                          <Crown className="w-4 h-4" />
                          <span>Verified</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <ShimmerButton className="w-full h-12">Search Creators</ShimmerButton>
          </Card>
        </BackgroundGradient>
      </div>

      <FeaturedCreators />
      <FeaturesSectionWithHoverEffects />
      <PricingSection />
    </section>
  );
};

export default PreviewSearch;
