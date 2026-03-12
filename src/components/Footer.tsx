import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Linkedin, Twitter, Facebook } from "lucide-react";
import primeAuditorsLogo from "@/assets/prime-auditors-logo.jpg";

const Footer = () => {
  return (
    <footer className="bg-prime-blue text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Company Info */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <img src={primeAuditorsLogo} alt="Prime Auditors" className="h-10 w-auto" />
              <div>
                <div className="font-montserrat font-bold text-sm tracking-wide">PRIME AUDITORS</div>
                <div className="text-[10px] text-white/50 tracking-widest uppercase font-open-sans">Certified Public Accountants</div>
              </div>
            </div>
            <p className="text-white/70 font-open-sans text-sm leading-relaxed">
              A leading CPA firm based in Tanga, Tanzania. Registered by the National Board of Accountants and Auditors (NBAA). We deliver world-class financial services with integrity and excellence.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 hover:bg-prime-gold/20 flex items-center justify-center transition-colors">
                <Linkedin className="w-3.5 h-3.5 text-white/70 hover:text-prime-gold" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 hover:bg-prime-gold/20 flex items-center justify-center transition-colors">
                <Twitter className="w-3.5 h-3.5 text-white/70 hover:text-prime-gold" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 hover:bg-prime-gold/20 flex items-center justify-center transition-colors">
                <Facebook className="w-3.5 h-3.5 text-white/70 hover:text-prime-gold" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-montserrat font-semibold text-sm tracking-wide mb-5 text-white/90">Services</h4>
            <ul className="space-y-3 text-white/60 font-open-sans text-sm">
              <li><Link to="/services" className="hover:text-prime-gold transition-colors">Audit & Assurance</Link></li>
              <li><Link to="/services" className="hover:text-prime-gold transition-colors">Tax Advisory</Link></li>
              <li><Link to="/services" className="hover:text-prime-gold transition-colors">Business Registration</Link></li>
              <li><Link to="/foreign-investors" className="hover:text-prime-gold transition-colors">Holding Company Formation</Link></li>
              <li><Link to="/services" className="hover:text-prime-gold transition-colors">Corporate Structuring</Link></li>
              <li><Link to="/services" className="hover:text-prime-gold transition-colors">Accounting & Payroll</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-montserrat font-semibold text-sm tracking-wide mb-5 text-white/90">Company</h4>
            <ul className="space-y-3 text-white/60 font-open-sans text-sm">
              <li><Link to="/about" className="hover:text-prime-gold transition-colors">About Us</Link></li>
              <li><Link to="/news" className="hover:text-prime-gold transition-colors">Insights</Link></li>
              <li><Link to="/join" className="hover:text-prime-gold transition-colors">Careers</Link></li>
              <li><Link to="/foreign-investors" className="hover:text-prime-gold transition-colors">International Investors</Link></li>
              <li><Link to="/#contact" className="hover:text-prime-gold transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-montserrat font-semibold text-sm tracking-wide mb-5 text-white/90">Contact</h4>
            <ul className="space-y-4 text-white/60 font-open-sans text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-prime-gold flex-shrink-0 mt-0.5" />
                <span>Plot 24, Block KB 3, NHC Building Apt 02, Market Street, Tanga City, Tanzania</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-prime-gold flex-shrink-0" />
                <a href="tel:+255798509683" className="hover:text-prime-gold transition-colors">+255 798 509 683</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-prime-gold flex-shrink-0" />
                <a href="mailto:info@primeauditors.co.tz" className="hover:text-prime-gold transition-colors">info@primeauditors.co.tz</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-white/50 font-open-sans">
          <span>© {new Date().getFullYear()} Prime Auditors. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-prime-gold transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-prime-gold transition-colors">Terms of Service</a>
            <a
              href="https://www.nbaa.go.tz/nbaa-firm-details/1148/show"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-prime-gold transition-colors"
            >
              NBAA PF510
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
