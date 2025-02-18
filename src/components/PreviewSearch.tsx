
import React from 'react';
import { MovingBorder } from './ui/moving-border';

const PreviewSearch = () => {
  const creators = [
    {
      name: "John Doe",
      role: "Content Creator",
      image: "/placeholder.svg"
    },
    {
      name: "Jane Smith",
      role: "Video Editor",
      image: "/placeholder.svg"
    },
    {
      name: "Mike Johnson",
      role: "Photographer",
      image: "/placeholder.svg"
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4">
            Find Your Perfect Creator
          </h2>
          <p className="text-muted-foreground">
            Browse our curated list of top content creators
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {creators.map((creator, index) => (
            <div key={index} className="relative group h-[300px]">
              <div className="relative w-full h-full p-[1px] rounded-2xl overflow-hidden">
                <MovingBorder duration={3000} rx="16px" ry="16px">
                  <div className="h-20 w-20 opacity-[0.8] bg-[radial-gradient(#8B5CF6_40%,transparent_60%)]" />
                </MovingBorder>
                <div className="relative h-full rounded-2xl bg-white/95 backdrop-blur-sm p-6 flex flex-col items-center justify-center z-10">
                  <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                    <img 
                      src={creator.image} 
                      alt={creator.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-primary mb-2">{creator.name}</h3>
                  <p className="text-muted-foreground">{creator.role}</p>
                  <button className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PreviewSearch;
