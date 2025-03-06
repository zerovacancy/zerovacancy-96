
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

// Features for each plan with improved organization and wording
export const FEATURES = {
  free: [
    { text: "Basic photo editing", primary: true },
    { text: "Property website", primary: true },
    { text: "Digital delivery within 72 hours", primary: false },
    { text: "Up to 10 photos", primary: true }
  ],
  starter: [
    { text: "Professional photography (up to 25 photos)", primary: true },
    { text: "Enhanced photo editing", primary: true },
    { text: "Custom property website", primary: true },
    { text: "Digital delivery within 48 hours", primary: true },
    { text: "1 photographer, 1 hour session", primary: false },
    { text: "High-resolution images for print", primary: true },
    { text: "Basic virtual staging", primary: true },
    { text: "Social media optimization", primary: false }
  ],
  pro: [
    { text: "Everything in Professional, plus:", primary: true },
    { text: "Up to 40 professional photos", primary: true },
    { text: "Drone aerial photography", primary: true },
    { text: "3D virtual tour technology", primary: true },
    { text: "Advanced photo editing & retouching", primary: true },
    { text: "Social media optimized image pack", primary: false },
    { text: "Unlimited revisions", primary: true },
    { text: "Express 24-hour delivery", primary: true },
    { text: "2 photographer team", primary: false },
    { text: "7-day money-back guarantee", primary: false }
  ]
};

// Value propositions for each plan
export const VALUE_PROPOSITIONS = {
  basic: "Perfect for small properties",
  professional: "Most popular for residential listings",
  premium: "Ideal for luxury properties"
};
