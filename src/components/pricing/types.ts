export interface PricingPlanProps {
  title: string;
  price?: number;
  features: PricingFeature[];
  showPopular?: boolean;
}

export interface PricingFeature {
  text: string;
  primary?: boolean;
  category?: string;
}
