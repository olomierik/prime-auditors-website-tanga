import { ArrowRight, CheckCircle, Globe, Building2, FileText, Shield, Users, Phone, Mail, MapPin, Award, Briefcase, Scale, Landmark, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import HoldingCompanySection from "@/components/HoldingCompanySection";

const ForeignInvestors = () => {
  const navigate = useNavigate();

  const handleGetConsultation = () => {
    navigate('/#contact');
  };

  const registrationSteps = [
    { step: "01", title: "Initial Consultation & Advisory", description: "We assess your business goals, advise on the ideal company structure (LLC, branch, representative office), and outline the regulatory landscape.", icon: Users },
    { step: "02", title: "Company Name Reservation", description: "We reserve your preferred company name with BRELA ensuring compliance with naming regulations.", icon: FileText },
    { step: "03", title: "Preparation of Incorporation Documents", description: "Drafting of Memorandum & Articles of Association, shareholder agreements, and all statutory documents.", icon: Briefcase },
    { step: "04", title: "Company Registration with BRELA", description: "Full registration, obtaining the Certificate of Incorporation and company registration number.", icon: Building2 },
    { step: "05", title: "Tax Registration (TRA)", description: "Registration with the Tanzania Revenue Authority for TIN, VAT, and all applicable tax obligations.", icon: Landmark },
    { step: "06", title: "Business Licences & Permits", description: "Obtaining all required business licences, sector-specific permits, and regulatory approvals.", icon: BadgeCheck },
    { step: "07", title: "Operational Readiness", description: "Bank account setup, social security registration, employment permits, and ongoing compliance support.", icon: Shield },
  ];

  const licencesWeHandle = [
    "Certificate of Incorporation (BRELA)", "Tax Identification Number (TIN)", "VAT Registration Certificate",
    "Business Licence (Municipal/City Council)", "Tanzania Investment Centre (TIC) Certificate", "Work Permits & Residence Permits",
    "NSSF & WCF Registration", "Sector-Specific Licences", "Environmental Impact Assessment (NEMC)",
    "Fire & Safety Compliance Certificate", "Import/Export Licences", "OSHA Workplace Registration",
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-prime-blue py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-40 h-40 border-2 border-prime-gold rounded-full" />
          <div className="absolute bottom-10 right-20 w-60 h-60 border border-prime-gold/50 rounded-full" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <p className="text-sm font-montserrat font-semibold text-prime-gold tracking-widest uppercase mb-4">Foreign Investor Services</p>
            <h1 className="text-4xl lg:text-5xl font-montserrat font-bold text-white mb-6 leading-tight">
              Company Registration <br />
              <span className="text-prime-gold">for Foreign Investors</span> in Tanzania
            </h1>
            <p className="text-lg text-white/75 font-open-sans max-w-2xl leading-relaxed mb-8">
              We take you from zero to a fully operational company in Tanzania. Complete business registration,
              all licences, permits, and regulatory compliance — handled professionally from start to finish.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={handleGetConsultation} size="lg" className="bg-prime-gold hover:bg-prime-gold/90 text-prime-blue font-montserrat font-semibold px-8">
                Get Free Consultation <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <a href="tel:+255798509683">
                <Button variant="outline" size="lg" className="border-2 border-white/30 text-white hover:bg-white/10 font-montserrat font-semibold px-8 w-full sm:w-auto">
                  <Phone className="mr-2 h-4 w-4" /> Call Us Now
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Tanzania Stats */}
      <section className="py-16 bg-prime-light-grey">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-montserrat font-semibold text-prime-gold tracking-widest uppercase mb-3">Why Tanzania</p>
            <h2 className="text-3xl lg:text-4xl font-montserrat font-bold text-prime-blue mb-4">
              Africa's Emerging Investment Hub
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { value: "6.5%+", label: "Average Annual GDP Growth" },
              { value: "65M+", label: "Population & Growing Market" },
              { value: "Top 10", label: "African Investment Destination" },
            ].map((stat, i) => (
              <div key={i} className="bg-white rounded-xl p-8 text-center shadow-sm border border-gray-100">
                <div className="text-3xl font-montserrat font-bold text-prime-gold mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600 font-open-sans">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Process */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-montserrat font-semibold text-prime-gold tracking-widest uppercase mb-3">Our Process</p>
            <h2 className="text-3xl lg:text-4xl font-montserrat font-bold text-prime-blue mb-4">
              From Zero to Operational — Step by Step
            </h2>
          </div>
          <div className="space-y-4">
            {registrationSteps.map((item, index) => (
              <div key={index} className="flex gap-5 items-start bg-white rounded-xl p-6 border border-gray-100 hover:border-prime-gold/30 hover:shadow-md transition-all duration-300 group">
                <div className="w-14 h-14 rounded-xl bg-prime-blue flex items-center justify-center text-prime-gold font-montserrat font-bold text-lg flex-shrink-0 group-hover:scale-105 transition-transform">
                  {item.step}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <item.icon className="w-4 h-4 text-prime-gold" />
                    <h3 className="font-montserrat font-bold text-prime-blue">{item.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 font-open-sans">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Licences */}
      <section className="py-20 bg-prime-light-grey">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm font-montserrat font-semibold text-prime-gold tracking-widest uppercase mb-3">Complete Compliance</p>
              <h2 className="text-3xl font-montserrat font-bold text-prime-blue mb-4">All Licences & Permits Under One Roof</h2>
              <p className="text-gray-600 font-open-sans leading-relaxed mb-6">
                Navigating Tanzania's regulatory landscape can be complex. We handle every licence, permit, and registration your business needs.
              </p>
              <Button onClick={handleGetConsultation} className="bg-prime-gold hover:bg-prime-gold/90 text-prime-blue font-montserrat font-semibold px-8" size="lg">
                Request a Quote <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {licencesWeHandle.map((licence, i) => (
                <div key={i} className="flex items-start gap-3 bg-white rounded-lg p-3 border border-gray-100">
                  <CheckCircle className="w-4 h-4 text-prime-gold flex-shrink-0 mt-0.5" />
                  <span className="text-xs font-open-sans text-gray-700 font-medium">{licence}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-montserrat font-semibold text-prime-gold tracking-widest uppercase mb-3">Why Prime Auditors</p>
            <h2 className="text-3xl font-montserrat font-bold text-prime-blue">Your Trusted Partner for Business Setup</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Award, title: "NBAA Certified", desc: "Highest professional standards." },
              { icon: Scale, title: "Deep Local Expertise", desc: "In-depth Tanzanian regulatory knowledge." },
              { icon: Globe, title: "End-to-End Support", desc: "From consultation to operational status." },
              { icon: Shield, title: "Transparent Pricing", desc: "No hidden fees, clear pricing." },
            ].map((item, i) => (
              <Card key={i} className="border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                <CardContent className="pt-8 pb-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-prime-blue/5 flex items-center justify-center group-hover:bg-prime-gold/10 transition-colors">
                    <item.icon className="w-6 h-6 text-prime-gold" />
                  </div>
                  <h3 className="font-montserrat font-bold text-prime-blue text-sm mb-2">{item.title}</h3>
                  <p className="text-xs text-gray-600 font-open-sans">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Holding Company Section */}
      <HoldingCompanySection onGetConsultation={handleGetConsultation} />

      {/* CTA */}
      <section className="py-20 bg-prime-blue text-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl font-montserrat font-bold">
            Ready to Start Your Business in <span className="text-prime-gold">Tanzania</span>?
          </h2>
          <p className="text-white/75 font-open-sans text-lg max-w-2xl mx-auto">
            Let our experts handle the entire process while you focus on your business strategy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={handleGetConsultation} size="lg" className="bg-prime-gold hover:bg-prime-gold/90 text-prime-blue font-montserrat font-semibold px-10">
              Get Free Consultation <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <a href="tel:+255798509683">
              <Button variant="outline" size="lg" className="border-2 border-white/30 text-white hover:bg-white/10 font-montserrat font-semibold px-10 w-full sm:w-auto">
                <Phone className="mr-2 h-4 w-4" /> +255 798 509 683
              </Button>
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ForeignInvestors;
