import { BrowserRouter, Routes, Route, Navigate, useParams, useLocation, useOutlet } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import { Toaster } from "@/components/ui/sonner";
import Index from "./pages/Index";
import Services from "./pages/Services";
import AboutUs from "./pages/AboutUs";
import ForeignInvestors from "./pages/ForeignInvestors";
import GetQuote from "./pages/GetQuote";
import News from "./pages/News";
import JoinUs from "./pages/JoinUs";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import Portal from "./pages/portal/Portal";
import PortalAuth from "./pages/portal/Auth";
import { AuthProvider } from "./contexts/AuthContext";
import { useEffect } from "react";
import i18n from "./i18n";

const AnimatedOutlet = () => {
  const location = useLocation();
  const element = useOutlet();
  return (
    <AnimatePresence initial={false}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.2, ease: "easeOut" } }}
        exit={{ opacity: 0, transition: { duration: 0.1, ease: "easeIn" } }}
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
      <Header />
      <main className="flex-grow">
        <AnimatedOutlet />
      </main>
      <Footer />
      <FloatingContact />
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
