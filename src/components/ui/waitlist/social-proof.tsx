
"use client";

import { cn } from "@/lib/utils";
import { Users } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export function SocialProof() {
  const isMobile = useIsMobile();
  
  return (
    <div className={cn(
      "flex items-center justify-center mt-2 sm:mt-3 w-full",
      "social-proof-container",
      isMobile ? "max-w-[100%] overflow-x-hidden px-0" : "" // Fixed container width for mobile
    )}>
      {/* Social proof pill */}
      <div className={cn(
        "flex items-center gap-2 sm:gap-3 px-3 py-1.5 sm:px-4 sm:py-2", // Adjusted padding for mobile
        "bg-gradient-to-r from-indigo-50 to-purple-50", 
        "border border-indigo-100/80", 
        "rounded-full shadow-sm", 
        "animate-fade-in", 
        isMobile && "text-xs" // Ensure text size is consistent on mobile
      )}
      aria-label="Social proof statistics"
      role="status"
      >
        <div className="flex -space-x-1 items-center" aria-hidden="true">
          <div className={cn(
            "rounded-full bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600", 
            "flex items-center justify-center text-[8px] text-white font-bold", 
            "border-2 border-white shadow-sm", 
            isMobile ? "w-5 h-5" : "w-7 h-7" // Smaller on mobile
          )}>JT</div>
          <div className={cn(
            "rounded-full bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600", 
            "flex items-center justify-center text-[8px] text-white font-bold", 
            "border-2 border-white shadow-sm", 
            isMobile ? "w-5 h-5" : "w-7 h-7" // Smaller on mobile
          )}>MI</div>
          <div className={cn(
            "rounded-full bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600", 
            "flex items-center justify-center text-[8px] text-white font-bold", 
            "border-2 border-white shadow-sm", 
            isMobile ? "w-5 h-5" : "w-7 h-7" // Smaller on mobile
          )}>AS</div>
        </div>
        
        <div className={cn("flex items-center whitespace-nowrap", isMobile && "text-xs")}>
          <Users className={cn(
            "text-indigo-800 mr-1.5",
            isMobile ? "h-3 w-3" : "h-4 w-4" // Smaller icon on mobile
          )} aria-hidden="true" />
          <span className="font-bold text-indigo-700">2,165+</span>
          
          <span className="mx-1.5 text-purple-700" aria-hidden="true">•</span>
          <span className="text-gray-800 px-[2px]">Queue: </span>
          <span className="text-indigo-700 font-bold px-px">{isMobile ? "1-2 days" : "2-3 weeks"}</span>
        </div>
      </div>
    </div>
  );
}
