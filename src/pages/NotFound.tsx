import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Home, ArrowRight, Phone } from "lucide-react";

const NotFound = () => {
  const { t } = useTranslation();
  const { locale } = useParams();
  const loc = locale ?? "en";

  return (
    <section className="min-h-[80vh] flex items-center justify-center bg-prime-blue-deepest px-4 py-20">
      <div className="text-center max-w-lg">
        {/* Large 404 */}
        <div className="relative mb-6 select-none">
          <div className="text-[10rem] font-serif font-bold text-white/5 leading-none">404</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-7xl font-serif font-bold text-prime-gold">404</span>
          </div>
        </div>

        <div className="w-16 h-px bg-prime-gold mx-auto mb-6" />

        <h1 className="text-2xl font-serif font-bold text-white mb-3">
          {t("notFound.title")}
        </h1>
        <p className="text-white/55 font-open-sans mb-8 leading-relaxed">
          {t("notFound.description")}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to={`/${loc}/`}>
            <button className="inline-flex items-center gap-2 bg-prime-gold hover:bg-prime-gold-bright text-prime-blue font-montserrat font-bold uppercase tracking-[0.1em] text-sm px-6 py-3 transition-colors w-full sm:w-auto justify-center">
              <Home className="w-4 h-4" /> {t("notFound.goHome")}
            </button>
          </Link>
          <Link to={`/${loc}/services`}>
            <button className="inline-flex items-center gap-2 border border-white/20 hover:border-prime-gold/60 text-white font-montserrat font-medium uppercase tracking-[0.1em] text-sm px-6 py-3 transition-colors w-full sm:w-auto justify-center">
              Our Services <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>

        <a href="tel:+255752401012" className="inline-flex items-center gap-2 mt-8 text-sm text-white/40 hover:text-prime-gold transition-colors font-open-sans">
          <Phone className="w-4 h-4" /> +255 752 401 012
        </a>
      </div>
    </section>
  );
};

export default NotFound;
