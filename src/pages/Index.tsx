import { ArrowRight, Phone, Mail, MapPin, CheckCircle, Award, TrendingUp, Shield, Globe, Users, Briefcase, Building2, Calculator, FileText, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import GoogleMap from "@/components/GoogleMap";
import heroBg from "@/assets/hero-bg.jpg";
import officeReception from "@/assets/office-reception.jpg";

const Index = () => {
  const [formData, setFormData] = useState({ name: "", email: "", company: "", message: "" });

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.tanzapages.com/gadgets/v2/17130/s';
    script.async = true;
    document.body.appendChild(script);
    return () => { if (document.body.contains(script)) document.body.removeChild(script); };
  }, []);

  const services = [
    { icon: Shield, title: "Audit & Assurance", desc: "Independent auditing and assurance services that build stakeholder confidence in your financial reporting." },
    { icon: FileText, title: "Tax Advisory", desc: "Strategic tax planning, compliance, and advisory services to optimize your tax position." },
    { icon: Building2, title: "Business Registration", desc: "Complete company registration, licensing, and regulatory setup for local and foreign businesses." },
    { icon: Globe, title: "Holding Company Formation", desc: "International holding company structures for global investors entering African markets." },
    { icon: Briefcase, title: "Corporate Structuring", desc: "Optimal corporate structures aligned with your international investment strategy." },
    { icon: Calculator, title: "Accounting & Payroll", desc: "End-to-end accounting, bookkeeping, payroll processing, and financial statement preparation." },
  ];

  const whyChooseUs = [
    { icon: Globe, title: "International Business Expertise", desc: "Deep experience advising multinational clients and foreign investors across diverse sectors." },
    { icon: Award, title: "Trusted Advisory Services", desc: "NBAA certified professionals delivering services that meet the highest international standards." },
    { icon: Shield, title: "Strong Regulatory Knowledge", desc: "Comprehensive understanding of Tanzanian tax law, corporate regulations, and compliance requirements." },
    { icon: Users, title: "Professional Accounting & Tax Experts", desc: "A dedicated team of CPAs with decades of combined experience across auditing, tax, and consulting." },
  ];

  const stats = [
    { value: "10+", label: "Years of Experience" },
    { value: "100+", label: "Satisfied Clients" },
    { value: "6", label: "Core Service Areas" },
    { value: "24/7", label: "Client Support" },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] sm:min-h-[70vh] lg:min-h-[85vh] flex items-center">
        <div className="absolute inset-0">
          <img src={heroBg} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-prime-blue/95 via-prime-blue/85 to-prime-blue/60" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-32">
          <div className="max-w-2xl space-y-5 sm:space-y-8">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 sm:px-4 py-1.5 text-[11px] sm:text-xs text-white/90 font-open-sans">
              <Award className="w-3.5 h-3.5 text-prime-gold" />
              NBAA Certified • Tanga, Tanzania
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-montserrat font-bold text-white leading-[1.1]">
              Strategic Accounting, Tax and Advisory Services for{" "}
              <span className="text-prime-gold">Global Investors</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-white/80 font-open-sans leading-relaxed max-w-xl">
              Supporting businesses and investors across Tanzania and Africa with world-class financial expertise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/#contact">
                <Button size="lg" className="bg-prime-gold hover:bg-prime-gold/90 text-prime-blue font-montserrat font-semibold px-8 text-base w-full sm:w-auto">
                  Book Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/services">
                <Button size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 font-montserrat font-semibold px-8 text-base w-full sm:w-auto">
                  Explore Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-gray-100">
            {stats.map((stat, i) => (
              <div key={i} className="py-6 sm:py-10 px-3 sm:px-6 text-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-montserrat font-bold text-prime-blue">{stat.value}</div>
                <div className="text-xs sm:text-sm text-gray-500 font-open-sans mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-sm font-montserrat font-semibold text-prime-gold tracking-widest uppercase mb-3">Our Services</p>
            <h2 className="text-3xl lg:text-4xl font-montserrat font-bold text-prime-blue mb-4">
              Comprehensive Financial Solutions
            </h2>
            <p className="text-gray-600 font-open-sans">
              We offer a full range of professional services designed to drive your business success.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc, i) => (
              <Card key={i} className="group border border-gray-100 shadow-sm hover:shadow-xl hover:border-prime-gold/30 transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-8 space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-prime-blue/5 flex items-center justify-center group-hover:bg-prime-gold/10 transition-colors">
                    <svc.icon className="w-6 h-6 text-prime-gold" />
                  </div>
                  <h3 className="text-lg font-montserrat font-bold text-prime-blue">{svc.title}</h3>
                  <p className="text-sm text-gray-600 font-open-sans leading-relaxed">{svc.desc}</p>
                  <Link to="/services" className="inline-flex items-center text-sm font-medium text-prime-gold hover:text-prime-blue transition-colors font-montserrat">
                    Learn More <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 lg:py-28 bg-prime-light-grey">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-sm font-montserrat font-semibold text-prime-gold tracking-widest uppercase mb-3">Why Choose Us</p>
              <h2 className="text-3xl lg:text-4xl font-montserrat font-bold text-prime-blue mb-6">
                Trusted by Businesses Across Tanzania and Beyond
              </h2>
              <p className="text-gray-600 font-open-sans leading-relaxed mb-8">
                Prime Auditors combines deep local market knowledge with international best practices, delivering exceptional value through certified professionals committed to your success.
              </p>
              <div className="space-y-5">
                {whyChooseUs.map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-prime-gold/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <item.icon className="w-5 h-5 text-prime-gold" />
                    </div>
                    <div>
                      <h4 className="font-montserrat font-semibold text-prime-blue text-sm">{item.title}</h4>
                      <p className="text-sm text-gray-600 font-open-sans mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img
                src={officeReception}
                alt="Prime Auditors Office"
                className="rounded-2xl shadow-2xl w-full h-[500px] object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-prime-blue text-white p-6 rounded-xl shadow-xl max-w-[200px]">
                <a href="https://www.nbaa.go.tz/nbaa-firm-details/MTE0OA==/show" target="_blank" rel="noopener noreferrer" className="hover:opacity-90">
                  <div className="text-2xl font-montserrat font-bold text-prime-gold">NBAA</div>
                  <div className="text-xs text-white/80 font-open-sans mt-1">Certified Public Accountants — PF510</div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* International Investors Section */}
      <section className="py-20 lg:py-28 bg-prime-blue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <p className="text-sm font-montserrat font-semibold text-prime-gold tracking-widest uppercase">International Investors</p>
              <h2 className="text-3xl lg:text-4xl font-montserrat font-bold leading-tight">
                Tanzania: Your Gateway to <span className="text-prime-gold">African Markets</span>
              </h2>
              <p className="text-white/75 font-open-sans leading-relaxed">
                Tanzania offers unparalleled opportunities for foreign investors with stable governance, abundant resources, and access to over 400 million consumers through regional trade blocs including the EAC and SADC.
              </p>
              <p className="text-white/75 font-open-sans leading-relaxed">
                We guide international investors through company registration, holding company formation, licensing, tax registration, and full operational setup — from zero to operational.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link to="/foreign-investors">
                  <Button size="lg" className="bg-prime-gold hover:bg-prime-gold/90 text-prime-blue font-montserrat font-semibold px-8 w-full sm:w-auto">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/#contact">
                  <Button size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 font-montserrat font-semibold px-8 w-full sm:w-auto">
                    Schedule Consultation
                  </Button>
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "6.5%+", label: "Average GDP Growth" },
                { value: "65M+", label: "Growing Market" },
                { value: "Top 10", label: "African Investment Destination" },
                { value: "100%", label: "Foreign Ownership Allowed" },
              ].map((stat, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center hover:bg-white/15 transition-colors">
                  <div className="text-2xl font-montserrat font-bold text-prime-gold">{stat.value}</div>
                  <div className="text-xs text-white/70 font-open-sans mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Client Trust Section */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-sm font-montserrat font-semibold text-prime-gold tracking-widest uppercase mb-3">Client Trust</p>
            <h2 className="text-3xl lg:text-4xl font-montserrat font-bold text-prime-blue mb-4">
              What Our Clients Say
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              { quote: "Prime Auditors transformed our financial processes. Their expertise in tax planning saved us significant costs while ensuring full compliance.", name: "Sarah Johnson", role: "CEO, TechStart Ltd" },
              { quote: "Professional, reliable, and incredibly knowledgeable. The audit process was smooth and their recommendations improved our financial controls.", name: "Michael Chen", role: "Finance Director, Global Trade Co" },
              { quote: "Their management consulting services helped us streamline operations and improve profitability. Highly recommended for any growing business.", name: "Amina Hassan", role: "MD, Coastal Enterprises" },
            ].map((t, i) => (
              <Card key={i} className="border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8 space-y-5">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-prime-gold text-prime-gold" />
                    ))}
                  </div>
                  <p className="text-gray-700 font-open-sans text-sm leading-relaxed italic">"{t.quote}"</p>
                  <div className="pt-3 border-t border-gray-100">
                    <div className="font-montserrat font-semibold text-sm text-prime-blue">{t.name}</div>
                    <div className="text-xs text-gray-500 font-open-sans">{t.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* TanzaPages Reviews */}
          <div className="flex justify-center">
            <div id="gbd_review_box_s"></div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-24 bg-prime-light-grey">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-montserrat font-bold text-prime-blue mb-4">
            Ready to Start Your Investment in Tanzania?
          </h2>
          <p className="text-gray-600 font-open-sans text-lg mb-8 max-w-2xl mx-auto">
            Let our experts guide you through every step — from registration to operational success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/#contact">
              <Button size="lg" className="bg-prime-gold hover:bg-prime-gold/90 text-prime-blue font-montserrat font-semibold px-10 text-base w-full sm:w-auto">
                Schedule Consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/#contact">
              <Button size="lg" variant="outline" className="border-2 border-prime-blue text-prime-blue hover:bg-prime-blue hover:text-white font-montserrat font-semibold px-10 text-base w-full sm:w-auto">
                Contact Our Team
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-sm font-montserrat font-semibold text-prime-gold tracking-widest uppercase mb-3">Get In Touch</p>
            <h2 className="text-3xl lg:text-4xl font-montserrat font-bold text-prime-blue mb-4">
              Contact Us
            </h2>
            <p className="text-gray-600 font-open-sans">
              Reach out for a consultation and discover how we can help your business thrive.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="space-y-6">
                {[
                  { icon: MapPin, label: "Office Address", lines: ["Plot 24, Block KB 3, NHC Building Apt 02", "Market Street, Independence Avenue Road", "Central Ward, Tanga City, Tanzania"] },
                  { icon: Phone, label: "Phone", lines: ["+255 798 509 683"] },
                  { icon: Mail, label: "Email", lines: ["info@primeauditors.co.tz"] },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-prime-gold/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-prime-gold" />
                    </div>
                    <div>
                      <div className="font-montserrat font-semibold text-sm text-prime-blue">{item.label}</div>
                      {item.lines.map((line, j) => (
                        <div key={j} className="text-sm text-gray-600 font-open-sans">{line}</div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-prime-light-grey p-6 rounded-xl">
                <h4 className="font-montserrat font-semibold text-sm text-prime-blue mb-3">Business Hours</h4>
                <div className="space-y-2 text-sm text-gray-600 font-open-sans">
                  <div className="flex justify-between"><span>Monday – Friday</span><span className="font-medium">8:00 AM – 5:00 PM</span></div>
                  <div className="flex justify-between"><span>Saturday</span><span className="font-medium">8:30 AM – 1:30 PM</span></div>
                  <div className="flex justify-between"><span>Sunday</span><span className="font-medium text-gray-400">Closed</span></div>
                </div>
              </div>

              <GoogleMap />
            </div>

            <Card className="border border-gray-100 shadow-sm">
              <CardContent className="p-8">
                <h3 className="text-xl font-montserrat font-bold text-prime-blue mb-6">Send us a Message</h3>
                <form className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-montserrat font-medium text-prime-blue mb-1.5">Full Name</label>
                      <Input placeholder="John Doe" className="border-gray-200 focus:border-prime-gold" />
                    </div>
                    <div>
                      <label className="block text-xs font-montserrat font-medium text-prime-blue mb-1.5">Email</label>
                      <Input type="email" placeholder="john@example.com" className="border-gray-200 focus:border-prime-gold" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-montserrat font-medium text-prime-blue mb-1.5">Company</label>
                    <Input placeholder="Your Company Name" className="border-gray-200 focus:border-prime-gold" />
                  </div>
                  <div>
                    <label className="block text-xs font-montserrat font-medium text-prime-blue mb-1.5">Message</label>
                    <Textarea placeholder="Tell us about your needs..." rows={4} className="border-gray-200 focus:border-prime-gold" />
                  </div>
                  <Button className="w-full bg-prime-blue hover:bg-prime-blue/90 text-white font-montserrat font-semibold">
                    Send Message <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
