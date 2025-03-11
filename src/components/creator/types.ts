
export interface Creator {
  name: string;
  services: string[];
  price: number;
  rating: number;
  reviews: number;
  location: string;
  image: string;
  workExamples: string[];
  tags?: string[];
  availabilityStatus?: AvailabilityStatus;
  // New fields for enhanced card
  tagline?: string;
  yearsExperience?: number;
  projectsCompleted?: number;
  serviceSkills?: ServiceSkill[];
}

export interface ServiceSkill {
  name: string;
  level: number; // 0-100 scale
}

export interface CreatorCardProps {
  creator: Creator;
  onImageLoad?: (imageSrc: string) => void;
  loadedImages: Set<string>;
  imageRef: (node: HTMLImageElement | null) => void;
}

export type AvailabilityStatus = 'available-now' | 'available-tomorrow' | 'premium-only';
