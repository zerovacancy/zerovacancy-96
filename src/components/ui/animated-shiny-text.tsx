
import { FC, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface AnimatedShinyTextProps {
  children: ReactNode;
  className?: string;
}

const AnimatedShinyText: FC<AnimatedShinyTextProps> = ({
  children,
  className,
}) => {
  const isMobile = useIsMobile();
  
  return (
    <p
      className={cn(
        "text-neutral-600/70 dark:text-neutral-400/70",
        isMobile ? "text-left" : "mx-auto",
        className,
      )}
    >
      Get priority access to the creator marketplace!
    </p>
  );
};

export { AnimatedShinyText };
