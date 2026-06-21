import React, { useState } from "react";
import { useTranslation } from "react-i18next";

/* Prime Auditors — "The Ledger" · Services accordion
   (design_files/ledger.jsx → LedgerServices). One row open at a time. */

type Service = { n: string; titleKey: string; descKey: string; tags: string[] };

const services: Service[] = [
  { n: "01", titleKey: "home.svc1.title", descKey: "home.svc1.desc", tags: ["Statutory", "Internal", "Forensic"] },
  { n: "02", titleKey: "home.svc2.title", descKey: "home.svc2.desc", tags: ["CIT 30%", "VAT 18%", "Transfer Pricing"] },
  { n: "03", titleKey: "home.svc3.title", descKey: "home.svc3.desc", tags: ["Holdings", "Groups", "Governance"] },
  { n: "04", titleKey: "home.svc4.title", descKey: "home.svc4.desc", tags: ["BRELA", "Licensing", "TIN"] },
  { n: "05", titleKey: "home.svc5.title", descKey: "home.svc5.desc", tags: ["TIC", "Incentives", "Launch"] },
  { n: "06", titleKey: "home.svc6.title", descKey: "home.svc6.desc", tags: ["Bookkeeping", "Reporting", "Payroll"] },
];

const LedgerServices: React.FC = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState("01");

  return (
    <section id="services" className="bg-prime-blue-deepest py-[112px] scroll-mt-[84px]">
      <div className="mx-auto max-w-[1320px] px-6 md:px-10">
        <div className="mb-14 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end sm:gap-10">
          <h2 className="m-0 font-serif text-[32px] font-bold leading-[1.05] tracking-[-0.025em] text-white lg:text-[48px]">
            {t("home.services.titlePre")}{" "}
            <span className="italic text-prime-gold">{t("home.services.titleEmphasis")}</span>{" "}
            {t("home.services.titlePost")}
          </h2>
          <p className="m-0 max-w-[340px] font-open-sans text-[15px] leading-[1.7] text-white/50">
            {t("home.services.helper")}
          </p>
        </div>

        <div className="border-t border-white/10">
          {services.map((s) => {
            const isOpen = open === s.n;
            return (
              <div
                key={s.n}
                role="button"
                tabIndex={0}
                aria-expanded={isOpen}
                onClick={() => setOpen(s.n)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setOpen(s.n);
                  }
                }}
                className={`cursor-pointer border-b border-white/10 outline-none transition-colors focus-visible:bg-white/[0.04] ${
                  isOpen ? "bg-prime-gold/5" : "hover:bg-white/[0.025]"
                }`}
              >
                <div className="grid grid-cols-[48px_1fr_auto] items-center gap-4 px-2 py-[30px] sm:grid-cols-[80px_1fr_auto] sm:gap-7">
                  <span
                    className={`font-montserrat text-[14px] font-semibold tabular-nums transition-colors ${
                      isOpen ? "text-prime-gold" : "text-white/30"
                    }`}
                  >
                    {s.n}
                  </span>
                  <h3
                    className={`m-0 font-serif text-[22px] tracking-[-0.02em] transition-colors sm:text-[30px] ${
                      isOpen ? "font-bold text-white" : "font-semibold text-white/75"
                    }`}
                  >
                    {t(s.titleKey)}
                  </h3>
                  <span
                    className="inline-block font-serif text-[26px] text-prime-gold"
                    style={{
                      transform: isOpen ? "rotate(45deg)" : "none",
                      transition: "transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94)",
                    }}
                  >
                    +
                  </span>
                </div>

                <div
                  className="grid"
                  style={{
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                    transition: "grid-template-rows 0.4s cubic-bezier(0.25,0.46,0.45,0.94)",
                  }}
                >
                  <div className="overflow-hidden">
                    <div className="grid grid-cols-1 gap-4 px-2 pb-[34px] sm:grid-cols-[80px_1fr] sm:gap-7">
                      <span className="hidden sm:block" />
                      <div>
                        <p className="m-0 mb-[18px] max-w-[620px] font-open-sans text-[16px] leading-[1.7] text-white/[0.62]">
                          {t(s.descKey)}
                        </p>
                        <div className="flex flex-wrap gap-2.5">
                          {s.tags.map((tg) => (
                            <span
                              key={tg}
                              className="rounded-full border border-prime-gold/35 px-3.5 py-1.5 font-montserrat text-[11px] font-medium uppercase tracking-[0.08em] text-prime-gold"
                            >
                              {tg}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LedgerServices;
