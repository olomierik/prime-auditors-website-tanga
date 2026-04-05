import React from 'react';
import { Link } from 'react-router-dom';
import logo from '@/assets/prime-auditors-logo.jpg';
import { Button } from '@/components/ui/button';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Prime Auditors" className="h-7 w-auto" />
            <span className="font-semibold text-prime-blue text-xl">Prime Auditors</span>
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="text-sm font-medium text-prime-blue hover:text-prime-gold">Home</Link>
            <Link to="/services" className="text-sm font-medium text-prime-blue hover:text-prime-gold">Services</Link>
            <Link to="/about" className="text-sm font-medium text-prime-blue hover:text-prime-gold">About Us</Link>
            <Link to="/foreign-investors" className="text-sm font-medium text-prime-blue hover:text-prime-gold">Investors</Link>
          </nav>
          <Link to="/#contact" className="hidden md:inline-block">
            <Button className="bg-prime-gold hover:bg-prime-gold/90 text-prime-blue font-semibold px-4 py-2 rounded">
              Schedule Consultation
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
