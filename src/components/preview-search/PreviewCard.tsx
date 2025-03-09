
import React from 'react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface PreviewCardProps {
  isVisible: boolean;
  children: React.ReactNode;
}

export const PreviewCard: React.FC<PreviewCardProps> = ({ isVisible, children }) => {
  const isMobile = useIsMobile();

  return (
    <div className="relative rounded-lg sm:rounded-xl overflow-hidden shadow-lg sm:shadow-xl border border-zinc-200/70 bg-white/95">
      <div className="relative">
        {children}
      </div>
    </div>
  );
};
