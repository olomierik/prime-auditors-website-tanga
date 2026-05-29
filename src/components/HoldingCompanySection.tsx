import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Building2, TrendingUp, Shield } from "lucide-react";

interface HoldingCompanySectionProps {
  onGetConsultation?: () => void;
}

const HoldingCompanySection = ({ onGetConsultation }: HoldingCompanySectionProps) => {
  const { t } = useTranslation();

  const benefits = [
    { icon: Building2, titleKey: 'holding.adv1Title', descKey: 'holding.adv1Desc' },
    { icon: TrendingUp, titleKey: 'holding.adv2Title', descKey: 'holding.adv2Desc' },
    { icon: Shield, titleKey: 'holding.adv3Title', descKey: 'holding.adv3Desc' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
  };

  return (
    <section className="section-spacing bg-white">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <p className="text-sm font-montserrat font-semibold text-prime-gold tracking-widest uppercase">
                {t('holding.badge')}
              </p>
              <h2 className="text-4xl lg:text-5xl font-serif font-bold text-prime-blue">
                {t('holding.heading1')}
              </h2>
              <p className="text-lg text-gray-600 font-open-sans leading-relaxed">
                {t('holding.intro')}
              </p>
            </div>

            <motion.div
              className="space-y-5"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
            >
              {benefits.map((benefit, i) => {
                const Icon = benefit.icon;
                return (
                  <motion.div key={i} variants={itemVariants} className="flex gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-prime-gold to-prime-gold/80 flex items-center justify-center flex-shrink-0 shadow-gold">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h4 className="font-montserrat font-semibold text-prime-blue mb-2">
                        {t(benefit.titleKey)}
                      </h4>
                      <p className="text-gray-600 font-open-sans">
                        {t(benefit.descKey)}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            <Button
              onClick={onGetConsultation}
              className="bg-prime-blue hover:bg-prime-blue/90 text-white font-montserrat font-semibold px-8 py-6 text-base group w-fit mt-4"
            >
              {t('holding.partnerCta')}
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-premium-lg h-[400px] sm:h-[500px]">
              <img
                src="/office-workspace.jpg"
                alt="Holding Company Services"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-prime-blue/50 via-transparent to-transparent" />
              
              <motion.div
                className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-lg rounded-2xl p-6 shadow-premium"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <p className="text-sm font-montserrat font-semibold text-prime-gold mb-2">
                  {t('holding.servicesBadge')}
                </p>
                <p className="text-prime-blue font-serif font-bold text-lg">
                  {t('holding.servicesHeading')}
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HoldingCompanySection;