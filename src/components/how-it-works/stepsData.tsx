
import { Search, Users, Calendar, FileCheck } from 'lucide-react';
import { StepColor } from './StepItem';
import React from 'react';

// Define colorful backgrounds for each step with enhanced styling options
export const stepColors: StepColor[] = [{
  iconBg: "bg-violet-100",
  iconText: "text-violet-600",
  numBg: "bg-violet-600",
  numText: "text-white",
  lineColor: "from-violet-600/70 to-blue-500/50",
  borderColor: "border-violet-600",
  glowColor: "shadow-violet-500/20",
  tintBg: "bg-violet-50/10",
  gradient: "bg-gradient-to-br from-violet-500/90 to-violet-600"
}, {
  iconBg: "bg-blue-100",
  iconText: "text-blue-500",
  numBg: "bg-blue-500",
  numText: "text-white",
  lineColor: "from-blue-500/70 to-amber-600/50",
  borderColor: "border-blue-500",
  glowColor: "shadow-blue-500/20",
  tintBg: "bg-blue-50/10",
  gradient: "bg-gradient-to-br from-blue-400 to-blue-600"
}, {
  iconBg: "bg-amber-100", 
  iconText: "text-amber-600",
  numBg: "bg-amber-600",
  numText: "text-white",
  lineColor: "from-amber-600/70 to-emerald-600/50",
  borderColor: "border-amber-600",
  glowColor: "shadow-amber-500/20",
  tintBg: "bg-amber-50/10",
  gradient: "bg-gradient-to-br from-amber-500 to-amber-600"
}, {
  iconBg: "bg-emerald-100",
  iconText: "text-emerald-600",
  numBg: "bg-emerald-600",
  numText: "text-white",
  lineColor: "from-emerald-600/50 to-emerald-600/10",
  borderColor: "border-emerald-600",
  glowColor: "shadow-emerald-500/20",
  tintBg: "bg-emerald-50/10",
  gradient: "bg-gradient-to-br from-emerald-500 to-emerald-600"
}];

export interface Step {
  icon: React.ReactNode;
  title: string;
  description: string;
  shortDescription?: string; // Added for mobile
  detailedDescription?: string; // Added for expandable view
  number: string;
}

export const stepsData: Step[] = [{
  icon: <Search className="w-5 h-5" />,
  title: "Search & Filter",
  description: "Find your perfect creator match based on your specific needs and requirements",
  shortDescription: "Find creators that match your needs",
  detailedDescription: "Use our powerful search to filter creators by specialty, location, price range, and availability. Our matching algorithm helps you find exactly who you need for your project.",
  number: "01"
}, {
  icon: <Users className="w-5 h-5" />,
  title: "Review & Compare",
  description: "Browse portfolios and reviews to find the perfect match for your project",
  shortDescription: "Compare portfolios and reviews",
  detailedDescription: "Look through detailed portfolios, check ratings and testimonials from previous clients. Compare multiple creators side-by-side to make the best choice for your needs.",
  number: "02"
}, {
  icon: <Calendar className="w-5 h-5" />,
  title: "Book & Pay",
  description: "Schedule securely through our platform with protected payments",
  shortDescription: "Schedule and pay securely",
  detailedDescription: "Book available time slots directly through our calendar. All payments are secured and protected. Only release payment when you're completely satisfied with the delivered work.",
  number: "03"
}, {
  icon: <FileCheck className="w-5 h-5" />,
  title: "Get Content",
  description: "Receive and approve your deliverables through our streamlined process",
  shortDescription: "Receive and approve deliverables",
  detailedDescription: "Get your content through our platform's delivery system. Review, request revisions if needed, and provide final approval. All your content stays organized in one place.",
  number: "04"
}];
