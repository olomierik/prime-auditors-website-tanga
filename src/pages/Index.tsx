import { ArrowRight, Users, Phone, Mail, MapPin, CheckCircle, Award, TrendingUp, Shield, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ConsultationModal } from "@/components/ConsultationModal";
import GoogleMap from "@/components/GoogleMap";

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const openConsultationModal = () => {
    setIsConsultationModalOpen(true);
  };

  const closeConsultationModal = () => {
    setIsConsultationModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-white font-open-sans">
      {/* Navigation */}
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              {/* Logo */}
              <Link to="/" className="flex-shrink-0 flex items-center">
                <img
                  className="h-8 w-auto"
                  src="/prime-auditors-logo.png"
                  alt="Prime Auditors Logo"
                />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMenu}
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-prime-blue"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <X className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/" className="font-montserrat font-medium text-gray-700 hover:text-prime-blue transition-colors">
                Home
              </Link>
              <Link to="/services" className="font-montserrat font-medium text-gray-700 hover:text-prime-blue transition-colors">
                Services
              </Link>
              <a href="/#about" className="font-montserrat font-medium text-gray-700 hover:text-prime-blue transition-colors">
                About Us
              </a>
              <a href="/#contact" className="font-montserrat font-medium text-gray-700 hover:text-prime-blue transition-colors">
                Contact
              </a>
              <Button onClick={openConsultationModal} className="bg-prime-gold hover:bg-prime-gold/90 text-prime-blue font-montserrat font-semibold">
                Get a Consultation
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu (Conditional Rendering) */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/"
                className="block px-3 py-2 rounded-md text-base font-montserrat font-medium text-gray-700 hover:text-prime-blue hover:bg-gray-50 transition-colors"
              >
                Home
              </Link>
              <Link
                to="/services"
                className="block px-3 py-2 rounded-md text-base font-montserrat font-medium text-gray-700 hover:text-prime-blue hover:bg-gray-50 transition-colors"
              >
                Services
              </Link>
              <a
                href="/#about"
                className="block px-3 py-2 rounded-md text-base font-montserrat font-medium text-gray-700 hover:text-prime-blue hover:bg-gray-50 transition-colors"
              >
                About Us
              </a>
              <a
                href="/#contact"
                className="block px-3 py-2 rounded-md text-base font-montserrat font-medium text-gray-700 hover:text-prime-blue hover:bg-gray-50 transition-colors"
              >
                Contact
              </a>
              <div className="block w-full px-3 py-2">
                <Button onClick={openConsultationModal} className="bg-prime-gold hover:bg-prime-gold/90 text-prime-blue font-montserrat font-semibold w-full">
                  Get a Consultation
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <header className="bg-gradient-to-r from-prime-blue via-prime-blue/95 to-prime-blue text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-left">
            <h1 className="text-4xl tracking-tight font-extrabold font-montserrat sm:text-5xl md:text-6xl">
              <span className="block xl:inline">Prime Auditors: Your Trusted</span>
              <span className="block text-prime-gold xl:inline">Financial Partner</span>
            </h1>
            <p className="mt-4 text-xl sm:mt-5 sm:text-2xl lg:text-xl xl:text-2xl text-white/90 max-w-3xl">
              Expert accounting, auditing, and consulting services tailored to drive your business success.
            </p>
            <div className="mt-10 sm:flex sm:gap-4">
              <Link to="/services">
                <Button className="bg-prime-gold hover:bg-prime-gold/90 text-prime-blue font-montserrat font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 px-8 py-4 text-lg">
                  <ArrowRight className="mr-3 h-5 w-5" />
                  Explore Our Services
                </Button>
              </Link>
              <Button onClick={openConsultationModal} className="bg-white hover:bg-white/90 text-prime-blue font-montserrat font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 px-8 py-4 text-lg">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-prime-light-grey">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-montserrat font-bold text-prime-blue mb-6">
              Why Choose Prime Auditors?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your success is our priority. We combine expertise, integrity, and innovation to deliver exceptional financial services.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-prime-gold/20 rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-prime-gold" />
                </div>
                <div>
                  <h3 className="text-xl font-montserrat font-semibold text-prime-blue mb-3">
                    NBAA Certified Excellence
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    As a certified firm by the National Board of Accountants and Auditors (NBAA), we maintain the highest standards of professional practice and ethical conduct.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-prime-gold/20 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-prime-gold" />
                </div>
                <div>
                  <h3 className="text-xl font-montserrat font-semibold text-prime-blue mb-3">
                    Experienced Team
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Our team of qualified professionals brings years of experience in auditing, accounting, taxation, and business consulting across various industries.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-prime-gold/20 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-prime-gold" />
                </div>
                <div>
                  <h3 className="text-xl font-montserrat font-semibold text-prime-blue mb-3">
                    Results-Driven Approach
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    We don't just provide services; we deliver solutions that help your business grow, improve efficiency, and achieve long-term success.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-xl">
                <img 
                  src="/lovable-uploads/52c82007-af60-403f-ab48-5701acfa918d.png"
                  alt="Prime Auditors Professional Team Member at Work"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-prime-gold text-prime-blue p-6 rounded-lg shadow-lg">
                <div className="text-center">
                  <div className="text-2xl font-montserrat font-bold">Professional</div>
                  <div className="text-sm">Excellence</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-montserrat font-bold text-prime-blue mb-6">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive solutions for accounting, auditing, taxation, and business consulting.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="shadow-xl border-0 hover:shadow-2xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="text-6xl text-prime-gold mb-4">🧾</div>
                <h3 className="text-2xl font-montserrat font-bold text-prime-blue mb-3">
                  Accounting Services
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  From bookkeeping to financial statement preparation, we ensure accuracy and compliance.
                </p>
                <Link to="/services" className="mt-4 inline-flex items-center font-montserrat font-medium text-prime-blue hover:text-prime-blue/80 transition-colors">
                  Learn More <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </CardContent>
            </Card>

            <Card className="shadow-xl border-0 hover:shadow-2xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="text-6xl text-prime-gold mb-4">💰</div>
                <h3 className="text-2xl font-montserrat font-bold text-prime-blue mb-3">
                  Tax Services
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Strategic tax planning and compliance to minimize liabilities and maximize savings.
                </p>
                <Link to="/services" className="mt-4 inline-flex items-center font-montserrat font-medium text-prime-blue hover:text-prime-blue/80 transition-colors">
                  Learn More <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </CardContent>
            </Card>

            <Card className="shadow-xl border-0 hover:shadow-2xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="text-6xl text-prime-gold mb-4">✅</div>
                <h3 className="text-2xl font-montserrat font-bold text-prime-blue mb-3">
                  Auditing & Assurance
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Independent audits and assurance services to enhance financial credibility.
                </p>
                <Link to="/services" className="mt-4 inline-flex items-center font-montserrat font-medium text-prime-blue hover:text-prime-blue/80 transition-colors">
                  Learn More <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <Link to="/services">
              <Button className="bg-prime-blue hover:bg-prime-blue/90 text-white font-montserrat font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 px-8 py-4 text-lg">
                View All Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-prime-light-grey">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-montserrat font-bold text-prime-blue mb-6">
              Get In Touch
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ready to take your business to the next level? Contact us today for a consultation.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-prime-gold/20 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-prime-gold" />
                  </div>
                  <div>
                    <h3 className="font-montserrat font-semibold text-prime-blue">Phone</h3>
                    <p className="text-gray-600">+255 27 264 4928</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-prime-gold/20 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-prime-gold" />
                  </div>
                  <div>
                    <h3 className="font-montserrat font-semibold text-prime-blue">Email</h3>
                    <p className="text-gray-600">info@primeauditors.co.tz</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-prime-gold/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-prime-gold" />
                  </div>
                  <div>
                    <h3 className="font-montserrat font-semibold text-prime-blue">Address</h3>
                    <p className="text-gray-600">
                      Tanga, Tanzania<br />
                      Coordinates: -5.0714256, 39.1005272
                    </p>
                  </div>
                </div>

                <div className="pt-6">
                  <Button onClick={openConsultationModal} className="bg-prime-gold hover:bg-prime-gold/90 text-prime-blue font-montserrat font-semibold w-full">
                    Request a Consultation
                  </Button>
                </div>
              </div>
            </div>

            <div>
              <GoogleMap />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-prime-blue text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:justify-between md:items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm">
                &copy; {new Date().getFullYear()} Prime Auditors. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-prime-gold transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-white hover:text-prime-gold transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Consultation Modal */}
      <ConsultationModal 
        isOpen={isConsultationModalOpen} 
        onClose={closeConsultationModal} 
      />
    </div>
  );
};

export default Index;
