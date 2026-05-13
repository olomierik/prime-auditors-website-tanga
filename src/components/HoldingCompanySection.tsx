import { ArrowRight, Building2, Globe, Shield, Briefcase, Scale, Landmark, Users, CheckCircle, TrendingUp, MapPin, FileText, Calculator, BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

interface HoldingCompanySectionProps { onGetConsultation: () => void; }

const HoldingCompanySection = ({ onGetConsultation }: HoldingCompanySectionProps) => {
  const { t } = useTranslation();

  const strategicAdvantages = [
    { title: t("holding.adv1Title"), description: t("holding.adv1Desc"), icon: Globe },
    { title: t("holding.adv2Title"), description: t("holding.adv2Desc"), icon: Shield },
    { title: t("holding.adv3Title"), description: t("holding.adv3Desc"), icon: TrendingUp },
    { title: t("holding.adv4Title"), description: t("holding.adv4Desc"), icon: Building2 },
  ];

  const investmentTypes = [
    t("holding.invType1"), t("holding.invType2"), t("holding.invType3"),
    t("holding.invType4"), t("holding.invType5"), t("holding.invType6"), t("holding.invType7"),
  ];

  const tanzaniaAdvantages = [
    { title: t("holding.tz1Title"), description: t("holding.tz1Desc"), icon: Globe },
    { title: t("holding.tz2Title"), description: t("holding.tz2Desc"), icon: Landmark },
    { title: t("holding.tz3Title"), description: t("holding.tz3Desc"), icon: Scale },
    { title: t("holding.tz4Title"), description: t("holding.tz4Desc"), icon: MapPin },
  ];

  const formationServices = [
    { title: t("holding.svc1Title"), description: t("holding.svc1Desc"), icon: Briefcase },
    { title: t("holding.svc2Title"), description: t("holding.svc2Desc"), icon: FileText },
    { title: t("holding.svc3Title"), description: t("holding.svc3Desc"), icon: Calculator },
    { title: t("holding.svc4Title"), description: t("holding.svc4Desc"), icon: Building2 },
    { title: t("holding.svc5Title"), description: t("holding.svc5Desc"), icon: Shield },
    { title: t("holding.svc6Title"), description: t("holding.svc6Desc"), icon: BookOpen },
  ];

  const idealFor = [
    t("holding.ideal1"), t("holding.ideal2"), t("holding.ideal3"), t("holding.ideal4"), t("holding.ideal5"),
  ];

  return (
    <>
      <section className="py-14 sm:py-20 bg-gradient-to-b from-prime-light-grey to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <Badge className="bg-prime-gold/10 text-prime-gold border-prime-gold/20 font-montserrat mb-4">{t("holding.badge")}</Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-semibold text-prime-blue mb-6">
              {t("holding.heading1")} <br className="hidden sm:block" />
              <span className="text-prime-gold">{t("holding.heading2")}</span>
            </h2>
            <p className="text-lg text-gray-600 font-open-sans max-w-3xl mx-auto leading-relaxed">{t("holding.intro")}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 sm:p-8 lg:p-10 max-w-4xl mx-auto">
            <p className="text-gray-600 font-open-sans leading-relaxed mb-4">
              {t("holding.atPrimePre")} <strong className="text-prime-blue">Prime Auditors</strong>{t("holding.atPrimePost")}
            </p>
            <div className="bg-prime-blue/5 rounded-xl p-6 border-l-4 border-prime-gold">
              <p className="text-gray-700 font-open-sans leading-relaxed">{t("holding.definition")}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <Badge className="bg-prime-gold/10 text-prime-gold border-prime-gold/20 font-montserrat mb-4">{t("holding.advantagesBadge")}</Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-semibold text-prime-blue mb-6">{t("holding.advantagesHeading")}</h2>
            <p className="text-lg text-gray-600 font-open-sans max-w-2xl mx-auto">{t("holding.advantagesIntro")}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {strategicAdvantages.map((item, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
                <CardContent className="pt-8 pb-8 px-8">
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 flex-shrink-0 rounded-xl bg-prime-blue/5 flex items-center justify-center group-hover:bg-prime-gold/10 transition-colors duration-300">
                      <item.icon className="w-7 h-7 text-prime-gold" />
                    </div>
                    <div>
                      <h3 className="text-lg font-serif font-semibold text-prime-blue mb-2">{item.title}</h3>
                      <p className="text-gray-600 font-open-sans text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-prime-light-grey rounded-2xl p-5 sm:p-8 lg:p-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-prime-gold/10 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-prime-gold" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-prime-blue">{t("holding.diversification")}</h3>
            </div>
            <p className="text-gray-600 font-open-sans mb-6">{t("holding.diversificationDesc")}</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {investmentTypes.map((type, index) => (
                <div key={index} className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm">
                  <CheckCircle className="w-5 h-5 text-prime-gold flex-shrink-0" />
                  <span className="text-sm font-open-sans text-gray-700 font-medium">{type}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20 bg-prime-light-grey">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <Badge className="bg-prime-gold/10 text-prime-gold border-prime-gold/20 font-montserrat mb-4">{t("holding.tzBadge")}</Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-semibold text-prime-blue mb-6">{t("holding.tzHeading")}</h2>
            <p className="text-lg text-gray-600 font-open-sans max-w-2xl mx-auto">{t("holding.tzIntro")}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {tanzaniaAdvantages.map((item, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-prime-gold/30 group">
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 flex-shrink-0 rounded-xl bg-gradient-to-br from-prime-blue to-prime-blue/80 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="w-7 h-7 text-prime-gold" />
                  </div>
                  <div>
                    <h3 className="text-lg font-serif font-semibold text-prime-blue mb-2">{item.title}</h3>
                    <p className="text-gray-600 font-open-sans text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <Badge className="bg-prime-gold/10 text-prime-gold border-prime-gold/20 font-montserrat mb-4">{t("holding.servicesBadge")}</Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-semibold text-prime-blue mb-6">{t("holding.servicesHeading")}</h2>
            <p className="text-lg text-gray-600 font-open-sans max-w-3xl mx-auto">{t("holding.servicesIntro")}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {formationServices.map((item, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
                <CardContent className="pt-8 pb-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-xl bg-prime-blue/5 flex items-center justify-center group-hover:bg-prime-gold/10 transition-colors duration-300">
                    <item.icon className="w-8 h-8 text-prime-gold" />
                  </div>
                  <h3 className="text-lg font-serif font-semibold text-prime-blue mb-3">{item.title}</h3>
                  <p className="text-gray-600 font-open-sans text-sm leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20 bg-prime-light-grey">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div>
              <Badge className="bg-prime-gold/10 text-prime-gold border-prime-gold/20 font-montserrat mb-4">{t("holding.idealBadge")}</Badge>
              <h2 className="text-3xl font-serif font-semibold text-prime-blue mb-6">{t("holding.idealHeading")}</h2>
              <div className="space-y-3">
                {idealFor.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <div className="w-8 h-8 rounded-lg bg-prime-gold/10 flex items-center justify-center flex-shrink-0">
                      <Users className="w-4 h-4 text-prime-gold" />
                    </div>
                    <span className="text-gray-700 font-open-sans font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-8 border border-gray-100">
              <Badge className="bg-prime-gold/10 text-prime-gold border-prime-gold/20 font-montserrat mb-4">{t("holding.partnerBadge")}</Badge>
              <h2 className="text-2xl font-serif font-semibold text-prime-blue mb-4">{t("holding.partnerHeading")}</h2>
              <p className="text-gray-600 font-open-sans leading-relaxed mb-6">{t("holding.partnerP1")}</p>
              <p className="text-gray-600 font-open-sans leading-relaxed mb-8">{t("holding.partnerP2")}</p>
              <Button onClick={onGetConsultation} className="bg-prime-gold hover:bg-prime-gold/90 text-prime-blue font-montserrat font-semibold px-8 py-4 text-lg transition-all duration-300 hover:scale-105" size="lg">
                {t("holding.partnerCta")}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HoldingCompanySection;
