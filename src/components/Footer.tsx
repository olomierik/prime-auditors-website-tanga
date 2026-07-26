import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Phone, Mail, MapPin, Clock, ArrowUpRight } from "lucide-react";
import VisitorCounter from "@/components/VisitorCounter";

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const { locale } = useParams();
  const year = new Date().getFullYear();

  const quickLinks = [
    { to: `/${locale}/`,         label: t('nav.home') },
    { to: `/${locale}/services`, label: t('nav.services') },
    { to: `/${locale}/about`,    label: t('nav.about') },
    { to: `/${locale}/news`,     label: t('nav.news') },
    { to: `/${locale}/contact`,  label: t('nav.contact') },
  ];

  const serviceLinks = [
    t('service.audit'),
    t('service.tax'),
    t('service.registration'),
    t('service.holding'),
    t('service.corporate'),
    t('service.accounting'),
  ];

  return (
    <footer className="bg-[#07161f] text-white relative overflow-hidden">
      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-prime-gold to-transparent opacity-60" />

      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-prime-gold/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-prime-blue/30 rounded-full blur-[120px] pointer-events-none" />

      {/* Main grid */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">

          {/* Brand col */}
          <div className="lg:col-span-4 space-y-6">
            <Link to={`/${locale}/`} className="inline-flex items-center gap-3 group">
              <div className="h-10 w-28 transition-transform group-hover:scale-105">
                <img src="/prime-auditors-logo.jpg" alt="Prime Auditors" className="w-full h-full object-contain" />
              </div>
              <div>
                <div className="font-montserrat font-bold text-white text-lg leading-none">Prime Auditors</div>
                <div className="text-[9px] text-prime-gold/70 font-open-sans tracking-[0.18em] uppercase mt-1">
                  Certified Public Accountants
                </div>
              </div>
            </Link>

            <p className="text-sm text-white/45 font-open-sans leading-relaxed max-w-xs">
              {t('footer.description')}
            </p>

            {/* Tagline */}
            <div className="flex items-center gap-2">
              <div className="w-6 h-px bg-prime-gold/50" />
              <span className="text-[11px] text-prime-gold/60 font-montserrat italic">
                "Building Trust Through Integrity & Excellence"
              </span>
            </div>

            {/* Contact badge */}
            <div className="inline-flex items-center gap-2 bg-prime-gold/10 border border-prime-gold/20 rounded-lg px-3 py-2">
              <span className="text-[10px] text-prime-gold font-montserrat font-semibold uppercase tracking-wider">NBAA Reg. No. PF510</span>
            </div>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-2 space-y-5">
            <h4 className="font-montserrat font-bold text-white text-[13px] uppercase tracking-[0.15em] flex items-center gap-2">
              <span className="w-4 h-0.5 bg-prime-gold rounded-full" />
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-sm text-white/45 hover:text-prime-gold transition-colors font-open-sans flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-prime-gold transition-all duration-200 rounded-full" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-3 space-y-5">
            <h4 className="font-montserrat font-bold text-white text-[13px] uppercase tracking-[0.15em] flex items-center gap-2">
              <span className="w-4 h-0.5 bg-prime-gold rounded-full" />
              {t('footer.services')}
            </h4>
            <ul className="space-y-2.5">
              {serviceLinks.map((label) => (
                <li key={label}>
                  <Link
                    to={`/${locale}/services`}
                    className="text-sm text-white/45 hover:text-prime-gold transition-colors font-open-sans flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-prime-gold transition-all duration-200 rounded-full" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3 space-y-5">
            <h4 className="font-montserrat font-bold text-white text-[13px] uppercase tracking-[0.15em] flex items-center gap-2">
              <span className="w-4 h-0.5 bg-prime-gold rounded-full" />
              {t('footer.contactUs')}
            </h4>
            <div className="space-y-4">
              {[
                { href: "tel:+255798509683", Icon: Phone, text: "+255 798 509 683 (Office Hours)" },
                { href: "tel:+255752401012", Icon: Phone, text: "+255 752 401 012 (24/7)" },
                { href: "mailto:erick.olomi@primeauditors.co.tz", Icon: Mail, text: "erick.olomi@primeauditors.co.tz" },
              ].map(({ href, Icon, text }) => (
                <a key={text} href={href} className="flex items-center gap-3 group">
                  <div className="w-8 h-8 rounded-lg bg-prime-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-prime-gold/20 transition-colors">
                    <Icon className="w-3.5 h-3.5 text-prime-gold" />
                  </div>
                  <span className="text-sm text-white/45 group-hover:text-prime-gold transition-colors font-open-sans break-all">{text}</span>
                </a>
              ))}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-prime-gold/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-prime-gold" />
                </div>
                <p className="text-sm text-white/40 font-open-sans leading-relaxed">
                  P.O. Box 5667, Market Street<br />
                  Central Ward, Tanga, Tanzania
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-prime-gold/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Clock className="w-3.5 h-3.5 text-prime-gold" />
                </div>
                <div className="text-sm text-white/40 font-open-sans space-y-0.5">
                  <div>Mon–Fri: 8:00 AM – 5:00 PM</div>
                  <div>Sat: 8:30 AM – 1:30 PM</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-white/6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/25 font-open-sans">
              © {year} Prime Auditors. {t('footer.copyright')}
            </p>
            <div className="flex items-center gap-4">
              <img src="/nbaa-certificate.jpg" alt="NBAA Certified Public Accountants — Registration No. PF510" className="h-7 object-contain opacity-40 hover:opacity-70 transition-opacity" />
              <VisitorCounter />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
