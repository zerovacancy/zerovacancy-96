
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Menu, X } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "./ui/sheet";
import { cn } from '@/lib/utils';

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const NavLinks = ({ className, onClick }: { className?: string, onClick?: () => void }) => (
    <nav className={cn("flex items-center gap-6", className)}>
      <Link 
        to="/search" 
        className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        onClick={onClick}
      >
        Find Creators
      </Link>
      <Link 
        to="/how-it-works" 
        className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        onClick={onClick}
      >
        How It Works
      </Link>
      <Link 
        to="/pricing" 
        className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        onClick={onClick}
      >
        Pricing
      </Link>
    </nav>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <div className="text-xl font-semibold">
            LuxeConnect
          </div>
        </Link>

        {/* Desktop Navigation */}
        <NavLinks className="hidden md:flex" />

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <div className="flex flex-col gap-4 mt-6">
              <NavLinks onClick={() => setIsOpen(false)} className="flex-col items-start" />
              <div className="flex flex-col gap-2">
                <Button variant="ghost" asChild onClick={() => setIsOpen(false)}>
                  <Link to="/login" className="w-full justify-start">Log In</Link>
                </Button>
                <Button asChild onClick={() => setIsOpen(false)}>
                  <Link to="/signup" className="w-full justify-start">Sign Up</Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
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
