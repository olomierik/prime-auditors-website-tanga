import { useTranslation } from "react-i18next";
import PageHero from "@/components/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Users, Briefcase, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import officeFrontDesk from "@/assets/office-front-desk.jpg.asset.json";
import officeMeetingRoom from "@/assets/office-meeting-room.jpg.asset.json";
import officeLounge from "@/assets/office-lounge.jpg.asset.json";
import officeConsultingRoom from "@/assets/office-consulting-room.jpg.asset.json";

const NBAA_URL = "https://www.nbaa.go.tz/nbaa-firm-list";

const AboutUs = () => {
  const { t } = useTranslation();

  const team = [
    { name: "CPA Mohammed Ally", role: t("about.team1Role"), bio: t("about.team1Bio"), image: "/team-conference-2.jpg", position: "object-top" },
    { name: "Suzana Godfrey Sawe", role: t("about.team2Role"), bio: t("about.team2Bio"), image: "/team-professional.jpg", position: "object-[50%_15%]" },
    { name: "Erick Elibariki Olomi", role: t("about.team3Role"), bio: t("about.team3Bio"), image: "/team-conference-1.jpg", position: "object-[center_30%]" },
  ];

  const values = [
    { icon: Award, title: t("about.value1Title"), desc: t("about.value1Desc") },
    { icon: Users, title: t("about.value2Title"), desc: t("about.value2Desc") },
    { icon: Briefcase, title: t("about.value3Title"), desc: t("about.value3Desc") },
  ];

  const office = [
    { src: officeFrontDesk.url, alt: "Prime Auditors front desk with client service team in Tanga", span: "sm:col-span-2 sm:row-span-2" },
    { src: officeConsultingRoom.url, alt: "Private client consulting room at Prime Auditors", span: "" },
    { src: officeMeetingRoom.url, alt: "Meeting and audit workspace at Prime Auditors", span: "" },
    { src: officeLounge.url, alt: "Client waiting lounge at the Prime Auditors office", span: "sm:col-span-2" },
  ];

  return (
    <>
      <PageHero eyebrow={t("about.title")} title={t("about.heroTitle")} description={t("about.heroDesc")} image="/office-reception.jpg" />

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-5">
            <p className="text-sm font-montserrat font-semibold text-prime-gold tracking-widest uppercase">{t("about.subtitle")}</p>
            <h2 className="text-3xl lg:text-4xl font-serif font-semibold text-prime-blue">{t("about.storyHeading")}</h2>
            <p className="text-gray-600 font-open-sans leading-relaxed">{t("about.storyP1")}</p>
            <p className="text-gray-600 font-open-sans leading-relaxed">
              {t("about.storyP2Pre")} <strong className="text-prime-blue">PF510</strong>.
            </p>
            <Button asChild className="bg-prime-blue hover:bg-prime-blue/90 text-white">
              <a href={NBAA_URL} target="_blank" rel="noopener noreferrer">
                {t("about.verifyNbaa")} <ExternalLink className="ml-2 w-4 h-4" />
              </a>
            </Button>
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-xl h-[300px] sm:h-[420px]">
            <img src="/nbaa-certificate.jpg" alt="NBAA Certificate of Registration — Prime Auditors Reg. No. PF510" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-prime-light-grey">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-sm font-montserrat font-semibold text-prime-gold tracking-widest uppercase mb-3">{t("about.leadership")}</p>
            <h2 className="text-3xl lg:text-4xl font-serif font-semibold text-prime-blue">{t("about.teamHeading")}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((m) => (
              <Card key={m.name} className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white">
                <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-prime-blue/10 to-prime-gold/10">
                  <img src={m.image} alt={m.name} loading="lazy" className={`w-full h-full object-cover ${m.position} transition-transform duration-700 group-hover:scale-105`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-prime-blue/80 via-prime-blue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute left-0 bottom-0 h-1 w-12 bg-prime-gold group-hover:w-full transition-all duration-500" />
                </div>
                <CardContent className="p-6">
                  <h3 className="font-serif font-semibold text-prime-blue text-lg">{m.name}</h3>
                  <p className="text-prime-gold text-sm font-semibold tracking-wide uppercase mb-3">{m.role}</p>
                  <p className="text-sm text-gray-600 font-open-sans leading-relaxed">{m.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-montserrat font-semibold text-prime-gold tracking-widest uppercase mb-3">Our Office</p>
            <h2 className="text-3xl lg:text-4xl font-serif font-semibold text-prime-blue">Inside Prime Auditors, Tanga</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 auto-rows-[150px] sm:auto-rows-[180px] gap-4">
            {office.map((o) => (
              <div key={o.src} className={`group relative overflow-hidden rounded-2xl shadow-md ${o.span}`}>
                <img src={o.src} alt={o.alt} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-prime-blue/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-prime-light-grey">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-montserrat font-semibold text-prime-gold tracking-widest uppercase mb-3">{t("about.values")}</p>
            <h2 className="text-3xl lg:text-4xl font-serif font-semibold text-prime-blue">{t("about.valuesHeading")}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {values.map((v) => (
              <Card key={v.title} className="border-0 shadow-md hover:shadow-xl transition-all">
                <CardContent className="p-8 text-center">
                  <div className="w-14 h-14 mx-auto rounded-xl bg-prime-gold/10 flex items-center justify-center mb-4">
                    <v.icon className="w-7 h-7 text-prime-gold" />
                  </div>
                  <h3 className="font-serif font-semibold text-prime-blue text-lg mb-2">{v.title}</h3>
                  <p className="text-gray-600 font-open-sans text-sm">{v.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
