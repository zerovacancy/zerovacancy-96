
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";

interface MobileViewButtonProps {
  showAllCards: boolean;
  toggleShowAllCards: () => void;
  isMobile: boolean;
}

export const MobileViewButton = ({ 
  showAllCards, 
  toggleShowAllCards, 
  isMobile 
}: MobileViewButtonProps) => {
  return (
    <motion.div 
      className="mt-10 sm:mt-12 flex justify-center md:hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      key="view-all-button"
    >
      {isMobile && showAllCards ? (
        <Button 
          variant="outline" 
          className="group border-indigo-200 hover:border-indigo-400 hover:bg-indigo-50/50 text-indigo-600"
          onClick={toggleShowAllCards}
        >
          Show less
          <ChevronDown className="ml-2 h-4 w-4 rotate-180 transition-transform" />
        </Button>
      ) : (
        <Button 
          variant="outline" 
          className="group border-indigo-200 hover:border-indigo-400 hover:bg-indigo-50/50 text-indigo-600"
        >
          View all services
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      )}
    </motion.div>
  );
};

export default MobileViewButton;
