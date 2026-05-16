import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const ServicesGrid = () => {
  const { t } = useTranslation();

  const services = [
    { titleKey: 'services.service1Title', descKey: 'services.service1Desc', icon: '📊' },
    { titleKey: 'services.service2Title', descKey: 'services.service2Desc', icon: '💼' },
    { titleKey: 'services.service3Title', descKey: 'services.service3Desc', icon: '📋' },
    { titleKey: 'services.service4Title', descKey: 'services.service4Desc', icon: '🎯' },
    { titleKey: 'services.service5Title', descKey: 'services.service5Desc', icon: '🌍' },
    { titleKey: 'services.service6Title', descKey: 'services.service6Desc', icon: '✓' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section className="section-spacing bg-gradient-to-b from-white via-prime-light-grey to-white">
      <div className="max-w-7xl mx-auto container-padding">
        <motion.div
          className="text-center mb-16 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-montserrat font-semibold text-prime-gold tracking-widest uppercase">
            {t('services.eyebrow')}
          </p>
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-prime-blue">
            {t('services.gridTitle')}
          </h2>
          <p className="text-lg text-gray-600 font-open-sans max-w-2xl mx-auto">
            {t('services.gridDescription')}
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {services.map((service, i) => (
            <motion.div key={i} variants={itemVariants}>
              <Card className="card-hover border-0 bg-white shadow-premium h-full">
                <CardContent className="p-8 space-y-4">
                  <div className="text-5xl">{service.icon}</div>
                  <h3 className="text-xl font-serif font-bold text-prime-blue">
                    {t(service.titleKey)}
                  </h3>
                  <p className="text-gray-600 font-open-sans leading-relaxed">
                    {t(service.descKey)}
                  </p>
                  <div className="pt-4 flex items-center text-prime-gold font-montserrat font-semibold group">
                    {t('common.learnMore')}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesGrid;