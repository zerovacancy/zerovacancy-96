
import React from 'react';
import { Link } from 'react-router-dom';

interface CallToActionProps {
  type: 'primary' | 'secondary';
  text: string;
  href: string;
}

const CallToAction = ({ type, text, href }: CallToActionProps) => {
  return (
    <Link
      to={href}
      className={`fade-up ${
        type === 'primary' ? 'hero-button-primary' : 'hero-button-secondary'
      }`}
    >
      {text}
    </Link>
  );
};

export default CallToAction;
