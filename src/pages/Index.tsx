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
+import SEO from '@/components/SEO';
 
const Index = () => {
+  const [seo, setSeo] = useState({ title: 'Prime Auditors - Strategic Accounting, Tax & Advisory', description: 'Professional financial services for Tanzania and Africa.' });
   const [formData, setFormData] = useState({ name: "", email: "", company: "", message: "" });
 
   useEffect(() => {
     const script = document.createElement('script');
     script.src = 'https://www.tanzapages.com/gadgets/v2/17130/s';
     script.async = true;
     document.body.appendChild(script);
     return () => { if (document.body.contains(script)) document.body.removeChild(script); };
   }, []);
 
   const services = [
@@
   return (
     <Layout>
+      <SEO title={seo.title} description={seo.description} />
       {/* Hero Section */}
       <section className="relative min-h-[60vh] sm:min-h-[70vh] lg:min-h-[85vh] flex items-center">
*** End of patch
