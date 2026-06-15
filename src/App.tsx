import { BrowserRouter, Routes, Route, Navigate, useParams, useOutlet } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import CookieConsent from "@/components/CookieConsent";
import ScrollProgress from "@/components/ScrollProgress";
import { Toaster } from "@/components/ui/sonner";
import { AnimatePresence, motion } from "framer-motion";
import Index from "./pages/Index";
import Services from "./pages/Services";
import AboutUs from "./pages/AboutUs";
import ForeignInvestors from "./pages/ForeignInvestors";
import GetQuote from "./pages/GetQuote";
import News from "./pages/News";
import NewsArticle from "./pages/NewsArticle";
import JoinUs from "./pages/JoinUs";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import Portal from "./pages/portal/Portal";
import PortalAuth from "./pages/portal/Auth";
import { AuthProvider } from "./contexts/AuthContext";
import { useEffect } from "react";
import i18n from "./i18n";

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  enter:   { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] as [number,number,number,number] } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.2, ease: "easeIn" } },
};

const PageOutlet = () => {
  const element = useOutlet();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={element?.key ?? "page"}
        variants={pageVariants}
        initial="initial"
        animate="enter"
        exit="exit"
      >
        {element}
      </motion.div>
    </AnimatePresence>
  );
};

const Layout = () => {
  const { locale } = useParams();

  useEffect(() => {
    if (locale && (locale === "en" || locale === "zh")) {
      i18n.changeLanguage(locale);
    }
  }, [locale]);

  return (
    <div className="flex min-h-screen flex-col font-inter">
      <ScrollProgress />
      {/* Accessibility: skip navigation */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[200] bg-prime-gold text-prime-blue font-montserrat font-bold text-sm px-4 py-2 rounded-sm"
      >
        Skip to content
      </a>
      <Header />
      <main id="main-content" className="flex-grow">
        <PageOutlet />
      </main>
      <Footer />
      <FloatingContact />
      <CookieConsent />
      <Toaster />
    </div>
  );
};

const App = () => (
  <BrowserRouter>
    <ScrollToTop />
    <AuthProvider>
      <Routes>
        <Route path="/:locale" element={<Layout />}>
          <Route index element={<Index />} />
          <Route path="services" element={<Services />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="foreign-investors" element={<ForeignInvestors />} />
          <Route path="get-quote" element={<GetQuote />} />
          <Route path="news" element={<News />} />
          <Route path="news/:id" element={<NewsArticle />} />
          <Route path="join" element={<JoinUs />} />
          <Route path="portal" element={<Portal />} />
          <Route path="auth" element={<PortalAuth />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/" element={<Navigate to="/en" replace />} />
        <Route path="*" element={<Navigate to="/en" replace />} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);

export default App;
