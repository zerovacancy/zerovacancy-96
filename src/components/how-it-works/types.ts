
import { ReactNode } from 'react';

export interface Step {
  icon: ReactNode;
  title: string;
  description: string;
  number: string;
  iconClass: string;
  numberClass: string;
  borderClass: string;
}
