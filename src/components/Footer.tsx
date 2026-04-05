import React from 'react';
import { Link } from 'react-router-dom';
import logo from '@/assets/prime-auditors-logo.jpg';
import { Button } from '@/components/ui/button';
import { Phone, Mail, MapPin } from "lucide-react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <Link to="/" className="flex items-center gap-2 mb-4">
            <img src={logo} alt="Prime Auditors" className="h-8 w-auto" />
            <span className="font-semibold text-prime-gold text-xl">Prime Auditors</span>
          </Link>
          <p className="text-sm text-gray-300 font-open-sans">
            Strategic Accounting, Tax & Advisory Services in Tanzania. We empower businesses and investors with expert financial solutions.
          </p>
        </div>
        <div>
          <h4 className="font-bold text-lg mb-4 font-montserrat">Quick Links</h4>
          <ul className="space-y-2 text-sm font-open-sans">
            <li><Link to="/" className="hover:text-prime-gold transition-colors">Home</Link></li>
            <li><Link to="/services" className="hover:text-prime-gold transition-colors">Services</Link></li>
            <li><Link to="/about" className="hover:text-prime-gold transition-colors">About Us</Link></li>
            <li><Link to="/foreign-investors" className="hover:text-prime-gold transition-colors">Investors</Link></li>
            <li><Link to="/#contact" className="hover:text-prime-gold transition-colors">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-lg mb-4 font-montserrat">Contact Us</h4>
          <div className="space-y-3 text-sm font-open-sans">
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-prime-gold" />
              <span className="text-gray-300">+255 798 509 683</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-prime-gold" />
              <span className="text-gray-300">info@primeauditors.co.tz</span>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="h-5 w-5 text-prime-gold mt-0.5" />
              <span className="text-gray-300">
                Plot 24, Block KB 3, NHC Building Apt 02,<br />
                Market Street, Independence Avenue Road,<br />
                Central Ward, Tanga City, Tanzania
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 pt-6 pb-8 mt-8 text-center text-sm text-gray-400 font-open-sans font-medium">
        © {currentYear} Prime Auditors. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
