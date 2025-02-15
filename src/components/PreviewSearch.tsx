import React, { useState } from 'react';
import { Search, MapPin, Calendar, DollarSign, Sliders, Grid, List, Star, ChevronDown } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
const PreviewSearch = () => {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [radius, setRadius] = useState([25]);
  return <section className="relative bg-secondary/50 section-padding py-0">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-transparent pointer-events-none" />
      
      <div className="relative mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Discover Local Creators</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Connect with professional photographers, videographers, and content creators in your area
          </p>
        </div>

        {/* Main Search Bar */}
        <Card className="p-6 mb-8 backdrop-blur-sm bg-background/95 border-0 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div className="group flex items-center gap-2 p-4 bg-secondary rounded-lg transition-all duration-200 focus-within:bg-background focus-within:shadow-sm">
              <MapPin className="w-5 h-5 text-muted-foreground group-focus-within:text-primary" />
              <input type="text" placeholder="Enter Location" className="w-full bg-transparent border-none focus:outline-none placeholder:text-muted-foreground/70" />
            </div>

            <div className="group flex items-center gap-2 p-4 bg-secondary rounded-lg transition-all duration-200 focus-within:bg-background focus-within:shadow-sm">
              <Search className="w-5 h-5 text-muted-foreground group-focus-within:text-primary" />
              <select className="w-full bg-transparent border-none focus:outline-none appearance-none cursor-pointer">
                <option value="">Content Type</option>
                <option value="photography">Photography</option>
                <option value="videography">Videography</option>
                <option value="drone">Drone</option>
                <option value="3d-tours">3D Tours</option>
                <option value="social-media">Social Media</option>
              </select>
            </div>

            <div className="group flex items-center gap-2 p-4 bg-secondary rounded-lg transition-all duration-200 focus-within:bg-background focus-within:shadow-sm">
              <Calendar className="w-5 h-5 text-muted-foreground group-focus-within:text-primary" />
              <input type="date" className="w-full bg-transparent border-none focus:outline-none" />
            </div>

            <Button className="w-full h-14 text-base hover:scale-[1.02] transition-transform">
              Find Creators
            </Button>
          </div>

          {/* Advanced Filters Toggle */}
          <button onClick={() => setIsAdvancedOpen(!isAdvancedOpen)} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mx-auto">
            <Sliders className="w-4 h-4" />
            Advanced Filters
            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isAdvancedOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Advanced Filters Panel */}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 overflow-hidden transition-all duration-200 ${isAdvancedOpen ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0'}`}>
            <div className="space-y-4">
              <label className="text-sm font-medium">Distance Range</label>
              <div className="px-3">
                <Slider value={radius} onValueChange={setRadius} max={100} step={1} />
                <div className="mt-2 text-sm text-muted-foreground">
                  Within {radius}mi
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-sm font-medium">Experience Level</label>
              <div className="space-y-2">
                {['New', 'Verified', 'Top-rated'].map(level => <label key={level} className="flex items-center gap-2 text-sm cursor-pointer">
                    <input type="checkbox" className="rounded border-muted" />
                    {level}
                  </label>)}
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-sm font-medium">Minimum Rating</label>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-primary text-primary" />
                <select className="bg-secondary p-2 rounded-md border-none focus:outline-none text-sm">
                  <option value="4.0">4.0+</option>
                  <option value="4.5">4.5+</option>
                  <option value="4.8">4.8+</option>
                </select>
              </div>
            </div>
          </div>
        </Card>

        {/* View Toggle & Sort Options */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <button onClick={() => setViewMode('grid')} className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-secondary' : 'hover:bg-secondary/50'}`}>
              <Grid className="w-5 h-5" />
            </button>
            <button onClick={() => setViewMode('list')} className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-secondary' : 'hover:bg-secondary/50'}`}>
              <List className="w-5 h-5" />
            </button>
          </div>

          <select className="bg-transparent border-none focus:outline-none text-sm text-muted-foreground">
            <option value="relevance">Sort by: Relevance</option>
            <option value="rating">Highest Rated</option>
            <option value="experience">Most Experienced</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>

        {/* Results Grid - Placeholder for now */}
        <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
          {[1, 2, 3, 4, 5, 6].map(index => <Card key={index} className="group overflow-hidden hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
              <div className="relative aspect-[4/3] bg-muted">
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
                <Button className="w-full">View Profile</Button>
              </div>
            </Card>)}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <Button variant="secondary" className="min-w-[200px]">
            Load More
          </Button>
        </div>
      </div>
    </section>;
};
export default PreviewSearch;