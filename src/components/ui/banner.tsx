
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "./button"

const bannerVariants = cva(
  "relative w-full flex items-center justify-between gap-2 overflow-hidden px-3 py-2.5 sm:px-6 sm:py-3",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground min-h-[3rem]",
        success: "bg-green-500 text-white",
        warning: "bg-yellow-500 text-white",
        error: "bg-red-500 text-white",
      },
      size: {
        sm: "text-xs min-h-[2.5rem]",
        default: "text-sm min-h-[3rem]",
        lg: "text-base min-h-[4rem]",
      },
      layout: {
        simple: "justify-center text-center",
        complex: "justify-between items-center",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      layout: "simple",
    },
  }
)

interface BannerProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof bannerVariants> {
  icon?: React.ReactNode
  action?: React.ReactNode
  isClosable?: boolean
  onClose?: () => void
}

export function Banner({ 
  className,
  variant,
  size,
  layout,
  icon,
  action,
  isClosable,
  onClose,
  children,
  ...props
}: BannerProps) {
  return (
    <div
      className={cn(bannerVariants({ variant, size, layout }), className)}
      {...props}
    >
      <div className="flex items-center gap-2 sm:gap-3 flex-1 justify-center sm:justify-start">
        {icon && (
          <span className="flex-shrink-0">
            {icon}
          </span>
        )}
        <div className="flex-1 text-left sm:text-center text-xs sm:text-sm whitespace-normal">
          {children}
        </div>
      </div>

      {action && (
        <div className="flex-shrink-0 ml-2 sm:ml-4">
          {action}
        </div>
      )}

      {isClosable && (
        <button
          onClick={onClose}
          className="flex-shrink-0 ml-2 p-1 hover:opacity-80 transition-opacity"
          aria-label="Close banner"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  )
}
