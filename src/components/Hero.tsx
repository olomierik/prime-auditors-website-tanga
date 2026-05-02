import { motion } from "framer-motion";
import { Award, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const Hero = () => {
  const { t } = useTranslation();
  const { locale } = useParams();

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
    <section className="relative min-h-[60vh] sm:min-h-[70vh] lg:min-h-[85vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src="/hero-bg.jpg" 
          alt="Prime Auditors Hero" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-prime-blue/95 via-prime-blue/85 to-prime-blue/60" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUvNSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-32">
        <motion.div 
          className="max-w-2xl space-y-5 sm:space-y-8"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 sm:px-4 py-1.5 text-[11px] sm:text-xs text-white/90 font-open-sans shadow-lg"
          >
            <Award className="w-3.5 h-3.5 text-prime-gold" />
            {t('hero.badge')}
          </motion.div>
          
          <motion.h1 
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-montserrat font-bold text-white leading-[1.1]"
          >
            {t('hero.title1')}{" "}
            <span className="text-prime-gold">{t('hero.titleHighlight')}</span>
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-base sm:text-lg lg:text-xl text-white/80 font-open-sans leading-relaxed max-w-xl"
          >
            {t('hero.subtitle')}
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link to={`/${locale}/#contact`}>
              <Button size="lg" className="bg-prime-gold hover:bg-prime-gold/90 text-prime-blue font-montserrat font-semibold px-8 text-base w-full sm:w-auto shadow-xl shadow-prime-gold/30 hover:shadow-2xl hover:shadow-prime-gold/40 transition-all group">
                {t('hero.cta1')}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to={`/${locale}/services`}>
              <Button size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 font-montserrat font-semibold px-8 text-base w-full sm:w-auto backdrop-blur-sm transition-all">
                {t('hero.cta2')}
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-full opacity-20 pointer-events-none hidden lg:block">
        <div className="absolute top-20 right-20 w-64 h-64 bg-prime-gold/20 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-40 w-48 h-48 bg-prime-gold/10 rounded-full blur-2xl" />
      </div>
    </section>
  );
};

export default Hero;
