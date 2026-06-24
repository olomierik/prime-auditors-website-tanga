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
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24 animate-pulse space-y-6">
        <div className="h-8 bg-gray-200 rounded w-3/4" />
        <div className="h-64 bg-gray-200 rounded-2xl" />
        <div className="space-y-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className={`h-4 bg-gray-200 rounded ${i % 3 === 2 ? "w-4/5" : "w-full"}`} />
          ))}
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <p className="text-2xl font-serif font-bold text-prime-blue mb-3">Article not found</p>
        <p className="text-gray-500 font-open-sans mb-6">This article may have been removed or the link is invalid.</p>
        <Link to={`/${locale}/news`}>
          <Button className="bg-prime-blue text-white font-montserrat">Back to Insights</Button>
        </Link>
      </div>
    );
  }

  return (
    <article className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-prime-blue py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to={`/${locale}/news`}
            className="inline-flex items-center gap-2 text-white/60 hover:text-prime-gold transition-colors font-montserrat text-sm mb-6 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" /> Back to Insights
          </Link>
          <div className="inline-block bg-prime-gold/20 border border-prime-gold/30 text-prime-gold text-xs font-montserrat font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
            {article.category}
          </div>
          <h1 className="text-3xl lg:text-4xl font-serif font-bold text-white leading-tight mb-6">
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
            className="w-full h-64 lg:h-80 object-cover rounded-2xl shadow-2xl"
          />
        </div>
      )}

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-xl text-gray-600 font-open-sans leading-relaxed mb-8 border-l-4 border-prime-gold pl-5 italic">
          {article.excerpt}
        </p>
        <div className="space-y-6 font-open-sans text-gray-700 leading-relaxed text-[16px]">
          {article.content.split("\n\n").map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 p-8 bg-prime-light-grey rounded-2xl border border-gray-100">
          <p className="font-montserrat font-bold text-prime-blue text-lg mb-2">Need professional advice?</p>
          <p className="text-gray-500 font-open-sans text-sm mb-4">Our team of certified public accountants is ready to assist your business.</p>
          <Link to={`/${locale}/contact`}>
            <Button className="bg-prime-blue text-white font-montserrat font-semibold hover:bg-prime-blue/90">
              Book a Free Consultation
            </Button>
          </Link>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100">
          <Link to={`/${locale}/news`}>
            <Button variant="outline" className="border-prime-blue text-prime-blue hover:bg-prime-blue/5 font-montserrat">
              <ArrowLeft className="mr-2 w-4 h-4" /> Back to Insights
            </Button>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default NewsArticle;
