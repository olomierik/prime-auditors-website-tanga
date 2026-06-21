import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import PageHero from "@/components/PageHero";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type Article = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  published_at: string;
  read_time: string | null;
  image_url: string | null;
  author: string;
};

const SkeletonCard = () => (
  <div className="bg-white/[0.03] border border-white/10 overflow-hidden animate-pulse">
    <div className="h-48 bg-white/10" />
    <div className="p-6 space-y-3">
      <div className="h-3 bg-white/10 rounded w-1/4" />
      <div className="h-5 bg-white/10 rounded" />
      <div className="h-5 bg-white/10 rounded w-4/5" />
      <div className="h-4 bg-white/10 rounded w-1/2 mt-4" />
    </div>
  </div>
);

const News = () => {
  const { t } = useTranslation();
  const { locale } = useParams();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("blog_articles")
      .select("id, title, excerpt, category, published_at, read_time, image_url, author")
      .order("published_at", { ascending: false })
      .then(({ data }) => {
        setArticles((data as Article[]) ?? []);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <PageHero eyebrow={t("news.eyebrow")} title={t("news.title")} description={t("news.description")} />
      <section className="py-16 lg:py-24 bg-prime-blue-deepest">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <SkeletonCard /><SkeletonCard /><SkeletonCard />
            </div>
          ) : articles.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-white/40 font-open-sans text-lg">No articles published yet. Check back soon.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((a) => (
                <Link key={a.id} to={`/${locale}/news/${a.id}`} className="group">
                  <div className="overflow-hidden border border-white/10 bg-white/[0.03] hover:border-prime-gold/30 transition-colors h-full flex flex-col">
                    <div className="relative h-48 overflow-hidden bg-prime-blue-deepest">
                      {a.image_url ? (
                        <img
                          src={a.image_url}
                          alt={a.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-prime-blue to-prime-blue-deepest flex items-center justify-center">
                          <span className="text-white/20 font-montserrat text-xs uppercase tracking-[0.2em]">Prime Auditors</span>
                        </div>
                      )}
                      <div className="absolute top-4 left-4 bg-prime-gold text-prime-blue text-xs font-montserrat font-semibold px-3 py-1">
                        {a.category}
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="font-serif font-semibold text-white text-lg mb-2 line-clamp-2 group-hover:text-prime-gold transition-colors">
                        {a.title}
                      </h3>
                      <p className="text-sm text-white/55 font-open-sans mb-4 line-clamp-3 flex-1">{a.excerpt}</p>
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-4 text-xs text-white/40 font-open-sans">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {new Date(a.published_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                          </span>
                          {a.read_time && (
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />{a.read_time}
                            </span>
                          )}
                        </div>
                        <span className="text-prime-gold text-xs font-montserrat font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                          Read <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default News;
