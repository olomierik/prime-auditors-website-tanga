import { useTranslation } from "react-i18next";
import PageHero from "@/components/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock } from "lucide-react";

const News = () => {
  const { t } = useTranslation();
  const articles = [
    { title: t("news.article1Title"), excerpt: t("news.article1Excerpt"), category: t("news.article1Cat"), date: t("news.article1Date"), readTime: `5 ${t("news.readTime")}`, image: "/office-workspace.jpg" },
    { title: t("news.article2Title"), excerpt: t("news.article2Excerpt"), category: t("news.article2Cat"), date: t("news.article2Date"), readTime: `7 ${t("news.readTime")}`, image: "/office-reception.jpg" },
    { title: t("news.article3Title"), excerpt: t("news.article3Excerpt"), category: t("news.article3Cat"), date: t("news.article3Date"), readTime: `4 ${t("news.readTime")}`, image: "/team-conference-1.jpg" },
  ];

  return (
    <>
      <PageHero eyebrow={t("news.eyebrow")} title={t("news.title")} description={t("news.description")} />
      <section className="py-16 lg:py-24 bg-prime-light-grey">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((a) => (
              <Card key={a.title} className="overflow-hidden border-0 shadow-md hover:shadow-2xl transition-all hover:-translate-y-1">
                <div className="relative h-48 overflow-hidden">
                  <img src={a.image} alt={a.title} className="w-full h-full object-cover" />
                  <div className="absolute top-4 left-4 bg-prime-gold text-prime-blue text-xs font-montserrat font-semibold px-3 py-1 rounded-full">{a.category}</div>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-serif font-semibold text-prime-blue text-lg mb-2 line-clamp-2">{a.title}</h3>
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
