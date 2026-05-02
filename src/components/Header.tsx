import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Menu, X, Phone } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';

const Header: React.FC = () => {
  const { t } = useTranslation();
  const { locale } = useParams();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { href: `/${locale}/`, label: t('nav.home') },
    { href: `/${locale}/services`, label: t('nav.services') },
    { href: `/${locale}/about`, label: t('nav.about') },
    { href: `/${locale}/foreign-investors`, label: t('nav.investors') },
    { href: `/${locale}/news`, label: t('nav.news') },
    { href: `/${locale}/join`, label: t('nav.join') },
  ];

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="bg-prime-blue/95 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 lg:h-20 items-center">
            {/* Logo */}
            <Link to={`/${locale}/`} className="flex items-center gap-2 group">
              <div className="relative h-8 lg:h-9 w-32 transition-transform group-hover:scale-105">
                <img 
                  src="/prime-auditors-logo.jpg" 
                  alt="Prime Auditors" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-montserrat font-bold text-white text-lg lg:text-xl leading-tight">Prime Auditors</span>
                <span className="text-[10px] text-prime-gold font-open-sans tracking-wider hidden sm:block">Certified Public Accountants</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="px-3 py-2 text-sm font-montserrat font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-3">
              <a 
                href="tel:+255752401012" 
                className="flex items-center gap-2 text-sm text-white/80 hover:text-prime-gold transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span className="font-medium">+255 752 401 012</span>
              </a>
              <LanguageSwitcher />
              <Link to={`/${locale}/#contact`}>
                <Button className="bg-prime-gold hover:bg-prime-gold/90 text-prime-blue font-montserrat font-semibold px-5 py-2 rounded-lg shadow-lg shadow-prime-gold/20 hover:shadow-gold/30 transition-all">
                  {t('nav.schedule')}
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden items-center gap-2">
              <LanguageSwitcher />
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden pb-4">
              <nav className="flex flex-col space-y-1 pt-4 border-t border-white/10">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-3 text-sm font-montserrat font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="pt-4 border-t border-white/10">
                  <a 
                    href="tel:+255752401012" 
                    className="flex items-center gap-2 px-4 py-3 text-sm text-white/80 hover:text-prime-gold transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    <span className="font-medium">+255 752 401 012</span>
                  </a>
                  <Link to={`/${locale}/#contact`} onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full mt-2 bg-prime-gold hover:bg-prime-gold/90 text-prime-blue font-montserrat font-semibold">
                      {t('nav.schedule')}
                    </Button>
                  </Link>
                </div>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
