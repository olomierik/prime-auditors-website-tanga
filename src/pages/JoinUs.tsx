import PageHero from "@/components/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, GraduationCap, Heart, Mail } from "lucide-react";

const positions = [
  { title: "Senior Auditor", type: "Full-time", location: "Tanga, Tanzania" },
  { title: "Tax Consultant", type: "Full-time", location: "Tanga, Tanzania" },
  { title: "Junior Accountant", type: "Full-time", location: "Tanga, Tanzania" },
  { title: "Internship Programme", type: "Internship", location: "Tanga, Tanzania" },
];

const benefits = [
  { icon: GraduationCap, title: "Continuous Learning", desc: "CPA support and ongoing professional development." },
  { icon: Briefcase, title: "Diverse Clients", desc: "Work across industries with local and international firms." },
  { icon: Heart, title: "Supportive Culture", desc: "A team that values mentorship and growth." },
];

const JoinUs = () => {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Join Our Team"
        description="Build your career with one of Tanzania's leading CPA firms. We're always looking for talent."
        image="/team-conference-2.jpg"
      />

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {benefits.map((b) => (
              <Card key={b.title} className="border-0 shadow-md hover:shadow-xl transition-all">
                <CardContent className="p-8 text-center">
                  <div className="w-14 h-14 mx-auto rounded-xl bg-prime-gold/10 flex items-center justify-center mb-4">
                    <b.icon className="w-7 h-7 text-prime-gold" />
                  </div>
                  <h3 className="font-montserrat font-bold text-prime-blue text-lg mb-2">{b.title}</h3>
                  <p className="text-gray-600 font-open-sans text-sm">{b.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mb-10">
            <h2 className="text-2xl lg:text-3xl font-montserrat font-bold text-prime-blue mb-3">Open Positions</h2>
            <p className="text-gray-600 font-open-sans">Apply by sending your CV to info@primeauditors.co.tz</p>
          </div>

          <div className="space-y-4 max-w-3xl mx-auto mb-12">
            {positions.map((p) => (
              <Card key={p.title} className="border border-gray-100 shadow-sm hover:shadow-md transition-all">
                <CardContent className="p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <h3 className="font-montserrat font-bold text-prime-blue">{p.title}</h3>
                    <p className="text-sm text-gray-600 font-open-sans">{p.type} · {p.location}</p>
                  </div>
                  <Button asChild className="bg-prime-blue hover:bg-prime-blue/90 text-white">
                    <a href={`mailto:info@primeauditors.co.tz?subject=Application: ${encodeURIComponent(p.title)}`}>
                      <Mail className="mr-2 w-4 h-4" /> Apply
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default JoinUs;