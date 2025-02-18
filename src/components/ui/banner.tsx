
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
        lg: "px-6 py-4 md:py-5",
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
              {icon || <Wand2 className="h-10 w-10 p-2 rounded-full bg-white/10" />}
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-semibold mb-1">
                Introducing Magic - The AI Agent That Builds Beautiful UI Components
              </h2>
              <p className="text-[#888] text-lg">
                Empower your IDE with an AI extension that creates stunning, production-ready components with AI precision.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button 
                size="lg"
                className="bg-white text-black hover:bg-white/90 rounded-full px-8"
              >
                Try Magic Now
              </Button>
              {isClosable && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10"
                  onClick={onClose}
                  aria-label="Close banner"
                >
                  <X className="h-5 w-5" />
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
