import { motion } from "framer-motion";
import { Shield, FileText, Building2, Globe, Briefcase, Calculator, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const ServicesGrid = () => {
  const { t } = useTranslation();
  const { locale } = useParams();

  const services = [
    { icon: Shield, titleKey: 'service.audit', descKey: 'service.auditDesc' },
    { icon: FileText, titleKey: 'service.tax', descKey: 'service.taxDesc' },
    { icon: Building2, titleKey: 'service.registration', descKey: 'service.registrationDesc' },
    { icon: Globe, titleKey: 'service.holding', descKey: 'service.holdingDesc' },
    { icon: Briefcase, titleKey: 'service.corporate', descKey: 'service.corporateDesc' },
    { icon: Calculator, titleKey: 'service.accounting', descKey: 'service.accountingDesc' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-white to-prime-light-grey/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm font-montserrat font-semibold text-prime-gold tracking-widest uppercase mb-3">{t('services.title')}</p>
          <h2 className="text-3xl lg:text-4xl font-montserrat font-bold text-prime-blue mb-4">
            {t('services.subtitle')}
          </h2>
          <p className="text-gray-600 font-open-sans">
            {t('services.description')}
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {services.map((svc, i) => (
            <motion.div key={i} variants={itemVariants}>
              <Card className="group border border-gray-100 shadow-sm hover:shadow-xl hover:border-prime-gold/30 transition-all duration-300 hover:-translate-y-2 h-full bg-white/80 backdrop-blur-sm overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-prime-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <CardContent className="p-8 space-y-4 relative z-10">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-prime-blue to-prime-blue/80 flex items-center justify-center shadow-lg shadow-prime-blue/20 group-hover:shadow-xl group-hover:shadow-prime-blue/30 group-hover:scale-110 transition-all">
                    <svc.icon className="w-6 h-6 text-prime-gold" />
                  </div>
                  <h3 className="text-lg font-montserrat font-bold text-prime-blue">{t(svc.titleKey)}</h3>
                  <p className="text-sm text-gray-600 font-open-sans leading-relaxed">{t(svc.descKey)}</p>
                  <Link to={`/${locale}/services`} className="inline-flex items-center text-sm font-medium text-prime-gold hover:text-prime-blue transition-colors font-montserrat group-hover:underline">
                    {t('services.learnMore')} <ArrowRight className="ml-1 h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
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
