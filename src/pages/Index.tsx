import { ArrowRight, Phone, Mail, MapPin, CheckCircle, Award, TrendingUp, Shield, Globe, Users, Briefcase, Building2, Calculator, FileText, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import GoogleMap from "@/components/GoogleMap";
import heroBg from "@/assets/hero-bg.jpg";
import officeReception from "@/assets/office-reception.jpg";
import SEO from '@/components/SEO';
import { useLanguage } from '@/contexts/LanguageContext';

const Index = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ name: "", email: "", company: "", message: "" });

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.tanzapages.com/gadgets/v2/17130/s';
    script.async = true;
    document.body.appendChild(script);
    return () => { if (document.body.contains(script)) document.body.removeChild(script); };
  }, []);

  const services = [
    { icon: Shield, titleKey: 'service.audit', descKey: 'service.auditDesc' },
    { icon: FileText, titleKey: 'service.tax', descKey: 'service.taxDesc' },
    { icon: Building2, titleKey: 'service.registration', descKey: 'service.registrationDesc' },
    { icon: Globe, titleKey: 'service.holding', descKey: 'service.holdingDesc' },
    { icon: Briefcase, titleKey: 'service.corporate', descKey: 'service.corporateDesc' },
    { icon: Calculator, titleKey: 'service.accounting', descKey: 'service.accountingDesc' },
  ];

  const whyChooseUs = [
    { icon: Globe, titleKey: 'why.international', descKey: 'why.internationalDesc' },
    { icon: Award, titleKey: 'why.trusted', descKey: 'why.trustedDesc' },
    { icon: Shield, titleKey: 'why.regulatory', descKey: 'why.regulatoryDesc' },
    { icon: Users, titleKey: 'why.professional', descKey: 'why.professionalDesc' },
  ];

  const stats = [
    { value: "10+", labelKey: 'stats.years' },
    { value: "100+", labelKey: 'stats.clients' },
    { value: "6", labelKey: 'stats.services' },
    { value: "24/7", labelKey: 'stats.support' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <Layout>
      <SEO title="Prime Auditors - Strategic Accounting, Tax & Advisory" description="Professional financial services for Tanzania and Africa." />
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] sm:min-h-[70vh] lg:min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-prime-blue/95 via-prime-blue/85 to-prime-blue/60" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUvNSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-32">
          <motion.div 
            className="max-w-2xl space-y-5 sm:space-y-8"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div 
              variants={itemVariants}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 sm:px-4 py-1.5 text-[11px] sm:text-xs text-white/90 font-open-sans shadow-lg"
            >
              <Award className="w-3.5 h-3.5 text-prime-gold" />
              {t('hero.badge')}
            </motion.div>
            
            <motion.h1 
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-montserrat font-bold text-white leading-[1.1]"
            >
              {t('hero.title1')}{" "}
              <span className="text-prime-gold">{t('hero.titleHighlight')}</span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-base sm:text-lg lg:text-xl text-white/80 font-open-sans leading-relaxed max-w-xl"
            >
              {t('hero.subtitle')}
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link to="/#contact">
                <Button size="lg" className="bg-prime-gold hover:bg-prime-gold/90 text-prime-blue font-montserrat font-semibold px-8 text-base w-full sm:w-auto shadow-xl shadow-prime-gold/30 hover:shadow-2xl hover:shadow-prime-gold/40 transition-all group">
                  {t('hero.cta1')}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/services">
                <Button size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 font-montserrat font-semibold px-8 text-base w-full sm:w-auto backdrop-blur-sm transition-all">
                  {t('hero.cta2')}
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-full opacity-20 pointer-events-none hidden lg:block">
          <div className="absolute top-20 right-20 w-64 h-64 bg-prime-gold/20 rounded-full blur-3xl" />
          <div className="absolute bottom-40 right-40 w-48 h-48 bg-prime-gold/10 rounded-full blur-2xl" />
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid grid-cols-2 lg:grid-cols-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {stats.map((stat, i) => (
              <motion.div 
                key={i} 
                variants={itemVariants}
                className="py-6 sm:py-10 px-3 sm:px-6 text-center relative"
              >
                {i < stats.length - 1 && i < 2 && (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 h-12 w-px bg-gray-100 hidden sm:block" />
                )}
                <div className="text-2xl sm:text-3xl lg:text-4xl font-montserrat font-bold text-prime-blue bg-gradient-to-r from-prime-blue to-prime-blue/80 bg-clip-text">{stat.value}</div>
                <div className="text-xs sm:text-sm text-gray-500 font-open-sans mt-1">{t(stat.labelKey)}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-white to-prime-light-grey/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center max-w-2xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-sm font-montserrat font-semibold text-prime-gold tracking-widest uppercase mb-3">{t('services.title')}</p>
            <h2 className="text-3xl lg:text-4xl font-montserrat font-bold text-prime-blue mb-4">
              {t('services.subtitle')}
            </h2>
            <p className="text-gray-600 font-open-sans">
              {t('services.description')}
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {services.map((svc, i) => (
              <motion.div key={i} variants={itemVariants}>
                <Card className="group border border-gray-100 shadow-sm hover:shadow-xl hover:border-prime-gold/30 transition-all duration-300 hover:-translate-y-2 h-full bg-white/80 backdrop-blur-sm overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-prime-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <CardContent className="p-8 space-y-4 relative z-10">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-prime-blue to-prime-blue/80 flex items-center justify-center shadow-lg shadow-prime-blue/20 group-hover:shadow-xl group-hover:shadow-prime-blue/30 group-hover:scale-110 transition-all">
                      <svc.icon className="w-6 h-6 text-prime-gold" />
                    </div>
                    <h3 className="text-lg font-montserrat font-bold text-prime-blue">{t(svc.titleKey)}</h3>
                    <p className="text-sm text-gray-600 font-open-sans leading-relaxed">{t(svc.descKey)}</p>
                    <Link to="/services" className="inline-flex items-center text-sm font-medium text-prime-gold hover:text-prime-blue transition-colors font-montserrat group-hover:underline">
                      {t('services.learnMore')} <ArrowRight className="ml-1 h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 lg:py-28 bg-prime-light-grey">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-sm font-montserrat font-semibold text-prime-gold tracking-widest uppercase mb-3">{t('why.title')}</p>
              <h2 className="text-3xl lg:text-4xl font-montserrat font-bold text-prime-blue mb-6">
                {t('why.subtitle')}
              </h2>
              <p className="text-gray-600 font-open-sans leading-relaxed mb-8">
                {t('why.description')}
              </p>
              <div className="space-y-5">
                {whyChooseUs.map((item, i) => (
                  <motion.div 
                    key={i} 
                    className="flex gap-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-prime-gold to-prime-gold/80 flex items-center justify-center flex-shrink-0 shadow-lg shadow-prime-gold/20">
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-montserrat font-semibold text-prime-blue text-sm">{t(item.titleKey)}</h4>
                      <p className="text-sm text-gray-600 font-open-sans mt-0.5">{t(item.descKey)}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div 
              className="relative mt-8 lg:mt-0"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={officeReception}
                  alt="Prime Auditors Office"
                  className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-prime-blue/40 to-transparent" />
              </div>
              <motion.div 
                className="absolute -bottom-4 left-4 sm:-bottom-6 sm:-left-6 bg-gradient-to-br from-prime-blue to-prime-blue/90 text-white p-4 sm:p-6 rounded-xl shadow-2xl max-w-[200px] sm:max-w-[220px]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <a href="https://www.nbaa.go.tz/nbaa-firm-details/MTE0OA==/show" target="_blank" rel="noopener noreferrer" className="hover:opacity-90">
                  <div className="text-2xl sm:text-3xl font-montserrat font-bold text-prime-gold">NBAA</div>
                  <div className="text-[10px] sm:text-xs text-white/80 font-open-sans mt-1">Certified Public Accountants — PF510</div>
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* International Investors Section */}
      <section className="py-14 sm:py-20 lg:py-28 bg-gradient-to-br from-prime-blue via-prime-blue to-[#004488] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-prime-gold rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-prime-gold rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div 
              className="space-y-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
            >
              <motion.p variants={itemVariants} className="text-sm font-montserrat font-semibold text-prime-gold tracking-widest uppercase">{t('investors.title')}</motion.p>
              <motion.h2 variants={itemVariants} className="text-3xl lg:text-4xl font-montserrat font-bold leading-tight">
                {t('investors.heading')} <span className="text-prime-gold">{t('investors.headingHighlight')}</span>
              </motion.h2>
              <motion.p variants={itemVariants} className="text-white/75 font-open-sans leading-relaxed">
                {t('investors.desc1')}
              </motion.p>
              <motion.p variants={itemVariants} className="text-white/75 font-open-sans leading-relaxed">
                {t('investors.desc2')}
              </motion.p>
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link to="/foreign-investors">
                  <Button size="lg" className="bg-prime-gold hover:bg-prime-gold/90 text-prime-blue font-montserrat font-semibold px-8 w-full sm:w-auto shadow-xl shadow-prime-gold/30">
                    {t('investors.cta1')}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/#contact">
                  <Button size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 font-montserrat font-semibold px-8 w-full sm:w-auto backdrop-blur-sm">
                    {t('investors.cta2')}
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
            <motion.div 
              className="grid grid-cols-2 gap-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
            >
              {[
                { value: "6.5%+", labelKey: 'investors.gdp' },
                { value: "65M+", labelKey: 'investors.market' },
                { value: "Top 10", labelKey: 'investors.destination' },
                { value: "100%", labelKey: 'investors.ownership' },
              ].map((stat, i) => (
                <motion.div 
                  key={i} 
                  variants={itemVariants}
                  className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-6 text-center hover:bg-white/15 hover:border-white/20 transition-all group"
                >
                  <div className="text-2xl font-montserrat font-bold text-prime-gold group-hover:scale-110 transition-transform">{stat.value}</div>
                  <div className="text-xs text-white/70 font-open-sans mt-1">{t(stat.labelKey)}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Client Trust Section */}
      <section className="py-14 sm:py-20 lg:py-28 bg-gradient-to-b from-white to-prime-light-grey/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center max-w-2xl mx-auto mb-10 sm:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-sm font-montserrat font-semibold text-prime-gold tracking-widest uppercase mb-3">{t('testimonials.title')}</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-montserrat font-bold text-prime-blue mb-4">
              {t('testimonials.subtitle')}
            </h2>
          </motion.div>
          
          <motion.div 
            className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {[
              { quote: "Prime Auditors transformed our financial processes. Their expertise in tax planning saved us significant costs while ensuring full compliance.", name: "Sarah Johnson", role: "CEO, TechStart Ltd" },
              { quote: "Professional, reliable, and incredibly knowledgeable. The audit process was smooth and their recommendations improved our financial controls.", name: "Michael Chen", role: "Finance Director, Global Trade Co" },
              { quote: "Their management consulting services helped us streamline operations and improve profitability. Highly recommended for any growing business.", name: "Amina Hassan", role: "MD, Coastal Enterprises" },
            ].map((t, i) => (
              <motion.div key={i} variants={itemVariants}>
                <Card className="border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 h-full bg-white/80 backdrop-blur-sm overflow-hidden relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-prime-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <CardContent className="p-8 space-y-5 relative z-10">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className="w-4 h-4 fill-prime-gold text-prime-gold" />
                      ))}
                    </div>
                    <p className="text-gray-700 font-open-sans text-sm leading-relaxed italic">"{t.quote}"</p>
                    <div className="pt-3 border-t border-gray-100">
                      <div className="font-montserrat font-semibold text-sm text-prime-blue">{t.name}</div>
                      <div className="text-xs text-gray-500 font-open-sans">{t.role}</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <div className="flex justify-center">
            <div id="gbd_review_box_s"></div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-24 bg-gradient-to-r from-prime-light-grey to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMzM2Ni8xMCIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.h2 
            className="text-3xl lg:text-4xl font-montserrat font-bold text-prime-blue mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {t('cta.title')}
          </motion.h2>
          <motion.p 
            className="text-gray-600 font-open-sans text-lg mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {t('cta.description')}
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link to="/#contact">
              <Button size="lg" className="bg-gradient-to-r from-prime-blue to-prime-blue/90 hover:from-prime-blue/90 hover:to-prime-blue text-white shadow-xl shadow-prime-blue/30 font-montserrat font-semibold px-10 text-base w-full sm:w-auto">
                {t('cta.cta1')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/#contact">
              <Button size="lg" variant="outline" className="border-2 border-prime-blue text-prime-blue hover:bg-prime-blue hover:text-white font-montserrat font-semibold px-10 text-base w-full sm:w-auto">
                {t('cta.cta2')}
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center max-w-2xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-sm font-montserrat font-semibold text-prime-gold tracking-widest uppercase mb-3">{t('contact.title')}</p>
            <h2 className="text-3xl lg:text-4xl font-montserrat font-bold text-prime-blue mb-4">
              {t('contact.subtitle')}
            </h2>
            <p className="text-gray-600 font-open-sans">
              {t('contact.description')}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            <motion.div 
              className="space-y-6 sm:space-y-8"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="space-y-6">
                {[
                  { icon: MapPin, labelKey: 'contact.address', lines: ["Plot 24, Block KB 3, NHC Building Apt 02", "Market Street, Independence Avenue Road", "Central Ward, Tanga City, Tanzania"] },
                  { icon: Phone, labelKey: 'contact.phone', lines: ["+255 798 509 683"] },
                  { icon: Mail, labelKey: 'contact.email', lines: ["info@primeauditors.co.tz"] },
                ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    className="flex gap-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-prime-gold to-prime-gold/80 flex items-center justify-center flex-shrink-0 shadow-lg shadow-prime-gold/20">
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-montserrat font-semibold text-sm text-prime-blue">{t(item.labelKey)}</div>
                      {item.lines.map((line, j) => (
                        <div key={j} className="text-sm text-gray-600 font-open-sans">{line}</div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div 
                className="bg-gradient-to-br from-prime-light-grey to-white p-6 rounded-2xl border border-gray-100 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <h4 className="font-montserrat font-semibold text-sm text-prime-blue mb-3">{t('contact.hours')}</h4>
                <div className="space-y-2 text-sm text-gray-600 font-open-sans">
                  <div className="flex justify-between"><span>{t('contact.weekdays')}</span><span className="font-medium text-prime-blue">8:00 AM – 5:00 PM</span></div>
                  <div className="flex justify-between"><span>{t('contact.saturday')}</span><span className="font-medium text-prime-blue">8:30 AM – 1:30 PM</span></div>
                  <div className="flex justify-between"><span>{t('contact.sunday')}</span><span className="font-medium text-gray-400">{t('contact.closed')}</span></div>
                </div>
              </motion.div>

              <GoogleMap />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="border border-gray-100 shadow-lg bg-white/80 backdrop-blur-sm overflow-hidden">
                <CardContent className="p-8">
                  <h3 className="text-xl font-montserrat font-bold text-prime-blue mb-6">{t('contact.sendMessage')}</h3>
                  <form className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-montserrat font-medium text-prime-blue mb-1.5">{t('contact.fullName')}</label>
                        <Input placeholder="John Doe" className="border-gray-200 focus:border-prime-gold focus:ring-prime-gold/20" />
                      </div>
                      <div>
                        <label className="block text-xs font-montserrat font-medium text-prime-blue mb-1.5">{t('contact.emailAddress')}</label>
                        <Input type="email" placeholder="john@example.com" className="border-gray-200 focus:border-prime-gold focus:ring-prime-gold/20" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-montserrat font-medium text-prime-blue mb-1.5">{t('contact.company')}</label>
                      <Input placeholder="Your Company Name" className="border-gray-200 focus:border-prime-gold focus:ring-prime-gold/20" />
                    </div>
                    <div>
                      <label className="block text-xs font-montserrat font-medium text-prime-blue mb-1.5">{t('contact.message')}</label>
                      <Textarea placeholder="Tell us about your needs..." rows={4} className="border-gray-200 focus:border-prime-gold focus:ring-prime-gold/20 resize-none" />
                    </div>
                    <Button className="w-full bg-gradient-to-r from-prime-blue to-prime-blue/90 hover:from-prime-blue/90 hover:to-prime-blue text-white shadow-lg shadow-prime-blue/30 font-montserrat font-semibold">
                      {t('contact.sendBtn')} <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;