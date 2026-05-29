import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Award, Globe2, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t } = useTranslation();
  const { locale } = useParams();

  const itemVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: (i: number) => ({
      opacity: 1, y: 0,
      transition: { duration: 0.65, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
    }),
  };

  const credentials = [
    { icon: ShieldCheck, label: "NBAA Certified", sub: "Reg. No. PF510" },
    { icon: Globe2,      label: "Tanzania Based", sub: "Tanga City" },
    { icon: Award,       label: "10+ Years",      sub: "Experience" },
    { icon: TrendingUp,  label: "100+ Clients",   sub: "Served" },
  ];

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">

      {/* ── Background ──────────────────────────────────────────────── */}
      <div className="absolute inset-0">
        <img
          src="/hero-bg.jpg"
          alt="Prime Auditors Tanga"
          className="w-full h-full object-cover scale-105"
          fetchPriority="high"
          decoding="async"
        />
        {/* Layered gradients for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1e35]/97 via-[#0f2a4a]/88 to-[#0f2a4a]/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1e35] via-transparent to-transparent opacity-70" />
      </div>

      {/* Subtle dot pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(197,160,33,0.6) 1px, transparent 0)`,
          backgroundSize: "36px 36px",
        }}
      />

      {/* Gold accent line — top */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-prime-gold to-transparent opacity-60" />

      {/* ── Main content ────────────────────────────────────────────── */}
      <div className="relative flex-1 flex items-center">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full py-24 lg:py-32">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">

            {/* Left: text */}
            <div className="lg:col-span-7 space-y-8">

              {/* Badge */}
              <motion.div
                custom={0} initial="hidden" animate="visible" variants={itemVariants}
                className="inline-flex items-center gap-2.5"
              >
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-prime-gold opacity-60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-prime-gold" />
                </span>
                <span className="text-xs font-montserrat font-semibold text-prime-gold/90 tracking-[0.2em] uppercase">
                  {t("hero.badge")}
                </span>
              </motion.div>

              {/* Headline */}
              <motion.div custom={1} initial="hidden" animate="visible" variants={itemVariants}>
                <h1 className="text-[2.75rem] sm:text-5xl lg:text-[3.5rem] xl:text-[4rem] font-serif font-bold text-white leading-[1.06] tracking-tight">
                  {t("hero.title1")}{" "}
                  <span className="relative inline-block">
                    <span className="gradient-text">{t("hero.titleHighlight")}</span>
                    <svg
                      className="absolute -bottom-2 left-0 w-full"
                      height="6" viewBox="0 0 200 6" preserveAspectRatio="none"
                    >
                      <path d="M0 3 Q50 0 100 3 Q150 6 200 3" stroke="#c5a021" strokeWidth="2" fill="none" strokeLinecap="round" />
                    </svg>
                  </span>
                </h1>
              </motion.div>

              {/* Divider */}
              <motion.div custom={2} initial="hidden" animate="visible" variants={itemVariants}>
                <div className="w-16 h-[3px] bg-gradient-to-r from-prime-gold to-prime-gold/30 rounded-full" />
              </motion.div>

              {/* Subtitle */}
              <motion.p
                custom={3} initial="hidden" animate="visible" variants={itemVariants}
                className="text-lg sm:text-xl text-white/72 font-open-sans leading-relaxed max-w-xl"
              >
                {t("hero.subtitle")}
              </motion.p>

              {/* CTAs */}
              <motion.div
                custom={4} initial="hidden" animate="visible" variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 pt-2"
              >
                <Link to={`/${locale}/#contact`}>
                  <button className="group inline-flex items-center gap-2 bg-prime-gold hover:bg-[#d4af26] text-prime-blue font-montserrat font-bold px-8 py-4 text-sm tracking-wide uppercase rounded-sm transition-all duration-200 shadow-[0_4px_24px_rgba(197,160,33,0.35)] hover:shadow-[0_8px_32px_rgba(197,160,33,0.5)] hover:-translate-y-0.5 w-full sm:w-auto justify-center">
                    {t("hero.cta1")}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <Link to={`/${locale}/services`}>
                  <button className="group inline-flex items-center gap-2 border border-white/25 hover:border-white/60 text-white hover:bg-white/8 font-montserrat font-semibold px-8 py-4 text-sm tracking-wide uppercase rounded-sm transition-all duration-200 w-full sm:w-auto justify-center backdrop-blur-sm">
                    {t("hero.cta2")}
                    <ArrowRight className="w-4 h-4 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </button>
                </Link>
              </motion.div>

              {/* Credential chips */}
              <motion.div
                custom={5} initial="hidden" animate="visible" variants={itemVariants}
                className="flex flex-wrap gap-3 pt-2"
              >
                {credentials.map((c) => (
                  <div
                    key={c.label}
                    className="flex items-center gap-2 bg-white/[0.06] backdrop-blur-sm border border-white/[0.08] rounded-full px-4 py-2"
                  >
                    <c.icon className="w-3.5 h-3.5 text-prime-gold" />
                    <span className="text-xs text-white/80 font-montserrat font-medium">
                      {c.label}
                    </span>
                    <span className="text-[10px] text-white/40 font-open-sans border-l border-white/20 pl-2">
                      {c.sub}
                    </span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right: floating stats card */}
            <motion.div
              className="hidden lg:block lg:col-span-5"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="relative">
                {/* Glow */}
                <div className="absolute -inset-8 bg-prime-gold/10 rounded-3xl blur-3xl" />

                {/* Card */}
                <div className="relative rounded-2xl overflow-hidden border border-white/10 backdrop-blur-xl bg-white/[0.04]">
                  {/* Card header */}
                  <div className="px-8 py-6 border-b border-white/10">
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-xl bg-prime-gold/15 flex items-center justify-center">
                        <ShieldCheck className="w-5 h-5 text-prime-gold" />
                      </div>
                      <div>
                        <p className="font-montserrat font-bold text-white text-base">Prime Auditors</p>
                        <p className="text-[11px] text-prime-gold font-open-sans tracking-wider uppercase">
                          {t("hero.certified")}
                        </p>
                      </div>
                      <div className="ml-auto flex gap-1">
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        <span className="text-[10px] text-white/40 font-open-sans self-center">Active</span>
                      </div>
                    </div>
                  </div>

                  {/* Features list */}
                  <div className="px-8 py-6 space-y-4">
                    {[
                      t("hero.feature1"),
                      t("hero.feature2"),
                      t("hero.feature3"),
                      t("hero.feature4"),
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 + i * 0.1, duration: 0.5 }}
                        className="flex items-center gap-3"
                      >
                        <div className="w-5 h-5 rounded-full bg-prime-gold/15 flex items-center justify-center flex-shrink-0">
                          <div className="w-1.5 h-1.5 rounded-full bg-prime-gold" />
                        </div>
                        <span className="text-sm text-white/75 font-open-sans">{item}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Stats row */}
                  <div className="grid grid-cols-3 border-t border-white/10">
                    {[
                      { value: "10+", label: t("stats.years") },
                      { value: "100+", label: t("stats.clients") },
                      { value: "24/7", label: t("stats.support") },
                    ].map((s, i) => (
                      <div
                        key={i}
                        className={`px-4 py-5 text-center ${i < 2 ? "border-r border-white/10" : ""}`}
                      >
                        <div className="text-xl font-serif font-bold text-prime-gold">{s.value}</div>
                        <div className="text-[10px] text-white/45 font-open-sans mt-0.5 uppercase tracking-wider">
                          {s.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* CTA inside card */}
                  <div className="px-8 py-5 border-t border-white/10">
                    <Link to={`/${locale}/foreign-investors`}>
                      <button className="w-full group flex items-center justify-between text-sm text-white/70 hover:text-prime-gold font-montserrat font-medium transition-colors py-1">
                        <span>Foreign Investor Services</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* ── Bottom gradient fade ─────────────────────────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a1e35] to-transparent pointer-events-none" />

      {/* ── Scroll indicator ────────────────────────────────────────── */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 hidden md:flex"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        <span className="text-[10px] text-white/30 font-montserrat tracking-[0.25em] uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-prime-gold/60 to-transparent animate-pulse" />
      </motion.div>
    </section>
  );
};

export default Hero;
