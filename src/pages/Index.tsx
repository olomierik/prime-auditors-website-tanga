import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import ServicesGrid from "@/components/ServicesGrid";
import BookingForm from "@/components/BookingForm";
import Testimonials from "@/components/Testimonials";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Globe, ArrowRight, Globe2, ShieldCheck, BarChart3, Users } from "lucide-react";
import { Link, useParams } from "react-router-dom";

// ── Foreign Investor Banner ──────────────────────────────────────────────────
const ForeignInvestorBanner = () => {
  const { t } = useTranslation();
  const { locale } = useParams();
  return (
    <section className="bg-prime-blue border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-prime-gold/15 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Globe className="w-5 h-5 text-prime-gold" />
            </div>
            <div>
              <h3 className="font-montserrat font-bold text-white text-lg leading-snug">
                {t("fi.banner.title")}
              </h3>
              <p className="text-white/55 font-open-sans text-sm mt-1 max-w-xl leading-relaxed">
                {t("fi.banner.desc")}
              </p>
            </div>
          </div>
          <Link to={`/${locale}/foreign-investors`} className="flex-shrink-0">
            <button className="inline-flex items-center gap-2 bg-prime-gold hover:bg-[#d4af26] text-prime-blue font-montserrat font-bold text-sm uppercase tracking-wide px-6 py-3 rounded-sm transition-all duration-200 shadow-[0_2px_12px_rgba(197,160,33,0.3)] hover:shadow-[0_4px_20px_rgba(197,160,33,0.4)] hover:-translate-y-0.5 whitespace-nowrap">
              {t("fi.banner.cta")} <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
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

          {/* Text side */}
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
                    <h4 className="font-montserrat font-semibold text-prime-blue text-sm mb-0.5">
                      {t(titleKey)}
                    </h4>
                    <p className="text-sm text-gray-500 font-open-sans leading-relaxed">
                      {t(descKey)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* NBAA badge */}
            <div className="inline-flex items-center gap-3 bg-prime-blue/5 border border-prime-blue/10 rounded-xl px-4 py-3">
              <ShieldCheck className="w-5 h-5 text-prime-gold flex-shrink-0" />
              <span className="text-sm font-montserrat font-semibold text-prime-blue">
                {t("why.nbaaCert")}
              </span>
            </div>
          </motion.div>

          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/5]">
              <img
                src="/office-reception.jpg"
                alt="Prime Auditors office"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-prime-blue/50 to-transparent" />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-5 -left-5 bg-prime-blue text-white px-6 py-4 rounded-xl shadow-2xl">
              <div className="text-2xl font-montserrat font-bold text-prime-gold">NBAA</div>
              <div className="text-[10px] text-white/70 font-open-sans mt-0.5 tracking-wide">
                Reg. No. PF510
              </div>
            </div>
            {/* Gold border accent */}
            <div className="absolute -top-3 -right-3 w-24 h-24 border-t-2 border-r-2 border-prime-gold/40 rounded-tr-2xl pointer-events-none" />
            <div className="absolute -bottom-3 -left-3 w-24 h-24 border-b-2 border-l-2 border-prime-gold/40 rounded-bl-2xl pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ── Contact Section ──────────────────────────────────────────────────────────
const ContactSection = () => {
  const { t } = useTranslation();
  return (
    <section id="contact" className="section-spacing bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto container-padding">
        <motion.div
          className="text-center max-w-xl mx-auto mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-prime-gold" />
            <span className="section-eyebrow">{t("contact.title")}</span>
            <div className="w-8 h-0.5 bg-prime-gold" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-prime-blue mb-3">
            {t("contact.subtitle")}
          </h2>
          <p className="text-gray-500 font-open-sans">
            {t("contact.description")}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14">
          {/* Contact info */}
          <div className="space-y-8">
            <div className="space-y-5">
              {[
                {
                  Icon: MapPin,
                  label: t("contact.address"),
                  lines: [
                    "P.O. Box 5667, Market Street",
                    "Central Ward, Tanga, Tanzania",
                  ],
                },
                { Icon: Phone, label: t("contact.phone"),   lines: ["+255 752 401 012"] },
                { Icon: Mail,  label: t("contact.email"),   lines: ["erick.olomi@primeauditors.co.tz"] },
              ].map(({ Icon, label, lines }) => (
                <div key={label} className="flex gap-4">
                  <div className="w-11 h-11 rounded-xl bg-prime-gold/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-prime-gold" />
                  </div>
                  <div>
                    <div className="font-montserrat font-semibold text-sm text-prime-blue mb-0.5">
                      {label}
                    </div>
                    {lines.map((l) => (
                      <div key={l} className="text-sm text-gray-500 font-open-sans">{l}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Hours */}
            <div className="bg-prime-light-grey rounded-2xl p-6 border border-gray-100">
              <h4 className="font-montserrat font-semibold text-sm text-prime-blue mb-4 flex items-center gap-2">
                <span className="w-4 h-0.5 bg-prime-gold rounded-full" />
                {t("contact.hours")}
              </h4>
              <div className="space-y-2.5 text-sm font-open-sans">
                {[
                  { day: t("contact.weekdays"), hours: "8:00 AM – 5:00 PM", active: true },
                  { day: t("contact.saturday"), hours: "8:30 AM – 1:30 PM", active: true },
                  { day: t("contact.sunday"),   hours: t("contact.closed"),  active: false },
                ].map(({ day, hours, active }) => (
                  <div key={day} className="flex justify-between items-center">
                    <span className="text-gray-500">{day}</span>
                    <span className={`font-medium ${active ? "text-prime-blue" : "text-gray-400"}`}>{hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_32px_rgba(15,42,74,0.08)] p-8">
            <h3 className="text-xl font-serif font-bold text-prime-blue mb-6">
              {t("contact.sendMessage")}
            </h3>
            <BookingForm />
          </div>
        </div>
      </div>
    </section>
  );
};

// ── Page ─────────────────────────────────────────────────────────────────────
const Index = () => (
  <>
    <Hero />
    <Stats />
    <ForeignInvestorBanner />
    <ServicesGrid />
    <WhyChooseUs />
    <Testimonials />
    <ContactSection />
  </>
);

export default Index;
