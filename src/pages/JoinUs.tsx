import { useState } from "react";
import { useTranslation } from "react-i18next";
import PageHero from "@/components/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Briefcase, GraduationCap, Heart, Loader2, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const JoinUs = () => {
  const { t } = useTranslation();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    full_name: "", email: "", phone: "", specialization: "", experience: "", qualifications: "", cover_letter: "",
  });

  const positions = [
    { title: t("join.position1"), type: t("join.fullTime"), location: t("join.location") },
    { title: t("join.position2"), type: t("join.fullTime"), location: t("join.location") },
    { title: t("join.position3"), type: t("join.fullTime"), location: t("join.location") },
    { title: t("join.position4"), type: t("join.internship"), location: t("join.location") },
  ];

  const benefits = [
    { icon: GraduationCap, title: t("join.benefit1Title"), desc: t("join.benefit1Desc") },
    { icon: Briefcase, title: t("join.benefit2Title"), desc: t("join.benefit2Desc") },
    { icon: Heart, title: t("join.benefit3Title"), desc: t("join.benefit3Desc") },
  ];

  const update = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.full_name || !form.email || !form.phone || !form.specialization || !form.experience || !form.cover_letter) {
      toast.error(t("join.fillRequired"));
      return;
    }
    setSubmitting(true);
    try {
      const { error } = await supabase.from("consultant_applications").insert([form]);
      if (error) throw error;
      const subject = `New Job Application: ${form.specialization} – ${form.full_name}`;
      const body =
        `Full Name: ${form.full_name}\nEmail: ${form.email}\nPhone: ${form.phone}\n` +
        `Specialization: ${form.specialization}\nExperience: ${form.experience}\n` +
        `Qualifications: ${form.qualifications || "-"}\n\nCover Letter:\n${form.cover_letter}\n\n(Please attach your CV.)`;
      window.location.href = `mailto:info@primeauditors.co.tz?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      toast.success(t("join.success"));
      setForm({ full_name: "", email: "", phone: "", specialization: "", experience: "", qualifications: "", cover_letter: "" });
    } catch (err) {
      console.error(err);
      toast.error(t("join.error"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <PageHero eyebrow={t("join.eyebrow")} title={t("join.title")} description={t("join.description")} image="/team-conference-2.jpg" />
      <section className="py-16 lg:py-24 bg-prime-blue-deepest">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {benefits.map((b) => (
              <Card key={b.title} className="border border-white/10 bg-white/[0.03] hover:border-prime-gold/30 transition-colors">
                <CardContent className="p-8 text-center">
                  <div className="w-14 h-14 mx-auto rounded-sm bg-prime-gold/10 border border-prime-gold/20 flex items-center justify-center mb-4">
                    <b.icon className="w-7 h-7 text-prime-gold" />
                  </div>
                  <h3 className="font-serif font-semibold text-white text-lg mb-2">{b.title}</h3>
                  <p className="text-white/55 font-open-sans text-sm">{b.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mb-10">
            <h2 className="text-2xl lg:text-3xl font-serif font-semibold text-white mb-3 tracking-[-0.02em]">{t("join.openPositions")}</h2>
            <p className="text-white/55 font-open-sans">{t("join.applyHint")}</p>
          </div>

          <div className="space-y-4 max-w-3xl mx-auto mb-12">
            {positions.map((p) => (
              <Card key={p.title} className="border border-white/10 bg-white/[0.03] hover:border-prime-gold/30 transition-colors">
                <CardContent className="p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <h3 className="font-serif font-semibold text-white">{p.title}</h3>
                    <p className="text-sm text-white/55 font-open-sans">{p.type} · {p.location}</p>
                  </div>
                  <Button onClick={() => { update("specialization", p.title); document.getElementById("application-form")?.scrollIntoView({ behavior: "smooth" }); }} className="bg-prime-gold hover:bg-prime-gold-bright text-prime-blue font-montserrat font-bold uppercase tracking-[0.1em] rounded-none">
                    {t("join.applyNow")}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div id="application-form" className="max-w-3xl mx-auto bg-white/[0.03] border border-white/10 p-6 sm:p-8">
            <h3 className="text-2xl font-serif font-semibold text-white mb-2">{t("join.submit")}</h3>
            <p className="text-white/55 font-open-sans text-sm mb-6">{t("join.submitHint")}</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <Input placeholder={t("join.fullName")} value={form.full_name} onChange={(e) => update("full_name", e.target.value)} />
                <Input type="email" placeholder={t("join.email")} value={form.email} onChange={(e) => update("email", e.target.value)} />
                <Input placeholder={t("join.phone")} value={form.phone} onChange={(e) => update("phone", e.target.value)} />
                <Input placeholder={t("join.specialization")} value={form.specialization} onChange={(e) => update("specialization", e.target.value)} />
              </div>
              <Input placeholder={t("join.experience")} value={form.experience} onChange={(e) => update("experience", e.target.value)} />
              <Input placeholder={t("join.qualifications")} value={form.qualifications} onChange={(e) => update("qualifications", e.target.value)} />
              <Textarea placeholder={t("join.coverLetter")} rows={5} value={form.cover_letter} onChange={(e) => update("cover_letter", e.target.value)} />
              <Button type="submit" disabled={submitting} className="w-full bg-prime-gold hover:bg-prime-gold-bright text-prime-blue font-montserrat font-bold uppercase tracking-[0.12em] rounded-none">
                {submitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />{t("join.submitting")}</> : <><Send className="mr-2 h-4 w-4" />{t("join.submitBtn")}</>}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default JoinUs;
