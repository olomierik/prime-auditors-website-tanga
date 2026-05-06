import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import PageHero from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Globe, Shield, TrendingUp, Building2, ArrowRight } from "lucide-react";
import InvestorChat from "@/components/InvestorChat";

const ForeignInvestors = () => {
  const { t } = useTranslation();
  const { locale } = useParams();

  const stats = [
    { value: "6%+", label: t("investors.gdp") },
    { value: "400M+", label: t("investors.market") },
    { value: "#1", label: t("investors.destination") },
    { value: "100%", label: t("investors.ownership") },
  ];

  const benefits = [
    { icon: Globe, title: "Regional Market Access", desc: "Reach EAC and SADC markets through Tanzania." },
    { icon: Shield, title: "Investor Protection", desc: "Strong legal framework and TIC incentives." },
    { icon: TrendingUp, title: "Growing Economy", desc: "One of Africa's fastest-growing economies." },
    { icon: Building2, title: "Full Setup Support", desc: "From BRELA registration to operational launch." },
  ];

  return (
    <>
      <PageHero
        eyebrow={t("investors.title")}
        title={`${t("investors.heading")} ${t("investors.headingHighlight")}`}
        description={t("investors.desc1")}
        image="/office-workspace.jpg"
      />

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {stats.map((s) => (
              <div key={s.label} className="text-center bg-prime-light-grey rounded-2xl p-6">
                <div className="text-3xl lg:text-4xl font-montserrat font-bold text-prime-gold mb-2">{s.value}</div>
                <div className="text-xs sm:text-sm text-gray-600 font-open-sans">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {benefits.map((b) => (
              <Card key={b.title} className="border-0 shadow-md hover:shadow-xl transition-all">
                <CardContent className="p-6 flex gap-5">
                  <div className="w-12 h-12 flex-shrink-0 rounded-xl bg-prime-gold/10 flex items-center justify-center">
                    <b.icon className="w-6 h-6 text-prime-gold" />
                  </div>
                  <div>
                    <h3 className="font-montserrat font-bold text-prime-blue mb-1">{b.title}</h3>
                    <p className="text-sm text-gray-600 font-open-sans">{b.desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <p className="text-gray-600 font-open-sans leading-relaxed max-w-3xl mx-auto text-center mb-8">
            {t("investors.desc2")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={`/${locale}/portal`}>
              <Button size="lg" className="bg-prime-gold hover:bg-prime-gold/90 text-prime-blue font-semibold w-full sm:w-auto">
                Investor Portal <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link to={`/${locale}/services`}>
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                {t("investors.cta1")}
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <InvestorChat />
    </>
  );
};

export default ForeignInvestors;