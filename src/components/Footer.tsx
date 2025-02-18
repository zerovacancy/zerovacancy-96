
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground pt-12 pb-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 pb-8">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Luxe Content Connect</h3>
            <p className="text-primary-foreground/70 text-sm">
              Premium real estate content creation marketplace
            </p>
          </div>

          <div>
            <h4 className="font-medium mb-3">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-primary-foreground/70 hover:text-primary-foreground text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/search" className="text-primary-foreground/70 hover:text-primary-foreground text-sm">
                  Search
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-primary-foreground/70 hover:text-primary-foreground text-sm">
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-3">For Creators</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/join" className="text-primary-foreground/70 hover:text-primary-foreground text-sm">
                  Join as Creator
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-primary-foreground/70 hover:text-primary-foreground text-sm">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-primary-foreground/70 hover:text-primary-foreground text-sm">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-3">Contact</h4>
            <ul className="space-y-2">
              <li>
                <a href="mailto:support@luxeconnect.com" className="text-primary-foreground/70 hover:text-primary-foreground text-sm">
                  support@luxeconnect.com
                </a>
              </li>
              <li className="text-primary-foreground/70 text-sm">
                Mon - Fri, 9am - 5pm EST
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-primary-foreground/10">
          <p className="text-center text-primary-foreground/70 text-sm">
            © {currentYear} Luxe Content Connect – All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
