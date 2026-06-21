import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useRef, MouseEvent } from "react";

const services = [
  { id: "audit",       icon: "📊", titleKey: "service.audit",       descKey: "service.auditDesc",       number: "01" },
  { id: "tax",         icon: "💼", titleKey: "service.tax",         descKey: "service.taxDesc",         number: "02" },
  { id: "registration",icon: "📋", titleKey: "service.registration",descKey: "service.registrationDesc",number: "03" },
  { id: "holding",     icon: "🎯", titleKey: "service.holding",     descKey: "service.holdingDesc",     number: "04" },
  { id: "corporate",   icon: "🌍", titleKey: "service.corporate",   descKey: "service.corporateDesc",   number: "05" },
  { id: "accounting",  icon: "✅", titleKey: "service.accounting",  descKey: "service.accountingDesc",  number: "06" },
];

interface ServicesGridProps {
  hideHeader?: boolean;
}

const ServicesGrid = ({ hideHeader = false }: ServicesGridProps) => {
  const { t } = useTranslation();
  const { locale } = useParams();

  return (
    <section className="section-spacing bg-prime-blue-deepest relative overflow-hidden">
      <div className="ledger-dots absolute inset-0 opacity-40 pointer-events-none" />

      <div className="relative max-w-[1320px] mx-auto container-padding">

        {/* Header — hidden when PageHero already shows this content */}
        <motion.div
          className={`max-w-2xl mb-16 ${hideHeader ? 'hidden' : ''}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-11 h-px bg-prime-gold" />
            <span className="section-eyebrow">{t("services.title")}</span>
          </div>
          <h2 className="text-4xl lg:text-[2.75rem] font-serif font-bold text-white leading-tight mb-4 tracking-[-0.02em]">
            {t("services.subtitle")}
          </h2>
          <p className="text-white/55 font-open-sans leading-relaxed">
            {t("services.description")}
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10">
          {services.map((svc, i) => {
            const cardRef = useRef<HTMLDivElement>(null);
            const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
              const el = cardRef.current;
              if (!el) return;
              const { left, top, width, height } = el.getBoundingClientRect();
              const x = ((e.clientX - left) / width - 0.5) * 10;
              const y = ((e.clientY - top) / height - 0.5) * -10;
              el.style.transform = `perspective(900px) rotateX(${y}deg) rotateY(${x}deg)`;
            };
            const handleMouseLeave = () => {
              if (cardRef.current) cardRef.current.style.transform = "";
            };
            return (
            <motion.div
              key={svc.id}
              id={svc.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
            >
              <Link to={`/${locale}/services#${svc.id}`}>
                <div
                  ref={cardRef}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  className="group relative bg-prime-blue-deepest p-8 h-full flex flex-col overflow-hidden transition-colors duration-300 hover:bg-white/[0.03] cursor-pointer"
                  style={{ willChange: "transform", transition: "transform 0.15s ease, background-color 0.3s ease" }}
                >
                  {/* Gold left accent bar */}
                  <div className="absolute left-0 top-8 bottom-8 w-[2px] bg-prime-gold scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center" />

                  {/* Number */}
                  <span className="absolute top-7 right-7 text-[11px] font-montserrat font-bold tabular-nums text-white/20 group-hover:text-prime-gold transition-colors select-none">
                    {svc.number}
                  </span>

                  <div className="relative flex flex-col flex-1 gap-4">
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-sm bg-prime-gold/10 border border-prime-gold/20 flex items-center justify-center text-xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      {svc.icon}
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-serif font-bold text-white leading-snug tracking-[-0.01em]">
                      {t(svc.titleKey)}
                    </h3>

                    {/* Description */}
                    <p className="text-white/55 font-open-sans text-sm leading-relaxed flex-1">
                      {t(svc.descKey)}
                    </p>

                    {/* CTA */}
                    <div className="flex items-center gap-1.5 pt-1 text-sm font-montserrat font-semibold uppercase tracking-[0.1em] text-white/40 group-hover:text-prime-gold transition-colors duration-300">
                      <span>{t("services.learnMore")}</span>
                      <ArrowUpRight className="w-4 h-4 -translate-x-0.5 -translate-y-0.5 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
            );
          })}
        </div>

        {/* View all — only shown on pages other than Services */}
        {!hideHeader && (
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Link to={`/${locale}/services`}>
              <button className="group inline-flex items-center gap-2 bg-prime-gold hover:bg-prime-gold-bright text-prime-blue font-montserrat font-bold text-sm uppercase tracking-[0.14em] px-8 py-3.5 transition-colors duration-200">
                View All Services
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ServicesGrid;
