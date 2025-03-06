
// Pricing data for all plan options

// Monthly and annual pricing values
export const PRICING = {
  starterMonthly: 139,
  starterAnnual: 99,
  proMonthly: 499,
  proAnnual: 399
};

// Calculate savings
export const SAVINGS = {
  starter: Math.round(PRICING.starterMonthly * 12 - PRICING.starterAnnual * 12),
  pro: Math.round(PRICING.proMonthly * 12 - PRICING.proAnnual * 12)
};

// Features for each plan
export const FEATURES = {
  free: [
    { text: "Basic photo editing" },
    { text: "Property website" },
    { text: "Digital delivery within 72 hours" },
    { text: "Up to 10 photos" }
  ],
  starter: [
    { text: "Professional photography (up to 25 photos)" },
    { text: "Basic photo editing" },
    { text: "Property website" },
    { text: "Digital delivery within 48 hours" },
    { text: "1 photographer, 1 hour session" },
    { text: "High-resolution images" },
    { text: "Basic virtual staging" },
    { text: "Social media optimization" }
  ],
  pro: [
    { text: "Everything in Professional, plus:" },
    { text: "Up to 40 professional photos" },
    { text: "Drone aerial photography" },
    { text: "3D virtual tour" },
    { text: "Advanced photo editing" },
    { text: "Social media optimized images" },
    { text: "Unlimited revisions" },
    { text: "24-hour delivery" },
    { text: "2 photographer team" },
    { text: "7-day money-back guarantee" }
  ]
};
