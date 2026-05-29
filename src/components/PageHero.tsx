import { Link, useParams } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  image?: string;
}

const PageHero = ({ eyebrow, title, description, image = "/hero-bg.jpg" }: PageHeroProps) => {
  const { locale } = useParams();

  return (
    <section className="relative min-h-[42vh] sm:min-h-[48vh] flex items-center bg-prime-blue">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <img src={image} alt="" className="w-full h-full object-cover scale-105" />
        <div className="absolute inset-0 bg-gradient-to-r from-prime-blue/95 via-prime-blue/85 to-prime-blue/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-prime-blue/50 to-transparent" />
      </div>

      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{ backgroundImage: `radial-gradient(circle at 1px 1px, rgba(197,160,33,0.8) 1px, transparent 0)`, backgroundSize: "32px 32px" }}
      />

      {/* Gold top accent */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-prime-gold/70 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-28 w-full">
        {/* Back button */}
        <Link
          to={`/${locale}/`}
          className="inline-flex items-center gap-1.5 text-white/50 hover:text-prime-gold text-xs font-montserrat font-medium tracking-wide uppercase transition-colors mb-6 group"
        >
          <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          Back to Home
        </Link>

        <div className="max-w-3xl space-y-5">
          {eyebrow && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-0.5 bg-prime-gold" />
              <span className="section-eyebrow">{eyebrow}</span>
            </div>
          )}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[3.25rem] font-serif font-bold text-white leading-[1.06] tracking-tight">
            {title}
          </h1>
          <div className="w-12 h-[3px] bg-gradient-to-r from-prime-gold to-prime-gold/30 rounded-full" />
          {description && (
            <p className="text-base sm:text-lg text-white/70 font-open-sans leading-relaxed max-w-xl">
              {description}
            </p>
          )}
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/5 to-transparent pointer-events-none" />
    </section>
  );
};

export default PageHero;
