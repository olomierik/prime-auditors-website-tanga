import { ArrowLeft, ArrowRight, CheckCircle, Globe, Building2, FileText, Shield, Users, Phone, Mail, MapPin, Award, Briefcase, Scale, Landmark, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";
import primeAuditorsLogo from "@/assets/prime-auditors-logo.jpg";

const ForeignInvestors = () => {
  const navigate = useNavigate();

  const handleGetConsultation = () => {
    navigate('/#contact');
    setTimeout(() => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const registrationSteps = [
    {
      step: "01",
      title: "Initial Consultation & Advisory",
      description: "We assess your business goals, advise on the ideal company structure (LLC, branch, representative office), and outline the regulatory landscape.",
      icon: Users,
    },
    {
      step: "02",
      title: "Company Name Reservation",
      description: "We reserve your preferred company name with BRELA (Business Registrations and Licensing Agency) ensuring compliance with naming regulations.",
      icon: FileText,
    },
    {
      step: "03",
      title: "Preparation of Incorporation Documents",
      description: "Drafting of Memorandum & Articles of Association, shareholder agreements, and all statutory documents required for registration.",
      icon: Briefcase,
    },
    {
      step: "04",
      title: "Company Registration with BRELA",
      description: "Full registration of your company, obtaining the Certificate of Incorporation, and company registration number.",
      icon: Building2,
    },
    {
      step: "05",
      title: "Tax Registration (TRA)",
      description: "Registration with the Tanzania Revenue Authority for TIN, VAT, and all applicable tax obligations for your business type.",
      icon: Landmark,
    },
    {
      step: "06",
      title: "Business Licences & Permits",
      description: "Obtaining all required business licences, sector-specific permits, and regulatory approvals to legally operate in Tanzania.",
      icon: BadgeCheck,
    },
    {
      step: "07",
      title: "Operational Readiness",
      description: "Bank account setup, social security registration (NSSF/WCF), employment permits for foreign staff, and ongoing compliance support.",
      icon: Shield,
    },
  ];

  const whyChooseUs = [
    {
      title: "NBAA Certified Professionals",
      description: "Our team holds recognized certifications ensuring the highest professional standards.",
      icon: Award,
    },
    {
      title: "Deep Local Expertise",
      description: "In-depth knowledge of Tanzanian company law, tax regulations, and bureaucratic processes.",
      icon: Scale,
    },
    {
      title: "End-to-End Support",
      description: "From initial consultation to full operational status — we handle everything.",
      icon: Globe,
    },
    {
      title: "Transparent Pricing",
      description: "No hidden fees. Clear, upfront pricing for every stage of the registration process.",
      icon: Shield,
    },
  ];

  const licencesWeHandle = [
    "Certificate of Incorporation (BRELA)",
    "Tax Identification Number (TIN)",
    "VAT Registration Certificate",
    "Business Licence (Municipal/City Council)",
    "Tanzania Investment Centre (TIC) Certificate",
    "Work Permits & Residence Permits",
    "NSSF & WCF Registration",
    "Sector-Specific Licences (Mining, Tourism, Manufacturing, etc.)",
    "Environmental Impact Assessment (NEMC)",
    "Fire & Safety Compliance Certificate",
    "Import/Export Licences",
    "OSHA Workplace Registration",
  ];

  return (
    <div className="min-h-screen bg-white font-open-sans">
      {/* Header */}
      <header className="bg-gradient-to-r from-prime-blue via-prime-blue/95 to-prime-blue text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 border-2 border-prime-gold rounded-full"></div>
          <div className="absolute bottom-10 right-20 w-60 h-60 border border-prime-gold/50 rounded-full"></div>
          <div className="absolute top-1/2 left-1/3 w-20 h-20 border border-prime-gold/30 rounded-full"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link to="/" className="inline-flex items-center text-prime-gold hover:text-prime-gold/80 mb-8 transition-colors font-montserrat">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-prime-gold/20 p-3 rounded-xl border border-prime-gold/30">
              <Globe className="w-8 h-8 text-prime-gold" />
            </div>
            <Badge className="bg-prime-gold/20 text-prime-gold border-prime-gold/30 font-montserrat text-sm px-4 py-1">
              Foreign Investor Services
            </Badge>
          </div>
          <h1 className="text-4xl lg:text-5xl font-montserrat font-bold mb-6 leading-tight">
            Company Registration <br />
            <span className="text-prime-gold">for Foreign Investors</span> in Tanzania
          </h1>
          <p className="text-xl text-white/85 font-open-sans max-w-3xl leading-relaxed">
            We take you from zero to a fully operational company in Tanzania. Complete business registration, 
            all licences, permits, and regulatory compliance — handled professionally from start to finish.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button 
              onClick={handleGetConsultation}
              className="bg-prime-gold hover:bg-prime-gold/90 text-prime-blue font-montserrat font-semibold px-8 py-4 text-lg transition-all duration-300 hover:scale-105"
              size="lg"
            >
              Get Free Consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <a href="tel:+255798509683">
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-prime-gold text-prime-gold hover:bg-prime-gold hover:text-prime-blue font-montserrat font-semibold px-8 py-4 text-lg transition-all duration-300"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call Us Now
              </Button>
            </a>
          </div>
        </div>
      </header>

      {/* Value Proposition */}
      <section className="py-16 bg-prime-light-grey">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="bg-prime-gold/10 text-prime-gold border-prime-gold/20 font-montserrat mb-4">
              Why Tanzania?
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-montserrat font-bold text-prime-blue mb-6">
              Tanzania — Africa's Emerging Investment Hub
            </h2>
            <p className="text-lg text-gray-600 font-open-sans max-w-3xl mx-auto leading-relaxed">
              With a stable political environment, abundant natural resources, and a rapidly growing economy, 
              Tanzania offers unparalleled opportunities for foreign investors. Let us be your trusted guide.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center p-8">
              <CardContent className="pt-6">
                <div className="text-4xl font-montserrat font-bold text-prime-gold mb-2">6.5%+</div>
                <p className="text-gray-600 font-open-sans">Average Annual GDP Growth</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center p-8">
              <CardContent className="pt-6">
                <div className="text-4xl font-montserrat font-bold text-prime-gold mb-2">65M+</div>
                <p className="text-gray-600 font-open-sans">Population & Growing Market</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center p-8">
              <CardContent className="pt-6">
                <div className="text-4xl font-montserrat font-bold text-prime-gold mb-2">Top 10</div>
                <p className="text-gray-600 font-open-sans">African Investment Destination</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Registration Process */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-prime-gold/10 text-prime-gold border-prime-gold/20 font-montserrat mb-4">
              Our Process
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-montserrat font-bold text-prime-blue mb-6">
              From Zero to Operational — Step by Step
            </h2>
            <p className="text-lg text-gray-600 font-open-sans max-w-2xl mx-auto">
              Our streamlined 7-step process ensures your company is registered and fully operational with all legal requirements met.
            </p>
          </div>

          <div className="space-y-6">
            {registrationSteps.map((item, index) => (
              <div 
                key={index} 
                className="flex gap-6 items-start bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-prime-gold/30 group"
              >
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-prime-blue to-prime-blue/80 flex items-center justify-center text-prime-gold font-montserrat font-bold text-xl group-hover:scale-110 transition-transform duration-300">
                    {item.step}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <item.icon className="w-5 h-5 text-prime-gold" />
                    <h3 className="text-xl font-montserrat font-bold text-prime-blue">{item.title}</h3>
                  </div>
                  <p className="text-gray-600 font-open-sans leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Licences & Permits */}
      <section className="py-20 bg-prime-light-grey">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-prime-gold/10 text-prime-gold border-prime-gold/20 font-montserrat mb-4">
                Complete Compliance
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-montserrat font-bold text-prime-blue mb-6">
                All Licences & Permits Under One Roof
              </h2>
              <p className="text-lg text-gray-600 font-open-sans leading-relaxed mb-8">
                Navigating Tanzania's regulatory landscape can be complex. We handle every licence, 
                permit, and registration your business needs to operate legally and confidently.
              </p>
              <Button 
                onClick={handleGetConsultation}
                className="bg-prime-gold hover:bg-prime-gold/90 text-prime-blue font-montserrat font-semibold px-8 py-4 text-lg transition-all duration-300 hover:scale-105"
                size="lg"
              >
                Request a Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {licencesWeHandle.map((licence, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:border-prime-gold/30 transition-colors"
                >
                  <CheckCircle className="w-5 h-5 text-prime-gold flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-open-sans text-gray-700 font-medium">{licence}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-prime-gold/10 text-prime-gold border-prime-gold/20 font-montserrat mb-4">
              Why Prime Auditors
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-montserrat font-bold text-prime-blue mb-6">
              Your Trusted Partner for Business Setup in Tanzania
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-prime-blue via-prime-blue/95 to-prime-blue text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 border border-prime-gold rounded-full"></div>
          <div className="absolute bottom-0 left-20 w-72 h-72 border border-prime-gold/50 rounded-full"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl lg:text-4xl font-montserrat font-bold mb-6">
            Ready to Start Your Business in <span className="text-prime-gold">Tanzania</span>?
          </h2>
          <p className="text-xl text-white/85 font-open-sans mb-10 leading-relaxed max-w-2xl mx-auto">
            Let our experts handle the entire company registration process while you focus on your business strategy. 
            Get started with a free consultation today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={handleGetConsultation}
              className="bg-prime-gold hover:bg-prime-gold/90 text-prime-blue font-montserrat font-semibold px-10 py-5 text-lg transition-all duration-300 hover:scale-105"
              size="lg"
            >
              Get Free Consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <a href="tel:+255798509683">
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-prime-gold text-prime-gold hover:bg-prime-gold hover:text-prime-blue font-montserrat font-semibold px-10 py-5 text-lg transition-all duration-300 w-full"
              >
                <Phone className="mr-2 h-5 w-5" />
                +255 798 509 683
              </Button>
            </a>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-white/70 text-sm font-open-sans">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-prime-gold" />
              <span>info@primeauditors.co.tz</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-prime-gold" />
              <span>Tanga, Tanzania</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-prime-blue text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <Award className="w-5 h-5 text-prime-gold" />
            <span className="font-montserrat font-semibold">PRIME AUDITORS</span>
            <Badge variant="outline" className="border-prime-gold/50 text-prime-gold text-xs">PF510</Badge>
          </div>
          <div className="text-white/60 font-open-sans text-sm">
            © {new Date().getFullYear()} Prime Auditors. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ForeignInvestors;
