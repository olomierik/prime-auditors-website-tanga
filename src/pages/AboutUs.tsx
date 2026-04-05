import { ArrowRight, Award, Users, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import teamConference1 from "@/assets/team-conference-1.jpg";
import teamConference2 from "@/assets/team-conference-2.jpg";
import teamProfessional from "@/assets/team-professional.jpg";
import nbaaCertificate from "@/assets/nbaa-certificate.jpg";
import officeReception from "@/assets/office-reception.jpg";
import officeWorkspace from "@/assets/office-workspace.jpg";
import SEO from '@/components/SEO';

const teamMembers = [
  { name: "CPA Mohammed Ally", role: "Managing Partner", bio: "With over 15 years of experience in accounting and tax advisory, CPA Mohammed Ally leads Prime Auditors with deep expertise in auditing, corporate structuring, and regulatory compliance.", image: teamConference2, imagePosition: "object-top" },
  { name: "Suzana Godfrey Sawe", role: "Assistant Lecturer & Consultant", bio: "MSc in Accounting and Finance. Assistant Lecturer at Sebastian Kolowa Memorial University with over 15 years of experience in accounting and tax advisory.", image: teamProfessional, imagePosition: "object-[50%_20%]" },
  { name: "Erick Elibariki Olomi", role: "Senior Consultant", bio: "With over 15 years of experience in accounting and tax advisory, Erick brings deep technical knowledge in financial management, business advisory, and compliance services.", image: teamConference1, imagePosition: "object-[center_30%]" },
];

const AboutUs = () => {
  return (
    <Layout>
      <SEO title="Prime Auditors - About Us" description="Prime Auditors is a Tanzanian CPA firm focused on integrity, excellence, and client success, with NBAA PF510 registration." />
      {/* Hero */}
      <section className="relative bg-prime-blue py-14 sm:py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920')] bg-cover bg-center opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-montserrat font-semibold text-prime-gold tracking-widest uppercase mb-4">About Us</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-montserrat font-bold text-white mb-6">
            Young | Energetic | <span className="text-prime-gold">Resourceful</span>
          </h1>
          <p className="text-lg text-white/75 max-w-2xl mx-auto font-open-sans">
            A leading CPA firm in Tanga, Tanzania — providing world-class financial services with integrity and excellence.
          </p>
        </div>
      </section>

      {/* About */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <img src={teamConference1} alt="Team conference" className="rounded-xl shadow-lg w-full h-32 sm:h-44 object-cover" />
                <img src={teamConference2} alt="Team meeting" className="rounded-xl shadow-lg w-full h-32 sm:h-44 object-cover" />
                <img src={nbaaCertificate} alt="NBAA Certificate" className="rounded-xl shadow-lg w-full h-32 sm:h-44 object-cover col-span-2" />
              </div>
            </div>
            <div className="space-y-5">
              <p className="text-sm font-montserrat font-semibold text-prime-gold tracking-widest uppercase">Our Story</p>
              <h2 className="text-3xl font-montserrat font-bold text-prime-blue">About Prime Auditors</h2>
              <p className="text-gray-600 font-open-sans leading-relaxed">
                <strong className="text-prime-blue">Prime Auditors</strong> is a Certified Public Accountants firm based in Tanga, Tanzania. We are registered by the National Board of Accountants and Auditors (NBAA) as Certified Public Accountants in Public Practice.
              </p>
              <p className="text-gray-600 font-open-sans leading-relaxed">
                Our mission is to be the most trusted, innovative, and results-driven consulting firm in Tanzania. We combine deep local market knowledge with international best practices.
              </p>
              <a href="https://www.nbaa.go.tz/nbaa-firm-details/MTE0OA==/show" target="_blank" rel="noopener noreferrer">
                <Badge variant="outline" className="border-prime-gold text-prime-gold hover:bg-prime-gold/10 transition-colors cursor-pointer text-sm px-4 py-2 mt-2">
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
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Briefcase, title: "Our Mission", desc: "To provide comprehensive, high-quality financial solutions that empower businesses to make informed decisions and achieve sustainable growth.", color: "prime-gold" },
              { icon: Award, title: "Our Vision", desc: "To be the most trusted and innovative CPA firm in Tanzania, setting the standard for excellence in professional financial services.", color: "prime-blue" },
              { icon: Users, title: "Our Values", desc: "Integrity, professionalism, innovation, and client-centricity guide every engagement and relationship we build.", color: "prime-gold" },
            ].map((item, i) => (
              <Card key={i} className="border-0 shadow-sm bg-white border-t-4 border-t-prime-gold">
                <CardContent className="p-8 space-y-4 text-center">
                  <div className="w-14 h-14 rounded-full bg-prime-gold/10 flex items-center justify-center mx-auto">
                    <item.icon className="w-7 h-7 text-prime-gold" />
                  </div>
                  <h3 className="text-lg font-montserrat font-bold text-prime-blue">{item.title}</h3>
                  <p className="text-sm text-gray-600 font-open-sans">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <p className="text-sm font-montserrat font-semibold text-prime-gold tracking-widest uppercase mb-3">Our Team</p>
            <h2 className="text-2xl sm:text-3xl font-montserrat font-bold text-prime-blue mb-4">Meet the Professionals</h2>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {teamMembers.map((member, i) => (
              <Card key={i} className="border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group overflow-hidden">
                <div className="relative overflow-hidden">
                  <img src={member.image} alt={member.name} className={`w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105 ${member.imagePosition}`} />
                </div>
                <CardContent className="p-5 text-center space-y-2">
                  <h3 className="font-montserrat font-bold text-prime-blue text-sm">{member.name}</h3>
                  <Badge className="bg-prime-gold/10 text-prime-gold border-prime-gold/20 font-montserrat text-[10px]">{member.role}</Badge>
                  <p className="text-xs text-gray-600 font-open-sans leading-relaxed">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/join">
              <Button className="bg-prime-gold hover:bg-prime-gold/90 text-prime-blue font-montserrat font-semibold">
                Join as a Consultant <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-14 sm:py-20 bg-prime-light-grey">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <p className="text-sm font-montserrat font-semibold text-prime-gold tracking-widest uppercase mb-3">Gallery</p>
            <h2 className="text-2xl sm:text-3xl font-montserrat font-bold text-prime-blue">Professional Development & Activities</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[teamConference1, teamConference2, teamProfessional, nbaaCertificate, officeReception, officeWorkspace].map((img, i) => (
              <div key={i} className="relative overflow-hidden rounded-xl shadow-lg group">
                <img src={img} alt={`Team activity ${i + 1}`} className="w-full h-48 sm:h-56 object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-prime-blue/20 group-hover:bg-prime-blue/40 transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-prime-blue text-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-5">
          <h2 className="text-3xl font-montserrat font-bold">Need More Details?</h2>
          <p className="text-white/75 font-open-sans text-lg">Contact us to discuss how Prime Auditors can support your needs.</p>
          <Link to="/#contact">
            <Button className="bg-prime-gold hover:bg-prime-gold/90 text-prime-blue font-montserrat font-semibold px-8">
              Get in Contact <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default AboutUs;
