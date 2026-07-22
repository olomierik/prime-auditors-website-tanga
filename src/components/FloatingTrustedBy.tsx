import { useState } from "react";
import { useTranslation } from "react-i18next";
import { BadgeCheck, X } from "lucide-react";

const clients = [
  "SIHA POLYCLINIC",
  "AMBONI XINXIN MINING LIMITED",
  "DONGFANGHONG MATERIALS OF CONSTRUCTION COMPANY LIMITED",
  "PANGANI CLIFFS LODGES",
  "FORLAB BIOSCIENCES LIMITED",
  "VENTREK ENTREPRISES LIMITED",
  "ARRAYA HOLDINGS LIMITED",
  "NYINDA HARDWARE",
  "JOHARI DREHER LIMITED",
  "JEYANG HOLDINGS LIMITED",
];

const FloatingTrustedBy = () => {
  const { t } = useTranslation();
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  const marquee = [...clients, ...clients];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 pointer-events-none">
      <div className="pointer-events-auto bg-prime-blue-deepest/95 backdrop-blur-md border-t border-prime-gold/30 shadow-[0_-4px_20px_rgba(0,0,0,0.25)]">
        <div className="relative max-w-7xl mx-auto px-3 sm:px-6 py-2 sm:py-2.5 flex items-center gap-3 sm:gap-5">
          {/* Label */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-prime-gold/15 flex items-center justify-center">
              <BadgeCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-prime-gold" />
            </div>
            <span className="hidden sm:inline text-[11px] font-montserrat font-bold text-prime-gold uppercase tracking-[0.18em]">
              {t("trustedBy.eyebrow", "Trusted By")}
            </span>
          </div>

          {/* Crawl */}
          <div className="relative flex-1 overflow-hidden mask-crawl">
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-prime-blue-deepest to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-prime-blue-deepest to-transparent z-10 pointer-events-none" />
            <div className="flex animate-crawl hover:[animation-play-state:paused]">
              {marquee.map((client, index) => (
                <div key={`${client}-${index}`} className="flex-shrink-0 flex items-center gap-3 sm:gap-4 px-3 sm:px-5">
                  <span className="text-[11px] sm:text-xs font-montserrat font-semibold text-white/85 uppercase tracking-wider whitespace-nowrap">
                    {client}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-prime-gold/60 flex-shrink-0" />
                </div>
              ))}
            </div>
          </div>

          {/* Close */}
          <button
            onClick={() => setDismissed(true)}
            aria-label="Dismiss trusted by bar"
            className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FloatingTrustedBy;