import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, ArrowRight, ArrowLeft, Download, FileText, RefreshCw } from "lucide-react";

type Structure = {
  label: string;
  value: string;
  price: number;
  currency: "USD" | "TZS";
  priceLabel: string;
};

type AddOn = {
  key: string;
  label: string;
  price: number;
  currency: "USD" | "TZS";
  display: string;
};

const STRUCTURES: Structure[] = [
  { label: "fi.quote.str1", value: "branch", price: 1500, currency: "USD", priceLabel: "USD 1,500" },
  { label: "fi.quote.str2", value: "subsidiary", price: 1800, currency: "USD", priceLabel: "USD 1,800" },
  { label: "fi.quote.str3", value: "compliance", price: 0, currency: "USD", priceLabel: "From TZS 4,000,000/yr" },
  { label: "fi.quote.str4", value: "bundle", price: 2800, currency: "USD", priceLabel: "USD 2,800+" },
];

const SECTORS = [
  "fi.quote.sec1", "fi.quote.sec2", "fi.quote.sec3",
  "fi.quote.sec4", "fi.quote.sec5", "fi.quote.sec6", "fi.quote.sec7",
];

const ADDONS: AddOn[] = [
  { key: "addon1", label: "fi.quote.addon1", price: 400, currency: "USD", display: "+USD 400" },
  { key: "addon2", label: "fi.quote.addon2", price: 600, currency: "USD", display: "+USD 600" },
  { key: "addon3", label: "fi.quote.addon3", price: 800, currency: "USD", display: "+USD 800" },
  { key: "addon4", label: "fi.quote.addon4", price: 400, currency: "USD", display: "+USD 400" },
  { key: "addon5", label: "fi.quote.addon5", price: 4000000, currency: "TZS", display: "+TZS 4,000,000/yr" },
  { key: "addon6", label: "fi.quote.addon6", price: 1000, currency: "USD", display: "+USD 1,000" },
];

