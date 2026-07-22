import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { BadgeCheck } from "lucide-react";

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

const TrustedBy = () => {
  const { t } = useTranslation();

  // Duplicate the list so the scroll is seamless
  const marquee = [...clients, ...clients];

  return (
    <section className="relative bg-prime-blue-deepest overflow-hidden border-y border-white/8">
      {/* Subtle gold dot texture */}
      <div className="absolute inset-0 ledger-dots opacity-30 pointer-events-none" />

      {/* Top gold accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-prime-gold/60 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Left label */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex-shrink-0"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-prime-gold/15 flex items-center justify-center">
                <BadgeCheck className="w-5 h-5 text-prime-gold" />
              </div>
              <div>
                <div className="text-xs font-montserrat font-semibold text-prime-gold uppercase tracking-[0.2em]">
                  {t("trustedBy.eyebrow")}
                </div>
                <div className="text-lg font-serif font-bold text-white leading-tight">
                  {t("trustedBy.title")}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right crawl */}
          <div className="relative flex-1 w-full overflow-hidden mask-crawl">
            {/* Edge fades */}
            <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-prime-blue-deepest to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-prime-blue-deepest to-transparent z-10 pointer-events-none" />

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex animate-crawl hover:[animation-play-state:paused]"
            >
              {marquee.map((client, index) => (
                <div
                  key={`${client}-${index}`}
                  className="flex-shrink-0 flex items-center gap-5 px-5 sm:px-7"
                >
                  <span className="text-[13px] sm:text-sm font-montserrat font-semibold text-white/80 uppercase tracking-wider whitespace-nowrap">
                    {client}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-prime-gold/60 flex-shrink-0" />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom gold accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-prime-gold/40 to-transparent" />
    </section>
  );
};

export default TrustedBy;
