
"use client"

import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"

type TColorProp = string | string[]

interface ShineBorderProps {
  borderRadius?: number
  borderWidth?: number
  color?: TColorProp
  className?: string
  children: React.ReactNode
}

/**
 * @name Shine Border
 * @description Static border component with configurable props (animations removed).
 * @param borderRadius defines the radius of the border.
 * @param borderWidth defines the width of the border.
 * @param color a string or string array to define border color.
 * @param className defines the class name to be applied to the component
 * @param children contains react node elements.
 */
export function ShineBorder({
  borderRadius = 8,
  borderWidth = 1,
  color = "#000000",
  className,
  children,
}: ShineBorderProps) {
  const isMobile = useIsMobile();
  
  return (
    <div
      style={
        {
          "--border-radius": `${borderRadius}px`,
        } as React.CSSProperties
      }
      className={cn(
        "min-h-[60px] w-fit min-w-[300px] place-items-center rounded-[--border-radius] p-0 bg-transparent",
        isMobile && "min-w-full",
        className,
      )}
    >
      <div
        style={
          {
            "--border-width": `${borderWidth}px`,
            "--border-radius": `${borderRadius}px`,
          } as React.CSSProperties
        }
        className="border border-gray-200 rounded-[--border-radius]"
      >
        {children}
      </div>
    </div>
  )
}
