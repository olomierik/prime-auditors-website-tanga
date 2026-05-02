import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import ServicesGrid from "@/components/ServicesGrid";
import BookingForm from "@/components/BookingForm";
import { useTranslation } from "react-i18next";
import { MapPin, Phone, Mail } from "lucide-react";

const Index = () => {
  const { t } = useTranslation();

  return (
    <>
      <Hero />
      <Stats />
      <ServicesGrid />

      {/* Why Us Section */}
      <section className="py-20 lg:py-28 bg-prime-light-grey">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <p className="text-sm font-montserrat font-semibold text-prime-gold tracking-widest uppercase mb-3">{t('why.title')}</p>
              <h2 className="text-3xl lg:text-4xl font-montserrat font-bold text-prime-blue mb-6">
                {t('why.subtitle')}
              </h2>
              <p className="text-gray-600 font-open-sans leading-relaxed mb-8">
                {t('why.description')}
              </p>
              <div className="space-y-5">
                {[
                  { icon: "/prime-auditors-logo.jpg", titleKey: 'why.international', descKey: 'why.internationalDesc' },
                  { icon: "/prime-auditors-logo.jpg", titleKey: 'why.trusted', descKey: 'why.trustedDesc' },
                  { icon: "/prime-auditors-logo.jpg", titleKey: 'why.regulatory', descKey: 'why.regulatoryDesc' },
                  { icon: "/prime-auditors-logo.jpg", titleKey: 'why.professional', descKey: 'why.professionalDesc' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-prime-gold to-prime-gold/80 flex items-center justify-center flex-shrink-0 shadow-lg shadow-prime-gold/20">
                      <div className="w-5 h-5 bg-white rounded-full" />
                    </div>
                    <div>
                      <h4 className="font-montserrat font-semibold text-prime-blue text-sm">{t(item.titleKey)}</h4>
                      <p className="text-sm text-gray-600 font-open-sans mt-0.5">{t(item.descKey)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative mt-8 lg:mt-0">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl h-[300px] sm:h-[400px] lg:h-[500px]">
                <img
                  src="/office-reception.jpg"
                  alt="Prime Auditors Office"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-prime-blue/40 to-transparent" />
              </div>
              <div className="absolute -bottom-4 left-4 sm:-bottom-6 sm:-left-6 bg-gradient-to-br from-prime-blue to-prime-blue/90 text-white p-4 sm:p-6 rounded-xl shadow-2xl max-w-[200px] sm:max-w-[220px]">
                <div className="text-2xl sm:text-3xl font-montserrat font-bold text-prime-gold">NBAA</div>
                <div className="text-[10px] sm:text-xs text-white/80 font-open-sans mt-1">Certified Public Accountants — PF510</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-sm font-montserrat font-semibold text-prime-gold tracking-widest uppercase mb-3">{t('contact.title')}</p>
            <h2 className="text-3xl lg:text-4xl font-montserrat font-bold text-prime-blue mb-4">
              {t('contact.subtitle')}
            </h2>
            <p className="text-gray-600 font-open-sans">
              {t('contact.description')}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-6">
                {[
                  { icon: MapPin, labelKey: 'contact.address', lines: ["Plot 24, Block KB 3, NHC Building Apt 02", "Market Street, Independence Avenue Road", "Central Ward, Tanga City, Tanzania"] },
                  { icon: Phone, labelKey: 'contact.phone', lines: ["+255752401012"] },
                  { icon: Mail, labelKey: 'contact.email', lines: ["info@primeauditors.co.tz"] },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-prime-gold to-prime-gold/80 flex items-center justify-center flex-shrink-0 shadow-lg shadow-prime-gold/20">
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-montserrat font-semibold text-sm text-prime-blue">{t(item.labelKey)}</div>
                      {item.lines.map((line, j) => (
                        <div key={j} className="text-sm text-gray-600 font-open-sans">{line}</div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-br from-prime-light-grey to-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <h4 className="font-montserrat font-semibold text-sm text-prime-blue mb-3">{t('contact.hours')}</h4>
                <div className="space-y-2 text-sm text-gray-600 font-open-sans">
                  <div className="flex justify-between"><span>{t('contact.weekdays')}</span><span className="font-medium text-prime-blue">8:00 AM – 5:00 PM</span></div>
                  <div className="flex justify-between"><span>{t('contact.saturday')}</span><span className="font-medium text-prime-blue">8:30 AM – 1:30 PM</span></div>
                  <div className="flex justify-between"><span>{t('contact.sunday')}</span><span className="font-medium text-gray-400">{t('contact.closed')}</span></div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-xl p-8">
              <h3 className="text-xl font-montserrat font-bold text-prime-blue mb-6">{t('contact.sendMessage')}</h3>
              <BookingForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
