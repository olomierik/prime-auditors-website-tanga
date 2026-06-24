import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Star, Quote } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  initials: string;
  country_flag: string;
  rating: number;
};

const staticFallback: Testimonial[] = [
  { id: "1", quote: "", name: "", role: "", initials: "SJ", country_flag: "🇹🇿", rating: 5 },
  { id: "2", quote: "", name: "", role: "", initials: "MC", country_flag: "🇨🇳", rating: 5 },
  { id: "3", quote: "", name: "", role: "", initials: "AH", country_flag: "🇹🇿", rating: 5 },
];

const Testimonials = () => {
  const { t } = useTranslation();
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (supabase as any)
      .from("testimonials")
      .select("id, quote, name, role, initials, country_flag, rating")
      .order("sort_order", { ascending: true })
      .then(({ data }: { data: Testimonial[] | null }) => {
        if (data && data.length > 0) {
          setItems(data);
        } else {
          // Use i18n static content as fallback
          setItems([
            { id: "1", quote: t("testimonials.quote1"), name: t("testimonials.name1"), role: t("testimonials.role1"), initials: "SJ", country_flag: "🇹🇿", rating: 5 },
            { id: "2", quote: t("testimonials.quote2"), name: t("testimonials.name2"), role: t("testimonials.role2"), initials: "MC", country_flag: "🇨🇳", rating: 5 },
            { id: "3", quote: t("testimonials.quote3"), name: t("testimonials.name3"), role: t("testimonials.role3"), initials: "AH", country_flag: "🇹🇿", rating: 5 },
          ]);
        }
        setLoading(false);
      });
  }, []);

  return (
    <section className="section-spacing bg-[#0a1e35] relative overflow-hidden">
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 1px)`, backgroundSize: "48px 48px" }}
      />

      {/* Glow blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-prime-gold/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-prime-blue/40 rounded-full blur-[120px] pointer-events-none" />

      {/* Top shimmer */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-prime-gold/40 to-transparent" />

      <div className="relative max-w-7xl mx-auto container-padding">

        {/* Section header */}
        <motion.div
          className="text-center mb-16 space-y-4"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3">
            <div className="w-8 h-0.5 bg-prime-gold" />
            <span className="section-eyebrow">{t('testimonials.title')}</span>
            <div className="w-8 h-0.5 bg-prime-gold" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-white">
            {t('testimonials.subtitle')}
          </h2>
          <p className="text-white/45 font-open-sans max-w-xl mx-auto">
            What our clients say about working with Prime Auditors
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-7">
          {loading
            ? [0,1,2].map((i) => (
                <div key={i} className="rounded-2xl border border-white/8 bg-white/[0.04] p-8 animate-pulse space-y-4">
                  <div className="flex gap-1">{[...Array(5)].map((_,j) => <div key={j} className="w-4 h-4 bg-white/10 rounded" />)}</div>
                  <div className="space-y-2"><div className="h-4 bg-white/10 rounded" /><div className="h-4 bg-white/10 rounded w-4/5" /><div className="h-4 bg-white/10 rounded w-3/5" /></div>
                  <div className="flex gap-3 items-center pt-2"><div className="w-11 h-11 rounded-full bg-white/10 flex-shrink-0" /><div className="space-y-1 flex-1"><div className="h-3 bg-white/10 rounded w-1/2" /><div className="h-3 bg-white/10 rounded w-2/3" /></div></div>
                </div>
              ))
            : items.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
            >
              <div className="group relative h-full rounded-2xl border border-white/8 bg-white/[0.04] backdrop-blur-sm p-8 flex flex-col gap-5 hover:border-prime-gold/25 hover:bg-white/[0.07] transition-all duration-300">
                <div className="absolute top-6 right-7 text-prime-gold/10 pointer-events-none">
                  <Quote className="w-16 h-16 fill-current" />
                </div>
                <div className="flex gap-1">
                  {[...Array(item.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-prime-gold text-prime-gold" />
                  ))}
                </div>
                <p className="text-white/80 font-open-sans text-[15px] leading-relaxed flex-1 relative">
                  "{item.quote}"
                </p>
                <div className="w-full h-px bg-white/8" />
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full bg-prime-gold/15 border border-prime-gold/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-prime-gold font-montserrat font-bold text-sm">{item.initials}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-montserrat font-bold text-white text-sm truncate">{item.name}</p>
                      <span className="text-base">{item.country_flag}</span>
                    </div>
                    <p className="text-prime-gold text-xs font-open-sans mt-0.5 truncate">{item.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust strip */}
        <motion.div
          className="mt-16 pt-10 border-t border-white/8 flex flex-wrap items-center justify-center gap-x-10 gap-y-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          {["BRELA Registered", "TIC Accredited", "NBAA Certified — PF510", "Est. Tanga, Tanzania"].map((badge) => (
            <div key={badge} className="flex items-center gap-2 text-xs font-montserrat text-white/35 uppercase tracking-wider">
              <span className="w-1 h-1 rounded-full bg-prime-gold/50" />
              {badge}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
