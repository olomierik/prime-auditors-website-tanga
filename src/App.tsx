import { BrowserRouter, Routes, Route, Navigate, useParams, Outlet } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import { Toaster } from "@/components/ui/sonner";
import Index from "./pages/Index";
import Services from "./pages/Services";
import AboutUs from "./pages/AboutUs";
import ForeignInvestors from "./pages/ForeignInvestors";
import News from "./pages/News";
import JoinUs from "./pages/JoinUs";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import { useEffect } from "react";
import i18n from "./i18n";

const Layout = () => {
  const { locale } = useParams();

  useEffect(() => {
    if (locale && (locale === 'en' || locale === 'zh')) {
      i18n.changeLanguage(locale);
    }
  }, [locale]);

  return (
    <div className="flex min-h-screen flex-col font-inter">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <FloatingContact />
      <Toaster />
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/:locale" element={<Layout />}>
          <Route index element={<Index />} />
          <Route path="services" element={<Services />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="foreign-investors" element={<ForeignInvestors />} />
          <Route path="news" element={<News />} />
          <Route path="join" element={<JoinUs />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/" element={<Navigate to="/en" replace />} />
        <Route path="*" element={<Navigate to="/en" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
