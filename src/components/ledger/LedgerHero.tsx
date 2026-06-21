import React from "react";
import { useTranslation } from "react-i18next";

/* Prime Auditors — "The Ledger" · Hero (design_files/nav-hero.jsx → LedgerHero). */

const LedgerHero: React.FC = () => {
  const { t } = useTranslation();

  const stats: [string, string][] = [
    [t("home.hero.statYears"), "10+"],
    [t("home.hero.statEngagements"), "100+"],
    [t("home.hero.statLines"), "06"],
    [t("home.hero.statReach"), "EAC · SADC"],
  ];

  return (
    <section className="relative overflow-hidden bg-prime-blue-deepest">
      {/* faint giant ghost numeral */}
      <div className="pointer-events-none absolute right-[-40px] top-10 hidden select-none font-serif text-[460px] font-bold leading-[0.8] text-prime-gold/[0.045] lg:block">
        Pa
      </div>
      {/* gold dot grid */}
      <div className="ledger-dots absolute inset-0 opacity-50" />

      <div className="relative mx-auto max-w-[1320px] px-6 md:px-10">
        {/* masthead meta-rule */}
        <div className="flex items-center justify-between gap-3 border-b border-white/[0.08] py-[26px] font-montserrat text-[10px] uppercase tracking-[0.16em] text-white/40 sm:text-[11px]">
          <span>{t("home.hero.metaCpa")}</span>
          <span className="text-prime-gold">{t("home.hero.metaReg")}</span>
          <span className="hidden sm:inline">{t("home.hero.metaVol")}</span>
        </div>

        <div className="grid grid-cols-1 items-end gap-14 pb-[92px] pt-[64px] lg:grid-cols-[1fr_360px] lg:gap-[56px] lg:pt-[84px]">
          {/* left */}
          <div>
            <div className="mb-[34px] flex items-center gap-3.5">
              <span className="h-px w-11 bg-prime-gold" />
              <span className="font-montserrat text-[12px] font-semibold uppercase tracking-[0.26em] text-prime-gold">
                {t("home.hero.eyebrow")}
              </span>
            </div>
            <h1 className="m-0 font-serif text-[44px] font-bold leading-[0.98] tracking-[-0.03em] text-white sm:text-[64px] lg:text-[92px]">
              {t("home.hero.titlePre")}
              <span className="italic text-prime-gold">{t("home.hero.titleEmphasis")}</span>
              {t("home.hero.titlePost")}
            </h1>
            <p className="mt-9 max-w-[460px] font-open-sans text-[17px] leading-[1.7] text-white/60">
              {t("home.hero.lead")}
            </p>
          </div>

          {/* right — ledger column */}
          <div className="border-l border-prime-gold/30 pl-7">
            {stats.map(([label, figure], i) => (
              <div
                key={label}
                className={`flex items-baseline justify-between py-4 ${
                  i < 3 ? "border-b border-white/[0.08]" : ""
                }`}
              >
                <span className="font-montserrat text-[11px] uppercase tracking-[0.12em] text-white/45">
                  {label}
                </span>
                <span className="font-serif text-[26px] font-bold tabular-nums text-prime-gold">
                  {figure}
                </span>
              </div>
            ))}
            <a
              href="#contact"
              className="mt-6 flex items-center justify-between border-b border-white/20 pb-3.5 font-montserrat text-[12px] font-semibold uppercase tracking-[0.1em] text-white transition-colors hover:text-prime-gold"
            >
              {t("home.hero.book")} <span className="text-prime-gold">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LedgerHero;
