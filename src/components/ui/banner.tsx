
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
        lg: "p-4 md:p-6",
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
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex gap-4 items-start sm:items-center">
              <div className="flex shrink-0 items-center pt-1 sm:pt-0">
                {icon || <Wand2 className="h-8 w-8 p-1.5 rounded-full bg-white/10" />}
              </div>
              <div className="flex-1 min-w-0 space-y-1">
                <h2 className="text-lg font-semibold leading-none">
                  Introducing Magic - The AI Agent That Builds Beautiful UI Components
                </h2>
                <p className="text-[#888] text-base">
                  Empower your IDE with an AI extension that creates stunning, production-ready components with AI precision.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 ml-12 sm:ml-0">
              <Button 
                size="default"
                className="bg-white text-black hover:bg-white/90 rounded-full px-6 text-base font-medium w-full sm:w-auto"
              >
                Try Magic Now
              </Button>
              {isClosable && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/10 h-10 w-10 p-0 absolute top-4 right-4 sm:relative sm:top-0 sm:right-0"
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
