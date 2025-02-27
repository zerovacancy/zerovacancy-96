
import React from 'react';
import SearchBar from './search/SearchBar';
import SearchFilters from './search/SearchFilters';
import CreatorsList from './search/CreatorsList';
import { AuroraBackground } from './ui/aurora-background';

const PreviewSearch = () => {
  return (
    <div className="container mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-2">Discover Featured Creators</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Find the perfect professional for your property content needs
        </p>
      </div>
      
      <div className="rounded-xl overflow-hidden shadow-lg border border-gray-100">
        <div className="bg-white px-4 py-5 sm:px-6 border-b">
          <SearchBar />
          <SearchFilters />
        </div>
        
        <AuroraBackground className="min-h-0" showRadialGradient={false}>
          <div className="px-2 sm:px-6 lg:px-8 py-3 sm:py-5 space-y-4">
            <CreatorsList />
          </div>
        </AuroraBackground>
      </div>
    </div>
  );
};

export default PreviewSearch;
