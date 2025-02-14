
import React from 'react';
import { Search, MapPin, Calendar, DollarSign } from 'lucide-react';

const PreviewSearch = () => {
  return (
    <section className="bg-secondary/50 section-padding">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-3xl font-bold text-center mb-12">Discover Local Creators</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="flex items-center gap-2 p-4 bg-background rounded-lg shadow-sm">
            <MapPin className="w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Location"
              className="w-full bg-transparent border-none focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-2 p-4 bg-background rounded-lg shadow-sm">
            <Search className="w-5 h-5 text-muted-foreground" />
            <select className="w-full bg-transparent border-none focus:outline-none">
              <option value="">Content Type</option>
              <option value="photography">Photography</option>
              <option value="videography">Videography</option>
              <option value="drone">Drone</option>
            </select>
          </div>
          <div className="flex items-center gap-2 p-4 bg-background rounded-lg shadow-sm">
            <Calendar className="w-5 h-5 text-muted-foreground" />
            <input
              type="date"
              className="w-full bg-transparent border-none focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-2 p-4 bg-background rounded-lg shadow-sm">
            <DollarSign className="w-5 h-5 text-muted-foreground" />
            <select className="w-full bg-transparent border-none focus:outline-none">
              <option value="">Budget Range</option>
              <option value="100-500">$100 - $500</option>
              <option value="500-1000">$500 - $1,000</option>
              <option value="1000+">$1,000+</option>
            </select>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PreviewSearch;
