
// Pricing data for all plan options

// Monthly and annual pricing values
export const PRICING = {
  starterMonthly: 299,
  starterAnnual: 299,
  proMonthly: 499,
  proAnnual: 499,
  premiumMonthly: 799,
  premiumAnnual: 799
};

// Calculate savings
export const SAVINGS = {
  starter: Math.round(PRICING.starterMonthly * 12 - PRICING.starterAnnual * 12),
  pro: Math.round(PRICING.proMonthly * 12 - PRICING.proAnnual * 12),
  premium: Math.round(PRICING.premiumMonthly * 12 - PRICING.premiumAnnual * 12)
};

// Features for each plan with improved organization and wording
export const FEATURES = {
  foundation: [
    { text: "Essential visual narrative", primary: true },
    { text: "Curated property moments", primary: true },
    { text: "Core spatial storytelling", primary: true },
    { text: "Foundational amenity presence", primary: true },
    { text: "48-hour creative delivery", primary: true }
  ],
  narrative: [
    { text: "Expanded visual storytelling", primary: true },
    { text: "Cinematic property sequence", primary: true },
    { text: "Elevated aerial perspective", primary: true },
    { text: "Environmental context", primary: true },
    { text: "Lifestyle integration", primary: true },
    { text: "24-hour creative delivery", primary: true }
  ],
  masterpiece: [
    { text: "Comprehensive visual identity", primary: true },
    { text: "Feature-length property film", primary: true },
    { text: "Signature aerial sequences", primary: true },
    { text: "Neighborhood integration", primary: true },
    { text: "Staged lifestyle vignettes", primary: true },
    { text: "Same-day priority creation", primary: true },
    { text: "Full commercial sovereignty", primary: true }
  ]
};

// Value propositions for each plan
export const VALUE_PROPOSITIONS = {
  foundation: "Essential visual narrative that captures your property's unique character",
  narrative: "Expanded storytelling with cinematic quality and lifestyle integration",
  masterpiece: "Comprehensive visual identity with premium features and same-day delivery"
};

// Plan descriptions
export const PLAN_DESCRIPTIONS = {
  foundation: "Essential visual narrative",
  narrative: "Expanded visual storytelling",
  masterpiece: "Comprehensive visual identity"
};

// Plan CTAs
export const PLAN_CTAS = {
  foundation: "BEGIN TRANSFORMATION",
  narrative: "CRAFT YOUR NARRATIVE",
  masterpiece: "CREATE YOUR MASTERPIECE"
};