const GetQuote = () => {
  const { t } = useTranslation();
  const { locale } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedStructure, setSelectedStructure] = useState<Structure | null>(null);
  const [selectedSector, setSelectedSector] = useState("");
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [quoteSaved, setQuoteSaved] = useState(false);

  const toggleAddon = (key: string) => {
    setSelectedAddons((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const usdSubtotal =
    (selectedStructure?.currency === "USD" ? selectedStructure.price : 0) +
    ADDONS.filter(
      (a) => selectedAddons.includes(a.key) && a.currency === "USD"
    ).reduce((sum, a) => sum + a.price, 0);

  const tzsSubtotal = ADDONS.filter(
    (a) => selectedAddons.includes(a.key) && a.currency === "TZS"
  ).reduce((sum, a) => sum + a.price, 0);

  const formatNum = (n: number) => n.toLocaleString();

  // Save quote to Supabase when the user reaches the summary step
  useEffect(() => {
    if (step === 4 && !quoteSaved && selectedStructure) {
      setQuoteSaved(true);
      (supabase as any).from("quotes").insert([{
        structure: selectedStructure.value,
        structure_price_label: selectedStructure.priceLabel,
        sector: selectedSector,
        addons: selectedAddons,
        usd_total: usdSubtotal,
        tzs_total: tzsSubtotal,
      }]).then(() => {/* silent save */});
    }
  }, [step]);

  const printQuote = () => {
    const addonLines = ADDONS.filter((a) => selectedAddons.includes(a.key))
      .map((a) => `<li>${t(a.label)} — ${a.display}</li>`)
      .join("");

    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <title>Prime Auditors — Service Quote</title>
  <style>
    body{font-family:Arial,sans-serif;max-width:700px;margin:40px auto;color:#1a1a1a}
    .header{border-bottom:3px solid #c5a021;padding-bottom:16px;margin-bottom:24px}
    .logo{font-size:22px;font-weight:bold;color:#0f2a4a}
    .sub{font-size:12px;color:#666;margin-top:4px}
    h2{color:#0f2a4a;font-size:18px}
    table{width:100%;border-collapse:collapse;margin-top:16px}
    td,th{padding:10px 12px;text-align:left;border-bottom:1px solid #eee;font-size:14px}
    th{background:#f6f3f2;font-weight:bold;color:#0f2a4a}
    .total{font-weight:bold;font-size:16px;color:#0f2a4a}
    .note{background:#f6f3f2;border-left:4px solid #c5a021;padding:12px 16px;font-size:12px;margin-top:20px}
    .footer{margin-top:40px;padding-top:16px;border-top:1px solid #ddd;font-size:12px;color:#888}
  </style>
</head>
<body>
  <div class="header">
    <div class="logo">PRIME AUDITORS</div>
    <div class="sub">Building Trust Through Integrity &amp; Excellence | Reg. No. PF510</div>
    <div class="sub">P.O. Box 5667, Market Street, Tanga, Tanzania | +255 752 401 012</div>
  </div>
  <h2>Professional Services Quote</h2>
  <p style="font-size:12px;color:#888">Generated: ${new Date().toLocaleDateString()}</p>
  <table>
    <tr><th>Service</th><th>Fee</th></tr>
    ${selectedStructure ? `<tr><td>${t(selectedStructure.label)}</td><td>${selectedStructure.priceLabel}</td></tr>` : ""}
    ${ADDONS.filter((a) => selectedAddons.includes(a.key))
      .map((a) => `<tr><td>${t(a.label).replace(/\(.*\)/, "").trim()}</td><td>${a.display}</td></tr>`)
      .join("")}
    ${usdSubtotal > 0 ? `<tr><td><strong>Subtotal (USD)</strong></td><td class="total">USD ${formatNum(usdSubtotal)}</td></tr>` : ""}
    ${tzsSubtotal > 0 ? `<tr><td><strong>Annual compliance (TZS)</strong></td><td class="total">TZS ${formatNum(tzsSubtotal)}</td></tr>` : ""}
  </table>
  <div class="note">
    <strong>Note:</strong> This is an estimate of professional service fees only. Government registration fees, third-party charges, and bank fees are not included and will be quoted separately. All prices subject to final scope confirmation.
  </div>
  <div class="footer">
    Prime Auditors | erick.olomi@primeauditors.co.tz | www.primeauditors.xyz
  </div>
</body>
</html>`;

    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const win = window.open(url, "_blank");
    if (win) win.onload = () => { win.print(); URL.revokeObjectURL(url); };
  };

  const submitAsInquiry = () => {
    const params = new URLSearchParams({
      structure: selectedStructure?.value || "",
      sector: selectedSector,
      addons: selectedAddons.join(","),
    });
    navigate(`/${locale}/foreign-investors#inquiry-form`);
  };

  return (
    <div className="min-h-screen bg-prime-light-grey">
      {/* Header */}
      <div className="bg-prime-blue text-white py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="bg-prime-gold/20 text-prime-gold border-prime-gold/30 mb-4 font-montserrat text-xs tracking-wider uppercase">
            Instant Quote
          </Badge>
          <h1 className="text-3xl lg:text-4xl font-montserrat font-bold mb-3">
            {t("fi.quote.title")}
          </h1>
          <p className="text-white/70 font-open-sans">{t("fi.quote.subtitle")}</p>
        </div>
      </div>

      {/* Progress steps */}
      <div className="bg-white border-b border-prime-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center gap-2 flex-1 last:flex-none">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-montserrat flex-shrink-0 ${
                    step > s
                      ? "bg-green-500 text-white"
                      : step === s
                      ? "bg-prime-blue text-white"
                      : "bg-gray-200 text-gray-400"
                  }`}
                >
                  {step > s ? <CheckCircle className="w-4 h-4" /> : s}
                </div>
                <span className={`text-xs font-montserrat hidden sm:block ${step === s ? "text-prime-blue font-semibold" : "text-gray-400"}`}>
                  {t(`fi.quote.step${s}`)}
                </span>
                {s < 4 && <div className={`flex-1 h-0.5 ${step > s ? "bg-green-500" : "bg-gray-200"}`} />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Step content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Step 1: Structure */}
        {step === 1 && (
          <div>
            <h2 className="text-xl font-montserrat font-bold text-prime-blue mb-6">
              {t("fi.quote.step1")}
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {STRUCTURES.map((s) => (
                <button
                  key={s.value}
                  onClick={() => setSelectedStructure(s)}
                  className={`text-left rounded-xl border-2 p-5 transition-all ${
                    selectedStructure?.value === s.value
                      ? "border-prime-gold bg-prime-gold/5"
                      : "border-gray-200 bg-white hover:border-prime-gold/50"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <p className="font-montserrat font-semibold text-prime-blue text-sm">
                      {t(s.label)}
                    </p>
                    {selectedStructure?.value === s.value && (
                      <CheckCircle className="w-5 h-5 text-prime-gold" />
                    )}
                  </div>
                  <p className="text-prime-gold font-bold font-montserrat mt-1 text-sm">{s.priceLabel}</p>
                </button>
              ))}
            </div>
            <div className="mt-8 flex justify-end">
              <Button
                onClick={() => setStep(2)}
                disabled={!selectedStructure}
                className="bg-prime-blue hover:bg-prime-blue/90 text-white font-montserrat"
              >
                {t("fi.quote.next")} <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Sector */}
        {step === 2 && (
          <div>
            <h2 className="text-xl font-montserrat font-bold text-prime-blue mb-6">
              {t("fi.quote.step2")}
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {SECTORS.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSector(t(s))}
                  className={`text-left rounded-xl border-2 p-4 transition-all text-sm font-montserrat ${
                    selectedSector === t(s)
                      ? "border-prime-gold bg-prime-gold/5 text-prime-blue font-semibold"
                      : "border-gray-200 bg-white hover:border-prime-gold/50 text-gray-600"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    {t(s)}
                    {selectedSector === t(s) && <CheckCircle className="w-4 h-4 text-prime-gold" />}
                  </div>
                </button>
              ))}
            </div>
            <div className="mt-8 flex justify-between">
              <Button variant="outline" onClick={() => setStep(1)} className="font-montserrat">
                <ArrowLeft className="mr-2 w-4 h-4" /> {t("fi.quote.back")}
              </Button>
              <Button
                onClick={() => setStep(3)}
                disabled={!selectedSector}
                className="bg-prime-blue hover:bg-prime-blue/90 text-white font-montserrat"
              >
                {t("fi.quote.next")} <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Add-ons */}
        {step === 3 && (
          <div>
            <h2 className="text-xl font-montserrat font-bold text-prime-blue mb-6">
              {t("fi.quote.step3")}
            </h2>
            <div className="space-y-3">
              {ADDONS.map((a) => (
                <label
                  key={a.key}
                  className={`flex items-center gap-4 rounded-xl border-2 p-4 cursor-pointer transition-all ${
                    selectedAddons.includes(a.key)
                      ? "border-prime-gold bg-prime-gold/5"
                      : "border-gray-200 bg-white hover:border-prime-gold/30"
                  }`}
                >
                  <Checkbox
                    checked={selectedAddons.includes(a.key)}
                    onCheckedChange={() => toggleAddon(a.key)}
                    className="border-gray-300 flex-shrink-0"
                  />
                  <div className="flex-1">
                    <span className="text-sm font-open-sans text-gray-700">{t(a.label)}</span>
                  </div>
                  <span className="text-prime-gold font-montserrat font-bold text-sm whitespace-nowrap">
                    {a.display}
                  </span>
                </label>
              ))}
            </div>
            <div className="mt-8 flex justify-between">
              <Button variant="outline" onClick={() => setStep(2)} className="font-montserrat">
                <ArrowLeft className="mr-2 w-4 h-4" /> {t("fi.quote.back")}
              </Button>
              <Button
                onClick={() => setStep(4)}
                className="bg-prime-blue hover:bg-prime-blue/90 text-white font-montserrat"
              >
                {t("fi.quote.next")} <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Quote Summary */}
        {step === 4 && (
          <div>
            <h2 className="text-xl font-montserrat font-bold text-prime-blue mb-6">
              {t("fi.quote.step4")}
            </h2>
            <Card className="border-0 shadow-xl">
              <CardContent className="p-8">
                {/* Header */}
                <div className="border-b border-prime-border pb-4 mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-montserrat font-bold text-prime-blue text-lg">PRIME AUDITORS</p>
                      <p className="text-xs text-gray-500">Reg. No. PF510 | Tanga, Tanzania</p>
                    </div>
                    <Badge className="bg-prime-gold/10 text-prime-gold border-prime-gold/30">
                      {new Date().toLocaleDateString()}
                    </Badge>
                  </div>
                </div>

                {/* Line items */}
                <div className="space-y-3 mb-6">
                  {selectedStructure && (
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-sm font-open-sans text-gray-700">{t(selectedStructure.label)}</span>
                      <span className="font-montserrat font-semibold text-prime-blue text-sm">
                        {selectedStructure.priceLabel}
                      </span>
                    </div>
                  )}
                  {ADDONS.filter((a) => selectedAddons.includes(a.key)).map((a) => (
                    <div key={a.key} className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-sm font-open-sans text-gray-700">
                        {t(a.label).replace(/\(.*\)/, "").trim()}
                      </span>
                      <span className="font-montserrat font-semibold text-prime-blue text-sm">{a.display}</span>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="bg-prime-light-grey rounded-xl p-5 space-y-2">
                  {usdSubtotal > 0 && (
                    <div className="flex justify-between">
                      <span className="text-sm font-montserrat font-semibold text-gray-600">
                        {t("fi.quote.subtotal")} (USD)
                      </span>
                      <span className="font-montserrat font-bold text-prime-blue">
                        USD {formatNum(usdSubtotal)}
                      </span>
                    </div>
                  )}
                  {tzsSubtotal > 0 && (
                    <div className="flex justify-between">
                      <span className="text-sm font-montserrat font-semibold text-gray-600">
                        Annual compliance (TZS)
                      </span>
                      <span className="font-montserrat font-bold text-prime-blue">
                        TZS {formatNum(tzsSubtotal)}
                      </span>
                    </div>
                  )}
                  <div className="pt-2 border-t border-prime-border flex justify-between">
                    <span className="font-montserrat font-bold text-prime-blue">
                      {t("fi.quote.total")}
                    </span>
                    <span className="font-montserrat font-bold text-prime-gold text-lg">
                      {usdSubtotal > 0 ? `USD ${formatNum(usdSubtotal)}` : ""}
                      {tzsSubtotal > 0 ? ` + TZS ${formatNum(tzsSubtotal)}/yr` : ""}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-gray-400 mt-3 font-open-sans">
                  * {t("fi.quote.govNote")}
                </p>

                {/* Actions */}
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={printQuote}
                    variant="outline"
                    className="flex-1 border-prime-blue text-prime-blue hover:bg-prime-blue/5 font-montserrat"
                  >
                    <Download className="mr-2 w-4 h-4" /> {t("fi.quote.downloadPdf")}
                  </Button>
                  <Button
                    onClick={submitAsInquiry}
                    className="flex-1 bg-prime-gold hover:bg-prime-gold/90 text-prime-blue font-montserrat font-bold"
                  >
                    <FileText className="mr-2 w-4 h-4" /> {t("fi.quote.submitInquiry")}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="mt-4 flex justify-between">
              <Button variant="outline" onClick={() => setStep(3)} className="font-montserrat">
                <ArrowLeft className="mr-2 w-4 h-4" /> {t("fi.quote.back")}
              </Button>
              <Button
                variant="ghost"
                onClick={() => { setStep(1); setSelectedStructure(null); setSelectedSector(""); setSelectedAddons([]); }}
                className="text-gray-500 font-montserrat text-sm"
              >
                <RefreshCw className="mr-2 w-4 h-4" /> {t("fi.quote.reset")}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GetQuote;
