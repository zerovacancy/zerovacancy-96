
export interface PricingFeature {
  text: string;
  primary?: boolean;
}

export interface PricingPlanProps {
  title: string;
  price: number;
  showPopular?: boolean;
  features: PricingFeature[];
}
