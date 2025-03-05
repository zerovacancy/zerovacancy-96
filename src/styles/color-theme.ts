
/**
 * ZeroVacancy Text Color Style Guide
 * Provides consistent color tokens for typography throughout the application
 */

export const textColors = {
  /* Primary Headers (H1, H2) */
  primaryHeader: "#2D1A66", // Deep purple for strong visual anchor points
  highlightedHeader: "#6033E0", // Vibrant purple for emphasis in headers
  sectionHeader: "#1F1F33", // Deep indigo-black for section demarcation

  /* Secondary Headers (H3, H4) */
  secondaryHeader: "#3B2C80", // Medium purple for creator names and feature titles
  cardHeader: "#2B2B42", // Dark indigo-gray for card headers

  /* Body Text */
  bodyPrimary: "#45455A", // Rich gray with purple undertone for primary text
  bodySecondary: "#5A5A72", // Medium purple-gray for supplementary info
  smallPrint: "#6E6E87", // Light purple-gray for less important text

  /* Interactive Elements */
  buttonText: "#FFFFFF", // White text on purple buttons
  link: "#5829D9", // Medium bright purple for links
  linkHover: "#7B4DFF", // Brighter purple for hover state

  /* Special Elements */
  price: "#212121", // Near-black for price tags
  metrics: "#3D3D3D", // Dark gray for ratings and factual information
  tags: "#4E387C", // Muted purple for tags/badges
} as const;

// Type for our text color system
export type TextColorKey = keyof typeof textColors;

// Helper to get a text color by key
export const getTextColor = (key: TextColorKey): string => textColors[key];
