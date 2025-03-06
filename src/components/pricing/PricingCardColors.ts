
export const colorVariants = {
  blue: {
    highlight: "from-blue-500 to-cyan-500",
    muted: "from-blue-100 to-cyan-100",
    accent: "text-blue-600",
    bg: "bg-blue-50",
    shadow: "shadow-blue-200/50",
    border: "border-blue-100",
    button: "bg-blue-600 hover:bg-blue-700",
    icon: "text-blue-600",
  },
  purple: {
    highlight: "from-violet-500 to-fuchsia-500",
    muted: "from-violet-100 to-fuchsia-100",
    accent: "text-violet-600",
    bg: "bg-violet-50",
    shadow: "shadow-violet-300/60",
    border: "border-violet-200",
    button: "bg-violet-600 hover:bg-violet-700",
    icon: "text-violet-600",
  },
  emerald: {
    highlight: "from-emerald-500 to-teal-500",
    muted: "from-emerald-100 to-teal-100",
    accent: "text-emerald-600",
    bg: "bg-emerald-50",
    shadow: "shadow-emerald-200/50",
    border: "border-emerald-100",
    button: "bg-emerald-600 hover:bg-emerald-700",
    icon: "text-emerald-600",
  }
};

export type ColorVariant = keyof typeof colorVariants;
