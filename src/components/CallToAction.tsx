
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface CallToActionProps {
  type: 'primary' | 'secondary';
  text: string;
  href: string;
}

const CallToAction = ({ type, text, href }: CallToActionProps) => {
  return (
    <Link
      to={href}
      className={cn(
        'relative group overflow-hidden',
        'inline-flex items-center justify-center rounded-full px-8 py-3',
        'text-base font-medium transition-all duration-200',
        'hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2',
        type === 'primary' ? [
          'bg-primary text-primary-foreground hover:brightness-110',
          'focus:ring-primary',
        ] : [
          'bg-secondary text-secondary-foreground hover:bg-secondary/90',
          'focus:ring-secondary',
        ],
      )}
      style={{ '--speed': '1.5s' } as React.CSSProperties}
    >
      <span className="relative z-10">{text}</span>
      <div 
        className={cn(
          "absolute inset-0 z-0 overflow-hidden rounded-full",
          "before:absolute before:inset-0 before:z-0",
          "before:h-[100%] before:w-[20%]",
          "before:animate-shimmer-slide",
          "before:bg-gradient-to-r",
          type === 'primary' 
            ? "before:from-transparent before:via-white/10 before:to-transparent"
            : "before:from-transparent before:via-black/5 before:to-transparent"
        )}
      />
    </Link>
  );
};

export default CallToAction;
