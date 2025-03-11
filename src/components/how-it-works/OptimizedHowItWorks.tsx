
import React, { useRef, useState, useEffect, forwardRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { Rocket, Lightbulb, BadgeCheck, ShieldCheck, LayoutDashboard } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const fadeInAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeInOut"
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut" // Fixed the invalid easing function
    }
  }
};

// Fix the type definition by explicitly defining the props interface
interface OptimizedHowItWorksProps {
  className?: string;
}

const OptimizedHowItWorks = forwardRef<HTMLDivElement, OptimizedHowItWorksProps>(
  ({ className = '', ...props }, ref) => {
    const isMobile = useIsMobile();
    const containerRef = useRef<HTMLDivElement>(null);
    const controls = useAnimation();
    const [cardsInView, setCardsInView] = useState(false);
    const [sectionRef, inView] = useInView({
      threshold: 0.2,
      triggerOnce: true,
    });

    useEffect(() => {
      if (inView) {
        controls.start("visible");
      }
    }, [controls, inView]);

    const cardData = [
      {
        title: "Discover",
        description: "Explore a curated marketplace of top-tier creative professionals.",
        icon: Rocket,
        delay: 0.2
      },
      {
        title: "Connect",
        description: "Effortlessly connect with creators who align with your project's vision.",
        icon: Lightbulb,
        delay: 0.4
      },
      {
        title: "Verify",
        description: "Ensure quality and reliability with our verified creator network.",
        icon: BadgeCheck,
        delay: 0.6
      },
      {
        title: "Secure",
        description: "Safeguard your projects with secure transactions and protected collaborations.",
        icon: ShieldCheck,
        delay: 0.8
      },
      {
        title: "Manage",
        description: "Streamline your workflow with our intuitive project management tools.",
        icon: LayoutDashboard,
        delay: 1.0
      }
    ];

    return (
      <section ref={sectionRef} className={cn("py-16 sm:py-20 md:py-24", className)} {...props}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeInAnimation}
            initial="hidden"
            animate={controls}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-space">
              How It Works
            </h2>
            <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto font-inter">
              Connecting you with top creative talent is simple and secure.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
            {cardData.map((card, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                initial="hidden"
                animate={controls}
                style={{ transitionDelay: `${card.delay}s` }}
                className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col items-start p-5 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="text-indigo-600 mb-3">
                  <card.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2 font-space">{card.title}</h3>
                <p className="text-gray-600 font-inter">{card.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }
);

OptimizedHowItWorks.displayName = "OptimizedHowItWorks";
export default OptimizedHowItWorks;
