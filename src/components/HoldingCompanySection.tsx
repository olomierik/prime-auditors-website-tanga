import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
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
    <section className="section-spacing bg-prime-blue-deep">
      <div className="max-w-[1320px] mx-auto container-padding">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <p className="text-sm font-montserrat font-semibold text-prime-gold tracking-[0.26em] uppercase">
                {t('holding.badge')}
              </p>
              <h2 className="text-4xl lg:text-5xl font-serif font-bold text-white tracking-[-0.02em]">
                {t('holding.heading1')}
              </h2>
              <p className="text-lg text-white/60 font-open-sans leading-relaxed">
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
                    <div className="w-12 h-12 rounded-sm bg-prime-gold/10 border border-prime-gold/25 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-prime-gold" />
                    </div>
                    <div>
                      <h4 className="font-montserrat font-semibold text-white mb-2">
                        {t(benefit.titleKey)}
                      </h4>
                      <p className="text-white/60 font-open-sans">
                        {t(benefit.descKey)}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            <Button
              onClick={onGetConsultation}
              className="bg-prime-gold hover:bg-prime-gold-bright text-prime-blue font-montserrat font-bold uppercase tracking-[0.12em] rounded-none px-8 py-6 text-sm group w-fit mt-4"
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
            <div className="relative overflow-hidden h-[400px] sm:h-[500px] border border-white/10">
              <img
                src="/office-workspace.jpg"
                alt="Holding Company Services"
                className="w-full h-full object-cover"
                style={{ filter: "grayscale(0.15) contrast(1.02)" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-prime-blue-deepest/80 via-transparent to-transparent" />

              <motion.div
                className="absolute bottom-8 left-8 right-8 bg-prime-blue-deepest/85 backdrop-blur-lg border border-white/10 p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <p className="text-sm font-montserrat font-semibold text-prime-gold uppercase tracking-[0.16em] mb-2">
                  {t('holding.servicesBadge')}
                </p>
                <p className="text-white font-serif font-bold text-lg">
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
