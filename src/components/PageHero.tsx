import { useTranslation } from "react-i18next";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  image?: string;
}

const PageHero = ({ eyebrow, title, description, image = "/hero-bg.jpg" }: PageHeroProps) => {
  return (
    <section className="relative min-h-[36vh] sm:min-h-[42vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={image} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-prime-blue/95 via-prime-blue/85 to-prime-blue/70" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="max-w-2xl space-y-4">
          {eyebrow && (
            <p className="text-xs sm:text-sm font-montserrat font-semibold text-prime-gold tracking-widest uppercase">
              {eyebrow}
            </p>
          )}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-montserrat font-bold text-white leading-tight">
            {title}
          </h1>
          {description && (
            <p className="text-base sm:text-lg text-white/85 font-open-sans leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default PageHero;