import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

type Language = 'en' | 'sw';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguageState(prev => prev === 'en' ? 'sw' : 'en');
  }, []);

  const t = useCallback((key: string): string => {
    return translations[language][key] || key;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.about': 'About Us',
    'nav.investors': 'Investors',
    'nav.news': 'News',
    'nav.join': 'Join Us',
    'nav.schedule': 'Schedule Consultation',

    // Hero Section
    'hero.badge': 'NBAA Certified • Tanga, Tanzania',
    'hero.title1': 'Strategic Accounting, Tax and Advisory Services for',
    'hero.title2': 'Global Investors',
    'hero.titleHighlight': 'Global Investors',
    'hero.subtitle': 'Supporting businesses and investors across Tanzania and Africa with world-class financial expertise.',
    'hero.cta1': 'Book Consultation',
    'hero.cta2': 'Explore Services',

    // Stats
    'stats.years': 'Years of Experience',
    'stats.clients': 'Satisfied Clients',
    'stats.services': 'Core Service Areas',
    'stats.support': 'Client Support',

    // Services
    'services.title': 'Our Services',
    'services.subtitle': 'Comprehensive Financial Solutions',
    'services.description': 'We offer a full range of professional services designed to drive your business success.',
    'services.learnMore': 'Learn More',
    'service.audit': 'Audit & Assurance',
    'service.auditDesc': 'Independent auditing and assurance services that build stakeholder confidence in your financial reporting.',
    'service.tax': 'Tax Advisory',
    'service.taxDesc': 'Strategic tax planning, compliance, and advisory services to optimize your tax position.',
    'service.registration': 'Business Registration',
    'service.registrationDesc': 'Complete company registration, licensing, and regulatory setup for local and foreign businesses.',
    'service.holding': 'Holding Company Formation',
    'service.holdingDesc': 'International holding company structures for global investors entering African markets.',
    'service.corporate': 'Corporate Structuring',
    'service.corporateDesc': 'Optimal corporate structures aligned with your international investment strategy.',
    'service.accounting': 'Accounting & Payroll',
    'service.accountingDesc': 'End-to-end accounting, bookkeeping, payroll processing, and financial statement preparation.',

    // Why Choose Us
    'why.title': 'Why Choose Us',
    'why.subtitle': 'Trusted by Businesses Across Tanzania and Beyond',
    'why.description': 'Prime Auditors combines deep local market knowledge with international best practices, delivering exceptional value through certified professionals committed to your success.',
    'why.international': 'International Business Expertise',
    'why.internationalDesc': 'Deep experience advising multinational clients and foreign investors across diverse sectors.',
    'why.trusted': 'Trusted Advisory Services',
    'why.trustedDesc': 'NBAA certified professionals delivering services that meet the highest international standards.',
    'why.regulatory': 'Strong Regulatory Knowledge',
    'why.regulatoryDesc': 'Comprehensive understanding of Tanzanian tax law, corporate regulations, and compliance requirements.',
    'why.professional': 'Professional Accounting & Tax Experts',
    'why.professionalDesc': 'A dedicated team of CPAs with decades of combined experience across auditing, tax, and consulting.',

    // International Investors Section
    'investors.title': 'International Investors',
    'investors.heading': 'Tanzania: Your Gateway to',
    'investors.headingHighlight': 'African Markets',
    'investors.desc1': 'Tanzania offers unparalleled opportunities for foreign investors with stable governance, abundant resources, and access to over 400 million consumers through regional trade blocs including the EAC and SADC.',
    'investors.desc2': 'We guide international investors through company registration, holding company formation, licensing, tax registration, and full operational setup — from zero to operational.',
    'investors.cta1': 'Learn More',
    'investors.cta2': 'Schedule Consultation',
    'investors.gdp': 'Average GDP Growth',
    'investors.market': 'Growing Market',
    'investors.destination': 'African Investment Destination',
    'investors.ownership': 'Foreign Ownership Allowed',

    // Testimonials
    'testimonials.title': 'Client Trust',
    'testimonials.subtitle': 'What Our Clients Say',

    // CTA Section
    'cta.title': 'Ready to Start Your Investment in Tanzania?',
    'cta.description': 'Let our experts guide you through every step — from registration to operational success.',
    'cta.cta1': 'Schedule Consultation',
    'cta.cta2': 'Contact Our Team',

    // Contact Section
    'contact.title': 'Get In Touch',
    'contact.subtitle': 'Contact Us',
    'contact.description': 'Reach out for a consultation and discover how we can help your business thrive.',
    'contact.address': 'Office Address',
    'contact.phone': 'Phone',
    'contact.email': 'Email',
    'contact.hours': 'Business Hours',
    'contact.weekdays': 'Monday – Friday',
    'contact.saturday': 'Saturday',
    'contact.sunday': 'Sunday',
    'contact.closed': 'Closed',
    'contact.sendMessage': 'Send us a Message',
    'contact.fullName': 'Full Name',
    'contact.emailAddress': 'Email',
    'contact.company': 'Company',
    'contact.message': 'Message',
    'contact.sendBtn': 'Send Message',

    // Consultation Modal
    'consultation.title': 'Request a Consultation',
    'consultation.name': 'Full Name',
    'consultation.email': 'Email Address',
    'consultation.phone': 'Phone Number',
    'consultation.companyName': 'Company Name',
    'consultation.message': 'Message',
    'consultation.preferredDate': 'Preferred Date',
    'consultation.preferredTime': 'Preferred Time',
    'consultation.cancel': 'Cancel',
    'consultation.submit': 'Send Request',
    'consultation.submitting': 'Submitting...',

    // Floating Contact
    'floating.bookConsultation': 'Book Consultation',
    'floating.callUs': 'Call Us',
    'floating.whatsapp': 'WhatsApp',

    // Footer
    'footer.description': 'Strategic Accounting, Tax & Advisory Services in Tanzania. We empower businesses and investors with expert financial solutions.',
    'footer.quickLinks': 'Quick Links',
    'footer.contactUs': 'Contact Us',
    'footer.copyright': 'All rights reserved.',

    // About Page
    'about.title': 'About Us',
    'about.subtitle': 'Our Story',
    'about.leadership': 'Leadership',
    'about.values': 'Our Values',

    // Services Page
    'services.page.title': 'Our Services',
    'services.page.subtitle': 'Comprehensive solutions for your business needs',

    // Page not found
    'notFound.title': 'Page Not Found',
    'notFound.description': 'The page you are looking for does not exist.',
    'notFound.goHome': 'Go Home',
  },
  sw: {
    // Navigation
    'nav.home': 'Nyumbani',
    'nav.services': 'Huduma',
    'nav.about': 'Kuhusu Sisi',
    'nav.investors': 'Wanamuzi',
    'nav.news': 'Habari',
    'nav.join': 'Jiunge Nasi',
    'nav.schedule': 'Panga Mshauri',

    // Hero Section
    'hero.badge': 'Iliyoidhinishwa na NBAA • Tanga, Tanzania',
    'hero.title1': 'Huduma za Mkakati wa Uhasibu, Ushauri na Ushuru kwa',
    'hero.title2': 'Wanamuzi wa Kimataifa',
    'hero.titleHighlight': 'Wanamuzi wa Kimataifa',
    'hero.subtitle': 'Tunasaidia biashara na wawekezaji kote Tanzania na Afrika kwa utaalamu wa k的世界-level.',
    'hero.cta1': 'Panga Mshauri',
    'hero.cta2': 'Gundua Huduma',

    // Stats
    'stats.years': 'Miaka ya Uzoefu',
    'stats.clients': 'Wateja Wenye Furaha',
    'stats.services': 'Maeneo ya Huduma',
    'stats.support': 'Msaada wa Wateja',

    // Services
    'services.title': 'Huduma Zetu',
    'services.subtitle': 'Sulusi za Kifedha Zaidi',
    'services.description': 'Tunatoa huduma zote za kitaalamu zinazoundwa kuendesha mafanikio yako ya biashara.',
    'services.learnMore': 'Jifunze Zaidi',
    'service.audit': 'Ukaguzi na Hakuna',
    'service.auditDesc': 'Huduma za ukaguzi wa kujitegemea na hakuna ambazo hujenga mori ya washirika kwa taarifa zako za kifedha.',
    'service.tax': 'Ushauri wa Kodi',
    'service.taxDesc': 'Mipango ya mkakati wa kodi, utii, na huduma za ushauri ili kuboresha nafasi yako ya kodi.',
    'service.registration': 'Usajili wa Biashara',
    'service.registrationDesc': 'Usajili kamili wa kampuni, leseni, na usanidi wa mwindano kwa biashara za ndani na za kigeni.',
    'service.holding': 'Kuanzisha Kampuni ya Holding',
    'service.holdingDesc': 'Miundo ya kampuni za holding ya kimataifa kwa wawekezaji wa kimataifa wanaoingia masoko ya Afrika.',
    'service.corporate': 'Muundo wa Shirika',
    'service.corporateDesc': 'Miundo bora ya shirika inayolingana na mkakati wako wa uwekezaji wa kimataifa.',
    'service.accounting': 'Uhasibu na Mishahara',
    'service.accountingDesc': 'Uhasibu wa mwisho hadi mwisho, uandikishaji wa rekodi, usindikaji wa mishahara, na upyaji wa taarifa za kifedha.',

    // Why Choose Us
    'why.title': 'Kwa Nini Tuchague Sisi',
    'why.subtitle': 'Wanaamini Biashara Kote Tanzania na Zaidi',
    'why.description': 'Prime Auditors inachanganya maarifa ya soko la ndani na desturi bora za kimataifa, na kutoa thamani ya pekee kupitia wasomi walioidhinishwa wanaojitolea kwa mafanikio yako.',
    'why.international': 'Uzoefu wa Biashara ya Kimataifa',
    'why.internationalDesc': 'Uzoefu wa kina wa kushauri wateja wa shirika nyingi na wawekezaji wa kigeni katika sekta mbalimbali.',
    'why.trusted': 'Huduma za Ushauri zinazotegemewa',
    'why.trustedDesc': 'Wataalamu wa CPA wanaoidhinishwa na NBAA wanaotoa huduma zinazokidhi viwango vya juu vya kimataifa.',
    'why.regulatory': ' Maarifa ya Mfumo Endelevu',
    'why.regulatoryDesc': 'Ufahamu kamili wa sheria ya kodi ya Tanzania, kanuni za shirika, na mahitaji ya utii.',
    'why.professional': 'Wataalam wa Uhasibu na Kodi wa Kitaalam',
    'why.professionalDesc': 'Timu ya CPAs wenye uzoefu wa miongo kadhaa katika ukaguzi, kodi, na ushauri.',

    // International Investors Section
    'investors.title': 'Wanamuzi wa Kimataifa',
    'investors.heading': 'Tanzania: Lango Lako kwa',
    'investors.headingHighlight': 'Masoko ya Afrika',
    'investors.desc1': 'Tanzania inatoa fursa zisizo na mfano kwa wawekezaji wa kigeni wenye utawala imara, rasilimali nyingi, na upatikanaji wa watumiaji zaidi ya milioni 400 kupitia vyombo vya biashara vya kikanda ikiwa ni pamoja na EAC na SADC.',
    'investors.desc2': 'Tunaongoza wawekezaji wa kimataifa kupitia usajili wa kampuni, kuanzisha kampuni ya holding, leseni, usajili wa kodi, na usanidi kamili wa uendeshaji — kutoka sifuri hadi uendeshaji.',
    'investors.cta1': 'Jifunze Zaidi',
    'investors.cta2': 'Panga Mshauri',
    'investors.gdp': 'Kukuza Kimataifa ya Pato la Taifa',
    'investors.market': 'Soko Linakuwa',
    'investors.destination': 'Mahali pa Uwekezaji Afrika',
    'investors.ownership': 'Umiliki kamili wa Kigeni Umekubaliwa',

    // Testimonials
    'testimonials.title': 'Mori ya Mteja',
    'testimonials.subtitle': 'Wateja Wetu Wanasema Nini',

    // CTA Section
    'cta.title': 'Uko Tayari Kuanza Uwekezaji Wako Tanzania?',
    'cta.description': 'Wacha wasomi wetu waongoze kupitia kila hatua — kutoka usajili hadi mafanikio ya uendeshaji.',
    'cta.cta1': 'Panga Mshauri',
    'cta.cta2': 'Wasiliana na Timu Yako',

    // Contact Section
    'contact.title': 'Fikia Sisi',
    'contact.subtitle': 'Wasiliana Nasi',
    'contact.description': 'Tuonjee kwa mshauri na gundua jinsi tunavyoweza kusaidia biashara yako iku.',
    'contact.address': 'Anwani ya Ofisi',
    'contact.phone': 'Simu',
    'contact.email': 'Barua Pepe',
    'contact.hours': 'Saa za Kufanya Kazi',
    'contact.weekdays': 'Jumatatu – Ijumaa',
    'contact.saturday': 'Jumamosi',
    'contact.sunday': 'Jumapili',
    'contact.closed': 'Imefungana',
    'contact.sendMessage': 'Tutumie Ujumbe',
    'contact.fullName': 'Jina Kamili',
    'contact.emailAddress': 'Barua Pepe',
    'contact.company': 'Kampuni',
    'contact.message': 'Ujumbe',
    'contact.sendBtn': 'Tuma Ujumbe',

    // Consultation Modal
    'consultation.title': 'Omba Mshauri',
    'consultation.name': 'Jina Kamili',
    'consultation.email': 'Anwani ya Barua Pepe',
    'consultation.phone': 'Nambari ya Simu',
    'consultation.companyName': 'Jina la Kampuni',
    'consultation.message': 'Ujumbe',
    'consultation.preferredDate': 'Tarehe Inayopendelewa',
    'consultation.preferredTime': 'Wakati Unaopendelewa',
    'consultation.cancel': 'Ghairi',
    'consultation.submit': 'Tuma Ombi',
    'consultation.submitting': 'Inatuma...',

    // Floating Contact
    'floating.bookConsultation': 'Panga Mshauri',
    'floating.callUs': 'Tupigie Simu',
    'floating.whatsapp': 'WhatsApp',

    // Footer
    'footer.description': 'Huduma za Uhasibu wa Mkakati, Kodi na Ushauri Tanzania. Tunawapa biashara na wawekezaji sulusi za kifedha za kitaalam.',
    'footer.quickLinks': 'Viungo vya Haraka',
    'footer.contactUs': 'Wasiliana Nasi',
    'footer.copyright': 'Haki zote zimehifadhiwa.',

    // About Page
    'about.title': 'Kuhusu Sisi',
    'about.subtitle': 'Hadithi Yetu',
    'about.leadership': 'Uongozi',
    'about.values': 'Thamani Zetu',

    // Services Page
    'services.page.title': 'Huduma Zetu',
    'services.page.subtitle': 'Sulusi za kina kwa mahitaji yako ya biashara',

    // Page not found
    'notFound.title': 'Ukurasa Haupatikiani',
    'notFound.description': 'Ukurasa unaoutafuta haupo.',
    'notFound.goHome': 'Rudi Nyumbani',
  },
};