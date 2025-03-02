
import React from 'react';
import { cn } from '@/lib/utils';

interface CreatorTagsProps {
  tags: string[];
}

export const getDefaultTags = (name: string, services: string[]) => {
  if (name === 'John Smith' && services.includes('Photography')) {
    return ['#RealEstate', '#Aerial', '#IndoorDroneTour'];
  }
  if (name === 'Jane Cooper') {
    return ['#Interior', '#Design', '#Staging'];
  }
  if (name === 'Emily Johnson') {
    return ['#POV', '#TikTok', '#ComeTourWithMe'];
  }
  if (name === 'Michael Brown') {
    return ['#3DTours', '#FloorPlans', '#Interactive'];
  }
  return ['#Professional', '#Creative', '#Expert'];
};

export const getTagStyle = (tag: string) => {
  if (['#RealEstate', '#Aerial', '#IndoorDroneTour'].includes(tag)) {
    return "bg-[#E5DEFF] text-[#4F46E5] hover:bg-[#D6BCFA] hover:text-[#3730A3] border border-[#4F46E5]/10";
  }
  if (['#Interior', '#Design', '#Staging'].includes(tag)) {
    return "bg-[#F2FCE2] text-[#3B823E] hover:bg-[#DCF5DC] hover:text-[#2E6A31] border border-[#3B823E]/10";
  }
  if (['#POV', '#TikTok', '#ComeTourWithMe'].includes(tag)) {
    return "bg-[#FDE1D3] text-[#C4704F] hover:bg-[#FECDA7] hover:text-[#9D5B3F] border border-[#C4704F]/10";
  }
  if (['#3DTours', '#FloorPlans', '#Interactive'].includes(tag)) {
    return "bg-[#E0F2FE] text-[#0369A1] hover:bg-[#BAE6FD] hover:text-[#0284C7] border border-[#0EA5E9]/10";
  }
  return "bg-[#F3F4F6] text-gray-600 hover:bg-gray-200 hover:text-gray-800 border border-gray-200";
};

export const CreatorTags: React.FC<CreatorTagsProps> = ({ tags }) => {
  return (
    <div 
      className="overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
      role="list"
      aria-label="Creator specialties"
    >
      <div className="flex flex-nowrap gap-2 sm:gap-2.5">
        {tags.map((tag, index) => (
          <span
            key={index}
            className={cn(
              "text-[10px] sm:text-xs px-2.5 py-1.5 rounded-full",
              "transition-all duration-200 whitespace-nowrap",
              "hover:scale-105 cursor-pointer",
              getTagStyle(tag)
            )}
            role="listitem"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};
