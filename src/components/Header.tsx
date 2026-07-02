import React, { useState, useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, Phone } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';

const Header: React.FC = () => {
  const { t } = useTranslation();
  const { locale } = useParams();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileMenuOpen(false); }, [location.pathname]);

  const isActive = (path: string) =>
    location.pathname === `/${locale}${path}` || location.pathname === `/${locale}${path}/`;

  const navItems = [
    { href: `/${locale}/`, label: t('nav.home'), match: '/' },
    { href: `/${locale}/services`, label: t('nav.services'), match: '/services' },
    { href: `/${locale}/about`, label: t('nav.about'), match: '/about' },
    { href: `/${locale}/news`, label: t('nav.news'), match: '/news' },
    { href: `/${locale}/contact`, label: t('nav.contact'), match: '/contact' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-[0_2px_20px_rgba(15,42,74,0.08)] border-b border-gray-100'
          : 'bg-white border-b border-gray-100'
      }`}
    >
      {/* Top gold hairline */}
      <div className="h-[3px] bg-gradient-to-r from-prime-gold via-prime-gold/60 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-[68px] lg:h-[80px] items-center">

          {/* Logo */}
          <Link to={`/${locale}/`} className="flex items-center gap-3 group flex-shrink-0">
            <div className="h-10 w-10 rounded-md bg-prime-blue flex items-center justify-center font-serif font-bold text-prime-gold text-lg transition-transform duration-200 group-hover:scale-105">
              Pa
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-serif font-bold text-prime-blue text-[18px] tracking-tight">
                Prime Auditors
              </span>
              <span className="text-[9px] text-prime-gold font-montserrat font-semibold tracking-[0.18em] uppercase mt-1 hidden sm:block">
                Certified Public Accountants
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const active = item.match === '/' ? isActive('/') : isActive(item.match);
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`relative px-4 py-2 text-[13.5px] font-montserrat font-medium transition-colors group ${
                    active ? 'text-prime-blue' : 'text-gray-500 hover:text-prime-blue'
                  }`}
                >
                  {item.label}
                  <span className={`absolute bottom-0 left-4 right-4 h-[2px] bg-prime-gold rounded-full transition-all duration-200 ${active ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
                </Link>
              );
            })}
          </nav>

          {/* Desktop actions */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+255798509683"
              className="flex items-center gap-2 text-[12px] text-gray-500 hover:text-prime-gold transition-colors font-open-sans"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>+255 798 509 683</span>
              <span className="text-[10px] text-prime-gold/80">(Office Hours)</span>
            </a>
            <div className="w-px h-5 bg-gray-200" />
            <LanguageSwitcher />
            <Link to={`/${locale}/contact`}>
              <button className="ml-1 bg-prime-gold hover:bg-prime-gold-bright text-prime-blue font-montserrat font-bold text-[12px] tracking-wide uppercase px-5 py-2.5 rounded-md transition-all duration-200 shadow-[0_2px_12px_rgba(197,160,33,0.3)] hover:shadow-[0_4px_20px_rgba(197,160,33,0.45)] hover:-translate-y-px">
                {t('nav.schedule')}
              </button>
            </Link>
          </div>

          {/* Mobile controls */}
          <div className="flex lg:hidden items-center gap-2">
            <LanguageSwitcher />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-prime-blue hover:bg-prime-light-grey transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ${mobileMenuOpen ? 'max-h-[480px]' : 'max-h-0'}`}>
        <div className="bg-white border-t border-gray-100 px-4 pb-6 pt-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="flex items-center justify-between px-4 py-3.5 rounded-xl text-[14px] font-montserrat font-medium text-prime-blue hover:bg-prime-light-grey transition-all"
            >
              {item.label}
              <span className="w-1.5 h-1.5 rounded-full bg-prime-gold/50" />
            </Link>
          ))}
          <div className="pt-4 border-t border-gray-100 space-y-3">
            <a
              href="tel:+255752401012"
              className="flex items-center gap-3 px-4 py-3 text-[13px] text-gray-500 hover:text-prime-gold transition-colors"
            >
              <Phone className="w-4 h-4" />
              +255 752 401 012
            </a>
            <Link to={`/${locale}/contact`}>
              <button className="w-full bg-prime-gold text-prime-blue font-montserrat font-bold text-[13px] uppercase tracking-wide py-3.5 rounded-xl">
                {t('nav.schedule')}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
