import React from "react";
import { useTranslation } from "react-i18next";

/* Prime Auditors — "The Ledger" · Practice (the one light section)
   (design_files/ledger.jsx → LedgerPractice). */

const LedgerPractice: React.FC = () => {
  const { t } = useTranslation();

  const stats: [string, string][] = [
    [t("home.practice.stat1a"), t("home.practice.stat1b")],
    [t("home.practice.stat2a"), t("home.practice.stat2b")],
    [t("home.practice.stat3a"), t("home.practice.stat3b")],
    [t("home.practice.stat4a"), t("home.practice.stat4b")],
  ];

  return (
    <section id="practice" className="bg-prime-off-white py-[112px] scroll-mt-[84px]">
      <div className="mx-auto grid max-w-[1320px] grid-cols-1 items-center gap-14 px-6 md:px-10 lg:grid-cols-2 lg:gap-[72px]">
        {/* image */}
        <div className="relative">
          <div className="overflow-hidden">
            <img
              src="/team-conference-2.jpg"
              alt="Prime Auditors partners in conference, Tanga"
              className="block h-[520px] w-full object-cover"
              style={{ filter: "grayscale(0.15) contrast(1.02)" }}
              loading="lazy"
            />
          </div>
          <div className="absolute left-6 top-6 bg-prime-blue-deepest/60 px-3.5 py-2 font-montserrat text-[11px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-[6px]">
            {t("home.practice.label")}
          </div>
          <div className="absolute -bottom-px -right-px max-w-[220px] bg-prime-gold px-7 py-[22px] text-prime-blue">
            <div className="font-serif text-[40px] font-bold leading-none">2014</div>
            <div className="mt-1.5 font-montserrat text-[10.5px] font-semibold uppercase tracking-[0.12em] opacity-80">
              {t("home.practice.founded")}
            </div>
          </div>
        </div>

        {/* copy */}
        <div>
          <div className="mb-[26px] flex items-center gap-3.5">
            <span className="h-px w-11 bg-prime-gold" />
            <span className="font-montserrat text-[12px] font-semibold uppercase tracking-[0.26em] text-prime-gold">
              {t("home.practice.eyebrow")}
            </span>
          </div>
          <h2 className="mb-6 font-serif text-[32px] font-bold leading-[1.08] tracking-[-0.025em] text-prime-blue lg:text-[44px]">
            {t("home.practice.titlePre")}{" "}
            <span className="italic text-prime-gold">{t("home.practice.titleEmphasis")}</span>{" "}
            {t("home.practice.titlePost")}
          </h2>
          <p className="mb-[34px] max-w-[480px] font-open-sans text-[16.5px] leading-[1.75] text-gray-500">
            {t("home.practice.body")}
          </p>

          <div className="grid grid-cols-2 border-t border-prime-border">
            {stats.map(([figure, sub], i) => (
              <div
                key={figure}
                className={`border-b border-prime-border py-[22px] ${
                  i % 2 === 0 ? "border-r border-prime-border pr-6" : "pl-6"
                }`}
              >
                <div className="font-serif text-[22px] font-bold text-prime-blue">{figure}</div>
                <div className="mt-1.5 font-montserrat text-[11px] uppercase tracking-[0.1em] text-gray-500">
                  {sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LedgerPractice;
