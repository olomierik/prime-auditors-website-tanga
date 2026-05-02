import { useTranslation } from "react-i18next";
import PageHero from "@/components/PageHero";
import ServicesGrid from "@/components/ServicesGrid";
import HoldingCompanySection from "@/components/HoldingCompanySection";
import { useNavigate, useParams } from "react-router-dom";

const Services = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { locale } = useParams();

  return (
    <>
      <PageHero
        eyebrow={t("services.title")}
        title={t("services.subtitle")}
        description={t("services.description")}
      />
      <ServicesGrid />
      <HoldingCompanySection onGetConsultation={() => navigate(`/${locale}/#contact`)} />
    </>
  );
};

export default Services;