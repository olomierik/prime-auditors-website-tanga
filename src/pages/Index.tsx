import { ArrowRight, Users, Phone, Mail, MapPin, CheckCircle, Award, TrendingUp, Shield, Menu, X, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import GoogleMap from "@/components/GoogleMap";
import primeAuditorsLogo from "@/assets/prime-auditors-logo.jpg";
import officeReception from "@/assets/office-reception.jpg";
import officeWorkspace from "@/assets/office-workspace.jpg";

const Index = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Load TanzaPages review script
    const script = document.createElement('script');
    script.src = 'https://www.tanzapages.com/gadgets/v2/17130/s';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handleGetConsultation = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const AnimatedText = ({ text, className = "" }: { text: string; className?: string }) => {
    return (
      <div className={`inline-block ${className}`}>
        {text.split('').map((char, index) => (
          <span
            key={index}
            className="inline-block animate-bounce"
            style={{
              animationDelay: `${index * 0.1}s`,
              animationDuration: '2s',
              animationIterationCount: 'infinite'
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white font-open-sans">
      {/* Modern Navigation */}
      <nav className="bg-gradient-to-r from-prime-blue via-prime-blue/95 to-prime-blue text-white shadow-2xl sticky top-0 z-50 border-b-4 border-prime-gold">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo Section */}
            <div className="flex items-center space-x-4 animate-slide-in-left">
              <img 
                src={primeAuditorsLogo} 
                alt="Prime Auditors Logo" 
                className="h-16 w-auto"
              />
              <div className="flex flex-col">
                <a 
                  href="https://www.nbaa.go.tz/nbaa-firm-details/1148/show"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Badge variant="outline" className="self-start mt-1 text-xs border-prime-gold text-prime-gold bg-prime-gold/10 hover:bg-prime-gold/20 transition-colors cursor-pointer">
                    NBAA Reg: PF510
                  </Badge>
                </a>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8 animate-fade-in">
              <a href="#about" className="text-white/90 hover:text-prime-gold transition-all duration-300 font-medium text-lg hover:scale-105">About</a>
              <Link to="/services" className="text-white/90 hover:text-prime-gold transition-all duration-300 font-medium text-lg hover:scale-105">Services</Link>
              <Link to="/foreign-investors" className="text-white/90 hover:text-prime-gold transition-all duration-300 font-medium text-lg hover:scale-105 flex items-center gap-1">
                <Globe className="w-4 h-4" />
                Foreign Investors
              </Link>
              <a href="#testimonials" className="text-white/90 hover:text-prime-gold transition-all duration-300 font-medium text-lg hover:scale-105">Testimonials</a>
              <a href="#contact" className="text-white/90 hover:text-prime-gold transition-all duration-300 font-medium text-lg hover:scale-105">Contact</a>
            </div>

            {/* CTA and Mobile Menu */}
            <div className="flex items-center space-x-4">
              <Button 
                className="bg-prime-gold hover:bg-prime-gold/90 text-prime-blue font-montserrat font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fade-in"
                onClick={handleGetConsultation}
              >
                <Phone className="w-4 h-4 mr-2" />
                Get Consultation
              </Button>
              
              {/* Mobile Menu Button */}
              <button
                className="lg:hidden p-2 rounded-md hover:bg-prime-gold/20 transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden py-6 border-t border-prime-gold/20 animate-fade-in">
              <div className="flex flex-col space-y-4">
                <a href="#about" className="text-white/90 hover:text-prime-gold transition-colors font-medium text-lg py-2">About</a>
                <Link to="/services" className="text-white/90 hover:text-prime-gold transition-colors font-medium text-lg py-2">Services</Link>
                <Link to="/foreign-investors" className="text-white/90 hover:text-prime-gold transition-colors font-medium text-lg py-2 flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  Foreign Investors
                </Link>
                <a href="#testimonials" className="text-white/90 hover:text-prime-gold transition-colors font-medium text-lg py-2">Testimonials</a>
                <a href="#contact" className="text-white/90 hover:text-prime-gold transition-colors font-medium text-lg py-2">Contact</a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Enhanced Hero Section */}
      <section className="relative bg-gradient-to-br from-prime-light-grey via-white to-prime-light-grey py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-prime-blue/5 to-prime-gold/5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 animate-fade-in-up">
              <div className="space-y-6">
                <a 
                  href="https://www.nbaa.go.tz/nbaa-firm-details/1148/show"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Badge className="bg-prime-gold text-prime-blue border-prime-gold font-montserrat text-sm px-4 py-2 hover:bg-prime-gold/90 transition-colors cursor-pointer">
                    🏆 NBAA Certified • Tanga, Tanzania
                  </Badge>
                </a>
                <h1 className="text-5xl lg:text-7xl font-montserrat font-bold leading-tight text-prime-blue">
                  Your Trusted Partner in{" "}
                  <span className="text-prime-gold bg-gradient-to-r from-prime-gold to-prime-gold/80 bg-clip-text text-transparent">
                    Financial Excellence
                  </span>
                </h1>
                <p className="text-xl text-gray-700 leading-relaxed font-open-sans max-w-2xl">
                  Professional accounting, auditing, and consulting services designed to drive your business success. 
                  Certified expertise you can trust with over a decade of experience.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-6">
                <Button 
                  size="lg" 
                  className="bg-prime-blue text-white hover:bg-prime-blue/90 font-montserrat font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 px-8 py-4 text-lg"
                  onClick={handleGetConsultation}
                >
                  <Phone className="mr-3 h-5 w-5" />
                  Request a Consultation
                  <ArrowRight className="ml-3 h-5 w-5" />
                </Button>
                <Link to="/services">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-2 border-prime-gold text-prime-gold hover:bg-prime-gold hover:text-prime-blue font-montserrat font-semibold transition-all duration-300 hover:scale-105 px-8 py-4 text-lg w-full"
                  >
                    View Our Services
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative animate-slide-in-left">
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-prime-gold/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-prime-blue/10 rounded-full blur-xl"></div>
              <img
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop"
                alt="Professional business meeting"
                className="rounded-2xl shadow-2xl border-4 border-prime-gold/30 relative z-10 hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-20 bg-gradient-to-r from-prime-blue via-prime-blue/95 to-prime-blue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-montserrat font-bold mb-4">Why Choose Prime Auditors?</h2>
            <p className="text-white/80 text-lg font-open-sans">Proven track record of excellence and trust</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center animate-fade-in-up bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="w-20 h-20 bg-prime-gold rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Award className="w-10 h-10 text-prime-blue" />
              </div>
              <a 
                href="https://www.nbaa.go.tz/nbaa-firm-details/1148/show"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:scale-105 transition-transform cursor-pointer"
              >
                <div className="text-4xl font-montserrat font-bold text-prime-gold mb-2">NBAA</div>
                <div className="text-white/90 font-open-sans">Certified Professionals</div>
              </a>
            </div>
            <div className="text-center animate-fade-in-up bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="w-20 h-20 bg-prime-gold rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <TrendingUp className="w-10 h-10 text-prime-blue" />
              </div>
              <div className="text-4xl font-montserrat font-bold text-prime-gold mb-2">100+</div>
              <div className="text-white/90 font-open-sans">Satisfied Clients</div>
            </div>
            <div className="text-center animate-fade-in-up bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="w-20 h-20 bg-prime-gold rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Shield className="w-10 h-10 text-prime-blue" />
              </div>
              <div className="text-4xl font-montserrat font-bold text-prime-gold mb-2">10+</div>
              <div className="text-white/90 font-open-sans">Years Experience</div>
            </div>
            <div className="text-center animate-fade-in-up bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="w-20 h-20 bg-prime-gold rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <CheckCircle className="w-10 h-10 text-prime-blue" />
              </div>
              <div className="text-4xl font-montserrat font-bold text-prime-gold mb-2">24/7</div>
              <div className="text-white/90 font-open-sans">Professional Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-slide-in-left space-y-6">
              <div className="relative overflow-hidden rounded-2xl shadow-xl border-4 border-prime-gold/20 group">
                <img
                  src={officeReception}
                  alt="Prime Auditors Office Reception"
                  className="w-full h-64 object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-prime-blue/20 to-transparent"></div>
              </div>
              <div className="relative overflow-hidden rounded-2xl shadow-xl border-4 border-prime-gold/20 group">
                <img
                  src={officeWorkspace}
                  alt="Prime Auditors Office Workspace"
                  className="w-full h-64 object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-prime-blue/20 to-transparent"></div>
              </div>
            </div>
            <div className="space-y-6 animate-fade-in-up">
              <div>
                <Badge className="bg-prime-gold/10 text-prime-gold border-prime-gold/20 mb-4 font-montserrat">About Prime Auditors</Badge>
                <h2 className="text-3xl lg:text-4xl font-montserrat font-bold text-prime-blue mb-6">
                  Excellence in Financial Services Since Our Founding
                </h2>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed font-open-sans">
                Prime Auditors is a leading accounting and auditing firm based in Tanga, Tanzania. 
                We are proud to be{" "}
                <a 
                  href="https://www.nbaa.go.tz/nbaa-firm-details/1148/show"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-prime-gold hover:text-prime-gold/80 font-semibold underline cursor-pointer transition-colors"
                >
                  certified by the National Board of Accountants and Auditors (NBAA)
                </a>
                , ensuring our clients receive services that meet the highest professional standards.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed font-open-sans">
                Our mission is to provide comprehensive financial solutions that empower businesses 
                to make informed decisions, achieve compliance, and drive sustainable growth. We combine 
                deep local market knowledge with international best practices.
              </p>
              <div className="grid grid-cols-2 gap-6 mt-8">
                <a 
                  href="https://www.nbaa.go.tz/nbaa-firm-details/1148/show"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-center p-6 bg-prime-light-grey rounded-lg shadow-sm border-l-4 border-prime-gold hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="text-2xl font-montserrat font-bold text-prime-blue">NBAA</div>
                  <div className="text-sm text-gray-600 font-open-sans">Certified</div>
                </a>
                <div className="text-center p-6 bg-prime-light-grey rounded-lg shadow-sm border-l-4 border-prime-gold">
                  <div className="text-2xl font-montserrat font-bold text-prime-blue">Tanga</div>
                  <div className="text-sm text-gray-600 font-open-sans">Tanzania</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-prime-light-grey">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <Badge className="bg-prime-gold/10 text-prime-gold border-prime-gold/20 mb-4 font-montserrat">Our Services</Badge>
            <h2 className="text-3xl lg:text-4xl font-montserrat font-bold text-prime-blue mb-6">
              Comprehensive Financial Solutions
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto font-open-sans">
              We offer a full range of professional services to meet all your financial needs
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="group hover:shadow-xl transition-all duration-500 border-0 shadow-lg hover:-translate-y-2 animate-fade-in-up bg-white">
              <CardContent className="p-8 space-y-4">
                <div className="w-16 h-16 bg-prime-gold/10 rounded-lg flex items-center justify-center group-hover:bg-prime-gold transition-colors duration-300">
                  <div className="w-8 h-8 bg-prime-gold rounded group-hover:bg-white transition-colors duration-300"></div>
                </div>
                <h3 className="text-xl font-montserrat font-bold text-prime-blue">Accounting Services</h3>
                <p className="text-gray-600 font-open-sans">
                  Complete bookkeeping, financial statement preparation, and ongoing accounting support 
                  to keep your business financially organized.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-500 border-0 shadow-lg hover:-translate-y-2 animate-fade-in-up bg-white">
              <CardContent className="p-8 space-y-4">
                <div className="w-16 h-16 bg-prime-gold/10 rounded-lg flex items-center justify-center group-hover:bg-prime-gold transition-colors duration-300">
                  <div className="w-8 h-8 bg-prime-gold rounded group-hover:bg-white transition-colors duration-300"></div>
                </div>
                <h3 className="text-xl font-montserrat font-bold text-prime-blue">Tax Services</h3>
                <p className="text-gray-600 font-open-sans">
                  Expert tax planning, preparation, and compliance services to minimize your tax burden 
                  while ensuring full regulatory compliance.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-500 border-0 shadow-lg hover:-translate-y-2 animate-fade-in-up bg-white">
              <CardContent className="p-8 space-y-4">
                <div className="w-16 h-16 bg-prime-gold/10 rounded-lg flex items-center justify-center group-hover:bg-prime-gold transition-colors duration-300">
                  <div className="w-8 h-8 bg-prime-gold rounded group-hover:bg-white transition-colors duration-300"></div>
                </div>
                <h3 className="text-xl font-montserrat font-bold text-prime-blue">Auditing & Assurance</h3>
                <p className="text-gray-600 font-open-sans">
                  Independent auditing and assurance services that provide stakeholders with confidence 
                  in your financial reporting.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-500 border-0 shadow-lg hover:-translate-y-2 animate-fade-in-up bg-white">
              <CardContent className="p-8 space-y-4">
                <div className="w-16 h-16 bg-prime-gold/10 rounded-lg flex items-center justify-center group-hover:bg-prime-gold transition-colors duration-300">
                  <div className="w-8 h-8 bg-prime-gold rounded group-hover:bg-white transition-colors duration-300"></div>
                </div>
                <h3 className="text-xl font-montserrat font-bold text-prime-blue">Management Consulting</h3>
                <p className="text-gray-600 font-open-sans">
                  Strategic business consulting to improve operations, optimize performance, 
                  and drive sustainable growth.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Foreign Investors CTA */}
          <Link to="/foreign-investors" className="block mt-12">
            <Card className="group hover:shadow-2xl transition-all duration-500 border-2 border-prime-gold/30 hover:border-prime-gold shadow-lg hover:-translate-y-1 bg-gradient-to-r from-prime-blue to-prime-blue/90 cursor-pointer">
              <CardContent className="p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-prime-gold/20 rounded-lg flex items-center justify-center group-hover:bg-prime-gold transition-colors duration-300">
                    <Globe className="w-8 h-8 text-prime-gold group-hover:text-prime-blue transition-colors duration-300" />
                  </div>
                  <div>
                    <h3 className="text-xl font-montserrat font-bold text-white">Foreign Investor? Start Your Business in Tanzania</h3>
                    <p className="text-white/70 font-open-sans mt-1">
                      Complete company registration, all licences & permits — from zero to operational.
                    </p>
                  </div>
                </div>
                <Button className="bg-prime-gold hover:bg-prime-gold/90 text-prime-blue font-montserrat font-semibold px-6 whitespace-nowrap group-hover:scale-105 transition-transform">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <Badge className="bg-prime-gold/10 text-prime-gold border-prime-gold/20 mb-4 font-montserrat">Client Testimonials</Badge>
            <h2 className="text-3xl lg:text-4xl font-montserrat font-bold text-prime-blue mb-6">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto font-open-sans">
              Don't just take our word for it - hear from businesses we've helped succeed
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white shadow-lg border-0 hover:shadow-xl transition-all duration-300 animate-fade-in-up">
              <CardContent className="p-8 space-y-6">
                <div className="flex items-center space-x-1 text-prime-gold">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-xl">★</span>
                  ))}
                </div>
                <p className="text-gray-700 italic font-open-sans leading-relaxed">
                  "Prime Auditors transformed our financial processes. Their expertise in tax planning 
                  saved us significant costs while ensuring full compliance."
                </p>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-prime-gold/10 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-prime-gold" />
                  </div>
                  <div>
                    <div className="font-montserrat font-semibold text-prime-blue">Sarah Johnson</div>
                    <div className="text-sm text-gray-500 font-open-sans">CEO, TechStart Ltd</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg border-0 hover:shadow-xl transition-all duration-300 animate-fade-in-up">
              <CardContent className="p-8 space-y-6">
                <div className="flex items-center space-x-1 text-prime-gold">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-xl">★</span>
                  ))}
                </div>
                <p className="text-gray-700 italic font-open-sans leading-relaxed">
                  "Professional, reliable, and incredibly knowledgeable. The audit process was smooth 
                  and their recommendations have improved our financial controls."
                </p>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-prime-gold/10 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-prime-gold" />
                  </div>
                  <div>
                    <div className="font-montserrat font-semibold text-prime-blue">Michael Chen</div>
                    <div className="text-sm text-gray-500 font-open-sans">Finance Director, Global Trade Co</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg border-0 hover:shadow-xl transition-all duration-300 animate-fade-in-up">
              <CardContent className="p-8 space-y-6">
                <div className="flex items-center space-x-1 text-prime-gold">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-xl">★</span>
                  ))}
                </div>
                <p className="text-gray-700 italic font-open-sans leading-relaxed">
                  "Their management consulting services helped us streamline operations and improve 
                  profitability. Highly recommended for any growing business."
                </p>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-prime-gold/10 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-prime-gold" />
                  </div>
                  <div>
                    <div className="font-montserrat font-semibold text-prime-blue">Amina Hassan</div>
                    <div className="text-sm text-gray-500 font-open-sans">Managing Director, Coastal Enterprises</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <Badge className="bg-prime-gold/10 text-prime-gold border-prime-gold/20 mb-4 font-montserrat">Client Reviews</Badge>
            <h2 className="text-3xl lg:text-4xl font-montserrat font-bold text-prime-blue mb-6">
              What Our Clients Say
            </h2>
          </div>
          <div className="flex justify-center">
            <div id="gbd_review_box_s"></div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-prime-light-grey">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <Badge className="bg-prime-gold/10 text-prime-gold border-prime-gold/20 mb-4 font-montserrat">Get In Touch</Badge>
            <h2 className="text-3xl lg:text-4xl font-montserrat font-bold text-prime-blue mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto font-open-sans">
              Contact us today for a consultation and discover how we can help your business thrive
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            <div className="space-y-8 animate-slide-in-left">
              <div>
                <h3 className="text-2xl font-montserrat font-bold text-prime-blue mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-prime-gold/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-prime-gold" />
                    </div>
                    <div>
                      <div className="font-montserrat font-semibold text-prime-blue">Office Address</div>
                      <div className="text-gray-700 font-open-sans">Plot 24, Block KB 3</div>
                      <div className="text-gray-700 font-open-sans">NHC Building Apartment No 02</div>
                      <div className="text-gray-700 font-open-sans">Market Street, Independence Avenue Road</div>
                      <div className="text-gray-700 font-open-sans">Central Ward, Tanga City, Tanzania</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-prime-gold/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-prime-gold" />
                    </div>
                    <div>
                      <div className="font-montserrat font-semibold text-prime-blue">Phone</div>
                      <div className="text-gray-700 font-open-sans">+255 798 509 683</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-prime-gold/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-prime-gold" />
                    </div>
                    <div>
                      <div className="font-montserrat font-semibold text-prime-blue">Email</div>
                      <div className="text-gray-700 font-open-sans">info@primeauditors.co.tz</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-prime-gold">
                <h4 className="font-montserrat font-semibold text-prime-blue mb-4">Business Hours</h4>
                <div className="space-y-3 text-gray-700 font-open-sans">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="font-medium">8:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="font-medium">8:30 AM - 1:30 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="font-medium">Closed</span>
                  </div>
                </div>
              </div>

              {/* Google Map */}
              <div className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-prime-gold">
                <h4 className="font-montserrat font-semibold text-prime-blue mb-4">Our Location</h4>
                <GoogleMap />
              </div>
            </div>

            <Card className="shadow-xl border-0 animate-fade-in-up">
              <CardContent className="p-8">
                <h3 className="text-2xl font-montserrat font-bold text-prime-blue mb-6">Send us a Message</h3>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-montserrat font-medium text-prime-blue mb-2">
                        First Name
                      </label>
                      <Input placeholder="John" className="border-prime-gold/20 focus:border-prime-gold" />
                    </div>
                    <div>
                      <label className="block text-sm font-montserrat font-medium text-prime-blue mb-2">
                        Last Name
                      </label>
                      <Input placeholder="Doe" className="border-prime-gold/20 focus:border-prime-gold" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-montserrat font-medium text-prime-blue mb-2">
                      Email Address
                    </label>
                    <Input type="email" placeholder="john@example.com" className="border-prime-gold/20 focus:border-prime-gold" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-montserrat font-medium text-prime-blue mb-2">
                      Company
                    </label>
                    <Input placeholder="Your Company Name" className="border-prime-gold/20 focus:border-prime-gold" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-montserrat font-medium text-prime-blue mb-2">
                      Message
                    </label>
                    <Textarea 
                      placeholder="Tell us about your needs and how we can help..."
                      rows={4}
                      className="border-prime-gold/20 focus:border-prime-gold"
                    />
                  </div>
                  
                  <Button className="w-full bg-prime-gold hover:bg-prime-gold/90 text-prime-blue font-montserrat font-semibold">
                    Send Message
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-r from-prime-blue via-prime-blue/95 to-prime-blue text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="space-y-6 animate-fade-in-up">
              <div className="flex items-center space-x-3">
                <div className="bg-prime-gold/20 p-2 rounded-full border border-prime-gold">
                  <Award className="w-6 h-6 text-prime-gold" />
                </div>
                <h3 className="text-2xl font-montserrat font-bold text-white">
                  PRIME AUDITORS
                </h3>
              </div>
              <p className="text-white/80 font-open-sans leading-relaxed">
                Your trusted partner in financial clarity.{" "}
                <a 
                  href="https://www.nbaa.go.tz/nbaa-firm-details/1148/show"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-prime-gold hover:text-prime-gold/80 font-semibold underline cursor-pointer transition-colors"
                >
                  NBAA certified professionals
                </a>
                {" "}serving businesses across Tanzania with excellence and integrity.
              </p>
              <a 
                href="https://www.nbaa.go.tz/nbaa-firm-details/1148/show"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Badge variant="outline" className="border-prime-gold text-prime-gold font-montserrat hover:bg-prime-gold/10 transition-colors cursor-pointer">
                  NBAA Reg: PF510
                </Badge>
              </a>
            </div>
            
            <div className="animate-fade-in-up">
              <h4 className="font-montserrat font-semibold mb-6 text-lg">Services</h4>
              <ul className="space-y-3 text-white/80 font-open-sans">
                <li><Link to="/services" className="hover:text-prime-gold transition-colors">Accounting Services</Link></li>
                <li><Link to="/services" className="hover:text-prime-gold transition-colors">Tax Services</Link></li>
                <li><Link to="/services" className="hover:text-prime-gold transition-colors">Auditing & Assurance</Link></li>
                <li><Link to="/services" className="hover:text-prime-gold transition-colors">Management Consulting</Link></li>
                <li><Link to="/foreign-investors" className="hover:text-prime-gold transition-colors">Foreign Investor Registration</Link></li>
              </ul>
            </div>
            
            <div className="animate-fade-in-up">
              <h4 className="font-montserrat font-semibold mb-6 text-lg">Company</h4>
              <ul className="space-y-3 text-white/80 font-open-sans">
                <li><a href="#about" className="hover:text-prime-gold transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-prime-gold transition-colors">Our Team</a></li>
                <li><a href="#" className="hover:text-prime-gold transition-colors">Certifications</a></li>
                <li><a href="#contact" className="hover:text-prime-gold transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div className="animate-fade-in-up">
              <h4 className="font-montserrat font-semibold mb-6 text-lg">Contact Info</h4>
              <ul className="space-y-3 text-white/80 font-open-sans">
                <li className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-prime-gold flex-shrink-0" />
                  <span>Plot 24, Block KB 3, NHC Building</span>
                </li>
                <li className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-prime-gold flex-shrink-0" />
                  <span>Market Street, Tanga City</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-prime-gold flex-shrink-0" />
                  <span>+255 798 509 683</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-prime-gold flex-shrink-0" />
                  <span>info@primeauditors.co.tz</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/20 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-white/80 font-open-sans">
              © 2024 Prime Auditors. All rights reserved.
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-white/80 hover:text-prime-gold transition-colors font-open-sans">Privacy Policy</a>
              <a href="#" className="text-white/80 hover:text-prime-gold transition-colors font-open-sans">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
