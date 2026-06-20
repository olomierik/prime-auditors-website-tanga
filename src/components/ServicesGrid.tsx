import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useRef, MouseEvent } from "react";

const services = [
  { id: "audit",       icon: "📊", titleKey: "service.audit",       descKey: "service.auditDesc",       iconBg: "bg-blue-50",    accent: "from-blue-500/8 to-blue-600/4",    number: "01" },
  { id: "tax",         icon: "💼", titleKey: "service.tax",         descKey: "service.taxDesc",         iconBg: "bg-amber-50",   accent: "from-amber-500/8 to-amber-600/4",  number: "02" },
  { id: "registration",icon: "📋", titleKey: "service.registration",descKey: "service.registrationDesc",iconBg: "bg-emerald-50", accent: "from-emerald-500/8 to-emerald-600/4",number: "03" },
  { id: "holding",     icon: "🎯", titleKey: "service.holding",     descKey: "service.holdingDesc",     iconBg: "bg-purple-50",  accent: "from-purple-500/8 to-purple-600/4", number: "04" },
  { id: "corporate",   icon: "🌍", titleKey: "service.corporate",   descKey: "service.corporateDesc",   iconBg: "bg-rose-50",    accent: "from-rose-500/8 to-rose-600/4",     number: "05" },
  { id: "accounting",  icon: "✅", titleKey: "service.accounting",  descKey: "service.accountingDesc",  iconBg: "bg-teal-50",    accent: "from-teal-500/8 to-teal-600/4",     number: "06" },
];

interface ServicesGridProps {
  hideHeader?: boolean;
}

const ServicesGrid = ({ hideHeader = false }: ServicesGridProps) => {
  const { t } = useTranslation();
  const { locale } = useParams();

  return (
    <section className="section-spacing bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-50 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto container-padding">

        {/* Header — hidden when PageHero already shows this content */}
        <motion.div
          className={`max-w-2xl mb-16 ${hideHeader ? 'hidden' : ''}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-prime-gold" />
            <span className="section-eyebrow">{t("services.title")}</span>
          </div>
          <h2 className="text-4xl lg:text-[2.75rem] font-serif font-bold text-prime-blue leading-tight mb-4">
            {t("services.subtitle")}
          </h2>
          <p className="text-gray-500 font-open-sans leading-relaxed">
            {t("services.description")}
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc, i) => {
            const cardRef = useRef<HTMLDivElement>(null);
            const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
              const el = cardRef.current;
              if (!el) return;
              const { left, top, width, height } = el.getBoundingClientRect();
              const x = ((e.clientX - left) / width - 0.5) * 16;
              const y = ((e.clientY - top) / height - 0.5) * -16;
              el.style.transform = `perspective(800px) rotateX(${y}deg) rotateY(${x}deg) translateY(-4px)`;
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
                  className="group relative bg-white rounded-2xl border border-gray-100 p-7 h-full flex flex-col overflow-hidden transition-[box-shadow,border-color] duration-300 hover:shadow-[0_20px_60px_rgba(15,42,74,0.14)] hover:border-prime-gold/25 cursor-pointer"
                  style={{ willChange: "transform", transition: "transform 0.15s ease, box-shadow 0.3s ease, border-color 0.3s ease" }}
                >

                  {/* Hover gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${svc.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`} />

                  {/* Gold left accent bar */}
                  <div className="absolute left-0 top-8 bottom-8 w-[3px] bg-prime-gold scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center rounded-full" />

                  {/* Number */}
                  <span className="absolute top-6 right-6 text-[11px] font-montserrat font-bold text-gray-150 group-hover:text-prime-gold/40 transition-colors select-none">
                    {svc.number}
                  </span>

                  <div className="relative flex flex-col flex-1 gap-4">
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-xl ${svc.iconBg} flex items-center justify-center text-xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      {svc.icon}
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-serif font-bold text-prime-blue leading-snug">
                      {t(svc.titleKey)}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-500 font-open-sans text-sm leading-relaxed flex-1">
                      {t(svc.descKey)}
                    </p>

                    {/* CTA */}
                    <div className="flex items-center gap-1.5 pt-1 text-sm font-montserrat font-semibold text-gray-300 group-hover:text-prime-gold transition-colors duration-300">
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
              <button className="group inline-flex items-center gap-2 bg-prime-blue hover:bg-prime-blue/90 text-white font-montserrat font-semibold text-sm uppercase tracking-wider px-8 py-3.5 rounded-sm transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5">
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
