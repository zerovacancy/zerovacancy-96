
import React from 'react';
import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Testimonial {
  text: string;
  name: string;
  title: string;
  rating: number;
  image?: string;
}

const testimonials: Testimonial[] = [
  {
    text: "This platform made finding the right photographer for our property listings incredibly easy. We've seen a 30% increase in engagement since upgrading our visuals.",
    name: "Sarah Johnson",
    title: "Real Estate Agent, Century 21",
    rating: 5
  },
  {
    text: "The quality of content creators is exceptional. Our properties now stand out with professional photography that truly showcases their best features.",
    name: "Michael Chen",
    title: "Property Manager, Urban Living",
    rating: 5
  },
  {
    text: "Streamlined our entire content creation process and saved us countless hours. The results speak for themselves - highly recommended!",
    name: "Jennifer Williams",
    title: "Marketing Director, Premier Properties",
    rating: 4
  }
];

export const Testimonials: React.FC = () => {
  return (
    <section className="hidden sm:block relative overflow-hidden bg-gradient-to-b from-white to-gray-50 py-12 lg:py-16 border-t border-gray-100">
      <div className="absolute inset-0 bg-[radial-gradient(#f1f1f1_1px,transparent_1px)] [background-size:20px_20px] opacity-50"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-3">
            Trusted by Property Professionals
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            See what our customers have to say about their experience
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 justify-center">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} index={index} />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 py-2 px-4 bg-indigo-50 rounded-full">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star} 
                  className="w-4 h-4 text-amber-400 fill-amber-400"
                />
              ))}
            </div>
            <span className="text-sm font-medium text-gray-800">
              4.9 out of 5 based on 200+ reviews
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial, index }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ 
        opacity: 1, 
        y: 0,
        transition: { 
          duration: 0.5,
          delay: index * 0.2
        }
      }}
      viewport={{ once: true, margin: "-50px" }}
      className={cn(
        "bg-white rounded-xl shadow-sm",
        "border border-gray-100",
        "p-6",
        "flex flex-col",
        "relative",
        "max-w-md",
        "hover:shadow-md transition-all duration-300 hover:-translate-y-1"
      )}
    >
      <div className="absolute top-6 right-6 text-indigo-400 opacity-20">
        <Quote size={48} />
      </div>
      
      <div className="flex mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star 
            key={i} 
            className={cn(
              "w-5 h-5",
              i < testimonial.rating ? "text-amber-400 fill-amber-400" : "text-gray-300"
            )}
          />
        ))}
      </div>
      
      <p className="text-gray-700 italic mb-6 relative z-10">
        "{testimonial.text}"
      </p>
      
      <div className="mt-auto flex items-center">
        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3 flex-shrink-0">
          <span className="font-semibold text-indigo-600">
            {testimonial.name.split(' ').map(n => n[0]).join('')}
          </span>
        </div>
        <div>
          <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
          <p className="text-sm text-gray-500">{testimonial.title}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Testimonials;
