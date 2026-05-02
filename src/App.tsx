import { BrowserRouter, Routes, Route, Navigate, useParams, Outlet } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import { Toaster } from "@/components/ui/sonner";
import Index from "./pages/Index";
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
      <Routes>
        <Route path="/:locale" element={<Layout />}>
          <Route index element={<Index />} />
          {/* Add other routes here as they are migrated */}
          <Route path="*" element={<Index />} />
        </Route>
        <Route path="/" element={<Navigate to="/en" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
