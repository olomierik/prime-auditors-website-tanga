import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ArrowRight, Phone, Mail } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const FinalCTA = () => {
  const { t } = useTranslation();
  const { locale } = useParams();

  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-prime-blue via-[#0f2a4a] to-[#091929]" />
      <div className="absolute inset-0 bg-dot-pattern opacity-40" />

      {/* Glow accents */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-prime-gold/8 rounded-full blur-[100px] pointer-events-none" />

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-prime-gold/50 to-transparent" />

      <div className="relative max-w-6xl mx-auto container-padding py-24 lg:py-32">
        <motion.div
          className="text-center space-y-8"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-px bg-prime-gold/50" />
            <span className="section-eyebrow">Get Started Today</span>
            <div className="w-10 h-px bg-prime-gold/50" />
          </div>

          {/* Headline */}
          <h2 className="text-4xl lg:text-6xl font-serif font-bold text-white leading-[1.05] max-w-4xl mx-auto">
            {t('cta.title')}
          </h2>

          {/* Gold rule */}
          <div className="gold-divider-center" />

          {/* Sub */}
          <p className="text-xl text-white/60 font-open-sans max-w-2xl mx-auto leading-relaxed">
            {t('cta.description')}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link to={`/${locale}/#contact`}>
              <button className="group inline-flex items-center gap-3 bg-prime-gold hover:bg-[#d4af26] text-prime-blue font-montserrat font-bold px-10 py-4 text-sm uppercase tracking-wide rounded-sm transition-all duration-200 shadow-[0_4px_24px_rgba(197,160,33,0.35)] hover:shadow-[0_8px_40px_rgba(197,160,33,0.5)] hover:-translate-y-0.5 w-full sm:w-auto justify-center">
                {t('cta.cta1')}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <Link to={`/${locale}/services`}>
              <button className="inline-flex items-center gap-3 border border-white/20 hover:border-white/50 text-white hover:bg-white/8 font-montserrat font-semibold px-10 py-4 text-sm uppercase tracking-wide rounded-sm transition-all duration-200 w-full sm:w-auto justify-center backdrop-blur-sm">
                {t('cta.cta2')}
              </button>
            </Link>
          </div>

          {/* Contact strip */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-6 border-t border-white/8 mt-8">
            <a
              href="tel:+255752401012"
              className="flex items-center gap-2.5 text-sm text-white/50 hover:text-prime-gold transition-colors font-open-sans group"
            >
              <div className="w-7 h-7 rounded-full bg-prime-gold/10 flex items-center justify-center group-hover:bg-prime-gold/20 transition-colors">
                <Phone className="w-3.5 h-3.5 text-prime-gold" />
              </div>
              +255 752 401 012
            </a>
            <div className="w-px h-4 bg-white/15 hidden sm:block" />
            <a
              href="mailto:erick.olomi@primeauditors.co.tz"
              className="flex items-center gap-2.5 text-sm text-white/50 hover:text-prime-gold transition-colors font-open-sans group"
            >
              <div className="w-7 h-7 rounded-full bg-prime-gold/10 flex items-center justify-center group-hover:bg-prime-gold/20 transition-colors">
                <Mail className="w-3.5 h-3.5 text-prime-gold" />
              </div>
              erick.olomi@primeauditors.co.tz
            </a>
            <div className="w-px h-4 bg-white/15 hidden sm:block" />
            <span className="text-xs text-white/30 font-montserrat uppercase tracking-wider">
              Reg. No. PF510 · Tanga, Tanzania
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
