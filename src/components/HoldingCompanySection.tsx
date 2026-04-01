import { ArrowRight, Building2, Globe, Shield, Briefcase, Scale, Landmark, Users, CheckCircle, TrendingUp, MapPin, FileText, Calculator, BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface HoldingCompanySectionProps {
  onGetConsultation: () => void;
}

const HoldingCompanySection = ({ onGetConsultation }: HoldingCompanySectionProps) => {
  const strategicAdvantages = [
    {
      title: "Centralized Global Ownership",
      description: "Own multiple businesses and investments through a single parent entity. This simplifies corporate governance and strategic decision-making while maintaining control across different markets.",
      icon: Globe,
    },
    {
      title: "Asset Protection",
      description: "Separate operational companies from the parent holding company to isolate risk and protect core assets from liabilities associated with individual businesses.",
      icon: Shield,
    },
    {
      title: "Efficient International Expansion",
      description: "A holding company registered in Tanzania can legally own subsidiaries and assets in multiple jurisdictions, including companies in Africa, Europe, the Middle East, and Asia.",
      icon: TrendingUp,
    },
    {
      title: "Scalable Corporate Structure",
      description: "As investors expand into new markets, additional subsidiaries can be added under the holding structure without restructuring the entire corporate group.",
      icon: Building2,
    },
  ];

  const investmentTypes = [
    "Operating companies",
    "Real estate portfolios",
    "Mining and natural resource projects",
    "Logistics and infrastructure companies",
    "Technology startups",
    "Intellectual property assets",
    "Regional investment subsidiaries",
  ];

  const tanzaniaAdvantages = [
    {
      title: "Gateway to African Markets",
      description: "Access to more than 400 million consumers through regional economic blocs such as the East African Community (EAC) and the Southern African Development Community (SADC).",
      icon: Globe,
    },
    {
      title: "Political and Economic Stability",
      description: "Tanzania has maintained a stable political environment and consistent economic growth, making it an attractive destination for long-term investments.",
      icon: Landmark,
    },
    {
      title: "Investor-Friendly Legal Framework",
      description: "Foreign investors can fully own companies in Tanzania, and corporate structures are flexible enough to support complex international investment strategies.",
      icon: Scale,
    },
    {
      title: "Strategic Geographic Location",
      description: "Located along the Indian Ocean, Tanzania serves as a key trade and logistics gateway connecting African markets with Europe, the Middle East, and Asia.",
      icon: MapPin,
    },
  ];

  const formationServices = [
    {
      title: "Corporate Structuring Advisory",
      description: "We design optimal holding structures that align with your international investment strategy.",
      icon: Briefcase,
    },
    {
      title: "Company Incorporation",
      description: "Full company registration with Business Registrations and Licensing Agency (BRELA) including shareholder structuring and legal documentation.",
      icon: FileText,
    },
    {
      title: "International Tax Planning",
      description: "Advisory on tax-efficient investment structures and cross-border compliance.",
      icon: Calculator,
    },
    {
      title: "Subsidiary Structuring",
      description: "Establishing and organizing operating companies under the holding company structure.",
      icon: Building2,
    },
    {
      title: "Regulatory Compliance",
      description: "Support with regulatory filings, reporting obligations, and corporate governance.",
      icon: Shield,
    },
    {
      title: "Accounting, Audit & Corporate Secretarial Services",
      description: "Ongoing financial management, statutory audits, and compliance support.",
      icon: BookOpen,
    },
  ];

  const idealFor = [
    "International investors entering African markets",
    "European entrepreneurs expanding into Africa",
    "Multinational groups managing regional subsidiaries",
    "Investment funds building African portfolios",
    "High-net-worth individuals structuring global assets",
  ];

  return (
    <>
      {/* Holding Company Hero */}
      <section className="py-14 sm:py-20 bg-gradient-to-b from-prime-light-grey to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <Badge className="bg-prime-gold/10 text-prime-gold border-prime-gold/20 font-montserrat mb-4">
              Holding Company Formation
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-montserrat font-bold text-prime-blue mb-6">
              Tanzania Holding Company Formation <br className="hidden sm:block" />
              <span className="text-prime-gold">for Global Investors</span>
            </h2>
            <p className="text-lg text-gray-600 font-open-sans max-w-3xl mx-auto leading-relaxed">
              Tanzania is rapidly becoming one of the most strategic investment hubs in Africa. Through its strong economic growth, 
              expanding infrastructure, and access to regional markets, the country offers an excellent base for international investors 
              seeking to structure and manage investments across Africa and globally.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 lg:p-10 max-w-4xl mx-auto">
            <p className="text-gray-600 font-open-sans leading-relaxed mb-4">
              At <strong className="text-prime-blue">Prime Auditors</strong>, we specialize in assisting foreign investors, multinational groups, and global entrepreneurs 
              in establishing Tanzania-based holding companies designed to control, manage, and expand international investments.
            </p>
            <div className="bg-prime-blue/5 rounded-xl p-6 border-l-4 border-prime-gold">
              <p className="text-gray-700 font-open-sans leading-relaxed">
                A <strong>holding company</strong> is a corporate entity created primarily to own shares, assets, and subsidiaries, 
                allowing investors to manage multiple businesses under one centralized structure. This structure is widely used by 
                global investment groups, multinational corporations, and high-net-worth individuals to manage cross-border investments efficiently.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Advantages */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-prime-gold/10 text-prime-gold border-prime-gold/20 font-montserrat mb-4">
              Strategic Advantages
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-montserrat font-bold text-prime-blue mb-6">
              Why Global Investors Choose a Holding Company Structure
            </h2>
            <p className="text-lg text-gray-600 font-open-sans max-w-2xl mx-auto">
              A properly structured holding company provides several strategic advantages for international investors.
            </p>
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
                      <h3 className="text-lg font-montserrat font-bold text-prime-blue mb-2">{item.title}</h3>
                      <p className="text-gray-600 font-open-sans text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Investment Diversification */}
          <div className="bg-prime-light-grey rounded-2xl p-8 lg:p-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-prime-gold/10 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-prime-gold" />
              </div>
              <h3 className="text-xl font-montserrat font-bold text-prime-blue">Investment Diversification</h3>
            </div>
            <p className="text-gray-600 font-open-sans mb-6">
              Holding companies can manage a wide range of investments, including:
            </p>
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

      {/* Tanzania as Strategic Hub */}
      <section className="py-20 bg-prime-light-grey">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-prime-gold/10 text-prime-gold border-prime-gold/20 font-montserrat mb-4">
              Why Tanzania
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-montserrat font-bold text-prime-blue mb-6">
              Tanzania as a Strategic Investment Hub
            </h2>
            <p className="text-lg text-gray-600 font-open-sans max-w-2xl mx-auto">
              Tanzania provides several advantages for international investors establishing holding companies.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {tanzaniaAdvantages.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-prime-gold/30 group"
              >
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 flex-shrink-0 rounded-xl bg-gradient-to-br from-prime-blue to-prime-blue/80 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="w-7 h-7 text-prime-gold" />
                  </div>
                  <div>
                    <h3 className="text-lg font-montserrat font-bold text-prime-blue mb-2">{item.title}</h3>
                    <p className="text-gray-600 font-open-sans text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formation Services */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-prime-gold/10 text-prime-gold border-prime-gold/20 font-montserrat mb-4">
              Our Services
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-montserrat font-bold text-prime-blue mb-6">
              Our Holding Company Formation Services
            </h2>
            <p className="text-lg text-gray-600 font-open-sans max-w-3xl mx-auto">
              We provide a complete range of services designed to support international investors establishing holding structures in Tanzania.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {formationServices.map((item, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
                <CardContent className="pt-8 pb-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-xl bg-prime-blue/5 flex items-center justify-center group-hover:bg-prime-gold/10 transition-colors duration-300">
                    <item.icon className="w-8 h-8 text-prime-gold" />
                  </div>
                  <h3 className="text-lg font-montserrat font-bold text-prime-blue mb-3">{item.title}</h3>
                  <p className="text-gray-600 font-open-sans text-sm leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Ideal For + Trusted Partner */}
      <section className="py-20 bg-prime-light-grey">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Ideal For */}
            <div>
              <Badge className="bg-prime-gold/10 text-prime-gold border-prime-gold/20 font-montserrat mb-4">
                Ideal For
              </Badge>
              <h2 className="text-3xl font-montserrat font-bold text-prime-blue mb-6">
                Ideal for International Investors
              </h2>
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

            {/* Trusted Partner */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <Badge className="bg-prime-gold/10 text-prime-gold border-prime-gold/20 font-montserrat mb-4">
                Your Partner
              </Badge>
              <h2 className="text-2xl font-montserrat font-bold text-prime-blue mb-4">
                Your Trusted Investment Advisory Partner in Africa
              </h2>
              <p className="text-gray-600 font-open-sans leading-relaxed mb-6">
                With deep expertise in corporate structuring, taxation, and regulatory compliance, Prime Auditors serves as a 
                trusted partner for investors seeking to establish and manage investment structures in Tanzania.
              </p>
              <p className="text-gray-600 font-open-sans leading-relaxed mb-8">
                We combine local expertise with international business standards to ensure that our clients establish structures 
                that are secure, compliant, and built for long-term global expansion.
              </p>
              <Button
                onClick={onGetConsultation}
                className="bg-prime-gold hover:bg-prime-gold/90 text-prime-blue font-montserrat font-semibold px-8 py-4 text-lg transition-all duration-300 hover:scale-105"
                size="lg"
              >
                Start Your Holding Company
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
