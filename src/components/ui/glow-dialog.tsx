
import * as React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { GlowEffect } from "@/components/ui/glow-effect";
import { Button } from "@/components/ui/button";
import { motion, useAnimationFrame, useMotionTemplate, useMotionValue, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

const MovingBorder = ({
  children,
  duration = 2000,
  rx = "30%",
  ry = "30%",
  ...otherProps
}: {
  children: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
  [key: string]: any;
}) => {
  const pathRef = useRef<SVGRectElement>(null);
  const progress = useMotionValue<number>(0);

  useAnimationFrame((time) => {
    const length = pathRef.current?.getTotalLength();
    if (length) {
      const pxPerMillisecond = length / duration;
      progress.set((time * pxPerMillisecond) % length);
    }
  });

  const x = useTransform(progress, (val) => pathRef.current?.getPointAtLength(val)?.x ?? 0);
  const y = useTransform(progress, (val) => pathRef.current?.getPointAtLength(val)?.y ?? 0);

  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute h-full w-full"
        width="100%"
        height="100%"
        {...otherProps}
      >
        <rect
          fill="none"
          width="100%"
          height="100%"
          rx={rx}
          ry={ry}
          ref={pathRef}
        />
      </svg>
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "inline-block",
          transform,
        }}
      >
        {children}
      </motion.div>
    </>
  );
};

interface GlowDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function GlowDialog({ open, onOpenChange }: GlowDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md overflow-hidden border-none bg-transparent">
        <motion.div 
          className="relative rounded-lg overflow-hidden bg-gradient-to-br from-[#1A1F2C] via-[#221F26] to-[#1A1F2C] p-6"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
        >
          <GlowEffect
            colors={[
              'rgba(255, 87, 51, 0.3)', // Transparent red
              'rgba(51, 255, 87, 0.2)', // Transparent green
              'rgba(51, 87, 255, 0.25)', // Transparent blue
              'rgba(241, 196, 15, 0.15)'  // Transparent yellow
            ]}
            mode="colorShift"
            blur="stronger"
            scale={1.8}
          />
          <MovingBorder rx="12px" ry="12px" duration={3000}>
            <div className="h-20 w-20 opacity-[0.8] bg-[radial-gradient(var(--sky-500)_40%,transparent_60%)]" />
          </MovingBorder>
          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-center mb-4 text-white">Welcome to CreativeEstate!</h2>
            <p className="text-center text-gray-300 mb-6">
              Join our community of creators and property owners. Start exploring now!
            </p>
            <div className="flex justify-center">
              <Button 
                onClick={() => onOpenChange(false)}
                className="relative z-10"
                size="lg"
              >
                Get Started
              </Button>
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
