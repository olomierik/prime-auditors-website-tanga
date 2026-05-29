import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const services = [
  {
    icon: "📊",
    titleKey: "service.audit",
    descKey: "service.auditDesc",
    accent: "from-blue-500/10 to-blue-600/5",
    iconBg: "bg-blue-50",
    number: "01",
  },
  {
    icon: "💼",
    titleKey: "service.tax",
    descKey: "service.taxDesc",
    accent: "from-amber-500/10 to-amber-600/5",
    iconBg: "bg-amber-50",
    number: "02",
  },
  {
    icon: "📋",
    titleKey: "service.registration",
    descKey: "service.registrationDesc",
    accent: "from-emerald-500/10 to-emerald-600/5",
    iconBg: "bg-emerald-50",
    number: "03",
  },
  {
    icon: "🎯",
    titleKey: "service.holding",
    descKey: "service.holdingDesc",
    accent: "from-purple-500/10 to-purple-600/5",
    iconBg: "bg-purple-50",
    number: "04",
  },
  {
    icon: "🌍",
    titleKey: "service.corporate",
    descKey: "service.corporateDesc",
    accent: "from-rose-500/10 to-rose-600/5",
    iconBg: "bg-rose-50",
    number: "05",
  },
  {
    icon: "✓",
    titleKey: "service.accounting",
    descKey: "service.accountingDesc",
    accent: "from-teal-500/10 to-teal-600/5",
    iconBg: "bg-teal-50",
    number: "06",
  },
];

const ServicesGrid = () => {
  const { t } = useTranslation();
  const { locale } = useParams();

  return (
    <section className="section-spacing bg-white relative overflow-hidden">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto container-padding">

        {/* Section header */}
        <motion.div
          className="max-w-2xl mb-16 space-y-4"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-0.5 bg-prime-gold" />
            <span className="section-eyebrow">{t('services.title')}</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-prime-blue leading-tight">
            {t('services.subtitle')}
          </h2>
          <p className="text-gray-500 font-open-sans leading-relaxed text-lg">
            {t('services.description')}
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
          {services.map((svc, i) => (
            <motion.div
              key={svc.number}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
            >
              <Link to={`/${locale}/services`}>
                <div className="group relative bg-white rounded-2xl border border-gray-100 p-8 h-full flex flex-col overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-[0_12px_48px_rgba(15,42,74,0.12)] hover:-translate-y-1.5 hover:border-prime-gold/20">

                  {/* Gradient bg on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${svc.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`} />

                  {/* Gold left border accent */}
                  <div className="absolute left-0 top-6 bottom-6 w-[3px] bg-prime-gold scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center rounded-full" />

                  {/* Number */}
                  <span className="absolute top-7 right-7 text-[11px] font-montserrat font-bold text-gray-200 group-hover:text-prime-gold/30 transition-colors duration-300 select-none">
                    {svc.number}
                  </span>

                  <div className="relative flex flex-col flex-1 space-y-5">
                    {/* Icon */}
                    <div className={`w-14 h-14 rounded-xl ${svc.iconBg} flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      {svc.icon}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-serif font-bold text-prime-blue group-hover:text-prime-blue transition-colors leading-tight">
                      {t(svc.titleKey)}
                    </h3>

                    {/* Desc */}
                    <p className="text-gray-500 font-open-sans text-sm leading-relaxed flex-1">
                      {t(svc.descKey)}
                    </p>

                    {/* Footer link */}
                    <div className="flex items-center gap-2 pt-2 text-sm font-montserrat font-semibold text-gray-300 group-hover:text-prime-gold transition-colors duration-300">
                      <span>{t('services.learnMore')}</span>
                      <ArrowUpRight className="w-4 h-4 -translate-x-1 -translate-y-0.5 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View all CTA */}
        <motion.div
          className="text-center mt-14"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <Link to={`/${locale}/services`}>
            <button className="inline-flex items-center gap-2 border-2 border-prime-blue/15 hover:border-prime-gold text-prime-blue font-montserrat font-semibold text-sm uppercase tracking-wider px-8 py-3.5 rounded-sm transition-all duration-200 hover:bg-prime-gold hover:text-prime-blue group">
              {t('services.learnMore')} All Services
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesGrid;
