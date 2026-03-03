import { ArrowRight, Award, Users, Phone, Mail, MapPin, Menu, X, Globe, Linkedin, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Link } from "react-router-dom";
import primeAuditorsLogo from "@/assets/prime-auditors-logo.jpg";
import teamConference1 from "@/assets/team-conference-1.jpg";
import teamConference2 from "@/assets/team-conference-2.jpg";
import teamProfessional from "@/assets/team-professional.jpg";
import nbaaCertificate from "@/assets/nbaa-certificate.jpg";

const teamMembers = [
  {
    name: "CPA Salim Mwinyi",
    role: "Managing Partner",
    bio: "A seasoned Certified Public Accountant with over 10 years of experience in auditing, tax advisory, and management consulting. Registered with NBAA.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
  },
  {
    name: "CPA Fatma Hassan",
    role: "Senior Auditor",
    bio: "Specializes in financial auditing and assurance services. Expert in IFRS and ISA standards with extensive experience in both public and private sector audits.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face",
  },
  {
    name: "CPA John Mwakasege",
    role: "Tax Consultant",
    bio: "Expert in Tanzanian tax law and international taxation. Provides strategic tax planning and compliance services for businesses of all sizes.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
  },
  {
    name: "Grace Mushi",
    role: "Accounting Manager",
    bio: "Leads our accounting services team with expertise in bookkeeping, financial statement preparation, and management accounting.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&crop=face",
  },
];

