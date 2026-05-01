import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import logo from '@/assets/prime-auditors-logo.jpg';
import { Phone, Mail, MapPin, Clock, ArrowRight } from "lucide-react";

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-prime-gold rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-prime-blue rounded-full blur-3xl" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand & Description */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6 group">
              <img 
                src={logo} 
                alt="Prime Auditors" 
                className="h-10 w-auto transition-transform group-hover:scale-105" 
              />
              <div className="flex flex-col">
                <span className="font-montserrat font-bold text-white text-xl leading-tight">Prime Auditors</span>
                <span className="text-[10px] text-prime-gold font-open-sans tracking-wider">Certified Public Accountants</span>
              </div>
            </Link>
            <p className="text-sm text-gray-300 font-open-sans leading-relaxed mb-6">
              {t('footer.description')}
            </p>
            <div className="flex gap-3">
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-white/10 hover:bg-prime-gold flex items-center justify-center transition-all hover:scale-110">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-white/10 hover:bg-prime-gold flex items-center justify-center transition-all hover:scale-110">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-montserrat font-bold text-lg mb-6 text-white">{t('footer.quickLinks')}</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-sm text-gray-300 hover:text-prime-gold transition-colors font-open-sans flex items-center gap-2 group">
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-sm text-gray-300 hover:text-prime-gold transition-colors font-open-sans flex items-center gap-2 group">
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {t('nav.services')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-gray-300 hover:text-prime-gold transition-colors font-open-sans flex items-center gap-2 group">
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link to="/foreign-investors" className="text-sm text-gray-300 hover:text-prime-gold transition-colors font-open-sans flex items-center gap-2 group">
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {t('nav.investors')}
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-sm text-gray-300 hover:text-prime-gold transition-colors font-open-sans flex items-center gap-2 group">
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {t('nav.news')}
                </Link>
              </li>
              <li>
                <Link to="/join" className="text-sm text-gray-300 hover:text-prime-gold transition-colors font-open-sans flex items-center gap-2 group">
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {t('nav.join')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-montserrat font-bold text-lg mb-6 text-white">Services</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/services" className="text-sm text-gray-300 hover:text-prime-gold transition-colors font-open-sans flex items-center gap-2 group">
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Audit & Assurance
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-sm text-gray-300 hover:text-prime-gold transition-colors font-open-sans flex items-center gap-2 group">
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Tax Advisory
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-sm text-gray-300 hover:text-prime-gold transition-colors font-open-sans flex items-center gap-2 group">
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Business Registration
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-sm text-gray-300 hover:text-prime-gold transition-colors font-open-sans flex items-center gap-2 group">
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Holding Companies
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-sm text-gray-300 hover:text-prime-gold transition-colors font-open-sans flex items-center gap-2 group">
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Corporate Structuring
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h4 className="font-montserrat font-bold text-lg mb-6 text-white">{t('footer.contactUs')}</h4>
            <div className="space-y-4">
              <a href="tel:+255798509683" className="flex items-start gap-3 text-sm text-gray-300 hover:text-prime-gold transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-prime-gold/20 flex items-center justify-center flex-shrink-0 group-hover:bg-prime-gold/30 transition-colors">
                  <Phone className="w-4 h-4 text-prime-gold" />
                </div>
                <span className="font-open-sans">+255 798 509 683</span>
              </a>
              <a href="mailto:info@primeauditors.co.tz" className="flex items-start gap-3 text-sm text-gray-300 hover:text-prime-gold transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-prime-gold/20 flex items-center justify-center flex-shrink-0 group-hover:bg-prime-gold/30 transition-colors">
                  <Mail className="w-4 h-4 text-prime-gold" />
                </div>
                <span className="font-open-sans">info@primeauditors.co.tz</span>
              </a>
              <div className="flex items-start gap-3 text-sm text-gray-300">
                <div className="w-8 h-8 rounded-lg bg-prime-gold/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-prime-gold" />
                </div>
                <span className="font-open-sans leading-relaxed">
                  Plot 24, Block KB 3, NHC Building Apt 02<br />
                  Tanga City, Tanzania
                </span>
              </div>
              <div className="flex items-start gap-3 text-sm text-gray-300">
                <div className="w-8 h-8 rounded-lg bg-prime-gold/20 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4 text-prime-gold" />
                </div>
                <div className="font-open-sans">
                  <div>{t('contact.weekdays')}: 8:00 AM – 5:00 PM</div>
                  <div>{t('contact.saturday')}: 8:30 AM – 1:30 PM</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border-t border-white/10 py-6 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-gray-400 font-open-sans">
            © {currentYear} Prime Auditors. {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;