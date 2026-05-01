'use client';

import { motion } from "framer-motion";
import { useTranslations } from 'next-intl';

const Stats = () => {
  const t = useTranslations();

  const stats = [
    { value: "10+", labelKey: 'stats.years' },
    { value: "100+", labelKey: 'stats.clients' },
    { value: "6", labelKey: 'stats.services' },
    { value: "24/7", labelKey: 'stats.support' },
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
    <section className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {stats.map((stat, i) => (
            <motion.div 
              key={i} 
              variants={itemVariants}
              className="py-6 sm:py-10 px-3 sm:px-6 text-center relative"
            >
              {i < stats.length - 1 && i < 2 && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 h-12 w-px bg-gray-100 hidden sm:block" />
              )}
              <div className="text-2xl sm:text-3xl lg:text-4xl font-montserrat font-bold text-prime-blue bg-gradient-to-r from-prime-blue to-prime-blue/80 bg-clip-text">{stat.value}</div>
              <div className="text-xs sm:text-sm text-gray-500 font-open-sans mt-1">{t(stat.labelKey)}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Stats;
