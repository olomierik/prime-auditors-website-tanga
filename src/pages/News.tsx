import PageHero from "@/components/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock } from "lucide-react";

const articles = [
  {
    title: "Understanding Tanzania's New Tax Regulations",
    excerpt: "A practical breakdown of the latest tax changes and what they mean for your business.",
    category: "Tax",
    date: "March 2026",
    readTime: "5 min",
    image: "/office-workspace.jpg",
  },
  {
    title: "Setting Up a Holding Company in Tanzania",
    excerpt: "Step-by-step guide for global investors structuring African investments through Tanzania.",
    category: "Corporate",
    date: "February 2026",
    readTime: "7 min",
    image: "/office-reception.jpg",
  },
  {
    title: "Audit Best Practices for SMEs",
    excerpt: "How small and medium enterprises can prepare for and benefit from external audits.",
    category: "Audit",
    date: "January 2026",
    readTime: "4 min",
    image: "/team-conference-1.jpg",
  },
];

const News = () => {
  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="News & Articles"
        description="Expert perspectives on accounting, tax, and business strategy in Tanzania and Africa."
      />

      <section className="py-16 lg:py-24 bg-prime-light-grey">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((a) => (
              <Card key={a.title} className="overflow-hidden border-0 shadow-md hover:shadow-2xl transition-all hover:-translate-y-1">
                <div className="relative h-48 overflow-hidden">
                  <img src={a.image} alt={a.title} className="w-full h-full object-cover" />
                  <div className="absolute top-4 left-4 bg-prime-gold text-prime-blue text-xs font-montserrat font-semibold px-3 py-1 rounded-full">
                    {a.category}
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-montserrat font-bold text-prime-blue text-lg mb-2 line-clamp-2">{a.title}</h3>
                  <p className="text-sm text-gray-600 font-open-sans mb-4 line-clamp-3">{a.excerpt}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500 font-open-sans">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{a.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{a.readTime}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default News;