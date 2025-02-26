
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, MessageSquare, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItemProps {
  icon: 'home' | 'search' | 'message' | 'user';
  label: string;
  to?: string;
}

const NavItem = ({ icon, label, to = '/' }: NavItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  const IconComponent = {
    home: Home,
    search: Search,
    message: MessageSquare,
    user: User
  }[icon];

  return (
    <Link
      to={to}
      className={cn(
        "flex flex-col items-center gap-1 py-2 px-3 sm:px-4",
        "touch-manipulation select-none active:scale-95",
        "transition-all duration-200",
        isActive 
          ? "text-primary" 
          : "text-muted-foreground hover:text-foreground"
      )}
    >
      <IconComponent className="w-5 h-5 sm:w-[22px] sm:h-[22px]" />
      <span className="text-[11px] sm:text-xs font-medium">{label}</span>
    </Link>
  );
};

export const BottomNav = () => {
  return (
    <nav className="hidden">
      <div className="flex items-center justify-around max-w-md mx-auto h-16">
        <NavItem icon="home" label="Home" to="/" />
        <NavItem icon="search" label="Discover" to="/search" />
        <NavItem icon="message" label="Messages" to="/messages" />
        <NavItem icon="user" label="Profile" to="/profile" />
      </div>
    </nav>
  );
};
