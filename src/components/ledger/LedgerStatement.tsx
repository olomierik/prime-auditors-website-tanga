import React from "react";
import { useTranslation } from "react-i18next";

/* Prime Auditors — "The Ledger" · Statement band
   (design_files/closing.jsx → LedgerStatement). */

const LedgerStatement: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden bg-prime-blue py-[120px]">
      <div className="ledger-dots-soft absolute inset-0 opacity-[0.06]" />
      <div className="relative mx-auto max-w-[1040px] px-6 text-center md:px-10">
        <span className="block h-10 font-serif text-[80px] leading-[0.5] text-prime-gold">“</span>
        <blockquote className="mb-9 font-serif text-[28px] font-semibold leading-[1.3] tracking-[-0.02em] text-white lg:text-[40px]">
          {t("home.statement.quotePre")}{" "}
          <span className="italic text-prime-gold">{t("home.statement.quoteEmphasis")}</span>{" "}
          {t("home.statement.quotePost")}
        </blockquote>
        <div className="inline-flex items-center gap-3.5">
          <span className="h-px w-9 bg-prime-gold/60" />
          <span className="font-montserrat text-[12px] font-semibold uppercase tracking-[0.18em] text-white/60">
            {t("home.statement.caption")}
          </span>
          <span className="h-px w-9 bg-prime-gold/60" />
        </div>
      </div>
    </section>
  );
};

export default LedgerStatement;
