
import React from "react";
import { cn } from "@/lib/utils";
import { AvatarPlaceholder } from "@/components/ui/avatar-placeholder";
import { Button } from "@/components/ui/button";
import { GlowDialog } from "@/components/ui/glow-dialog";

export function WaitlistCTA({
  className,
  variant = "primary",
}: {
  className?: string;
  variant?: "primary" | "secondary";
}) {
  const [showDialog, setShowDialog] = React.useState(false);

  return (
    <div className={cn("flex flex-col items-center justify-center gap-4", className)}>
      <div className="flex flex-col items-center gap-3">
        <div className="flex -space-x-2">
          <AvatarPlaceholder type="female" size="sm" />
          <AvatarPlaceholder type="male" size="sm" />
          <AvatarPlaceholder type="female" size="sm" />
        </div>
        <div className="text-sm text-center text-gray-700">
          Join 200+ property managers already on the waitlist
        </div>
      </div>
      
      <Button
        onClick={() => setShowDialog(true)}
        className={cn(
          "w-full sm:w-auto px-8 py-2.5 rounded-full",
          "font-medium text-base",
          "transition-all duration-300 ease-out",
          "hover:shadow-lg focus:ring-2 focus:ring-offset-2",
          variant === "primary"
            ? "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500"
            : "bg-gray-100 hover:bg-gray-200 text-gray-800 focus:ring-gray-400"
        )}
      >
        Join the Waitlist
      </Button>
      
      <GlowDialog open={showDialog} onOpenChange={setShowDialog} />
    </div>
  );
}
