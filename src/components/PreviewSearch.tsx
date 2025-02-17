import React, { useState } from 'react';
import { Search, MapPin, Calendar, DollarSign, Sliders, Grid, List, Star, ChevronDown, Users, FileCheck, Crown } from 'lucide-react';
import { Card } from './ui/card';
import { ShimmerButton } from './ui/shimmer-button';
import { Slider } from './ui/slider';
import { useIsMobile } from '@/hooks/use-mobile';
import { FeaturesSectionWithHoverEffects } from './Features';
import { PricingSection } from './Pricing';
import { BackgroundGradient } from './ui/background-gradient';
import HowItWorksSection from './HowItWorksSection';

const PreviewSearch = () => {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [radius, setRadius] = useState([25]);
  const isMobile = useIsMobile();
  const steps = [{
    icon: <Search className="w-6 h-6" />,
    title: "Search & Filter",
    description: "Find your perfect creator match"
  }, {
    icon: <Users className="w-6 h-6" />,
    title: "Review & Compare",
    description: "Browse portfolios and reviews"
  }, {
    icon: <Calendar className="w-6 h-6" />,
    title: "Book & Pay",
    description: "Schedule securely through platform"
  }, {
    icon: <FileCheck className="w-6 h-6" />,
    title: "Get Content",
    description: "Receive and approve deliverables"
  }];

  return (
    <section className="relative section-padding py-[22px] bg-white hover:bg-background">
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-transparent pointer-events-none" />
      
      <div className="relative mx-auto max-w-7xl my-0 py-[28px]">
        <BackgroundGradient containerClassName="mx-4 sm:mx-0">
          <Card className="p-4 sm:p-6 mb-6 sm:mb-8 backdrop-blur-sm bg-[#F1F0FB]/95 border-[#E5DEFF] shadow-lg">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="section-title">Discover Local Creators</h2>
              <p className="section-subtitle max-w-2xl mx-auto">
                Connect with professional photographers, videographers, and content creators in your area
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 p-4 border border-[#E5DEFF] rounded-lg bg-white/90">
              <div className="search-group">
                <MapPin className="w-5 h-5 text-muted-foreground group-focus-within:text-primary flex-shrink-0" />
                <input type="text" placeholder="Enter Location" className="search-input" />
              </div>

              <div className="search-group">
                <Search className="w-5 h-5 text-muted-foreground group-focus-within:text-primary flex-shrink-0" />
                <select className="search-input appearance-none cursor-pointer">
                  <option value="">Content Type</option>
                  <option value="photography">Photography</option>
                  <option value="videography">Videography</option>
                  <option value="drone">Drone</option>
                  <option value="3d-tours">3D Tours</option>
                  <option value="social-media">Social Media</option>
                </select>
              </div>

              <div className="search-group">
                <Calendar className="w-5 h-5 text-muted-foreground group-focus-within:text-primary flex-shrink-0" />
                <input type="date" className="search-input" />
              </div>

              <ShimmerButton className="w-full h-14 text-base" background="#1A1F2C">
                Find Creators
              </ShimmerButton>
            </div>

            <div className="flex items-center justify-center">
              <button onClick={() => setIsAdvancedOpen(!isAdvancedOpen)} className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors p-2 relative">
                <Sliders className="w-4 h-4" />
                Advanced Filters
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isAdvancedOpen ? 'rotate-180' : ''}`} />
                <span className="ml-2 inline-flex items-center gap-1 bg-primary/10 text-primary rounded-full px-2 py-0.5 text-xs font-medium">
                  <Crown className="w-3 h-3" />
                  PRO
                </span>
              </button>
            </div>

            <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 overflow-hidden transition-all duration-200 ${isAdvancedOpen ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0'}`}>
              <div className="space-y-4">
                <label className="text-sm font-medium">Distance Range</label>
                <div className="px-3">
                  <Slider value={radius} onValueChange={setRadius} max={100} step={1} className="touch-none" />
                  <div className="mt-2 text-sm text-muted-foreground">
                    Within {radius}mi
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-medium">Experience Level</label>
                <div className="space-y-3">
                  {['New', 'Verified', 'Top-rated'].map(level => <label key={level} className="flex items-center gap-2 text-sm cursor-pointer p-2">
                      <input type="checkbox" className="rounded border-muted w-4 h-4" />
                      {level}
                    </label>)}
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-medium">Minimum Rating</label>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-primary text-primary" />
                  <select className="bg-secondary p-2 rounded-md border-none focus:outline-none text-sm min-h-[40px]">
                    <option value="4.0">4.0+</option>
                    <option value="4.5">4.5+</option>
                    <option value="4.8">4.8+</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="border-t border-border/50 my-0" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map(index => <BackgroundGradient key={index} containerClassName="w-full">
                  <Card className="group h-full overflow-hidden transition-all duration-200 hover:-translate-y-1 bg-white/80 backdrop-blur-sm">
                    <div className="relative aspect-video bg-muted">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="font-semibold">John Doe</h3>
                        <p className="text-sm opacity-90">Drone & Photography</p>
                      </div>
                      <div className="absolute top-4 right-4 bg-black/50 px-2 py-1 rounded-full text-white text-sm">
                        From $200
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-4">
                        <Star className="w-4 h-4 fill-primary text-primary" />
                        <span className="text-sm font-medium">4.8</span>
                        <span className="text-sm text-muted-foreground">(47 reviews)</span>
                      </div>
                      <ShimmerButton className="w-full h-10 text-sm" background="#1A1F2C">
                        View Profile
                      </ShimmerButton>
                    </div>
                  </Card>
                </BackgroundGradient>)}
            </div>
          </Card>
        </BackgroundGradient>
      </div>

      <HowItWorksSection />
      <FeaturesSectionWithHoverEffects />
      <PricingSection />
    </section>
  );
};

export default PreviewSearch;
