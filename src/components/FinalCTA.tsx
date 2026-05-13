import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

const FinalCTA = () => {
  const { locale } = useParams();
  const { t } = useTranslation();
  return (
    <section className="py-20 lg:py-24 bg-prime-off-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl lg:text-4xl font-serif font-semibold text-prime-blue mb-4 leading-tight">
          {t("cta.title")}
        </h2>
        <p className="text-gray-600 font-open-sans mb-8 max-w-2xl mx-auto">{t("cta.description")}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to={`/${locale}/#contact`}>
            <Button size="lg" className="bg-prime-gold hover:bg-prime-gold/90 text-prime-blue font-montserrat font-semibold rounded-sm px-8 w-full sm:w-auto">
              {t("cta.cta1")}
            </Button>
          </Link>
          <Link to={`/${locale}/#contact`}>
            <Button size="lg" variant="outline" className="border-prime-blue text-prime-blue hover:bg-prime-blue hover:text-white font-montserrat font-semibold rounded-sm px-8 w-full sm:w-auto">
              {t("cta.cta2")}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
