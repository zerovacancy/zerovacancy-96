
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TermsModal from './TermsModal';

const Footer = () => {
  const [showTerms, setShowTerms] = useState(false);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t border-border/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 lg:gap-16">
          {/* Column 1: Company Info */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold bg-gradient-to-r from-brand-purple-dark to-brand-purple-medium bg-clip-text text-transparent">
              ZeroVacancy
            </h3>
            <p className="text-brand-text-primary text-sm">
              Connecting properties with professional content creators
            </p>
          </div>

          {/* Column 2: Discover */}
          <div>
            <h4 className="font-medium mb-3 text-brand-purple-medium">Discover</h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/search" className="text-brand-text-secondary hover:text-brand-purple-medium text-sm transition-colors">
                  Find Creators
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-brand-text-secondary hover:text-brand-purple-medium text-sm transition-colors">
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Creators */}
          <div>
            <h4 className="font-medium mb-3 text-brand-purple-medium">Creators</h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/join-as-creator" className="text-brand-text-secondary hover:text-brand-purple-medium text-sm transition-colors">
                  Join as Creator
                </Link>
              </li>
              <li>
                <Link to="/showcase" className="text-brand-text-secondary hover:text-brand-purple-medium text-sm transition-colors">
                  Showcase Work
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Support */}
          <div>
            <h4 className="font-medium mb-3 text-brand-purple-medium">Support</h4>
            <ul className="space-y-2.5">
              <li>
                <a 
                  href="mailto:help@zerovacancy.ai" 
                  className="text-brand-text-secondary hover:text-brand-purple-medium text-sm transition-colors"
                >
                  help@zerovacancy.ai
                </a>
              </li>
              <li className="text-brand-text-light text-sm">
                Available Mon-Fri, 9am-5pm EST
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom row with copyright and legal links */}
        <div className="pt-10 mt-10 border-t border-border/40">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-brand-text-light text-sm">
              © {currentYear} ZeroVacancy. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <button
                onClick={() => setShowTerms(true)}
                className="text-brand-text-light hover:text-brand-purple-medium text-sm transition-colors"
              >
                Terms & Conditions (Modal)
              </button>
              <Link
                to="/terms"
                className="text-brand-text-light hover:text-brand-purple-medium text-sm transition-colors"
              >
                Terms & Conditions (Page)
              </Link>
              <Link
                to="/privacy"
                className="text-brand-text-light hover:text-brand-purple-medium text-sm transition-colors"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>

      <TermsModal
        open={showTerms}
        onOpenChange={setShowTerms}
      />
    </footer>
  );
};

export default Footer;
