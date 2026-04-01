import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import primeAuditorsLogo from "@/assets/prime-auditors-logo.jpg";

const navItems = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Industries", path: "/services#industries" },
  { label: "International Investors", path: "/foreign-investors" },
  { label: "Insights", path: "/news" },
  { label: "Contact", path: "/#contact" },
];

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path.split("#")[0]) && path !== "/";
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-prime-blue/98 shadow-lg backdrop-blur-md"
          : "bg-prime-blue"
      }`}
    >
      {/* Top bar */}
      <div className="border-b border-white/10 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-9 text-xs text-white/70 font-open-sans">
          <div className="flex items-center gap-6">
            <span>info@primeauditors.co.tz</span>
            <span>+255 798 509 683</span>
          </div>
          <a
            href="https://www.nbaa.go.tz/nbaa-firm-details/MTE0OA==/show"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-prime-gold transition-colors"
          >
            NBAA Reg: PF510 — Verify ↗
          </a>
        </div>
      </div>

      {/* Main nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-[72px]">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 flex-shrink-0">
            <img
              src={primeAuditorsLogo}
              alt="Prime Auditors Logo"
              className="h-10 lg:h-12 w-auto"
            />
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="font-montserrat font-bold text-white text-sm lg:text-base tracking-wide">
                PRIME AUDITORS
              </span>
              <span className="text-[10px] text-white/60 font-open-sans tracking-widest uppercase">
                Certified Public Accountants
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 xl:px-4 py-2 text-[13px] font-medium font-open-sans rounded-md transition-all duration-200 ${
                  isActive(item.path)
                    ? "text-prime-gold"
                    : "text-white/85 hover:text-white hover:bg-white/10"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link to="/#contact">
              <Button
                size="sm"
                className="bg-prime-gold hover:bg-prime-gold/90 text-prime-blue font-montserrat font-semibold text-xs px-4 hidden sm:inline-flex"
              >
                <Phone className="w-3.5 h-3.5 mr-1.5" />
                Book Consultation
              </Button>
            </Link>
            <button
              className="lg:hidden p-2 rounded-md text-white hover:bg-white/10 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-white/10 bg-prime-blue animate-fade-in">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-3 rounded-lg text-sm font-medium font-open-sans transition-colors ${
                  isActive(item.path)
                    ? "text-prime-gold bg-white/5"
                    : "text-white/85 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link to="/#contact" className="mt-2">
              <Button className="w-full bg-prime-gold hover:bg-prime-gold/90 text-prime-blue font-montserrat font-semibold text-sm">
                <Phone className="w-4 h-4 mr-2" />
                Book Consultation
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
