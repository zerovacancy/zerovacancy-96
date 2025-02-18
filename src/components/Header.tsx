
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { cn } from '@/lib/utils';

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const NavLinks = ({ className, onClick }: { className?: string, onClick?: () => void }) => (
    <nav className={cn("flex items-center gap-4 sm:gap-6", className)}>
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
    <div className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center">
          <div className="text-lg sm:text-xl font-semibold">
            LuxeConnect
          </div>
        </Link>

        <NavLinks className="hidden md:flex" />

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px] pr-0">
            <div className="flex flex-col gap-4 mt-6">
              <NavLinks onClick={() => setIsOpen(false)} className="flex-col items-start" />
              <div className="flex flex-col gap-2 mt-2">
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

        <div className="hidden md:flex items-center gap-2">
          <Button variant="ghost" asChild className="h-9">
            <Link to="/login">Log In</Link>
          </Button>
          <Button asChild className="h-9">
            <Link to="/signup">Sign Up</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
