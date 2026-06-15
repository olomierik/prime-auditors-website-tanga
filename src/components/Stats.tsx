import { motion, useInView } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useRef } from "react";
import { useCountUp } from "@/hooks/useCountUp";

type StatItem = { raw: number; display: string; suffix: string; label: string };

const AnimatedStat = ({ stat, index, inView }: { stat: StatItem; index: number; inView: boolean }) => {
  const count = useCountUp(stat.raw, 1600, inView);
  const display = stat.display === "24/7" ? "24/7" : `${count}${stat.suffix}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      className={`relative flex flex-col items-center justify-center py-10 sm:py-14 px-4 group cursor-default
        ${index < 3 ? "after:absolute after:right-0 after:top-1/4 after:bottom-1/4 after:w-px after:bg-white/8" : ""}`}
    >
      {/* Hover glow */}
      <div className="absolute inset-2 rounded-xl bg-prime-gold/0 group-hover:bg-prime-gold/6 transition-colors duration-500" />

      {/* Value */}
      <div className="relative text-4xl sm:text-5xl font-serif font-bold text-white mb-1 group-hover:text-prime-gold transition-colors duration-300 tabular-nums">
        {display}
      </div>

      {/* Animated gold bar */}
      <motion.div
        className="h-0.5 bg-prime-gold/40 rounded-full mb-2 group-hover:bg-prime-gold transition-colors duration-300"
        initial={{ width: 0 }}
        animate={inView ? { width: 32 } : { width: 0 }}
        transition={{ duration: 0.8, delay: index * 0.12 + 0.4, ease: "easeOut" }}
      />

      {/* Label */}
      <div className="text-[11px] font-montserrat font-medium text-white/40 uppercase tracking-[0.2em] text-center group-hover:text-white/70 transition-colors duration-300">
        {stat.label}
      </div>
    </motion.div>
  );
};

const Stats = () => {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const stats: StatItem[] = [
    { raw: 10, display: "10",   suffix: "+", label: t("stats.years") },
    { raw: 100, display: "100", suffix: "+", label: t("stats.clients") },
    { raw: 6,   display: "6",   suffix: "",  label: t("stats.services") },
    { raw: 0,   display: "24/7", suffix: "", label: t("stats.support") },
  ];

  return (
    <section className="relative bg-[#091929] overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-prime-gold/60 to-transparent" />
      <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-72 h-72 bg-prime-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-72 h-72 bg-prime-blue/30 rounded-full blur-3xl pointer-events-none" />

      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <AnimatedStat key={i} stat={stat} index={i} inView={inView} />
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-prime-gold/30 to-transparent" />
    </section>
  );
};

export default Stats;
