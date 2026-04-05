import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Globe, Briefcase, Calculator, FileText, Users, MapPin, Phone, Mail, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import heroBg from '@/assets/hero-bg.jpg'; // Assuming you have this for the hero background, adjust if needed

const ForeignInvestors: React.FC = () => {
  const stats = [
    { value: "6.5%+", label: "Avg. GDP Growth" },
    { value: "180M+", label: "Market Size (Population)" },
    { value: "Top 10", label: "African Investment Destination" },
    { value: "100%", label: "Foreign Ownership Allowed" },
  ];

  const servicesOffered = [
    { icon: Briefcase, title: "Business Registration & Licensing", description: "Navigate the complexities of company setup, obtain necessary licenses and permits efficiently." },
    { icon: Globe, title: "Investment Structuring", description: "Optimize your investment structure for tax efficiency and regulatory compliance in Tanzania." },
    { icon: FileText, title: "Tax Advisory & Compliance", description: "Expert guidance on Tanzanian tax laws, VAT, corporate tax, and transfer pricing for foreign entities." },
    { icon: Shield, title: "Regulatory Compliance", description: "Ensure adherence to all local regulations and labor laws." },
    { icon: Users, title: "Operational Setup", description: "Support setting up your local operations, including payroll and HR." },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] lg:min-h-[70vh] flex items-center text-white bg-prime-blue">
        <div className="absolute inset-0">
          <img src={heroBg} alt="" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-r from-prime-blue/95 via-prime-blue/85 to-prime-blue/60" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-32">
          <div className="max-w-3xl space-y-6">
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-montserrat font-bold leading-tight">
              Tanzania: Your Gateway to <span className="text-prime-gold">African Markets</span>
            </h1>
            <p className="text-lg lg:text-xl text-white/80 font-open-sans leading-relaxed">
              Prime Auditors guides international investors through seamless market entry and operation in Tanzania, unlocking your business potential in East Africa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/#contact">
                <Button size="lg" className="bg-prime-gold hover:bg-prime-gold/90 text-prime-blue font-montserrat font-semibold px-8 text-base w-full sm:w-auto">
                  Schedule Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/services">
                <Button variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 font-montserrat font-semibold px-8 text-base w-full sm:w-auto">
                  Explore Our Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tanzania Investment Pros */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="text-sm font-montserrat font-semibold text-prime-gold tracking-widest uppercase mb-3">Why Invest in Tanzania?</p>
            <h2 className="text-3xl lg:text-4xl font-montserrat font-bold text-prime-blue mb-4">
              A Stable and Growing Economy Ready for Your Investment
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <Card key={i} className="border border-gray-100 shadow-sm text-center p-6 group">
                <CardContent className="p-0">
                  <div className={`text-3xl sm:text-4xl lg:text-5xl font-montserrat font-bold text-prime-gold mb-2 group-hover:text-prime-blue transition-colors ${i === 1 || i === 3 ? 'text-prime-gold' : 'text-prime-blue'}`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 font-open-sans font-medium group-hover:text-prime-blue transition-colors">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Gateway Section */}
      <section className="py-16 lg:py-20 bg-prime-light-grey">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-montserrat font-bold text-prime-blue mb-6">
                Your Hassle-Free Entry into Tanzania's Market
              </h2>
              <p className="text-gray-600 font-open-sans leading-relaxed mb-8">
                Navigating foreign investment regulations, business registration, and tax laws can be challenging. Prime Auditors provides end-to-end support, ensuring a smooth and compliant entry for your business. We handle the bureaucratic complexities so you can focus on strategic growth.
              </p>
              <Link to="/#contact">
                <Button className="bg-prime-gold hover:bg-prime-gold/90 text-prime-blue font-montserrat font-semibold px-8">
                  Let Us Guide You <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="space-y-6">
              {servicesOffered.map((svc, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-prime-blue/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <svc.icon className="w-5 h-5 text-prime-blue" />
                  </div>
                  <div>
                    <h4 className="font-montserrat font-semibold text-prime-blue text-sm">{svc.title}</h4>
                    <p className="text-sm text-gray-600 font-open-sans mt-0.5">{svc.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials for Investors */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
            <p className="text-sm font-montserrat font-semibold text-prime-gold tracking-widest uppercase mb-3">Client Success</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-montserrat font-bold text-prime-blue mb-4">
              What Investors Say About Us
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
            {[
              { quote: "Prime Auditors made our investment in Tanzania remarkably smooth. Their expert guidance on local regulations and tax was invaluable.", name: "David Lee", role: "CEO, Global Ventures" },
              { quote: "From setup to compliance, Prime Auditors handled everything professionally. Their understanding of the Tanzanian market is second to none.", name: "Maria Rodriguez", role: "Director, Africa Expansion Group" },
              { quote: "We trusted Prime Auditors to navigate the complexities of foreign investment, and they exceeded our expectations. Highly recommend their services.", name: "Kenji Tanaka", role: "Investment Manager, East Point Capital" },
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
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 lg:py-20 bg-prime-blue text-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl font-montserrat font-bold">Ready to Invest in Tanzania?</h2>
          <p className="text-white/75 font-open-sans text-lg">Let Prime Auditors be your trusted partner.</p>
          <Link to="/#contact">
            <Button className="bg-prime-gold hover:bg-prime-gold/90 text-prime-blue font-montserrat font-semibold px-8">
              Schedule Your Consultation <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default ForeignInvestors;
