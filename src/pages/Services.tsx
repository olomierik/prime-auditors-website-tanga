import { CheckCircle, Calculator, FileText, Shield, TrendingUp, Phone, ArrowRight, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import nbaaCertificate from "@/assets/nbaa-certificate.jpg";
import teamConference1 from "@/assets/team-conference-1.jpg";
import teamConference2 from "@/assets/team-conference-2.jpg";
import teamProfessional from "@/assets/team-professional.jpg";
+import SEO from '@/components/SEO';
 
 const Services = () => {
   const navigate = useNavigate();
 
   const handleGetConsultation = () => {
     navigate('/#contact');
   };
+
+  const seo = {
+    title: 'Prime Auditors - Services in Tanzania',
+    description: 'Accounting, Tax, Auditing & Advisory services for local businesses, corporates, and foreign investors.'
+  };
@@
   return (
     <Layout>
+      <SEO title={seo.title} description={seo.description} />
       {/* Hero */}
       <section className="bg-prime-blue py-14 sm:py-20 lg:py-28">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
           <p className="text-sm font-montserrat font-semibold text-prime-gold tracking-widest uppercase mb-4">Our Services</p>
           <h1 className="text-3xl sm:text-4xl lg:text-5xl font-montserrat font-bold text-white mb-6">
             Professional Financial Services
           </h1>
*** End Patch
