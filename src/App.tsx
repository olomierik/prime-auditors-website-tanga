import { BrowserRouter, Routes, Route, Navigate, useParams, Outlet } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import CookieConsent from "@/components/CookieConsent";
import ScrollProgress from "@/components/ScrollProgress";
import ScrollToTop from "./components/ScrollToTop";
import { Toaster } from "@/components/ui/sonner";
import Index from "./pages/Index";
import Services from "./pages/Services";
import AboutUs from "./pages/AboutUs";
import News from "./pages/News";
import NewsArticle from "./pages/NewsArticle";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";
import i18n from "./i18n";

const Layout = () => {
  const { locale } = useParams();

  useEffect(() => {
    if (locale && (locale === "en" || locale === "zh")) {
      i18n.changeLanguage(locale);
    }
  }, [locale]);

  return (
    <div className="flex min-h-screen flex-col bg-white font-open-sans text-foreground">
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
        <Outlet />
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
    <Routes>
      <Route path="/:locale" element={<Layout />}>
        <Route index element={<Index />} />
        <Route path="services" element={<Services />} />
        <Route path="about" element={<AboutUs />} />
        <Route path="news" element={<News />} />
        <Route path="news/:id" element={<NewsArticle />} />
        <Route path="contact" element={<Contact />} />
        <Route path="join" element={<NotFound />} />
        <Route path="*" element={<Navigate to="." replace />} />
      </Route>
      <Route path="/" element={<Navigate to="/en" replace />} />
      <Route path="*" element={<Navigate to="/en" replace />} />
    </Routes>
  </BrowserRouter>
);

export default App;
