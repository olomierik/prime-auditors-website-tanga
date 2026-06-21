import React, { useState } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Menu, X } from "lucide-react";

/* Prime Auditors — "The Ledger" · Sticky editorial nav.
   Recreates design_files/nav-hero.jsx → LedgerNav, mapped to the app's
   real routes and EN/ZH i18n (the prototype's EN/SW toggle). */

type NavLink = { key: string; label: string; anchor?: string; to?: string };

const Monogram = () => (
  <div className="flex items-center gap-4">
    <div className="flex h-[38px] w-[38px] items-center justify-center border-[1.5px] border-prime-gold font-serif text-[18px] font-bold text-prime-gold">
      Pa
    </div>
    <div className="leading-none">
      <div className="font-serif text-[16px] font-semibold tracking-[0.14em] text-white">
        PRIME&nbsp;AUDITORS
      </div>
      <div className="mt-[5px] font-montserrat text-[8px] font-medium tracking-[0.34em] text-white/40">
        EST. TANGA · TANZANIA
      </div>
    </div>
  </div>
);

const LedgerNav: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { locale } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [active, setActive] = useState("practice");
  const [menuOpen, setMenuOpen] = useState(false);

  const links: NavLink[] = [
    { key: "practice", label: t("home.nav.practice"), anchor: "#practice" },
    { key: "services", label: t("home.nav.services"), anchor: "#services" },
    { key: "investors", label: t("home.nav.investors"), to: `/${locale}/foreign-investors` },
    { key: "insight", label: t("home.nav.insight"), to: `/${locale}/news` },
    { key: "contact", label: t("home.nav.contact"), anchor: "#contact" },
  ];

  const switchLang = (lng: "en" | "zh") => {
    i18n.changeLanguage(lng);
    navigate(location.pathname.replace(`/${locale}`, `/${lng}`));
  };

  const numeral = (i: number) => String(i + 1).padStart(2, "0");

  const renderLink = (l: NavLink, i: number) => {
    const isActive = active === l.key;
    const inner = (
      <>
        <span
          className={`text-[8.5px] tabular-nums ${isActive ? "text-prime-gold" : "text-white/30"}`}
        >
          {numeral(i)}
        </span>
        {l.label}
      </>
    );
    const cls = `flex items-baseline gap-1.5 px-4 py-2.5 font-montserrat text-[12.5px] font-medium tracking-[0.04em] transition-colors ${
      isActive ? "text-prime-gold" : "text-white/60 hover:text-white"
    }`;
    return l.to ? (
      <Link key={l.key} to={l.to} className={cls} onClick={() => setActive(l.key)}>
        {inner}
      </Link>
    ) : (
      <a key={l.key} href={l.anchor} className={cls} onClick={() => { setActive(l.key); setMenuOpen(false); }}>
        {inner}
      </a>
    );
  };

  const LangToggle = () => (
    <div className="flex gap-3">
      {([["en", "EN"], ["zh", "中文"]] as const).map(([code, label]) => (
        <button
          key={code}
          onClick={() => switchLang(code)}
          className={`border-b pb-0.5 font-montserrat text-[11px] font-semibold tracking-[0.08em] transition-colors ${
            locale === code
              ? "border-prime-gold text-prime-gold"
              : "border-transparent text-white/35 hover:text-white/70"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );

  return (
    <header className="sticky top-0 z-[60] border-b border-prime-gold/15 bg-prime-blue-deepest/80 backdrop-blur-[14px]">
      <div className="mx-auto flex h-[84px] max-w-[1320px] items-center justify-between px-6 md:px-10">
        <Link to={`/${locale}/`} aria-label="Prime Auditors — home">
          <Monogram />
        </Link>

        {/* Desktop links */}
        <nav className="hidden items-center gap-0.5 lg:flex">
          {links.map(renderLink)}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-[18px] lg:flex">
          <LangToggle />
          <a
            href="#contact"
            className="bg-prime-gold px-[22px] py-3 font-montserrat text-[11.5px] font-semibold uppercase tracking-[0.14em] text-prime-blue transition-colors hover:bg-prime-gold-bright"
          >
            {t("home.nav.engage")}
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="p-2 text-white lg:hidden"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile panel */}
      <div
        className={`overflow-hidden border-prime-gold/10 transition-all duration-300 lg:hidden ${
          menuOpen ? "max-h-[420px] border-t" : "max-h-0"
        }`}
      >
        <div className="space-y-1 px-6 py-4">
          {links.map((l, i) => (
            <div key={l.key}>{renderLink(l, i)}</div>
          ))}
          <div className="flex items-center justify-between border-t border-white/10 pt-4">
            <LangToggle />
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="bg-prime-gold px-[22px] py-3 font-montserrat text-[11.5px] font-semibold uppercase tracking-[0.14em] text-prime-blue"
            >
              {t("home.nav.engage")}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default LedgerNav;
