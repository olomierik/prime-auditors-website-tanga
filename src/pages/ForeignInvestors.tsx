import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Globe, Briefcase, Calculator, FileText, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import heroBg from '@/assets/hero-bg.jpg'; // Assuming you have this for the hero background, adjust if needed
import SEO from '@/components/SEO';

const ForeignInvestors: React.FC = () => {
  const seo = {
    title: 'Prime Auditors - Foreign Investment in Tanzania',
    description: 'Guiding international investors through Tanzania investment opportunities, company setup, tax, and regulatory compliance.'
  };
  const servicesOffered = [
    { icon: Briefcase, title: 'Business Registration & Licensing', description: 'Navigate company setup and licensing for foreign entities.' },
    { icon: Globe, title: 'Investment Structuring', description: 'Tax-efficient structures and compliant frameworks for Tanzania.' },
    { icon: FileText, title: 'Tax Advisory & Compliance', description: 'VAT, corporate tax, and transfer pricing guidance.' },
  ];

  return (
    <Layout>
      <SEO title={seo.title} description={seo.description} />
      {/* Hero Section */}
      <section className="relative min-h-[60vh] lg:min-h-[70vh] flex items-center text-white" style={{ background: '#1e3a8a' }}>
        <div className="absolute inset-0">
          <img src={heroBg} alt="" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-r from-prime-blue/95 via-prime-blue/85 to-prime-blue/60" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-32 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-montserrat font-bold">Tanzania for International Investors</h1>
          <p className="text-lg mt-4">Your partner for a smooth market entry, compliant setup, and growth in East Africa.</p>
          <div className="mt-6 flex justify-center gap-4">
            <Link to="/#contact"><Button className="bg-prime-gold text-prime-blue">Schedule Consultation</Button></Link>
            <Link to="/services"><Button variant="outline">Explore Services</Button></Link>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-4">
              <p className="text-sm font-montserrat font-semibold text-prime-gold tracking-widest uppercase">Overview</p>
              <h2 className="text-3xl font-montserrat font-bold text-prime-blue">What We Offer to Foreign Investors</h2>
              <p className="text-gray-600">From company formation to ongoing tax advisory, Prime Auditors helps international investors simplify entry into Tanzania and sustain growth with compliant operations.</p>
              <div className="flex gap-4 mt-4">
                <Button className="bg-prime-gold">Learn More</Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {servicesOffered.map((s, i) => (
                <Card key={i} className="border border-gray-100 shadow-sm">
                  <CardContent className="p-4 space-y-2 text-center">
                    <s.icon className="w-6 h-6 mx-auto text-prime-blue" />
                    <div className="font-medium text-prime-blue">{s.title}</div>
                    <div className="text-sm text-gray-600">{s.description}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-prime-blue text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-montserrat font-bold mb-2">Ready to Start Your Tanzania Investment?</h2>
          <p className="mb-6">Let Prime Auditors guide you from registration to operational success.</p>
          <Link to="/#contact"><Button className="bg-prime-gold">Get a Consultation</Button></Link>
        </div>
      </section>
    </Layout>
  );
};

export default ForeignInvestors;
