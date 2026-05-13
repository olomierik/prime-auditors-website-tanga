import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t } = useTranslation();
  const { locale } = useParams();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  return (
    <section className="relative min-h-[88vh] flex items-center overflow-hidden bg-prime-blue">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src="/hero-bg.jpg"
          alt="Prime Auditors Hero"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-prime-blue via-prime-blue/95 to-prime-blue/80" />
      </div>

      {/* Dot grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: `radial-gradient(circle at 1.5px 1.5px, rgba(255,255,255,0.35) 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 sm:py-24 lg:py-28 w-full">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-8 items-center">
          {/* Left: Text content */}
          <motion.div
            className="lg:col-span-3 space-y-8"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {/* Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2.5 bg-white/[0.06] backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 text-xs text-white/90 font-open-sans"
            >
              <ShieldCheck className="w-4 h-4 text-prime-gold" />
              <span className="tracking-wide">{t("hero.badge")}</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif font-semibold text-white leading-[1.05] tracking-tight"
            >
              {t("hero.title1")}{" "}
              <span className="text-prime-gold">{t("hero.titleHighlight")}</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl text-white/70 font-open-sans leading-relaxed max-w-xl"
            >
              {t("hero.subtitle")}
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 pt-2"
            >
              <Link to={`/${locale}/#contact`}>
                <Button
                  size="lg"
                  className="bg-prime-gold hover:bg-prime-gold/90 text-prime-blue font-montserrat font-semibold px-8 text-base w-full sm:w-auto rounded-sm shadow-lg shadow-prime-gold/20 hover:shadow-xl hover:shadow-prime-gold/30 transition-all group"
                >
                  {t("hero.cta1")}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to={`/${locale}/services`}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border border-white/30 bg-transparent text-white hover:bg-white hover:text-prime-blue font-montserrat font-semibold px-8 text-base w-full sm:w-auto rounded-sm transition-all"
                >
                  {t("hero.cta2")}
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right: Visual accent card */}
          <motion.div
            className="hidden lg:block lg:col-span-2"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <div className="relative">
              {/* Glass card */}
              <div className="relative bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl p-8 space-y-6">
                {/* Stat row */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-prime-gold/10 flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6 text-prime-gold" />
                  </div>
                  <div>
                    <div className="text-2xl font-montserrat font-bold text-white">NBAA</div>
                    <div className="text-xs text-white/50 font-open-sans">Certified — PF510</div>
                  </div>
                </div>

                <div className="h-px bg-white/10" />

                {/* Features list */}
                <div className="space-y-4">
                  {[
                    "Independent Financial Audits",
                    "Tax Advisory & Compliance",
                    "Risk Management Solutions",
                    "Strategic Business Consulting",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-prime-gold" />
                      <span className="text-sm text-white/70 font-open-sans">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Decorative glow behind card */}
              <div className="absolute -top-8 -right-8 w-48 h-48 bg-prime-gold/10 rounded-full blur-3xl -z-10" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-prime-blue to-transparent pointer-events-none" />
    </section>
  );
};

export default Hero;
