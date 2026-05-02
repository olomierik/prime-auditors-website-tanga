import { useTranslation } from "react-i18next";
import PageHero from "@/components/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Users, Briefcase, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const team = [
  {
    name: "CPA Mohammed Ally",
    role: "Managing Partner",
    bio: "Over 15 years of experience in auditing, corporate structuring, and regulatory compliance.",
    image: "/team-conference-2.jpg",
    position: "object-top",
  },
  {
    name: "Suzana Godfrey Sawe",
    role: "Assistant Lecturer & Consultant",
    bio: "MSc in Accounting and Finance. Assistant Lecturer at SEKOMU with 15+ years in tax advisory.",
    image: "/team-professional.jpg",
    position: "object-[50%_15%]",
  },
  {
    name: "Erick Elibariki Olomi",
    role: "Senior Consultant",
    bio: "Deep technical expertise in financial management, business advisory, and compliance services.",
    image: "/team-conference-1.jpg",
    position: "object-[center_30%]",
  },
];

const NBAA_URL = "https://onlineservices.nbaa.go.tz/registered_firms/MTE0OA==";

const AboutUs = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageHero
        eyebrow={t("about.title")}
        title="Strategic Accounting & Advisory Partners"
        description="Prime Auditors is a Tanzanian NBAA-certified CPA firm dedicated to helping local and international businesses thrive."
        image="/office-reception.jpg"
      />

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-5">
            <p className="text-sm font-montserrat font-semibold text-prime-gold tracking-widest uppercase">
              {t("about.subtitle")}
            </p>
            <h2 className="text-3xl lg:text-4xl font-montserrat font-bold text-prime-blue">
              Trusted CPAs serving Tanzania and global investors
            </h2>
            <p className="text-gray-600 font-open-sans leading-relaxed">
              Founded by experienced certified public accountants, Prime Auditors combines deep local
              market knowledge with international best practices in audit, tax, and advisory.
            </p>
            <p className="text-gray-600 font-open-sans leading-relaxed">
              We are registered with the National Board of Accountants and Auditors (NBAA) under
              firm number <strong className="text-prime-blue">PF510</strong>.
            </p>
            <Button asChild className="bg-prime-blue hover:bg-prime-blue/90 text-white">
              <a href={NBAA_URL} target="_blank" rel="noopener noreferrer">
                Verify our NBAA registration <ExternalLink className="ml-2 w-4 h-4" />
              </a>
            </Button>
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-xl h-[300px] sm:h-[420px]">
            <img src="/nbaa-certificate.jpg" alt="NBAA Certificate" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-prime-light-grey">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-sm font-montserrat font-semibold text-prime-gold tracking-widest uppercase mb-3">
              {t("about.leadership")}
            </p>
            <h2 className="text-3xl lg:text-4xl font-montserrat font-bold text-prime-blue">
              Meet our team
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((m) => (
              <Card key={m.name} className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all">
                <div className="relative h-72 overflow-hidden bg-gray-100">
                  <img src={m.image} alt={m.name} className={`w-full h-full object-cover ${m.position}`} />
                </div>
                <CardContent className="p-6">
                  <h3 className="font-montserrat font-bold text-prime-blue text-lg">{m.name}</h3>
                  <p className="text-prime-gold text-sm font-medium mb-3">{m.role}</p>
                  <p className="text-sm text-gray-600 font-open-sans">{m.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-montserrat font-semibold text-prime-gold tracking-widest uppercase mb-3">
              {t("about.values")}
            </p>
            <h2 className="text-3xl lg:text-4xl font-montserrat font-bold text-prime-blue">
              What drives us
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Award, title: "Integrity", desc: "Independent, objective and ethical at every step." },
              { icon: Users, title: "Client Focus", desc: "Tailored solutions for measurable business impact." },
              { icon: Briefcase, title: "Expertise", desc: "Certified professionals with deep technical knowledge." },
            ].map((v) => (
              <Card key={v.title} className="border-0 shadow-md hover:shadow-xl transition-all">
                <CardContent className="p-8 text-center">
                  <div className="w-14 h-14 mx-auto rounded-xl bg-prime-gold/10 flex items-center justify-center mb-4">
                    <v.icon className="w-7 h-7 text-prime-gold" />
                  </div>
                  <h3 className="font-montserrat font-bold text-prime-blue text-lg mb-2">{v.title}</h3>
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