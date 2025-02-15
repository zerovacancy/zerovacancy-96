
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <div className="text-xl font-semibold">
            LuxeConnect
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/search" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Find Creators
          </Link>
          <Link to="/how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            How It Works
          </Link>
          <Link to="/pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Pricing
          </Link>
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link to="/login">Log In</Link>
          </Button>
          <Button asChild>
            <Link to="/signup">Sign Up</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
