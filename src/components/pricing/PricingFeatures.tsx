
import React from "react";
import { cn } from "@/lib/utils";
import { Check, ChevronDown } from "lucide-react";
import { PricingFeature } from "./types";
import { motion } from "framer-motion";

interface PricingFeaturesProps {
  features: PricingFeature[];
  expandedFeatures: boolean;
  toggleFeatures: () => void;
  planIndex: number;
}

export const PricingFeatures: React.FC<PricingFeaturesProps> = ({
  features,
  expandedFeatures,
  toggleFeatures,
  planIndex,
}) => {
  return (
    <div className="mt-4">
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-sm font-medium text-slate-700 font-inter">
          {expandedFeatures ? "What's included:" : "Top features:"}
        </h4>
        <button
          onClick={toggleFeatures}
          className="text-xs text-slate-500 flex items-center focus:outline-none font-inter hover:text-brand-purple transition-colors touch-manipulation"
        >
          {expandedFeatures ? "Less" : "See all"}
          <ChevronDown
            className={cn(
              "ml-1 h-3 w-3 transition-transform",
              expandedFeatures && "rotate-180"
            )}
          />
        </button>
      </div>

      <div className="space-y-2.5">
        {(expandedFeatures ? features : features.slice(0, 4)).map(
          (feature, featureIndex) => (
            <div
              key={featureIndex}
              className={cn(
                "flex items-start",
                feature.primary && "font-medium"
              )}
            >
              <span
                className={cn(
                  "mr-2 rounded-full p-0.5 flex-shrink-0 mt-0.5",
                  planIndex === 0
                    ? "bg-blue-50"
                    : planIndex === 1
                    ? "bg-brand-purple/10"
                    : "bg-emerald-50"
                )}
              >
                <Check
                  className={cn(
                    "h-3 w-3",
                    planIndex === 0
                      ? "text-blue-600"
                      : planIndex === 1
                      ? "text-brand-purple"
                      : "text-emerald-600"
                  )}
                />
              </span>
              <span className="text-sm text-slate-700 font-inter">
                {feature.text.replace("plus:", "")}
              </span>
            </div>
          )
        )}
      </div>

      {!expandedFeatures && features.length > 4 && (
        <p className="text-xs text-slate-500 font-inter mt-2">
          +{features.length - 4} more features
        </p>
      )}
    </div>
  );
};
