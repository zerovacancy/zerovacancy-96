
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { X, Wand2 } from "lucide-react"

const bannerVariants = cva(
  "relative w-full",
  {
    variants: {
      variant: {
        default: "bg-background border border-border",
        muted: "bg-muted",
        dark: "bg-[#111111] text-white border-none",
      },
      size: {
        sm: "px-4 py-2",
        default: "px-4 py-3",
        lg: "p-3 md:p-4",
      },
      rounded: {
        none: "",
        default: "rounded-lg",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      rounded: "none",
    }
  }
)

interface BannerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bannerVariants> {
  icon?: React.ReactNode
  action?: React.ReactNode
  onClose?: () => void
  isClosable?: boolean
  layout?: "row" | "center" | "complex"
}

const Banner = React.forwardRef<HTMLDivElement, BannerProps>(
  ({ className, variant, size, rounded, icon, action, onClose, isClosable, layout = "row", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(bannerVariants({ variant, size, rounded }), className)}
        {...props}
      >
        <div className="container mx-auto">
          <div className={cn(
            "flex items-center gap-4",
            layout === "center" && "justify-center",
            layout === "complex" && "md:items-center"
          )}>
            <div className="flex shrink-0 items-center">
              {icon || <Wand2 className="h-8 w-8 p-1.5 rounded-full bg-white/10" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm pr-2">
                <span className="font-medium">New:</span> We've launched our creator marketplace! 🎉
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                size="sm"
                className="bg-white text-black hover:bg-white/90 rounded-full px-5 h-8 text-sm font-medium"
              >
                Try CreativeEstate Now
              </Button>
              {isClosable && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/10 h-8 w-8 p-0"
                  onClick={onClose}
                  aria-label="Close banner"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
)
Banner.displayName = "Banner"

export { Banner, type BannerProps }
