import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { ArrowRight, FileSearch, Handshake, ClipboardCheck, Rocket } from "lucide-react";
import PageHero from "@/components/PageHero";
import ServicesGrid from "@/components/ServicesGrid";

const ProcessSection = () => {
  const steps = [
    { Icon: FileSearch, n: "01", title: "Discovery", desc: "We learn your business, goals and obligations in a free consultation." },
    { Icon: Handshake, n: "02", title: "Engagement", desc: "A clear scope and transparent fee — no surprises, fully documented." },
    { Icon: ClipboardCheck, n: "03", title: "Execution", desc: "Partner-led, evidence-driven delivery to international assurance standards." },
    { Icon: Rocket, n: "04", title: "Ongoing support", desc: "We stay on as your compliance and advisory partner year-round." },
  ];
  return (
    <section className="section-spacing bg-prime-light-grey">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-prime-gold" />
            <span className="section-eyebrow">How We Work</span>
            <div className="w-8 h-0.5 bg-prime-gold" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-prime-blue">A clear, partner-led process</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative bg-white rounded-2xl border border-gray-100 p-7 shadow-[0_2px_20px_rgba(15,42,74,0.05)] hover:shadow-[0_12px_40px_rgba(15,42,74,0.12)] hover:-translate-y-1 transition-all duration-300"
            >
              <span className="absolute top-5 right-6 text-3xl font-serif font-bold text-prime-gold/15">{s.n}</span>
              <div className="w-12 h-12 rounded-xl bg-prime-blue/5 flex items-center justify-center mb-4">
                <s.Icon className="w-6 h-6 text-prime-gold" />
              </div>
              <h3 className="font-serif font-bold text-prime-blue text-lg mb-2">{s.title}</h3>
              <p className="text-sm text-gray-500 font-open-sans leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ServicesCTA = () => {
  const { t } = useTranslation();
  const { locale } = useParams();
  return (
    <section className="relative overflow-hidden bg-prime-blue text-white">
      <div className="absolute inset-0 bg-dot-pattern opacity-20" />
      <div className="relative max-w-4xl mx-auto container-padding py-16 lg:py-20 text-center">
        <h2 className="text-2xl lg:text-3xl font-serif font-bold mb-4">{t("cta.title")}</h2>
        <p className="text-white/70 font-open-sans max-w-xl mx-auto mb-8">{t("cta.description")}</p>
        <Link to={`/${locale}/contact`}>
          <button className="group inline-flex items-center gap-2 bg-prime-gold hover:bg-prime-gold-bright text-prime-blue font-montserrat font-bold text-sm uppercase tracking-wide px-8 py-4 rounded-md transition-all duration-200 shadow-[0_4px_20px_rgba(197,160,33,0.35)] hover:-translate-y-0.5">
            {t("cta.cta1")} <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </Link>
      </div>
    </section>
  );
};

const Services = () => {
  const { t } = useTranslation();
  return (
    <>
      <PageHero
        eyebrow={t("services.title")}
        title={t("services.subtitle")}
        description={t("services.description")}
      />
      <ServicesGrid hideHeader />
      <ProcessSection />
      <ServicesCTA />
    </>
  );
};

export default Services;
