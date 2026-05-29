import { motion } from "framer-motion";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  image?: string;
}

const PageHero = ({ eyebrow, title, description, image = "/hero-bg.jpg" }: PageHeroProps) => {
  return (
    <section className="relative min-h-[42vh] sm:min-h-[48vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={image} alt="" className="w-full h-full object-cover scale-105" />
        <div className="absolute inset-0 bg-gradient-to-r from-prime-blue/97 via-prime-blue/88 to-prime-blue/65" />
        <div className="absolute inset-0 bg-gradient-to-t from-prime-blue/60 to-transparent" />
      </div>

      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{ backgroundImage: `radial-gradient(circle at 1px 1px, rgba(197,160,33,0.8) 1px, transparent 0)`, backgroundSize: "32px 32px" }}
      />

      {/* Gold top accent */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-prime-gold/70 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-28">
        <motion.div
          className="max-w-3xl space-y-5"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {eyebrow && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-0.5 bg-prime-gold" />
              <span className="section-eyebrow">{eyebrow}</span>
            </div>
          )}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[3.25rem] font-serif font-bold text-white leading-[1.06] tracking-tight">
            {title}
          </h1>
          {eyebrow && (
            <div className="w-12 h-[3px] bg-gradient-to-r from-prime-gold to-prime-gold/30 rounded-full" />
          )}
          {description && (
            <p className="text-base sm:text-lg text-white/70 font-open-sans leading-relaxed max-w-xl">
              {description}
            </p>
          )}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/5 to-transparent pointer-events-none" />
    </section>
  );
};

export default PageHero;
