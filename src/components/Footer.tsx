import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h4 className="font-semibold mb-2">Prime Auditors</h4>
          <p className="text-sm text-gray-300">Strategic Accounting, Tax & Advisory Services in Tanzania.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Navigate</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/foreign-investors">Investors</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Contact</h4>
          <p className="text-sm text-gray-300">info@primeauditors.co.tz</p>
          <p className="text-sm text-gray-300">+255 798 509 683</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
