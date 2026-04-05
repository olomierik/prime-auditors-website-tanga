import { ArrowRight, Phone, Mail, MapPin, CheckCircle, Award, TrendingUp, Shield, Globe, Users, Briefcase, Building2, Calculator, FileText, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import GoogleMap from "@/components/GoogleMap";
import heroBg from "@/assets/hero-bg.jpg";
import officeReception from "@/assets/office-reception.jpg";
import SEO from '@/components/SEO';
+import submitContact, { ContactPayload } from '@/utils/contactService';
 
 const Index = () => {
-  const [seo, setSeo] = useState({ title: 'Prime Auditors - Strategic Accounting, Tax & Advisory', description: 'Professional financial services for Tanzania and Africa.' });
+  const [seo, setSeo] = useState({ title: 'Prime Auditors - Strategic Accounting, Tax & Advisory Services in Tanzania', description: 'Empowering businesses and investors with expert financial guidance. Offering accounting, tax, and advisory services.' });
   const [formData, setFormData] = useState({ name: "", email: "", company: "", message: "" });
+  const [isSubmitting, setIsSubmitting] = useState(false);
+  const [submitMessage, setSubmitMessage] = useState('');
 
   useEffect(() => {
     const script = document.createElement('script');
     script.src = 'https://www.tanzapages.com/gadgets/v2/17130/s';
     script.async = true;
     document.body.appendChild(script);
     return () => { if (document.body.contains(script)) document.body.removeChild(script); };
   }, []);
 
+  const handleSubmit = async (e: React.FormEvent) => {
+    e.preventDefault();
+    if (!formData.name || !formData.email || !formData.message) {
+      setSubmitMessage('Please fill in all required fields.');
+      return;
+    }
+    setIsSubmitting(true);
+    const payload: ContactPayload = {
+      name: formData.name,
+      email: formData.email,
+      company: formData.company || undefined,
+      message: formData.message,
+    };
+    const result = await submitContact(payload);
+    setIsSubmitting(false);
+    if (result.ok) {
+      setSubmitMessage('Message sent successfully! We will be in touch shortly.');
+      setFormData({ name: "", email: "", company: "", message: "" }); // Clear form
+    } else {
+      setSubmitMessage(`Error sending message: ${result.error}`);
+    }
+  };
+
+  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
+    const { name, value } = e.target;
+    setFormData(prev => ({ ...prev, [name]: value }));
+  };
+
   const services = [
@@
   return (
     <Layout>
+      <SEO title={seo.title} description={seo.description} />
       {/* Hero Section */}
       <section className="relative min-h-[60vh] sm:min-h-[70vh] lg:min-h-[85vh] flex items-center">
*** End of patch
