import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const FinalCTA = () => {
  const { t } = useTranslation();
  const { locale } = useParams();

  return (
    <section className="section-spacing bg-gradient-to-r from-prime-blue via-prime-blue to-prime-blue/90 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: `radial-gradient(circle at 1.5px 1.5px, rgba(255,255,255,0.4) 1px, transparent 0)`, backgroundSize: '40px 40px' }} />
      
      <motion.div
        className="max-w-4xl mx-auto container-padding text-center relative space-y-8"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-4xl lg:text-5xl font-serif font-bold text-white leading-tight">
          {t('cta.title')}
        </h2>
        <p className="text-xl text-white/80 font-open-sans max-w-2xl mx-auto">
          {t('cta.description')}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <Link to={`/${locale}/#contact`}>
            <Button className="bg-prime-gold hover:bg-prime-gold/90 text-prime-blue font-montserrat font-semibold px-8 py-6 text-lg group">
              {t('cta.primaryButton')}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link to={`/${locale}/services`}>
            <Button variant="outline" className="border-white text-white hover:bg-white/10 font-montserrat font-semibold px-8 py-6 text-lg">
              {t('cta.secondaryButton')}
            </Button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default FinalCTA;