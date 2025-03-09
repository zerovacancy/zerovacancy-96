
import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"
import { useMediaQuery } from "@/hooks/use-media-query"

import { cn } from "@/lib/utils"

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> & {
    mobileScrollDisabled?: boolean; // New prop to control mobile scrolling
  }
>(({ className, children, mobileScrollDisabled = true, ...props }, ref) => {
  // Check if on mobile
  const isMobile = useMediaQuery("(max-width: 768px)")
  
  // Determine if we should disable scrolling based on mobile status
  const shouldDisableScrolling = isMobile && mobileScrollDisabled
  
  return (
    <ScrollAreaPrimitive.Root
      ref={ref}
      className={cn("relative", className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport 
        className={cn(
          "h-full w-full rounded-[inherit]",
          shouldDisableScrolling && "mobile-scroll-disabled" // Apply class for mobile
        )}
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      {(!shouldDisableScrolling) && <ScrollBar />}
      {(!shouldDisableScrolling) && <ScrollAreaPrimitive.Corner />}
    </ScrollAreaPrimitive.Root>
  )
})
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" &&
        "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" &&
        "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      className
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
))
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName

export { ScrollArea, ScrollBar }
