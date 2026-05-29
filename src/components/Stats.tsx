import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';

const Stats = () => {
  const { t } = useTranslation();

  const stats = [
    { value: "10+",  label: t('stats.years'),    suffix: "" },
    { value: "100+", label: t('stats.clients'),  suffix: "" },
    { value: "6",    label: t('stats.services'), suffix: "" },
    { value: "24/7", label: t('stats.support'),  suffix: "" },
  ];

  return (
    <section className="relative bg-[#091929] overflow-hidden">
      {/* Top gold shimmer line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-prime-gold/60 to-transparent" />

      {/* Background glow blobs */}
      <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-72 h-72 bg-prime-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-72 h-72 bg-prime-blue/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55 } } }}
              className={`relative flex flex-col items-center justify-center py-10 sm:py-12 px-4 group
                ${i < stats.length - 1 ? 'after:absolute after:right-0 after:top-1/4 after:bottom-1/4 after:w-px after:bg-white/8' : ''}`}
            >
              {/* Hover bg */}
              <div className="absolute inset-2 rounded-xl bg-prime-gold/0 group-hover:bg-prime-gold/5 transition-colors duration-300" />

              {/* Value */}
              <div className="relative text-4xl sm:text-5xl font-serif font-bold text-white mb-1 group-hover:text-prime-gold transition-colors duration-300">
                {stat.value}
              </div>

              {/* Gold accent bar */}
              <div className="w-8 h-0.5 bg-prime-gold/40 group-hover:w-12 group-hover:bg-prime-gold transition-all duration-300 mb-2 rounded-full" />

              {/* Label */}
              <div className="text-[11px] font-montserrat font-medium text-white/40 uppercase tracking-[0.2em] text-center">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom gold shimmer line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-prime-gold/30 to-transparent" />
    </section>
  );
};

export default Stats;