const AboutUs = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white font-open-sans">
      {/* Navigation */}
      <nav className="bg-gradient-to-r from-prime-blue via-prime-blue/95 to-prime-blue text-white shadow-2xl sticky top-0 z-50 border-b-4 border-prime-gold">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <img src={primeAuditorsLogo} alt="Prime Auditors Logo" className="h-16 w-auto" />
              </Link>
            </div>
            <div className="hidden lg:flex items-center space-x-8">
              <Link to="/" className="text-white/90 hover:text-prime-gold transition-all duration-300 font-medium text-lg">Home</Link>
              <Link to="/about" className="text-prime-gold font-semibold text-lg">About Us</Link>
              <Link to="/services" className="text-white/90 hover:text-prime-gold transition-all duration-300 font-medium text-lg">Services</Link>
              <Link to="/news" className="text-white/90 hover:text-prime-gold transition-all duration-300 font-medium text-lg">News & Updates</Link>
              <Link to="/foreign-investors" className="text-white/90 hover:text-prime-gold transition-all duration-300 font-medium text-lg flex items-center gap-1">
                <Globe className="w-4 h-4" />Foreign Investors
              </Link>
              <Link to="/join" className="text-white/90 hover:text-prime-gold transition-all duration-300 font-medium text-lg">Join Us</Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/#contact">
                <Button className="bg-prime-gold hover:bg-prime-gold/90 text-prime-blue font-montserrat font-semibold shadow-lg">
                  <Phone className="w-4 h-4 mr-2" />Contact Us
                </Button>
              </Link>
              <button className="lg:hidden p-2 rounded-md hover:bg-prime-gold/20 transition-colors" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
          {isMobileMenuOpen && (
            <div className="lg:hidden py-6 border-t border-prime-gold/20 animate-fade-in">
              <div className="flex flex-col space-y-4">
                <Link to="/" className="text-white/90 hover:text-prime-gold transition-colors font-medium text-lg py-2">Home</Link>
                <Link to="/about" className="text-prime-gold font-semibold text-lg py-2">About Us</Link>
                <Link to="/services" className="text-white/90 hover:text-prime-gold transition-colors font-medium text-lg py-2">Services</Link>
                <Link to="/news" className="text-white/90 hover:text-prime-gold transition-colors font-medium text-lg py-2">News & Updates</Link>
                <Link to="/foreign-investors" className="text-white/90 hover:text-prime-gold transition-colors font-medium text-lg py-2 flex items-center gap-2">
                  <Globe className="w-4 h-4" />Foreign Investors
                </Link>
                <Link to="/join" className="text-white/90 hover:text-prime-gold transition-colors font-medium text-lg py-2">Join Us</Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Banner */}
      <section className="relative bg-gradient-to-br from-prime-blue to-prime-blue/90 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920')] bg-cover bg-center opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="bg-prime-gold/20 text-prime-gold border-prime-gold/30 mb-6 font-montserrat">About Prime Auditors</Badge>
          <h1 className="text-4xl lg:text-6xl font-montserrat font-bold text-white mb-6">
            Young | Energetic | <span className="text-prime-gold">Resourceful</span>
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto font-open-sans">
            A leading CPA firm in Tanga, Tanzania — providing world-class financial services with integrity and excellence.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <img src={teamConference1} alt="Team conference" className="rounded-xl shadow-lg w-full h-48 object-cover" />
                <img src={teamConference2} alt="Team meeting" className="rounded-xl shadow-lg w-full h-48 object-cover" />
                <img src={nbaaCertificate} alt="NBAA Certificate" className="rounded-xl shadow-lg w-full h-48 object-cover col-span-2" />
              </div>
            </div>
            <div className="space-y-6">
              <Badge className="bg-prime-gold/10 text-prime-gold border-prime-gold/20 font-montserrat">Our Story</Badge>
              <h2 className="text-3xl lg:text-4xl font-montserrat font-bold text-prime-blue">
                About Prime Auditors
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed font-open-sans">
                <strong className="text-prime-blue">Prime Auditors</strong> is a Certified Public Accountants firm based in Tanga, Tanzania.
                We are registered by the National Board of Accountants and Auditors (NBAA) as Certified Public Accountants in Public Practice.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed font-open-sans">
                Our mission is to be the most trusted, innovative, and results-driven consulting firm in Tanzania.
                We combine deep local market knowledge with international best practices to deliver exceptional value to our clients.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed font-open-sans">
                With over a decade of combined experience, our team brings expertise across auditing, tax advisory,
                management consulting, and business registration services.
              </p>
              <a href="https://www.nbaa.go.tz/nbaa-firm-details/1148/show" target="_blank" rel="noopener noreferrer">
                <Badge variant="outline" className="border-prime-gold text-prime-gold hover:bg-prime-gold/10 transition-colors cursor-pointer text-sm px-4 py-2 mt-4">
                  <Award className="w-4 h-4 mr-2" /> NBAA Reg: PF510 — Verify
                </Badge>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-prime-light-grey">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white border-t-4 border-t-prime-gold">
              <CardContent className="p-8 space-y-4 text-center">
                <div className="w-16 h-16 bg-prime-gold/10 rounded-full flex items-center justify-center mx-auto">
                  <Briefcase className="w-8 h-8 text-prime-gold" />
                </div>
                <h3 className="text-xl font-montserrat font-bold text-prime-blue">Our Mission</h3>
                <p className="text-gray-600 font-open-sans">
                  To provide comprehensive, high-quality financial solutions that empower businesses to make informed decisions and achieve sustainable growth.
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white border-t-4 border-t-prime-blue">
              <CardContent className="p-8 space-y-4 text-center">
                <div className="w-16 h-16 bg-prime-blue/10 rounded-full flex items-center justify-center mx-auto">
                  <Award className="w-8 h-8 text-prime-blue" />
                </div>
                <h3 className="text-xl font-montserrat font-bold text-prime-blue">Our Vision</h3>
                <p className="text-gray-600 font-open-sans">
                  To be the most trusted and innovative CPA firm in Tanzania, setting the standard for excellence in professional financial services.
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white border-t-4 border-t-prime-gold">
              <CardContent className="p-8 space-y-4 text-center">
                <div className="w-16 h-16 bg-prime-gold/10 rounded-full flex items-center justify-center mx-auto">
                  <Users className="w-8 h-8 text-prime-gold" />
                </div>
                <h3 className="text-xl font-montserrat font-bold text-prime-blue">Our Values</h3>
                <p className="text-gray-600 font-open-sans">
                  Integrity, professionalism, innovation, and client-centricity guide every engagement and relationship we build.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-prime-gold/10 text-prime-gold border-prime-gold/20 mb-4 font-montserrat">Our Team</Badge>
            <h2 className="text-3xl lg:text-4xl font-montserrat font-bold text-prime-blue mb-6">
              Meet the Professionals Behind Prime Auditors
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto font-open-sans">
              Each member of our team brings unique skills and expertise to ensure the best possible service for our clients.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group overflow-hidden">
                <div className="relative overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover object-center transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-prime-blue/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <CardContent className="p-6 text-center space-y-3">
                  <h3 className="text-lg font-montserrat font-bold text-prime-blue">{member.name}</h3>
                  <Badge className="bg-prime-gold/10 text-prime-gold border-prime-gold/20 font-montserrat text-xs">
                    {member.role}
                  </Badge>
                  <p className="text-sm text-gray-600 font-open-sans leading-relaxed">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/join">
              <Button className="bg-prime-gold hover:bg-prime-gold/90 text-prime-blue font-montserrat font-semibold px-8 py-3 text-lg">
                Join as a Consultant
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 bg-prime-light-grey">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-prime-gold/10 text-prime-gold border-prime-gold/20 mb-4 font-montserrat">Gallery</Badge>
            <h2 className="text-3xl lg:text-4xl font-montserrat font-bold text-prime-blue mb-6">
              Professional Development & Activities
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            {[teamConference1, teamConference2, teamProfessional].map((img, i) => (
              <div key={i} className="relative overflow-hidden rounded-xl shadow-lg group">
                <img src={img} alt={`Team activity ${i + 1}`} className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-prime-blue/20 group-hover:bg-prime-blue/40 transition-colors duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-prime-blue to-prime-blue/90 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-montserrat font-bold mb-6">Need More Details?</h2>
          <p className="text-xl text-white/80 mb-8 font-open-sans">
            We are here to assist. Contact us to discuss how Prime Auditors can support your needs.
          </p>
          <Link to="/#contact">
            <Button className="bg-prime-gold hover:bg-prime-gold/90 text-prime-blue font-montserrat font-semibold px-8 py-3 text-lg">
              Get in Contact
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-prime-blue via-prime-blue/95 to-prime-blue text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-montserrat font-bold mb-4">PRIME AUDITORS</h3>
              <p className="text-white/80 font-open-sans text-sm">Your trusted partner in financial clarity. NBAA certified professionals.</p>
            </div>
            <div>
              <h4 className="font-montserrat font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-white/80 font-open-sans text-sm">
                <li><Link to="/" className="hover:text-prime-gold transition-colors">Home</Link></li>
                <li><Link to="/about" className="hover:text-prime-gold transition-colors">About Us</Link></li>
                <li><Link to="/services" className="hover:text-prime-gold transition-colors">Services</Link></li>
                <li><Link to="/news" className="hover:text-prime-gold transition-colors">News & Updates</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-montserrat font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-white/80 font-open-sans text-sm">
                <li><Link to="/services" className="hover:text-prime-gold transition-colors">Accounting</Link></li>
                <li><Link to="/services" className="hover:text-prime-gold transition-colors">Tax Advisory</Link></li>
                <li><Link to="/services" className="hover:text-prime-gold transition-colors">Auditing</Link></li>
                <li><Link to="/foreign-investors" className="hover:text-prime-gold transition-colors">Foreign Investors</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-montserrat font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-white/80 font-open-sans text-sm">
                <li className="flex items-center gap-2"><Phone className="w-3 h-3 text-prime-gold" />+255 798 509 683</li>
                <li className="flex items-center gap-2"><Mail className="w-3 h-3 text-prime-gold" />info@primeauditors.co.tz</li>
                <li className="flex items-center gap-2"><MapPin className="w-3 h-3 text-prime-gold" />Tanga City, Tanzania</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60 font-open-sans text-sm">
            © 2024 Prime Auditors. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;
