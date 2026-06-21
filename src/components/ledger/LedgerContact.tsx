import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

/* Prime Auditors — "The Ledger" · Contact (design_files/closing.jsx →
   LedgerContact + LedgerField). Underline-only fields; submits to the same
   Supabase `consultation_requests` table the rest of the site uses. */

type FieldProps = {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  textarea?: boolean;
};

const LedgerField: React.FC<FieldProps> = ({
  label, name, value, onChange, type = "text", placeholder, required, textarea,
}) => {
  const [focus, setFocus] = useState(false);
  const base = `w-full border-0 border-b bg-transparent py-3.5 font-open-sans text-[16px] text-white outline-none transition-colors placeholder:text-white/30 ${
    focus ? "border-prime-gold" : "border-white/20"
  }`;
  return (
    <div className="pt-[18px]">
      <label
        htmlFor={name}
        className={`block font-montserrat text-[11px] font-medium uppercase tracking-[0.14em] transition-colors ${
          focus ? "text-prime-gold" : "text-white/40"
        }`}
      >
        {label}
      </label>
      {textarea ? (
        <textarea
          id={name}
          name={name}
          rows={2}
          value={value}
          required={required}
          placeholder={placeholder}
          onChange={onChange}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          className={`${base} resize-none`}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          required={required}
          placeholder={placeholder}
          onChange={onChange}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          className={base}
        />
      )}
    </div>
  );
};

const empty = { name: "", email: "", company: "", message: "" };

const LedgerContact: React.FC = () => {
  const { t } = useTranslation();
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(empty);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.from("consultation_requests").insert([
        {
          name: form.name,
          email: form.email,
          company_name: form.company || null,
          message: form.message || null,
          phone_number: "",
        },
      ]);
      if (error) throw error;
      setSent(true);
      setForm(empty);
    } catch (err) {
      console.error("Ledger contact submit failed:", err);
      toast.error(t("home.contact.errorToast"));
    } finally {
      setLoading(false);
    }
  };

  const details: [string, string][] = [
    [t("home.contact.telephone"), "+255 752 401 012"],
    [t("home.contact.email"), "info@primeauditors.co.tz"],
    [t("home.contact.office"), t("home.contact.officeValue")],
    [t("home.contact.hours"), t("home.contact.hoursValue")],
  ];

  return (
    <section id="contact" className="bg-prime-blue-deepest py-[112px] scroll-mt-[84px]">
      <div className="mx-auto grid max-w-[1320px] grid-cols-1 gap-14 px-6 md:px-10 lg:grid-cols-2 lg:gap-20">
        {/* left — details */}
        <div>
          <div className="mb-7 flex items-center gap-3.5">
            <span className="h-px w-11 bg-prime-gold" />
            <span className="font-montserrat text-[12px] font-semibold uppercase tracking-[0.26em] text-prime-gold">
              {t("home.contact.eyebrow")}
            </span>
          </div>
          <h2 className="mb-7 font-serif text-[36px] font-bold leading-[1.04] tracking-[-0.03em] text-white lg:text-[52px]">
            {t("home.contact.titlePre")}{" "}
            <span className="italic text-prime-gold">{t("home.contact.titleEmphasis")}</span>
          </h2>
          <div className="border-t border-white/10">
            {details.map(([label, value]) => (
              <div
                key={label}
                className="grid grid-cols-[96px_1fr] gap-5 border-b border-white/10 py-5 sm:grid-cols-[120px_1fr]"
              >
                <span className="font-montserrat text-[11px] uppercase tracking-[0.14em] text-white/40">
                  {label}
                </span>
                <span className="font-open-sans text-[15.5px] text-white/85">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* right — form / confirmation */}
        <div className="ledger-contact">
          {sent ? (
            <div className="border border-prime-gold/30 px-10 py-16 text-center">
              <div className="font-serif text-[54px] leading-none text-prime-gold">✦</div>
              <h3 className="mb-2.5 mt-5 font-serif text-[26px] font-bold text-white">
                {t("home.contact.sentTitle")}
              </h3>
              <p className="mb-[26px] font-open-sans text-[15px] text-white/55">
                {t("home.contact.sentBody")}
              </p>
              <button
                type="button"
                onClick={() => setSent(false)}
                className="border border-prime-gold/40 px-6 py-3 font-montserrat text-[12px] font-semibold uppercase tracking-[0.12em] text-prime-gold transition-colors hover:bg-prime-gold/10"
              >
                {t("home.contact.sendAnother")}
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="flex flex-col">
              <LedgerField
                label={t("home.contact.fullName")}
                name="name"
                value={form.name}
                onChange={onChange}
                placeholder={t("home.contact.namePh")}
                required
              />
              <LedgerField
                label={t("home.contact.emailAddress")}
                name="email"
                type="email"
                value={form.email}
                onChange={onChange}
                placeholder={t("home.contact.emailPh")}
                required
              />
              <LedgerField
                label={t("home.contact.company")}
                name="company"
                value={form.company}
                onChange={onChange}
                placeholder={t("home.contact.companyPh")}
              />
              <LedgerField
                label={t("home.contact.help")}
                name="message"
                value={form.message}
                onChange={onChange}
                placeholder={t("home.contact.helpPh")}
                textarea
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="mt-8 w-full bg-prime-gold py-[18px] font-montserrat text-[13px] font-bold uppercase tracking-[0.14em] text-prime-blue transition-colors hover:bg-prime-gold-bright disabled:opacity-70"
              >
                {loading ? t("home.contact.submitting") : <>{t("home.contact.submit")} &nbsp;→</>}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default LedgerContact;
