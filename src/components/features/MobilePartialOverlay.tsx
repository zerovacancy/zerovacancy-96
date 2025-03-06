
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface MobilePartialOverlayProps {
  showAllCards: boolean;
  toggleShowAllCards: () => void;
}

export const MobilePartialOverlay = ({ 
  showAllCards, 
  toggleShowAllCards 
}: MobilePartialOverlayProps) => {
  if (showAllCards) return null;
  
  return (
    <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-white via-white/95 to-transparent z-20 flex items-end justify-center pb-6">
      <motion.button
        onClick={toggleShowAllCards}
        className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-5 py-3 rounded-full flex items-center gap-2 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        View all services
        <ChevronDown className="w-4 h-4" />
      </motion.button>
    </div>
  );
};

export default MobilePartialOverlay;
