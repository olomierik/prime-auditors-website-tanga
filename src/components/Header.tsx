import React, { useState, useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';

const Header: React.FC = () => {
  const { t } = useTranslation();
  const { locale } = useParams();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileMenuOpen(false); }, [location.pathname]);

  const isActive = (path: string) =>
    location.pathname === `/${locale}${path}` || location.pathname === `/${locale}${path}/`;

  const serviceLinks = [
    { href: `/${locale}/services#audit`,        label: t('service.audit') },
    { href: `/${locale}/services#tax`,          label: t('service.tax') },
    { href: `/${locale}/services#registration`, label: t('service.registration') },
    { href: `/${locale}/services#accounting`,   label: t('service.accounting') },
    { href: `/${locale}/services#holding`,      label: t('service.holding') },
    { href: `/${locale}/services#corporate`,    label: t('service.corporate') },
    { href: `/${locale}/foreign-investors`,     label: "Foreign Investor Services" },
  ];

  const navItems = [
    { href: `/${locale}/`, label: t('nav.home'), exact: true },
    { href: `/${locale}/about`, label: t('nav.about') },
    { href: `/${locale}/news`, label: t('nav.news') },
    { href: `/${locale}/join`, label: t('nav.join') },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-prime-blue shadow-[0_4px_24px_rgba(0,0,0,0.35)] border-b border-white/10'
          : 'bg-prime-blue border-b border-white/5'
      }`}
    >
      {/* ── Top accent line ─────────────────────────────────────────── */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-prime-gold to-transparent opacity-50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-[70px] lg:h-[76px] items-center">

          {/* Logo */}
          <Link to={`/${locale}/`} className="flex items-center gap-3 group flex-shrink-0">
            <div className="relative h-9 w-28 transition-transform duration-200 group-hover:scale-105">
              <img
                src="/prime-auditors-logo.jpg"
                alt="Prime Auditors"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-montserrat font-bold text-white text-[17px] tracking-tight">
                Prime Auditors
              </span>
              <span className="text-[9px] text-prime-gold/80 font-open-sans tracking-[0.18em] uppercase mt-0.5 hidden sm:block">
                Certified Public Accountants
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">

            {/* Home */}
            <Link
              to={`/${locale}/`}
              className={`relative px-3.5 py-2 text-[13px] font-montserrat font-medium transition-colors rounded-sm group ${
                isActive('/') ? 'text-prime-gold' : 'text-white/75 hover:text-white'
              }`}
            >
              {t('nav.home')}
              <span className={`absolute bottom-0 left-3.5 right-3.5 h-[2px] bg-prime-gold rounded-full transition-all duration-200 ${isActive('/') ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'}`} />
            </Link>

            {/* Services dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                className={`relative px-3.5 py-2 text-[13px] font-montserrat font-medium transition-colors rounded-sm flex items-center gap-1 group ${
                  isActive('/services') ? 'text-prime-gold' : 'text-white/75 hover:text-white'
                }`}
              >
                {t('nav.services')}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} />
                <span className={`absolute bottom-0 left-3.5 right-3.5 h-[2px] bg-prime-gold rounded-full transition-all duration-200 ${isActive('/services') ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'}`} />
              </button>

              {/* Dropdown */}
              <div className={`absolute top-full left-0 pt-2 transition-all duration-200 ${servicesOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
                <div className="bg-white rounded-xl shadow-[0_16px_48px_rgba(0,0,0,0.18)] border border-gray-100 py-2 w-56 overflow-hidden">
                  {/* Gold top accent */}
                  <div className="h-0.5 bg-gradient-to-r from-prime-gold to-prime-gold/30 mx-4 mb-2 rounded-full" />
                  {serviceLinks.map((s) => (
                    <Link
                      key={s.label}
                      to={s.href}
                      className="flex items-center gap-2 px-4 py-2.5 text-[13px] font-open-sans text-gray-700 hover:text-prime-blue hover:bg-prime-light-grey transition-colors group"
                    >
                      <span className="w-1 h-1 rounded-full bg-prime-gold/50 group-hover:bg-prime-gold transition-colors" />
                      {s.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Foreign Investors highlight */}
            <Link
              to={`/${locale}/foreign-investors`}
              className={`relative px-3.5 py-2 text-[13px] font-montserrat font-medium transition-colors rounded-sm group ${
                isActive('/foreign-investors') ? 'text-prime-gold' : 'text-white/75 hover:text-white'
              }`}
            >
              {t('nav.investors')}
              <span className={`absolute bottom-0 left-3.5 right-3.5 h-[2px] bg-prime-gold rounded-full transition-all duration-200 ${isActive('/foreign-investors') ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'}`} />
            </Link>

            {navItems.slice(1).map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`relative px-3.5 py-2 text-[13px] font-montserrat font-medium transition-colors rounded-sm group ${
                  isActive(item.href.replace(`/${locale}`, '')) ? 'text-prime-gold' : 'text-white/75 hover:text-white'
                }`}
              >
                {item.label}
                <span className={`absolute bottom-0 left-3.5 right-3.5 h-[2px] bg-prime-gold rounded-full transition-all duration-200 ${isActive(item.href.replace(`/${locale}`, '')) ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'}`} />
              </Link>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+255752401012"
              className="flex items-center gap-2 text-[12px] text-white/60 hover:text-prime-gold transition-colors font-open-sans"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>+255 752 401 012</span>
            </a>
            <div className="w-px h-5 bg-white/15" />
            <LanguageSwitcher />
            <Link to={`/${locale}/#contact`}>
              <button className="ml-1 bg-prime-gold hover:bg-[#d4af26] text-prime-blue font-montserrat font-bold text-[12px] tracking-wide uppercase px-5 py-2.5 rounded-sm transition-all duration-200 shadow-[0_2px_12px_rgba(197,160,33,0.3)] hover:shadow-[0_4px_20px_rgba(197,160,33,0.45)] hover:-translate-y-px">
                {t('nav.schedule')}
              </button>
            </Link>
          </div>

          {/* Mobile controls */}
          <div className="flex lg:hidden items-center gap-2">
            <LanguageSwitcher />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ${mobileMenuOpen ? 'max-h-[600px]' : 'max-h-0'}`}>
        <div className="bg-prime-blue/98 border-t border-white/8 px-4 pb-6 pt-3 space-y-1">
          {[
            { href: `/${locale}/`, label: t('nav.home') },
            { href: `/${locale}/services`, label: t('nav.services') },
            { href: `/${locale}/about`, label: t('nav.about') },
            { href: `/${locale}/foreign-investors`, label: t('nav.investors') },
            { href: `/${locale}/news`, label: t('nav.news') },
            { href: `/${locale}/join`, label: t('nav.join') },
          ].map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="flex items-center justify-between px-4 py-3.5 rounded-xl text-[14px] font-montserrat font-medium text-white/80 hover:text-white hover:bg-white/[0.08] transition-all"
            >
              {item.label}
              <span className="w-1.5 h-1.5 rounded-full bg-prime-gold/40" />
            </Link>
          ))}
          <div className="pt-4 border-t border-white/10 space-y-3">
            <a
              href="tel:+255752401012"
              className="flex items-center gap-3 px-4 py-3 text-[13px] text-white/60 hover:text-prime-gold transition-colors"
            >
              <Phone className="w-4 h-4" />
              +255 752 401 012
            </a>
            <Link to={`/${locale}/#contact`}>
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
