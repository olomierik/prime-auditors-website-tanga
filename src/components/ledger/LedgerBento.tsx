import React from "react";
import { useTranslation } from "react-i18next";
import { ShieldCheck, Globe2, TrendingUp, Building2, FileBarChart2, Sparkles, ArrowUpRight } from "lucide-react";

/* Prime Auditors — Bento grid: a visually-rich corporate capabilities panel.
   Pure presentation; pulls existing i18n keys with safe fallbacks. */

const tile =
  "group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] p-7 " +
  "transition-all duration-500 hover:border-prime-gold/40 hover:bg-white/[0.045] " +
  "hover:-translate-y-1 hover:shadow-[0_24px_60px_-20px_rgba(99,102,241,0.45)]";

const sheen =
  "pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r " +
  "from-transparent via-prime-gold/10 to-transparent transition-transform duration-1000 " +
  "group-hover:translate-x-full";

const LedgerBento: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden bg-prime-blue-deepest py-[112px]">
      {/* ambient indigo glow */}
      <div className="pointer-events-none absolute -left-40 top-1/3 h-[520px] w-[520px] rounded-full bg-prime-gold/[0.08] blur-[140px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[440px] w-[440px] rounded-full bg-indigo-500/[0.07] blur-[140px]" />
      <div className="ledger-dots absolute inset-0 opacity-40" />

      <div className="relative mx-auto max-w-[1320px] px-6 md:px-10">
        {/* header */}
        <div className="mb-14 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <div className="mb-5 flex items-center gap-3.5">
              <span className="h-px w-11 bg-prime-gold" />
              <span className="font-montserrat text-[12px] font-semibold uppercase tracking-[0.26em] text-prime-gold">
                {t("home.bento.eyebrow", "Capabilities")}
              </span>
            </div>
            <h2 className="m-0 max-w-[620px] font-serif text-[32px] font-bold leading-[1.05] tracking-[-0.025em] text-white lg:text-[48px]">
              {t("home.bento.titlePre", "An integrated practice for")}{" "}
              <span className="italic text-prime-gold">{t("home.bento.titleEmphasis", "modern enterprises")}</span>.
            </h2>
          </div>
          <p className="max-w-[340px] font-open-sans text-[15px] leading-[1.7] text-white/50">
            {t("home.bento.helper", "Audit, tax, advisory and corporate structuring — assembled into one disciplined practice.")}
          </p>
        </div>

        {/* bento grid */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-6 md:grid-rows-[200px_200px_200px]">
          {/* Feature tile — wide */}
          <div className={`${tile} md:col-span-4 md:row-span-2`}>
            <div className={sheen} />
            <div className="flex h-full flex-col justify-between">
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-prime-gold/30 bg-prime-gold/10">
                  <ShieldCheck className="h-5 w-5 text-prime-gold" />
                </div>
                <ArrowUpRight className="h-5 w-5 text-white/30 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-prime-gold" />
              </div>
              <div>
                <h3 className="mb-3 font-serif text-[26px] font-bold leading-tight text-white lg:text-[32px]">
                  {t("home.bento.tile1.title", "Statutory audit, executed with rigour.")}
                </h3>
                <p className="max-w-[480px] font-open-sans text-[14.5px] leading-[1.65] text-white/55">
                  {t("home.bento.tile1.desc", "NBAA-certified procedures, risk-led sampling, and partner-reviewed opinions — issued on a calendar the board can rely on.")}
                </p>
              </div>
            </div>
          </div>

          {/* Tall stat tile */}
          <div className={`${tile} md:col-span-2 md:row-span-2 bg-gradient-to-br from-prime-gold/[0.08] to-transparent`}>
            <div className={sheen} />
            <div className="flex h-full flex-col justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-prime-gold/30 bg-prime-gold/10">
                <TrendingUp className="h-5 w-5 text-prime-gold" />
              </div>
              <div>
                <div className="font-serif text-[72px] font-bold leading-none tabular-nums text-prime-gold lg:text-[88px]">
                  100
                  <span className="text-prime-gold/60">+</span>
                </div>
                <div className="mt-3 font-montserrat text-[10.5px] font-semibold uppercase tracking-[0.22em] text-white/55">
                  {t("home.bento.tile2", "Engagements across EAC & SADC")}
                </div>
              </div>
            </div>
          </div>

          {/* Small tiles row */}
          <div className={`${tile} md:col-span-2`}>
            <div className={sheen} />
            <div className="flex h-full items-center gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-prime-gold/30 bg-prime-gold/10">
                <Globe2 className="h-5 w-5 text-prime-gold" />
              </div>
              <div>
                <div className="font-serif text-[18px] font-bold text-white">{t("home.bento.tile3.title", "Foreign investor desk")}</div>
                <div className="mt-1 font-open-sans text-[12.5px] text-white/50">{t("home.bento.tile3.desc", "TIC, BRELA, work permits")}</div>
              </div>
            </div>
          </div>

          <div className={`${tile} md:col-span-2`}>
            <div className={sheen} />
            <div className="flex h-full items-center gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-prime-gold/30 bg-prime-gold/10">
                <Building2 className="h-5 w-5 text-prime-gold" />
              </div>
              <div>
                <div className="font-serif text-[18px] font-bold text-white">{t("home.bento.tile4.title", "Holding structures")}</div>
                <div className="mt-1 font-open-sans text-[12.5px] text-white/50">{t("home.bento.tile4.desc", "Groups, governance, treasury")}</div>
              </div>
            </div>
          </div>

          <div className={`${tile} md:col-span-2`}>
            <div className={sheen} />
            <div className="flex h-full items-center gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-prime-gold/30 bg-prime-gold/10">
                <FileBarChart2 className="h-5 w-5 text-prime-gold" />
              </div>
              <div>
                <div className="font-serif text-[18px] font-bold text-white">{t("home.bento.tile5.title", "Tax & transfer pricing")}</div>
                <div className="mt-1 font-open-sans text-[12.5px] text-white/50">{t("home.bento.tile5.desc", "CIT 30%, VAT 18%, OECD")}</div>
              </div>
            </div>
          </div>
        </div>

        {/* footer cta */}
        <div className="mt-12 flex items-center justify-between border-t border-white/10 pt-7">
          <div className="flex items-center gap-2.5 font-montserrat text-[11px] uppercase tracking-[0.2em] text-white/40">
            <Sparkles className="h-3.5 w-3.5 text-prime-gold" />
            {t("home.bento.footnote", "Partner-led · Discreet · Documented")}
          </div>
          <a
            href="#services"
            className="group flex items-center gap-2 font-montserrat text-[12px] font-semibold uppercase tracking-[0.14em] text-white hover:text-prime-gold transition-colors"
          >
            {t("home.bento.cta", "Browse the practice")}
            <span className="text-prime-gold transition-transform group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default LedgerBento;