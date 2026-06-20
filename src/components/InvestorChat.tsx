import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";

interface ChatMessage { from: "bot" | "user"; text: string; }

const InvestorChat = () => {
  const { t } = useTranslation();
  const SCRIPT = [
    { q: t("investorChat.q1"), key: "name" },
    { q: t("investorChat.q2"), key: "email" },
    { q: t("investorChat.q3"), key: "phone" },
    { q: t("investorChat.q4"), key: "country" },
    { q: t("investorChat.q5"), key: "sector" },
    { q: t("investorChat.q6"), key: "details" },
  ];

  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [input, setInput] = useState("");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [messages, setMessages] = useState<ChatMessage[]>([{ from: "bot", text: SCRIPT[0].q }]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    const text = input.trim();
    const currentKey = SCRIPT[step].key;
    const next = { ...answers, [currentKey]: text };
    setAnswers(next);
    setMessages((m) => [...m, { from: "user", text }]);
    setInput("");
    const nextStep = step + 1;
    setTimeout(() => {
      if (nextStep < SCRIPT.length) {
        setMessages((m) => [...m, { from: "bot", text: SCRIPT[nextStep].q }]);
        setStep(nextStep);
      } else {
        setMessages((m) => [...m, { from: "bot", text: t("investorChat.thanks") }]);
        const subject = `New Investor Onboarding – ${next.name}`;
        const body = Object.entries(next).map(([k, v]) => `${k.toUpperCase()}: ${v}`).join("\n");
        window.open(`mailto:olomierik@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, "_blank");
      }
    }, 400);
  };

  const waLink = `https://wa.me/255752401012?text=${encodeURIComponent(`Hello Prime Auditors, I'm ${answers.name || "an investor"} interested in setting up in Tanzania.`)}`;

  return (
    <>
      {!open && (
        <button onClick={() => setOpen(true)} className="fixed bottom-24 right-6 z-[55] bg-prime-gold text-prime-blue px-5 py-3 rounded-full shadow-2xl flex items-center gap-2 font-montserrat font-semibold hover:scale-105 transition-transform">
          <MessageSquare className="w-5 h-5" />
          {t("investorChat.trigger")}
        </button>
      )}
      {open && (
        <div className="fixed bottom-6 right-6 z-[60] w-[92vw] max-w-sm h-[70vh] max-h-[560px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200">
          <div className="bg-prime-blue text-white p-4 flex items-center justify-between">
            <div>
              <p className="font-montserrat font-bold text-sm">{t("investorChat.header")}</p>
              <p className="text-[11px] text-white/70">{t("investorChat.subheader")}</p>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/80 hover:text-white"><X className="w-5 h-5" /></button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-prime-light-grey/40">
            {messages.map((m, i) => (
              <div key={i} className={`max-w-[85%] px-3 py-2 rounded-2xl text-sm font-open-sans ${m.from === "bot" ? "bg-white text-prime-blue border border-gray-100 shadow-sm" : "bg-prime-blue text-white ml-auto"}`}>
                {m.text}
              </div>
            ))}
            <div ref={endRef} />
          </div>
          {step < SCRIPT.length ? (
            <div className="p-3 border-t bg-white flex gap-2">
              <Input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} placeholder={t("investorChat.placeholder")} className="flex-1" />
              <Button onClick={send} className="bg-prime-gold text-prime-blue hover:bg-prime-gold/90"><Send className="w-4 h-4" /></Button>
            </div>
          ) : (
            <div className="p-3 border-t bg-white grid grid-cols-2 gap-2">
              <a href={waLink} target="_blank" rel="noreferrer">
                <Button className="w-full bg-[#25D366] hover:bg-[#25D366]/90 text-white"><MessageSquare className="w-4 h-4 mr-1" /> {t("floating.whatsapp")}</Button>
              </a>
              <a href="tel:+255752401012">
                <Button variant="outline" className="w-full"><Phone className="w-4 h-4 mr-1" /> {t("investorChat.call")}</Button>
              </a>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default InvestorChat;
