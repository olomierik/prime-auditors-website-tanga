import { ArrowRight, Calendar, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/Layout";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  image_url: string | null;
  read_time: string | null;
  published_at: string;
}

const categories = ["All", "Tax Advisory", "Auditing", "Business Registration", "Foreign Investment", "Accounting Standards", "Tax Compliance"];

const News = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      const { data, error } = await supabase
        .from("blog_articles")
        .select("*")
        .order("published_at", { ascending: false });
      if (!error && data) setArticles(data);
      setLoading(false);
    };
    fetchArticles();
  }, []);

  const filteredArticles = selectedCategory === "All"
    ? articles
    : articles.filter(a => a.category === selectedCategory);

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-prime-blue py-14 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-montserrat font-semibold text-prime-gold tracking-widest uppercase mb-4">Insights</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-montserrat font-bold text-white mb-4">Latest Articles & Insights</h1>
          <p className="text-lg text-white/75 max-w-2xl mx-auto font-open-sans">
            Stay informed with expert analysis on tax, auditing, and business in Tanzania.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-6 bg-prime-light-grey border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-montserrat font-medium transition-all ${
                  selectedCategory === cat
                    ? "bg-prime-blue text-white shadow-md"
                    : "bg-white text-gray-600 hover:bg-prime-gold/10 border border-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-16">
              <p className="text-gray-500 font-open-sans">Loading articles...</p>
            </div>
          ) : filteredArticles.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 font-open-sans">No articles found in this category.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <Card key={article.id} className="border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group overflow-hidden">
                  <div className="relative overflow-hidden">
                    <img
                      src={article.image_url || 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=340&fit=crop'}
                      alt={article.title}
                      className="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <Badge className="absolute top-3 left-3 bg-prime-gold text-prime-blue font-montserrat text-[10px]">
                      {article.category}
                    </Badge>
                  </div>
                  <CardContent className="p-5 space-y-3">
                    <h3 className="font-montserrat font-bold text-prime-blue text-sm leading-tight group-hover:text-prime-gold transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 font-open-sans text-xs leading-relaxed line-clamp-3">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-[10px] text-gray-400 font-open-sans pt-2 border-t border-gray-100">
                      <div className="flex items-center gap-1"><User className="w-3 h-3" />{article.author}</div>
                      <div className="flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(article.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                    </div>
                    {article.read_time && (
                      <div className="flex items-center gap-1 text-[10px] text-gray-400"><Clock className="w-3 h-3" />{article.read_time}</div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-prime-blue text-white text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-5">
          <h2 className="text-3xl font-montserrat font-bold">Need Expert Financial Advice?</h2>
          <p className="text-white/75 font-open-sans">Contact Prime Auditors for personalized consultation.</p>
          <Link to="/#contact">
            <Button className="bg-prime-gold hover:bg-prime-gold/90 text-prime-blue font-montserrat font-semibold px-8">
              Get in Contact <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default News;
