import { Send, Briefcase, GraduationCap, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/Layout";

const JoinUs = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    fullName: "", email: "", phone: "", specialization: "", experience: "", qualifications: "", coverLetter: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("consultant_applications").insert([{
        full_name: formData.fullName, email: formData.email, phone: formData.phone,
        specialization: formData.specialization, experience: formData.experience,
        qualifications: formData.qualifications || null, cover_letter: formData.coverLetter,
      }]);
      if (error) throw error;
      setIsSubmitted(true);
      toast({ title: "Application Submitted!", description: "We'll review your application and get back to you soon." });
    } catch (error) {
      toast({ title: "Submission Failed", description: "There was an error. Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-prime-blue py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-montserrat font-semibold text-prime-gold tracking-widest uppercase mb-4">Careers</p>
          <h1 className="text-4xl lg:text-5xl font-montserrat font-bold text-white mb-4">Join as a Consultant</h1>
          <p className="text-lg text-white/75 max-w-2xl mx-auto font-open-sans">
            Become part of a dynamic, growing CPA firm. We're always looking for talented professionals.
          </p>
        </div>
      </section>

      {/* Why Join */}
      <section className="py-16 bg-prime-light-grey">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-montserrat font-bold text-prime-blue mb-4">Why Join Prime Auditors?</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: GraduationCap, title: "Professional Growth", desc: "CPD training, conferences, and diverse client engagements." },
              { icon: Briefcase, title: "Diverse Projects", desc: "Work across industries — from SMEs to multinationals." },
              { icon: CheckCircle, title: "Flexible Engagement", desc: "Full-time or independent consultant arrangements." },
            ].map((item, i) => (
              <Card key={i} className="border-0 shadow-sm bg-white border-t-4 border-t-prime-gold">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="w-14 h-14 bg-prime-gold/10 rounded-full flex items-center justify-center mx-auto">
                    <item.icon className="w-7 h-7 text-prime-gold" />
                  </div>
                  <h3 className="font-montserrat font-bold text-prime-blue">{item.title}</h3>
                  <p className="text-sm text-gray-600 font-open-sans">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-montserrat font-semibold text-prime-gold tracking-widest uppercase mb-3">Apply Now</p>
            <h2 className="text-3xl font-montserrat font-bold text-prime-blue mb-2">Submit Your Application</h2>
          </div>

          {isSubmitted ? (
            <Card className="border-0 shadow-sm bg-prime-light-grey">
              <CardContent className="p-10 text-center space-y-5">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-montserrat font-bold text-prime-blue">Application Submitted!</h3>
                <p className="text-gray-600 font-open-sans text-sm">We'll review your application and get back to you within 5 business days.</p>
                <Link to="/"><Button className="bg-prime-blue hover:bg-prime-blue/90 text-white font-montserrat">Back to Home</Button></Link>
              </CardContent>
            </Card>
          ) : (
            <Card className="border border-gray-100 shadow-sm">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-montserrat font-medium text-prime-blue mb-1.5">Full Name *</label>
                      <Input name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Your full name" required className="border-gray-200 focus:border-prime-gold" />
                    </div>
                    <div>
                      <label className="block text-xs font-montserrat font-medium text-prime-blue mb-1.5">Email *</label>
                      <Input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" required className="border-gray-200 focus:border-prime-gold" />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-montserrat font-medium text-prime-blue mb-1.5">Phone *</label>
                      <Input name="phone" value={formData.phone} onChange={handleChange} placeholder="+255 xxx xxx xxx" required className="border-gray-200 focus:border-prime-gold" />
                    </div>
                    <div>
                      <label className="block text-xs font-montserrat font-medium text-prime-blue mb-1.5">Specialization *</label>
                      <Input name="specialization" value={formData.specialization} onChange={handleChange} placeholder="e.g., Tax Advisory" required className="border-gray-200 focus:border-prime-gold" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-montserrat font-medium text-prime-blue mb-1.5">Years of Experience *</label>
                    <Input name="experience" value={formData.experience} onChange={handleChange} placeholder="e.g., 5 years" required className="border-gray-200 focus:border-prime-gold" />
                  </div>
                  <div>
                    <label className="block text-xs font-montserrat font-medium text-prime-blue mb-1.5">Qualifications</label>
                    <Input name="qualifications" value={formData.qualifications} onChange={handleChange} placeholder="e.g., CPA, ACCA" className="border-gray-200 focus:border-prime-gold" />
                  </div>
                  <div>
                    <label className="block text-xs font-montserrat font-medium text-prime-blue mb-1.5">Cover Letter *</label>
                    <Textarea name="coverLetter" value={formData.coverLetter} onChange={handleChange} placeholder="Tell us about yourself..." rows={4} required className="border-gray-200 focus:border-prime-gold" />
                  </div>
                  <Button type="submit" disabled={isSubmitting} className="w-full bg-prime-gold hover:bg-prime-gold/90 text-prime-blue font-montserrat font-semibold">
                    {isSubmitting ? "Submitting..." : "Submit Application"} <Send className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default JoinUs;
