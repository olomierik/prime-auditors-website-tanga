import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    quote: "Prime Auditors transformed our financial processes. Their expertise in tax planning saved us significant costs while ensuring full compliance.",
    name: "Sarah Johnson",
    role: "CEO, TanMart Ltd",
    initials: "SJ",
  },
  {
    quote: "Professional, reliable, and incredibly knowledgeable. The audit process was smooth and their recommendations improved our financial controls.",
    name: "Michael Chen",
    role: "Finance Director, Global Trade Co.",
    initials: "MC",
  },
  {
    quote: "Their management consulting services helped us streamline operations and improve profitability. Highly recommended for any growing business.",
    name: "Amina Hassan",
    role: "MD, Coastal Enterprises",
    initials: "AH",
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 lg:py-28 bg-prime-light-grey">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-xs font-montserrat font-semibold text-prime-gold tracking-[0.2em] uppercase mb-3">Client Trust</p>
          <h2 className="text-3xl lg:text-4xl font-serif font-semibold text-prime-blue">
            What Our Clients Say
          </h2>
          <div className="w-12 h-0.5 bg-prime-gold mx-auto mt-5" />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <Card key={t.name} className="bg-white border border-prime-border/60 shadow-sm hover:shadow-md transition-shadow rounded-sm">
              <CardContent className="p-7 space-y-5">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-prime-gold text-prime-gold" />
                  ))}
                </div>
                <p className="text-sm text-gray-700 font-open-sans leading-relaxed italic">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3 pt-2 border-t border-prime-border/60">
                  <div className="w-10 h-10 rounded-full bg-prime-blue text-white flex items-center justify-center text-xs font-semibold font-montserrat">
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-sm font-semibold font-montserrat text-prime-blue">{t.name}</div>
                    <div className="text-xs text-gray-500 font-open-sans">{t.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;