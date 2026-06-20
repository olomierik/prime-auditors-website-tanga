import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  MapPin,
  Shield,
  DollarSign,
  CheckCircle,
  ArrowRight,
  Download,
  FileText,
  Building2,
  Users,
  Globe,
  Loader2,
  Star,
  ChevronRight,
} from "lucide-react";

// ─── PDF Checklist Generator ─────────────────────────────────────────────────
const downloadChecklistPDF = (type: "branch" | "subsidiary") => {
  const branchItems = [
    "Certificate of Incorporation from home country (notarised + apostilled/consular legalised)",
    "Memorandum and Articles of Association (translated to English)",
    "Board Resolution authorising establishment of branch in Tanzania",
    "Power of Attorney for local representative",
    "Passport copies of directors and authorised signatories",
    "Proof of registered address in home country",
    "Financial statements for last 2 years (parent company)",
    "Passport-size photos of all directors",
  ];
  const subItems = [
    "Passport copies of all shareholders and directors (certified)",
    "Proposed company name (3 options)",
    "Memorandum and Articles of Association (draft or template)",
    "Proof of residential address for each director",
    "Source of funds declaration",
    "Board resolution or individual resolution for incorporation",
    "Parent company incorporation documents (if corporate shareholder)",
    "Power of Attorney if signing remotely",
  ];
  const items = type === "branch" ? branchItems : subItems;
  const title =
    type === "branch"
      ? "Branch Registration Document Checklist"
      : "Subsidiary Registration Document Checklist";

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <title>${title} — Prime Auditors</title>
  <style>
    body{font-family:Arial,sans-serif;max-width:700px;margin:40px auto;color:#1a1a1a}
    .header{border-bottom:3px solid #c5a021;padding-bottom:16px;margin-bottom:24px}
    .logo{font-size:22px;font-weight:bold;color:#0f2a4a}
    .sub{font-size:12px;color:#666;margin-top:4px}
    h2{color:#0f2a4a;font-size:18px;margin-bottom:8px}
    ul{padding-left:20px}
    li{margin-bottom:8px;font-size:14px;line-height:1.5}
    .note{background:#f6f3f2;border-left:4px solid #c5a021;padding:12px 16px;font-size:13px;margin-top:24px;border-radius:4px}
    .footer{margin-top:40px;padding-top:16px;border-top:1px solid #ddd;font-size:12px;color:#888}
  </style>
</head>
<body>
  <div class="header">
    <div class="logo">PRIME AUDITORS</div>
    <div class="sub">Building Trust Through Integrity &amp; Excellence | Reg. No. PF510 | Tanga, Tanzania</div>
  </div>
  <h2>${title}</h2>
  <ul>${items.map((i) => `<li>&#9744; ${i}</li>`).join("")}</ul>
  <div class="note">
    <strong>Note for Chinese documents:</strong> Documents from China may require: (1) Notarisation in China, (2) Apostille from Chinese Ministry of Foreign Affairs, OR (3) Consular legalisation via the Tanzanian Embassy in Beijing. We will confirm which route applies to your specific documents.
  </div>
  <div class="footer">
    Prime Auditors | P.O. Box 5667, Market Street, Central Ward, Tanga, Tanzania | +255 752 401 012 | erick.olomi@primeauditors.co.tz | www.primeauditors.xyz
  </div>
</body>
</html>`;

  // Use <a download> — works without popup blocker issues
  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `prime-auditors-${type}-checklist.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
};

// ─── Hero Section ─────────────────────────────────────────────────────────────
const HeroSection = () => {
  const { t } = useTranslation();
  const { locale } = useParams();
  return (
    <section className="bg-prime-blue text-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <Badge className="bg-prime-gold/20 text-prime-gold border-prime-gold/30 mb-6 font-montserrat text-xs tracking-wider uppercase">
            Foreign Investor Services
          </Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-montserrat font-bold leading-tight mb-6">
            {t("fi.hero.headline")}
          </h1>
          <p className="text-lg text-white/80 font-open-sans leading-relaxed mb-8 max-w-2xl">
            {t("fi.hero.subheadline")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <a href="#inquiry-form">
              <Button
                size="lg"
                className="bg-prime-gold hover:bg-[#d4af26] text-prime-blue font-montserrat font-bold shadow-xl w-full sm:w-auto"
              >
                {t("fi.hero.cta1")} <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </a>
            <Link to={`/${locale}/get-quote`}>
              <Button
                size="lg"
                className="bg-white text-prime-blue hover:bg-white/90 font-montserrat font-bold w-full sm:w-auto shadow-lg"
              >
                <FileText className="mr-2 w-4 h-4" /> Get an Instant Quote
              </Button>
            </Link>
            <Button
              size="lg"
              className="bg-white/15 border border-white/40 text-white hover:bg-white/25 w-full sm:w-auto backdrop-blur-sm"
              onClick={() => downloadChecklistPDF("branch")}
            >
              <Download className="mr-2 w-4 h-4" /> {t("fi.hero.cta2")}
            </Button>
          </div>
          {/* Trust badges */}
          <div className="flex flex-wrap gap-3">
            {[
              t("fi.trust.brela"),
              t("fi.trust.tic"),
              t("fi.trust.reg"),
              t("fi.trust.est"),
            ].map((badge) => (
              <span
                key={badge}
                className="text-xs bg-white/10 border border-white/20 rounded-full px-3 py-1.5 font-montserrat text-white/90"
              >
                ✓ {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── Why Choose Us ────────────────────────────────────────────────────────────
const WhyChooseUs = () => {
  const { t } = useTranslation();
  const cards = [
    {
      icon: MapPin,
      title: t("fi.why.card1Title"),
      desc: t("fi.why.card1Desc"),
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      icon: DollarSign,
      title: t("fi.why.card2Title"),
      desc: t("fi.why.card2Desc"),
      color: "text-prime-gold",
      bg: "bg-prime-gold/10",
    },
    {
      icon: Shield,
      title: t("fi.why.card3Title"),
      desc: t("fi.why.card3Desc"),
      color: "text-prime-blue",
      bg: "bg-prime-blue/10",
    },
  ];
  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm font-montserrat font-semibold text-prime-gold tracking-widest uppercase mb-2">
            {t("fi.why.title")}
          </p>
          <h2 className="text-3xl lg:text-4xl font-montserrat font-bold text-prime-blue">
            {t("fi.why.subtitle")}
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((c) => (
            <Card key={c.title} className="border border-gray-100 shadow-lg hover:shadow-xl transition-all bg-white">
              <CardContent className="p-8">
                <div className={`w-12 h-12 rounded-xl ${c.bg} flex items-center justify-center mb-4`}>
                  <c.icon className={`w-6 h-6 ${c.color}`} />
                </div>
                <h3 className="font-montserrat font-bold text-prime-blue text-lg mb-3">
                  {c.title}
                </h3>
                <p className="text-gray-700 font-open-sans leading-relaxed text-sm">
                  {c.desc}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Service Packages ─────────────────────────────────────────────────────────
const ServicePackages = () => {
  const { t } = useTranslation();
  const { locale } = useParams();

  const packages = [
    {
      name: t("fi.packages.starter.name"),
      price: t("fi.packages.starter.price"),
      timeline: t("fi.packages.starter.timeline"),
      cta: t("fi.packages.starter.cta"),
      popular: false,
      features: [
        t("fi.packages.starter.f1"),
        t("fi.packages.starter.f2"),
        t("fi.packages.starter.f3"),
        t("fi.packages.starter.f4"),
        t("fi.packages.starter.f5"),
        t("fi.packages.starter.f6"),
      ],
      prefix: null,
    },
    {
      name: t("fi.packages.growth.name"),
      price: t("fi.packages.growth.price"),
      timeline: t("fi.packages.growth.timeline"),
      cta: t("fi.packages.growth.cta"),
      popular: true,
      features: [
        t("fi.packages.growth.f1"),
        t("fi.packages.growth.f2"),
        t("fi.packages.growth.f3"),
        t("fi.packages.growth.f4"),
        t("fi.packages.growth.f5"),
      ],
      prefix: t("fi.packages.includes"),
    },
    {
      name: t("fi.packages.enterprise.name"),
      price: t("fi.packages.enterprise.price"),
      timeline: t("fi.packages.enterprise.timeline"),
      cta: t("fi.packages.enterprise.cta"),
      popular: false,
      features: [
        t("fi.packages.enterprise.f1"),
        t("fi.packages.enterprise.f2"),
        t("fi.packages.enterprise.f3"),
        t("fi.packages.enterprise.f4"),
        t("fi.packages.enterprise.f5"),
        t("fi.packages.enterprise.f6"),
        t("fi.packages.enterprise.f7"),
        t("fi.packages.enterprise.f8"),
      ],
      prefix: t("fi.packages.includesGrowth"),
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-prime-light-grey">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm font-montserrat font-semibold text-prime-gold tracking-widest uppercase mb-2">
            {t("fi.packages.title")}
          </p>
          <h2 className="text-3xl lg:text-4xl font-montserrat font-bold text-prime-blue">
            {t("fi.packages.subtitle")}
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className={`relative rounded-2xl p-8 flex flex-col ${
                pkg.popular
                  ? "bg-prime-blue text-white shadow-2xl scale-105 ring-4 ring-prime-gold"
                  : "bg-white shadow-lg"
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge className="bg-prime-gold text-prime-blue font-montserrat font-bold px-4 py-1">
                    {t("fi.packages.popular")}
                  </Badge>
                </div>
              )}
              <div className="mb-6">
                <h3
                  className={`font-montserrat font-bold text-xl mb-1 ${
                    pkg.popular ? "text-white" : "text-prime-blue"
                  }`}
                >
                  {pkg.name}
                </h3>
                <div
                  className={`text-3xl font-montserrat font-bold mt-2 ${
                    pkg.popular ? "text-prime-gold" : "text-prime-blue"
                  }`}
                >
                  {pkg.price}
                </div>
                <p
                  className={`text-xs mt-1 ${
                    pkg.popular ? "text-white/70" : "text-gray-500"
                  }`}
                >
                  {t("fi.packages.timeline")} {pkg.timeline}
                </p>
              </div>
              <div className="flex-grow mb-6">
                {pkg.prefix && (
                  <p
                    className={`text-xs font-semibold mb-3 ${
                      pkg.popular ? "text-prime-gold" : "text-prime-gold"
                    }`}
                  >
                    {pkg.prefix}
                  </p>
                )}
                <ul className="space-y-2.5">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <CheckCircle
                        className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                          pkg.popular ? "text-prime-gold" : "text-green-500"
                        }`}
                      />
                      <span
                        className={
                          pkg.popular ? "text-white/90" : "text-gray-600"
                        }
                      >
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <a href="#inquiry-form">
                <Button
                  className={`w-full font-montserrat font-semibold ${
                    pkg.popular
                      ? "bg-prime-gold hover:bg-prime-gold/90 text-prime-blue"
                      : "bg-prime-blue hover:bg-prime-blue/90 text-white"
                  }`}
                >
                  {pkg.cta}
                </Button>
              </a>
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-gray-500 font-open-sans max-w-2xl mx-auto">
          * {t("fi.packages.note")}
        </p>
      </div>
    </section>
  );
};

// ─── Individual Services Accordion ───────────────────────────────────────────
const ServicesAccordion = () => {
  const { t } = useTranslation();
  const services = [
    { id: "s1", title: t("fi.svc1.title"), desc: t("fi.svc1.desc"), price: t("fi.svc1.price"), del: t("fi.svc1.del") },
    { id: "s2", title: t("fi.svc2.title"), desc: t("fi.svc2.desc"), price: t("fi.svc2.price"), del: t("fi.svc2.del") },
    { id: "s3", title: t("fi.svc3.title"), desc: t("fi.svc3.desc"), price: t("fi.svc3.price"), del: t("fi.svc3.del") },
    { id: "s4", title: t("fi.svc4.title"), desc: t("fi.svc4.desc"), price: t("fi.svc4.price"), del: t("fi.svc4.del") },
    { id: "s5", title: t("fi.svc5.title"), desc: t("fi.svc5.desc"), price: t("fi.svc5.price"), del: t("fi.svc5.del") },
    { id: "s6", title: t("fi.svc6.title"), desc: t("fi.svc6.desc"), price: t("fi.svc6.price"), del: t("fi.svc6.del") },
    { id: "s7", title: t("fi.svc7.title"), desc: t("fi.svc7.desc"), price: t("fi.svc7.price"), del: t("fi.svc7.del") },
  ];

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm font-montserrat font-semibold text-prime-gold tracking-widest uppercase mb-2">
            {t("fi.svc.title")}
          </p>
          <h2 className="text-3xl lg:text-4xl font-montserrat font-bold text-prime-blue">
            {t("fi.svc.subtitle")}
          </h2>
        </div>
        <Accordion type="single" collapsible className="space-y-3">
          {services.map((svc, i) => (
            <AccordionItem
              key={svc.id}
              value={svc.id}
              className="border border-prime-border rounded-xl px-6 shadow-sm"
            >
              <AccordionTrigger className="font-montserrat font-semibold text-prime-blue hover:no-underline py-5">
                <span className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-prime-gold/10 text-prime-gold text-xs font-bold flex items-center justify-center flex-shrink-0">
                    {i + 1}
                  </span>
                  {svc.title}
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-5">
                <p className="text-gray-600 font-open-sans text-sm leading-relaxed mb-4">
                  {svc.desc}
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-prime-light-grey rounded-lg p-4">
                    <p className="text-xs font-montserrat font-semibold text-prime-gold uppercase tracking-wider mb-1">
                      {t("fi.svc.price")}
                    </p>
                    <p className="text-sm text-prime-blue font-semibold">{svc.price}</p>
                  </div>
                  <div className="bg-prime-light-grey rounded-lg p-4">
                    <p className="text-xs font-montserrat font-semibold text-prime-gold uppercase tracking-wider mb-1">
                      {t("fi.svc.deliverables")}
                    </p>
                    <p className="text-sm text-gray-600">{svc.del}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <a href="#inquiry-form">
                    <Button size="sm" className="bg-prime-blue hover:bg-prime-blue/90 text-white font-montserrat text-xs">
                      Enquire About This Service <ChevronRight className="ml-1 w-3 h-3" />
                    </Button>
                  </a>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

// ─── How It Works ─────────────────────────────────────────────────────────────
const HowItWorks = () => {
  const { t } = useTranslation();
  const steps = [
    { n: "01", title: t("fi.steps.s1title"), desc: t("fi.steps.s1desc") },
    { n: "02", title: t("fi.steps.s2title"), desc: t("fi.steps.s2desc") },
    { n: "03", title: t("fi.steps.s3title"), desc: t("fi.steps.s3desc") },
    { n: "04", title: t("fi.steps.s4title"), desc: t("fi.steps.s4desc") },
    { n: "05", title: t("fi.steps.s5title"), desc: t("fi.steps.s5desc") },
  ];
  return (
    <section className="py-16 lg:py-24 bg-prime-light-grey">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm font-montserrat font-semibold text-prime-gold tracking-widest uppercase mb-2">
            {t("fi.steps.title")}
          </p>
          <h2 className="text-3xl lg:text-4xl font-montserrat font-bold text-prime-blue">
            {t("fi.steps.subtitle")}
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {steps.map((s, i) => (
            <div key={s.n} className="relative">
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-prime-gold/30 z-0 -translate-x-1/2" />
              )}
              <div className="bg-white rounded-2xl p-6 shadow-sm relative z-10 h-full">
                <div className="w-12 h-12 rounded-full bg-prime-blue flex items-center justify-center mb-4">
                  <span className="text-prime-gold font-montserrat font-bold text-sm">{s.n}</span>
                </div>
                <h3 className="font-montserrat font-bold text-prime-blue mb-2 text-sm">{s.title}</h3>
                <p className="text-gray-500 text-xs font-open-sans leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Document Checklist ───────────────────────────────────────────────────────
const DocumentChecklist = () => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);

  const branchDocs = [
    t("fi.docs.branch.d1"), t("fi.docs.branch.d2"), t("fi.docs.branch.d3"),
    t("fi.docs.branch.d4"), t("fi.docs.branch.d5"), t("fi.docs.branch.d6"),
    t("fi.docs.branch.d7"), t("fi.docs.branch.d8"),
  ];
  const subDocs = [
    t("fi.docs.sub.d1"), t("fi.docs.sub.d2"), t("fi.docs.sub.d3"),
    t("fi.docs.sub.d4"), t("fi.docs.sub.d5"), t("fi.docs.sub.d6"),
    t("fi.docs.sub.d7"), t("fi.docs.sub.d8"),
  ];

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-sm font-montserrat font-semibold text-prime-gold tracking-widest uppercase mb-2">
            Documents
          </p>
          <h2 className="text-3xl lg:text-4xl font-montserrat font-bold text-prime-blue mb-3">
            {t("fi.docs.title")}
          </h2>
          <p className="text-gray-600 font-open-sans">{t("fi.docs.subtitle")}</p>
        </div>
        <Tabs defaultValue="branch" className="mb-8">
          <TabsList className="w-full mb-6">
            <TabsTrigger value="branch" className="flex-1 font-montserrat">
              {t("fi.docs.tab1")}
            </TabsTrigger>
            <TabsTrigger value="subsidiary" className="flex-1 font-montserrat">
              {t("fi.docs.tab2")}
            </TabsTrigger>
          </TabsList>
          {[
            { value: "branch", docs: branchDocs, type: "branch" as const },
            { value: "subsidiary", docs: subDocs, type: "subsidiary" as const },
          ].map((tab) => (
            <TabsContent key={tab.value} value={tab.value}>
              <div className="bg-prime-light-grey rounded-2xl p-6">
                <ul className="space-y-3 mb-6">
                  {tab.docs.map((doc, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-prime-gold flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 font-open-sans">{doc}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={() => downloadChecklistPDF(tab.type)}
                  className="bg-prime-blue hover:bg-prime-blue/90 text-white font-montserrat font-semibold"
                >
                  <Download className="mr-2 w-4 h-4" /> {t("fi.docs.download")}
                </Button>
              </div>
            </TabsContent>
          ))}
        </Tabs>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
          <p className="text-sm text-amber-900 font-open-sans leading-relaxed">
            <strong>📌 Note:</strong> {t("fi.docs.note")}
          </p>
        </div>
      </div>
    </section>
  );
};

// ─── Inquiry Form ─────────────────────────────────────────────────────────────
const SERVICES_OPTIONS = [
  { key: "fi.form.svc.registration", value: "Company Registration" },
  { key: "fi.form.svc.compliance", value: "Annual Compliance" },
  { key: "fi.form.svc.licensing", value: "Sector Licensing" },
  { key: "fi.form.svc.advisory", value: "Market Entry Advisory" },
  { key: "fi.form.svc.permit", value: "Work Permit Support" },
  { key: "fi.form.svc.bank", value: "Bank Account Opening" },
  { key: "fi.form.svc.legal", value: "Document Legalisation" },
  { key: "fi.form.svc.other", value: "Other" },
];

const COUNTRIES = ["China", "India", "United Kingdom", "United States", "UAE", "Germany", "South Africa", "Other"];
const SECTORS = [
  "Construction & Engineering", "Mining & Resources", "Manufacturing",
  "Agriculture & Agribusiness", "Tourism & Hospitality", "IT & Technology",
  "Logistics & Warehousing", "Financial Services", "Other",
];

const InquiryForm = () => {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [services, setServices] = useState<string[]>([]);
  const [structure, setStructure] = useState("");
  const [sector, setSector] = useState("");
  const [description, setDescription] = useState("");
  const [source, setSource] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const toggleService = (val: string) => {
    setServices((prev) =>
      prev.includes(val) ? prev.filter((s) => s !== val) : [...prev, val]
    );
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = t("fi.form.errors.name");
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) e.email = t("fi.form.errors.email");
    if (!whatsapp.trim()) e.whatsapp = t("fi.form.errors.whatsapp");
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setIsSubmitting(true);
    try {
      const message = `[Foreign Investor Inquiry]
Country: ${country}
Services: ${services.join(", ")}
Structure: ${structure}
Sector: ${sector}
Source: ${source}
Description: ${description}
WhatsApp: ${whatsapp}`;

      await supabase.from("consultation_requests").insert([{
        name, email,
        phone_number: whatsapp,
        company_name: company || null,
        message,
      }]);

      const subject = `Foreign Investor Inquiry from ${name} (${country})`;
      const body = `Name: ${name}\nCompany: ${company}\nCountry: ${country}\nEmail: ${email}\nWhatsApp: ${whatsapp}\nServices: ${services.join(", ")}\nStructure: ${structure}\nSector: ${sector}\nSource: ${source}\n\nDescription:\n${description}`;
      window.location.href = `mailto:erick.olomi@primeauditors.co.tz?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      setSubmitted(true);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section id="inquiry-form" className="py-16 lg:py-24 bg-prime-light-grey">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-2xl p-12 shadow-lg">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
            <h3 className="text-2xl font-montserrat font-bold text-prime-blue mb-4">
              Inquiry Received!
            </h3>
            <p className="text-gray-600 font-open-sans leading-relaxed">
              {t("fi.form.success")}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="inquiry-form" className="py-16 lg:py-24 bg-prime-light-grey scroll-mt-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-sm font-montserrat font-semibold text-prime-gold tracking-widest uppercase mb-2">
            Contact Us
          </p>
          <h2 className="text-3xl lg:text-4xl font-montserrat font-bold text-prime-blue mb-2">
            {t("fi.form.title")}
          </h2>
          <p className="text-gray-500 font-open-sans">{t("fi.form.subtitle")}</p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-lg p-8 space-y-6"
        >
          {/* Name + Company */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-montserrat font-semibold text-prime-blue mb-1.5 uppercase tracking-wide">
                {t("fi.form.name")} *
              </label>
              <Input value={name} onChange={(e) => setName(e.target.value)}
                className={errors.name ? "border-red-500" : "border-gray-200"} />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-xs font-montserrat font-semibold text-prime-blue mb-1.5 uppercase tracking-wide">
                {t("fi.form.company")}
              </label>
              <Input value={company} onChange={(e) => setCompany(e.target.value)}
                className="border-gray-200" />
            </div>
          </div>

          {/* Country */}
          <div>
            <label className="block text-xs font-montserrat font-semibold text-prime-blue mb-1.5 uppercase tracking-wide">
              {t("fi.form.country")}
            </label>
            <Select onValueChange={setCountry}>
              <SelectTrigger className="border-gray-200">
                <SelectValue placeholder="Select country..." />
              </SelectTrigger>
              <SelectContent>
                {COUNTRIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          {/* Email + WhatsApp */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-montserrat font-semibold text-prime-blue mb-1.5 uppercase tracking-wide">
                {t("fi.form.email")} *
              </label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                className={errors.email ? "border-red-500" : "border-gray-200"} />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-xs font-montserrat font-semibold text-prime-blue mb-1.5 uppercase tracking-wide">
                {t("fi.form.whatsapp")} *
              </label>
              <Input placeholder="+86 / +44 / +1..." value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                className={errors.whatsapp ? "border-red-500" : "border-gray-200"} />
              {errors.whatsapp && <p className="text-red-500 text-xs mt-1">{errors.whatsapp}</p>}
            </div>
          </div>

          {/* Services checkboxes */}
          <div>
            <label className="block text-xs font-montserrat font-semibold text-prime-blue mb-3 uppercase tracking-wide">
              {t("fi.form.services")}
            </label>
            <div className="grid sm:grid-cols-2 gap-2.5">
              {SERVICES_OPTIONS.map((opt) => (
                <label key={opt.value} className="flex items-center gap-2.5 cursor-pointer">
                  <Checkbox
                    checked={services.includes(opt.value)}
                    onCheckedChange={() => toggleService(opt.value)}
                    className="border-gray-300"
                  />
                  <span className="text-sm text-gray-700 font-open-sans">{t(opt.key)}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Structure radio */}
          <div>
            <label className="block text-xs font-montserrat font-semibold text-prime-blue mb-3 uppercase tracking-wide">
              {t("fi.form.structure")}
            </label>
            <RadioGroup value={structure} onValueChange={setStructure} className="flex flex-wrap gap-4">
              {[
                { label: t("fi.form.str.branch"), value: "branch" },
                { label: t("fi.form.str.subsidiary"), value: "subsidiary" },
                { label: t("fi.form.str.unsure"), value: "unsure" },
              ].map((opt) => (
                <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                  <RadioGroupItem value={opt.value} />
                  <span className="text-sm text-gray-700 font-open-sans">{opt.label}</span>
                </label>
              ))}
            </RadioGroup>
          </div>

          {/* Sector + Source */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-montserrat font-semibold text-prime-blue mb-1.5 uppercase tracking-wide">
                {t("fi.form.sector")}
              </label>
              <Select onValueChange={setSector}>
                <SelectTrigger className="border-gray-200">
                  <SelectValue placeholder="Select sector..." />
                </SelectTrigger>
                <SelectContent>
                  {SECTORS.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-xs font-montserrat font-semibold text-prime-blue mb-1.5 uppercase tracking-wide">
                {t("fi.form.source")}
              </label>
              <Select onValueChange={setSource}>
                <SelectTrigger className="border-gray-200">
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  {[
                    { label: t("fi.form.src.google"), value: "google" },
                    { label: t("fi.form.src.linkedin"), value: "linkedin" },
                    { label: t("fi.form.src.referral"), value: "referral" },
                    { label: t("fi.form.src.association"), value: "association" },
                    { label: t("fi.form.src.other"), value: "other" },
                  ].map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-montserrat font-semibold text-prime-blue mb-1.5 uppercase tracking-wide">
              {t("fi.form.description")}
            </label>
            <Textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border-gray-200 resize-none"
              placeholder="Tell us about your plans..."
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-prime-gold hover:bg-prime-gold/90 text-prime-blue font-montserrat font-bold text-base py-6"
          >
            {isSubmitting ? (
              <><Loader2 className="mr-2 w-5 h-5 animate-spin" />{t("fi.form.submitting")}</>
            ) : (
              <>{t("fi.form.submit")} <ArrowRight className="ml-2 w-5 h-5" /></>
            )}
          </Button>
        </form>
      </div>
    </section>
  );
};

// ─── Case Studies ─────────────────────────────────────────────────────────────
const CaseStudies = () => {
  const { t } = useTranslation();
  const cases = [
    {
      flag: "🇨🇳",
      country: t("fi.cases.c1country"),
      text: t("fi.cases.c1text"),
      tag: t("fi.cases.c1tag"),
    },
    {
      flag: "🇮🇳",
      country: t("fi.cases.c2country"),
      text: t("fi.cases.c2text"),
      tag: t("fi.cases.c2tag"),
    },
    {
      flag: "🇬🇧",
      country: t("fi.cases.c3country"),
      text: t("fi.cases.c3text"),
      tag: t("fi.cases.c3tag"),
    },
  ];
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm font-montserrat font-semibold text-prime-gold tracking-widest uppercase mb-2">
            {t("fi.cases.title")}
          </p>
          <h2 className="text-3xl lg:text-4xl font-montserrat font-bold text-prime-blue">
            {t("fi.cases.subtitle")}
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {cases.map((c) => (
            <Card key={c.country} className="border-0 shadow-lg hover:shadow-xl transition-all">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl">{c.flag}</span>
                  <div>
                    <p className="font-montserrat font-bold text-prime-blue text-sm">{c.country}</p>
                    <Badge variant="outline" className="text-xs border-prime-gold/40 text-prime-gold mt-1">
                      {c.tag}
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-prime-gold text-prime-gold" />
                  ))}
                </div>
                <p className="text-gray-600 font-open-sans text-sm leading-relaxed">"{c.text}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── FAQ ──────────────────────────────────────────────────────────────────────
const FAQSection = () => {
  const { t } = useTranslation();
  const faqs = [
    { q: t("fi.faq.q1"), a: t("fi.faq.a1") },
    { q: t("fi.faq.q2"), a: t("fi.faq.a2") },
    { q: t("fi.faq.q3"), a: t("fi.faq.a3") },
    { q: t("fi.faq.q4"), a: t("fi.faq.a4") },
    { q: t("fi.faq.q5"), a: t("fi.faq.a5") },
    { q: t("fi.faq.q6"), a: t("fi.faq.a6") },
    { q: t("fi.faq.q7"), a: t("fi.faq.a7") },
    { q: t("fi.faq.q8"), a: t("fi.faq.a8") },
  ];
  return (
    <section className="py-16 lg:py-24 bg-prime-light-grey">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm font-montserrat font-semibold text-prime-gold tracking-widest uppercase mb-2">
            FAQ
          </p>
          <h2 className="text-3xl lg:text-4xl font-montserrat font-bold text-prime-blue mb-3">
            {t("fi.faq.title")}
          </h2>
          <p className="text-gray-500 font-open-sans">{t("fi.faq.subtitle")}</p>
        </div>
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="bg-white border border-prime-border rounded-xl px-6 shadow-sm"
            >
              <AccordionTrigger className="font-montserrat font-semibold text-prime-blue hover:no-underline py-5 text-left">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 font-open-sans leading-relaxed pb-5 text-sm">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

// ─── Final CTA ────────────────────────────────────────────────────────────────
const FIFinalCTA = () => {
  const { locale } = useParams();
  return (
    <section className="py-16 bg-prime-blue text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl lg:text-4xl font-montserrat font-bold mb-4">
          Ready to Start Your Business in Tanzania?
        </h2>
        <p className="text-white/70 font-open-sans mb-8 max-w-2xl mx-auto">
          Our team is ready to guide you from first inquiry to full operation. Get a free consultation today.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#inquiry-form">
            <Button size="lg" className="bg-prime-gold hover:bg-prime-gold/90 text-prime-blue font-montserrat font-bold">
              Get Free Consultation <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </a>
          <Link to={`/${locale}/get-quote`}>
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
              <FileText className="mr-2 w-4 h-4" /> Get an Instant Quote
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

// ─── SEO Meta ─────────────────────────────────────────────────────────────────
const SEOMeta = () => {
  useEffect(() => {
    document.title = "Company Registration Tanzania | Foreign Investor Services | Prime Auditors";
    const setMeta = (name: string, content: string, prop = false) => {
      const attr = prop ? "property" : "name";
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.content = content;
    };
    setMeta("description", "Prime Auditors offers end-to-end company registration, compliance, licensing and work permit services for foreign companies entering Tanzania. Chinese investors welcome. Based in Tanga.");
    setMeta("keywords", "company registration Tanzania, BRELA registration Tanzania, foreign company Tanzania, Chinese investment Tanzania, business setup Tanzania, audit firm Tanzania");
    setMeta("og:title", "Company Registration Tanzania | Foreign Investor Services | Prime Auditors", true);
    setMeta("og:description", "End-to-end company registration, compliance and licensing for foreign investors in Tanzania.", true);
    setMeta("og:type", "website", true);
    setMeta("og:url", "https://www.primeauditors.xyz/foreign-investors", true);

    const ldScript = document.getElementById("fi-ld-json") || document.createElement("script");
    ldScript.id = "fi-ld-json";
    ldScript.setAttribute("type", "application/ld+json");
    ldScript.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "Prime Auditors",
      description: "Registered audit firm offering foreign investor services in Tanzania",
      url: "https://www.primeauditors.xyz",
      telephone: "+255752401012",
      email: "erick.olomi@primeauditors.co.tz",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Market Street, Central Ward",
        addressLocality: "Tanga",
        addressCountry: "TZ",
        postalCode: "P.O. Box 5667",
      },
      identifier: "PF510",
    });
    if (!document.getElementById("fi-ld-json")) {
      document.head.appendChild(ldScript);
    }

    return () => {
      document.title = "Prime Auditors | Tanga, Tanzania";
    };
  }, []);
  return null;
};

// ─── Main Page ────────────────────────────────────────────────────────────────
const ForeignInvestors = () => {
  return (
    <>
      <SEOMeta />
      <HeroSection />
      <WhyChooseUs />
      <ServicePackages />
      <ServicesAccordion />
      <HowItWorks />
      <DocumentChecklist />
      <InquiryForm />
      <CaseStudies />
      <FAQSection />
      <FIFinalCTA />
    </>
  );
};

export default ForeignInvestors;
