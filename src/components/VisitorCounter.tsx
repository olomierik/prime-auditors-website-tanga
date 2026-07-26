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
    <section className="bg-white py-10 border-t border-gray-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 bg-prime-blue/5 border border-prime-blue/10 rounded-xl px-6 py-5"
        >
          <div className="w-12 h-12 rounded-full bg-prime-gold/15 flex items-center justify-center flex-shrink-0">
            <Eye className="w-5 h-5 text-prime-gold" />
          </div>
          <div className="text-center sm:text-left">
            <div className="text-[11px] font-montserrat font-semibold text-prime-blue/60 uppercase tracking-[0.2em] mb-1">
              Visitors to Prime Auditors
            </div>
            <div className="text-3xl sm:text-4xl font-serif font-bold text-prime-blue tabular-nums">
              {count === null ? "…" : count.toLocaleString()}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VisitorCounter;