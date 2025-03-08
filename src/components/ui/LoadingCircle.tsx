
import React from 'react';

interface LoadingCircleProps {
  size?: number;
  color?: string;
}

export const LoadingCircle: React.FC<LoadingCircleProps> = ({ 
  size = 24, 
  color = 'currentColor' 
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="animate-spin"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke={color}
        strokeOpacity="0.25"
        strokeWidth="4"
      />
      <path
        d="M12 2C6.47715 2 2 6.47715 2 12C2 12.6213 2.05155 13.2289 2.14991 13.8192"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default LoadingCircle;
