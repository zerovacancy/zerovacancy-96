
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import { GlowingEffect } from "./glowing-effect";

interface ButtonColorfulProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label?: string;
}

export function ButtonColorful({
    className,
    label = "Explore Components",
    ...props
}: ButtonColorfulProps) {
    return (
        <div className="relative group">
            {/* Glow effect wrapper */}
            <div className="absolute -inset-[1px] bg-gradient-to-r from-[#E5DEFF] via-[#4F46E5] to-[#3730A3] rounded-lg opacity-70 blur-sm group-hover:opacity-100 transition-opacity duration-500" />
            
            <Button
                className={cn(
                    "relative", // for stacking context
                    "h-12 px-6 overflow-hidden rounded-lg",
                    "bg-gradient-to-r from-[#4F46E5] to-[#3730A3]",
                    "text-white border-0",
                    "transition-all duration-300",
                    "hover:shadow-lg hover:shadow-indigo-500/25",
                    "hover:scale-[1.02] active:scale-[0.98]",
                    "group",
                    className
                )}
                {...props}
            >
                {/* Inner gradient overlay for hover effect */}
                <div
                    className={cn(
                        "absolute inset-0",
                        "bg-gradient-to-r from-indigo-600 to-violet-600",
                        "opacity-0 group-hover:opacity-100",
                        "transition-opacity duration-500"
                    )}
                />

                {/* Content */}
                <div className="relative flex items-center justify-center gap-2">
                    <span className="text-base font-semibold tracking-wide">
                        {label}
                    </span>
                    <ArrowUpRight 
                        className={cn(
                            "w-4 h-4 transition-transform duration-300",
                            "group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        )} 
                    />
                </div>

                {/* Shimmer effect */}
                <div
                    className={cn(
                        "absolute inset-0",
                        "bg-gradient-to-r from-transparent via-white/10 to-transparent",
                        "translate-x-[-100%] animate-[shimmer_2s_infinite]",
                        "pointer-events-none"
                    )}
                />

                {/* Add glowing effect */}
                <GlowingEffect 
                    blur={2}
                    spread={20}
                    glow={true}
                    borderWidth={1}
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
            </Button>
        </div>
    );
}
