import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, Clock, ArrowLeft, User } from "lucide-react";
import { Button } from "@/components/ui/button";

type Article = {
  id: string;
  title: string;
  author: string;
  category: string;
  content: string;
  excerpt: string;
  image_url: string | null;
  published_at: string;
  read_time: string | null;
};

const NewsArticle = () => {
  const { locale, id } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    supabase
      .from("blog_articles")
      .select("*")
      .eq("id", id)
      .single()
      .then(({ data }) => {
        setArticle(data as Article | null);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="bg-prime-blue-deepest min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24 animate-pulse space-y-6">
          <div className="h-8 bg-white/10 rounded w-3/4" />
          <div className="h-64 bg-white/10 rounded-none" />
          <div className="space-y-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className={`h-4 bg-white/10 rounded ${i % 3 === 2 ? "w-4/5" : "w-full"}`} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="bg-prime-blue-deepest min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <p className="text-2xl font-serif font-bold text-white mb-3">Article not found</p>
          <p className="text-white/55 font-open-sans mb-6">This article may have been removed or the link is invalid.</p>
          <Link to={`/${locale}/news`}>
            <Button className="bg-prime-gold hover:bg-prime-gold-bright text-prime-blue font-montserrat font-bold uppercase tracking-[0.1em] rounded-none">Back to Insights</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="bg-prime-blue-deepest min-h-screen">
      {/* Header */}
      <div className="bg-prime-blue-deep py-16 lg:py-20 border-b border-white/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to={`/${locale}/news`}
            className="inline-flex items-center gap-2 text-white/60 hover:text-prime-gold transition-colors font-montserrat text-sm mb-6 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" /> Back to Insights
          </Link>
          <div className="inline-block bg-prime-gold/15 border border-prime-gold/30 text-prime-gold text-xs font-montserrat font-semibold px-3 py-1 mb-4 uppercase tracking-wider">
            {article.category}
          </div>
          <h1 className="text-3xl lg:text-4xl font-serif font-bold text-white leading-tight mb-6 tracking-[-0.02em]">
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center gap-5 text-white/50 text-sm font-open-sans">
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4" /> {article.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {new Date(article.published_at).toLocaleDateString("en-US", {
                year: "numeric", month: "long", day: "numeric",
              })}
            </span>
            {article.read_time && (
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" /> {article.read_time}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Cover image */}
      {article.image_url && (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 mb-2">
          <img
            src={article.image_url}
            alt={article.title}
            className="w-full h-64 lg:h-80 object-cover border border-white/10 shadow-2xl"
          />
        </div>
      )}

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-xl text-white/70 font-open-sans leading-relaxed mb-8 border-l-2 border-prime-gold pl-5 italic">
          {article.excerpt}
        </p>
        <div className="space-y-6 font-open-sans text-white/70 leading-relaxed text-[16px]">
          {article.content.split("\n\n").map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 p-8 bg-white/[0.03] border border-white/10">
          <p className="font-serif font-bold text-white text-lg mb-2">Need professional advice?</p>
          <p className="text-white/55 font-open-sans text-sm mb-4">Our team of certified public accountants is ready to assist your business.</p>
          <Link to={`/${locale}/#contact`}>
            <Button className="bg-prime-gold hover:bg-prime-gold-bright text-prime-blue font-montserrat font-bold uppercase tracking-[0.1em] rounded-none">
              Book a Free Consultation
            </Button>
          </Link>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10">
          <Link to={`/${locale}/news`}>
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/5 font-montserrat rounded-none">
              <ArrowLeft className="mr-2 w-4 h-4" /> Back to Insights
            </Button>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default NewsArticle;
