import { ArrowRight, Phone, Mail, MapPin, Menu, X, Globe, Send, Upload, Briefcase, GraduationCap, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import primeAuditorsLogo from "@/assets/prime-auditors-logo.jpg";

const JoinUs = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    specialization: "",
    experience: "",
    qualifications: "",
    coverLetter: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    toast({
      title: "Application Submitted!",
      description: "Thank you for your interest. We'll review your application and get back to you soon.",
    });
  };

  return (
    <div className="min-h-screen bg-white font-open-sans">
      {/* Navigation */}
      <nav className="bg-gradient-to-r from-prime-blue via-prime-blue/95 to-prime-blue text-white shadow-2xl sticky top-0 z-50 border-b-4 border-prime-gold">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <Link to="/"><img src={primeAuditorsLogo} alt="Prime Auditors Logo" className="h-16 w-auto" /></Link>
            </div>
            <div className="hidden lg:flex items-center space-x-8">
              <Link to="/" className="text-white/90 hover:text-prime-gold transition-all duration-300 font-medium text-lg">Home</Link>
              <Link to="/about" className="text-white/90 hover:text-prime-gold transition-all duration-300 font-medium text-lg">About Us</Link>
              <Link to="/services" className="text-white/90 hover:text-prime-gold transition-all duration-300 font-medium text-lg">Services</Link>
              <Link to="/news" className="text-white/90 hover:text-prime-gold transition-all duration-300 font-medium text-lg">News & Updates</Link>
              <Link to="/foreign-investors" className="text-white/90 hover:text-prime-gold transition-all duration-300 font-medium text-lg flex items-center gap-1">
                <Globe className="w-4 h-4" />Foreign Investors
              </Link>
              <Link to="/join" className="text-prime-gold font-semibold text-lg">Join Us</Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/#contact">
                <Button className="bg-prime-gold hover:bg-prime-gold/90 text-prime-blue font-montserrat font-semibold shadow-lg">
                  <Phone className="w-4 h-4 mr-2" />Contact Us
                </Button>
              </Link>
              <button className="lg:hidden p-2 rounded-md hover:bg-prime-gold/20" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
          {isMobileMenuOpen && (
            <div className="lg:hidden py-6 border-t border-prime-gold/20 animate-fade-in">
              <div className="flex flex-col space-y-4">
                <Link to="/" className="text-white/90 hover:text-prime-gold font-medium text-lg py-2">Home</Link>
                <Link to="/about" className="text-white/90 hover:text-prime-gold font-medium text-lg py-2">About Us</Link>
                <Link to="/services" className="text-white/90 hover:text-prime-gold font-medium text-lg py-2">Services</Link>
                <Link to="/news" className="text-white/90 hover:text-prime-gold font-medium text-lg py-2">News & Updates</Link>
                <Link to="/foreign-investors" className="text-white/90 hover:text-prime-gold font-medium text-lg py-2 flex items-center gap-2">
                  <Globe className="w-4 h-4" />Foreign Investors
                </Link>
                <Link to="/join" className="text-prime-gold font-semibold text-lg py-2">Join Us</Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-prime-blue to-prime-blue/90 py-16 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <Badge className="bg-prime-gold/20 text-prime-gold border-prime-gold/30 mb-6 font-montserrat">Careers</Badge>
          <h1 className="text-4xl lg:text-5xl font-montserrat font-bold text-white mb-4">Join as a Consultant</h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto font-open-sans">
            Become part of a dynamic, growing CPA firm. We're always looking for talented professionals to join our team.
          </p>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-16 bg-prime-light-grey">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-montserrat font-bold text-prime-blue mb-4">Why Join Prime Auditors?</h2>
            <p className="text-gray-600 font-open-sans max-w-2xl mx-auto">
              We offer a supportive environment where professionals can grow, learn, and make an impact.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg bg-white border-t-4 border-t-prime-gold">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-prime-gold/10 rounded-full flex items-center justify-center mx-auto">
                  <GraduationCap className="w-8 h-8 text-prime-gold" />
                </div>
                <h3 className="text-lg font-montserrat font-bold text-prime-blue">Professional Growth</h3>
                <p className="text-gray-600 font-open-sans text-sm">
                  Continuous learning opportunities, CPD training, and exposure to diverse client engagements.
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg bg-white border-t-4 border-t-prime-blue">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-prime-blue/10 rounded-full flex items-center justify-center mx-auto">
                  <Briefcase className="w-8 h-8 text-prime-blue" />
                </div>
                <h3 className="text-lg font-montserrat font-bold text-prime-blue">Diverse Projects</h3>
                <p className="text-gray-600 font-open-sans text-sm">
                  Work on challenging projects across industries — from SMEs to multinational corporations.
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg bg-white border-t-4 border-t-prime-gold">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-prime-gold/10 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8 text-prime-gold" />
                </div>
                <h3 className="text-lg font-montserrat font-bold text-prime-blue">Flexible Engagement</h3>
                <p className="text-gray-600 font-open-sans text-sm">
                  Join as a full-time team member or as an independent consultant — we offer flexible arrangements.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="bg-prime-gold/10 text-prime-gold border-prime-gold/20 mb-4 font-montserrat">Apply Now</Badge>
            <h2 className="text-3xl font-montserrat font-bold text-prime-blue mb-4">Submit Your Application</h2>
            <p className="text-gray-600 font-open-sans">
              Fill in the form below and our team will review your application.
            </p>
          </div>

          {isSubmitted ? (
            <Card className="border-0 shadow-xl bg-prime-light-grey">
              <CardContent className="p-12 text-center space-y-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-montserrat font-bold text-prime-blue">Application Submitted!</h3>
                <p className="text-gray-600 font-open-sans">
                  Thank you for your interest in joining Prime Auditors. Our team will review your application and get back to you within 5 business days.
                </p>
                <Link to="/">
                  <Button className="bg-prime-blue hover:bg-prime-blue/90 text-white font-montserrat mt-4">
                    Back to Home
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-0 shadow-xl">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-montserrat font-medium text-prime-blue mb-2">Full Name *</label>
                      <Input name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Your full name" required className="border-prime-gold/20 focus:border-prime-gold" />
                    </div>
                    <div>
                      <label className="block text-sm font-montserrat font-medium text-prime-blue mb-2">Email Address *</label>
                      <Input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" required className="border-prime-gold/20 focus:border-prime-gold" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-montserrat font-medium text-prime-blue mb-2">Phone Number *</label>
                      <Input name="phone" value={formData.phone} onChange={handleChange} placeholder="+255 xxx xxx xxx" required className="border-prime-gold/20 focus:border-prime-gold" />
                    </div>
                    <div>
                      <label className="block text-sm font-montserrat font-medium text-prime-blue mb-2">Area of Specialization *</label>
                      <Input name="specialization" value={formData.specialization} onChange={handleChange} placeholder="e.g., Tax Advisory, Auditing" required className="border-prime-gold/20 focus:border-prime-gold" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-montserrat font-medium text-prime-blue mb-2">Years of Experience *</label>
                    <Input name="experience" value={formData.experience} onChange={handleChange} placeholder="e.g., 5 years" required className="border-prime-gold/20 focus:border-prime-gold" />
                  </div>

                  <div>
                    <label className="block text-sm font-montserrat font-medium text-prime-blue mb-2">Qualifications & Certifications</label>
                    <Input name="qualifications" value={formData.qualifications} onChange={handleChange} placeholder="e.g., CPA, ACCA, NBAA Registered" className="border-prime-gold/20 focus:border-prime-gold" />
                  </div>

                  <div>
                    <label className="block text-sm font-montserrat font-medium text-prime-blue mb-2">Cover Letter / Why You Want to Join *</label>
                    <Textarea
                      name="coverLetter"
                      value={formData.coverLetter}
                      onChange={handleChange}
                      placeholder="Tell us about yourself and why you'd like to join Prime Auditors..."
                      rows={5}
                      required
                      className="border-prime-gold/20 focus:border-prime-gold"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-prime-gold hover:bg-prime-gold/90 text-prime-blue font-montserrat font-semibold py-3 text-lg"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                    <Send className="ml-2 h-5 w-5" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-prime-blue via-prime-blue/95 to-prime-blue text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-montserrat font-bold mb-4">PRIME AUDITORS</h3>
              <p className="text-white/80 font-open-sans text-sm">Your trusted partner in financial clarity.</p>
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

export default JoinUs;
