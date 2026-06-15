import { useState, useEffect } from "react";
import { X } from "lucide-react";

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("cookie-consent");
    if (!stored) setTimeout(() => setVisible(true), 1500);
  }, []);

  const respond = (choice: "accepted" | "declined") => {
    localStorage.setItem("cookie-consent", choice);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[90] bg-prime-blue border-t-2 border-prime-gold/30 shadow-[0_-8px_40px_rgba(0,0,0,0.3)] animate-in slide-in-from-bottom-4 duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1 text-sm text-white/75 font-open-sans leading-relaxed">
          <span className="font-montserrat font-semibold text-white">We use cookies</span> to improve your experience, analyse site traffic, and serve personalised content. By continuing you agree to our cookie policy.
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            onClick={() => respond("declined")}
            className="text-xs text-white/45 hover:text-white font-montserrat transition-colors"
          >
            Decline
          </button>
          <button
            onClick={() => respond("accepted")}
            className="bg-prime-gold hover:bg-[#d4af26] text-prime-blue font-montserrat font-bold text-xs px-5 py-2.5 rounded-sm transition-colors whitespace-nowrap"
          >
            Accept All
          </button>
          <button onClick={() => respond("declined")} className="text-white/30 hover:text-white transition-colors p-1">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
