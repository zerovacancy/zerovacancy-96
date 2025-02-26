
import { cn } from "@/lib/utils";

interface AvatarPlaceholderProps {
  initials: string;
  className?: string;
}

export function AvatarPlaceholder({ initials, className }: AvatarPlaceholderProps) {
  return (
    <div
      className={cn(
        "w-6 h-6",
        "rounded-full",
        "bg-[#202028]",
        "border border-white/10",
        "flex items-center justify-center",
        "text-[12px] font-medium text-white/90",
        className
      )}
      aria-hidden="true"
    >
      {initials}
    </div>
  );
}
