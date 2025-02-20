
"use client";

import { motion } from "framer-motion";
import React from "react";
import { cn } from "@/lib/utils";

export interface AuroraBackgroundProps {
  children: React.ReactNode;
  showRadialGradient?: boolean;
  className?: string;
}

export const AuroraBackground = ({
  children,
  showRadialGradient = true,
  className,
}: AuroraBackgroundProps) => {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1 }}
        style={{
          filter: "blur(7px)",
        }}
        className="absolute inset-0"
      >
        <div className="absolute h-full w-full bg-gradient-to-r from-indigo-500/30 via-purple-500/30 to-pink-500/30" />
      </motion.div>
      {showRadialGradient && (
        <motion.div
          className="absolute inset-0 bg-radial-gradient opacity-60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 0.5 }}
        />
      )}
      {children}
    </div>
  );
};

export default AuroraBackground;
