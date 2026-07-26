import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import {
  ArrowRight, ShieldCheck, Globe2, BarChart3, Users, CheckCircle2,
  Star, Quote,
} from "lucide-react";
import ServicesGrid from "@/components/ServicesGrid";
import Stats from "@/components/Stats";
import VisitorCounter from "@/components/VisitorCounter";

// ── Hero ─────────────────────────────────────────────────────────────────────
const Hero = () => {
  const { t } = useTranslation();
  const { locale } = useParams();

  const features = [t("hero.feature1"), t("hero.feature2"), t("hero.feature3"), t("hero.feature4")];

  return (
    <section className="relative overflow-hidden bg-prime-blue text-white">
      {/* Background image + overlays */}
      <div className="absolute inset-0">
        <img src="/hero-bg.jpg" alt="" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-br from-prime-blue via-prime-blue/95 to-[#0a1e35]" />
        <div className="absolute inset-0 bg-dot-pattern opacity-30" />
      </div>
      {/* Gold glow */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-prime-gold/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2.5 bg-white/10 border border-white/15 rounded-full pl-2 pr-4 py-1.5 mb-6 backdrop-blur-sm">
              <span className="bg-prime-gold text-prime-blue text-[10px] font-montserrat font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">NBAA</span>
              <span className="text-xs font-montserrat text-white/80 tracking-wide">{t("hero.badge")}</span>
            </div>

            <h1 className="font-serif font-bold leading-[1.08] tracking-tight text-4xl sm:text-5xl lg:text-[3.4rem] mb-6">
              {t("hero.title1")}{" "}
              <span className="text-prime-gold italic">{t("hero.titleHighlight")}</span>
            </h1>

            <p className="text-base sm:text-lg text-white/70 font-open-sans leading-relaxed max-w-xl mb-8">
              {t("hero.subtitle")}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link to={`/${locale}/contact`}>
                <button className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-prime-gold hover:bg-prime-gold-bright text-prime-blue font-montserrat font-bold text-sm uppercase tracking-wide px-7 py-3.5 rounded-md transition-all duration-200 shadow-[0_4px_20px_rgba(197,160,33,0.35)] hover:-translate-y-0.5">
                  {t("hero.cta1")} <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </Link>
              <Link to={`/${locale}/services`}>
                <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-white/30 hover:border-white hover:bg-white/10 text-white font-montserrat font-semibold text-sm uppercase tracking-wide px-7 py-3.5 rounded-md transition-all duration-200">
                  {t("hero.cta2")}
                </button>
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-3 max-w-lg">
              {features.map((f) => (
                <div key={f} className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-prime-gold flex-shrink-0" />
                  <span className="text-sm text-white/75 font-open-sans">{f}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Image card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative hidden lg:block"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
              <img src="/office-reception.jpg" alt="Prime Auditors office in Tanga, Tanzania" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-prime-blue/60 to-transparent" />
            </div>
            {/* Floating NBAA badge */}
            <div className="absolute -bottom-5 -left-5 bg-white text-prime-blue px-6 py-4 rounded-xl shadow-2xl">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-8 h-8 text-prime-gold" />
                <div>
                  <div className="text-lg font-serif font-bold leading-none">NBAA Certified</div>
                  <div className="text-[11px] text-gray-500 font-montserrat tracking-wide mt-1">Reg. No. PF510</div>
                </div>
              </div>
            </div>
            {/* Gold corner accent */}
            <div className="absolute -top-3 -right-3 w-24 h-24 border-t-2 border-r-2 border-prime-gold/50 rounded-tr-2xl pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ── Why Choose Us ────────────────────────────────────────────────────────────
const WhyChooseUs = () => {
  const { t } = useTranslation();

  const pillars = [
    { Icon: Globe2,      titleKey: "why.international", descKey: "why.internationalDesc" },
    { Icon: ShieldCheck, titleKey: "why.trusted",       descKey: "why.trustedDesc" },
    { Icon: BarChart3,   titleKey: "why.regulatory",    descKey: "why.regulatoryDesc" },
    { Icon: Users,       titleKey: "why.professional",  descKey: "why.professionalDesc" },
  ];

  return (
    <section className="section-spacing bg-prime-light-grey">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-0.5 bg-prime-gold" />
                <span className="section-eyebrow">{t("why.title")}</span>
              </div>
              <h2 className="text-3xl lg:text-[2.5rem] font-serif font-bold text-prime-blue leading-tight mb-4">
                {t("why.subtitle")}
              </h2>
              <p className="text-gray-500 font-open-sans leading-relaxed">
                {t("why.description")}
              </p>
            </div>

            <div className="space-y-5">
              {pillars.map(({ Icon, titleKey, descKey }) => (
                <div key={titleKey} className="flex gap-4 group">
                  <div className="w-11 h-11 rounded-xl bg-prime-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-prime-gold/20 transition-colors">
                    <Icon className="w-5 h-5 text-prime-gold" />
                  </div>
                  <div>
                    <h4 className="font-montserrat font-semibold text-prime-blue text-sm mb-0.5">{t(titleKey)}</h4>
                    <p className="text-sm text-gray-500 font-open-sans leading-relaxed">{t(descKey)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="inline-flex items-center gap-3 bg-prime-blue/5 border border-prime-blue/10 rounded-xl px-4 py-3">
              <ShieldCheck className="w-5 h-5 text-prime-gold flex-shrink-0" />
              <span className="text-sm font-montserrat font-semibold text-prime-blue">{t("why.nbaaCert")}</span>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/5]">
              <img src="/office-workspace.jpg" alt="Prime Auditors team at work" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-prime-blue/50 to-transparent" />
            </div>
            <div className="absolute -bottom-5 -right-5 bg-prime-blue text-white px-6 py-4 rounded-xl shadow-2xl">
              <div className="text-3xl font-serif font-bold text-prime-gold leading-none">2024</div>
              <div className="text-[10px] text-white/70 font-montserrat tracking-wide mt-1 uppercase">{t("home.practice.founded")}</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ── Testimonials ─────────────────────────────────────────────────────────────
const Testimonials = () => {
  const { t } = useTranslation();
  const items = [
    { quote: t("testimonials.quote1"), name: t("testimonials.name1"), role: t("testimonials.role1") },
    { quote: t("testimonials.quote2"), name: t("testimonials.name2"), role: t("testimonials.role2") },
    { quote: t("testimonials.quote3"), name: t("testimonials.name3"), role: t("testimonials.role3") },
  ];
  return (
    <section className="section-spacing bg-white">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-prime-gold" />
            <span className="section-eyebrow">{t("testimonials.title")}</span>
            <div className="w-8 h-0.5 bg-prime-gold" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-prime-blue">{t("testimonials.subtitle")}</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative bg-white rounded-2xl border border-gray-100 p-8 shadow-[0_2px_20px_rgba(15,42,74,0.06)] hover:shadow-[0_12px_40px_rgba(15,42,74,0.12)] hover:-translate-y-1 transition-all duration-300"
            >
              <Quote className="w-9 h-9 text-prime-gold/20 mb-4" />
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, s) => <Star key={s} className="w-4 h-4 fill-prime-gold text-prime-gold" />)}
              </div>
              <p className="text-gray-600 font-open-sans leading-relaxed text-sm mb-6">"{item.quote}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div className="w-11 h-11 rounded-full bg-prime-blue text-prime-gold flex items-center justify-center font-serif font-bold">
                  {item.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <div className="font-montserrat font-semibold text-prime-blue text-sm">{item.name}</div>
                  <div className="text-xs text-gray-400 font-open-sans">{item.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ── Contact CTA ──────────────────────────────────────────────────────────────
const ContactCTA = () => {
  const { t } = useTranslation();
  const { locale } = useParams();
  return (
    <section className="relative overflow-hidden bg-prime-blue text-white">
      <div className="absolute inset-0 bg-dot-pattern opacity-20" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-prime-gold/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="relative max-w-4xl mx-auto container-padding py-20 lg:py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <div className="gold-divider-center" />
          <h2 className="text-3xl lg:text-[2.6rem] font-serif font-bold leading-tight mb-4">
            {t("cta.title")}
          </h2>
          <p className="text-white/70 font-open-sans max-w-2xl mx-auto mb-9">
            {t("cta.description")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={`/${locale}/contact`}>
              <button className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-prime-gold hover:bg-prime-gold-bright text-prime-blue font-montserrat font-bold text-sm uppercase tracking-wide px-8 py-4 rounded-md transition-all duration-200 shadow-[0_4px_20px_rgba(197,160,33,0.35)] hover:-translate-y-0.5">
                {t("cta.cta1")} <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ── Page ─────────────────────────────────────────────────────────────────────
const Index = () => (
  <>
    <Hero />
    <VisitorCounter />
    <ServicesGrid />
    <WhyChooseUs />
    <Stats />
    <Testimonials />
    <ContactCTA />
  </>
);

export default Index;
