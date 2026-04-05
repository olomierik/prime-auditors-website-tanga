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
+import OpenGraph from '@/components/SEO';
 
 const Index = () => {
-  const [seo, setSeo] = useState({ title: 'Prime Auditors - Strategic Accounting, Tax & Advisory', description: 'Professional financial services for Tanzania and Africa.' });
+  const [seo, setSeo] = useState({ title: 'Prime Auditors - Strategic Accounting, Tax & Advisory', description: 'Professional financial services for Tanzania and Africa.', image: '/path/to/og-image.jpg', url: window.location.href });
   const [formData, setFormData] = useState({ name: "", email: "", company: "", message: "" });
+  const [isSubmitting, setIsSubmitting] = useState(false);
+  const [submitMessage, setSubmitMessage] = useState('');
@@
-  return (
-    <Layout>
-      <SEO title={seo.title} description={seo.description} />
+  return (
+    <Layout>
+      <SEO title={seo.title} description={seo.description} image={seo.image} url={seo.url} />
*** End Patch
