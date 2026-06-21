import React from "react";
import { useTranslation } from "react-i18next";

/* Prime Auditors — "The Ledger" · Service marquee (design_files/ledger.jsx → LedgerMarquee). */

const LedgerMarquee: React.FC = () => {
  const { t } = useTranslation();

  const items = [
    t("home.svc1.title"),
    t("home.svc2.title"),
    t("home.svc3.title"),
    t("home.svc4.title"),
    t("home.svc5.title"),
    t("home.svc6.title"),
  ];
  const run = [...items, ...items];

  return (
    <div className="overflow-hidden whitespace-nowrap bg-prime-gold py-4">
      <div className="inline-flex animate-ledger-scroll hover:[animation-play-state:paused] motion-reduce:animate-none">
        {run.map((it, i) => (
          <span
            key={i}
            aria-hidden={i >= items.length}
            className="inline-flex items-center gap-[38px] pr-[38px] font-serif text-[20px] font-semibold italic text-prime-blue"
          >
            {it}
            <span className="text-[9px] not-italic opacity-50">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default LedgerMarquee;
