import React from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

/* Prime Auditors — "The Ledger" · Footer (design_files/closing.jsx → LedgerFooter). */

type FLink = { label: string; anchor?: string; to?: string };

const LedgerFooter: React.FC = () => {
  const { t } = useTranslation();
  const { locale } = useParams();

  const columns: { title: string; links: FLink[] }[] = [
    {
      title: t("home.footer.colPractice"),
      links: [
        { label: t("home.nav.services"), anchor: "#services" },
        { label: t("home.nav.investors"), to: `/${locale}/foreign-investors` },
        { label: t("home.nav.insight"), to: `/${locale}/news` },
      ],
    },
    {
      title: t("home.footer.colFirm"),
      links: [
        { label: t("home.footer.about"), to: `/${locale}/about` },
        { label: t("home.footer.careers"), to: `/${locale}/join` },
        { label: t("home.nav.contact"), anchor: "#contact" },
      ],
    },
  ];

  const linkCls =
    "font-open-sans text-[13.5px] text-white/50 transition-colors hover:text-prime-gold";

  return (
    <footer className="bg-prime-footer pt-14">
      <div className="mx-auto max-w-[1320px] px-6 md:px-10">
        <div className="flex flex-wrap items-start justify-between gap-8 border-b border-white/[0.08] pb-12">
          {/* brand */}
          <div className="flex items-center gap-4">
            <div className="flex h-[38px] w-[38px] items-center justify-center border-[1.5px] border-prime-gold font-serif text-[18px] font-bold text-prime-gold">
              Pa
            </div>
            <div className="leading-none">
              <div className="font-serif text-[16px] font-semibold tracking-[0.14em] text-white">
                PRIME&nbsp;AUDITORS
              </div>
              <div className="mt-[5px] font-montserrat text-[8px] font-medium uppercase tracking-[0.34em] text-white/35">
                {t("home.footer.tagline")}
              </div>
            </div>
          </div>

          {/* link columns */}
          <div className="flex gap-12">
            {columns.map((col) => (
              <div key={col.title}>
                <div className="mb-4 font-montserrat text-[10.5px] font-semibold uppercase tracking-[0.16em] text-prime-gold">
                  {col.title}
                </div>
                <div className="flex flex-col gap-2.5">
                  {col.links.map((l) =>
                    l.to ? (
                      <Link key={l.label} to={l.to} className={linkCls}>
                        {l.label}
                      </Link>
                    ) : (
                      <a key={l.label} href={l.anchor} className={linkCls}>
                        {l.label}
                      </a>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2.5 py-[22px]">
          <span className="font-open-sans text-[12px] text-white/30">
            {t("home.footer.copyright")}
          </span>
          <span className="font-montserrat text-[10.5px] uppercase tracking-[0.14em] text-white/30">
            {t("home.footer.vol")}
          </span>
        </div>
      </div>
    </footer>
  );
};

export default LedgerFooter;
