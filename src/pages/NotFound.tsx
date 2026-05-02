import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const { t } = useTranslation();
  const { locale } = useParams();
  return (
    <section className="min-h-[60vh] flex items-center justify-center px-4 py-20">
      <div className="text-center max-w-md">
        <div className="text-7xl font-montserrat font-bold text-prime-gold mb-4">404</div>
        <h1 className="text-2xl font-montserrat font-bold text-prime-blue mb-2">
          {t("notFound.title")}
        </h1>
        <p className="text-gray-600 font-open-sans mb-6">{t("notFound.description")}</p>
        <Link to={`/${locale ?? "en"}/`}>
          <Button className="bg-prime-blue hover:bg-prime-blue/90 text-white">
            {t("notFound.goHome")}
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default NotFound;