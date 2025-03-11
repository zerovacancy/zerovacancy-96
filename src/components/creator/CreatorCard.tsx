
import React from 'react';
import { Card } from '../ui/card';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Star, MapPin, Calendar, Briefcase, ArrowRight } from 'lucide-react';
import type { CreatorCardProps, ServiceSkill } from './types';

export const CreatorCard: React.FC<CreatorCardProps> = ({ 
  creator, 
  onImageLoad, 
  loadedImages, 
  imageRef 
}) => {
  const isMobile = useIsMobile();
  
  // Generate placeholder content if needed data is missing
  const tagline = creator.tagline || `Professional ${creator.services[0]} specialist`;
  const yearsExperience = creator.yearsExperience || Math.floor(3 + Math.random() * 8);
  const projectsCompleted = creator.projectsCompleted || Math.floor(20 + Math.random() * 50);
  
  // Generate skill levels for services if not provided
  const serviceSkills: ServiceSkill[] = creator.serviceSkills || creator.services.map(service => ({
    name: service,
    level: Math.floor(70 + Math.random() * 30)
  }));
  
  return (
    <Card className={cn(
      "overflow-hidden h-full transition-all",
      "hover:shadow-lg hover:translate-y-[-4px]",
      "bg-white border border-gray-200",
      "rounded-xl"
    )}>
      {/* Image Section */}
      <div className={cn(
        "relative",
        isMobile ? "aspect-[5/3]" : "aspect-[4/3]"
      )}>
        <img 
          src={creator.image} 
          alt={`${creator.name} profile`}
          className="w-full h-full object-cover"
          onLoad={() => onImageLoad?.(creator.image)}
          ref={imageRef}
        />
        
        {/* Price tag */}
        <div className="absolute top-3 right-3 z-10">
          <span className={cn(
            "px-2.5 py-1 bg-white/90 text-[#212121] rounded-full shadow-sm font-semibold",
            isMobile ? "text-xs" : "text-sm"
          )}>
            From ${creator.price}
          </span>
        </div>
        
        {/* Creator name and location */}
        <div className="absolute inset-0 flex flex-col justify-end p-4 text-white">
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none"></div>
          
          <div className="relative z-10">
            <h3 className={cn(
              "font-semibold",
              isMobile ? "text-base" : "text-lg"
            )}>
              {creator.name}
            </h3>
            
            <div className="flex items-center mt-1 gap-1">
              <MapPin className="w-3.5 h-3.5 text-white/90" />
              <span className="text-sm text-white/90">{creator.location}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Information Section */}
      <div className={cn(
        "flex flex-col",
        isMobile ? "p-4" : "p-5"
      )}>
        {/* Tagline & Stats */}
        <div className={cn(
          isMobile ? "mb-3" : "mb-4"
        )}>
          <p className={cn(
            "text-gray-800 line-clamp-2",
            isMobile ? "text-xs mb-2" : "text-sm mb-3"
          )}>
            {tagline}
          </p>
          
          <div className="flex items-center gap-3 flex-wrap text-gray-600">
            {/* Years experience */}
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-indigo-500" />
              <span className={isMobile ? "text-xs" : "text-sm"}>
                {yearsExperience} years
              </span>
            </div>
            
            {/* Divider */}
            <span className="text-gray-300">•</span>
            
            {/* Projects completed */}
            <div className="flex items-center gap-1">
              <Briefcase className="w-3.5 h-3.5 text-indigo-500" />
              <span className={isMobile ? "text-xs" : "text-sm"}>
                {projectsCompleted} projects
              </span>
            </div>
            
            {/* Divider */}
            <span className="text-gray-300">•</span>
            
            {/* Rating */}
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
              <span className={isMobile ? "text-xs" : "text-sm"}>
                {creator.rating.toFixed(1)}
                {creator.reviews > 0 && <span className="text-gray-500 ml-1">({creator.reviews})</span>}
              </span>
            </div>
          </div>
        </div>
        
        {/* Service Specialties */}
        <div className={cn(
          isMobile ? "mb-3" : "mb-4"
        )}>
          <h4 className={cn(
            "font-semibold text-gray-700",
            isMobile ? "text-xs mb-2" : "text-sm mb-3"
          )}>
            Service Specialties
          </h4>
          
          <div className={cn(
            "grid gap-x-3 gap-y-2",
            isMobile ? "grid-cols-1" : "grid-cols-2",
            "sm:gap-x-4 sm:gap-y-3"
          )}>
            {serviceSkills.slice(0, 4).map((service) => (
              <div key={service.name} className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className={cn(
                    "font-medium text-indigo-600",
                    isMobile ? "text-xs" : "text-sm"
                  )}>
                    {service.name}
                  </span>
                  <span className="text-xs text-gray-500 font-medium">
                    {service.level}%
                  </span>
                </div>
                
                <div className={cn(
                  "w-full rounded-full overflow-hidden bg-gray-100/70",
                  isMobile ? "h-1.5" : "h-2"
                )}>
                  <div 
                    className="h-full rounded-full bg-gradient-to-r from-indigo-400 to-purple-500"
                    style={{ width: `${service.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Portfolio Preview */}
        {creator.workExamples && creator.workExamples.length > 0 && (
          <div className={cn(
            isMobile ? "mb-3" : "mb-4"
          )}>
            <h4 className={cn(
              "font-semibold text-gray-700",
              isMobile ? "text-xs mb-2" : "text-sm mb-3"
            )}>
              Portfolio Preview
            </h4>
            
            <div className="flex gap-2 sm:gap-3 mb-2 sm:mb-3">
              {creator.workExamples.slice(0, 3).map((image, index) => (
                <div 
                  key={index}
                  className="aspect-square rounded-md overflow-hidden w-1/3 transition-all hover:scale-105"
                >
                  <img 
                    src={image} 
                    alt={`${creator.name} portfolio example ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            
            <div className="text-right">
              <a 
                href="#" 
                className={cn(
                  "inline-flex items-center text-indigo-600 font-medium",
                  isMobile ? "text-xs" : "text-sm",
                  "hover:text-indigo-800 hover:underline"
                )}
              >
                <span>View Portfolio</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        )}
        
        {/* Availability & Rating Section */}
        <div className="bg-gray-50 rounded-lg px-4 py-2.5 flex justify-between items-center shadow-sm">
          {/* Rating */}
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1.5" />
            <span className="font-medium text-gray-800">
              {creator.rating.toFixed(1)}
            </span>
            {creator.reviews > 0 && (
              <span className="text-gray-500 ml-1.5">
                ({creator.reviews})
              </span>
            )}
          </div>
          
          {/* Availability Status */}
          {creator.availabilityStatus && (
            <div className={cn(
              "px-2.5 py-1 rounded-full text-xs font-medium",
              creator.availabilityStatus === 'available-now' 
                ? "bg-green-100 text-green-800" 
                : creator.availabilityStatus === 'available-tomorrow'
                  ? "bg-amber-100 text-amber-800"
                  : "bg-purple-100 text-purple-800"
            )}>
              {creator.availabilityStatus === 'available-now' 
                ? 'Available Now' 
                : creator.availabilityStatus === 'available-tomorrow'
                  ? 'Available Tomorrow'
                  : 'Premium Only'}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
