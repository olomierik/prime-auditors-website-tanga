import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import teamConference1 from '@/assets/team-conference-1.jpg';
import teamConference2 from '@/assets/team-conference-2.jpg';
import teamProfessional from '@/assets/team-professional.jpg';
import nbaaCertificate from '@/assets/nbaa-certificate.jpg';

const teamMembers = [
  { name: "CPA Mohammed Ally", role: "Managing Partner", bio: "Over 15 years in accounting and tax advisory. Leads Prime Auditors with deep expertise.", image: teamConference2 },
  { name: "Suzana Godfrey Sawe", role: "Consultant", bio: "MSc in Accounting and Finance. Trainer and consultant.", image: teamProfessional },
  { name: "Erick Elibariki Olomi", role: "Senior Consultant", bio: "15+ years in accounting and advisory.", image: teamConference1 },
];

const AboutUs: React.FC = () => {
  return (
    <Layout>
      <section className="relative bg-prime-blue py-14 sm:py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1527443154391-507d9e3a5c66')] bg-cover bg-center opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <p className="text-sm font-montserrat font-semibold tracking-widest uppercase mb-2">About Us</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-montserrat font-bold mb-4">Our Story</h1>
          <p className="max-w-2xl mx-auto text-lg">Prime Auditors is a Tanzanian CPA firm focused on integrity, excellence, and client success. We combine local market knowledge with international best practices.</p>
        </div>
      </section>

      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-5">
            <p className="text-sm font-montserrat font-semibold text-prime-gold tracking-widest uppercase">Team & Certification</p>
            <h2 className="text-3xl font-montserrat font-bold text-prime-blue">Meet the Team</h2>
            <p className="text-gray-600 font-open-sans leading-relaxed">Our team of CPAs and consultants brings decades of experience in auditing, tax advisory, and management consulting. We’re committed to delivering value with integrity.</p>
            <a href="https://www.nbaa.go.tz/nbaa-firm-details/MTE0OA==/show" target="_blank" rel="noopener noreferrer">
              <Badge variant="outline" className="border-prime-gold text-prime-gold">NBAA PF510 Registration</Badge>
            </a>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {teamMembers.map((m, idx) => (
              <Card key={idx} className="border border-gray-100 shadow-sm">
                <CardContent className="p-4 space-y-2 text-center">
                  <img src={m.image} alt={m.name} className="w-full h-40 object-cover rounded" />
                  <div className="font-montserrat font-semibold text-prime-blue">{m.name}</div>
                  <div className="text-xs text-gray-600">{m.role}</div>
                  <div className="text-sm text-gray-600 font-open-sans">{m.bio}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-prime-light-grey">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-montserrat font-bold text-prime-blue">Our Mission</h2>
            <p className="text-gray-600 font-open-sans">To be Tanzania's most trusted, innovative CPA firm delivering outstanding financial solutions with integrity and client focus.</p>
          </div>
          <img src={nbaaCertificate} alt="NBAA certificate" className="rounded-xl shadow-2xl" />
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link to="/join">
            <Button className="bg-prime-gold hover:bg-prime-gold/90 text-prime-blue font-montserrat font-semibold">Join Our Team</Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default AboutUs;
