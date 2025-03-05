
import { Search, Users, FileCheck, Calendar } from 'lucide-react';
import { Step } from './types';
import React from 'react';

// Define step data to avoid repetition
export const steps: Step[] = [
  {
    icon: React.createElement(Search, { className: "w-5 h-5" }),
    title: "Search & Filter",
    description: "Find your perfect creator match based on your specific needs and requirements",
    number: "01",
    iconClass: "text-violet-600 bg-violet-50",
    numberClass: "bg-violet-600 text-white",
    borderClass: "border-violet-100"
  },
  {
    icon: React.createElement(Users, { className: "w-5 h-5" }),
    title: "Review & Compare",
    description: "Browse portfolios and reviews to find the perfect match for your project",
    number: "02",
    iconClass: "text-blue-600 bg-blue-50",
    numberClass: "bg-blue-600 text-white",
    borderClass: "border-blue-100"
  },
  {
    icon: React.createElement(Calendar, { className: "w-5 h-5" }),
    title: "Book & Pay",
    description: "Schedule securely through our platform with protected payments",
    number: "03",
    iconClass: "text-amber-600 bg-amber-50",
    numberClass: "bg-amber-600 text-white",
    borderClass: "border-amber-100"
  },
  {
    icon: React.createElement(FileCheck, { className: "w-5 h-5" }),
    title: "Get Content",
    description: "Receive and approve your deliverables through our streamlined process",
    number: "04",
    iconClass: "text-emerald-600 bg-emerald-50",
    numberClass: "bg-emerald-600 text-white",
    borderClass: "border-emerald-100"
  }
];
