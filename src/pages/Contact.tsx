import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import PageHero from "@/components/PageHero";
import BookingForm from "@/components/BookingForm";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import officeFrontDesk from "@/assets/office-front-desk.jpg.asset.json";
const WECHAT_QR_URL = "/wechat-qr-code.jpeg";

const Contact = () => {
  const { t } = useTranslation();

  const details = [
    {
      Icon: MapPin,
      label: t("contact.address"),
      lines: ["P.O. Box 5667, Market Street", "Central Ward, Tanga, Tanzania"],
      href: "https://www.google.com/maps/place/PRIME+AUDITORS/@-5.0712875,39.1006692,16z",
    },
    {
      Icon: Phone,
      label: t("contact.phone"),
      lines: [
        "+255 798 509 683 — " + t("contact.officeHours"),
        "+255 752 401 012 — " + t("contact.available24_7"),
      ],
      href: "tel:+255798509683",
    },
    { Icon: Mail, label: t("contact.email"), lines: ["info@primeauditors.co.tz"], href: "mailto:info@primeauditors.co.tz" },
  ];

  return (
    <>
      <PageHero
        eyebrow={t("contact.title")}
        title={t("contact.subtitle")}
        description={t("contact.description")}
        image={officeFrontDesk.url}
      />

      <section className="section-spacing bg-white">
        <div className="max-w-7xl mx-auto container-padding grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="space-y-8"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-0.5 bg-prime-gold" />
                <span className="section-eyebrow">{t("contact.title")}</span>
              </div>
              <h2 className="text-2xl lg:text-3xl font-serif font-bold text-prime-blue mb-3">
                {t("contact.sendMessage")}
              </h2>
              <p className="text-gray-500 font-open-sans leading-relaxed max-w-md">
                {t("contact.description")}
              </p>
            </div>

            <div className="space-y-4">
              {details.map(({ Icon, label, lines, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="flex gap-4 group p-4 rounded-xl hover:bg-prime-light-grey transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-prime-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-prime-gold/20 transition-colors">
                    <Icon className="w-5 h-5 text-prime-gold" />
                  </div>
                  <div>
                    <div className="font-montserrat font-semibold text-sm text-prime-blue mb-0.5">{label}</div>
                    {lines.map((l) => (
                      <div key={l} className="text-sm text-gray-500 font-open-sans">{l}</div>
                    ))}
                  </div>
                </a>
              ))}
            </div>

            {/* WhatsApp / WeChat card */}
            <div className="bg-prime-light-grey rounded-2xl p-6 border border-gray-100">
              <h4 className="font-montserrat font-semibold text-sm text-prime-blue mb-4 flex items-center gap-2">
                <span className="w-4 h-0.5 bg-prime-gold rounded-full" />
                {t("contact.connectWithUs")}
              </h4>
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="relative w-44 h-44 border-4 border-white rounded-2xl overflow-hidden shadow-lg bg-white">
                    <img
                      src={WECHAT_QR_URL}
                      alt="WeChat QR code for Prime Auditors"
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                  <p className="text-center text-xs text-gray-500 mt-2 font-open-sans">{t("contact.scanWechat")}</p>
                </div>
                <div className="space-y-4 flex-1">
                  <div>
                    <div className="text-sm font-semibold text-prime-blue font-montserrat">{t("contact.wechatNumber")}</div>
                    <div className="text-lg font-bold text-prime-blue">+255 752 401 012</div>
                    <p className="text-xs text-gray-500 font-open-sans mt-1">{t("contact.wechatHint")}</p>
                  </div>
                  <a
                    href="https://wa.me/255752401012?text=Hello%20Prime%20Auditors%2C%20I%20am%20interested%20in%20your%20services."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    {t("contact.whatsappLink")}
                  </a>
                </div>
              </div>
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
                  { day: t("contact.sunday"), hours: t("contact.closed"), active: false },
                ].map(({ day, hours, active }) => (
                  <div key={day} className="flex justify-between items-center">
                    <span className="text-gray-500">{day}</span>
                    <span className={`font-medium ${active ? "text-prime-blue" : "text-gray-400"}`}>{hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form + map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_32px_rgba(15,42,74,0.08)] p-8">
              <h3 className="text-xl font-serif font-bold text-prime-blue mb-6">{t("contact.sendMessage")}</h3>
              <BookingForm />
            </div>

            <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-md h-64">
              <iframe
                title="Prime Auditors location — Tanga, Tanzania"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15935!2d39.1006692!3d-5.0712875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1645faa7ad8cb5d%3A0x14db072dd373b726!2sPRIME%20AUDITORS!5e0!3m2!1sen!2stz!4v1"
                className="w-full h-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Contact;
