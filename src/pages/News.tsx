import { ArrowRight, Phone, Mail, MapPin, Menu, X, Globe, Calendar, Clock, User, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import primeAuditorsLogo from "@/assets/prime-auditors-logo.jpg";

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
    <div className="min-h-screen bg-white font-open-sans">
      {/* Navigation */}
      <nav className="bg-gradient-to-r from-prime-blue via-prime-blue/95 to-prime-blue text-white shadow-2xl sticky top-0 z-50 border-b-4 border-prime-gold">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <Link to="/"><img src={primeAuditorsLogo} alt="Prime Auditors Logo" className="h-16 w-auto" /></Link>
            </div>
            <div className="hidden lg:flex items-center space-x-8">
              <Link to="/" className="text-white/90 hover:text-prime-gold transition-all duration-300 font-medium text-lg">Home</Link>
              <Link to="/about" className="text-white/90 hover:text-prime-gold transition-all duration-300 font-medium text-lg">About Us</Link>
              <Link to="/services" className="text-white/90 hover:text-prime-gold transition-all duration-300 font-medium text-lg">Services</Link>
              <Link to="/news" className="text-prime-gold font-semibold text-lg">News & Updates</Link>
              <Link to="/foreign-investors" className="text-white/90 hover:text-prime-gold transition-all duration-300 font-medium text-lg flex items-center gap-1">
                <Globe className="w-4 h-4" />Foreign Investors
              </Link>
              <Link to="/join" className="text-white/90 hover:text-prime-gold transition-all duration-300 font-medium text-lg">Join Us</Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/#contact">
                <Button className="bg-prime-gold hover:bg-prime-gold/90 text-prime-blue font-montserrat font-semibold shadow-lg">
                  <Phone className="w-4 h-4 mr-2" />Contact Us
                </Button>
              </Link>
              <button className="lg:hidden p-2 rounded-md hover:bg-prime-gold/20" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
          {isMobileMenuOpen && (
            <div className="lg:hidden py-6 border-t border-prime-gold/20 animate-fade-in">
              <div className="flex flex-col space-y-4">
                <Link to="/" className="text-white/90 hover:text-prime-gold font-medium text-lg py-2">Home</Link>
                <Link to="/about" className="text-white/90 hover:text-prime-gold font-medium text-lg py-2">About Us</Link>
                <Link to="/services" className="text-white/90 hover:text-prime-gold font-medium text-lg py-2">Services</Link>
                <Link to="/news" className="text-prime-gold font-semibold text-lg py-2">News & Updates</Link>
                <Link to="/foreign-investors" className="text-white/90 hover:text-prime-gold font-medium text-lg py-2 flex items-center gap-2">
                  <Globe className="w-4 h-4" />Foreign Investors
                </Link>
                <Link to="/join" className="text-white/90 hover:text-prime-gold font-medium text-lg py-2">Join Us</Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-prime-blue to-prime-blue/90 py-16 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <Badge className="bg-prime-gold/20 text-prime-gold border-prime-gold/30 mb-6 font-montserrat">News & Updates</Badge>
          <h1 className="text-4xl lg:text-5xl font-montserrat font-bold text-white mb-4">Latest Articles & Insights</h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto font-open-sans">
            Stay informed with expert analysis on tax, auditing, and business in Tanzania
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-prime-light-grey border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full font-montserrat text-sm font-medium transition-all duration-300 ${
                  selectedCategory === cat
                    ? "bg-prime-blue text-white shadow-lg"
                    : "bg-white text-gray-600 hover:bg-prime-gold/10 hover:text-prime-blue border border-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <div className="col-span-3 text-center py-16">
              <p className="text-gray-500 font-open-sans text-lg">Loading articles...</p>
            </div>
          ) : filteredArticles.map((article) => (
              <Card key={article.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group overflow-hidden">
                <div className="relative overflow-hidden">
                  <img
                    src={article.image_url || 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=340&fit=crop'}
                    alt={article.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <Badge className="absolute top-4 left-4 bg-prime-gold text-prime-blue font-montserrat text-xs">
                    {article.category}
                  </Badge>
                </div>
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-lg font-montserrat font-bold text-prime-blue leading-tight group-hover:text-prime-gold transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 font-open-sans text-sm leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500 font-open-sans pt-2 border-t border-gray-100">
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {article.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(article.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Clock className="w-3 h-3" />
                    {article.read_time}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 font-open-sans text-lg">No articles found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-prime-blue to-prime-blue/90 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-montserrat font-bold mb-4">Need Expert Financial Advice?</h2>
          <p className="text-white/80 mb-8 font-open-sans">Contact Prime Auditors for personalized consultation on any financial matter.</p>
          <Link to="/#contact">
            <Button className="bg-prime-gold hover:bg-prime-gold/90 text-prime-blue font-montserrat font-semibold px-8 py-3 text-lg">
              Get in Contact <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-prime-blue via-prime-blue/95 to-prime-blue text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-montserrat font-bold mb-4">PRIME AUDITORS</h3>
              <p className="text-white/80 font-open-sans text-sm">Your trusted partner in financial clarity.</p>
            </div>
            <div>
              <h4 className="font-montserrat font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-white/80 font-open-sans text-sm">
                <li><Link to="/" className="hover:text-prime-gold transition-colors">Home</Link></li>
                <li><Link to="/about" className="hover:text-prime-gold transition-colors">About Us</Link></li>
                <li><Link to="/services" className="hover:text-prime-gold transition-colors">Services</Link></li>
                <li><Link to="/news" className="hover:text-prime-gold transition-colors">News & Updates</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-montserrat font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-white/80 font-open-sans text-sm">
                <li><Link to="/services" className="hover:text-prime-gold transition-colors">Accounting</Link></li>
                <li><Link to="/services" className="hover:text-prime-gold transition-colors">Tax Advisory</Link></li>
                <li><Link to="/services" className="hover:text-prime-gold transition-colors">Auditing</Link></li>
                <li><Link to="/foreign-investors" className="hover:text-prime-gold transition-colors">Foreign Investors</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-montserrat font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-white/80 font-open-sans text-sm">
                <li className="flex items-center gap-2"><Phone className="w-3 h-3 text-prime-gold" />+255 798 509 683</li>
                <li className="flex items-center gap-2"><Mail className="w-3 h-3 text-prime-gold" />info@primeauditors.co.tz</li>
                <li className="flex items-center gap-2"><MapPin className="w-3 h-3 text-prime-gold" />Tanga City, Tanzania</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60 font-open-sans text-sm">
            © 2024 Prime Auditors. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default News;
