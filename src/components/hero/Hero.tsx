
import React from "react";
import { cn } from "@/lib/utils";
import { WaitlistCTA } from "../ui/waitlist/waitlist-cta";
import { useIsMobile } from "@/hooks/use-mobile";
import { GradientBlobBackground } from "@/components/ui/gradient-blob-background";

export function Hero() {
  const rotatingWord = "CONVERTS";
  const isMobile = useIsMobile();
  
  return (
    <div className="w-full">
      {/* Mobile version - simplified with no gradient blob background */}
      {isMobile ? (
        <section className="py-12 px-4 w-full">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-center mb-6">
              <span 
                className="text-display block mb-2"
                style={{ color: "#4A2DD9" }}
              >
                PROPERTY CONTENT THAT
              </span>
              <span 
                className="text-display inline-block"
                style={{ color: "#4A2DD9" }}
              >
                {rotatingWord}
              </span>
            </h1>

            <p className="text-center mb-8 max-w-2xl mx-auto">
              Connect with creators who see beyond square footage to capture the soul of your spaces. Our curated network transforms properties into visual narratives that intrigue, inspire, and ultimately convert.
            </p>
            
            <div className="w-full max-w-xl mx-auto">
              <WaitlistCTA />
            </div>
          </div>
        </section>
      ) : (
        // Desktop version with static gradient blob background
        <GradientBlobBackground 
          blobColors={{
            first: "bg-purple-200",
            second: "bg-indigo-200",
            third: "bg-violet-200"
          }}
          blobOpacity={0.35}
          baseColor="bg-white/60"
          pattern="dots"
          className="w-full"
        >
          <section className="flex flex-col items-center justify-center px-6 py-16 md:py-20 w-full">
            <div className="max-w-5xl w-full mx-auto flex flex-col gap-10">
              <h1 className="text-center flex flex-col items-center gap-4">
                <span 
                  className="text-display px-0 mx-0 relative"
                  style={{ color: "#4A2DD9" }}
                >
                  PROPERTY CONTENT THAT
                </span>
                <span 
                  className="text-display inline-block"
                  style={{ color: "#4A2DD9" }}
                >
                  {rotatingWord}
                </span>
              </h1>

              <p className="paragraph-base text-center max-w-2xl mx-auto px-2">
                Connect with creators who see beyond square footage to capture the soul of your spaces. Our curated network transforms properties into visual narratives that intrigue, inspire, and ultimately convert.
              </p>
            </div>
            
            <div className="w-full max-w-xl mx-auto relative mt-12">
              <WaitlistCTA />
            </div>
          </section>
        </GradientBlobBackground>
      )}
    </div>
  );
}

export default Hero;
