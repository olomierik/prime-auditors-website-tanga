import { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import { motion } from "framer-motion";

const NAMESPACE = "primeauditors-xyz";
const KEY = "visits";
const SESSION_FLAG = "pa-visit-counted";

const VisitorCounter = () => {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const already = sessionStorage.getItem(SESSION_FLAG);
    const endpoint = already
      ? `https://abacus.jasoncameron.dev/get/${NAMESPACE}/${KEY}`
      : `https://abacus.jasoncameron.dev/hit/${NAMESPACE}/${KEY}`;

    fetch(endpoint)
      .then((r) => r.json())
      .then((data) => {
        if (typeof data?.value === "number") {
          setCount(data.value);
          sessionStorage.setItem(SESSION_FLAG, "1");
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="bg-prime-blue py-12 sm:py-14 border-y-2 border-prime-gold/40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-8 text-center sm:text-left"
        >
          <div className="w-16 h-16 rounded-full bg-prime-gold flex items-center justify-center flex-shrink-0 shadow-lg">
            <Eye className="w-7 h-7 text-prime-blue" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-montserrat font-semibold text-prime-gold uppercase tracking-[0.25em] mb-2">
              Visitors to Prime Auditors
            </div>
            <div className="text-5xl sm:text-6xl font-serif font-bold text-white tabular-nums leading-none">
              {count === null ? "…" : count.toLocaleString()}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VisitorCounter;