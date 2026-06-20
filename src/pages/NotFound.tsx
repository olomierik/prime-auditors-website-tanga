import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Home, ArrowRight, Phone } from "lucide-react";

const NotFound = () => {
  const { t } = useTranslation();
  const { locale } = useParams();
  const loc = locale ?? "en";

  return (
    <section className="min-h-[80vh] flex items-center justify-center bg-prime-light-grey px-4 py-20">
      <div className="text-center max-w-lg">
        {/* Large 404 */}
        <div className="relative mb-6 select-none">
          <div className="text-[10rem] font-serif font-bold text-prime-blue/5 leading-none">404</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-7xl font-serif font-bold text-prime-gold">404</span>
          </div>
        </div>

        <div className="w-16 h-0.5 bg-prime-gold mx-auto mb-6" />

        <h1 className="text-2xl font-serif font-bold text-prime-blue mb-3">
          {t("notFound.title")}
        </h1>
        <p className="text-gray-500 font-open-sans mb-8 leading-relaxed">
          {t("notFound.description")}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to={`/${loc}/`}>
            <button className="inline-flex items-center gap-2 bg-prime-blue hover:bg-prime-blue/90 text-white font-montserrat font-semibold text-sm px-6 py-3 rounded-sm transition-colors w-full sm:w-auto justify-center">
              <Home className="w-4 h-4" /> {t("notFound.goHome")}
            </button>
          </Link>
          <Link to={`/${loc}/services`}>
            <button className="inline-flex items-center gap-2 border border-prime-blue/20 hover:border-prime-blue/50 text-prime-blue font-montserrat font-medium text-sm px-6 py-3 rounded-sm transition-colors w-full sm:w-auto justify-center">
              Our Services <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>

        <a href="tel:+255752401012" className="inline-flex items-center gap-2 mt-8 text-sm text-gray-400 hover:text-prime-gold transition-colors font-open-sans">
          <Phone className="w-4 h-4" /> +255 752 401 012
        </a>
      </div>
    </section>
  );
};

export default NotFound;
