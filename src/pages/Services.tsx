import { CheckCircle, Calculator, FileText, Shield, TrendingUp, Phone, ArrowRight, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import nbaaCertificate from "@/assets/nbaa-certificate.jpg";
import teamConference1 from "@/assets/team-conference-1.jpg";
import teamConference2 from "@/assets/team-conference-2.jpg";
import teamProfessional from "@/assets/team-professional.jpg";
import SEO from '@/components/SEO';

const Services = () => {
  const navigate = useNavigate();

  const handleGetConsultation = () => {
    navigate('/#contact');
  };

  const serviceCategories = [
    {
      emoji: "🧾",
      title: "Accounting Services",
      tagline: "Accurate. Timely. Compliant.",
      description: "We offer end-to-end accounting solutions tailored to your business needs — ensuring your financial records are always accurate, up to date, and fully compliant with regulatory standards.",
      icon: Calculator,
      items: [
        { title: "Bookkeeping & General Ledger Maintenance", desc: "Day-to-day financial record-keeping for clarity and accountability." },
        { title: "Preparation of Financial Statements", desc: "Professionally compiled balance sheets, income statements, and cash flow statements in line with IFRS." },
        { title: "Payroll Services", desc: "Timely and confidential payroll processing with tax and benefit compliance." },
        { title: "Fixed Asset Management", desc: "Track and depreciate assets accurately to reflect their value and tax implications." },
      ],
      cta: "We help you stay focused on growth while we handle the numbers.",
    },
    {
      emoji: "💰",
      title: "Tax Services",
      tagline: "Plan Smart. Pay Right. Stay Compliant.",
      description: "Taxation can be complex — we simplify it. Whether you're a small business, large enterprise, or NGO, we ensure full compliance with Tanzanian tax laws while identifying savings opportunities.",
      icon: FileText,
      items: [
        { title: "Tax Planning & Advisory", desc: "Strategic guidance to minimize liabilities and maximize efficiency." },
        { title: "Filing of Returns", desc: "Preparation and submission of accurate tax returns (VAT, PAYE, Withholding, Income Tax)." },
        { title: "Tax Health Checks", desc: "Identify risks and ensure compliance before audits strike." },
        { title: "Representation with TRA", desc: "We liaise with the Tanzania Revenue Authority on your behalf during assessments or disputes." },
      ],
      cta: "Stay ahead of tax deadlines and reduce risk with our proactive approach.",
    },
    {
      emoji: "✅",
      title: "Auditing and Assurance",
      tagline: "Transparent, Ethical, and Independent.",
      description: "As a certified auditing firm by NBAA, we conduct thorough audits that go beyond compliance — delivering insights that enhance financial credibility and decision-making.",
      icon: Shield,
      items: [
        { title: "Statutory Audits", desc: "Annual financial audits to meet legal and regulatory obligations." },
        { title: "Internal Audits", desc: "Ongoing assessments to evaluate your systems, controls, and risk management." },
        { title: "Forensic Audits", desc: "Detect fraud, misconduct, or discrepancies with expert reporting." },
        { title: "Review & Compilation Services", desc: "Limited assurance engagements for smaller entities or projects." },
      ],
      cta: "We provide clarity, build stakeholder trust, and ensure transparency.",
    },
    {
      emoji: "🧠",
      title: "Management Consulting",
      tagline: "Strategic Thinking for Sustainable Growth.",
      description: "We help you make smarter decisions, improve operations, and navigate complex business challenges. Whether you're scaling, restructuring, or rethinking strategy — we're your growth partner.",
      icon: TrendingUp,
      items: [
        { title: "Business Planning & Feasibility Studies", desc: "Market analysis, financial forecasts, and investor-ready plans." },
        { title: "Financial Management Advisory", desc: "Budgeting, cash flow management, and capital structuring." },
        { title: "Internal Control Systems Design", desc: "Strong systems that protect assets and prevent fraud." },
        { title: "Organizational Development", desc: "Advice on structure, staffing, policies, and performance metrics." },
      ],
      cta: "Turn challenges into opportunities with our hands-on advisory support.",
    },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-prime-blue py-14 sm:py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-montserrat font-semibold text-prime-gold tracking-widest uppercase mb-4">Our Services</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-montserrat font-bold text-white mb-6">
            Professional Financial Services
          </h1>
          <p className="text-lg text-white/75 max-w-2xl mx-auto font-open-sans">
            Comprehensive solutions designed to drive your business success — delivered by NBAA certified professionals.
          </p>
        </div>
      </section>

      {/* Services Content */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {serviceCategories.map((svc, index) => (
            <Card key={index} className="border border-gray-100 shadow-sm overflow-hidden">
              <CardContent className="p-0">
              <div className={`grid lg:grid-cols-2 gap-0 ${index % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''}`}>
                  <div className="bg-prime-light-grey p-6 sm:p-10 lg:p-12 flex items-center justify-center">
                    <div className="w-20 h-20 sm:w-28 sm:h-28 bg-white rounded-2xl shadow-lg flex items-center justify-center">
                      <svc.icon className="w-10 h-10 sm:w-14 sm:h-14 text-prime-gold" />
                    </div>
                  </div>
                  <div className="p-6 sm:p-8 lg:p-12 space-y-4 sm:space-y-6">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-3xl">{svc.emoji}</span>
                        <h2 className="text-2xl font-montserrat font-bold text-prime-blue">{svc.title}</h2>
                      </div>
                      <p className="text-prime-gold font-montserrat font-semibold text-sm">{svc.tagline}</p>
                    </div>
                    <p className="text-gray-600 font-open-sans text-sm leading-relaxed">{svc.description}</p>
                    <div className="space-y-3">
                      {svc.items.map((item, i) => (
                        <div key={i} className="flex gap-3">
                          <CheckCircle className="w-4 h-4 text-prime-gold mt-1 flex-shrink-0" />
                          <div>
                            <span className="font-montserrat font-medium text-prime-blue text-sm">{item.title}</span>
                            <span className="text-gray-500 font-open-sans text-sm"> — {item.desc}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="bg-prime-gold/5 p-4 rounded-lg border-l-3 border-prime-gold">
                      <p className="text-prime-blue font-montserrat font-medium text-sm">{svc.cta}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Foreign Investors CTA */}
          <Link to="/foreign-investors" className="block">
            <div className="bg-prime-blue rounded-2xl p-8 lg:p-10 flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-xl transition-shadow group">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-xl bg-prime-gold/20 flex items-center justify-center">
                  <Globe className="w-7 h-7 text-prime-gold" />
                </div>
                <div>
                  <h3 className="text-lg font-montserrat font-bold text-white">Foreign Investor? Start Your Business in Tanzania</h3>
                  <p className="text-white/60 font-open-sans text-sm mt-1">Complete company registration, all licences & permits — from zero to operational.</p>
                </div>
              </div>
              <Button className="bg-prime-gold hover:bg-prime-gold/90 text-prime-blue font-montserrat font-semibold flex-shrink-0">
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Link>
        </div>
      </section>

      {/* Team Gallery */}
      <section className="py-16 lg:py-20 bg-prime-light-grey">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-montserrat font-semibold text-prime-gold tracking-widest uppercase mb-3">Our Team</p>
            <h2 className="text-3xl font-montserrat font-bold text-prime-blue mb-4">
              Professional Development & Global Exposure
            </h2>
            <p className="text-gray-600 font-open-sans max-w-2xl mx-auto text-sm">
              Our team continuously invests in professional development, attending international conferences and training programs.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { img: teamConference1, label: "International Conference Participation" },
              { img: teamConference2, label: "Global Training Programs" },
              { img: teamProfessional, label: "Professional Excellence" },
            ].map((item, i) => (
              <div key={i} className="relative overflow-hidden rounded-xl shadow-lg group">
                <img src={item.img} alt={item.label} className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-prime-blue/70 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <p className="text-white font-montserrat font-semibold text-sm">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NBAA Certificate */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="bg-prime-gold/10 text-prime-gold border-prime-gold/20 font-montserrat">NBAA Certified</Badge>
              <h2 className="text-3xl font-montserrat font-bold text-prime-blue">Officially Registered Audit Firm</h2>
              <p className="text-gray-600 font-open-sans leading-relaxed">
                Prime Auditors is officially certified and registered with the National Board of Accountants and Auditors (NBAA) Tanzania under registration number <span className="font-semibold text-prime-gold">PF510</span>.
              </p>
              <a href="https://www.nbaa.go.tz/nbaa-firm-details/MTE0OA==/show" target="_blank" rel="noopener noreferrer">
                <Button className="bg-prime-gold hover:bg-prime-gold/90 text-prime-blue font-montserrat font-semibold">
                  Verify Our Registration
                </Button>
              </a>
            </div>
            <div className="flex justify-center">
              <img src={nbaaCertificate} alt="NBAA Certificate PF510" className="max-w-md w-full rounded-lg shadow-2xl border-4 border-prime-gold/20" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-prime-blue text-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl font-montserrat font-bold">Ready to Get Started?</h2>
          <p className="text-white/75 font-open-sans text-lg max-w-2xl mx-auto">
            Contact us today for a consultation and discover how our professional services can help your business thrive.
          </p>
          <Button onClick={handleGetConsultation} size="lg" className="bg-prime-gold hover:bg-prime-gold/90 text-prime-blue font-montserrat font-semibold px-8">
            <Phone className="mr-2 h-4 w-4" />
            Get a Free Consultation
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
