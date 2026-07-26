import { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import { motion } from "framer-motion";

const NAMESPACE = "primeauditors-xyz";
const KEY = "visits-2026-07-26";
const SESSION_FLAG = "pa-visit-counted-2026-07-26";

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
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="inline-flex items-center gap-2 bg-prime-blue border border-prime-gold/40 rounded-full px-3 py-1.5 shadow-sm"
    >
      <Eye className="w-3.5 h-3.5 text-prime-gold" />
      <span className="text-[10px] font-montserrat font-semibold text-prime-gold uppercase tracking-[0.15em]">
        Visitors
      </span>
      <span className="text-xs font-semibold text-white tabular-nums">
        {count === null ? "…" : count.toLocaleString()}
      </span>
    </motion.div>
  );
};

export default VisitorCounter;