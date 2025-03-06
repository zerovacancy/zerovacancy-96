
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TermsModal from './TermsModal';
import { Mail, Clock, MapPin, ExternalLink, Search, Users, Landmark, HelpCircle, ChevronUp } from 'lucide-react';

const Footer = () => {
  const [showTerms, setShowTerms] = useState(false);
  const currentYear = new Date().getFullYear();
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t border-border/40 pt-14 sm:pt-16 lg:pt-20 pb-20 sm:pb-22 lg:pb-24 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 lg:gap-16">
          {/* Column 1: Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold bg-gradient-to-r from-brand-purple-dark to-brand-purple-medium bg-clip-text text-transparent">
              ZeroVacancy
            </h3>
            <p className="text-brand-text-primary text-sm leading-relaxed">
              Connecting properties with professional content creators for marketing that converts
            </p>
            
            {/* Social media icons would go here */}
            <div className="flex space-x-4 pt-3">
              {/* Placeholder for social icons - can be updated later if needed */}
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center transition-colors hover:bg-gray-200 cursor-pointer">
                <Users size={16} className="text-brand-purple-medium" />
              </div>
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center transition-colors hover:bg-gray-200 cursor-pointer">
                <Search size={16} className="text-brand-purple-medium" />
              </div>
            </div>
          </div>

          {/* Column 2: Discover */}
          <div>
            <h4 className="font-semibold mb-4 text-brand-purple-medium flex items-center text-base">
              <Search size={18} className="mr-2 text-brand-purple" />
              Discover
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/search" className="text-brand-text-secondary hover:text-brand-purple-medium text-sm transition-colors flex items-center group">
                  <span className="h-0.5 w-0 bg-brand-purple-medium transition-all duration-300 mr-0 group-hover:w-2 group-hover:mr-2"></span>
                  Find Creators
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-brand-text-secondary hover:text-brand-purple-medium text-sm transition-colors flex items-center group">
                  <span className="h-0.5 w-0 bg-brand-purple-medium transition-all duration-300 mr-0 group-hover:w-2 group-hover:mr-2"></span>
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-brand-text-secondary hover:text-brand-purple-medium text-sm transition-colors flex items-center group">
                  <span className="h-0.5 w-0 bg-brand-purple-medium transition-all duration-300 mr-0 group-hover:w-2 group-hover:mr-2"></span>
                  Pricing Plans
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Creators */}
          <div>
            <h4 className="font-semibold mb-4 text-brand-purple-medium flex items-center text-base">
              <Users size={18} className="mr-2 text-brand-purple" />
              Creators
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/join-as-creator" className="text-brand-text-secondary hover:text-brand-purple-medium text-sm transition-colors flex items-center group">
                  <span className="h-0.5 w-0 bg-brand-purple-medium transition-all duration-300 mr-0 group-hover:w-2 group-hover:mr-2"></span>
                  Join as Creator
                </Link>
              </li>
              <li>
                <Link to="/showcase" className="text-brand-text-secondary hover:text-brand-purple-medium text-sm transition-colors flex items-center group">
                  <span className="h-0.5 w-0 bg-brand-purple-medium transition-all duration-300 mr-0 group-hover:w-2 group-hover:mr-2"></span>
                  Showcase Work
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-brand-text-secondary hover:text-brand-purple-medium text-sm transition-colors flex items-center group">
                  <span className="h-0.5 w-0 bg-brand-purple-medium transition-all duration-300 mr-0 group-hover:w-2 group-hover:mr-2"></span>
                  Creator Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Support */}
          <div>
            <h4 className="font-semibold mb-4 text-brand-purple-medium flex items-center text-base">
              <HelpCircle size={18} className="mr-2 text-brand-purple" />
              Support
            </h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href="mailto:help@zerovacancy.ai" 
                  className="text-brand-text-secondary hover:text-brand-purple-medium text-sm transition-colors flex items-center"
                >
                  <Mail className="w-4 h-4 mr-2 text-brand-purple-medium/70" />
                  help@zerovacancy.ai
                </a>
              </li>
              <li className="text-brand-text-light text-sm flex items-center pl-6">
                <Clock className="w-4 h-4 mr-2 text-brand-purple-medium/70" />
                <span className="bg-gray-50 px-2 py-0.5 rounded text-brand-text-primary">Mon-Fri, 9am-5pm EST</span>
              </li>
              <li>
                <a 
                  href="/contact" 
                  className="text-brand-text-secondary hover:text-brand-purple-medium text-sm transition-colors flex items-center mt-2"
                >
                  <MapPin className="w-4 h-4 mr-2 text-brand-purple-medium/70" />
                  Contact Us
                </a>
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
                className="text-brand-text-light hover:text-brand-purple-medium text-sm transition-colors flex items-center"
              >
                <span>Terms & Conditions</span>
                <ExternalLink className="ml-1 w-3 h-3 text-gray-400" />
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

      <button 
        onClick={scrollToTop}
        className="absolute bottom-6 right-6 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors border border-gray-200"
        aria-label="Back to top"
      >
        <ChevronUp className="w-5 h-5 text-brand-purple-medium" />
      </button>

      <TermsModal
        open={showTerms}
        onOpenChange={setShowTerms}
      />
    </footer>
  );
};

export default Footer;
