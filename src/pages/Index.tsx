import { ArrowRight, Users, Phone, Mail, MapPin, CheckCircle, Award, TrendingUp, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ConsultationModal } from "@/components/ConsultationModal";
import { useState } from "react";

const Index = () => {
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);

  const handleGetConsultation = () => {
    setIsConsultationModalOpen(true);
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
      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-sm shadow-lg sticky top-0 z-50 border-b border-prime-light-grey">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center animate-slide-in-left">
              <AnimatedText 
                text="PRIME AUDITORS" 
                className="text-2xl font-montserrat font-bold text-prime-blue"
              />
              <Badge variant="outline" className="ml-3 text-xs border-prime-gold text-prime-gold">NBAA Reg: PF517</Badge>
            </div>
            <div className="hidden md:flex space-x-8 animate-fade-in">
              <a href="#about" className="text-prime-blue hover:text-prime-gold transition-colors font-medium">About</a>
              <a href="#services" className="text-prime-blue hover:text-prime-gold transition-colors font-medium">Services</a>
              <a href="#testimonials" className="text-prime-blue hover:text-prime-gold transition-colors font-medium">Testimonials</a>
              <a href="#contact" className="text-prime-blue hover:text-prime-gold transition-colors font-medium">Contact</a>
            </div>
            <Button 
              className="bg-prime-gold hover:bg-prime-gold/90 text-prime-blue font-montserrat font-semibold animate-fade-in"
              onClick={handleGetConsultation}
            >
              Get Consultation
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-prime-blue via-prime-blue/95 to-prime-blue/90 text-white py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in-up">
              <div className="space-y-6">
                <Badge className="bg-prime-gold/20 text-prime-gold border-prime-gold/30 font-montserrat">
                  NBAA Reg: PF517 • Tanga, Tanzania
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-montserrat font-bold leading-tight">
                  Your Trusted Partner in{" "}
                  <span className="text-prime-gold">Financial Excellence</span>
                </h1>
                <p className="text-xl text-white/90 leading-relaxed font-open-sans">
                  Professional accounting, auditing, and consulting services designed to drive your business success. 
                  Certified expertise you can trust.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-prime-gold text-prime-blue hover:bg-prime-gold/90 font-montserrat font-semibold shadow-lg"
                  onClick={handleGetConsultation}
                >
                  Request a Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 font-montserrat">
                  View Our Services
                </Button>
              </div>
            </div>
            <div className="hidden lg:block animate-slide-in-left">
              <img
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop"
                alt="Professional business meeting"
                className="rounded-lg shadow-2xl border-4 border-prime-gold/20"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-prime-light-grey">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center animate-fade-in-up">
              <div className="w-16 h-16 bg-prime-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-prime-blue" />
              </div>
              <div className="text-3xl font-montserrat font-bold text-prime-blue">NBAA</div>
              <div className="text-sm text-gray-600 font-open-sans">Certified Professionals</div>
            </div>
            <div className="text-center animate-fade-in-up">
              <div className="w-16 h-16 bg-prime-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-prime-blue" />
              </div>
              <div className="text-3xl font-montserrat font-bold text-prime-blue">100+</div>
              <div className="text-sm text-gray-600 font-open-sans">Satisfied Clients</div>
            </div>
            <div className="text-center animate-fade-in-up">
              <div className="w-16 h-16 bg-prime-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-prime-blue" />
              </div>
              <div className="text-3xl font-montserrat font-bold text-prime-blue">10+</div>
              <div className="text-sm text-gray-600 font-open-sans">Years Experience</div>
            </div>
            <div className="text-center animate-fade-in-up">
              <div className="w-16 h-16 bg-prime-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-prime-blue" />
              </div>
              <div className="text-3xl font-montserrat font-bold text-prime-blue">24/7</div>
              <div className="text-sm text-gray-600 font-open-sans">Professional Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-slide-in-left">
              <img
                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop"
                alt="Professional workspace"
                className="rounded-lg shadow-xl border-4 border-prime-gold/10"
              />
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
                We are proud to be certified by the National Board of Accountants and Auditors (NBAA), 
                ensuring our clients receive services that meet the highest professional standards.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed font-open-sans">
                Our mission is to provide comprehensive financial solutions that empower businesses 
                to make informed decisions, achieve compliance, and drive sustainable growth. We combine 
                deep local market knowledge with international best practices.
              </p>
              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="text-center p-6 bg-prime-light-grey rounded-lg shadow-sm border-l-4 border-prime-gold">
                  <div className="text-2xl font-montserrat font-bold text-prime-blue">NBAA</div>
                  <div className="text-sm text-gray-600 font-open-sans">Certified</div>
                </div>
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
                      <div className="text-gray-700 font-open-sans">+255 712 747 539</div>
                      <div className="text-gray-700 font-open-sans">+255 752 401 012</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-prime-gold/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-prime-gold" />
                    </div>
                    <div>
                      <div className="font-montserrat font-semibold text-prime-blue">Email</div>
                      <div className="text-gray-700 font-open-sans">primeauditors@gmail.com</div>
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

      {/* Consultation Modal */}
      <ConsultationModal 
        isOpen={isConsultationModalOpen}
        onClose={() => setIsConsultationModalOpen(false)}
      />

      {/* Footer */}
      <footer className="bg-prime-blue text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4 animate-fade-in-up">
              <AnimatedText 
                text="PRIME AUDITORS" 
                className="text-2xl font-montserrat font-bold"
              />
              <p className="text-white/80 font-open-sans">
                Your trusted partner in financial clarity. NBAA certified professionals 
                serving businesses across Tanzania.
              </p>
              <Badge variant="outline" className="border-prime-gold text-prime-gold font-montserrat">
                NBAA Reg: PF517
              </Badge>
            </div>
            
            <div className="animate-fade-in-up">
              <h4 className="font-montserrat font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-white/80 font-open-sans">
                <li><a href="#" className="hover:text-prime-gold transition-colors">Accounting Services</a></li>
                <li><a href="#" className="hover:text-prime-gold transition-colors">Tax Services</a></li>
                <li><a href="#" className="hover:text-prime-gold transition-colors">Auditing & Assurance</a></li>
                <li><a href="#" className="hover:text-prime-gold transition-colors">Management Consulting</a></li>
              </ul>
            </div>
            
            <div className="animate-fade-in-up">
              <h4 className="font-montserrat font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-white/80 font-open-sans">
                <li><a href="#" className="hover:text-prime-gold transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-prime-gold transition-colors">Our Team</a></li>
                <li><a href="#" className="hover:text-prime-gold transition-colors">Certifications</a></li>
                <li><a href="#" className="hover:text-prime-gold transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div className="animate-fade-in-up">
              <h4 className="font-montserrat font-semibold mb-4">Contact Info</h4>
              <ul className="space-y-2 text-white/80 font-open-sans">
                <li>Plot 24, Block KB 3, NHC Building</li>
                <li>Market Street, Tanga City</li>
                <li>+255 712 747 539</li>
                <li>+255 752 401 012</li>
                <li>primeauditors@gmail.com</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
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
