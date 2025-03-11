
import * as React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { motion, useAnimationFrame, useMotionTemplate, useMotionValue, useTransform } from "framer-motion";
import { useRef } from "react";
import { Squares } from "@/components/ui/squares";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

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
  useAnimationFrame(time => {
    const length = pathRef.current?.getTotalLength();
    if (length) {
      const pxPerMillisecond = length / duration;
      progress.set(time * pxPerMillisecond % length);
    }
  });
  const x = useTransform(progress, val => pathRef.current?.getPointAtLength(val)?.x ?? 0);
  const y = useTransform(progress, val => pathRef.current?.getPointAtLength(val)?.y ?? 0);
  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;
  return <>
      <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="absolute h-full w-full" width="100%" height="100%" {...otherProps}>
        <rect fill="none" width="100%" height="100%" rx={rx} ry={ry} ref={pathRef} />
      </svg>
      <motion.div style={{
      position: "absolute",
      top: 0,
      left: 0,
      display: "inline-block",
      transform
    }}>
        {children}
      </motion.div>
    </>;
};

interface GlowDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function GlowDialog({
  open,
  onOpenChange
}: GlowDialogProps) {
  const [email, setEmail] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);
    
    try {
      // Collect metadata
      const metadata = {
        referrer: document.referrer,
        url: window.location.href,
        userAgent: navigator.userAgent,
        dialog: "glow_popup",
        timestamp: new Date().toISOString(),
      };
      
      // Call our Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('submit-waitlist-email', {
        body: { 
          email, 
          source: "glow_dialog", 
          marketingConsent: true,
          metadata
        }
      });
      
      if (error) {
        console.error("Error submitting email:", error);
        toast.error("Failed to join the waitlist. Please try again later.");
        return;
      }
      
      // Handle already subscribed message
      if (data?.status === 'already_subscribed') {
        toast.info(data.message || "You're already on our waitlist!");
      } else {
        toast.success("You've been added to the waitlist. We'll be in touch soon!");
      }
      
      setEmail("");
      onOpenChange(false);
    } catch (error) {
      console.error("Error submitting email:", error);
      toast.error("Failed to join the waitlist. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl md:max-w-3xl overflow-hidden border-none bg-transparent">
        <motion.div 
          className="relative rounded-lg overflow-hidden bg-[#060606]/80 p-6 sm:p-8 md:p-10"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
        >
          <div className="absolute inset-0">
            <Squares
              direction="diagonal"
              speed={0.5}
              borderColor="#333"
              squareSize={32}
              hoverFillColor="#222"
            />
          </div>
          <MovingBorder rx="12px" ry="12px" duration={3000}>
            <div className="h-24 w-24 sm:h-32 sm:w-32 opacity-[0.8] bg-[radial-gradient(var(--sky-500)_40%,transparent_60%)]" />
          </MovingBorder>
          <div className="relative z-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 md:mb-6 text-white leading-tight">
              The Future of Real Estate Marketing is Here
            </h2>
            <p className="text-center text-gray-300 mb-8 max-w-2xl mx-auto text-sm sm:text-base md:text-lg">
              Our cutting-edge content marketplace connects property managers with expert creators for high-quality real estate marketing. From photography to 3D tours—get the content you need, when you need it.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 justify-center items-stretch max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                disabled={isLoading}
                className="flex-1 px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30 disabled:opacity-50"
              />
              <HoverBorderGradient 
                type="submit"
                className="gradient-button !text-white hover:!bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                duration={1.5}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Joining...
                  </>
                ) : (
                  'Join Waitlist'
                )}
              </HoverBorderGradient>
            </form>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
