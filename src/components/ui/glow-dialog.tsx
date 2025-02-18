
import * as React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { GlowEffect } from "@/components/ui/glow-effect";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

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
          <div className="absolute inset-0 bg-black/40" /> {/* Dark overlay */}
          <GlowEffect
            colors={['#FF5733', '#33FF57', '#3357FF', '#F1C40F']}
            mode="colorShift"
            blur="strong"
            scale={1.5}
          />
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
