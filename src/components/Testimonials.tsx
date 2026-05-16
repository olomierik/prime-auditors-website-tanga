import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const Testimonials = () => {
  const { t } = useTranslation();

  const testimonials = [
    { nameKey: 'testimonial1Name', roleKey: 'testimonial1Role', textKey: 'testimonial1Text', rating: 5 },
    { nameKey: 'testimonial2Name', roleKey: 'testimonial2Role', textKey: 'testimonial2Text', rating: 5 },
    { nameKey: 'testimonial3Name', roleKey: 'testimonial3Role', textKey: 'testimonial3Text', rating: 5 },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section className="section-spacing bg-prime-blue relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 1px)`, backgroundSize: '50px 50px' }} />
      
      <div className="max-w-7xl mx-auto container-padding relative">
        <motion.div
          className="text-center mb-16 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-montserrat font-semibold text-prime-gold tracking-widest uppercase">
            {t('testimonials.eyebrow')}
          </p>
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-white">
            {t('testimonials.title')}
          </h2>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {testimonials.map((testimonial, i) => (
            <motion.div key={i} variants={itemVariants}>
              <Card className="border-0 bg-white/10 backdrop-blur-lg glass-effect h-full">
                <CardContent className="p-8 space-y-5">
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, j) => (
                      <Star key={j} className="w-5 h-5 fill-prime-gold text-prime-gold" />
                    ))}
                  </div>
                  <p className="text-white/90 font-open-sans leading-relaxed">
                    "{t(testimonial.textKey)}"
                  </p>
                  <div className="pt-4 border-t border-white/20">
                    <p className="font-montserrat font-semibold text-white">
                      {t(testimonial.nameKey)}
                    </p>
                    <p className="text-sm text-prime-gold font-open-sans">
                      {t(testimonial.roleKey)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;