
export const colorVariants = {
  blue: {
    highlight: "from-blue-500 to-cyan-500",
    muted: "from-blue-100/80 to-cyan-100/80",
    accent: "text-blue-600",
    bg: "bg-blue-50/70",
    shadow: "shadow-blue-200/50",
    border: "border-blue-100/70",
    button: "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600",
    icon: "text-blue-600",
  },
  purple: {
    highlight: "from-brand-purple-medium to-brand-purple",
    muted: "from-violet-100/80 to-fuchsia-100/80",
    accent: "text-brand-purple",
    bg: "bg-violet-50/70",
    shadow: "shadow-violet-300/60",
    border: "border-brand-purple/20",
    button: "bg-gradient-to-r from-brand-purple to-brand-purple-medium hover:from-brand-purple-medium hover:to-brand-purple",
    icon: "text-brand-purple",
  },
  emerald: {
    highlight: "from-emerald-500 to-teal-500",
    muted: "from-emerald-100/80 to-teal-100/80",
    accent: "text-emerald-600",
    bg: "bg-emerald-50/70",
    shadow: "shadow-emerald-200/50",
    border: "border-emerald-100/70",
    button: "bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600",
    icon: "text-emerald-600",
  },
  amber: {
    highlight: "from-amber-400 to-amber-300",
    muted: "from-amber-100/80 to-yellow-100/80",
    accent: "text-amber-600", 
    bg: "bg-amber-50/70",
    shadow: "shadow-amber-200/50",
    border: "border-amber-100/70",
    button: "bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-600 hover:to-amber-500",
    icon: "text-amber-500",
  }
};

export type ColorVariant = keyof typeof colorVariants;
