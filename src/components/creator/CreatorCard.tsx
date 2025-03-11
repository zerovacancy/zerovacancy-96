
import React, { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { CreatorRating } from './CreatorRating';
import { BorderBeam } from '../ui/border-beam';
import { CreatorInfo } from './CreatorInfo';
import { CreatorMedia } from './CreatorMedia';
import { CreatorTags } from './CreatorTags';
import type { CreatorCardProps, ServiceSkill } from './types';
import { GlowingEffect } from '../ui/glowing-effect';
import { MapPin, Star, Calendar, Briefcase, ArrowRight, Clock, Eye } from 'lucide-react';

export const CreatorCard: React.FC<CreatorCardProps> = ({ 
  creator, 
  onImageLoad, 
  loadedImages, 
  imageRef 
}) => {
  const isMobile = useIsMobile();
  const [isHovered, setIsHovered] = useState(false);
  const [isSmallMobile, setIsSmallMobile] = useState(false);
  const [isLargeDesktop, setIsLargeDesktop] = useState(false);
  
  // Generate placeholder content if needed data is missing
  const tagline = creator.tagline || `Professional ${creator.services.join(" & ")} specialist with a passion for quality`;
  const yearsExperience = creator.yearsExperience || Math.floor(3 + Math.random() * 8);
  const projectsCompleted = creator.projectsCompleted || Math.floor(20 + Math.random() * 50);
  
  // Generate skill levels for services if not provided
  const serviceSkills: ServiceSkill[] = creator.serviceSkills || creator.services.map(service => ({
    name: service,
    level: Math.floor(70 + Math.random() * 30)
  }));
  
  // Determine screen sizes for responsive layout
  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallMobile(window.innerWidth < 360);
      setIsLargeDesktop(window.innerWidth >= 1280);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);
  
  return (
    <article 
      className="group select-text h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-full">
        <div className="absolute -inset-0.5 sm:-inset-0.5 rounded-xl bg-gradient-to-r from-purple-800/30 via-indigo-700/30 to-purple-900/30 opacity-60 sm:opacity-75 blur-[2px] sm:blur-sm group-hover:opacity-100 transition duration-500"></div>
        <Card className={cn(
          "overflow-hidden h-full",
          "will-change-transform transition-all duration-300",
          "hover:translate-y-[-4px] hover:scale-[1.02]",
          "active:scale-[0.99]", // Touch feedback
          "bg-white border border-gray-200/80",
          "shadow-[0_2px_8px_rgba(0,0,0,0.05)]",
          "hover:shadow-[0_12px_24px_rgba(0,0,0,0.12)]",
          "rounded-xl relative"
        )}>
          {/* Card content - Border beam and glowing effect */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-xl">
            <BorderBeam 
              colorFrom="#9370DB" 
              colorTo="#C19EF9" 
              duration={isMobile ? 30 : 20}
              borderWidth={isMobile ? 0.5 : 1}
            />
            <GlowingEffect 
              variant="default" 
              blur={isMobile ? 3 : 6} 
              glow={isHovered}
              spread={isMobile ? 10 : 18}
              borderWidth={isMobile ? 0.5 : 1}
              movementDuration={1.5}
              className={cn(
                "transition-opacity duration-300",
                isHovered ? "opacity-100" : "opacity-0"
              )}
            />
          </div>

          <div className="relative">
            {/* 1. IMAGE SECTION with proper aspect ratio for mobile/desktop */}
            <div className="relative">
              <div className={cn(
                isMobile ? "aspect-[5/3]" : "aspect-[4/3]",
                "overflow-hidden"
              )}>
                <CreatorMedia 
                  creator={creator}
                  onImageLoad={onImageLoad}
                  onVideoLoad={() => onImageLoad?.(creator.image)}
                />
              </div>
              
              {/* Price tag - Fixed for mobile/desktop */}
              <div className="absolute top-3 sm:top-3.5 right-3 sm:right-3.5 z-20">
                <span className={cn(
                  isMobile ? "px-2 py-1 text-xs" : "px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm",
                  "font-semibold",
                  "bg-white/90 shadow-md border border-white/40",
                  "text-[#212121] rounded-full",
                  "shadow-[0_3px_8px_rgba(0,0,0,0.12)]",
                  "transition-all duration-200",
                  "group-hover:scale-105 group-hover:shadow-[0_4px_10px_rgba(0,0,0,0.18)]"
                )}>
                  From ${creator.price}
                </span>
              </div>
              
              {/* Creator name and location overlay */}
              <CreatorInfo creator={creator} />
            </div>
            
            {/* INFORMATION SECTION */}
            <div className={cn(
              isMobile ? "p-4" : "p-5",
              isLargeDesktop ? "p-6" : "",
              "flex flex-col"
            )}>
              {/* 2. TAGLINE & STATS SECTION */}
              <div className={cn(
                isMobile ? "mb-3" : "mb-4",
                isLargeDesktop ? "mb-5" : ""
              )}>
                {/* Tagline with line clamping */}
                <p className={cn(
                  "text-gray-800 font-anek line-clamp-2",
                  isMobile ? "text-xs mb-1.5" : "text-sm mb-2",
                  isLargeDesktop ? "text-base" : ""
                )}>
                  {tagline}
                </p>
                
                {/* Stats with icons */}
                <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                  {/* Years experience */}
                  <div className="inline-flex items-center text-gray-600 gap-1">
                    <Calendar className={cn(
                      isMobile ? "w-3 h-3" : "w-3.5 h-3.5",
                      "text-brand-purple-medium"
                    )} />
                    <span className={cn(
                      isMobile ? "text-xs" : "text-sm",
                      isLargeDesktop ? "text-[15px]" : ""
                    )}>
                      {yearsExperience} years
                    </span>
                  </div>
                  
                  {/* Divider */}
                  <span className="text-gray-300 mx-1">•</span>
                  
                  {/* Projects completed */}
                  <div className="inline-flex items-center text-gray-600 gap-1">
                    <Briefcase className={cn(
                      isMobile ? "w-3 h-3" : "w-3.5 h-3.5",
                      "text-brand-purple-medium"
                    )} />
                    <span className={cn(
                      isMobile ? "text-xs" : "text-sm",
                      isLargeDesktop ? "text-[15px]" : ""
                    )}>
                      {projectsCompleted} projects
                    </span>
                  </div>
                  
                  {/* Divider */}
                  <span className="text-gray-300 mx-1">•</span>
                  
                  {/* Rating */}
                  <div className="inline-flex items-center text-gray-600 gap-1">
                    <Star className={cn(
                      isMobile ? "w-3 h-3" : "w-3.5 h-3.5",
                      "text-yellow-400 fill-yellow-400"
                    )} />
                    <span className={cn(
                      isMobile ? "text-xs" : "text-sm",
                      isLargeDesktop ? "text-[15px]" : ""
                    )}>
                      {creator.rating.toFixed(1)}
                      {creator.reviews > 0 && <span className="text-gray-500 ml-1">({creator.reviews})</span>}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* 3. SERVICE SPECIALTIES SECTION */}
              <div className={cn(
                isMobile ? "mb-3" : "mb-4",
                isLargeDesktop ? "mb-5" : ""
              )}>
                {/* Section title */}
                <h4 className={cn(
                  "font-space font-semibold text-gray-700",
                  isMobile ? "text-xs mb-2" : "text-sm mb-2.5",
                  isLargeDesktop ? "text-[15px] mb-3" : ""
                )}>
                  Service Specialties
                </h4>
                
                {/* Services grid - responsive columns */}
                <div className={cn(
                  "grid gap-x-3 gap-y-2 sm:gap-x-4 sm:gap-y-3",
                  isSmallMobile ? "grid-cols-1" : "grid-cols-2",
                  isLargeDesktop && serviceSkills.length >= 6 ? "grid-cols-3" : ""
                )}>
                  {serviceSkills.slice(0, isSmallMobile ? 4 : 6).map((service, index) => (
                    <div 
                      key={service.name} 
                      className={cn(
                        "flex flex-col gap-1",
                        "transition-all duration-200",
                        !isMobile && "hover:translate-y-[-1px]"
                      )}
                    >
                      {/* Service name */}
                      <div className="flex items-center justify-between">
                        <span className={cn(
                          "font-medium text-brand-purple-medium font-anek",
                          isMobile ? "text-[11px]" : "text-xs sm:text-sm"
                        )}>
                          {service.name}
                        </span>
                        <span className={cn(
                          "text-gray-500 font-medium",
                          isMobile ? "text-[10px]" : "text-[11px]"
                        )}>
                          {service.level}%
                        </span>
                      </div>
                      
                      {/* Skill bar */}
                      <div 
                        className={cn(
                          "w-full rounded-full overflow-hidden bg-gray-100/70",
                          isMobile ? "h-1.5" : "h-2"
                        )}
                      >
                        {/* Animated fill on load */}
                        <div 
                          className={cn(
                            "h-full rounded-full bg-gradient-to-r from-purple-400 to-indigo-500",
                            !isMobile && "group-hover:animate-pulse-subtle"
                          )}
                          style={{ 
                            width: `${service.level}%`,
                            animationDelay: `${index * 50}ms`,
                            transition: "width 0.4s ease-out"
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* 4. PORTFOLIO PREVIEW SECTION */}
              {creator.workExamples && creator.workExamples.length > 0 && (
                <div className={cn(
                  isMobile ? "mb-3" : "mb-4",
                  isLargeDesktop ? "mb-5" : ""
                )}>
                  {/* Section title */}
                  <h4 className={cn(
                    "font-space font-semibold text-gray-700",
                    isMobile ? "text-xs mb-2" : "text-sm mb-2.5",
                    isLargeDesktop ? "text-[15px] mb-3" : ""
                  )}>
                    Portfolio Preview
                  </h4>
                  
                  {/* Thumbnails row */}
                  <div className="flex gap-2 sm:gap-3 mb-2 sm:mb-3">
                    {creator.workExamples.slice(0, isSmallMobile ? 2 : isLargeDesktop ? 4 : 3).map((image, index) => (
                      <div 
                        key={index}
                        className={cn(
                          "aspect-square rounded-md overflow-hidden w-1/3",
                          isSmallMobile && "w-1/2",
                          isLargeDesktop && "w-1/4",
                          "transition-all duration-300",
                          !isMobile && "hover:scale-[1.05] hover:shadow-md"
                        )}
                      >
                        <img 
                          src={image} 
                          alt={`${creator.name} portfolio example ${index + 1}`}
                          className={cn(
                            "w-full h-full object-cover",
                            "active:opacity-80" // Touch feedback
                          )}
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                  
                  {/* View more link */}
                  <div className="text-right">
                    <a 
                      href="#" 
                      className={cn(
                        "inline-flex items-center text-brand-purple font-medium font-space group/link",
                        isMobile ? "text-xs" : "text-sm",
                        "active:opacity-70", // Touch feedback
                        "hover:text-brand-purple-dark hover:underline",
                        "focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded"
                      )}
                    >
                      <span>View Portfolio</span>
                      <ArrowRight className={cn(
                        isMobile ? "w-3 h-3 ml-1" : "w-3.5 h-3.5 ml-1.5",
                        "transition-transform duration-300 group-hover/link:translate-x-1"
                      )} />
                    </a>
                  </div>
                </div>
              )}
              
              {/* 5. AVAILABILITY & RATINGS SECTION */}
              <div className={cn(
                "bg-gray-50/80 rounded-lg shadow-sm relative",
                isMobile ? "px-3 py-2" : "px-4 py-2.5",
                "hover:shadow-md transition-shadow duration-200"
              )}>
                <CreatorRating 
                  rating={creator.rating} 
                  reviews={creator.reviews} 
                  name={creator.name} 
                  availabilityStatus={creator.availabilityStatus}
                />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </article>
  );
};
