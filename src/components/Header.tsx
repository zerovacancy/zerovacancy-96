
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const NavLinks = ({ className, onClick }: { className?: string, onClick?: () => void }) => (
    <nav className={cn("flex items-center gap-6", className)}>
      <Link 
        to="/search" 
        className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
        onClick={onClick}
      >
        Find Creators
      </Link>
      <Link 
        to="/how-it-works" 
        className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
        onClick={onClick}
      >
        How It Works
      </Link>
      <Link 
        to="/pricing" 
        className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
        onClick={onClick}
      >
        Pricing
      </Link>
    </nav>
  );

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/40">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link 
          to="/" 
          className="flex items-center gap-2 transition-opacity active:opacity-80"
        >
          <motion.div 
            initial={false}
            animate={{ scale: isOpen ? 0.95 : 1 }}
            className="text-xl font-semibold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent"
          >
            LuxeConnect
          </motion.div>
        </Link>

        <NavLinks className="hidden md:flex" />

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-10 w-10 rounded-full hover:bg-accent active:scale-95 transition-all duration-200"
            >
              <Menu className="h-5 w-5 transition-transform duration-200" 
                style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}
              />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent 
            side="right" 
            className="w-full sm:w-[380px] pr-0"
          >
            <div className="flex flex-col gap-6 mt-8">
              <NavLinks 
                onClick={() => setIsOpen(false)} 
                className="flex-col items-start gap-8"
              />
              <div className="flex flex-col gap-3 mt-4">
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Button 
                      variant="ghost" 
                      asChild 
                      onClick={() => setIsOpen(false)}
                      className="w-full justify-start text-base font-medium h-12"
                    >
                      <Link to="/login">Log In</Link>
                    </Button>
                    <Button 
                      asChild 
                      onClick={() => setIsOpen(false)}
                      className="w-full justify-start text-base font-medium h-12 mt-2"
                    >
                      <Link to="/signup">Sign Up</Link>
                    </Button>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" asChild className="h-10">
            <Link to="/login">Log In</Link>
          </Button>
          <Button asChild className="h-10">
            <Link to="/signup">Sign Up</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
