import { useState } from "react";
import PageHero from "@/components/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Briefcase, GraduationCap, Heart, Loader2, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

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
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    specialization: "",
    experience: "",
    qualifications: "",
    cover_letter: "",
  });

  const update = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.full_name || !form.email || !form.phone || !form.specialization || !form.experience || !form.cover_letter) {
      toast.error("Please fill all required fields.");
      return;
    }
    setSubmitting(true);
    try {
      const { error } = await supabase.from("consultant_applications").insert([form]);
      if (error) throw error;

      const subject = `New Job Application: ${form.specialization} – ${form.full_name}`;
      const body =
        `Full Name: ${form.full_name}\n` +
        `Email: ${form.email}\n` +
        `Phone: ${form.phone}\n` +
        `Specialization: ${form.specialization}\n` +
        `Experience: ${form.experience}\n` +
        `Qualifications: ${form.qualifications || "-"}\n\n` +
        `Cover Letter:\n${form.cover_letter}\n\n` +
        `(Please attach your CV to this email before sending.)`;
      window.location.href = `mailto:info@primeauditors.co.tz?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;

      toast.success("Application saved. Your email client will open – please attach your CV and send.");
      setForm({ full_name: "", email: "", phone: "", specialization: "", experience: "", qualifications: "", cover_letter: "" });
    } catch (err) {
      console.error(err);
      toast.error("Could not submit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

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
                  <Button
                    onClick={() => {
                      update("specialization", p.title);
                      document.getElementById("application-form")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="bg-prime-blue hover:bg-prime-blue/90 text-white"
                  >
                    Apply Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Application Form */}
          <div id="application-form" className="max-w-3xl mx-auto bg-white rounded-2xl border border-gray-100 shadow-xl p-6 sm:p-8">
            <h3 className="text-2xl font-montserrat font-bold text-prime-blue mb-2">Submit Your Application</h3>
            <p className="text-gray-600 font-open-sans text-sm mb-6">
              Complete the form below. After submitting, your email client will open so you can attach your CV and send it to info@primeauditors.co.tz.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <Input placeholder="Full Name *" value={form.full_name} onChange={(e) => update("full_name", e.target.value)} />
                <Input type="email" placeholder="Email *" value={form.email} onChange={(e) => update("email", e.target.value)} />
                <Input placeholder="Phone *" value={form.phone} onChange={(e) => update("phone", e.target.value)} />
                <Input placeholder="Position / Specialization *" value={form.specialization} onChange={(e) => update("specialization", e.target.value)} />
              </div>
              <Input placeholder="Years of Experience *" value={form.experience} onChange={(e) => update("experience", e.target.value)} />
              <Input placeholder="Qualifications (CPA, ACCA, etc.)" value={form.qualifications} onChange={(e) => update("qualifications", e.target.value)} />
              <Textarea placeholder="Cover Letter *" rows={5} value={form.cover_letter} onChange={(e) => update("cover_letter", e.target.value)} />
              <Button type="submit" disabled={submitting} className="w-full bg-prime-gold hover:bg-prime-gold/90 text-prime-blue font-semibold">
                {submitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Submitting...</> : <><Send className="mr-2 h-4 w-4" />Submit Application</>}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default JoinUs;