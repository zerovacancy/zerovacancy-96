import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface PricingHeaderProps {
  title: string;
  subtitle: string;
}

const PricingHeader = ({
  title,
  subtitle
}: PricingHeaderProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="text-center max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {/* Decorative elements */}
        <div className="flex justify-center mb-4">
          <div className="relative">
            <div className="absolute -top-6 -right-6 w-12 h-12 bg-purple-100 rounded-full blur-xl opacity-70" />
            <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-blue-100 rounded-full blur-xl opacity-70" />
            <div className={cn(
              "inline-flex items-center px-4 py-1.5 rounded-full",
              "bg-gradient-to-r from-indigo-50 to-violet-50 border border-indigo-100/50",
              "text-indigo-800 text-sm font-medium uppercase font-space",
              "shadow-sm"
            )}>
              Premium Quality
            </div>
          </div>
        </div>
        
        {/* Main title */}
        <h2 className={cn(
          "heading-2",
          "mb-4",
          "bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700"
        )}>
          {title}
        </h2>
        
        {/* Decorative element under the heading */}
        <div className="section-title-decoration" />
        
        {/* Subtitle */}
        <p className={cn(
          "paragraph-base",
          isMobile ? "px-4" : ""
        )}>
          {subtitle}
        </p>
      </motion.div>
    </div>
  );
};

export default PricingHeader;
